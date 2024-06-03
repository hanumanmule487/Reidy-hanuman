using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using SanmorePlatform_REAL_Data;
using SanmorePlatform_REAL_Data.Entities;
using SanmorePlatform_REAL_Model.ViewModels;
using SanmorePlatform_REAL_Service.Interface;
using SanmorePlatform_REAL_Utility.EmailServices;
using SanmorePlatform_REAL_Utility.Enum;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;

#nullable disable
namespace SanmorePlatform_REAL_Service.Services
{
    public class AccountService : IAccountService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _applicationDb;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly ILogger _logger;
        private readonly IWebHostEnvironment _hostingEnvironment;
        public AccountService(UserManager<ApplicationUser> userManager, ApplicationDbContext applicationDb, RoleManager<IdentityRole> roleManager, ILogger<AccountService> logger, IConfiguration configuration, IWebHostEnvironment hostingEnvironment)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _applicationDb = applicationDb;
            _configuration = configuration;
            _hostingEnvironment = hostingEnvironment;
            _logger = logger;
        }

        /// <summary>
        /// Registration Services
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ResponceModel responce = new();
        public async Task<ResponceModel> UserRegistration(RegisterViewModel model)
        {
            try
            {
                var checkUser = await _userManager.Users.Where(x => x.Email == model.Email).FirstOrDefaultAsync();
                if (checkUser == null)
                {
                    var user = new ApplicationUser
                    {
                        FirstName = model.FirstName,
                        LastName = model.LastName,
                        Email = model.Email,
                        UserName = model.Email,
                        PhoneNumber = model.PhoneNumber,
                        IntrestedIn = model.IntrestedIn,
                        CompanyName = model.CompanyName,
                        HearAboutUs = model.HearAboutUs,
                        IsBasicUser = true,
                        RoleType = UserRolesEnum.BasicUser.ToString(),
                        CreatedDate = DateTime.Now,
                    };
                    var result = await _userManager.CreateAsync(user, model.Password);
                    if (result.Succeeded)
                    {
                        if (!await _roleManager.RoleExistsAsync(UserRolesEnum.BasicUser.ToString()))
                        {
                            await _roleManager.CreateAsync(new IdentityRole(UserRolesEnum.BasicUser.ToString()));
                        }
                        if (await _roleManager.RoleExistsAsync(UserRolesEnum.BasicUser.ToString()))
                        {
                            await _userManager.AddToRoleAsync(user, UserRolesEnum.BasicUser.ToString());
                        }
                        var userRoles = await _userManager.GetRolesAsync(user);
                        var tokenRes = GenerateToken(user, userRoles);
                        responce.Success = true;
                        responce.StatusCode = HttpStatusCode.OK;
                        responce.Message = "Register successfully";
                    }
                    else
                    {
                        responce.Success = false;
                        responce.StatusCode = HttpStatusCode.Unauthorized;
                        responce.Message = "Register Failed some error occure";
                    }
                    return responce;
                }
                else
                {
                    responce.Success = false;
                    responce.StatusCode = HttpStatusCode.Found;
                    responce.Message = "User already exist";
                    return responce;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw;
            }
        }

        /// <summary>
        /// Login Service
        /// </summary>
        /// <param name="loginReq"></param>
        /// <returns></returns>
        public async Task<ResponceModel> UserLogin(LoginViewModel loginReq)//async//Task<ResponceModel> UserLogin(LoginViewModel loginReq)//async
        {
            try
            {
                var user = await _userManager.Users.Where(x => x.Email == loginReq.Email).FirstOrDefaultAsync();//await
                if (user == null)
                {
                    responce.StatusCode = HttpStatusCode.NotFound;
                    responce.Message = "User Not Found";
                    return responce;
                }
                if (await _userManager.CheckPasswordAsync(user, loginReq.Password))//await
                {
                    var userRoles = await _userManager.GetRolesAsync(user);//await
                    var tokenRes = GenerateToken(user, userRoles);
                    responce.Success = true;
                    responce.StatusCode = HttpStatusCode.OK;
                    responce.Message = "Login success";
                    responce.Token = tokenRes;
                    responce.Data = user;
                    return responce;
                }
                else
                {
                    responce.Message = "Incorrect Password";
                    responce.StatusCode = HttpStatusCode.Processing;
                    return responce;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw;
            }
        }

        //JWT Authentication
        public string GenerateToken(dynamic entity, dynamic roles)
        {
            try
            {
                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, entity.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

                foreach (var userRole in roles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                }

                var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));
                var token = new JwtSecurityToken(
                    issuer: _configuration["JWT:ValidAudience"],
                    audience: _configuration["JWT:ValidIssuer"],
                    expires: DateTime.Now.AddHours(1),
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                    );
                string jwtToken = new JwtSecurityTokenHandler().WriteToken(token);
                return jwtToken;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<GetBasicUserInfoViewModel> GetBasicUserInfo(string id)
        {
            try
            {
                GetBasicUserInfoViewModel userInfo = new();
                var user = await _userManager.FindByIdAsync(id);
                if (user != null)
                {
                    userInfo.id = user.Id;
                    userInfo.FirstName = user.FirstName;
                    userInfo.LastName = user.LastName;
                    userInfo.Title = user.Title;
                    userInfo.OfficePhone = user.OfficePhone;
                    userInfo.Email = user.Email;
                    userInfo.MobilePhone = user.PhoneNumber;
                    userInfo.Company = user.CompanyName;
                    if (user.ProfilePicName != null)
                    {
                        userInfo.ProfilePicName = user.ProfilePicName;
                    }
                }
                return userInfo;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<GetBasicUserInfoViewModel> UpdateBasicUserProfile(GetBasicUserInfoViewModel model)
        {
            GetBasicUserInfoViewModel response = new();
            try
            {
                var user = await _userManager.FindByIdAsync(model.id);
                if (user != null)
                {
                    user.FirstName = model.FirstName;
                    user.LastName = model.LastName;
                    user.Title = model.Title;
                    user.Email = model.Email;
                    user.PhoneNumber = model.MobilePhone;
                    user.OfficePhone = model.OfficePhone;
                    user.ProfilePicName = model.ProfilePicName;
                    var isSuccess = await _userManager.UpdateAsync(user);
                    if (isSuccess.Succeeded)
                    {
                        model.Success = true;
                        model.Message = "Profile Updated Successfully";
                        model.StatusCode = HttpStatusCode.OK;
                    }
                    else
                    {
                        model.Success = false;
                        model.StatusCode = HttpStatusCode.BadRequest;
                        model.Message = "Profile not updated successfully";
                    }
                }
                return model;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<MyResModel> ChangePassword(ChangePasswordReqModel changePasswordReq)
        {
            try
            {
                MyResModel commonRes = new();
                EncryptDecrypt encrypt = new EncryptDecrypt();
                var response = await _userManager.FindByEmailAsync(changePasswordReq.Email);
                if (response == null)
                {
                    commonRes.Message = "Email Not Found";
                    commonRes.StatusCode = HttpStatusCode.NotFound;
                    commonRes.Success = false;
                }
                else
                {
                    var userdetails = await _userManager.ChangePasswordAsync(response, changePasswordReq.OldPassword, changePasswordReq.NewPassword);
                    if (userdetails.Succeeded)
                    {
                        commonRes.Message = "Password changed successfully";
                        commonRes.StatusCode = HttpStatusCode.OK;
                        commonRes.Success = true;
                    }
                    else
                    {
                        commonRes.Message = userdetails.Errors.FirstOrDefault().Code;
                        commonRes.StatusCode = HttpStatusCode.BadRequest;
                        commonRes.Success = false;
                    }
                }
                return commonRes;
            }
            catch
            {
                throw;
            }
        }

        public async Task<MyResModel> ForgotPassword(string email)
        {
            MyResModel responce = new();
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                responce.Message = "user not found";
                responce.StatusCode = HttpStatusCode.NotFound;
                responce.Success = false;
                return responce;
            }

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var PasswordResetLink = "?email=" + email + "&token=" + token;

            var templatefolderPath = Path.Combine(_hostingEnvironment.WebRootPath, "EmailTemplate");
            var templatefileName = Path.Combine(templatefolderPath, "Index.html");
            var templatepath = Path.Combine(templatefolderPath, templatefileName);
            var DomainUrl = _configuration.GetValue<string>("Domain:URL");

            var content = await System.IO.File.ReadAllTextAsync(templatepath);
            content = content.Replace("{FirstName}", user.FirstName + " " + user.LastName);
            content = content.Replace("{DomainUrlBtn}", DomainUrl + PasswordResetLink);

            EmailHelper emailHelper = new EmailHelper(_configuration);
            bool emailResponse = await emailHelper.SendEmailPasswordResetAsync(user.Email, "Password reset link", content);

            if (emailResponse)
                responce.Message = "Reset link Successfully sent on your registered email";
            else responce.Message = "Some error occour";
            return responce;
        }

        public async Task<MyResModel> ResetPassword(ResetPasswordReqModel resetPassword)
        {
            try
            {
                MyResModel response = new();
                var user = await _userManager.FindByEmailAsync(resetPassword.Email);
                if (user == null)
                {
                    responce.StatusCode = HttpStatusCode.NotFound;
                    responce.Message = "User not found";
                    responce.Success = true;
                }
                if (resetPassword.Token.Contains(' '))
                {
                    string tok = resetPassword.Token.Replace(' ', '+');
                    resetPassword.Token = tok;
                }
                var resetPassResult = await _userManager.ResetPasswordAsync(user, resetPassword.Token, resetPassword.Password);
                if (!resetPassResult.Succeeded)
                {
                    responce.Success = false;
                    responce.StatusCode = HttpStatusCode.Unauthorized;
                    responce.Message = "Token is not valid";
                }
                else
                {
                    responce.Success = true;
                    responce.StatusCode = HttpStatusCode.OK;
                    responce.Message = "password rest successfully";
                }
                return response;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
