using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SanmorePlatform_REAL_Service.Interface;
namespace SanmorePlatform_REAL_API.Controllers
{ 
    [Route("api/[controller]")]
    [ApiController]

    [Authorize(Roles = "TransactionCoordinator")]
    public class TransactionCoordinator : ControllerBase
    {
        private readonly ITransactionCoordinator _transactionCoordinator;

        public TransactionCoordinator(ITransactionCoordinator transactionCoordinatorService)
        {
            _transactionCoordinator = transactionCoordinatorService;
        }

        [HttpGet("GetAllPropertyListing")]
        public async Task<IActionResult> GetAllPropertyListing()
        {
            try
            {
                var getingAllProp = await _transactionCoordinator.GetAllPropList();
                if (getingAllProp.Count > 0)
                {
                    return Ok(getingAllProp);
                }
                return Ok(getingAllProp);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet("GetPropertyById")]
        public async Task<IActionResult> GetPropertyById(int propertyId)
        {
            try
            {
                var propById = await _transactionCoordinator.GetPropById(propertyId);
                if (propById != null)
                {
                    return Ok(propById);
                }
                return NotFound();
            }
            catch (Exception)
            {
                throw;
            }
        }


        [HttpGet("GetAllUserList")]
        public async Task<IActionResult> GetAllUserList()
        {
            try
            {
                var getingAllProp = await _transactionCoordinator.GetAllUserList();
                if (getingAllProp.Count > 0)
                {
                    return Ok(getingAllProp);
                }
                return Ok(getingAllProp);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost("UpdatePropertyStatus")]
        public async Task<IActionResult> UpdatePropertyStatus(int propertyId, string status)
        {
            try
            {
                var data = await _transactionCoordinator.UpdatePropStatus(propertyId, status);
                if (data.Success == true)
                {
                    return Ok();
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet("PropertyListingFilterTC")]
        public async Task<IActionResult> PropertyListingFilterTC([FromQuery] string search)
        {
            try
            {
                var data = await _transactionCoordinator.FilterPropertyListing(search);
                if (data.Count > 0)
                {
                    return Ok(data);
                }
                return Ok();
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
