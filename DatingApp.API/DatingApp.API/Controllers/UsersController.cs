using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.DTOs;
using DatingApp.API.Helpers;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace DatingApp.API.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IDatingRepository repo;
        private readonly IMapper mapper;

        public UsersController(IDatingRepository repo, IMapper mapper)
        {
            this.repo = repo;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<String> getUsers([FromQuery] UserParams userParams)
        {
            var currectUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var userFromRepo = await this.repo.GetUser(currectUserId);
            userParams.UserId = currectUserId;

            if (string.IsNullOrEmpty(userParams.Gender))
            {
                //This is a shit but I don't want to waste lot of time fixing the genders and adding an extra variable to add gender I am and gender I like
                switch (userFromRepo.Gender)
                {
                    case "female":
                        userParams.Gender = "trans";
                        break;
                    case "trans":
                        userParams.Gender = "male";
                        break;
                    case "male":
                        userParams.Gender = "other";
                        break;
                    default:
                        userParams.Gender = "female";
                        break;
                }
            }

            var users = await this.repo.GetUsers(userParams);

            var usersToReturn = this.mapper.Map<IEnumerable<UserForDetailed>>(users);

            Response.AddPagination(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);

            return JsonConvert.SerializeObject(usersToReturn, Formatting.Indented,
                new JsonSerializerSettings
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                });
        }


        [HttpGet("{id}", Name = "GetUser")]
        public async Task<String> getUser(int id)
        {
            var user = await this.repo.GetUser(id);

            var userToPreurn = this.mapper.Map<UserForDetailed>(user);

            return JsonConvert.SerializeObject(userToPreurn, Formatting.Indented,
                new JsonSerializerSettings
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                });
        }


        [HttpPut("{id}")]
        public async Task<String> updateUser(int id, UserForUpdated userForUpdated)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return JsonConvert.SerializeObject(new ErrorCustomized("401", "Unauthorized"));
            var user = await this.repo.GetUser(id);

            this.mapper.Map(userForUpdated, user);

            if (await this.repo.SaveAll())
                return "";

            return JsonConvert.SerializeObject(new ErrorCustomized("500", "Error updating the user"));
        }
    

        [HttpPost("{id}/like/{recipientId}")]
        public async Task<String> LikeUser(int id, int recipientId)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return JsonConvert.SerializeObject(new ErrorCustomized("401", "Unauthorized"));
            var like = await this.repo.GetLike(id, recipientId);

            if (like != null)
                return JsonConvert.SerializeObject(new ErrorCustomized("400", "You already like this user"));

            if(await this.repo.GetUser(recipientId) == null)
                return JsonConvert.SerializeObject(new ErrorCustomized("404", "User not found"));

            like = new Like
            {
                LikerId = id,
                LikeeId = recipientId
            };

            this.repo.Add<Like>(like);

            if(await this.repo.SaveAll())
            {
                return JsonConvert.SerializeObject(new CorrectReturn("Created like correctly"));
            }

            return JsonConvert.SerializeObject(new ErrorCustomized("401", "No se ha podid oguardar en la base de datos"));
        }
    }
}