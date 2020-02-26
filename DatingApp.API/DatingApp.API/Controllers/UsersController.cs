﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.DTOs;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace DatingApp.API.Controllers
{
    [Authorize]
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
        public async Task<String> getUsers()
        {
            var users = await this.repo.GetUsers();

            var usersToReturn = this.mapper.Map<IEnumerable<UserForDetailed>>(users);

            return JsonConvert.SerializeObject(usersToReturn, Formatting.Indented,
                new JsonSerializerSettings
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                });
        }


        [HttpGet("{id}")]
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

            this.mapper.Map(userForUpdated,user);

            if (await this.repo.SaveAll())
                return "";

            return JsonConvert.SerializeObject(new ErrorCustomized("500", "Error updating the user"));
        }
    }
}