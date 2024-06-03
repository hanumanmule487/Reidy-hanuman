using System.ComponentModel.DataAnnotations;

namespace SanmorePlatform_REAL_Utility.Enum.LenderEnum
{
    public enum AssetType : int
    {
        Multifamily = 1,
        [Display(Name = "All counties")]
        Residential,
        Office,
        Industrial,
        Retail,
        Shopping_center,
        Specialty,
        Healthcare,
        Hospitality,
        Sports_entertainment,
        Land,
        Residential_portfolio
    }
}
