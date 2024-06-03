using SanmorePlatform_REAL_Model.ViewModels;
using SanmorePlatform_REAL_Model.ViewModels.BuyerModels;
using SanmorePlatform_REAL_Model.ViewModels.DocumentsModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanmorePlatform_REAL_Service.Interface
{
    public interface IBuyerService
    {
        Task <BuyerGetViewModel> GetUserById(string id);
        Task<int> BuyerRegistrationAsync(BuyerViewModel buyerModel);
        Task<List<PropertyStateViewModel>> GetPropertyStateListAsync();
    }
}
