using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanmorePlatform_REAL_Data.Entities.Lender
{
    public class LenderProgramAmount
    {
        [Key]
        public int AmountId { get; set; }
        public string? AdditionalFees { get; set; }
        public string? Amount { get; set; }
        public int ProductId { get; set; }

        [ForeignKey("ProductId")]
        public LenderProduct LenderProduct { get; set; }

    }
}
