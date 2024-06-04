using Microsoft.AspNetCore.Mvc;
using SanmorePlatform_REAL_Web.Models;

namespace SanmorePlatform_REAL_Web.Controllers
{
    public class AboutUsController : Controller
    {
        // GET: AboutUs
        [HttpGet]
        public IActionResult Index()
        {
            var model = new AboutUsModel
            {

            };

            return View(model);
        }
    }
}
