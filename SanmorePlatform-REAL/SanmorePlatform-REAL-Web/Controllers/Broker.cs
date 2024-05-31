using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SanmorePlatform_REAL_Model.ViewModels;
using SanmorePlatform_REAL_Utility.Enum;
using System.Security.Claims;
using System.Text;

namespace SanmorePlatform_REAL_Web.Controllers
{
    //[Authorize(Policy = "RequireBrokerRole")]
    public class Broker : Controller
    {
        private readonly HttpClient _client;
        public Broker(IConfiguration configuration)
        {
            Uri baseAddress = new Uri(configuration["Domain:BaseUrl"]);
            _client = new HttpClient();
            _client.BaseAddress = baseAddress;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> BrokerSignUp(string id)
        {
            try
            {
                BrokerViewModel broker = new();
                GetBasicUserInfoViewModel user = new();
                HttpResponseMessage response = await _client.GetAsync(_client.BaseAddress + "Account/GetBasicUserInfo?" + "id=" + id);
                if (response.IsSuccessStatusCode)
                {
                    string data = response.Content.ReadAsStringAsync().Result;
                    if (data != null)
                    {
                        user = JsonConvert.DeserializeObject<GetBasicUserInfoViewModel>(data);
                        broker.UserId = user.id;
                        broker.FirstName = user.FirstName;
                        broker.LastName = user.LastName;
                        broker.CompanyName = user.Company;
                        broker.ContactPhoneNumber = user.MobilePhone;
                        broker.CompanyPhoneNumber = user.OfficePhone;
                        broker.Title = user.Title;
                        return View(broker);
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> BrokerSignUp(BrokerViewModel model)
        {
            try
            {
                if (model.File != null)
                {
                    //save the image files to wwwroot/BrokerIdentification folder
                    var imageExtension = Guid.NewGuid().ToString() + Path.GetExtension(model.File.FileName);
                    var imageFileName = model.File.FileName;
                    var imagePath = Path.Combine("wwwroot", "BrokerIdentification", imageExtension);
                    //Ensure that the directory exists,create it if not 
                    var imagesDirectory = Path.GetDirectoryName(imagePath);
                    if (!Directory.Exists(imagesDirectory))
                    {
                        Directory.CreateDirectory(imagesDirectory);
                    }
                    using (var stream = new FileStream(imagePath, FileMode.Create))
                    {
                        await model.File.CopyToAsync(stream);
                    }
                    model.Filename = imagePath.Substring(29);
                }

                model.File = null;
                var data = JsonConvert.SerializeObject(model);
                var content = new StringContent(data, Encoding.UTF8, "application/json");
                HttpResponseMessage response = await _client.PostAsync(_client.BaseAddress + "Broker/BrokerRegister", content);

                if (response.IsSuccessStatusCode)
                {
                    TempData["Success"] = "Successfully registerd as a broker.";
                    HttpContext.Session.SetString("roleIsBroker", "True");
                    HttpContext.Session.SetString("roleType", UserRolesEnum.Broker.ToString());

                    var claims = new List<Claim>
                            {
                                //new Claim(ClaimTypes.Email, model.Email),
                                new Claim(ClaimTypes.Role, UserRolesEnum.Broker.ToString()) // Assign role to user
                            };
                    var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

                    var principal = new ClaimsPrincipal(identity);

                    await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal);

                    return RedirectToAction("CurrentInventory", "Broker", new { id = model.UserId });
                }
                else
                {
                    return View();
                }
            }
            catch (Exception ex)
            {
                TempData["Error"] = ex.Message;
                throw;
            }
        }

        [HttpGet]
        public async Task<IActionResult> BrokerProfile(string id)
        {
            try
            {
                BrokerProfileModel data = new();
                HttpResponseMessage response = await _client.GetAsync(_client.BaseAddress + "Broker/GetBrokerProfile?" + "id=" + id);
                if (response.IsSuccessStatusCode)
                {
                    string content = response.Content.ReadAsStringAsync().Result;
                    if (content != null)
                    {
                        data = JsonConvert.DeserializeObject<BrokerProfileModel>(content);
                        HttpContext.Session.SetString("roleIsBroker", "True");
                        return View(data);
                    }
                }
                return View();
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        public async Task<IActionResult> BrokerProfile(BrokerProfileModel model)
        {
            try
            {
                if (model.ProfilePhoto != null)
                {
                    string path = Path.Combine("wwwroot", "BasisUserProfile", model.ProfilePicName);
                    FileInfo file = new FileInfo(path);
                    //save the image files to wwwroot/BrokerIdentification folder
                    var imageUniqueName = Guid.NewGuid().ToString() + Path.GetExtension(model.ProfilePhoto.FileName);
                    var imagePath = Path.Combine("wwwroot", "BasisUserProfile", imageUniqueName);
                    //Ensure that the directory exists,create it if not 
                    var imagesDirectory = Path.GetDirectoryName(imagePath);
                    if (!Directory.Exists(imagesDirectory))
                    {
                        Directory.CreateDirectory(imagesDirectory);
                    }
                    using (var stream = new FileStream(imagePath, FileMode.Create))
                    {
                        await model.ProfilePhoto.CopyToAsync(stream);
                    }
                    model.ProfilePicName = imagePath.Substring(25);
                    if (file.Exists)//check file exsit or not  
                    {
                        file.Delete();
                    }
                }

                if (model.IdProofFile != null)
                {
                    //save the image files to wwwroot/BrokerIdentification folder
                    var imageUniqueName = Guid.NewGuid().ToString() + Path.GetExtension(model.IdProofFile.FileName);
                    var imagePath = Path.Combine("wwwroot", "BrokerIdentification", imageUniqueName);
                    //Ensure that the directory exists,create it if not 
                    var imagesDirectory = Path.GetDirectoryName(imagePath);
                    if (!Directory.Exists(imagesDirectory))
                    {
                        Directory.CreateDirectory(imagesDirectory!);
                    }
                    using (var stream = new FileStream(imagePath, FileMode.Create))
                    {
                        await model.IdProofFile.CopyToAsync(stream);
                    }
                    model.Filename = imagePath.Substring(29);
                }

                model.ProfilePhoto = null; model.IdProofFile = null;

                BrokerProfileModel? user = new();
                var data = JsonConvert.SerializeObject(model);
                var contentData = new StringContent(data, Encoding.UTF8, "application/json");
                HttpResponseMessage response = await _client.PutAsync(_client.BaseAddress + "Broker/UpdateBrokerProfile", contentData);
                if (response.IsSuccessStatusCode)
                {
                    string content = await response.Content.ReadAsStringAsync();
                    if (content != null)
                    {
                        user = JsonConvert.DeserializeObject<BrokerProfileModel>(content);
                        if (user.ProfilePicName != null)
                        {
                            HttpContext.Session.SetString("Pic", model.ProfilePicName!);
                        }
                        TempData["Success"] = "Broker profile updated successfully.";
                        return RedirectToAction("BrokerProfile", model);
                    }
                }
                return View();
            }
            catch (Exception ex)
            {
                TempData["Error"] = ex.Message;
                throw;
            }
        }

        [HttpGet]
        public async Task<IActionResult> CurrentInventory(string id)
        {
            try
            {
                List<GetCurrentInventoryViewModel> data = new();
                HttpResponseMessage response = await _client.GetAsync(_client.BaseAddress + "Broker/GetCurrentInventory?" + "id=" + id);
                if (response.IsSuccessStatusCode)
                {
                    string content = response.Content.ReadAsStringAsync().Result;
                    if (content != null)
                    {
                        data = JsonConvert.DeserializeObject<List<GetCurrentInventoryViewModel>>(content);
                        if (data.Count < 1)
                        {
                            return View("NoPropertyList");
                        }
                        else
                        {
                            return View(data);
                        }
                    }
                }
                return View();
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet]
        public async Task<IActionResult> UpdateProperty(int id)
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
