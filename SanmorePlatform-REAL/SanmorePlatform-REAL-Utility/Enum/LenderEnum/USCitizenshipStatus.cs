using System.ComponentModel.DataAnnotations;

namespace SanmorePlatform_REAL_Utility.Enum.LenderEnum
{
    public enum USCitizenshipStatus : int
    {
        [Display(Name = "US citizen")]
        US_citizen,
        [Display(Name = "Legal US resident")]
        Legal_US_resident,
        [Display(Name = "US Visa or temporary status holder")]
        US_Visa_or_temporary_status_holder,
        [Display(Name = "International citizenship accepted")]
        International_citizenship_accepted,
    }
}
