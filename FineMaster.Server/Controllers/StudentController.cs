using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FineMaster.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "student")]
    public class StudentController : ControllerBase
    {
        
        private readonly ApplicationDBContext _dbContext;
        public StudentController(ApplicationDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("GetUserInfo")]
        public ActionResult UserInfo()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            var name = identity?.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value ?? null;

            return Ok();
        }


        [HttpGet("GetPosts")]
        public ActionResult GetPosts()
        {
            var posts = _dbContext.Ads
                .Select(ad => new
                {
                    AdId = ad.AdID,
                    Title = ad.AdTitle,
                    Summary = ad.AdSummary,
                    Price = ad.Price,
                    BackgroundImage = ad.AdImage,
                    UserName = _dbContext.Users
                        .Where(user => user.ID == ad.UserID)
                        .Select(user => user.Username)
                        .FirstOrDefault(),
                    UserProfilePhoto = _dbContext.Users
                        .Where(user => user.ID == ad.UserID)
                        .Select(user => user.UserImage)
                        .FirstOrDefault(),
                    LessonName = _dbContext.Lessons.Where(lesson => lesson.LessonID == ad.LessonID)
                                .Select(lesson => lesson.LessonName)
                                .FirstOrDefault(),
                    lessonID = ad.LessonID
                })
                .ToList();
            return Ok(posts);
        }
    }
}
