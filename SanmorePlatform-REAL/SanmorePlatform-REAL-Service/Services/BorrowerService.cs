using SanmorePlatform_REAL_Data;
using SanmorePlatform_REAL_Data.Entities;
using SanmorePlatform_REAL_Model.ViewModels;
using SanmorePlatform_REAL_Service.Interface;
#nullable disable
namespace SanmorePlatform_REAL_Service.Services
{
    public class BorrowerService : IBorrowerService
    {
        private readonly ApplicationDbContext _context;

        public BorrowerService(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<int> AddBorrowerAsync(BorrowerViewModel model)
        {
            //save work history
            //var workHistory = Guid.NewGuid().ToString() + Path.GetExtension(model.WorkHistory.FileName);
            //var identityPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Images", workHistory);
            //var identityDirectory = Path.GetDirectoryName(identityPath);
            //if (!Directory.Exists(identityDirectory))
            //{
            //    Directory.CreateDirectory(identityDirectory);
            //}
            //using (var stream = new FileStream(identityPath, FileMode.Create))
            //{
            //    await model.WorkHistory.CopyToAsync(stream);
            //}
            //// save Financial Statement 
            //var financialStatement = Guid.NewGuid().ToString() + Path.GetExtension(model.FinancialStatement.FileName);
            //var relationWithPropertyPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Images", financialStatement);
            //var relationWithPropertyDirectory = Path.GetDirectoryName(relationWithPropertyPath);
            //if (!Directory.Exists(relationWithPropertyDirectory))
            //{
            //    Directory.CreateDirectory(relationWithPropertyDirectory);
            //}
            //using (var stream = new FileStream(relationWithPropertyPath, FileMode.Create))
            //{
            //    await model.FinancialStatement.CopyToAsync(stream);
            //}
            ////save Bank Statement
            //var bankStatement = Guid.NewGuid().ToString() + Path.GetExtension(model.BankStatement.FileName);
            //var contractPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Images", bankStatement);
            //var contractDirectory = Path.GetDirectoryName(contractPath);
            //if (!Directory.Exists(contractDirectory))
            //{
            //    Directory.CreateDirectory(contractDirectory);
            //}
            //using (var stream = new FileStream(contractPath, FileMode.Create))
            //{
            //    await model.BankStatement.CopyToAsync(stream);
            //}
            ////save LLC Document
            //var llcDocument = Guid.NewGuid().ToString() + Path.GetExtension(model.LLCDocuments.FileName);
            //var picturesPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Images", llcDocument);
            //var picturesDirectory = Path.GetDirectoryName(picturesPath);
            //if (!Directory.Exists(picturesDirectory))
            //{
            //    Directory.CreateDirectory(picturesDirectory);
            //}
            //using (var stream = new FileStream(picturesPath, FileMode.Create))
            //{
            //    await model.LLCDocuments.CopyToAsync(stream);
            //}
            ////save model for borrower
            //var records = new Borrower
            //{
            //    SSN = model.SSN,
            //    Dob = model.Dob,
            //    MaritalStatus = model.MaritalStatus,
            //    WorkHistory = workHistory,
            //    PasspoprtID = model.PasspoprtID,
            //    FinancialStatement = financialStatement,
            //    BankStatement = bankStatement,
            //    LLCDocuments = llcDocument,
            //    CreditScore = model.CreditScore,
            //    RealState = model.RealState,
            //    UserAgreement = model.UserAgreement
            //};
            //_context.Borrowers.Add(records);
            //await _context.SaveChangesAsync();
            return 200;
        }
    }
}
