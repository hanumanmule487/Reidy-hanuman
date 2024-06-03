using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanmorePlatform_REAL_Data.Entities.Buyer
{
    public class CreditDocument
    {
        [Key]
        public int CreditDocumentID { get; set; }
        public string? CreditReportDocName { get; set; }
        public string? CreditReportDocPath { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }

        public int BuyerID { get; set; }
        [ForeignKey("BuyerID")]
        public Buyer Buyer { get; set; }
    }
}
