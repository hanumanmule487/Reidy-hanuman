using System.ComponentModel.DataAnnotations;

namespace SanmorePlatform_REAL_Utility.Enum.LenderEnum
{
    public enum TaxRequirementList : int
    {
        [Display(Name = "None required")]
        None_required,
        [Display(Name = "Must Show Last Year")]
        Must_Show_Last_Year,
        [Display(Name = "Must Show Last 2 Years")]
        Must_Show_Last_2_Years,
        [Display(Name = "Must Show Last 3 Years")]
        Must_Show_Last_3_Years,
    }
}
