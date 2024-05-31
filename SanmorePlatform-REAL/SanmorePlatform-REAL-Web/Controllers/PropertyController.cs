using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using SanmorePlatform_REAL_Model.ViewModels;
using SanmorePlatform_REAL_Model.ViewModels.DocumentsModel;
using System.Collections.Generic;
using System.Text;
#nullable disable
namespace SanmorePlatform_REAL_Web.Controllers
{
    public class PropertyController : Controller
    {
        private readonly HttpClient _client;
        public PropertyController(IConfiguration configuration)
        {
            //Uri baseAddress = new Uri(configuration["Domain:BaseUrl"]);
            //Uri baseAddress = new Uri("http://44.203.44.20:82/Home/Index");
            Uri baseAddress = new Uri("https://localhost:7081/api/");//
            _client = new HttpClient();
            _client.BaseAddress = baseAddress;
        }

        /// <summary>
        /// Get PropertyList
        /// </summary>
        /// <returns></returns>
        /// 
        [HttpGet]
        public async Task<JsonResult> Index(PropertyFilterModel propFilterModelData)
        {
            string myData = JsonConvert.SerializeObject(propFilterModelData);

            StringContent content = new StringContent(myData, Encoding.UTF8, "application/json");
            try
            {
                HttpResponseMessage res = await _client.PostAsync(_client.BaseAddress + "Property/GetPropertyList", content);

                if (res.IsSuccessStatusCode)
                {
                    string data = res.Content.ReadAsStringAsync().Result;
                    var result = JsonConvert.DeserializeObject<List<PropertyViewModel>>(data);
                    return Json(result);
                }
            }
            catch(Exception ex)
            {
                string msg = ex.Message;
            }
            
            
            return Json(false);
        }

