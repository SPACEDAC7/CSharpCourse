using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.API.DTOs
{
    public class UserForRegister
    {
        [Required]
        public string Username {get;set;}

        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage ="You must specify password between 4 and 8 characters")]
        public string Password {get;set;}

        public string Gender { get; set; }
        public string KnownAs { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }

        public UserForRegister()
        {
            this.Created = DateTime.Now;
            this.LastActive = DateTime.Now;
        }
    }
}
