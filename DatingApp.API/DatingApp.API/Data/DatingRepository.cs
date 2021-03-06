﻿using DatingApp.API.Helpers;
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

        public async Task<Like> GetLike(int userId, int recipientId)
        {
            return await this.dataContext.Likes.FirstOrDefaultAsync(u => u.LikerId == userId && u.LikeeId == recipientId);
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
            var user = await this.dataContext.Users.FirstOrDefaultAsync(u => u.Id == id);

            return user;
        }

        public async Task<PagedList<User>> GetUsers(UserParams userParams)
        {
            var users = this.dataContext.Users.OrderByDescending(u => u.LastActive).AsQueryable();

            users = users.Where(u => u.Id != userParams.UserId);
            //This is shit but it is an example
            users = users.Where(u => u.Gender == userParams.Gender);

            if(userParams.MinAge != 18 || userParams.MaxAge != 99)
            {
                var minDob = DateTime.Today.AddYears(-userParams.MaxAge - 1);
                var maxDob = DateTime.Today.AddYears(-userParams.MinAge);

                users = users.Where(u => u.DateOfBirth >= minDob && u.DateOfBirth <= maxDob);
            }

            if (userParams.Likers)
            {
                var userLikers = await GetUserLikes(userParams.UserId, true);
                users = users = users.Where(u => userLikers.Contains(u.Id));
            }

            if (userParams.Likees)
            {
                var userLikees = await GetUserLikes(userParams.UserId, false);
                users = users = users.Where(u => userLikees.Contains(u.Id));
            }

            if (!string.IsNullOrEmpty(userParams.OrderBy))
            {
                switch (userParams.OrderBy)
                {
                    case "created":
                        users = users.OrderByDescending(u => u.Created);
                        break;
                    default:
                        users = users.OrderByDescending(u => u.LastActive);
                        break;
                }
            }

            return await PagedList<User>.CreateAsync(users, userParams.PageNumber, userParams.PageSize);
        }

        private async Task<IEnumerable<int>> GetUserLikes(int id, bool likers)
        {
            var user = await this.dataContext.Users.FirstOrDefaultAsync(u => u.Id == id);

            if (likers)
            {
                return user.Likers.Where(u => u.LikeeId == id).Select(i => i.LikerId);
            }
            else
            {
                return user.Likees.Where(u => u.LikerId == id).Select(i => i.LikeeId);
            }

        }

        public async Task<bool> SaveAll()
        {
            return await this.dataContext.SaveChangesAsync() > 0;
        }

        public async Task<Message> GetMessage(int id)
        {
            return await this.dataContext.Messages.FirstOrDefaultAsync(m => m.Id == id);
        }

        public async Task<PagedList<Message>> GetMessagesForUser(MessageParams messageParams)
        {
            var messages = this.dataContext.Messages.AsQueryable();

            switch (messageParams.MessageContainer) 
            {
                case "Inbox":
                    messages = messages.Where(u => u.RecipientId == messageParams.UserId && !u.RecipientDeleted);
                    break;
                case "Outbox":
                    messages = messages.Where(u => u.SenderId == messageParams.UserId && !u.SenderDeleted);
                    break;
                default:
                    messages = messages.Where(u => u.RecipientId == messageParams.UserId && u.IsRead == false && !u.RecipientDeleted);
                    break;
            }

            messages = messages.OrderByDescending(d => d.MessageSent);
            return await PagedList<Message>.CreateAsync(messages, messageParams.PageNumber, messageParams.PageSize);
        }

        public async Task<IEnumerable<Message>> GetMessagesThread(int userId, int recipientId)
        {
            var messages = await this.dataContext.Messages
               .Where(m => m.RecipientId == userId && !m.RecipientDeleted && m.SenderId == recipientId ||
               m.RecipientId == recipientId && !m.SenderDeleted && m.SenderId == userId)
               .OrderByDescending(m => m.MessageSent)
               .ToListAsync();

            return messages;
        }
    }
}
