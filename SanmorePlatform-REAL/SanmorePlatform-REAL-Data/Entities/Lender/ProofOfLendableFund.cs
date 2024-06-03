using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SanmorePlatform_REAL_Data.Entities.Lender
{
    public class ProofOfLendableFund
    {
        [Key]
        public int ProofOfLendableFundId { get; set; }       
        public string? FileName { get; set; }
        public string? FilePath { get; set; }
        public int FileType { get; set; }
        public int LenderId { get; set; }
        [ForeignKey("LenderId")]
        public Lender Lender { get; set; }
    }
}
