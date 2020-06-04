using System;

namespace forumApp.API.Dtos
{
    public class ThreadsForProfileDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime Created { get; set; }
        public string Content { get; set; }
    }
}