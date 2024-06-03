using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SanmorePlatform_REAL_Model.ViewModels;
using SanmorePlatform_REAL_Service.Interface;

namespace SanmorePlatform_REAL_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BorrowerController : ControllerBase
    {
        private readonly IBorrowerService _borrowerService;
        public BorrowerController(IBorrowerService borrowerService)
        {
            _borrowerService = borrowerService;
        }
        /// <summary>
        /// Method is used for Registration Broker
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost("BorrowerRegister")]
        public async Task<IActionResult> BorrowerRegister([FromForm] BorrowerViewModel model)
        {
            var borrowers = await _borrowerService.AddBorrowerAsync(model);
            return Ok(borrowers);
        }
    }
}
