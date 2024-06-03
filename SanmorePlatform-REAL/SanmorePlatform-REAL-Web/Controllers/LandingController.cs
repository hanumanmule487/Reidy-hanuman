using Microsoft.AspNetCore.Mvc;

namespace SanmorePlatform_REAL_Web.Controllers
{
    public class LandingController : Controller
    {
        public IActionResult Landing()
        {
            return View();
        }
    }
}
