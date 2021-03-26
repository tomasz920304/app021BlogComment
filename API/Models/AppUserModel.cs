using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class AppUserModel
    {
        [Required, MinLength(3)]
        public string UserName { get; set; }
        [Required, EmailAddress]
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        [Required, MinLength(3)]
        public string Password { get; set; }
        public string FullName { get; set; }
        public string Role { get; set; }
    }
}
