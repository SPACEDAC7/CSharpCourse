using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.API.Models
{
    public class Token
    {
        public Token(String token, int id)
        {
            this.token = token;
            this.id = id;
        }
        public String token { get; set; }
        public int id { get; set; }
    }
}
