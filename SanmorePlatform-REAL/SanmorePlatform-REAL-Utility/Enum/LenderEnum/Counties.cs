using System.ComponentModel.DataAnnotations;

namespace SanmorePlatform_REAL_Utility.Enum.LenderEnum
{
    public enum Counties : int   /// Loan product enum to get & display on page.
    {       
        [Display(Name = "All counties")]
        AllCounties,
        Bullock,
        Butler,
        Colbert,
        Houston,      
    }
}
