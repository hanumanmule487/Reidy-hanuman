using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SanmorePlatform_REAL_Data.Entities
{
    public class DueDiligenceDocument
    {
        [Key]
        public int DueDiligenceDocumentId { get; set; }
        public string? FileName { get; set; }
        public string? FilePath { get; set; }
        public int FileType { get; set; }
        // Foreign key Property
        public int PropertyId { get; set; }
        [ForeignKey("PropertyId")]
        public Property Property { get; set; }

    }
}
