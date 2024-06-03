using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanmorePlatform_REAL_Model.ViewModels
{
    public class UnitMixModel
    {
        public int UnitMixId { get; set; }
        public int Beds { get; set; }
        public int Units { get; set; }
        public decimal? Baths { get; set; }
        public decimal? UnitArea { get; set; }
        public decimal? AskingRent { get; set; }
        public int PropertyId { get; set; }
    }
}