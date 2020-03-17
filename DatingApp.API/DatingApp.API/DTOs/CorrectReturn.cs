using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.API.DTOs
{
    public class CorrectReturn
    {
        private string message { get; set; }

        public CorrectReturn(string message)
        {
            this.message = message;
        }
    }
}
