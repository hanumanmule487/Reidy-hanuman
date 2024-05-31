using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanmorePlatform_REAL_Model.ViewModels.BuyerModels
{
    public class BusinessViewModel
    {
        public int BusinessID { get; set; }

        public string? BusinessType { get; set; }
        public decimal OwnedBusinessPercentage { get; set; }
        public decimal BusinessValue { get; set; }

        public int BuyerID { get; set; }
    }
}
