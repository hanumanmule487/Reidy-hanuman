using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanmorePlatform_REAL_Data.Entities.Buyer
{
    public class RealEstate
    {

        [Key]
        public int RealEstateID { get; set; }

        public string? OtherAddressLine1 { get; set; }
        public string? OtherAddressLine2 { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public int ZipCode { get; set; }
        public int PropertyTypeID { get; set; }
        public decimal PropertyWorth { get; set; }
        public decimal DebtOnProperty { get; set; }
        public DateTime AcquiredDate { get; set; }
        public decimal PercentageOfOwnedProperty { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        // Foreign key Property
        public int BuyerID { get; set; }
        [ForeignKey("BuyerID")]
        public Buyer Buyer { get; set; }
    }
}
