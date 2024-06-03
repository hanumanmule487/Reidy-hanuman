using System.ComponentModel.DataAnnotations;

namespace SanmorePlatform_REAL_Utility.Enum.LenderEnum
{

    public enum ProofType : int
    {
        [Display(Name = "Credit letter")]
        Credit_letter=1,
        [Display(Name = "Proof of liquidity")]
        Proof_of_liquidity,
     
    }
}
