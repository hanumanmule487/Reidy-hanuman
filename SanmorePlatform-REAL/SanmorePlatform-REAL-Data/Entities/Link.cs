using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SanmorePlatform_REAL_Data.Entities
{
    public class Link
    {

        [Key]
        public int LinkId { get; set; }
        public string? LinkName { get; set; }
        // Foreign key Property
        public int PropertyId { get; set; }
        [ForeignKey("PropertyId")]
        public Property Property { get; set; }
    }
}
