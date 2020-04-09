using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.DTOs;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IMapper mapper;
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;

        public AuthController(IConfiguration config, IMapper mapper, UserManager<User> userManager, SignInManager<User> signInManager)
        {
            this._config = config;
            this.mapper = mapper;
            this.userManager = userManager;
            this.signInManager = signInManager;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody]UserForRegister userForRegister) //L33: FromBody is not necessary if you have ApiController notation on the top
        {
            var userToCreate = this.mapper.Map<User>(userForRegister);

            var result = await this.userManager.CreateAsync(userToCreate, userForRegister.Password);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            var userToReturn = this.mapper.Map<UserForDetailed>(userToCreate);

            return CreatedAtRoute("GetUser", new { controller = "users", id = userToCreate.Id }, userToReturn);

        }

        [HttpPost("login")]
        public async Task<String> Login([FromBody]UserForLogin userForLogin)
        {
            var userFromRepo = await this.userManager.FindByNameAsync(userForLogin.Username);
            var result = await this.signInManager.CheckPasswordSignInAsync(userFromRepo, userForLogin.Password, false);
            
            if (!result.Succeeded)
            {
                ErrorCustomized e = new ErrorCustomized("403", "unauthorized");
                return JsonConvert.SerializeObject(e);
            }

            string res = GenerateJwtToken(userFromRepo);

            Token tokenTosend = new Token(res, userFromRepo.Id);
            var user = this.mapper.Map<UserForList>(userFromRepo);

            return JsonConvert.SerializeObject(new { tokenTosend, user});
        }

        private string GenerateJwtToken(User userFromRepo)
        {
            var claims = new[]
          {
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name, userFromRepo.UserName)
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

            return tokenHandler.WriteToken(token);
        }

    }
}