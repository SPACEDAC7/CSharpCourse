using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DatingApp.API.Data
{
     
    public class AuthRepository : IAuthRepository
    {
        DataContext _context;

        public AuthRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<User> Login(string username, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Username.Equals(username));

            if (user == null)
                return null;

            Console.WriteLine("Usuario para el login. Username: " + user.Username + " , PaswordHash: ");
            Console.WriteLine(Encoding.UTF8.GetString(user.PasswordHash));
            Console.WriteLine("Salt: ");
            Console.WriteLine(Encoding.UTF8.GetString(user.PasswordSalt));

            if (!VerifyUser(password, user.PasswordHash, user.PasswordSalt))
            {
                return null;
            }
            return user;
        }

        private bool VerifyUser(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                Console.WriteLine("Password hash: ");
                Console.WriteLine(Encoding.UTF8.GetString(passwordHash));
                Console.WriteLine("ComputedHash: ");
                Console.WriteLine(Encoding.UTF8.GetString(computedHash));
                for (int i=0; i< computedHash.Length; i++)
                {
                    Console.WriteLine(i + " - ComputedHash: " + computedHash[i] + " - PasswordHash: " + passwordHash[i]);
                    if (computedHash[i] != passwordHash[i]) return false;
                }

            }
            return true;

        }

        public async Task<User> Register(User user, string password)
        {
            byte[] passwordHash, passwordSalt;

            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            await _context.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;


        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }
                
        }

        public async Task<bool> UserExists(string username)
        {
            return await this._context.Users.AnyAsync(x => x.Username == username);
        }
    }
}
