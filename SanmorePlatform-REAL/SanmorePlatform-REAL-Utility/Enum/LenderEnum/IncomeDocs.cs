using System.ComponentModel.DataAnnotations;

namespace SanmorePlatform_REAL_Utility.Enum.LenderEnum
{
    public enum IncomeDocs : int 
    {
        [Display(Name = "None required")]
        None_required=1,
        [Display(Name = "Rent roll")]
        Rent_roll,
        [Display(Name = "Current income vs expenses")]
        Current_income_vs_expenses,
        [Display(Name = "Income vs expense report last 6 months")]
        Income_vs_expense_report_last_6_months,
        [Display(Name = "Income vs expense report last 12 months")]
        Income_vs_expense_report_last_12_months,
        [Display(Name = "Copy of all leases")]
        Copy_of_all_leases,      
    }
}
