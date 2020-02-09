using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.API.Models
{
    public class Token
    {
        public Token(String token)
        {
            this.token = token;
        }
        public String token { get; set; }
    }
}
