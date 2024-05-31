using Microsoft.AspNetCore.Http;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace SanmorePlatform_REAL_Model.ViewModels
{
    public class BorrowerViewModel
    {
        [Required(ErrorMessage = "SSN is Required")]
        public string? SSN { get; set; }
        [Required(ErrorMessage = "Date Of Birth must be between {1:M/d/yyyy} and {2:M/d/yyyy}.")]
        [DisplayName("Date Of Birth")]
        public DateTime Dob { get; set; }
        public string? MaritalStatus { get; set; }
        public IFormFile? WorkHistory { get; set; }
        [Required]
        public int PasspoprtID { get; set; }
        public IFormFile? FinancialStatement { get; set; }
        public IFormFile? BankStatement { get; set; }
        public IFormFile? LLCDocuments { get; set; }
        public int CreditScore { get; set; }
        public float RealState { get; set; }
        public bool UserAgreement { get; set; }
    }
}
