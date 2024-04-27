namespace FineMaster.Server.ViewModels
{
    public class UserViewModel
    {
        public string? Username { get; set; }
        public string? Password { get; set; }
        public string? Email { get; set; }
        public DateTime Birthdate { get; set; }
        public int? SelectedLesson { get; set; }
        public int? SelectedCity { get; set; }
        public int? SelectedDistrict { get; set; }
        public string? MemberType { get; set; }
        public string? PhoneNumber { get; set; }
    }
}
