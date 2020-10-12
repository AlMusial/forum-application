using System;

namespace forumApp.API.Dtos
{
    public class PhotoForReturnDto
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public DateTime Date { get; set; }
        public string PublicId { get; set; }
    }
}