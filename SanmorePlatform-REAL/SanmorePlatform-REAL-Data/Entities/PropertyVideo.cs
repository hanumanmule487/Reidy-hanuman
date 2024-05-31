using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanmorePlatform_REAL_Data.Entities
{
    public class PropertyVideo
    {
        [Key]
        public int PropertyVideoId { get; set; }
        public string? VideoName { get; set; }
        public string? VideoPath { get; set; }
        // Foreign key property
        public int PropertyId { get; set; }
        [ForeignKey("PropertyId")]
        public Property property { get; set; }
    }
}
