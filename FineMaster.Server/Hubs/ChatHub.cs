using FineMaster.Server.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using RabbitMQ.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChatApp.Hubs
{
    public class ChatHub : Hub
    {
        private readonly ApplicationDBContext _context;
        private readonly IModel _channel;

        public ChatHub(ApplicationDBContext context, RabbitMQService rabbitMQService)
        {
            _context = context;
            _channel = rabbitMQService.GetChannel();
        }

        public async Task SendMessage(string email, string message)
        {
            var senderEmail = Context.UserIdentifier;

            var chatMessage = new ChatMessage
            {
                SenderEmail = senderEmail,
                RecipientEmail = email,
                Message = message,
                Timestamp = DateTime.Now
            };

            try
            {
                await _context.ChatMessage.AddAsync(chatMessage);
                await _context.SaveChangesAsync();

                var body = Encoding.UTF8.GetBytes($"{email};{message}");
                _channel.BasicPublish(exchange: "",
                                      routingKey: "chat_messages",
                                      basicProperties: null,
                                      body: body);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.ToString());
            }
        }

        public async Task<List<ChatMessage>> GetMessageHistory(string recipientEmail)
        {
            var senderEmail = Context.UserIdentifier;
            var messages = await _context.ChatMessage
                .Where(m => (m.SenderEmail == senderEmail && m.RecipientEmail == recipientEmail) ||
                            (m.SenderEmail == recipientEmail && m.RecipientEmail == senderEmail))
                .OrderBy(m => m.Timestamp)
                .ToListAsync();

            return messages;
        }
    }
}
