using System.ComponentModel.DataAnnotations;

namespace SanmorePlatform_REAL_Model.ViewModels
{
    public class PropertyNameTypeModel
    {
        [Key]
        public int PropertyTypeId { get; set; }
        public string? PropertyTypeName { get; set; }
    }
}