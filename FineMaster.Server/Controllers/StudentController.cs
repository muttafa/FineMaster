using FineMaster.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Security.Claims;
using static FineMaster.Server.ViewModels.FilterViewModel;

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

        [HttpPost("filterPost")]
        public ActionResult FilterPost([FromBody] FilterModel filterModel)
        {
            if (filterModel == null)
            {
                return BadRequest();
            }



            var query = _dbContext.Ads
                            .Select(ad => new
                            {
                                AdId = ad.AdID,
                                Title = ad.AdTitle,
                                Summary = ad.AdSummary,
                                Price = Convert.ToInt32(ad.Price),
                                BackgroundImage = ad.AdImage,
                                CourseStyle = _dbContext.Users
                                    .Where(user => user.ID == ad.UserID)
                                    .Select(user => user.CourseStyle)
                                    .FirstOrDefault(),
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
                            }).AsQueryable(); 


            if (filterModel.LessonList.Count() != 0)
            {
                query = query.Where(x => filterModel.LessonList.Contains(x.lessonID));
            }
            if (filterModel.SelectedStyles != null && filterModel.SelectedStyles != 3)
            {
                query = query.Where(x => filterModel.SelectedStyles == filterModel.SelectedStyles);
            }
            if (filterModel.SelectedCity != null)
            {
                query = query.Where(x => filterModel.SelectedCity == filterModel.SelectedCity);
            }
            if (filterModel.SelectedDistrict != null)
            {
                query = query.Where(x => filterModel.SelectedDistrict == filterModel.SelectedDistrict);
            }
            if (filterModel.MaxPrice != null)
            {
                query = query.Where(x => x.Price <= filterModel.MaxPrice);
            }
            if (filterModel.MinPrice != null)
            {
                query = query.Where(x => x.Price >= filterModel.MinPrice);
            }
            var filteredData = query.ToList();

            return Ok(new { data = filteredData, success = true });
        }



    }
}
