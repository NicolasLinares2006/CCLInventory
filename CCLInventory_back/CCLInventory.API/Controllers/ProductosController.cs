using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CCLInventory.API.Data;
using CCLInventory.API.Models;

namespace CCLInventory.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ProductosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductosController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("movimiento")]
        public async Task<IActionResult> RegistrarMovimiento([FromBody] MovimientoRequest request)
        {
            var producto = await _context.Productos.FindAsync(request.ProductoId);

            if (producto == null)
                return NotFound(new { message = "Producto no encontrado" });

            if (request.Tipo.ToLower() == "entrada")
            {
                producto.Cantidad += request.Cantidad;
            }
            else if (request.Tipo.ToLower() == "salida")
            {
                if (producto.Cantidad < request.Cantidad)
                    return BadRequest(new { message = "Cantidad insuficiente en inventario" });

                producto.Cantidad -= request.Cantidad;
            }
            else
            {
                return BadRequest(new { message = "Tipo de movimiento inválido. Use 'entrada' o 'salida'" });
            }

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = $"Movimiento registrado exitosamente",
                producto = new { producto.Id, producto.Nombre, producto.Cantidad }
            });
        }

        [HttpGet("inventario")]
        public async Task<IActionResult> GetInventario()
        {
            var productos = await _context.Productos
                .OrderBy(p => p.Id)
                .ToListAsync();

            return Ok(productos);
        }
    }
}