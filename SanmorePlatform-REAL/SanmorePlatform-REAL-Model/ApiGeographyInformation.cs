using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanmorePlatform_REAL_Model
{
    [JsonObject]
    [Serializable]
    public class ApiGeographyInformation
    {
        public decimal MinLat { get; set; }
        public decimal MinLng { get; set; }
        public decimal MaxLat { get; set; }
        public decimal MaxLng { get; set; }

        public List<ApiGeography> Geographies { get; set; }
    }
}
