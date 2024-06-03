using System.ComponentModel.DataAnnotations;

namespace SanmorePlatform_REAL_Utility.Enum.LenderEnum
{
    public enum City : int 
    {
        [Display(Name = "All cities")]
        AllCities,
        Chicago,
        Dallas,
        Miami,
        Hollywood,
    }
}
