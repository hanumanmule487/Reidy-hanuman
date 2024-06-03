using System.ComponentModel.DataAnnotations;

namespace SanmorePlatform_REAL_Utility.Enum.LenderEnum
{
    public enum InspectionRequired : int   /// Loan product enum to get & display on page.
    {
        [Display(Name = "None required before close")]
        None_required_before_close = 1,
        [Display(Name = "Third party report needed before closing")]
        Third_party_report_needed_before_closing,
        [Display(Name = "Lender visit needed before closing")]
        Lender_visit_needed_before_closing,
        [Display(Name = "Lender visit after closing")]
        Lender_visit_after_closing,       
    }
}
