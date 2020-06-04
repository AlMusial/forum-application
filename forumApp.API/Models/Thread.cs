using System;
using System.Collections.Generic;

namespace forumApp.API.Models
{
    public class Thread
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime Created { get; set; }
        public string Content { get; set; }
        public User User { get; set; }
    }
}