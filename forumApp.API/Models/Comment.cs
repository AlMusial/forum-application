using System;
namespace forumApp.API.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime Created { get; set; }
        public User User { get; set; }
    }
}