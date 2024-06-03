using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanmorePlatform_REAL_Data.Entities.Lender
{
    public class OtherRequirementProduct
    {
        [Key]
        public int RequirementId { get; set; }
        public string? RequirementDesc { get; set; }
        public int ProductId { get; set; }

        [ForeignKey("ProductId")]
        public LenderProduct LenderProduct { get; set; }

    }
}
