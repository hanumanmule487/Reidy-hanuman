using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanmorePlatform_REAL_Model.ViewModels.LenderViewModel
{
    public class LenderProfileViewModel
    {

        public int LenderId { get; set; }
        public string Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? RoleInLendingCompany { get; set; }
        public string? LenderCompanyName { get; set; }
        public string? EntityType { get; set; }
        public string? LenderPhoneNo { get; set; }
        public string? Address1 { get; set; }
        public string? Address2 { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? ZipCode { get; set; }
        public string? Country { get; set; }
        public string? YearsInBusiness { get; set; }
        public string? EstimatedLoansDonePerYear { get; set; }
        public string? PreferredAttorneyForDocDrafting { get; set; }
        public string? PreferredAttorneyPhone { get; set; }
        public string? AttorneyEmail { get; set; }
        public string? InterestedInServeLoansRightHereWithInReidy { get; set; }
        public string? IdentificationType { get; set; }
        public string? IdentificationFileName { get; set; }
        public string? IdentificationFilePath { get; set; }
        public bool? Disclosure { get; set; }
        public int IsSignupCompleted { get; set; }
        //ProofOfLendableFund table fields
        public string? ProofType { get; set; }
        public string? UploadLenderFileName { get; set; }
        public string? UploadLenderFilePath { get; set; }
        public string? UploadLendingLicenseName { get; set; }
        public string? UploadLendingLicensePath { get; set; }
        public string? OfficePhone { get; set; }
        public string? Title { get; set; }
    }
}
