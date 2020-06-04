using System;
using System.Collections.Generic;

namespace forumApp.API.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public DateTime Birth { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string Info { get; set; }
        public Photo Photo { get; set; }
        public ICollection<Thread> Threads { get; set; }

    }
}