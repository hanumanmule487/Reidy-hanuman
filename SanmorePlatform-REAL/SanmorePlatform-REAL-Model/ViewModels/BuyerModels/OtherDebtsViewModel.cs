using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanmorePlatform_REAL_Model.ViewModels.BuyerModels
{
    public class OtherDebtsViewModel
    {
        public int DebtsID { get; set; }
        public int DebtType { get; set; }
        public decimal DebtAmount { get; set; }
       public int BuyerID { get; set; }
    }
}
