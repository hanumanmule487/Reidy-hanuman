using System.ComponentModel.DataAnnotations;

namespace SanmorePlatform_REAL_Model.ViewModels
{
    public class PropertyVideoViewModel
    {
        [Key]
        public int PropertyVideoId { get; set; }
        public string? VideoName { get; set; }
        public string? VideoPath { get; set; }
        public int? PropertyId { get; set; }

    }
}
