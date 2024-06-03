using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SanmorePlatform_REAL_Model.ViewModels;
using SanmorePlatform_REAL_Service.Interface;
using System.Net;

namespace SanmorePlatform_REAL_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrokerController : ControllerBase
    {
        private readonly IBrokerService _service;
        public BrokerController(IBrokerService service)
        {
            _service = service;
        }
        /// <summary>
        /// Method is used for Registration Broker
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost("BrokerRegister")]
        public async Task<IActionResult> BrokerRegister(BrokerViewModel model)
        {
            var data = await _service.AddBrokerAsync(model);
            return Ok(data);
        }


        /// <summary>
        /// this API is to get the broker profile details on the view
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("GetBrokerProfile")]
        public async Task<IActionResult> GetBrokerProfile(string id)
        {
            try
            {
                var data = await _service.GetBrokerProfile(id);
                if (data != null)
                {
                    return Ok(data);
                }
                else
                {
                    return NotFound(data);
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// this API is to update the broker profile
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPut("UpdateBrokerProfile")]
        public async Task<IActionResult> UpdateBrokerProfile(BrokerProfileModel model)
        {
            try
            {
                var data = await _service.UpdateBrokerProfile(model);
                if (data.StatusCode == HttpStatusCode.OK)
                {
                    return Ok(data);
                }
                return BadRequest(data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet("GetCurrentInventory")]
        public async Task<IActionResult> GetCurrentInventory(string id)
        {
            try
            {
                var data = await _service.CurrentInventory(id);
                return Ok(data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpDelete("DeleteProperty")]
        public async Task<IActionResult> DeleteProperty(int PropertyId)
        {
            try
            {
                var data = await _service.DeleteProp(PropertyId);
                if(data.StatusCode == HttpStatusCode.OK)
                {
                    return Ok(data);
                }
                else
                {
                    return NotFound(data);
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
