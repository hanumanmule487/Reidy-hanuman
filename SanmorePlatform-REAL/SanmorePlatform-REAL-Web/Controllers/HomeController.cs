using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SanmorePlatform_REAL_Web.Models;
using System.Diagnostics;

namespace SanmorePlatform_REAL_Web.Controllers
{
    public class HomeController : Controller
    {
        //private readonly ILogger<HomeController> _logger;

        //public HomeController(ILogger<HomeController> logger)
        //{
        //    _logger = logger;
        //}
        public IActionResult Index()
        
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        //[Authorize]
        public IActionResult PropertyDetails(int propertyId)
        {
            try
            {
                return View();
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}