using Microsoft.EntityFrameworkCore;
using MvcReact.Models;

namespace MvcReact.Data
{
    public class ApplicationDbContext :DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Sale>()
                .HasOne<Product>(p => p.Product)
                .WithMany(s => s.Sales)
                .HasForeignKey(pi => pi.ProductId);

            modelBuilder.Entity<Sale>()
                .HasOne<Customer>(p => p.Customer)
                .WithMany(s => s.Sales)
                .HasForeignKey(pi => pi.CustomerId);

            modelBuilder.Entity<Sale>()
                .HasOne<Store>(p => p.Store)
                .WithMany(s => s.Sales)
                .HasForeignKey(pi => pi.StoreId);
        }

        public DbSet<Customer> Customers { get; set; }

        public DbSet<Product> Products { get; set; }

        public DbSet<Store> Stores { get; set; }    

        public DbSet<Sale> Sales { get; set; }

        
    }
}
