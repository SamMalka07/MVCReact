using Microsoft.AspNetCore.Mvc;
using MvcReact.Data;
using MvcReact.Models;

namespace MvcReact.Controllers
{
    public class ProductController : Controller
    {
        private readonly ApplicationDbContext _db;

        public ProductController(ApplicationDbContext db)
        {
            _db = db;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult ProductList()
        {
            var getAllProducts = _db.Products.ToList();
            return Json(getAllProducts);
        }

        public IActionResult FindById(int id)
        {
            var editingCustomer = _db.Products.Find(id);
            return Json(editingCustomer);
        }

        [HttpDelete]
        public IActionResult Delete(int id) 
        {
            var deletingItem = _db.Products.Find(id);
            if(deletingItem != null)
            {
                _db.Products.Remove(deletingItem);
                _db.SaveChanges();
                return Json(new { status = "success" });
            }
            return Json(new {status="error"});
        }

        public IActionResult Create([FromBody] Product data)
        {
            ModelState.Remove("Sales");

            if(ModelState.IsValid)
            {
                Product productObj = new()
                {
                    Name = data.Name,
                    Price = data.Price
                };
                _db.Products.Add(productObj);
                _db.SaveChanges();
                return Json(new { StatusCode="success"});
            }
            else
            {
                var errors = ModelState.Select(x => x.Value.Errors)
                           .Where(y => y.Count > 0)
                           .ToList();

                return Json(new { status = "error", message = errors });
            }
        }

        public IActionResult Edit([FromBody] Product data)
        {
            ModelState.Remove("Sales");

            if(ModelState.IsValid)
            {
                _db.Products.Update(data);
                _db.SaveChanges();
                return Json(new { status = "success" });
            }

            var errors = ModelState.Select(x => x.Value.Errors)
                           .Where(y => y.Count > 0)
                           .ToList();

            return Json(new { status = "error", message = errors });
        }

    }
}
