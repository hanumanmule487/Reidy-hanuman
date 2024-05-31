using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanmorePlatform_REAL_Data.Entities.Buyer
{
    public class Passport
    {
        [Key]
        public int PassportID { get; set; }
        public string? PassportName { get; set; }
        public string? PassportPath { get; set; }
        // public int PassportType { get; set; }
        //public string? CreatedBy { get; set; }
        //public DateTime CreatedOn { get; set; }

        // Foreign key Property
        public int BuyerID { get; set; }
        [ForeignKey("BuyerID")]
        public Buyer Buyer { get; set; }
    }
}
