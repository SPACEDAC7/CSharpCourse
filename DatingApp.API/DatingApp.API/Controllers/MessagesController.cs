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
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace DatingApp.API.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Authorize]
    [Route("api/users/{userId}/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly IDatingRepository repo;
        private readonly IMapper mapper;
        public MessagesController(IDatingRepository repo, IMapper mapper)
        {
            this.repo = repo;
            this.mapper = mapper;
        }
    

        [HttpGet("{id}", Name = "GetMessage")]
        public async Task<string> GetMessage(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return JsonConvert.SerializeObject(new ErrorCustomized("401", "Unauthorized"));

            var messageFromRepo = this.repo.GetMessage(id);
            if (messageFromRepo == null)
                return JsonConvert.SerializeObject(new ErrorCustomized("404", "NotFound"));
            return JsonConvert.SerializeObject(messageFromRepo);
        }

        [HttpPost]
        public async Task<IActionResult> CreateMessage(int userId, MessageForCreation messageForCreation)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized("Unauthorized");

            messageForCreation.SenderId = userId;

            var recipient = await this.repo.GetUser(messageForCreation.RecipientId);

            if(recipient == null)
            {
                return NotFound("NotFound");
            }

            var message = this.mapper.Map<Message>(messageForCreation);

            this.repo.Add(message);

            var messageToReturn = this.mapper.Map<MessageForCreation>(message);

            if (await this.repo.SaveAll())
            {
                return CreatedAtRoute("GetMessage", new { userId, id = message.Id}, messageToReturn);
            }

            return BadRequest("Created the message failed");

        }
    }
}