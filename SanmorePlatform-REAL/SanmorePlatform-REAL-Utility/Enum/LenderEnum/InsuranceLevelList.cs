using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanmorePlatform_REAL_Utility.Enum.LenderEnum
{
    public enum InsuranceLevelList : int   /// Loan product enum to get & display on page.
    {
        [Display(Name = "3 Months")]
        Value1 = 1,
        [Display(Name = "6 Months")]
        Value2,
        [Display(Name = "12 Months")]
        Value3,
        [Display(Name = "1 Year")]
        Value4,
        [Display(Name = "2 Years")]
        Value5,
        [Display(Name = "3 Years")]
        Value,
        
    }

}
