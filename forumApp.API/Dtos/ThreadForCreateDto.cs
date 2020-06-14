using System;

namespace forumApp.API.Dtos
{
    public class ThreadForCreateDto
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime Created { get; set; }
        public int UserId { get; set; }

        public ThreadForCreateDto()
        {
            Created = DateTime.Now;
        }
    }
}