using Microsoft.AspNetCore.Http;
using SanmorePlatform_REAL_Model.ViewModels.DocumentsModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace SanmorePlatform_REAL_Model.ViewModels
{
    public class PropertyViewModel
    {
        public int PropertyId { get; set; }
        public string RelationshipToProperty { get; set; }
        public decimal? TargetPrice { get; set; }
        public string? Address1 { get; set; }
        public string? Address2 { get; set; }
        public string? City { get; set; }
        public int StateId { get; set; }
        public string? State { get; set; }
        public int ZipCode { get; set; }
        public string BuildingStatus { get; set; }
        public decimal? BuildingCount { get; set; }
        public int Units { get; set; }
        public decimal BuiltSquareFootage { get; set; }
        public int Floors { get; set; }
        public string? YearBuilt { get; set; }
        public string? YearRenovated { get; set; }
        public decimal? LandArea { get; set; }
        public string? Occupancy { get; set; }
        public int WillOccupantStayAfterSale { get; set; }
        public int Construction { get; set; }
        public int Elevators { get; set; }
        public decimal? ParkingCount { get; set; }
        public string? Governance { get; set; }
        //public string? ZoningDescription { get; set; }
        public int DeliveryBays { get; set; }
        public string? Highlights { get; set; }
        public bool? AcceptUserAgreement { get; set; }
        public int PropertyTypeId { get; set; }
        public string? PropertyTypeName { get; set; }
        public bool IsActive { get; set; } = true;
        public int Status { get; set; }
        public string? Latitude { get; set; }
        public string? Longitude { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? ImageName { get; set; }
      
        public string? IdentificationFileName { get; set; }
        public int IdentificationVarificationId { get; set; }
        public string? IdentificationFilePath { get; set; }
        [NotMapped]
        public IFormFile? UploadIdentity { get; set; }
        //Updated Property Fields
        public bool IsSellerfinancing { get; set; }
        public decimal? DownPaymentNeeded { get; set; }
        public decimal? InterestBeingOffered { get; set; }
        public int TermOfLoanYear { get; set; }
        public int TermOfLoanMonth { get; set; }
        public int Amortized { get; set; }
        public bool IsthisaSubjecttoAssumption { get; set; }
        public decimal? CashToCloseNeeded { get; set; }
        public decimal? MortgageBalance { get; set; }
        public decimal? MonthlyPaymentBeingAssumed { get; set; }
        public string? EscrowsIncludedInMonthlyPayment { get; set; }
        public int TermLeftOnMortgageYear { get; set; }
        public int TermLeftOnMortgageMonth { get; set; }
        public int AmortizationOfMortgage { get; set; }
        public int DueDiligencePeriodAvailableDays
        {
            get; set;
        }
        public string? KeyFeature1 { get; set; }
        public string? KeyFeature2 { get; set; }
        public string? KeyFeature3 { get; set; }
        public string? KeyFeature4 { get; set; }


        public List<PropertyImageViewModel>? PropertyImages { get; set; }
        public List<DueDiligenceDocumentsModel>? DueDiligenceDocuments { get; set; }
        public List<PropertyVideoViewModel>? PropertyVideo { get; set; }
    }
}
