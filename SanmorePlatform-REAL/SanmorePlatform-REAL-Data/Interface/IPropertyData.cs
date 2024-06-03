using SanmorePlatform_REAL_Model.ViewModels;
using SanmorePlatform_REAL_Model.ViewModels.DocumentsModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanmorePlatform_REAL_Data.Interface
{
    public interface IPropertyData
    {
       
        Task<int> AddPropertyAsync(FileUploadModel propertyModel);
        Task<int> SaveSearchValueAsync(PropertyFilterModel filterModel);
        Task<List<SearchKeyViewModel>> GetSaveSearchesListAsync(string id);
        Task<SearchKeyViewModel> GetSaveSearchByIdAsync(int Id);
        Task<PropertyViewModel> GetPropertyByIdAsync(int Id);
        Task<List<Sp_GetPropertyListModel>> GetPropertyListAsync(PropertyFilterModel filterModel);
        Task<List<PropertyNameTypeModel>> GetPropertyTypeListAsync();
        Task<List<PropertyStateViewModel>> GetPropertyStateListAsync();

    }
}
