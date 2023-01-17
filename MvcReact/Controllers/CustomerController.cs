using Microsoft.AspNetCore.Mvc;
using MvcReact.Data;
using MvcReact.Models;

namespace MvcReact.Controllers
{
    public class CustomerController : Controller
    {
        private readonly ApplicationDbContext _db;

        public CustomerController(ApplicationDbContext db)
        {
            _db = db;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult CustomerList()
        {
            var getAllCustomers = _db.Customers.ToList();
            return Json(getAllCustomers);
        }

        public IActionResult FindById(int id)
        {
            var editingCustomer = _db.Customers.Find(id);
            return Json(editingCustomer);
        }

        
    }
}
