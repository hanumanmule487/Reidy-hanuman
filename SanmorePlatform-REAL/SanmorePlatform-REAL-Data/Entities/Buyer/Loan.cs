using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanmorePlatform_REAL_Data.Entities.Buyer
{
    public class Loan
    {
        [Key]
        public int LoanID { get; set; }
        public string? DescriptionsNote { get; set; }
        public bool IsCollateralized { get; set; }
        public decimal CollateralValue { get; set; }
        public string? Collateral { get; set; }
        public decimal CollateralNoteValue { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }

        // Foreign key Property
        public int BuyerID { get; set; }
        [ForeignKey("BuyerID")]
        public Buyer Buyer { get; set; }
    }
}
