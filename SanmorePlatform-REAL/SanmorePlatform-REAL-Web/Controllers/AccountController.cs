using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SanmorePlatform_REAL_Data.Entities;
using SanmorePlatform_REAL_Model.ViewModels;
using System.Net;
using System.Security.Claims;
using System.Text;

#nullable disable
namespace SanmorePlatform_REAL_Web.Controllers
{
    public class AccountController : Controller
    {
        string localUrl;
        public AccountController(IConfiguration configuration)
        {
            localUrl = configuration["Domain:BaseUrl"];
        }
        public IActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// Get Method for Login
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult Login()
        {
            return View();
        }

        /// <summary>
        /// Method is used for Login user consume.
        /// </summary>
        /// <param name="loginModel"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<JsonResult> LoginAsync(LoginViewModel loginModel)
        {
            try
            {
                ResponceModel res = new();
                ApplicationUser user = new();
                using (HttpClient client = new HttpClient())
                {
                    //client.BaseAddress = new Uri(localUrl);
                    //client.BaseAddress = new Uri("http://44.203.44.20:82/");
                    client.BaseAddress = new Uri("https://localhost:7081/api/");
                    var data = JsonConvert.SerializeObject(loginModel);
                    var contentData = new StringContent(data, Encoding.UTF8, "application/json");
                    var myResponse = (await client.PostAsync(client.BaseAddress + "Account/Login", contentData));
                    HttpResponseMessage response = myResponse; //myResponse.Result;                   

                    if (response.IsSuccessStatusCode)
                    {
                        var deserializeData = response.Content.ReadAsStringAsync().Result;
                        res = JsonConvert.DeserializeObject<ResponceModel>(deserializeData);

                        var users = res.Data.ToString();
                        var deserializeUser = users.ToString();
                        user = JsonConvert.DeserializeObject<ApplicationUser>(deserializeUser);
                        var name = user.FirstName + "  " + user.LastName;
                        var id = user.Id;
                        var Pic = user.ProfilePicName;
                        var roleType = user.RoleType;

                        var roleIsBasicUser = user.IsBasicUser;
                        var roleIsBroker = user.IsBroker;
                        var roleIsFastTrackBuyer = user.IsBuyer;
                        var roleIsLender = user.IsLender;
                        var roleIsTransactionCoordinator = user.IsTransactionCoordinator;
                        var token = res.Token;

                        if (response.IsSuccessStatusCode)
                        {
                            HttpContext.Session.SetString("token", token);
                            HttpContext.Session.SetString("UserName", name);
                            HttpContext.Session.SetString("Id", id);
                            HttpContext.Session.SetString("roleType", roleType);
                            HttpContext.Session.SetString("IsAuthenticated", "true");

                            HttpContext.Session.SetString("roleIsBasicUser", roleIsBasicUser.ToString());
                            HttpContext.Session.SetString("roleIsBroker", roleIsBroker.ToString());
                            HttpContext.Session.SetString("roleIsFastTrackBuyer", roleIsFastTrackBuyer.ToString());
                            HttpContext.Session.SetString("roleIsLender", roleIsLender.ToString());
                            HttpContext.Session.SetString("roleIsTransactionCoordinator", roleIsTransactionCoordinator.ToString());

                            if (Pic != null)
                            {
                                HttpContext.Session.SetString("Pic", Pic);
                            }

                            var claims = new List<Claim>
                            {
                                new Claim(ClaimTypes.Email, user.Email),
                                new Claim(ClaimTypes.Authentication, token),
                                new Claim(ClaimTypes.Role, roleType) // Assign role to user
                            };

                            var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

                            var principal = new ClaimsPrincipal(identity);

                            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal);

                            return Json(new { success = true });
                        }
                        else
                        {
                            return Json("User Not Found");
                        }
                    }
                    if (response.StatusCode == HttpStatusCode.NotFound)
                    {
                        return Json("User Not Found");
                    }
                    else
                    {
                        return Json("Incorrect password");
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// Get Method for Register
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult Register()
        {
            return View();
        }

        /// <summary>
        /// Method is used for Registration user.
        /// </summary>
        /// <param name="usermodel"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult Register(RegisterViewModel usermodel)
        {
            try
            {
                using (HttpClient client = new HttpClient())
                {
                    client.BaseAddress = new Uri(localUrl);
                    var data = JsonConvert.SerializeObject(usermodel);
                    var contentData = new StringContent(data, Encoding.UTF8, "application/json");
                    HttpResponseMessage response = client.PostAsync(client.BaseAddress + "Account/Registration", contentData).Result;
                    if (response.IsSuccessStatusCode)
                    {
                        return Json("Success");
                    }
                    if (response.StatusCode == HttpStatusCode.NotFound)
                    {
                        return Json("Exists");    // Return the JSON object
                    }
                    else
                    {
                        return Json("Some Error occour");
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public IActionResult SignOut()
        {
            HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            HttpContext.Session.Remove("UserName");
            HttpContext.Session.Remove("roleType");
            //HttpContent.Session.Remove("roleType")
            HttpContext.Session.Clear();
            var storedCookies = Request.Cookies.Keys;
            foreach (var cookies in storedCookies)
            {
                Response.Cookies.Delete(cookies);
            }
            return RedirectToAction("Index", "Home");
        }

        public new IActionResult Unauthorized()
        {
            // Check if the user is authenticated
            var isAuthenticated = HttpContext.Session.GetString("IsAuthenticated");
            if (isAuthenticated == "true")
            {
                // User is authenticated, redirect to an appropriate page
                return RedirectToAction("Index", "Home");
            }
            else
            {
                // User is not authenticated, display unauthorized message
                return View();
            }
        }


        [HttpGet]
        public async Task<IActionResult> BasicUserProfile(string id)
        {
            try
            {
                using (HttpClient client = new HttpClient())
                {
                    GetBasicUserInfoViewModel user = new();
                    client.BaseAddress = new Uri(localUrl);
                    HttpResponseMessage response = await client.GetAsync(client.BaseAddress + "Account/GetBasicUserInfo?" + "id=" + id);
                    if (response.IsSuccessStatusCode)
                    {
                        string data = response.Content.ReadAsStringAsync().Result;
                        if (data != null)
                        {
                            user = JsonConvert.DeserializeObject<GetBasicUserInfoViewModel>(data);
                            if (user.ProfilePicName != null)
                            {
                                HttpContext.Session.SetString("Pic", user.ProfilePicName);
                            }
                            return View(user);
                        }
                    }
                    return View();
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        public async Task<IActionResult> BasicUserProfile(GetBasicUserInfoViewModel model)
        {
            try
            {
                if (model.File != null)
                {

                    string path = Path.Combine("wwwroot", "BasisUserProfile", model.ProfilePicName);
                    FileInfo file = new FileInfo(path);

                    //save the image files to wwwroot/BrokerIdentification folder
                    var imageUniqueName = Guid.NewGuid().ToString() + Path.GetExtension(model.File.FileName);
                    var imagePath = Path.Combine("wwwroot", "BasisUserProfile", imageUniqueName);
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
                    model.ProfilePicName = imagePath.Substring(25);
                    if (file.Exists)//check file exsit or not  
                    {
                        file.Delete();
                    }
                }
                model.File = null;
                using (HttpClient client = new HttpClient())
                {
                    GetBasicUserInfoViewModel user = new();
                    client.BaseAddress = new Uri(localUrl);
                    var data = JsonConvert.SerializeObject(model);
                    var contentData = new StringContent(data, Encoding.UTF8, "application/json");

                    HttpResponseMessage response = await client.PutAsync(client.BaseAddress + "Account/UpdateBasicUserProfile", contentData);
                    if (response.IsSuccessStatusCode)
                    {
                        string content = await response.Content.ReadAsStringAsync();
                        if (content != null)
                        {
                            user = JsonConvert.DeserializeObject<GetBasicUserInfoViewModel>(content);
                            if (user.ProfilePicName != null)
                            {
                                HttpContext.Session.SetString("Pic", user.ProfilePicName);
                            }
                            TempData["Success"] = "Profile Updated successfully.";
                            return RedirectToAction("BasicUserProfile", model);
                        }
                    }
                    return RedirectToAction("BasicUserProfile");
                }
            }
            catch (Exception ex)
            {
                TempData["Error"] = ex.Message;
                throw;
            }
        }

        public IActionResult ForgotPassword()
        {
            return View();
        }

        [HttpPost]
        public async Task<JsonResult> ForgotPassword(string email)
        {
            using (HttpClient client = new HttpClient())
            {
                client.BaseAddress = new Uri(localUrl);

                var data = JsonConvert.SerializeObject(new { email = email });
                var contentData = new StringContent(data, Encoding.UTF8, "application/json");
                var apiUrl = $"Account/ForgotPassword?email={email}";
                HttpResponseMessage response = await client.PostAsync(apiUrl, contentData);

                if (response.IsSuccessStatusCode)
                {
                    return Json(new { success = true });
                }
            }
            return Json(new { success = false });
        }

        public IActionResult ForgotPasswordConfirmation()
        {
            return View();
        }


        public IActionResult ResetPassword(string token, string email)
        {
            var model = new ResetPasswordReqModel { Token = token, Email = email };
            return View(model);
        }

        [HttpPost]
        public async Task<IActionResult> ResetPassword(ResetPasswordReqModel resetPassword)
        {
            try
            {
                ResetPasswordReqModel model = new();
                using (HttpClient client = new HttpClient())
                {
                    client.BaseAddress = new Uri(localUrl);
                    var data = JsonConvert.SerializeObject(resetPassword);
                    var contentData = new StringContent(data, Encoding.UTF8, "application/json");
                    HttpResponseMessage response = await client.PostAsync(client.BaseAddress + "Account/ResetPassword", contentData);
                    if (response.IsSuccessStatusCode)
                    {
                        return RedirectToAction("ResetPasswordConfirmation");
                    }
                }
                return View(model);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IActionResult ResetPasswordConfirmation()
        {
            return View();
        }
    }
}
