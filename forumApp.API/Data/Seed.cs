using System.Collections.Generic;
using System.Linq;
using forumApp.API.Models;
using Newtonsoft.Json;

namespace forumApp.API.Data
{
    public class Seed
    {
        public static void SeedUsers(DataContext context) // nie tworzymy nowych instancji klasy seed
         {
            if (!context.Users.Any()) // dodanie nowych users tylko jesli baza jest pusta
            {
                var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
                var users = JsonConvert.DeserializeObject<List<User>>(userData); // konwersja na obiekty user

                foreach (var user in users)
                {
                    byte[] hash, salt;
                    CreatePasswordHash("password", out hash, out salt);

                    user.PasswordHash = hash;
                    user.PasswordSalt = salt;
                    user.Username = user.Username.ToLower();
                    context.Users.Add(user);
                } 

                context.SaveChanges();
            }
         }

         private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt) // obie musza byc static
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }
}