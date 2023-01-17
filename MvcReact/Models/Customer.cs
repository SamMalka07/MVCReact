using System.ComponentModel.DataAnnotations;

namespace MvcReact.Models
{
    public class Customer
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Address { get; set; }

        public List<Sale> Sales { get; set; }


    }
}
