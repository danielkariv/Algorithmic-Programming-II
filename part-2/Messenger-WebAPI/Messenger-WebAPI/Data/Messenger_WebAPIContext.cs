using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Messenger_WebAPI;

namespace Messenger_WebAPI.Data
{
    public class Messenger_WebAPIContext : DbContext
    {
        public Messenger_WebAPIContext (DbContextOptions<Messenger_WebAPIContext> options)
            : base(options)
        {
        }

        public DbSet<Messenger_WebAPI.Models.User>? Users { get; set; }

        public DbSet<Messenger_WebAPI.Models.Contact>? Contacts { get; set; }

        public DbSet<Messenger_WebAPI.Models.Message>? Messages { get; set; }

    }
}
