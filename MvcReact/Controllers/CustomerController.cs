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

        [HttpPost]
        public IActionResult Create([FromBody] Customer data)
        {

            ModelState.Remove("Sales");

            if (ModelState.IsValid)
            {
                Customer customerObj = new()
                {
                    Name = data.Name,
                    Address = data.Address,
                };
                _db.Customers.Add(customerObj);
                _db.SaveChanges();
                return Json(new { status = "success" });
            }
            else
            {
                var errors = ModelState.Select(x => x.Value.Errors)
                           .Where(y => y.Count > 0)
                           .ToList();

                return Json(new { status = "error", message=errors});
            }
            
        }

        [HttpPost]
        public IActionResult Edit([FromBody] Customer data)
        {

            ModelState.Remove("Sales");

            if (ModelState.IsValid)
            {
                _db.Customers.Update(data);
                _db.SaveChanges();
                return Json(new { status = "success" });
            }
            else
            {
                var errors = ModelState.Select(x => x.Value.Errors)
                           .Where(y => y.Count > 0)
                           .ToList();

                return Json(new { status = "error", message = errors });
            }

        }

        [HttpDelete]
        public IActionResult Delete(int id)
        {
            var findCustomer = _db.Customers.Find(id);
            if(findCustomer != null)
            {
                _db.Customers.Remove(findCustomer);
                _db.SaveChanges();
                return Json(new { status = "success" });
            }
            return Json(new {status="error"});
        }
    }
}
