using System;
using System.Collections.Generic;

namespace forumApp.API.Models
{
    public class Issue
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime Created { get; set; }
        public string Content { get; set; }
        public ICollection<Photo> Photo { get; set; }
    }
}