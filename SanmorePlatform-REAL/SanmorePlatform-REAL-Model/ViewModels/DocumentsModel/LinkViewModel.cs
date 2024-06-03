using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanmorePlatform_REAL_Model.ViewModels.DocumentsModel
{
    public class LinkViewModel
    {
        public int LinkId { get; set; }

        public string? LinkName { get; set; }
      
        public int PropertyId { get; set; }
    }
}
