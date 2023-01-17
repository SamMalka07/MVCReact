namespace MvcReact.Models
{
    public class Sale
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public Customer Customer { get; set; }

        public int StoreId { get; set; }

        public Store Store { get; set; }

        public int ProductId { get; set; }

        public Product Product { get; set; }

        public DateTime DateSold { get; set; } = DateTime.Now;
    }
}
