using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanmorePlatform_REAL_Data.Entities
{
    public class BrokerSignUp
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public ApplicationUser ApplicationUser { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string? CompanyName { get; set; }
        public string? Title { get; set; }
        public string? MainRole { get; set; }
        public string ContactPhoneNumber { get; set; }
        public string? CompanyPhoneNumber { get; set; }
        public string? SocialMedia { get; set; }
        public string? CompanyProfile { get; set; }

        public string BusinessAddress1 { get; set; }
        public string? BusinessAddress2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public int? ZipCode { get; set; }
        public string CountryName { get; set; }

        public string NumberOfDeals { get; set; }
        public string HelpGetMoreDeals { get; set; }
        public string FeatureYouLikeToSee { get; set; }
        public string IntrestedInUploadInventory { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }

        public string? IdentificationType { get; set; }
        public string? FileName { get; set; }
        public bool IsApproved { get; set; }
        public bool IsSubmited { get; set; }
        //public string? Email { get; set; }
    }
}
