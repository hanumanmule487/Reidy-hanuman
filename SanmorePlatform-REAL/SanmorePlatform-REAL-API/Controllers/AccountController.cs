using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SanmorePlatform_REAL_Model.ViewModels;
using SanmorePlatform_REAL_Service.Interface;
using System.ComponentModel.DataAnnotations;
using System.Net;

namespace SanmorePlatform_REAL_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountServices;
        public AccountController(IAccountService accountServices)
        {
            _accountServices = accountServices;
        }
        /// <summary>
        /// Method is used for Registration user.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>       
        [HttpPost("Registration")]
        public async Task<IActionResult> Registration([FromBody] RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var data = await _accountServices.UserRegistration(model);
                    if (data.StatusCode == HttpStatusCode.OK)
                    {
                        return Ok(new { message = "Registration successful." });

                    }
                    if (data.StatusCode == HttpStatusCode.Found)
                    {
                        return NotFound(new { message = "User already exists" });
                    }
                    else
                    {
                        return Unauthorized(data);
                    }
                }
                catch (Exception)
                {
                    throw;
                }
            }
            return BadRequest(model);
        }
        /// <summary>
        /// Method is used for login user.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost("Login")]
        public async Task<IActionResult> ILogin([FromBody] LoginViewModel model)//Task<IActionResult> Login([FromBody] LoginViewModel model)//async
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var res = await _accountServices.UserLogin(model);
                    if (res.StatusCode == HttpStatusCode.OK)
                    {
                        return Ok(res);
                    }
                    else if (res.StatusCode == HttpStatusCode.NotFound)
                    {
                        return NotFound(res);
                    }
                    else
                    {
                        return Unauthorized(res);
                    }
                }
                catch (Exception)
                {
                    throw;
                }
            }
            return BadRequest();
        }

        /// <summary>
        /// This method is used used to get basic user info
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("GetBasicUserInfo")]
        public async Task<GetBasicUserInfoViewModel> GetBasicUserInfo(string id)
        {
            try
            {
                var data = await _accountServices.GetBasicUserInfo(id);
                return data;
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPut("UpdateBasicUserProfile")]
        public async Task<GetBasicUserInfoViewModel> UpdateBasicUserProfile(GetBasicUserInfoViewModel model)
        {
            try
            {
                var data = await _accountServices.UpdateBasicUserProfile(model);
                return data;
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// Method to change password using user registered eamil and old password
        /// </summary>
        /// <param name="changePasswordReq"></param>
        /// <returns></returns>
        [HttpPost("changePassword")]
        public async Task<IActionResult> ChangePassword(ChangePasswordReqModel changePasswordReq)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var response = await _accountServices.ChangePassword(changePasswordReq);
                    return Ok(response);
                }
                catch
                {
                    throw;
                }
            }
            return BadRequest();
        }

        [HttpPost("ForgotPassword")]
        public async Task<IActionResult> ForgotPassword([Required] string email)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var data = await _accountServices.ForgotPassword(email);
                    if (data != null)
                    {
                        return Ok(data);
                    }
                }
                catch (Exception)
                {
                    throw;
                }
            }
            return BadRequest();
        }

        [HttpPost("ResetPassword")]
        public async Task<IActionResult> ResetPassword(ResetPasswordReqModel resetPassword)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var data = await _accountServices.ResetPassword(resetPassword);
                    if (data.Success == true)
                    {
                        return Ok(data);
                    }
                }
                catch (Exception)
                {
                    throw;
                }
            }
            else
            {
                return BadRequest();
            }
            return Ok();
        }
    }
}
