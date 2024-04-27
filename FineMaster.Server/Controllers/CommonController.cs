using FineMaster.Server.Models;
using FineMaster.Server.ViewModels;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using FineMaster.Server.ProjectFunctions;


namespace FineMaster.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommonController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public CommonController(ApplicationDBContext dbContext)
        {
            _dbContext = dbContext;
        }


        [HttpGet("GetLessonList")]
        public ActionResult GetLessonList()
        {
            var lessonList =  _dbContext.Lessons.ToList();
            return Ok(new { lessonList });
        }

        [HttpPost("CreateUser")]
        public ActionResult CreateUser([FromBody] UserViewModel newUser)
        {
            var emailCheck = _dbContext.Users.Where(x => x.Email == newUser.Email).FirstOrDefault();

            if (emailCheck != null)
            {
                return BadRequest(new { message = "Bu email kayıtlı" });
            }

            Users user = new Users();

            if (newUser.Username != null)
            {
                user.Username = newUser.Username;
                user.Password = ProjectFunctions.ProjectFunctions.HashCalculator(newUser.Password);
                user.Email = newUser.Email;
                user.City = newUser.SelectedCity;
                user.Birthdate = newUser.Birthdate;
                user.District = newUser.SelectedDistrict;
                user.LessonID = newUser.SelectedLesson;
                user.Role = newUser.MemberType;
                user.PhoneNumber = newUser.PhoneNumber;

            }
            _dbContext.Users.Add(user);
            _dbContext.SaveChanges();

            return Ok();
        }
    }
}
