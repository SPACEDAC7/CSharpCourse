using DatingApp.API.Helpers;
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

        public async Task<Photo> GetMainPhotoForUser(int userId)
        {
            var photo = await this.dataContext.Photos.Where(p => p.User.Id == userId).FirstOrDefaultAsync(p => p.IsMain);
            return photo;
        }

        public async Task<Photo> GetPhoto(int id)
        {
            var photo = await this.dataContext.Photos.FirstOrDefaultAsync(p => p.Id == id);
            return photo;
        }

        public async Task<IEnumerable<Photo>> GetPhotosForUser(int userId)
        {
            var photos = await this.dataContext.Photos.Where(p => p.User.Id == userId).ToListAsync();

            return photos;
        }

        public async Task<User> GetUser(int id)
        {
            var user = await this.dataContext.Users.Include(p => p.Photos).FirstOrDefaultAsync(u => u.Id == id);

            return user;
        }

        public async Task<PagedList<User>> GetUsers(UserParams userParams)
        {
            var users = this.dataContext.Users.Include(p => p.Photos).AsQueryable();

            users = users.Where(u => u.Id != userParams.UserId);
            //This is shit but it is an example
            users = users.Where(u => u.Gender == userParams.Gender);

            if(userParams.MinAge != 18 || userParams.MaxAge != 99)
            {
                var minDob = DateTime.Today.AddYears(-userParams.MaxAge - 1);
                var maxDob = DateTime.Today.AddYears(-userParams.MinAge);

                users = users.Where(u => u.DateOfBirth >= minDob && u.DateOfBirth <= maxDob);
            }

            return await PagedList<User>.CreateAsync(users, userParams.PageNumber, userParams.PageSize);
        }

        public async Task<bool> SaveAll()
        {
            return await this.dataContext.SaveChangesAsync() > 0;
        }
    }
}
