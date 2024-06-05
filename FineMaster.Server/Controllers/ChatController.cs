using FineMaster.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class ChatController : ControllerBase
{
    private readonly ApplicationDBContext _context;

    public ChatController(ApplicationDBContext context)
    {
        _context = context;
    }

    [HttpGet("history/{recipientEmail}/{senderEmail}")]
    public async Task<ActionResult<List<ChatMessage>>> GetMessageHistory(string recipientEmail, string senderEmail)
    {
        var messages = await _context.ChatMessage
            .Where(m =>
                (m.SenderEmail == senderEmail && m.RecipientEmail == recipientEmail) ||
                (m.SenderEmail == recipientEmail && m.RecipientEmail == senderEmail))
            .OrderBy(m => m.Timestamp)
            .ToListAsync();

        return Ok(messages);
    }
    [HttpGet("getUserHistory/{userMail}")]
    public async Task<ActionResult<List<Users>>> GetUserHistory(string userMail)
    {
        List<Users> userList = new List<Users>();
        var senderList = _context.ChatMessage.Where(x => x.RecipientEmail == userMail || x.SenderEmail == userMail).Distinct().ToList();

        foreach (var sender in senderList)
        {
            var usersChatted = _context.Users.Where(x => x.Email == sender.SenderEmail).FirstOrDefault();
            if (usersChatted != null && usersChatted.Email != userMail)
            {
                var oldUser = userList.Where(x => x.Email == sender.SenderEmail || x.Email == sender.RecipientEmail);
                if (oldUser.Count() == 0)
                {
                    userList.Add(usersChatted);
                }
            }
        }

        return Ok(userList);
     


    }
}
