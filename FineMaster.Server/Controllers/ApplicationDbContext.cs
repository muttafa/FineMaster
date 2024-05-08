using System.Collections.Generic;
using FineMaster.Server.Models;
using Microsoft.EntityFrameworkCore;
using static FineMaster.Server.Models.UserLessons;
public class ApplicationDBContext : DbContext
{
    public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options)
        : base(options)
    {
    }
    public DbSet<Users> Users { get; set; }
    public DbSet<Lessons> Lessons { get; set; }
    public DbSet<Ad> Ads { get; set; }
    public DbSet<Conversation> Conversations { get; set; }
    public DbSet<UserLesson> UserLessons { get; set; }
    public DbSet<Message> Message { get; set; }

}