using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SanmorePlatform_REAL_Model.ViewModels;
using System.Net.Http.Headers;
using System.Text;

namespace SanmorePlatform_REAL_Web.Controllers
{
#nullable disable
    [Authorize(Policy = "RequireAdminRole")]

    public class TransactionCoordinator : Controller
    {
        private readonly HttpClient _client;
        public TransactionCoordinator(IConfiguration configuration)
        {
            Uri baseAddress = new Uri(configuration["Domain:BaseUrl"]);
            _client = new HttpClient();
            _client.BaseAddress = baseAddress;
            //_client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", HttpContext.Session.GetString("token"));
            //var accesstoken = _contextaccessor.httpcontext.session.getstring("token");
            //_client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
        }

        /// <summary>
        /// This method is to show the property listing for the TC
        /// </summary>
        /// <param name="propertyList"></param>
        /// <returns></returns>
        //[Authorize(Policy = "RequireAdminRole")]
        public IActionResult ShowPropertyListing()
        {
            try
            {
                var accessToken = HttpContext.Session.GetString("token");
                if (accessToken != null)
                {
                    List<TcPropertyListingViewModel> listOfData = new();
                    _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                    HttpResponseMessage response = _client.GetAsync(_client.BaseAddress + "TransactionCoordinator/GetAllPropertyListing").Result;
                    if (response.IsSuccessStatusCode)
                    {
                        var data = response.Content.ReadAsStringAsync().Result;
                        if (data != null)
                        {
                            listOfData = JsonConvert.DeserializeObject<List<TcPropertyListingViewModel>>(data);
                        }
                        return View(listOfData);
                    }
                    return Json(false);
                }
                else
                {
                    return Unauthorized("Unauthrize");
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// This method is to Get Property ById
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public IActionResult GetPropertyById(int id)
        {
            TcGetPropByIdModel property = new();
            HttpResponseMessage response = _client.GetAsync(_client.BaseAddress + "TransactionCoordinator/GetPropertyById?" + "propertyId=" + id).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                if (data != null)
                {
                    property = JsonConvert.DeserializeObject<TcGetPropByIdModel>(data);
                    return View(property);
                }
            }
            return View();
        }

        /// <summary>
        /// This method is to Update the Property Status
        /// </summary>
        /// <param name="propertyId"></param>
        /// <param name="status"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<JsonResult> UpdatePropertyStatus(int propertyId, string status)
        {
            try
            {
                var data = JsonConvert.SerializeObject(new { PropertyId = propertyId, Status = status });
                var contentData = new StringContent(data, Encoding.UTF8, "application/json");
                var apiUrl = $"TransactionCoordinator/UpdatePropertyStatus?PropertyId={propertyId}&status={status}";
                HttpResponseMessage response = await _client.PostAsync(apiUrl, contentData);
                if (response.IsSuccessStatusCode)
                {
                    return Json("Success");
                }
                else
                {
                    return Json("faild");
                }
            }
            catch (Exception ex)
            {
                return Json(ex.Message);
            }
        }

        public IActionResult ShowUserList()
        {
            return View();
        }
    }
}
