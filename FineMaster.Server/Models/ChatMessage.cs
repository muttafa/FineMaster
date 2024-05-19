using System.ComponentModel.DataAnnotations;

namespace FineMaster.Server.Models
{
    public class ChatMessage
    {
        [Key]
        public int Id { get; set; }
        public string SenderEmail { get; set; }
        public string RecipientEmail { get; set; }
        public string Message { get; set; }
        public DateTime Timestamp { get; set; }
    }
}
