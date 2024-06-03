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
    public class ApiGeography
    {
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }

        public override string ToString()
        {
            return Longitude + " " + Latitude;
        }
    }
}
