using System.ComponentModel.DataAnnotations;

namespace SanmorePlatform_REAL_Model.ViewModels
{
    public class Sp_GetPropertyListModel
    {
        [Key]
        public int PropertyId { get; set; }
        public string RelationshipToProperty { get; set; }
        public decimal TargetPrice { get; set; }
        public string? Address1 { get; set; }
        public string? Address2 { get; set; }
        public string? City { get; set; }
        //public string? State { get; set; }
        public int StateId { get; set; }
        public string? LongName { get; set; }
        public string? Title { get; set; }
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
        public string? ZoningDescription { get; set; }
        public int DeliveryBays { get; set; }
        public string? Highlights { get; set; }
        public bool? AcceptUserAgreement { get; set; }

        public int PropertyTypeId { get; set; }
        public string? PropertyTypeName { get; set; }
        public bool IsActive { get; set; } = true;
        public int Status { get; set; }
        public string? Latitude { get; set; }
      //  public string? Title { get; set; }
        public string? Longitude { get; set; }


        //public int StateId { get; set; }
        public string? Description { get; set; }
        public string? ImageName { get; set; }
       

        //public IFormFile? ImageFile { get; set; }
        //-=================
        //public string? OtherGovernance { get; set; }
        //public string? LandSquareFootage { get; set; }
        //public int LotStatus { get; set; }
        //public int LotUse { get; set; }
        //public int Electric { get; set; }
        //public int Gas { get; set; }
        //public int Water { get; set; }
        //public int OpenToPartneringWithBuilders { get; set; }
        ////publiintFile? ImageFile { get; set; }
        //public int SurveyAvailable { get; set; }
        //public int EnvironmentalAvailable { get; set; }
        //public int LandSquareFootageUnit { get; set; }
    }
}
