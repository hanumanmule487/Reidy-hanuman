using System.ComponentModel.DataAnnotations;

namespace SanmorePlatform_REAL_Utility.Enum.LenderEnum
{
    public enum CreditScoreList : int   /// Loan product enum to get & display on page.
    {
        [Display(Name = "None required")]
        Value1,
        [Display(Name = "550+")]
        val,
        [Display(Name = "600+")]
        Value3,
        [Display(Name = "625+")]
        Value4,
        [Display(Name = "650+")]
        Value5,
        [Display(Name = "675+")]
        Value6,
        [Display(Name = "700+")]
        Value7,
        [Display(Name = "725+")]
        Value8,
        [Display(Name = "750+")]
        Value9,

    }
}
