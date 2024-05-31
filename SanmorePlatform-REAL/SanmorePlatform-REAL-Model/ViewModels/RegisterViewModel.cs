using System.ComponentModel.DataAnnotations;

namespace SanmorePlatform_REAL_Model.ViewModels
{
    public class RegisterViewModel
    {
        [Required(ErrorMessage = "Firstname is required")]
        [StringLength(16, ErrorMessage = "Must be between 3 and 16 characters.")]
        public string? FirstName { get; set; }
        [Required(ErrorMessage = "Lastname is required")]
        [StringLength(16, ErrorMessage = "Must be between 3 and 16 characters.")]
        public string? LastName { get; set; }
        [Required(ErrorMessage = "Email is required")]
        [StringLength(50, ErrorMessage = "Must be between 5 and 50 characters.", MinimumLength = 5)]
        [RegularExpression("^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$", ErrorMessage = "Must be a valid email")]
        public string? Email { get; set; }
        [Required(ErrorMessage = "Password is required")]
        [StringLength(255, ErrorMessage = "Must be between 5 and 255 characters.", MinimumLength = 5)]
        [DataType(DataType.Password)]
        public string? Password { get; set; }
        [Required(ErrorMessage = "Confirm Password is required")]
        [StringLength(255, ErrorMessage = "Must be between 5 and 255 characters.", MinimumLength = 5)]
        [DataType(DataType.Password)]
        [Compare("Password", ErrorMessage = "Password and confirm password not match.")]
        public string? ConfirmPassword { get; set; }
        [Required(ErrorMessage = "PhoneNumber is required")]
        [DataType(DataType.PhoneNumber)]
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        public string? AddressLine1 { get; set; }
        public string? AddressLine2 { get; set; }
        public string? IntrestedIn { get; set; }
        public string? CompanyName { get; set; }
        public int? BusinessDuration { get; set; }
        public string? HearAboutUs { get; set; }
        public bool AcceptAgreement { get; set; }
    }

}
