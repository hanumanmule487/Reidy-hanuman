using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanmorePlatform_REAL_Utility.Enum.LenderEnum
{
    public enum AppraisalList : int
    {
        [Display(Name = "None required")]
        None_required=1,
        [Display(Name = "CMA Is OK")]
        CMA_Is_OK,
        [Display(Name = "Lite Or Desk Appraisal OK")]
        Lite_Or_Desk_Appraisal_OK,
        [Display(Name = "Full Appraisal Needed")]
        Full_Appraisal_Needed,       
    }
}
