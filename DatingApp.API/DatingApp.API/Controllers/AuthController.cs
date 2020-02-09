using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DatingApp.API.Data;
using DatingApp.API.DTOs;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;

        public AuthController(IAuthRepository repo, IConfiguration config)
        {
            this._repo = repo;
            this._config = config;
        }

        [HttpPost("register")]
        public async Task<String> Register([FromBody]UserForRegister userForRegister) //L33: FromBody is not necessary if you have ApiController notation on the top
        {
            // L:33 Validate request id we are not using [ApiController]
            /*if (!ModelState.IsValid)
            {
                return StatusCode(500);
            }*/

            userForRegister.Username = userForRegister.Username.ToLower();

            if(await _repo.UserExists(userForRegister.Username))
            {
                ErrorCustomized error = new ErrorCustomized("500", "The error is already created");
                return JsonConvert.SerializeObject(error);
            }

            var userToCreate = new User { Username = userForRegister.Username };

            var ucreatedUser = await _repo.Register(userToCreate, userForRegister.Password);

            return JsonConvert.SerializeObject(ucreatedUser);

        }

        [HttpPost("login")]
        public async Task<String> Login([FromBody]UserForLogin userForLogin)
        {
            var userFromRepo = await _repo.Login(userForLogin.Username.ToLower(), userForLogin.Password);
            Console.WriteLine("User From Repo: " + userFromRepo + " ---- ");
            if (userFromRepo == null)
            {
                ErrorCustomized e = new ErrorCustomized("403", "unauthorized");
                return JsonConvert.SerializeObject(e);
            }
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name, userFromRepo.Username)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this._config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            String res = tokenHandler.WriteToken(token);

            Token tokenTosend = new Token(res);

            return JsonConvert.SerializeObject(tokenTosend);
        }

    }
}