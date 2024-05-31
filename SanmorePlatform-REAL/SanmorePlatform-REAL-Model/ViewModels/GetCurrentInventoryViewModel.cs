using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanmorePlatform_REAL_Model.ViewModels
{
    public class GetCurrentInventoryViewModel : MyResModel
    {
        public string? UserId { get; set; }
        public int PropertyId { get; set; }
        public string RelationshipToProperty { get; set; }
        public decimal? TargetPrice { get; set; }
        public decimal OriginalContractPrice { get; set; }
        public string? Address1 { get; set; }
        public string? Address2 { get; set; }
        public string? City { get; set; }
        public int StateId { get; set; }
        public string? State { get; set; }
        public string? StateName { get; set; }
        public int ZipCode { get; set; }
        public string? BuildingStatus { get; set; }
        public string? CreatedOn { get; set; }
        public string? ModifyDate { get; set; }
        public string? IsApproved { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? ContactNumber { get; set; }
        public int? LastMonthsViews { get; set; }
        public int? TotalViews { get; set; }
        public int PropertyTypeId { get; set; }
        public string? PropertyTypeName { get; set; }
        public bool IsActive { get; set; } = true;
        public string? ImageName { get; set; }
        public string? PropertyImages { get; set; }
    }
}
