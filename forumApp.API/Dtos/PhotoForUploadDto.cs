using System;
using Microsoft.AspNetCore.Http;

namespace forumApp.API.Dtos
{
    public class PhotoForUploadDto
    {
        public string Url { get; set; }
        public IFormFile File { get; set; }
        public DateTime Date { get; set; }
        public string PublicId { get; set; }

        public PhotoForUploadDto()
        {
            Date = DateTime.Now;
        }
    }
}