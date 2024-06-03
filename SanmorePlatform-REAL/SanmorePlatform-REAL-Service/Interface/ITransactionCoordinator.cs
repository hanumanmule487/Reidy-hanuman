using SanmorePlatform_REAL_Model.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanmorePlatform_REAL_Service.Interface
{
    public interface ITransactionCoordinator
    {
        Task<List<TcPropertyListingViewModel>> GetAllPropList();
        Task<TcGetPropByIdModel> GetPropById(int propertyId);
        Task <List<TcAllUserListViewModel>> GetAllUserList();
        Task <ResponceModel> UpdatePropStatus(int propId, string status);
        Task<List<TcPropertyListingViewModel>> FilterPropertyListing(string search);
    }
}
