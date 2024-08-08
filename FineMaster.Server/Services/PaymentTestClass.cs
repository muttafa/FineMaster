using FineMaster.Server.Models;
using RabbitMQ.Client;
using System;
using System.Collections.Generic;
using System.Linq;

public class PaymentTestClass
{
    private readonly ApplicationDBContext _dbContext;

    public PaymentTestClass(ApplicationDBContext dbContext)
    {
        _dbContext = dbContext;
    }

    public void ProcessPayments()
    {
        List<Users> users = _dbContext.Users.Where(x => x.IsPayment == 0 || x.IsPayment == null).ToList();

        foreach (var user in users)
        {
            SendRabbitMQMessage(user);
        }
        Console.WriteLine("Hangfire çalıştı ve RabbitMQ mesajları gönderildi");
    }

    private void SendRabbitMQMessage(Users user)
    {
        var factory = new ConnectionFactory() { HostName = "localhost" };
        using (var connection = factory.CreateConnection())
        using (var channel = connection.CreateModel())
        {
            channel.QueueDeclare(queue: "paymentQueue", durable: false, exclusive: false, autoDelete: false, arguments: null);

            string message = $"User {user.ID} payment to be processed.";
            var body = System.Text.Encoding.UTF8.GetBytes(message);

            channel.BasicPublish(exchange: "", routingKey: "paymentQueue", basicProperties: null, body: body);
            Console.WriteLine($"Kullanıcı {user.ID} için mesaj RabbitMQ kuyruğuna eklendi");

            ProcessPayment(user);
            
        }
    }

    private void ProcessPayment(Users user)
    {
        try
        {
            bool paymentSuccess = true; 

            if (paymentSuccess)
            {
                user.IsPayment = 1;
                _dbContext.SaveChanges();
                Console.WriteLine($"Kullanıcı {user.ID} için ödeme işlemi başarılı oldu ve veritabanı güncellendi");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Kullanıcı {user.ID} için ödeme işlemi başarısız oldu: {ex.Message}");
        }
    }
}
