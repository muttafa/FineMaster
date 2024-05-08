using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace FineMaster.Server.Models
{
    public class UserLessons
    {
        public class UserLesson
        {
            [Key]
            public int UserLessonID { get; set; }
            public int? userID { get; set; }
            public int? lessonID { get; set; }

            [ForeignKey("lessonID")]
            public Lessons Lesson { get; set; }

            [ForeignKey("userID")]
            public Users User { get; set; }
        }
    }
}
