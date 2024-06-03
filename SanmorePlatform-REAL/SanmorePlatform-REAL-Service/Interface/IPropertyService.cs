
using SanmorePlatform_REAL_Model.ViewModels;
using SanmorePlatform_REAL_Model.ViewModels.DocumentsModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanmorePlatform_REAL_Service.Interface
{
    public interface IPropertyService
    {
        Task<int> AddPropertyAsync(FileUploadModel propertyModel);
        Task<int> SaveSearchValueAsync(PropertyFilterModel filterModel);
        Task<List<SearchKeyViewModel>> GetSaveSearchesListAsync(string id);
        Task<SearchKeyViewModel> GetSaveSearchByIdAsync(int id);
        Task<PropertyViewModel> GetPropertyByIdAsync(int propertyId);
        Task<List<Sp_GetPropertyListModel>> GetPropertyListAsync(PropertyFilterModel filterModel);
        Task<List<PropertyNameTypeModel>> GetPropertyTypeListAsync();
        Task<List<PropertyStateViewModel>> GetPropertyStateListAsync();
        Task<OfferContractReqModel> GetDataOfferContractForm(int propertyId);
        Task<OfferContractReqModel> SaveOfferContractInfo(OfferContractReqModel model);
    }
}
