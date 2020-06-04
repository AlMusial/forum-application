using System;
using System.Collections.Generic;
using forumApp.API.Models;

namespace forumApp.API.Dtos
{
    public class UserForProfileDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string Info { get; set; }
        public string ProfilePhoto { get; set; }
        public ICollection<ThreadsForProfileDto> Threads { get; set; }
    }
}