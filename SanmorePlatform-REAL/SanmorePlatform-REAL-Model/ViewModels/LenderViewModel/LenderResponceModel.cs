using Microsoft.AspNetCore.Http;

namespace SanmorePlatform_REAL_Model.ViewModels.LenderViewModel
{
    public class LenderResponceModel
    {
        public int LenderId { get; set; }
        public string Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        
        public string? Account {  get; set; }

         public string? SocialMedia{ get; set; }
        public string? PhoneNumber { get; set; }
        public string? RoleInLendingCompany { get; set; }
        public string? LenderCompanyName { get; set; }
        public int EntityType { get; set; }
        public string? LenderPhoneNo { get; set; }
        public string? BusinessAddress { get; set; }
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
        public int IdentificationType { get; set; }
        public string? IdentificationFileName { get; set; }
        public string? IdentificationFilePath { get; set; }
        public IFormFile? UploadLenderIdentity { get; set; }
        public bool? UploadDocuments { get; set; }
        public int IsSignupCompleted { get; set; }

        //ProofOfLendableFund table fields
        public int ProofType { get; set; }
        public string? UploadLenderFileName { get; set; }
        public string? UploadLenderFilePath { get; set; }
        public List<IFormFile>? UploadLenderFile { get; set; }
        public string? UploadLendingLicenseName { get; set; }
        public string? UploadLendingLicensePath { get; set; }
        public List<IFormFile>? UploadLendingLicense { get; set; }
        public string? OfficePhone { get; set; }
        public string? Title { get; set; }
        public List<PropertyStateViewModel?> states { get; set; }
        public List<ProofOfLendableFundModel>? ProofOfLendableFund { get; set; }

    }
}
