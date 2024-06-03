using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanmorePlatform_REAL_Data.Entities
{
    public class PropertyImage
    {
        [Key]
        public int PropertyImageId { get; set; }
        public string? ImageName { get; set; }
        public string? ImagePath { get; set; }

        // Foreign key Property
        public int PropertyId { get; set; }
        [ForeignKey("PropertyId")]
        public Property property { get; set; }

    }
}
