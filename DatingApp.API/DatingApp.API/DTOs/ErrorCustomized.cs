using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.API.DTOs
{
    public class ErrorCustomized
    {
        public ErrorCustomized(String errorCode, String errorMessage)
        {
            this.errorCode = errorCode;
            this.errorMessage = errorMessage;
        }
        public String errorCode { get; set; }
        public String errorMessage { get; set; }
    }
}
