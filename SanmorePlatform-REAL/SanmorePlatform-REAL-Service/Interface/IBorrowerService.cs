using SanmorePlatform_REAL_Model.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanmorePlatform_REAL_Service.Interface
{
    public interface IBorrowerService
    {
        Task<int> AddBorrowerAsync(BorrowerViewModel model);
    }
}
