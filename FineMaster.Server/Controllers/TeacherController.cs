using FineMaster.Server.Models;
using FineMaster.Server.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
                return Ok(new { success = true, message = "İlanınız başarılı şekilde oluşturulmuştur" });
            }
            return BadRequest(new { success = false, message = "Bilgilerinizi kontrol ediniz ve tekrar deneyiniz" });
        }

        [HttpPost("saveProfile")]
        public ActionResult SaveProfile([FromBody] TeacherProfile editorData)
        {
            if (editorData == null)
            {
                return BadRequest("Invalid data.");
            }
            else
            {
                var currentProfile = _dbContext.Profiler.Where(x => x.UserID == editorData.Id).FirstOrDefault();

                if (currentProfile != null)
                {
                    currentProfile.UP_Code = editorData.EditorData;

                    _dbContext.SaveChanges();
                    return Ok();
                }
                else
                {
                    Profiler newProfiler = new Profiler();

                    newProfiler.UserID = editorData.Id;
                    newProfiler.UP_Code= editorData.EditorData;

                    _dbContext.Profiler.Add(newProfiler);
                    _dbContext.SaveChanges();
                    return Ok();
                }

            }

        }

        [HttpGet("getTeacherStudent/{tId}")]
        public async Task<IActionResult> GetStudents(int tId)
        {
            try
            {
                var studentIds = await _dbContext.UserLessons.Where(x => x.teacherID == tId && x.isActive == true).Select(x => x.studentID).ToListAsync();

                var selectedStudents = await _dbContext.Users
                 .Where(u => studentIds.Contains(u.ID))
                 .ToListAsync();

                return Ok( selectedStudents);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
    }
}
