using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanmorePlatform_REAL_Data.Entities.Buyer
{
    public class Buyer
    {
        [Key]
        public int BuyerID { get; set; }
        public string? UserID { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string? ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public string? SectionID { get; set; }
        public string? AddressLine1 { get; set; }
        public string? AddressLine2 { get; set; }
        public string? City { get; set; }
        public int StateId { get; set; }
        public int ZipCode { get; set; }
        public string? DealsDescription { get; set; }

        public decimal Liquidity { get; set; }

        public bool IsDueLoans { get; set; }
        //public string? DescriptionsNote { get; set; }
        //public bool IsCollateralized { get; set; }
        public string? Collateral { get; set; }
        public string? NoteValue { get; set; }
        public bool IslifeInsurance { get; set; }
        public decimal InsurancePolicyValue { get; set; }
        public bool IsStocksOrBonds { get; set; }
        public decimal StocksAndBondsValue { get; set; }
        public string? SocialSecurityNumber { get; set; }
        public string? SSN1 { get; set; }
        public string? SSN2 { get; set; }
        public string? SSN3 { get; set; }

        public DateTime DateOfBirth { get; set; }
        public int MaritalStatusValue { get; set; }
        public int iSfiledtaxreturns { get; set; }
        public int AcquiringpropertyType { get; set; }
        public bool IsCriminalBackground { get; set; }
        public string? OtherDetailsDescription1 { get; set; }
        public string? OtherDetailsDescription2 { get; set; }
        public int CitizenshipStatus { get; set; }
        public bool ISAccept { get; set; }
        public decimal CashOnHand { get; set; }
        public bool IsOtherRealEstate { get; set; }
        public bool IsOwnedBusiness { get; set; }
        public bool IsOtherDebts { get; set; }
        public int SaveAndCloseFlag { get; set; }
        public decimal OwnedAutomobilesWorth { get; set; }
        public decimal DebtAutosOwned { get; set; }

    }
}
