using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanmorePlatform_REAL_Model.ViewModels.LenderViewModel
{
    public class LenderProgramAmountModel
    {
        public int AmountId { get; set; }
        public string? AdditionalFees { get; set; }
        public string? Amount { get; set; }
        public int ProductId { get; set; }
    }
}
