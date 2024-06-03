using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanmorePlatform_REAL_Data.Entities
{
    public class KeyFeature
    {
        [Key]
        public int KeyFeatureId { get; set; }
        public string? KeyFeature1 { get; set; }
        public string? KeyFeature2 { get; set; }
        public string? KeyFeature3 { get; set; }
        public string? KeyFeature4 { get; set; }
        // Foreign key Property
        [ForeignKey("PropertyId")]
        public int PropertyId { get; set; }
    }
}