        [HttpGet]
        public JsonResult GetPropertyById(string propertyId)
        {
            PropertyViewModel property = new();
            HttpResponseMessage response = _client.GetAsync(_client.BaseAddress + "Property/GetPropertyById?" + "propertyId=" + propertyId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                if (data != null)
                {
                    property = JsonConvert.DeserializeObject<PropertyViewModel>(data);
                    return Json(property);
                }
            }
            return Json("Something Went Wrong.");
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="propertyId"></param>
        /// <returns></returns>
        [HttpGet]
        public IActionResult AddProperty()
        {
            return View();
        }

        [HttpPost]

        [RequestSizeLimit(400_000_000)] // Set the maximum request size limit to 100 MB
        public async Task<JsonResult> AddProperty(PropertyImageResponce propertyModel)
        {
            if (propertyModel.UploadImage != null)
            {
                var imageFileNames = new List<string>();
                //save the image files to wwwroot/images folder
                foreach (var imageFile in propertyModel.UploadImage)
                {
                    var imageFileName1 = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
                    var imageFileName = imageFile.FileName;
                    var imagePath = Path.Combine("wwwroot", "PropertyImages", imageFileName1);
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
                    propertyModel.ImageName = propertyModel.ImageName + imageFileName + ",";
                    propertyModel.ImagePath = propertyModel.ImagePath + imagePath + ",";
                }
            }

            if (propertyModel.UploadVideo != null)
            {
                var videoFileNames = new List<string>();
                //save the image files to wwwroot/images folder
                foreach (var videoFile in propertyModel.UploadVideo)
                {
                    var videoFileName1 = Guid.NewGuid().ToString() + Path.GetExtension(videoFile.FileName);
                    var videoFileName = videoFile.FileName;
                    var videoPath = Path.Combine("wwwroot", "PropertyVideos", videoFileName1);
                    //Ensure that the directory exists,create it if not 
                    var imagesDirectory = Path.GetDirectoryName(videoPath);
                    if (!Directory.Exists(imagesDirectory))
                    {
                        Directory.CreateDirectory(imagesDirectory);
                    }
                    using (var stream = new FileStream(videoPath, FileMode.Create))
                    {
                        await videoFile.CopyToAsync(stream);
                    }
                    propertyModel.VideoName = propertyModel.VideoName + videoFileName + ",";
                    propertyModel.VideoPath = propertyModel.VideoPath + videoPath + ",";
                }
            }

            if (propertyModel.UploadAppraisal != null)
            {
                var AppraisalFileNames = new List<string>();
                //save the image files to wwwroot/images folder
                foreach (var appraisalFile in propertyModel.UploadAppraisal)
                {
                    var appraisalFileName1 = Guid.NewGuid().ToString() + Path.GetExtension(appraisalFile.FileName);
                    var appraisalFileName = appraisalFile.FileName;
                    var appraisalPath = Path.Combine("wwwroot", "DueDiligenceFiles", appraisalFileName1);
                    //Ensure that the directory exists,create it if not 
                    var imagesDirectory = Path.GetDirectoryName(appraisalPath);
                    if (!Directory.Exists(imagesDirectory))
                    {
                        Directory.CreateDirectory(imagesDirectory);
                    }
                    using (var stream = new FileStream(appraisalPath, FileMode.Create))
                    {
                        await appraisalFile.CopyToAsync(stream);
                    }
                    propertyModel.AppraisalFileName = propertyModel.AppraisalFileName + appraisalFileName + ",";
                    propertyModel.AppraisalFilePath = propertyModel.AppraisalFilePath + appraisalPath + ",";
                }
            }

            if (propertyModel.UploadlInspection != null)
            {
                var inspectionFileNames = new List<string>();
                //save the image files to wwwroot/images folder
                foreach (var appraisalFile in propertyModel.UploadlInspection)
                {
                    var inspectionFileName1 = Guid.NewGuid().ToString() + Path.GetExtension(appraisalFile.FileName);
                    var inspectionFileName = appraisalFile.FileName;
                    var inspectionPath = Path.Combine("wwwroot", "DueDiligenceFiles", inspectionFileName1);
                    //Ensure that the directory exists,create it if not 
                    var imagesDirectory = Path.GetDirectoryName(inspectionPath);
                    if (!Directory.Exists(imagesDirectory))
                    {
                        Directory.CreateDirectory(imagesDirectory);
                    }
                    using (var stream = new FileStream(inspectionPath, FileMode.Create))
                    {
                        await appraisalFile.CopyToAsync(stream);
                    }
                    propertyModel.InspectionFileName = propertyModel.InspectionFileName + inspectionFileName + ",";
                    propertyModel.InspectionFilePath = propertyModel.InspectionFilePath + inspectionPath + ",";
                }
            }
            if (propertyModel.UploadlSurvey != null)
            {
                var inspectionFileNames = new List<string>();
                //save the image files to wwwroot/images folder
                foreach (var surveyFile in propertyModel.UploadlSurvey)
                {
                    var surveyFileName1 = Guid.NewGuid().ToString() + Path.GetExtension(surveyFile.FileName);
                    var surveyFileName = surveyFile.FileName;
                    var surveyPath = Path.Combine("wwwroot", "DueDiligenceFiles", surveyFileName1);
                    //Ensure that the directory exists,create it if not 
                    var imagesDirectory = Path.GetDirectoryName(surveyPath);
                    if (!Directory.Exists(imagesDirectory))
                    {
                        Directory.CreateDirectory(imagesDirectory);
                    }
                    using (var stream = new FileStream(surveyPath, FileMode.Create))
                    {
                        await surveyFile.CopyToAsync(stream);
                    }
                    propertyModel.SurveyFileName = propertyModel.SurveyFileName + surveyFileName + ",";
                    propertyModel.SurveyFilePath = propertyModel.SurveyFilePath + surveyPath + ",";
                }
            }
            if (propertyModel.UploadlEnvironmental != null)
            {
                var environmentalFileNames = new List<string>();
                //save the image files to wwwroot/images folder
                foreach (var environmentalFile in propertyModel.UploadlEnvironmental)
                {
                    var environmentalFileName1 = Guid.NewGuid().ToString() + Path.GetExtension(environmentalFile.FileName);
                    var environmentalFileName = environmentalFile.FileName;
                    var environmentalPath = Path.Combine("wwwroot", "DueDiligenceFiles", environmentalFileName1);
                    //Ensure that the directory exists,create it if not 
                    var imagesDirectory = Path.GetDirectoryName(environmentalPath);
                    if (!Directory.Exists(imagesDirectory))
                    {
                        Directory.CreateDirectory(imagesDirectory);
                    }
                    using (var stream = new FileStream(environmentalPath, FileMode.Create))
                    {
                        await environmentalFile.CopyToAsync(stream);
                    }
                    propertyModel.EnvironmentalFileName = propertyModel.EnvironmentalFileName + environmentalFileName + ",";
                    propertyModel.EnvironmentalFilePath = propertyModel.EnvironmentalFilePath + environmentalPath + ",";
                }
            }
            if (propertyModel.UploadIdentity != null)
            {
                //save the identity doc/files to wwwroot/images folder

                var identityFile = Guid.NewGuid().ToString() + Path.GetExtension(propertyModel.UploadIdentity.FileName);

                var identityPath = Path.Combine("wwwroot", "IdentificationVerificationFiles", identityFile);
                var identityDirectory = Path.GetDirectoryName(identityPath);
                if (!Directory.Exists(identityDirectory))
                {
                    Directory.CreateDirectory(identityDirectory);
                }
                using (var stream = new FileStream(identityPath, FileMode.Create))
                {
                    await propertyModel.UploadIdentity.CopyToAsync(stream);
                }
                propertyModel.IdentificationFileName = propertyModel.IdentificationFileName + identityFile;
                propertyModel.IdentificationFilePath = propertyModel.IdentificationFilePath + identityPath;
                propertyModel.UserId = propertyModel.UserId;

            }
            try
            {
                propertyModel.UploadImage = null;
                string data = JsonConvert.SerializeObject(propertyModel);
                StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
                HttpResponseMessage res = _client.PostAsync(_client.BaseAddress + "Property/AddProperty", content).Result;

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

        /// <summary>
        /// Return Add Property View
        /// </summary>
        /// <param name="propertyId"></param>
        /// <returns></returns>

        [HttpGet]
        public async Task<JsonResult> GetPropertyTypeList()
        {
            List<PropertyNameTypeModel> list = new List<PropertyNameTypeModel>();
            HttpResponseMessage response =await _client.GetAsync(_client.BaseAddress + "Property/GetPropertyTypeList");
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                if (data != null)
                {
                    list = JsonConvert.DeserializeObject<List<PropertyNameTypeModel>>(data);
                }
            }
            return Json(list);
        }

        [HttpGet]
        public async Task<JsonResult> GetPropertyStateList()
        {
            List<PropertyStateViewModel> list = new List<PropertyStateViewModel>();
            HttpResponseMessage response =await _client.GetAsync(_client.BaseAddress + "Property/GetPropertyStateList");
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                if (data != null)
                {
                    list = JsonConvert.DeserializeObject<List<PropertyStateViewModel>>(data);
                }
            }
            return Json(list);
        }

        [HttpPost]
        public async Task<JsonResult> SaveSearchValue(PropertyFilterModel filterModel)
        {

            try
            {
                string data = JsonConvert.SerializeObject(filterModel);
                StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
                HttpResponseMessage res = _client.PostAsync(_client.BaseAddress + "Property/SaveSearchValue", content).Result;

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

        //[HttpGet]
        //public IActionResult GetSaveSearchesList(string id)
        //{
        //    List<SearchKeyViewModel> list = new List<SearchKeyViewModel>();

        //    HttpResponseMessage response = _client.GetAsync(_client.BaseAddress + "Property/GetSaveSearchesList?" + "id=" + id).Result;
        //    if (response.IsSuccessStatusCode)
        //    {
        //        string data = response.Content.ReadAsStringAsync().Result;
        //        if (data != null)
        //        {
        //            list = JsonConvert.DeserializeObject<List<SearchKeyViewModel>>(data);
        //        }
        //    }
        //    return View(list);
        //}

        [HttpGet]
        public async Task<IActionResult> OwnFinancing(int propertyId)
        {
            try
            {
                OfferContractReqModel property = new();
                HttpResponseMessage response = await _client.GetAsync(_client.BaseAddress + "Property/GetDataOnOfferCotractForm?" + "propertyId=" + propertyId);
                if (response.IsSuccessStatusCode)
                {
                    string content = response.Content.ReadAsStringAsync().Result;
                    if (content != null)
                    {
                        property = JsonConvert.DeserializeObject<OfferContractReqModel>(content);
                        return View(property);
                    }
                }
                return RedirectToAction("Home", "Index");
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        public async Task<IActionResult> OwnFinancing(OfferContractReqModel model)
        {
            try
            {
                if (model.File != null)
                {
                    //save the image files to wwwroot/ProofOfFunds folder
                    var imageExtension = Guid.NewGuid().ToString() + Path.GetExtension(model.File.FileName);
                    var imageFileName = model.File.FileName;
                    var imagePath = Path.Combine("wwwroot", "ProofOfFunds", imageExtension);
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
                    model.ProofOfFundsFile = imagePath.Substring(21);
                }

                model.File = null;
                model.LoanExitStrategy = "4";
                model.Other = "test";
                var data = JsonConvert.SerializeObject(model);
                var content = new StringContent(data, Encoding.UTF8, "application/json");
                HttpResponseMessage response = await _client.PostAsync(_client.BaseAddress + "Property/SaveOfferContract", content);

                if (response.IsSuccessStatusCode)
                {
                    TempData["Success"] = "Information saved Successfully.";
                    return RedirectToAction("Index", "Home");
                }
                else
                {
                    TempData["Error"] = "Please fill the form properly";
                    return View();
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet]
        public JsonResult GetSearchesList(string id)
        {
            List<SearchKeyViewModel> list = new List<SearchKeyViewModel>();
            HttpResponseMessage response = _client.GetAsync(_client.BaseAddress + "Property/GetSaveSearchesList?" + "id=" + id).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                if (data != null)
                {
                    //property = JsonConvert.DeserializeObject<SearchKeyViewModel>(data);
                    list = JsonConvert.DeserializeObject<List<SearchKeyViewModel>>(data);
                    return Json(list);
                }
            }
            return Json("Something Went Wrong.");
        }

        [HttpGet]
        public JsonResult GetSaveSearchById(int id)
        {
            SearchKeyViewModel searchKey = new();
            HttpResponseMessage response = _client.GetAsync(_client.BaseAddress + "Property/GetSaveSearchById?" + "id=" + id).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                if (data != null)
                {
                    searchKey = JsonConvert.DeserializeObject<SearchKeyViewModel>(data);
                    return Json(searchKey);
                }
            }
            return Json("Something Went Wrong.");
        }

    }
}
