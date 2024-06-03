using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace SanmorePlatform_REAL_Model.ViewModels
{
    public class ResponceModel
    {
        public bool? Success { get; set; }
        public string? Message { get; set; }
        public HttpStatusCode StatusCode { get; set; }
        public Object? Data { get; set; }
        public string? Token { get; set; }
        public string? Error { get; set; }
    }
}
