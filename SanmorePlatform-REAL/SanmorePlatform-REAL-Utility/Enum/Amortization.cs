using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanmorePlatform_REAL_Utility.Enum
{
    public enum Amortization : int
    {
        [Display(Name = "5 year")]
        Year1=1,
        [Display(Name = "10 year")]
        year2,
        [Display(Name = "15 year")]
        year3,
        [Display(Name = "20 year")]
        year4,
        [Display(Name = "25 year")]
        year5,
        [Display(Name = "30 years")]
        year6,
        [Display(Name = "35 years")]
        year7,
        [Display(Name = "40 years")]
        year8,
        [Display(Name = "Other")]
        year9,
    }
}
