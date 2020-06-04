using System.Collections.Generic;
using System.Threading.Tasks;
using forumApp.API.Models;

namespace forumApp.API.Data
{
    public interface IForumRepository
    {
        // dodaj nowy typ T ktory tutaj bedzie User lub Photo i bierze jako parametr model
         void Add<T>(T entity) where T :class;
         void Delete<T>(T entity) where T :class;
         Task<bool> Save();
         Task<IEnumerable<User>> GetUsers ();
         Task<User> GetUser(int id);
         Task<Thread> GetThread(int id);
         Task<IEnumerable<Thread>> GetThreads();

    }
}