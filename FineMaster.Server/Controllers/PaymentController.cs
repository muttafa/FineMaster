using Hangfire;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FineMaster.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {

        [HttpGet]
        public IActionResult Get()
        {
            BackgroundJob.Enqueue(() => paymenttestclass.payment());
            return Ok("Hangfire abaşarılı");
        }

    }

    public class paymenttestclass()
    {
        public static void payment()
        {
            Console.WriteLine("Hangfire çalıştı");
        }
    }
}
