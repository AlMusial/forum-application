using System;

namespace forumApp.API.Dtos
{
    public class CommentsForThreadDto
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime Created { get; set; }
        public string Username { get; set; }
        public string Photo { get; set; }
        public int UserId { get; set; }
        public int threadId { get; set; }

    }
}