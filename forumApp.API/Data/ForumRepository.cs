using System.Collections.Generic;
using System.Threading.Tasks;
using forumApp.API.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace forumApp.API.Data
{
    public class ForumRepository : IForumRepository
    {
        private readonly DataContext _context;

        public ForumRepository(DataContext context)
        {
            _context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<User> GetUser(int id)
        { 
            // aby zaladowac tez zdj profilowe trzeba dac include
            var user = await _context.Users.Include(c => c.Comments).Include(p => p.Photo).Include(t => t.Threads).FirstOrDefaultAsync( u => u.Id == id);
            return user;
        }

        public async Task<Photo> GetPhoto(int id)
        { 
            // aby zaladowac tez zdj profilowe trzeba dac include
            var photo = await _context.Photos.FirstOrDefaultAsync( u => u.Id == id);
            return photo;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            var users = await _context.Users.Include(p => p.Photo).Include( t => t.Threads).ToListAsync(); // pobranie listy uzytkownikow razem z profilowymi
            return users;
        }
        
        // public async Task<Thread> AddThread(Thread thread)
        // {
        //     return Ok();
        // }
        public async Task<Thread> GetThreadForProfile(int id)
        {
            var thread = await _context.Threads.Include(a => a.User.Photo).FirstOrDefaultAsync( u => u.User.Id == id);
            return thread;
        }

        public async Task<Thread> GetThread(int id)
        {
            var thread = await _context.Threads.Include(c => c.Comments).Include(a => a.User.Photo).FirstOrDefaultAsync( t => t.Id == id);
            return thread;
        }
        public async Task<IEnumerable<Thread>> GetThreads()
        {
            var threads = await _context.Threads.Include(c => c.Comments).Include( u => u.User.Photo).ToListAsync();
            return threads;
        }

        public async Task<bool> Save()
        {
            return await _context.SaveChangesAsync() > 0; // aby funkcja zwrocila true- kiedy wieksza od zero albo false gdy rowne 0

        }

        public async Task<Comment> GetComment(int id)
        {
            var comment = await _context.Comments.Include(u => u.User).Include(p => p.User.Photo).FirstOrDefaultAsync(c => c.Id == id);
            return comment;
        }
        public async Task<IEnumerable<Comment>> GetCommentsForThread(int id)
        {
            var comments = await _context.Comments.Include(u => u.User.Photo).Where(c => c.ThreadId == id).ToListAsync();
            return comments;
        }
    }
}