using Microsoft.AspNetCore.Mvc;
using SanmorePlatform_REAL_Model.ViewModels;
using SanmorePlatform_REAL_Model.ViewModels.DocumentsModel;
using SanmorePlatform_REAL_Service.Interface;

namespace SanmorePlatform_REAL_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PropertyController : ControllerBase
    {
        private readonly IPropertyService _service;   
        public PropertyController(IPropertyService service)
        {
            _service = service;            
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="propertyModel"></param>
        /// <returns></returns>
        [HttpPost("AddProperty")]
        public async Task<IActionResult> AddProperty([FromBody]FileUploadModel propertyModel)
        {
            if (!ModelState.IsValid)
            {
                return Ok(new { Message = "Error accured while adding property" });
            }
            else
            {
                var id = await _service.AddPropertyAsync(propertyModel);
                return Ok(new { Message = "Successfully added" });
            }
        }

        [HttpPost("SaveSearchValue")]
        public async Task<IActionResult> SaveSearchValue(PropertyFilterModel filterModel)
        {
            if (!ModelState.IsValid)
            {
                return Ok(new { Message = "Error accured while adding property" });
            }
            else
            {
                var id = await _service.SaveSearchValueAsync(filterModel);
                return Ok(new { Message = "Successfully added" });
            }
        }

        [HttpGet("GetSaveSearchesList")]
        public async Task<IActionResult> GetSaveSearchesList(string id)
        {
            var searchedList = await _service.GetSaveSearchesListAsync(id);
            return Ok(searchedList);
        }

        [HttpGet("GetSaveSearchById")]
        public async Task<IActionResult> GetSaveSearchById(int id)
        {
            var searchList = await _service.GetSaveSearchByIdAsync(id);
            return Ok(searchList);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="propertyId"></param>
        /// <returns></returns>
        [HttpGet("GetPropertyById")]
        public async Task<IActionResult> GetPropertyById(int propertyId)
        {
            var propertyList = await _service.GetPropertyByIdAsync(propertyId);
            return Ok(propertyList);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetPropertyTypeList")]
        public async Task<IActionResult> GetPropertyTypeList()
        {
            var propertyTypeList = await _service.GetPropertyTypeListAsync();
            return Ok(propertyTypeList);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetPropertyStateList")]
        public async Task<IActionResult> GetPropertyStateList()
        {
            var propertyStateList = await _service.GetPropertyStateListAsync();
            return Ok(propertyStateList);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="filterModel"></param>
        /// <returns></returns>
        [HttpPost("GetPropertyList")]
        public async Task<IActionResult> GetPropertyList(PropertyFilterModel filterModel)
        {
            var propertyList = await _service.GetPropertyListAsync(filterModel);
            return Ok(propertyList);
        }

        /// <summary>
        /// This API is to get the amount and due deligence documnet on 3rd party page
        /// </summary>
        /// <param name="propertyId"></param>
        /// <returns></returns>
        [HttpGet("GetDataOnOfferCotractForm")]
        public async Task<IActionResult> GetDataOnOfferCotractForm(int propertyId)
        {
            try
            {
                var data = await _service.GetDataOfferContractForm(propertyId);
                if (data != null)
                {
                    return Ok(data);
                }
                return NotFound();
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// This method is to save the 3rd party financing information
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost("SaveOfferContract")]
        public async Task<IActionResult> SaveOfferContract(OfferContractReqModel model)
        {
            try
            {
                var data = await _service.SaveOfferContractInfo(model);
                if (data != null)
                {
                    return Ok(data);
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
    }
}
