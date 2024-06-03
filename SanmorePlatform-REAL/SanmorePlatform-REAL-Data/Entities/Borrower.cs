using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanmorePlatform_REAL_Data.Entities
{
    public class Borrower
    {
        [Key]
        public int BorrowerId { get; set; }
        [Required(ErrorMessage = "SSN is Required")]
        [RegularExpression(@"^\d{9}|\d{3}-\d{2}-\d{4}$", ErrorMessage = "Invalid Social Security Number")]
        public string? SSN { get; set; }
        [Required(ErrorMessage = "Date Of Birth must be between {1:M/d/yyyy} and {2:M/d/yyyy}.")]
        [DisplayName("Date Of Birth")]
        public DateTime Dob { get; set; }
        public string? MaritalStatus { get; set; }
        public string? WorkHistory { get; set; } // file
        [Required]
        public int PasspoprtID { get; set; }
        public string? FinancialStatement { get; set; }  //file
        public string? BankStatement { get; set; }  //file
        public string? LLCDocuments { get; set; }  //file
        public int CreditScore { get; set; }
        public float RealState { get; set; }
        public bool UserAgreement { get; set; }
    }
}
