using System.ComponentModel.DataAnnotations;

namespace FineMaster.Server.Models
{
    public class Users
    {
        [Key]
        public int ID { get; set; }
        public string? Username { get; set; }
        public string? Password { get; set; }
        public string? Email { get; set; }
        public DateTime Birthdate { get; set; }
        public int? LessonID { get; set; }
        public int? City { get; set; }
        public int? District { get; set; }
        public int? Score { get; set; }
        public int? AdID { get; set; }
        public string? UserImage { get; set; }
        public string? Role { get; set; }
        public string? PhoneNumber { get; set; }
        public int? CourseStyle { get; set; }
        public List<Ad>? Ads { get; set; }
    }
}
