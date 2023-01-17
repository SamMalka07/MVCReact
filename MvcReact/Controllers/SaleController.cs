using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using MvcReact.Data;
using MvcReact.Models;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace MvcReact.Controllers
{
    public class SaleController : Controller
    {
        private readonly ApplicationDbContext _db;
        public SaleController(ApplicationDbContext db)
        {
            _db= db;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public IActionResult SalesList()
        {
            var getAllSales = _db.Sales
                .Include(d=>d.Product)
                .Include(d=>d.Customer)
                .Include(d=>d.Store)
                .Select(d => new
                {
                    id=d.Id,
                    productName = d.Product.Name, 
                    customerName=d.Customer.Name, 
                    storeName=d.Store.Name,
                    dateSold=d.DateSold
                })
                .ToList();

            return Json(getAllSales);
        }

        [HttpPost]
        public IActionResult Create([FromBody] Sale data)
        {
            ModelState.Remove("Store");
            ModelState.Remove("Customer");
            ModelState.Remove("Product");
            if (ModelState.IsValid)
            {
                Sale saleObj = new()
                {
                    CustomerId = data.CustomerId,
                    StoreId = data.StoreId,
                    ProductId = data.ProductId,
                    DateSold = data.DateSold,
                };
                _db.Sales.Add(saleObj);
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
            var deletingItem = _db.Sales.Find(id);
            if (deletingItem != null)
            {
                _db.Sales.Remove(deletingItem);
                _db.SaveChanges();
                return Json(new { status = "success" });
            }
            return Json(new { status = "error" });
        }


        [HttpGet]
        public IActionResult FindById(int id)
        {
            //var findItem = _db.Sales.Find(id);

            var findItem = _db.Sales
                .Include(x => x.Customer)
                .Include(x => x.Store)
                .Include(x => x.Product).
                SingleOrDefault(x => x.Id == id);
            ;

            if (findItem != null)
            {
                return Json(new 
                {
                    Id= findItem.Id, 
                    DateSold=findItem.DateSold, 
                    CustomerId=findItem.Customer.Id, 
                    CustomerName=findItem.Customer.Name,
                    ProductId=findItem.Product.Id,
                    ProductName = findItem.Product.Name,
                    StoreId = findItem.Store.Id,
                    StoreName = findItem.Store.Name,
                });
            }

            return Json(new { status = "error" });
        }

        [HttpPost]
        public IActionResult Edit([FromBody]Sale data)
        {
            ModelState.Remove("Store");
            ModelState.Remove("Customer");
            ModelState.Remove("Product");

            if (ModelState.IsValid)
            {
                _db.Sales.Update(data);
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
