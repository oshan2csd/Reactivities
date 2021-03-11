using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {            
        }
        
        //Thsi property name ("Activities") reflects the DB table name
        public DbSet<Activity> Activities { get; set; }
    }
}