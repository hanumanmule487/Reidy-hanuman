using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace SanmorePlatform_REAL_Model.ViewModels
{
    public class BrokerProfileModel:MyResModel
    {
        [Required]
        public string UserId { get; set; }
        [Required(ErrorMessage = "First Name is required.")]
        public string FirstName { get; set; }
        [Required(ErrorMessage = "Last Name is required.")]
        public string LastName { get; set; }
        public string? Title { get; set; }
        [Required(ErrorMessage = "Email is required.")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Mobile number is required.")]
        public string MobilePhone { get; set; }
        public string? OfficePhone { get; set; }
        public int? PrimaryRole { get; set; }
        public string? ProfilePicName { get; set; }
        public IFormFile? ProfilePhoto { get; set; }


        [Required(ErrorMessage = "Company Name is required.")]
        public string CompanyName { get; set; }
        public string? MainRole { get; set; }
        [Required(ErrorMessage = "Address is required.")]
        public string BusinessAddress1 { get; set; }

        [Required(ErrorMessage = "Contact cell phone number is required.")]
        [StringLength(12, MinimumLength = 12, ErrorMessage = "Only 10 numbers are allow.")]
        public string ContactPhoneNumber { get; set; }
        [StringLength(12, MinimumLength = 12, ErrorMessage = "Only 10 numbers are allow.")]
        public string? CompanyPhoneNumber { get; set; }
        [StringLength(200, ErrorMessage = "Maximum 200 characters allow.")]
        public string? CompanyProfile { get; set; }
        public string? SocialMedia { get; set; }


        public string? BusinessAddress2 { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public int? ZipCode { get; set; }
        public string? CountryName { get; set; }


        [Required(ErrorMessage = "Number of deal is required.")]
        public string NumberOfDeals { get; set; }
        [Required(ErrorMessage = "Help you get more deal is required.")]
        public string HelpGetMoreDeals { get; set; }
        [Required(ErrorMessage = "Feature would you like to see is required.")]
        public string FeatureYouLikeToSee { get; set; }
        [Required(ErrorMessage = "Intrested in upload inventory is required.")]
        public string IntrestedInUploadInventory { get; set; }

        public string? IdentificationType { get; set; }
        public string? Filename { get; set; }
        public IFormFile? IdProofFile { get; set; }
    }
}
