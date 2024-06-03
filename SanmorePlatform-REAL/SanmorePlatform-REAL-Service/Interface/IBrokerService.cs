using Microsoft.AspNetCore.Http;
using SanmorePlatform_REAL_Model.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanmorePlatform_REAL_Service.Interface
{
    public interface IBrokerService
    {
        Task<ResponceModel> AddBrokerAsync(BrokerViewModel model);
        Task<BrokerProfileModel> GetBrokerProfile(string id);
        Task<MyResModel> UpdateBrokerProfile(BrokerProfileModel model);
        Task<List<GetCurrentInventoryViewModel>> CurrentInventory(string id);
        Task<MyResModel> DeleteProp(int propertyId);
    }
}
