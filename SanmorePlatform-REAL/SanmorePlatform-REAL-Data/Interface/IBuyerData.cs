using SanmorePlatform_REAL_Model.ViewModels;
using SanmorePlatform_REAL_Model.ViewModels.BuyerModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanmorePlatform_REAL_Data.Interface
{
    public interface IBuyerData
    {
        Task<BuyerGetViewModel> GetUserById(string id);
        Task<int> BuyerRegistrationAsync(BuyerViewModel buyerModel);
        Task<List<PropertyStateViewModel>> GetPropertyStateListAsync();
    }
}
