using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanmorePlatform_REAL_Model.ViewModels.BuyerModels
{
    public class BuyerGetViewModel
    {
        public int BuyerID { get; set; }
        public int WorkExperienceID { get; set; }
        public string? UserID { get; set; }
        public string? SectionID { get; set; }

        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? AddressLine1 { get; set; }
        public string? AddressLine2 { get; set; }
        public string? City { get; set; }
        public int StateId { get; set; }
        public string? StateName { get; set; }
        public int ZipCode { get; set; }
        public string? CompanyName { get; set; }
        public string? FromDate { get; set; }
        public string? ToDate { get; set; }
        public string? Description { get; set; }
        public List<WoExViewModel>? WorkExpModel { get; set; }
        public List<RealEstateViewModel>? RealEstateVM { get; set; }
        public List<LoanViewModel>? LoanViewModel { get; set; }
        public List<BusinessViewModel>? BusinessViewModel { get; set; }
        public List<AssetsViewModel>? AssetsViewModel { get; set; }
        public List<OtherDebtsViewModel>? OtherDebtsViewModel { get; set; }
        public List<BankDocumentViewModel>? BankDocument { get; set; }
        public List<CreditDocumentViewModel>? CreditReports { get; set; }
        public List<PassportViewModel>? PassportsList { get; set; }

        public List<IFormFile>? UploadBankDocumnet { get; set; }
        public List<IFormFile>? UploadCreditReport { get; set; }
        public List<IFormFile>? UploadIdsAndPassport { get; set; }
        public string? PassportName { get; set; }
        public string? PassportPath { get; set; }
        public string? CreditReportDocName { get; set; }
        public string? CreditReportDocPath { get; set; }
        public string? DocumentName { get; set; }
        public string? DocumentPath { get; set; }
        public string? DealsDescription { get; set; }
        public bool IsOtherRealEstate { get; set; }
        public decimal Liquidity { get; set; }
        public bool IsDueLoans { get; set; }
        public string? DescriptionsNote { get; set; }
        public bool IsCollateralized { get; set; }
        public decimal InsurancePolicyValue { get; set; }
        public bool IslifeInsurance { get; set; }
        public bool IsStocksOrBonds { get; set; }
        public decimal StocksAndBondsValue { get; set; }
        public decimal DebtAutosOwned { get; set; }
        public decimal OwnedAutomobilesWorth { get; set; }

        public bool IsOtherDebts { get; set; }
        public bool IsOwnedBusiness { get; set; }
        public decimal CashOnHand { get; set; }
        public bool ISAccept { get; set; }
        public int CitizenshipStatus { get; set; }
        public string? OtherDetailsDescription2 { get; set; }
        public string? OtherDetailsDescription1 { get; set; }

        public bool IsCriminalBackground { get; set; }

        public int AcquiringpropertyType { get; set; }

        public int iSfiledtaxreturns { get; set; }

        public int MaritalStatusValue { get; set; }

        public DateTime DateOfBirth { get; set; }
        public string? SocialSecurityNumber { get; set; }
        public string? SSN1 { get; set; }
        public string? SSN2 { get; set; }
        public string? SSN3 { get; set; }
        public string? NoteValue { get; set; }

        public string? Collateral { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public List<PropertyStateViewModel?> states { get; set; }
        public List<PropertyNameTypeModel?> PropTypeList { get; set; }
    }
}
