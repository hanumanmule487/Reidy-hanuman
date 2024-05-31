using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SanmorePlatform_REAL_Data.Entities
{
    public class OfferContract
    {
        [Key]
        public int Id { get; set; }
        public int PropertyId { get; set; }
        [ForeignKey("PropertyId")]
        public Property property { get; set; }
        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public ApplicationUser ApplicationUser { get; set; }
        public string NameOfBuyingEntity { get; set; }
        public string? PhoneNumber { get; set; }

        public string? Address1 { get; set; }
        public string? Address2 { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public int? ZipCode { get; set; }
        public string? Country { get; set; }

        public decimal PurchasePrice { get; set; }
        public string? DueDiligencePeriod { get; set; }
        public DateTime? ClosingDate { get; set; }
        public string LoanExitStrategy { get; set; }
        public string? RefiLenderName { get; set; }
        public string? Other { get; set; }
        public string? ProofOfFundsFile { get; set; }
    }
}
