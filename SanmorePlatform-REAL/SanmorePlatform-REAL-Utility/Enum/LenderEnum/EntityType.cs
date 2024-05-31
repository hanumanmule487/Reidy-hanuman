using System.ComponentModel.DataAnnotations;

namespace SanmorePlatform_REAL_Utility.Enum.LenderEnum
{
    public enum EntityType : int
    {
        [Display(Name = "Self-proprietorship")]
        Self_proprietorship=1,
        [Display(Name = "LLC")]
        LLC,
        [Display(Name = "LLP")]
        LLP,
        [Display(Name = "S-Corporation")]
        S_Corporation,
        [Display(Name = "C-Corporation")]
        C_Corporation,
    }
}
