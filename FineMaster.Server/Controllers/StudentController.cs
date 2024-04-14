using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FineMaster.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Student")]
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
    }
}
