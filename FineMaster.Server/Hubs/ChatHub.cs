using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace ChatApp.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string email, string message)
        {
            await Clients.User(email).SendAsync("ReceiveMessage", message);
        }
    }
}