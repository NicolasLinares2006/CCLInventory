using Microsoft.EntityFrameworkCore;
using CCLInventory.API.Models;

namespace CCLInventory.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Producto> Productos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Datos iniciales
            modelBuilder.Entity<Producto>().HasData(
                new Producto { Id = 1, Nombre = "Laptop Dell", Cantidad = 10 },
                new Producto { Id = 2, Nombre = "Mouse Logitech", Cantidad = 25 },
                new Producto { Id = 3, Nombre = "Teclado Mecánico", Cantidad = 15 },
                new Producto { Id = 4, Nombre = "Monitor 24''", Cantidad = 8 },
                new Producto { Id = 5, Nombre = "Audífonos Sony", Cantidad = 20 }
            );
        }
    }
}