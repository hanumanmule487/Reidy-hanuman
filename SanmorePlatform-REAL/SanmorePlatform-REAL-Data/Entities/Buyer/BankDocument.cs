using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanmorePlatform_REAL_Data.Entities.Buyer
{
    public class BankDocument
    {
        [Key]
        public int BankDocumentID { get; set; }
        public string? DocumentName { get; set; }
        public string? DocumentPath { get; set; }
        //public int DocumentType { get; set; }
        //public string? CreatedBy { get; set; }
        //public DateTime CreatedOn { get; set; }

        // Foreign key Property
        public int BuyerID { get; set; }
        [ForeignKey("BuyerID")]
        public Buyer Buyer { get; set; }
    }
}
