using System.ComponentModel.DataAnnotations;

namespace SanmorePlatform_REAL_Utility.Enum.LenderEnum
{
    public enum PrepaymentStructure : int   // Loan product enum to get & display on page.
    {      
        [Display(Name = "Flat fee")]
        Flat_fee=1,
        [Display(Name = "Step down")]
        Step_down,
        [Display(Name = "Yield maintenance")]
        Yield_maintenance,
        Defeasance,
        Other,
    }
}
