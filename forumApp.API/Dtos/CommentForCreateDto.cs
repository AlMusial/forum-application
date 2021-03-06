using System;
using forumApp.API.Models;

namespace forumApp.API.Dtos
{
    public class CommentForCreateDto
    {
        public string Content { get; set; }
        public DateTime Created { get; set; }
        public int userId { get; set; }
        public int threadId { get; set; }
        public CommentForCreateDto()
        {
            Created = DateTime.Now;
        }
    }
}