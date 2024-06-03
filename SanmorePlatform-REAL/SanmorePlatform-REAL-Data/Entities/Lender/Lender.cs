using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanmorePlatform_REAL_Data.Entities.Lender
{
    public class Lender
    {
        [Key]
        public int LenderId { get; set; }
        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public ApplicationUser ApplicationUser { get; set; }

        public string? FirstName { get; set; }       
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? RoleInLendingCompany { get; set; }
        public string? LenderCompanyName { get; set; }
        public int EntityType { get; set; }
        public string? LenderPhoneNo { get; set; }
        public string? Address1 { get; set; }
        public string? Address2 { get; set; }
        public string? City { get; set; }
        public int StateId { get; set; }
        public string? ZipCode { get; set; }
        public string? Country { get; set; }
        public string? YearsInBusiness { get; set; }
        public string? EstimatedLoansDonePerYear { get; set; }
        public string? PreferredAttorneyForDocDrafting { get; set; }
        public string? PreferredAttorneyPhone { get; set; }
       
        public string? AttorneyEmail { get; set; }
        public int InterestedInServeLoansRightHereWithInReidy { get; set; }
        public int ProofType { get; set; }
        public int IdentificationType { get; set; }
        public string? IdentificationFileName { get; set; }
     
        public string? IdentificationFilePath { get; set; }
        public bool? Disclosure { get; set; }
        public int IsSignupCompleted { get; set; }
        public string? OfficePhone { get; set; }
        public string? Title { get; set; }
    }
}
