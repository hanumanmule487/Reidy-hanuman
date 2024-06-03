using System.ComponentModel.DataAnnotations;

namespace SanmorePlatform_REAL_Utility.Enum.LenderEnum
{
    public enum Environmental : int
    {
        [Display(Name = "None required")]
        None_required=1,
        [Display(Name = "Case by case basis")]
        Case_by_case_basis,
        [Display(Name = "Desktop environmental risk assessment")]
        Desktop_environmental_risk_assessment,
        [Display(Name = "Phase 1 study")]
        Phase_1_study,
        [Display(Name = "Phase 2 study")]
        Phase_2_study,    
    }
}
