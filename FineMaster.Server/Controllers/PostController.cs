using FineMaster.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FineMaster.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "student, teacher")]
    public class PostController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public PostController(ApplicationDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("getPostDetail/{id}")]
        public ActionResult GetPostDetail(int id)
        {
            if (id == null)
            {
                return BadRequest(new { success = false , message = "Gitmeye çalıştığınız post kaldırılmış veya bulunamadı" });
            }
            var post = _dbContext.Ads.Where(x => x.AdID == id).Select(ad => new
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
                City = _dbContext.Users.Where(user => user.ID == ad.UserID)
                                .Select(user => user.City)
                                .FirstOrDefault(),
                District = _dbContext.Users.Where(user => user.ID == ad.UserID)
                                .Select(user => user.District)
                                .FirstOrDefault(),
                lessonID = ad.LessonID
            }).FirstOrDefault();

            return Ok(new { success = true, data = post });


        }

    }
}

