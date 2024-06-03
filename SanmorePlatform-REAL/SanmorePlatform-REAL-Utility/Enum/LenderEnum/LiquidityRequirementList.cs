using System.ComponentModel.DataAnnotations;

namespace SanmorePlatform_REAL_Utility.Enum.LenderEnum
{
    public enum LiquidityRequirementList : int   /// Loan product enum to get & display on page.
    {
        [Display(Name = "None required")]
        Value1,
        [Display(Name = "3 months of debt service")]
        Value2,
        [Display(Name = "6 months of debt service")]
        Value3,
        [Display(Name = "9 months of debt service")]
        Value4,
        [Display(Name = "1 year of debt service")]
        Value5,
        [Display(Name = "5% of loan amount")]
        Value6,
        [Display(Name = "10% of loan amount")]
        Value7,
        [Display(Name = "20% of loan amount")]
        Value8,
        [Display(Name = "More than 20% of loan amount")]
        Value9,
    }
}
