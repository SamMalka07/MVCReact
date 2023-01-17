using Microsoft.AspNetCore.Mvc;
using MvcReact.Data;
using MvcReact.Models;

namespace MvcReact.Controllers
{
    public class StoreController : Controller
    {
        private readonly ApplicationDbContext _db;

        public StoreController(ApplicationDbContext db)
        {
            _db = db;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult StoreList()
        {
            var getAllStores = _db.Stores.ToList();
            return Json(getAllStores);
        }

        [HttpDelete]
        public IActionResult Delete(int id)
        {
            var deletingItem = _db.Stores.Find(id);
            if (deletingItem != null)
            {
                _db.Stores.Remove(deletingItem);
                _db.SaveChanges();
                return Json(new { status = "success" });
            }

            return Json(new { status = "error" });
        }

        
        public IActionResult FindById(int id)
        {
            var editingItem = _db.Stores.Find(id);
            return Json(editingItem);
        }

        [HttpPost]
        public IActionResult Create([FromBody]Store data)
        {
            ModelState.Remove("Sales");

            if (ModelState.IsValid)
            {
                Store storeObj = new()
                {
                    Name = data.Name,
                    Address = data.Address,
                };
                _db.Stores.Add(storeObj);
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

        [HttpPost]
        public IActionResult Edit([FromBody]Store data)
        {
            ModelState.Remove("Sales");

            if (ModelState.IsValid)
            {
                _db.Stores.Update(data);
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
    }
}
