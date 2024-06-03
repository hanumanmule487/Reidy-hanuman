using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanmorePlatform_REAL_Model.ViewModels.BuyerModels
{
    public class CreditDocumentViewModel
    {
        public int CreditDocumentID { get; set; }
        public string? CreditReportDocName { get; set; }
        public string? CreditReportDocPath { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public int BuyerID { get; set; }
        public List<IFormFile>? ImageFile { get; set; }
    }
}
