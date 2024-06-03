using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.Metrics;

namespace SanmorePlatform_REAL_Data.Entities
{
    public class Property
    {
        [Key]
        public int PropertyId { get; set; }
        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public ApplicationUser ApplicationUser { get; set; }
        [Required(ErrorMessage = "RelationshipToProperty is required")]
        public string RelationshipToProperty { get; set; }
        [Required(ErrorMessage = "TargetPrice is required.")]
        public decimal TargetPrice { get; set; }
        [Required(ErrorMessage = "Address1 is required")]
        public string? Address1 { get; set; }

        public string? Address2 { get; set; }
        [Required(ErrorMessage = "City is required")]
        public string? City { get; set; }
        [Required(ErrorMessage = "State is required")]
        public int StateId { get; set; }
        public int ZipCode { get; set; }
        public string BuildingStatus { get; set; }
        public decimal? BuildingCount { get; set; }
        public int Units { get; set; }
        public decimal BuiltSquareFootage { get; set; }
        public int Floors { get; set; }
        public string? YearBuilt { get; set; }
        public string? YearRenovated { get; set; }
        public decimal LandArea { get; set; }
        public string? Occupancy { get; set; }
        public int WillOccupantStayAfterSale { get; set; }
        public int Construction { get; set; }
        public int Elevators { get; set; }
        public decimal? ParkingCount { get; set; }
        public string? Governance { get; set; }
        public string? OtherGovernance { get; set; }

        public string? ZoningDescription { get; set; }
        public int DeliveryBays { get; set; }
        public string? Highlights { get; set; }
        public bool? AcceptUserAgreement { get; set; }
        [Required(ErrorMessage = "PropertyType is required")]
        public int PropertyTypeId { get; set; }
        public bool IsActive { get; set; } = true;
        public int Status { get; set; }
        public string? Latitude { get; set; }
        public string? Longitude { get; set; }

        public string? Description { get; set; }
        public string? ImageName { get; set; }
        public int CreatedBy { get; set; }
        public DateTime? CreatedOn { get; set; }
        public int ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public int IdentificationVarificationId { get; set; }
        public string? IdentificationFileName { get; set; }

        public string? IdentificationFilePath { get; set; }
        //Updated fields in Property
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
        public int DueDiligencePeriodAvailableDays { get; set; }
        public decimal OriginalTargetPrice { get; set; }
        // Add Residential Property data/fields in to table
        public int ResidentialBuildingStatus { get; set; }
        public string? ResidentialRenovated { get; set; }
        public decimal ResidentialAfterRepairValue { get; set; }
        public int ResidentialBedrooms { get; set; }
        public int ResidentialBathrooms { get; set; }
        public decimal ResidentialBuiltSquareFootage { get; set; }
        public decimal ResidentialLotSizeSquareFootage { get; set; }
        public int ResidentialBuiltYear { get; set; }
        public int ResidentialRenovatedYear { get; set; }
        public int ResidentialParking { get; set; }
        public int ResidentialParkingSpace { get; set; }
        public int ResidentialOccupancy { get; set; }
        public int ResidentialWillOccupancyStayAfterSale { get; set; }
        //Add Key Features values in to Property table
        public string? KeyFeature1 { get; set; }
        public string? KeyFeature2 { get; set; }
        public string? KeyFeature3 { get; set; }
        public string? KeyFeature4 { get; set; }
        //Add LandDetails in to Property table
        public string? LandSquareFootage { get; set; }
        public int LandSquareFootageUnit { get; set; }
        public int LotStatus { get; set; }
        public int LotUse { get; set; }
        public int Electric { get; set; }
        public int Gas { get; set; }
        public string? Water { get; set; }
        public int OpenToPartneringWithBuilders { get; set; }
        public int SurveyAvailable { get; set; }
        public int EnvironmentalAvailable { get; set; }
        public string? StateName { get; set; }
        public string? IsApproved { get; set; }
        public int? CountryId { get; set; }
        public bool IsDeleted { get; set; }
    }
}
