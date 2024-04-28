using FineMaster.Server.Models;
using FineMaster.Server.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FineMaster.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "teacher")]
    public class TeacherController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public TeacherController(ApplicationDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost("CreatePost")]
        public ActionResult CreatePost([FromBody] PostViewModel postInfo)
        {
            if (postInfo != null)
            {
                Ad ad = new Ad();

                ad.AdTitle = postInfo.Title;
                ad.Price = postInfo.HourlyRate.ToString();
                ad.UserID = postInfo.UserID;
                ad.LessonID = postInfo.LessonID;
                ad.AdImage = postInfo.Image;
                ad.AdSummary = postInfo.Summary;

                _dbContext.Add(ad);
                _dbContext.SaveChanges();
                return Ok(new {success = true, message = "İlanınız başarılı şekilde oluşturulmuştur"});
            }
            return BadRequest(new { success = false, message = "Bilgilerinizi kontrol ediniz ve tekrar deneyiniz" });
        }

    }
}
