using ChatApp.Hubs;
using Microsoft.AspNetCore.SignalR;
using RabbitMQ.Client.Events;
using RabbitMQ.Client;
using System.Text;
using System.Threading.Channels;

namespace FineMaster.Server.Services
{
    public class RabbitMQService
    {
        private readonly IHubContext<ChatHub> _hubContext;
        private readonly IConnection _connection;
        private readonly IModel _channel;

        public RabbitMQService(IHubContext<ChatHub> hubContext)
        {
            _hubContext = hubContext;

            var factory = new ConnectionFactory() { HostName = "localhost" };
            _connection = factory.CreateConnection();
            _channel = _connection.CreateModel();

            _channel.QueueDeclare(queue: "chat_messages",
                                  durable: false,
                                  exclusive: false,
                                  autoDelete: false,
                                  arguments: null);

            var consumer = new EventingBasicConsumer(_channel);
            consumer.Received += async (model, ea) =>
            {
                var body = ea.Body.ToArray();
                var message = Encoding.UTF8.GetString(body);
                var parts = message.Split(';');
                var email = parts[0];
                var chatMessage = parts[1];

                await _hubContext.Clients.User(email).SendAsync("ReceiveMessage", chatMessage);
            };

            _channel.BasicConsume(queue: "chat_messages",
                                  autoAck: true,
                                  consumer: consumer);
        }

        public IModel GetChannel()
        {
            return _channel;
        }
    }
    
}
