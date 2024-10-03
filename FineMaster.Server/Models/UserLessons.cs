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
            public int? studentID { get; set; }

            public int? teacherID { get; set; }
            public int? lessonID { get; set; }

            public bool? isActive { get; set; }
        }
    }
}
