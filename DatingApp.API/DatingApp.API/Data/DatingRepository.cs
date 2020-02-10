using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.API.Data
{
    public class DatingRepository : IDatingRepository
    {
        private readonly DataContext dataContext;
        public DatingRepository(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }
        public void Add<T>(T entity) where T : class
        {
            this.dataContext.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            this.dataContext.Remove(entity);
        }

        public async Task<User> GetUser(int id)
        {
            var user = await this.dataContext.Users.Include(p => p.Photos).FirstOrDefaultAsync(u => u.Id => id);

            return user;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            var users = await this.dataContext.Users.Include(p => p.Photos).ToListAsync();

            return users;
        }

        public async Task<bool> SaveAll()
        {
            return await this.dataContext.SaveChangesAsync() > 0;
        }
    }
}
