using Microsoft.AspNetCore.Http;

namespace SanmorePlatform_REAL_Model.ViewModels
{
    public class PropertyImageViewModel
    {
        public int PropertyImageId { get; set; }
        public string? ImageName { get; set; }
        public string? ImagePath { get; set; }
        public int PropertyId { get; set; }        
        public List<IFormFile>? ImageFile { get; set; }
    }
}
