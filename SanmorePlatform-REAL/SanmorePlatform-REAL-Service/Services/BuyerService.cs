using Microsoft.EntityFrameworkCore;
using SanmorePlatform_REAL_Data;
using SanmorePlatform_REAL_Data.Entities;
using SanmorePlatform_REAL_Data.Interface;
using SanmorePlatform_REAL_Model.ViewModels;
using SanmorePlatform_REAL_Model.ViewModels.BuyerModels;
using SanmorePlatform_REAL_Model.ViewModels.DocumentsModel;
using SanmorePlatform_REAL_Service.Interface;
#nullable disable
namespace SanmorePlatform_REAL_Service.Services
{
    public class BuyerService : IBuyerService
    {
        private readonly IBuyerData _repository;
        private readonly ApplicationDbContext _context;

        public BuyerService(IBuyerData repository, ApplicationDbContext context)
        {
            _context = context;
            _repository = repository;
        }

        public async Task<BuyerGetViewModel> GetUserById(string id)
        {
            var basicUser = await _repository.GetUserById(id);
            return basicUser;
        }
        public async Task<int> BuyerRegistrationAsync(BuyerViewModel buyerModel)
        {
            return await _repository.BuyerRegistrationAsync(buyerModel);
        }

        public async Task<List<PropertyStateViewModel>> GetPropertyStateListAsync()
        {
            var propertyStateList = await _repository.GetPropertyStateListAsync();
            return propertyStateList;
        }



    }
}
