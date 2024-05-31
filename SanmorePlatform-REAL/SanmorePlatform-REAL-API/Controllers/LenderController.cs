using Microsoft.AspNetCore.Mvc;
using SanmorePlatform_REAL_Model.ViewModels.LenderViewModel;
using SanmorePlatform_REAL_Service.Interface;

namespace SanmorePlatform_REAL_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LenderController : ControllerBase
    {
        private readonly ILenderService _service;
        public LenderController(ILenderService service)
        {
            _service = service;
        }

        /// <summary>
        /// Create a method to get basic user info
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("GetBasicUserInfo")]
        public async Task<IActionResult> GetBasicUserInfo(string id)
        {
            try
            {
                var userList = await _service.GetBasicUserInfo(id);
                return Ok(userList);
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// Create a method to register lender into database
        /// </summary>
        /// <param name="lenderModel"></param>
        /// <returns></returns>
        [HttpPost("LenderRegister")]
        public async Task<IActionResult> LenderRegister([FromBody] LenderModel lenderModel)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return Ok(new { Message = "Error accured while register Lender details" });
                }
                else
                {
                    var id = await _service.LenderRegisterAsync(lenderModel);
                    return Ok(new { Message = "Successfully register." });
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// Create method to get lender signup info 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("LenderProfile")]
        public async Task<IActionResult> LenderProfile(string id)
        {
            try
            {
                var userList = await _service.GetLenderById(id);
                return Ok(userList);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost("UpdateLenderProfile")]
        public async Task<IActionResult> UpdateLenderProfile([FromBody] LenderModel lenderModel)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return Ok(new { Message = "Error accured while register Lender details" });
                }
                else
                {
                    var id = await _service.UpdateLenderProfileAsync(lenderModel);
                    return Ok(new { Message = "Successfully register." });
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        ///Create method to create a new lender product
        /// </summary>
        /// <param name="productModel"></param>
        /// <returns></returns>
        [HttpPost("AddLenderProduct")]
        public async Task<IActionResult> AddLenderProduct(LenderProductModel productModel)
        {
            if (!ModelState.IsValid)
            {
                return Ok(new { Message = "Error occurred while adding lender product" });
            }
            else
            {
                var id = await _service.AddLenderProductAsync(productModel);
                return Ok(new { Message = "Successfully added" });
            }
        }

        /// <summary>
        /// Create a method to get all country name 
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetCountryList")]
        public async Task<IActionResult> GetCountryList()
        {
            var countryList = await _service.GetCountryListAsync();
            return Ok(countryList);
        }

       

        /// <summary>
        /// Create a method to update the status of lending product
        /// </summary>
        /// <param name="productModel"></param>
        /// <returns></returns>
        [HttpPost("UpdateStatus")]
        public async Task<IActionResult> UpdateStatus([FromBody] LenderProductModel productModel)
        {
            if (!ModelState.IsValid)
            {
                return Ok(new { Message = "Error occurred while adding lender product" });
            }
            else
            {
                var id = await _service.UpdateStatusAsync(productModel);
                return Ok(new { Message = "Successfully added" });
            }
        }


        [HttpPost("SaveProgress")]
        public async Task<IActionResult> SaveProgress([FromBody] LenderModel lenderModel)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return Ok(new { Message = "Error accured while register Lender details" });
                }
                else
                {
                    var id = await _service.SaveProgressAsync(lenderModel);
                    return Ok(new { Message = "Successfully register." });
                }
            }
            catch (Exception)
            {
                throw;
            }
        }


        /// <summary>
        /// Create method to get lender product list for edit
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("EditLenderProductList")]
        public async Task<IActionResult> EditLenderProductList(string id)
        {
            try
            {

                var userList = await _service.GetLenderProductByIdAsync(id);
                return Ok(userList);
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// Create a method to get all the list of lending product
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("GetLenderProductList")]
        public async Task<IActionResult> GetLenderProductList(string id)
        {
            try
            {
                var productList = await _service.GetLenderProductListAsync(id);
                return Ok(productList);
            }
            catch (Exception)
            {
                throw;
            }

        }


        [HttpPost("UpdateLenderProduct")]
        public async Task<IActionResult> UpdateLenderProduct([FromBody] LenderProductModel productModel)
        {
            if (!ModelState.IsValid)
            {
                return Ok(new { Message = "Error occurred while adding lender product" });
            }
            else
            {
                var id = await _service.UpdateLenderProductAsync(productModel);
                return Ok(new { Message = "Successfully added" });
            }
        }



    }
}
