using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Reviews_WebApp.Models;

namespace Reviews_WebApp.Data
{
    public class Reviews_WebAppContext : DbContext
    {
        public Reviews_WebAppContext (DbContextOptions<Reviews_WebAppContext> options)
            : base(options)
        {
        }

        public DbSet<Reviews_WebApp.Models.Review>? Review { get; set; }
    }
}
