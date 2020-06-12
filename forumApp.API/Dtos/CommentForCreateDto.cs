using System;

namespace forumApp.API.Dtos
{
    public class CommentForCreateDto
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime Created { get; set; }
        public CommentForCreateDto()
        {
            Created = DateTime.Now;
        }
    }
}