using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace FineMaster.Server.Hubs
{
    [Authorize] 
    public class ChatHub : Hub
    {
        public async Task SendMessage(string userId, string message)
        {
            // Mesajı alıcı kullanıcının kimliğine göre yönlendirme
            await Clients.User(userId).SendAsync("ReceiveMessage", message);
        }
    }
}
