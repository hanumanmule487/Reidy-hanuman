using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanmorePlatform_REAL_Model.ViewModels.BuyerModels
{
    public class LoanViewModel
    {
        public int LoanID { get; set; }
        public string? DescriptionsNote { get; set; }
        public bool IsCollateralized { get; set; }
        public decimal CollateralValue { get; set; }
        public int BuyerID { get; set; }
        public string? Collateral { get; set; }
        public decimal NoteValue { get; set; }
    }
}
