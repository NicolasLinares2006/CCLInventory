namespace CCLInventory.API.Models
{
    public class MovimientoRequest
    {
        public int ProductoId { get; set; }
        public string Tipo { get; set; } = string.Empty; // "entrada" o "salida"
        public int Cantidad { get; set; }
    }
}