using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanmorePlatform_REAL_Model.ViewModels.BuyerModels
{
    public class AssetsViewModel
    {
        public int AssetsID { get; set; }
        public decimal OtherAssetsWorth { get; set; }
        public decimal DebtOnAssetsOwned { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public int BuyerID { get; set; }
    }
}
