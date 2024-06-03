using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanmorePlatform_REAL_Model.ViewModels.BuyerModels
{
    public class BankDocumentViewModel
    {
        public int BankDocumentID { get; set; }
        public string? DocumentName { get; set; }
        public string? DocumentPath { get; set; }
        public int BuyerID { get; set; }
        public List<IFormFile>? ImageFile { get; set; }
    }
}
