using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanmorePlatform_REAL_Model.ViewModels.LenderViewModel
{
    public class LenderProductModel
    {

        public DateTime CreatedOn { get; set; }
        public int ProductId { get; set; }
        public string? Id { get; set; }
        public int LoanProduct { get; set; }
        public int FixedOrAdjustableRate { get; set; }
        public string? AdjustableStructureDesc { get; set; }
        public string? TermValue { get; set; }
        public int TermType { get; set; }

        public int Amortization { get; set; }
        public string? OtherAmortization { get; set; }
        public decimal InterestRate { get; set; }
        public decimal LoanAmountRangeMin { get; set; }
        public decimal LoanAmountRangeMax { get; set; }
        public string? LenderOrigination { get; set; }

        //
        public string? StateId { get; set; }
        public string? Counties { get; set; }
        public string? City { get; set; }
        //
        public string? TypeOfAssets { get; set; }
        public string? MinMultifamilyUnit { get; set; }
        public string? MaxMultifamilyUnit { get; set; }
        public decimal PercentOfPurchaseToLend { get; set; }
        public decimal PercentOfRehabToLend { get; set; }
        public decimal LTVMax { get; set; }
        public decimal LTCMax { get; set; }
        public decimal MinAcceptableDSCR { get; set; }
        public int DoesLoanHavePrepaymentPenalty { get; set; }
        public int TypeOfPrepaymentStructure { get; set; }
        public string? Description { get; set; }
        public int InspectionRequired { get; set; }
        public string? PropertyIncomeDocsRequired { get; set; }
        public int EnvironmentalRequired { get; set; }
        public int AppraisalRequired { get; set; }
        public int SurveyRequired { get; set; }
        public int InsuranceLevelRequirement { get; set; }       
        public int WillYouCollectEscrows { get; set; }
        public string? OtherCollectEscrows { get; set; }      
        public int CreditScoreRequirement { get; set; }
        public int LiquidityRequirement { get; set; }
        public int TaxReturnRequirement { get; set; }
        public string? ExperienceRequirement { get; set; }
        public int NetWorthRequirement { get; set; }
        public string? USCitizenshipStatusRequirement { get; set; }
        //public string? NickName { get; set; }
        public bool UserAgreement { get; set; }
        public List<LenderProgramAmountModel>? LenderProgramAmount { get; set; }
        public List<OtherRequirementProductModel>? OtherRequirementProduct { get; set; }
        public bool TOIGeneralLiability { get; set; }
        public bool TOIHazard { get; set; }
        public bool TOIFlood { get; set; }
        public bool TOIWindAndHail { get; set; }
        public bool TOIBuilderRisk { get; set; }
        public int IsLenderProductCompleted { get; set; }
        public string? CheckMultiProductAdd { get; set; }
        public string? NickName { get; set; }
        public string? Status { get; set; }
        public int MonthlyPayment { get; set; }
        public int ClosingPayment { get; set; }
        public int ExitPayment { get; set; }   
       
    }
}
