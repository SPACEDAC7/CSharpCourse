﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.API.DTOs
{
    public class UserForLogin
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}