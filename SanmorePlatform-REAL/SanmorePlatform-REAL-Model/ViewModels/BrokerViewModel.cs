using Microsoft.AspNetCore.Http;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SanmorePlatform_REAL_Model.ViewModels
{
    public class BrokerViewModel
    {
        [Required]
        public string? UserId { get; set; }
        [Required(ErrorMessage = "First Name is required.")]
        public string? FirstName { get; set; }
        [Required(ErrorMessage = "Last Name is required.")]
        public string? LastName { get; set; }

        public string? Email { get; set; }
        public string? CompanyName { get; set; }
         
        public string? Account { get; set; }
        public string? Title { get; set; }
        public string? MainRole { get; set; }
        [Required(ErrorMessage = "Contact cell phone number is required.")]
        [StringLength(12, MinimumLength = 12, ErrorMessage = "Only 10 numbers are allow.")]
        public string ContactPhoneNumber { get; set; }
        [StringLength(12, MinimumLength = 12, ErrorMessage = "Only 10 numbers are allow.")]
        public string? CompanyPhoneNumber { get; set; }
        public string? SocialMedia { get; set; }
        [StringLength(200, ErrorMessage = "Maximum 200 characters allow.")]
        public string? CompanyProfile { get; set; }

        [Required(ErrorMessage = "Address1 is required.")]
        public string BusinessAddress1 { get; set; }
        public string? BusinessAddress2 { get; set; }
        [Required(ErrorMessage = "City is required.")]
        public string City { get; set; }
        [Required(ErrorMessage = "State is required.")]
        public string State { get; set; }
        [Required(ErrorMessage = "Zipcode is required.")]
        public int? ZipCode { get; set; }
        [Required(ErrorMessage = "Country is required.")]
        public string CountryName { get; set; }


        [Required(ErrorMessage = "Number of deal is required.")]
        public string NumberOfDeals { get; set; }
        [Required(ErrorMessage = "Help you get more deal is required.")]
        public string HelpGetMoreDeals { get; set; }
        [Required(ErrorMessage = "Feature would you like to see is required.")]
        public string FeatureYouLikeToSee { get; set; }
        [Required(ErrorMessage = "Intrested in upload inventory is required.")]
        public string IntrestedInUploadInventory { get; set; }

        public string? IdentificationType { get; set; }

        public string? UpLoadDocuments { get; set; }
        public string? Filename { get; set; }
        public IFormFile? File { get; set; }
        public bool IsApproved { get; set; }

        public bool IsSubmited { get; set; }
        //public string? Email { get; set; }

    }
}
