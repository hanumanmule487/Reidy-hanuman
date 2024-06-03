using SanmorePlatform_REAL_Model.ViewModels.LenderViewModel;
using SanmorePlatform_REAL_Model.ViewModels.Location;
using System.Globalization;

namespace SanmorePlatform_REAL_Service.Interface
{
    public interface ILenderService
    {
        Task<int> LenderRegisterAsync(LenderModel lenderModel);//for lender signup
        Task<LenderModel> GetBasicUserInfo(string id);//for lender registration
        Task<LenderModel> GetLenderById(string id);//for lender profile
        Task<int> UpdateLenderProfileAsync(LenderModel lenderModel);//for lender profile update
        Task<List<CountryModel>> GetCountryListAsync();
        Task<List<LenderProductResponceModel>> GetLenderProductListAsync(string id);// for get lender product list by id for lender product list page
        Task<int> AddLenderProductAsync(LenderProductModel productModel);// for add a new lender product
        /* Task<List<LenderProductModel>> GetAllLenderProductListAsync();*///for demo
        Task<int> UpdateStatusAsync(LenderProductModel productModel);
        //Task<LenderProductModel> GetByIdAsync(string ID);
        Task<int> SaveProgressAsync(LenderModel lenderModel);//save progress for lender signup page
        Task<LenderProductModel> GetLenderProductByIdAsync(string id);
        Task<int> UpdateLenderProductAsync(LenderProductModel productModel); //TO Get Lender product details on the basis of id.
                                                                            //Task<List<LenderProductModel>>  GetLenderProductList(string search, int sortBy, int filterBy);
    }
}
