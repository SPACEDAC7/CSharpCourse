using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using DatingApp.API.DTOs;
using DatingApp.API.Helpers;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [Route("api/users/{userId}/photos")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly IDatingRepository repo;
        private readonly IMapper mapper;
        private readonly IOptions<CloudinarySettings> cloudinaryConfig;
        private readonly Cloudinary cloudinary;
        public PhotosController(IDatingRepository repo, IMapper mapper, IOptions<CloudinarySettings> cloudinaryConfig)
        {
            this.repo = repo;
            this.mapper = mapper;
            this.cloudinaryConfig = cloudinaryConfig;

            Account account = new Account(
              this.cloudinaryConfig.Value.CloudName,
              this.cloudinaryConfig.Value.ApiKey,
              this.cloudinaryConfig.Value.ApiSecret);

            this.cloudinary = new Cloudinary(account);
        }

        [HttpGet("{id}", Name = "GetPhoto")]
        public async Task<String> GetPhoto(int id)
        {
            var photoFromRepo = await this.repo.GetPhoto(id);
            var photo = this.mapper.Map<PhotoForReturn>(photoFromRepo);

            return JsonConvert.SerializeObject(photo);
        }

        [HttpPost]
        public async Task<IActionResult> AddPhotoForUser(int userId, PhotoForCreation photoForCreation)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return BadRequest("Could not add photo");
                /*return JsonConvert.SerializeObject(new ErrorCustomized("401", "Unauthorized"));*/
            var user = await this.repo.GetUser(userId);

            var file = photoForCreation.File;
            var uploadResult = new ImageUploadResult();

            if(file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation().Width(500).Height(500).Crop("fill").Gravity("face")
                    };

                    uploadResult = this.cloudinary.Upload(uploadParams);
                }
            }

            photoForCreation.Url = uploadResult.Uri.ToString();
            photoForCreation.PublicId = uploadResult.PublicId;

            var photo = this.mapper.Map<Photo>(photoForCreation);

            if(!user.Photos.Any(u => u.IsMain))
            {
                photo.IsMain = true;
            }

            user.Photos.Add(photo);

            if(await this.repo.SaveAll())
            {
                var photoToReturn = this.mapper.Map<PhotoForReturn>(photo);
                return CreatedAtRoute("GetPhoto", new { userId = userId, id = photo.Id }, photoToReturn);
                /*return JsonConvert.SerializeObject(new CorrectReturn("Photo uploaded correctly"));*/
            }

            return BadRequest("Could not add photo");

        }

    }
}