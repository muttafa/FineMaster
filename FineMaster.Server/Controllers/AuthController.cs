using FineMaster.Server.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace FineMaster.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthSettings _authSettings;
        private readonly ApplicationDBContext _dbContext;
        public AuthController(IOptions<AuthSettings> authSettings, ApplicationDBContext dbContext)
        {
            _authSettings = authSettings.Value;
            _dbContext = dbContext;
        }
      
        [HttpPost("Login")]
        public IActionResult Login([FromBody] Users userInfo)
        {
            var user = UserControl(userInfo);

            if (user == null)
            {
                return NotFound("Kullanıcı Bulunamadı");
            }
            var token = CreateToken(user);
            return Ok(token);
        }

        private string CreateToken(Users user)
        {
            if (_authSettings.Key == null)
            {
                throw new Exception("Boş Anahtrar");
            }

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_authSettings.Key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);


            var claim = new[]
            {
                new Claim(ClaimTypes.Email , user.Email),
                new Claim(ClaimTypes.Role , user.Role),
            };

            var token = new JwtSecurityToken(
                _authSettings.Issuer,
                _authSettings.Audience,
                claim,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: credentials
                ) ;

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private Users UserControl(Users userInfo)
        {

            var pass = ProjectFunctions.HashCalculator(userInfo.Password);

            return _dbContext.Users.FirstOrDefault(x => x.Email.ToLower() == userInfo.Email && x.Password == pass);
        }
    }
}
