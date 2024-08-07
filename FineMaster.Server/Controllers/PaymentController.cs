using Hangfire;
using Microsoft.AspNetCore.Mvc;
using FineMaster.Server.Models;

namespace FineMaster.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;

        public PaymentController(ApplicationDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult Get()
        {
            BackgroundJob.Enqueue(() => new PaymentTestClass(_dbContext).ProcessPayments());
            return Ok("Hangfire başarılı bir şekilde çalıştırıldı");
        }
    }
}
