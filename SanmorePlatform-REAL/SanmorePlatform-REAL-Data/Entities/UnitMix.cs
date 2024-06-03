using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanmorePlatform_REAL_Data.Entities
{
    public class UnitMix
    {
        [Key]
        public int UnitMixId { get; set; }
        public int Beds { get; set; }
        public int Units { get; set; }
        public decimal? Baths { get; set; }
        public decimal? UnitArea { get; set; }
        public decimal? AskingRent { get; set; }
        // Foreign key Property
        [ForeignKey("PropertyId")]
        public int PropertyId { get; set; }
        public Property Property { get; set; }
    }
}
