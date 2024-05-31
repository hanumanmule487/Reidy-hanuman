using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanmorePlatform_REAL_Model.ViewModels.BuyerModels
{
    public class RealEstateViewModel
    {
        public int BuyerID { get; set; }
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
    }
}
