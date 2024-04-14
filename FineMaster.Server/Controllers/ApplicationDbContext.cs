using System.Collections.Generic;
using FineMaster.Server.Models;
using Microsoft.EntityFrameworkCore;
public class ApplicationDBContext : DbContext
{
    public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options)
        : base(options)
    {
    }
    public DbSet<Users> Users { get; set; }
    public DbSet<Lessons> Lessons { get; set; }
    public DbSet<Ad> Ads { get; set; }

}