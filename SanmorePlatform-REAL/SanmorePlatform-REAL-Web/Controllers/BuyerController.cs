using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Newtonsoft.Json;
using SanmorePlatform_REAL_Data.Entities;
using SanmorePlatform_REAL_Model.ViewModels;
using SanmorePlatform_REAL_Model.ViewModels.BuyerModels;
using SanmorePlatform_REAL_Model.ViewModels.DocumentsModel;
using System.Collections.Generic;
using System.Text;

namespace SanmorePlatform_REAL_Web.Controllers
{
    public class BuyerController : Controller
    {
        private readonly HttpClient _client;
        public BuyerController(IConfiguration configuration)
        {
            Uri baseAddress = new Uri(configuration["Domain:BaseUrl"]);
            _client = new HttpClient();
            _client.BaseAddress = baseAddress;
        }
        public IActionResult Index()
        {
            return View();
        }


        [HttpGet]
        public IActionResult BuyerRegistration(string id)
        {
            BuyerGetViewModel model = new();

            HttpResponseMessage response = _client.GetAsync(_client.BaseAddress + "Buyer/GetUserById?" + "id=" + id).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                if (data != null)
                {
                    model = JsonConvert.DeserializeObject<BuyerGetViewModel>(data);
                    model.states = GetPropertyStateList();

                    HttpResponseMessage response1 = _client.GetAsync(_client.BaseAddress + "Property/GetPropertyTypeList").Result;
                    if (response.IsSuccessStatusCode)
                    {
                        string data1 = response1.Content.ReadAsStringAsync().Result;
                        if (data1 != null)
                        {
                            model.PropTypeList = JsonConvert.DeserializeObject<List<PropertyNameTypeModel>>(data1);
                        }
                    }
                    return View(model);
                }
            }
            else
            {
                return View("Something Went Wrong.");
            }
            return View(model);
        }
        [HttpPost]

        [RequestSizeLimit(400_000_000)] // Set the maximum request size limit to 100 MB
        public async Task<JsonResult> BuyerRegistration(BuyerViewModel buyerModel)
        {

            //buyerModel.states = new List<PropertyStateViewModel?>();
            //buyerModel.states[0].StateId= 0;
            //buyerModel.states[0].ShortName= "ankit";
            //buyerModel.states[0].LongName= "an";

            try
            {
                if (buyerModel.UploadBankDocumnet != null)
                {
                    //save the image files to wwwroot/images folder
                    foreach (var imageFile in buyerModel.UploadBankDocumnet)
                    {
                        var imageFileName1 = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
                        var imageFileName = imageFile.FileName;
                        var imagePath = Path.Combine("wwwroot", "BankStatementFiles", imageFileName1);
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
                        buyerModel.DocumentName = buyerModel.DocumentName + imageFileName + ",";
                        buyerModel.DocumentPath = buyerModel.DocumentPath + imagePath + ",";
                    }
                }
                if (buyerModel.UploadCreditReport != null)
                {
                    //save the image files to wwwroot/images folder
                    foreach (var creditReport in buyerModel.UploadCreditReport)
                    {
                        var creditFileName1 = Guid.NewGuid().ToString() + Path.GetExtension(creditReport.FileName);
                        var creditFileName = creditReport.FileName;
                        var creditPath = Path.Combine("wwwroot", "CreditReportFiles", creditFileName1);
                        //Ensure that the directory exists,create it if not 
                        var imagesDirectory = Path.GetDirectoryName(creditPath);
                        if (!Directory.Exists(imagesDirectory))
                        {
                            Directory.CreateDirectory(imagesDirectory);
                        }
                        using (var stream = new FileStream(creditPath, FileMode.Create))
                        {
                            await creditReport.CopyToAsync(stream);
                        }
                        buyerModel.CreditReportDocName = buyerModel.CreditReportDocName + creditFileName + ",";
                        buyerModel.CreditReportDocPath = buyerModel.CreditReportDocPath + creditPath + ",";
                    }
                }
                if (buyerModel.UploadIdsAndPassport != null)
                {
                    //save the image files to wwwroot/images folder
                    foreach (var idPasspord in buyerModel.UploadIdsAndPassport)
                    {
                        var idPasspordFileName1 = Guid.NewGuid().ToString() + Path.GetExtension(idPasspord.FileName);
                        var idPasspordcreditFileName = idPasspord.FileName;
                        var idPasspordcreditPath = Path.Combine("wwwroot", "IDsPassportFiles", idPasspordFileName1);
                        //Ensure that the directory exists,create it if not 
                        var imagesDirectory = Path.GetDirectoryName(idPasspordcreditPath);
                        if (!Directory.Exists(imagesDirectory))
                        {
                            Directory.CreateDirectory(imagesDirectory);
                        }
                        using (var stream = new FileStream(idPasspordcreditPath, FileMode.Create))
                        {
                            await idPasspord.CopyToAsync(stream);
                        }
                        buyerModel.PassportName = buyerModel.PassportName + idPasspordcreditFileName + ",";
                        buyerModel.PassportPath = buyerModel.PassportPath + idPasspordcreditPath + ",";
                    }
                }
                buyerModel.UploadBankDocumnet = null;
                buyerModel.UploadCreditReport = null;
                buyerModel.UploadIdsAndPassport = null;
                //string data = JsonConvert.SerializeObject(propertyModel);
                string data = JsonConvert.SerializeObject(buyerModel);
                StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
                HttpResponseMessage res = _client.PostAsync(_client.BaseAddress + "Buyer/BuyerRegistration", content).Result;

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



        public IActionResult BuyerHome()
        {
            BuyerViewModel model = new();
            string id = "9ffadefc-6562-4352-9377-9f5f46e52abc";
            HttpResponseMessage response = _client.GetAsync(_client.BaseAddress + "Buyer/GetUserById?" + "id=" + id).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                if (data != null)
                {
                    model = JsonConvert.DeserializeObject<BuyerViewModel>(data);
                    return View(model);
                }
            }
            else
            {
                return View("Something Went Wrong.");
            }
            return View(model);
        }

        [HttpGet]
        public List<PropertyStateViewModel> GetPropertyStateList()
        {
            List<PropertyStateViewModel> list = new List<PropertyStateViewModel>();
            HttpResponseMessage response = _client.GetAsync(_client.BaseAddress + "Buyer/GetPropertyStateList").Result;
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

    }
}
