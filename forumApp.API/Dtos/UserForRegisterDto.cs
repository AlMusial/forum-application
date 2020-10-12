using System;
using System.ComponentModel.DataAnnotations;

namespace forumApp.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "Password has to be between 4 and 8 characters")]
        public string Password { get; set; }
        
        [Required]
        public DateTime Birth { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
    
    public UserForRegisterDto()
    {
        Created = DateTime.Now;
        LastActive = DateTime.Now;
    }
    }
}