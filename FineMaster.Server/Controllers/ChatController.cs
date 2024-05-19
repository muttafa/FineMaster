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

    [HttpGet("history/{recipientEmail}")]
    public async Task<ActionResult<List<ChatMessage>>> GetMessageHistory(string recipientEmail)
    {
        var senderEmail = User.FindFirst(ClaimTypes.Email)?.Value;

        var messages = await _context.ChatMessages
            .Where(m => (m.SenderEmail == senderEmail && m.RecipientEmail == recipientEmail) ||
                        (m.SenderEmail == recipientEmail && m.RecipientEmail == senderEmail))
            .OrderBy(m => m.Timestamp)
            .ToListAsync();

        return Ok(messages);
    }
}
