using FineMaster.Server.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace ChatApp.Hubs
{
    public class ChatHub : Hub
    {
        private readonly ApplicationDBContext _context;

        public ChatHub(ApplicationDBContext context)
        {
            _context = context;
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

            _context.ChatMessages.Add(chatMessage);

            await Clients.User(email).SendAsync("ReceiveMessage", message);
            await _context.SaveChangesAsync();

        }
        public async Task<List<ChatMessage>> GetMessageHistory(string recipientEmail)
        {
            var senderEmail = Context.UserIdentifier;
            var messages = await _context.ChatMessages
                .Where(m => (m.SenderEmail == senderEmail && m.RecipientEmail == recipientEmail) ||
                            (m.SenderEmail == recipientEmail && m.RecipientEmail == senderEmail))
                .OrderBy(m => m.Timestamp)
                .ToListAsync();

            return messages;
        }
    }
}