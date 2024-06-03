using System.ComponentModel.DataAnnotations;

namespace SanmorePlatform_REAL_Model.ViewModels
{
#nullable disable
    public class PropertyStateViewModel
    {
        [Key]
        public int StateId { get; set; }
        public string ShortName { get; set; }
        public string LongName { get; set; }
    }
}
