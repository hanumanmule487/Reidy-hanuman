using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanmorePlatform_REAL_Model.ViewModels
{
    public class GetBasicUserInfoViewModel: MyResModel
    {
        public string id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string? Company { get; set; }
        public string? Title { get; set; }
        [Required(ErrorMessage ="Email is required.")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Mobile number is required.")]
        public string MobilePhone { get; set; }
        public string? OfficePhone { get; set; }
        public string? ProfilePicName { get; set; }
        public IFormFile? File { get; set; }
    }
}
