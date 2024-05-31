using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SanmorePlatform_REAL_Data.Service;
using SanmorePlatform_REAL_Model.ViewModels;
using SanmorePlatform_REAL_Model.ViewModels.LenderViewModel;
using SanmorePlatform_REAL_Model.ViewModels.Location;
using SanmorePlatform_REAL_Utility.Enum;
using System.Collections.Generic;
using System.Text;

namespace SanmorePlatform_REAL_Web.Controllers
{
    public class LenderController : Controller
    {

        private readonly HttpClient _client;
        public LenderController(IConfiguration configuration)
        {
            Uri baseAddress = new Uri(configuration["Domain:BaseUrl"]);
            _client = new HttpClient();
            _client.BaseAddress = baseAddress;
        }
   
        /// <summary>
        /// Create a method to get basic user info
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public IActionResult LenderSignUp(string id)
        {
            try
            {
                LenderResponceModel userData = new();
                HttpResponseMessage response = _client.GetAsync(_client.BaseAddress + "Lender/GetBasicUserInfo?" + "id=" + id).Result;
                if (response.IsSuccessStatusCode)
                {
                    string data = response.Content.ReadAsStringAsync().Result;
                    if (data != null)
                    {
                        userData = JsonConvert.DeserializeObject<LenderResponceModel>(data);
                        return View(userData);                     
                    }
                }
                return View("Something Went Wrong.");
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
        [HttpPost]
        public async Task<JsonResult> LenderSignUp(LenderResponceModel lenderModel)
        {
            try
            {
                if (lenderModel.UploadLenderFile != null)
                {
                    var imageFileNames = new List<string>();
                    //save the image files to wwwroot/images folder
                    foreach (var imageFile in lenderModel.UploadLenderFile)
                    {
                        var imageFileName1 = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
                        var imageFileName = imageFile.FileName;
                        var imagePath = Path.Combine("wwwroot", "UploadLenderFile", imageFileName1);
                        //Ensure that the directory exists,create it if not 
                        var imagesDirectory = Path.GetDirectoryName(imagePath);
                        if (!Directory.Exists(imagesDirectory))
                        {
                            Directory.CreateDirectory(imagesDirectory);
                        }
                        using (var stream = new FileStream(imagePath, FileMode.Create))
                        {
                            await imageFile.CopyToAsync(stream);
                        }
                        lenderModel.UploadLenderFileName = lenderModel.UploadLenderFileName + imageFileName + ",";
                        lenderModel.UploadLenderFilePath = lenderModel.UploadLenderFilePath + imagePath + ",";
                    }
                }
                if (lenderModel.UploadLendingLicense != null)
                {
                    var imageFileNames = new List<string>();
                    //save the image files to wwwroot/images folder
                    foreach (var imageFile in lenderModel.UploadLendingLicense)
                    {
                        var imageFileName1 = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
                        var imageFileName = imageFile.FileName;
                        var imagePath = Path.Combine("wwwroot", "UploadLendingLicense", imageFileName1);
                        //Ensure that the directory exists,create it if not 
                        var imagesDirectory = Path.GetDirectoryName(imagePath);
                        if (!Directory.Exists(imagesDirectory))
                        {
                            Directory.CreateDirectory(imagesDirectory);
                        }
                        using (var stream = new FileStream(imagePath, FileMode.Create))
                        {
                            await imageFile.CopyToAsync(stream);
                        }
                        lenderModel.UploadLendingLicenseName = lenderModel.UploadLendingLicenseName + imageFileName + ",";
                        lenderModel.UploadLendingLicensePath = lenderModel.UploadLendingLicensePath + imagePath + ",";
                    }
                }
                if (lenderModel.UploadLenderIdentity != null)
                {
                    //save the identity doc/files to wwwroot/images folder

                    var identityFile = Guid.NewGuid().ToString() + Path.GetExtension(lenderModel.UploadLenderIdentity.FileName);

                    var identityPath = Path.Combine("wwwroot", "LenderIdentityFile", identityFile);
                    var identityDirectory = Path.GetDirectoryName(identityPath);
                    if (!Directory.Exists(identityDirectory))
                    {
                        Directory.CreateDirectory(identityDirectory);
                    }
                    using (var stream = new FileStream(identityPath, FileMode.Create))
                    {
                        await lenderModel.UploadLenderIdentity.CopyToAsync(stream);
                    }
                    lenderModel.IdentificationFileName = lenderModel.IdentificationFileName + identityFile;
                    lenderModel.IdentificationFilePath = lenderModel.IdentificationFilePath + identityPath;

                }
                string data = JsonConvert.SerializeObject(lenderModel);
                StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
                HttpResponseMessage res = _client.PostAsync(_client.BaseAddress + "Lender/LenderRegister", content).Result;

                if (res.IsSuccessStatusCode)
                {
                    string responseContent = await res.Content.ReadAsStringAsync();
                    HttpContext.Session.SetString("roleIsLender", "True");
                    HttpContext.Session.SetString("roleType", UserRolesEnum.Lender.ToString());
                    return Json(responseContent);
                }
                else
                {
                    return Json("");
                }
            }
            catch (Exception)
            {               
                return Json("");
            }
        }

        /// <summary>
        /// Create method to get lender signup info 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>

        [HttpGet]
        public IActionResult LenderProfile(string id)
        {
            try
            {
                LenderResponceModel userData = new();
                HttpResponseMessage response = _client.GetAsync(_client.BaseAddress + "Lender/LenderProfile?" + "id=" + id).Result;
                if (response.IsSuccessStatusCode)
                {
                    string data = response.Content.ReadAsStringAsync().Result;

                    if (data != null)
                    {
                        userData = JsonConvert.DeserializeObject<LenderResponceModel>(data);
                        userData.states = GetPropertyStateList();                       
                        return View(userData);
                    }
                }
                return View("Something Went Wrong.");
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// Get State list
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<PropertyStateViewModel> GetPropertyStateList()
        {
            List<PropertyStateViewModel> list = new List<PropertyStateViewModel>();
            HttpResponseMessage response = _client.GetAsync(_client.BaseAddress + "Property/GetPropertyStateList").Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                if (data != null)
                {
                    list = JsonConvert.DeserializeObject<List<PropertyStateViewModel>>(data);
                }
            }
            return list;
        }

        /// <summary>
        /// Create method to update lender profile into database
        /// </summary>
        /// <param name="lenderModel"></param>
        /// <returns></returns>

        public async Task<JsonResult> UpdateLenderProfile(LenderResponceModel lenderModel)
        {
            try
            {
                if (lenderModel.UploadLenderFile != null)
                {
                    var imageFileNames = new List<string>();
                    //save the image files to wwwroot/images folder
                    foreach (var imageFile in lenderModel.UploadLenderFile)
                    {
                        var imageFileName1 = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
                        var imageFileName = imageFile.FileName;
                        var imagePath = Path.Combine("wwwroot", "UploadLenderFile", imageFileName1);
                        //Ensure that the directory exists,create it if not 
                        var imagesDirectory = Path.GetDirectoryName(imagePath);
                        if (!Directory.Exists(imagesDirectory))
                        {
                            Directory.CreateDirectory(imagesDirectory);
                        }
                        using (var stream = new FileStream(imagePath, FileMode.Create))
                        {
                            await imageFile.CopyToAsync(stream);
                        }
                        lenderModel.UploadLenderFileName = lenderModel.UploadLenderFileName + imageFileName + ",";
                        lenderModel.UploadLenderFilePath = lenderModel.UploadLenderFilePath + imagePath + ",";
                    }
                }
                if (lenderModel.UploadLendingLicense != null)
                {
                    var imageFileNames = new List<string>();
                    //save the image files to wwwroot/images folder
                    foreach (var imageFile in lenderModel.UploadLendingLicense)
                    {
                        var imageFileName1 = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
                        var imageFileName = imageFile.FileName;
                        var imagePath = Path.Combine("wwwroot", "UploadLendingLicense", imageFileName1);
                        //Ensure that the directory exists,create it if not 
                        var imagesDirectory = Path.GetDirectoryName(imagePath);
                        if (!Directory.Exists(imagesDirectory))
                        {
                            Directory.CreateDirectory(imagesDirectory);
                        }
                        using (var stream = new FileStream(imagePath, FileMode.Create))
                        {
                            await imageFile.CopyToAsync(stream);
                        }
                        lenderModel.UploadLendingLicenseName = lenderModel.UploadLendingLicenseName + imageFileName + ",";
                        lenderModel.UploadLendingLicensePath = lenderModel.UploadLendingLicensePath + imagePath + ",";
                    }
                }
                if (lenderModel.UploadLenderIdentity != null)
                {
                    //save the identity doc/files to wwwroot/images folder

                    var identityFile = Guid.NewGuid().ToString() + Path.GetExtension(lenderModel.UploadLenderIdentity.FileName);

                    var identityPath = Path.Combine("wwwroot", "LenderIdentityFile", identityFile);
                    var identityDirectory = Path.GetDirectoryName(identityPath);
                    if (!Directory.Exists(identityDirectory))
                    {
                        Directory.CreateDirectory(identityDirectory);
                    }
                    using (var stream = new FileStream(identityPath, FileMode.Create))
                    {
                        await lenderModel.UploadLenderIdentity.CopyToAsync(stream);
                    }
                    lenderModel.IdentificationFileName = lenderModel.IdentificationFileName + identityFile;
                    lenderModel.IdentificationFilePath = lenderModel.IdentificationFilePath + identityPath;

                }
                string data = JsonConvert.SerializeObject(lenderModel);
                StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
                HttpResponseMessage res = _client.PostAsync(_client.BaseAddress + "Lender/UpdateLenderProfile", content).Result;

                if (res.IsSuccessStatusCode)
                {

                    string responseContent = await res.Content.ReadAsStringAsync();
                    return Json(responseContent);
                }
                else
                {
                    return Json("");
                }
            }
            catch (Exception)
            {
                // Handle the exception, log it, and return an appropriate response
                return Json("");
            }
        }

        [HttpGet]
        public IActionResult CreateLenderProduct(string id)
        {
            return View("CreateLenderProduct");
        }
        /// <summary>
        /// Create method to create a new lender product
        /// </summary>
        /// <param name="productModel"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<JsonResult> CreateLenderProduct(LenderProductModel productModel)
        {
            try
            {
                string data = JsonConvert.SerializeObject(productModel);
                StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
                HttpResponseMessage res = _client.PostAsync(_client.BaseAddress + "Lender/AddLenderProduct", content).Result;

                if (res.IsSuccessStatusCode)
                {
                    string responseContent = await res.Content.ReadAsStringAsync();
                    return Json(responseContent);
                }
                else
                {
                    return Json("");
                }
            }
            catch (Exception)
            {
                return Json("");
            }
        }

        /// <summary>
        /// Create a method to get all country name 
        /// </summary>
        /// <returns></returns>

        [HttpGet]
        public JsonResult GetCountryList()
        {
            List<CountryModel> list = new List<CountryModel>();
            HttpResponseMessage response = _client.GetAsync(_client.BaseAddress + "Lender/GetCountryList").Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                if (data != null)
                {
                    list = JsonConvert.DeserializeObject<List<CountryModel>>(data);
                }
            }
            return Json(list);
        }

        /// <summary>
        /// Get List of Lender Product from database
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// 
        [HttpGet]
        public IActionResult LenderProductList(string id)
        {
            try
            {
                List<LenderProductResponceModel> list = new();
                HttpResponseMessage response = _client.GetAsync(_client.BaseAddress + "Lender/GetLenderProductList?" + "id=" + id).Result;
                if (response.IsSuccessStatusCode)
                {
                    string content = response.Content.ReadAsStringAsync().Result;                  
                    HttpResponseMessage stateListResponse = _client.GetAsync(_client.BaseAddress + "Property/GetPropertyStateList").Result;
                    if (content != null)
                    {
                        string stateListData = stateListResponse.Content.ReadAsStringAsync().Result;
                        if (stateListData != null)
                        {
                            //list.StateList = JsonConvert.DeserializeObject<List<PropertyStateViewModel>>(stateListData);
                            return View(list);
                        }
                        return View(list);
                    }

                }
                return View("Something wrong");
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        public async Task<JsonResult> UpdateStatus(LenderProductModel productModel)
        {
            try
            {
                string data = JsonConvert.SerializeObject(productModel);
                StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
                HttpResponseMessage res = _client.PostAsync(_client.BaseAddress + "Lender/UpdateStatus", content).Result;

                if (res.IsSuccessStatusCode)
                {
                    string responseContent = await res.Content.ReadAsStringAsync();
                    return Json(responseContent);
                }
                else
                {
                    return Json("");
                }               
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// Create a method to Save the lender signup as a draft
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<JsonResult> SaveProgress(LenderModel model)
        {
            try
            {
                string data = JsonConvert.SerializeObject(model);
                StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
                HttpResponseMessage res = _client.PostAsync(_client.BaseAddress + "Lender/SaveProgress", content).Result;

                if (res.IsSuccessStatusCode)
                {
                    string responseContent = await res.Content.ReadAsStringAsync();
                    return Json(responseContent);
                }
                else
                {
                    return Json("");
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// Method to get Lender Product details on the basis of Id.
        /// </summary>
        /// <param name="productId"></param>
        /// <returns></returns>
        [HttpGet]
        public IActionResult EditLenderProductList(string id)
        {           
            try
            {
                LenderProductModel data = new();
                HttpResponseMessage response = _client.GetAsync(_client.BaseAddress + "Lender/EditLenderProductList?" + "id=" + id).Result;
                if (response.IsSuccessStatusCode)
                {
                    string content = response.Content.ReadAsStringAsync().Result;
                    if (content != null)
                    {
                        data = JsonConvert.DeserializeObject<LenderProductModel>(content);
                        return Json(data);
                    }
                }
                return Json("Something wrong");
            }
            catch (Exception)
            {
                throw;
            }
        }
        /// <summary>
        /// Save updated lender product list into database
        /// </summary>
        /// <param name="lenderModel"></param>
        /// <returns></returns>
       // [HttpPost]
        //public async Task<JsonResult> UpdateLenderProduct(LenderProductModel lenderModel)
        //{
        //    try
        //    {

        //        string data = JsonConvert.SerializeObject(lenderModel);
        //        StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
        //        HttpResponseMessage res = _client.PostAsync(_client.BaseAddress + "Lender/UpdateLenderProduct", content).Result;

        //        if (res.IsSuccessStatusCode)
        //        {
        //            string responseContent = await res.Content.ReadAsStringAsync();
        //            return Json(responseContent);
        //        }
        //        else
        //        {
        //            return Json("");
        //        }
        //    }
        //    catch (Exception)
        //    {
        //        return Json("");
        //    }
        //}


    }
}
