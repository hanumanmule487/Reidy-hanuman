using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanmorePlatform_REAL_Data.Entities.Location
{
    public class Country
    {     
            [Key]
            public int CountryID { get; set; }
            public string? CountryName { get; set; }
            public string? TwoCharCountryCode { get; set; }
            public string? ThreeCharCountryCode { get; set; }
        
    }
}
