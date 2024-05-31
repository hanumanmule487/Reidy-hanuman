using System.ComponentModel.DataAnnotations;

namespace SanmorePlatform_REAL_Utility.Enum.LenderEnum
{
    public enum IdentificationType : int
    {
        [Display(Name = "State Issued ID")]
        State_Issued_ID=1,
        [Display(Name = "ProofType")]
        ProofType,      
    }

}
