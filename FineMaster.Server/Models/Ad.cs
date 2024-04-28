using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FineMaster.Server.Models
{
    public class Ad
    {
        [Key]
        public int AdID { get; set; }
        public string AdTitle { get; set; }
        public string AdSummary { get; set; }
        public string AdImage { get; set; }
        public string Price { get; set; }
        public int LessonID { get; set; }
        public int UserID { get; set; }
        [ForeignKey(nameof(UserID))]
        public Users? User { get; set; }
    }
}
