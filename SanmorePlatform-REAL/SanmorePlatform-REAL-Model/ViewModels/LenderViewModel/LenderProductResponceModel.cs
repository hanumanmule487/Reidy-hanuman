using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanmorePlatform_REAL_Model.ViewModels.LenderViewModel
{
    public class LenderProductResponceModel
    {
        public int ProductId { get; set; }
        public string? Id { get; set; }
        public string? NickName { get; set; }
        public int LoanProduct { get; set; }
        public decimal LTVMax { get; set; }
        public decimal LTCMax { get; set; }
        public int CreditScoreRequirement { get; set; }
        public int LiquidityRequirement { get; set; }
        public int AppraisalRequired { get; set; }
        public string? TypeOfAssets { get; set; }
        public decimal LoanAmountRangeMin { get; set; }
        public decimal LoanAmountRangeMax { get; set; }
        public decimal InterestRate { get; set; }
        public int DoesLoanHavePrepaymentPenalty { get; set; }
        public int TypeOfPrepaymentStructure { get; set; }
        public string? StateId { get; set; }
        public string? City { get; set; }
        public DateTime CreatedOn { get; set; }
        public List<PropertyStateViewModel>? StateList { get; set; }


    }
}
