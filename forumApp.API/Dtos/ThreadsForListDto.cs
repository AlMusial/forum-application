using System;
using System.Collections.Generic;
using forumApp.API.Models;

namespace forumApp.API.Dtos
{
    public class ThreadsForListDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime Created { get; set; }
        public string Content { get; set; }
        public string Username { get; set; }
        public int UserId { get; set; }
        public string Photo { get; set; }
        public IEnumerable<CommentsForThreadDto> Comments { get; set; }
    }
}