using forumApp.API.Models;
using Microsoft.AspNetCore.Http;

namespace forumApp.API.Dtos
{
    public class UserForUpdateDto
    {
        public string Info { get; set; }
        public string Username { get; set; }
        public string PhotoUrl { get; set; }
        public IFormFile File { get; set; }
        public string PublicId { get; set; }

    }
}