﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.API.Data;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly DataContext _context;
        public ValuesController(DataContext dataContext)
        {
            _context = dataContext;
        }
        // GET api/values
        [HttpGet]
        [Authorize(Roles = "Member")]
        public async Task<IActionResult> GetValues()
        {
            var values = await _context.Values.ToListAsync();
            return Ok(values);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        [Authorize( Roles = "Admin")]
        public async Task<IActionResult> GetValue(int id)
        {
            var values = await _context.Values.FirstOrDefaultAsync(x => x.Id.Equals(id));
            return Ok(values);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
            var valueToAdd = new Value();
            valueToAdd.Name = value;
            _context.Values.Add(valueToAdd);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}