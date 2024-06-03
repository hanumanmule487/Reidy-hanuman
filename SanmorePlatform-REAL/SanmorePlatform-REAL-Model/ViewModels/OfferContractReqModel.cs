using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace SanmorePlatform_REAL_Model.ViewModels
{
    public class OfferContractReqModel
    {
        [Required]
        public int PropertyId { get; set; }
        public string UserId { get; set; }
        [Required(ErrorMessage = "Buying entity is required.")]
        public string NameOfBuyingEntity { get; set; }
        public string? PhoneNumber { get; set; }

        public string? Address1 { get; set; }
        public string? Address2 { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public int? ZipCode { get; set; }
        public string? Country { get; set; }

        [Required(ErrorMessage = "Purchase price is required.")]
        public decimal PurchasePrice { get; set; }
        public string? DueDiligencePeriod { get; set; }
        public DateTime? ClosingDate { get; set; }
        [Required(ErrorMessage = "Strategy is required.")]
        public string LoanExitStrategy { get; set; }
        public string? RefiLenderName { get; set; }
        [Required(ErrorMessage = "This field is required.")]
        public string? Other { get; set; }
        public string? ProofOfFundsFile { get; set; }
        public IFormFile? File { get; set; }
    }
}
