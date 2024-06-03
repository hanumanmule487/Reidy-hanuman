using System.Net;

namespace SanmorePlatform_REAL_Model.ViewModels
{
    public class MyResModel
    {
        public bool? Success { get; set; }
        public string? Message { get; set; }
        public HttpStatusCode? StatusCode { get; set; }
        public Object? Data { get; set; }
        public string? Error { get; set; }
    }
}