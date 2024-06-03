using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace SanmorePlatform_REAL_Data.Entities
{
    public class ApplicationUser : IdentityUser
    {
        [Required(ErrorMessage = "Firstname is required")]
        [StringLength(16, ErrorMessage = "Must be between 3 and 16 characters.", MinimumLength = 3)]
        public string? FirstName { get; set; }
        [Required(ErrorMessage = "Lastname is required")]
        [StringLength(16, ErrorMessage = "Must be between 3 and 16 characters.", MinimumLength = 3)]
        public string? LastName { get; set; }
        public string? Address { get; set; }
        public string? AddressLine1 { get; set; }
        public string? AddressLine2 { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? ZipCode { get; set; }
        public string? CompanyName { get; set; }
        public string? Email { get; set; }
        public int? BusinessDuration { get; set; }
        public string? HearAboutUs { get; set; }
        public string? IntrestedIn { get; set; }
        public bool AcceptAgreement { get; set; }
        public string? RoleType { get; set; }
        public string? OfficePhone { get; set; }
        public string? Title { get; set; }
        public string? ProfilePicName { get; set; }
        public bool IsBasicUser { get; set; }
        public bool IsBroker { get; set; }
        public bool IsBuyer { get; set; }
        public bool IsLender { get; set; }
        public bool IsTransactionCoordinator { get; set; }
        public int? PrimaryRole { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}
