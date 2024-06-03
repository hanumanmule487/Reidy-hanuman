namespace SanmorePlatform_REAL_Model.ViewModels.LenderViewModel
{
    public class ProofOfLendableFundModel
    {        
        public int ProofOfLendableFundId { get; set; }
        public string? FileName { get; set; }
        public string? FilePath { get; set; }
        public int FileType { get; set; }
        public int LenderId { get; set; }
    }
}
