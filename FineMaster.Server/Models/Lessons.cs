using System.ComponentModel.DataAnnotations;

namespace FineMaster.Server.Models
{
    public class Lessons
    {
        [Key]
        public int LessonID { get; set; }
        public string LessonName { get; set;}
    }
}
