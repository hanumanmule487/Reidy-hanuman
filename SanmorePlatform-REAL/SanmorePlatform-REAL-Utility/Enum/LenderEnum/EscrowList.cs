using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanmorePlatform_REAL_Utility.Enum.LenderEnum
{
    public enum EscrowList : int
    {
        [Display(Name = "Insurance only")]
        Insurance_only,
        [Display(Name = "Property taxes only")]
        Property_taxes_only,
        [Display(Name = "Both insurance and property taxes")]
        Both_insurance_and_property_taxes,       
        Other,
       
    }
}
