using SanmorePlatform_REAL_Model.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanmorePlatform_REAL_Service.Interface
{
    public interface IAccountService
    {
        Task<ResponceModel> UserRegistration(RegisterViewModel model);
        Task<ResponceModel> UserLogin(LoginViewModel model);
        //ResponceModel UserLogin(LoginViewModel model);
        Task<GetBasicUserInfoViewModel> GetBasicUserInfo(string id);
        Task<GetBasicUserInfoViewModel> UpdateBasicUserProfile(GetBasicUserInfoViewModel model);
        Task<MyResModel> ChangePassword(ChangePasswordReqModel changePasswordReq);
        Task<MyResModel> ForgotPassword(string email);
        Task<MyResModel> ResetPassword(ResetPasswordReqModel resetPassword);
    }
}
