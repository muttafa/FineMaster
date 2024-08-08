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

        var emailPairs = _context.ChatMessage
            .Select(x => new { x.SenderEmail, x.RecipientEmail })
            .ToList();

        var uniqueEmails = emailPairs
            .SelectMany(x => new[] { x.SenderEmail, x.RecipientEmail })
            .Distinct()
            .Where(email => email != userMail)
            .ToList();

        var usersChatted = _context.Users
            .Where(user => uniqueEmails.Contains(user.Email))
            .ToList();

        foreach (var user in usersChatted)
        {
            if (!userList.Any(u => u.Email == user.Email))
            {
                userList.Add(user);
            }
        }

        return Ok(userList);



    }
}
