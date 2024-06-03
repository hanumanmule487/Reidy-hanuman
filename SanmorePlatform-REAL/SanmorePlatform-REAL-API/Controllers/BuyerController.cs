using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SanmorePlatform_REAL_Model.ViewModels;
using SanmorePlatform_REAL_Model.ViewModels.BuyerModels;
using SanmorePlatform_REAL_Model.ViewModels.DocumentsModel;
using SanmorePlatform_REAL_Service.Interface;

namespace SanmorePlatform_REAL_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BuyerController : ControllerBase
    {
        private readonly IBuyerService _buyerService;
        public BuyerController(IBuyerService buyerService)
        {
            _buyerService = buyerService;
        }
        /// <summary>
        /// Method is used for Registration Broker
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        //[HttpPost("BorrowerRegister")]
        //public async Task<IActionResult> BorrowerRegister([FromForm] BorrowerViewModel model)
        //{
        //    var borrowers = await _borrowerService.AddBorrowerAsync(model);
        //    return Ok(borrowers);
        //}

        [HttpGet("GetUserById")]
        public async Task<IActionResult> GetUserById(string id)
        {
            var userList = await _buyerService.GetUserById(id);
            return Ok(userList);
        }

        [HttpPost("BuyerRegistration")]
        public async Task<IActionResult> BuyerRegistration(/*[FromBody]*/ BuyerViewModel buyerModel)
        {
            if (!ModelState.IsValid)
            {
                return Ok(new { Message = "Error accured while adding property" });
            }
            else
            {
                var id = await _buyerService.BuyerRegistrationAsync(buyerModel);
                return Ok(new { Message = "Successfully added" });
            }
        }

        [HttpGet("GetPropertyStateList")]
        public async Task<IActionResult> GetPropertyStateList()
        {
            var propertyStateList = await _buyerService.GetPropertyStateListAsync();
            return Ok(propertyStateList);
        }


        //[HttpGet("DeketeWorkExp")]
        //public async Task<IActionResult> DeketeWorkExp()
        //{
        //    var propertyStateList = await _buyerService.GetPropertyStateListAsync();
        //    return Ok(propertyStateList);
        //}

    }
}
