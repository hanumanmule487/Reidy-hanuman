using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using SanmorePlatform_REAL_Data;
using SanmorePlatform_REAL_Data.Entities;
using SanmorePlatform_REAL_Data.Entities.Lender;
using SanmorePlatform_REAL_Data.Service;
using SanmorePlatform_REAL_Model.ViewModels;
using SanmorePlatform_REAL_Model.ViewModels.LenderViewModel;
using SanmorePlatform_REAL_Model.ViewModels.Location;
using SanmorePlatform_REAL_Service.Interface;
using SanmorePlatform_REAL_Utility.Enum;

namespace SanmorePlatform_REAL_Service.Services
{
    public class LenderService : ILenderService
    {

        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public LenderService(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }


        /// <summary>
        /// Get Basic user info from database
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<LenderModel> GetBasicUserInfo(string id)
        {
            try
            {
                LenderModel res = new();
                var lender = new Lender();
                var data = _context.Lender.Where(x => x.UserId == id).FirstOrDefault();
                if (data != null)
                {
                    if (data.IsSignupCompleted == 0)
                    {
                        var userData2 = await _context.Lender.Where(x => x.UserId == id).Select(x => new LenderModel()
                        {
                            FirstName = x.FirstName,
                            LastName = x.LastName,
                            Email = x.Email,
                            PhoneNumber = x.PhoneNumber,
                            RoleInLendingCompany = x.RoleInLendingCompany,
                            LenderCompanyName = x.LenderCompanyName,
                            EntityType = x.EntityType,
                            LenderPhoneNo = x.LenderPhoneNo,
                            Address1 = x.Address1,
                            Address2 = x.Address2,
                            City = x.City,
                            StateId = x.StateId,
                            ZipCode = x.ZipCode,
                            Country = x.Country,
                            YearsInBusiness = x.YearsInBusiness,
                            EstimatedLoansDonePerYear = x.EstimatedLoansDonePerYear,
                            PreferredAttorneyForDocDrafting = x.PreferredAttorneyForDocDrafting,
                            PreferredAttorneyPhone = x.PreferredAttorneyPhone,
                            AttorneyEmail = x.AttorneyEmail,
                            InterestedInServeLoansRightHereWithInReidy = x.InterestedInServeLoansRightHereWithInReidy,
                            ProofType = x.ProofType,
                            IdentificationType = x.IdentificationType,
                            Disclosure = x.Disclosure,
                            Id = x.UserId,
                            OfficePhone = x.OfficePhone,
                            Title = x.Title,


                        }).FirstOrDefaultAsync();
                        return userData2;

                    }
                    else
                    {
                        var userData1 = await _context.Users.Where(x => x.Id == id).Select(x => new LenderModel()
                        {

                            FirstName = x.FirstName,
                            LastName = x.LastName,
                            Email = x.Email,
                            PhoneNumber = x.PhoneNumber,
                            Id = x.Id

                        }).FirstOrDefaultAsync();
                        return userData1;
                    }

                }
                var userData = await _context.Users.Where(x => x.Id == id).Select(x => new LenderModel()
                {

                    FirstName = x.FirstName,
                    LastName = x.LastName,
                    Email = x.Email,
                    PhoneNumber = x.PhoneNumber,
                    Id = x.Id

                }).FirstOrDefaultAsync();
                return userData;


            }
            catch (Exception)
            {
                throw;
            }

        }


        /// <summary>
        /// Signup to become a lender
        /// </summary>
        /// <param name="lenderModel"></param>
        /// <returns></returns>
        public async Task<int> LenderRegisterAsync(LenderModel lenderModel)
        {
            try
            {
                var data = _context.Lender.Where(x => x.UserId == lenderModel.Id).FirstOrDefault();
                //var identityPath = lenderModel.IdentificationFilePath.Split('\\').LastOrDefault();
                //identityPath = "/LenderIdentityFile/" + identityPath;
                if (data == null)
                {
                    //save lender data into database
                    var lender = new Lender()
                    {
                        FirstName = lenderModel.FirstName,
                        LastName = lenderModel.LastName,
                        Email = lenderModel.Email,
                        PhoneNumber = lenderModel.PhoneNumber,
                        RoleInLendingCompany = lenderModel.RoleInLendingCompany,
                        LenderCompanyName = lenderModel.LenderCompanyName,
                        EntityType = lenderModel.EntityType,
                        LenderPhoneNo = lenderModel.LenderPhoneNo,
                        Address1 = lenderModel.Address1,
                        Address2 = lenderModel.Address2,
                        City = lenderModel.City,
                        StateId = lenderModel.StateId,
                        ZipCode = lenderModel.ZipCode,
                        Country = lenderModel.Country,
                        YearsInBusiness = lenderModel.YearsInBusiness,
                        EstimatedLoansDonePerYear = lenderModel.EstimatedLoansDonePerYear,
                        PreferredAttorneyForDocDrafting = lenderModel.PreferredAttorneyForDocDrafting,
                        PreferredAttorneyPhone = lenderModel.PreferredAttorneyPhone,
                        InterestedInServeLoansRightHereWithInReidy = lenderModel.InterestedInServeLoansRightHereWithInReidy,
                        IdentificationType = lenderModel.IdentificationType,
                        IdentificationFileName = lenderModel.IdentificationFileName,
                        IdentificationFilePath = lenderModel.IdentificationFilePath,
                        Disclosure = lenderModel.Disclosure,
                        IsSignupCompleted = lenderModel.IsSignupCompleted,
                        ProofType = lenderModel.ProofType,
                        UserId = lenderModel.Id,
                        AttorneyEmail = lenderModel.AttorneyEmail,
                    };
                    _context.Lender.Add(lender);
                    await _context.SaveChangesAsync();

                    var updateUserRole = await _userManager.FindByIdAsync(lenderModel.Id);
                    if (updateUserRole != null)
                    {
                        updateUserRole.IsLender = true;
                        updateUserRole.UpdatedDate = DateTime.Now;
                        updateUserRole.RoleType = UserRolesEnum.Lender.ToString();
                        _context.Update(updateUserRole);
                        _context.SaveChanges();
                    }

                    if (!string.IsNullOrEmpty(lenderModel.UploadLenderFileName))
                    {
                        var imgArray = lenderModel.UploadLenderFileName.Split(',');
                        var pathArray = lenderModel.UploadLenderFilePath.Split(',');
                        for (var i = 0; i < imgArray.Length - 1; i++)
                        {
                            LenderFileType fileType = LenderFileType.UploadFile;
                            var TrimPath = pathArray[i].Split('\\').LastOrDefault();
                            TrimPath = "/UploadLenderFile/" + TrimPath;
                            var propertyImage = new ProofOfLendableFund()
                            {

                                FileName = imgArray[i],
                                FilePath = TrimPath,
                                FileType = (int)fileType,
                                LenderId = lender.LenderId,

                            };
                            _context.ProofOfLendableFund.Add(propertyImage);
                            await _context.SaveChangesAsync();
                        }
                    }
                    if (!string.IsNullOrEmpty(lenderModel.UploadLendingLicenseName))
                    {
                        var imgArray = lenderModel.UploadLendingLicenseName.Split(',');
                        var pathArray = lenderModel.UploadLendingLicensePath.Split(',');
                        for (var i = 0; i < imgArray.Length - 1; i++)
                        {
                            LenderFileType fileType = LenderFileType.UploadLendingLicense;
                            var TrimPath = pathArray[i].Split('\\').LastOrDefault();
                            TrimPath = "/UploadLendingLicense/" + TrimPath;
                            var propertyImage = new ProofOfLendableFund()
                            {
                                FileName = imgArray[i],
                                FilePath = TrimPath,
                                FileType = (int)fileType,
                                LenderId = lender.LenderId,

                            };
                            _context.ProofOfLendableFund.Add(propertyImage);
                            await _context.SaveChangesAsync();
                        }
                    }
                }
                else
                {
                    data.FirstName = lenderModel.FirstName;
                    data.LastName = lenderModel.LastName;
                    data.Email = lenderModel.Email;
                    data.PhoneNumber = lenderModel.PhoneNumber;
                    data.RoleInLendingCompany = lenderModel.RoleInLendingCompany;
                    data.LenderCompanyName = lenderModel.LenderCompanyName;
                    data.EntityType = lenderModel.EntityType;
                    data.LenderPhoneNo = lenderModel.LenderPhoneNo;
                    data.Address1 = lenderModel.Address1;
                    data.Address2 = lenderModel.Address2;
                    data.City = lenderModel.City;
                    data.StateId = lenderModel.StateId;
                    data.ZipCode = lenderModel.ZipCode;
                    data.Country = lenderModel.Country;
                    data.YearsInBusiness = lenderModel.YearsInBusiness;
                    data.EstimatedLoansDonePerYear = lenderModel.EstimatedLoansDonePerYear;
                    data.PreferredAttorneyForDocDrafting = lenderModel.PreferredAttorneyForDocDrafting;
                    data.PreferredAttorneyPhone = lenderModel.PreferredAttorneyPhone;
                    data.InterestedInServeLoansRightHereWithInReidy = lenderModel.InterestedInServeLoansRightHereWithInReidy;
                    data.IdentificationType = lenderModel.IdentificationType;
                    data.IdentificationFileName = lenderModel.IdentificationFileName;
                    data.IdentificationFilePath = lenderModel.IdentificationFilePath;
                    data.Disclosure = lenderModel.Disclosure;
                    data.IsSignupCompleted = lenderModel.IsSignupCompleted;
                    data.ProofType = lenderModel.ProofType;
                    data.OfficePhone = lenderModel.OfficePhone;
                    data.Title = lenderModel.Title;
                    _context.Lender.Update(data);
                    await _context.SaveChangesAsync();

                    if (!string.IsNullOrEmpty(lenderModel.UploadLenderFileName))
                    {
                        var imgArray = lenderModel.UploadLenderFileName.Split(',');
                        var pathArray = lenderModel.UploadLenderFilePath.Split(',');
                        for (var i = 0; i < imgArray.Length - 1; i++)
                        {
                            LenderFileType fileType = LenderFileType.UploadFile;
                            var propertyImage = new ProofOfLendableFund()
                            {

                                FileName = imgArray[i],
                                FilePath = pathArray[i],
                                FileType = (int)fileType,
                                LenderId = data.LenderId,


                            };
                            _context.ProofOfLendableFund.Update(propertyImage);
                            await _context.SaveChangesAsync();
                        }
                    }
                    if (!string.IsNullOrEmpty(lenderModel.UploadLendingLicenseName))
                    {
                        var imgArray = lenderModel.UploadLendingLicenseName.Split(',');
                        var pathArray = lenderModel.UploadLendingLicensePath.Split(',');
                        for (var i = 0; i < imgArray.Length - 1; i++)
                        {
                            LenderFileType fileType = LenderFileType.UploadLendingLicense;
                            var propertyImage = new ProofOfLendableFund()
                            {
                                FileName = imgArray[i],
                                FilePath = pathArray[i],
                                FileType = (int)fileType,
                                LenderId = data.LenderId,

                            };
                            _context.ProofOfLendableFund.Update(propertyImage);
                            await _context.SaveChangesAsync();
                        }
                    }
                }

                return 200;
            }
            catch (Exception)
            {

                throw;
            }
        }

        /// <summary>
        /// Get Lender signup info 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<LenderModel> GetLenderById(string id)
        {
            try
            {
                LenderModel res = new();
                var lender = new Lender();
                var data = _context.Lender.Where(x => x.UserId == id).FirstOrDefault();
                var userData2 = await _context.Lender.Where(x => x.UserId == id).Select(x => new LenderModel()
                {
                    FirstName = x.FirstName,
                    LastName = x.LastName,
                    Email = x.Email,
                    PhoneNumber = x.PhoneNumber,
                    RoleInLendingCompany = x.RoleInLendingCompany,
                    LenderCompanyName = x.LenderCompanyName,
                    EntityType = x.EntityType,
                    LenderPhoneNo = x.LenderPhoneNo,
                    Address1 = x.Address1,
                    Address2 = x.Address2,
                    City = x.City,
                    StateId = x.StateId,
                    ZipCode = x.ZipCode,
                    YearsInBusiness = x.YearsInBusiness,
                    EstimatedLoansDonePerYear = x.EstimatedLoansDonePerYear,
                    PreferredAttorneyForDocDrafting = x.PreferredAttorneyForDocDrafting,
                    PreferredAttorneyPhone = x.PreferredAttorneyPhone,
                    InterestedInServeLoansRightHereWithInReidy = x.InterestedInServeLoansRightHereWithInReidy,
                    Id = x.UserId,
                    ProofType = x.ProofType,
                    IdentificationType = x.IdentificationType,
                    IdentificationFileName=x.IdentificationFileName,
                    IdentificationFilePath=x.IdentificationFilePath,
                    ProofOfLendableFund = _context.ProofOfLendableFund.Where(x => x.LenderId == data.LenderId).Select(l => new ProofOfLendableFundModel
                    {
                        ProofOfLendableFundId = l.ProofOfLendableFundId,
                        FileName = l.FileName,
                        FilePath = l.FilePath,
                        FileType = l.FileType,
                        LenderId = l.LenderId,
                    }).ToList(),

                }).FirstOrDefaultAsync();
                return userData2;

            }
            catch (Exception)
            {
                throw;
            }

        }

        /// <summary>
        /// Create a new Lender product 
        /// </summary>
        /// <param name="productModel"></param>
        /// <returns></returns>
        public async Task<int> AddLenderProductAsync(LenderProductModel productModel)
        {
            var data = _context.LenderProduct.Where(x => x.UserId == productModel.Id).FirstOrDefault();
            if (data == null || data.CheckMultiProductAdd != null)
            {
                var product = new LenderProduct()
                {
                    //CreatedOn=DateTime.Today,
                    ProductId = productModel.ProductId,
                    UserId = productModel.Id,
                    CreatedOn = DateTime.Now,
                    LoanProduct = productModel.LoanProduct,
                    FixedOrAdjustableRate = productModel.FixedOrAdjustableRate,
                    AdjustableStructureDesc = productModel.AdjustableStructureDesc,
                    TermValue = productModel.TermValue,
                    TermType = productModel.TermType,
                    Amortization = productModel.Amortization,
                    OtherAmortization = productModel.OtherAmortization,
                    InterestRate = productModel.InterestRate,
                    LoanAmountRangeMin = productModel.LoanAmountRangeMin,
                    LoanAmountRangeMax = productModel.LoanAmountRangeMax,
                    LenderOrigination = productModel.LenderOrigination,
                    StateId = productModel.StateId,                 
                    Counties = productModel.Counties,
                    City = productModel.City,
                    TypeOfAssets = productModel.TypeOfAssets,
                    MinMultifamilyUnit = productModel.MinMultifamilyUnit,
                    MaxMultifamilyUnit = productModel.MaxMultifamilyUnit,
                    PercentOfPurchaseToLend = productModel.PercentOfPurchaseToLend,
                    PercentOfRehabToLend = productModel.PercentOfRehabToLend,
                    LTVMax = productModel.LTVMax,
                    LTCMax = productModel.LTCMax,
                    MinAcceptableDSCR = productModel.MinAcceptableDSCR,
                    DoesLoanHavePrepaymentPenalty = productModel.DoesLoanHavePrepaymentPenalty,
                    TypeOfPrepaymentStructure = productModel.TypeOfPrepaymentStructure,
                    Description = productModel.Description,
                    InspectionRequired = productModel.InspectionRequired,
                    PropertyIncomeDocsRequired = productModel.PropertyIncomeDocsRequired,
                    EnvironmentalRequired = productModel.EnvironmentalRequired,
                    AppraisalRequired = productModel.AppraisalRequired,
                    SurveyRequired = productModel.SurveyRequired,
                    InsuranceLevelRequirement = productModel.InsuranceLevelRequirement,
                    WillYouCollectEscrows = productModel.WillYouCollectEscrows,
                    OtherCollectEscrows = productModel.OtherCollectEscrows,
                    CreditScoreRequirement = productModel.CreditScoreRequirement,
                    LiquidityRequirement = productModel.LiquidityRequirement,
                    TaxReturnRequirement = productModel.TaxReturnRequirement,
                    ExperienceRequirement = productModel.ExperienceRequirement,
                    NetWorthRequirement = productModel.NetWorthRequirement,
                    USCitizenshipStatusRequirement = productModel.USCitizenshipStatusRequirement,
                    NickName = productModel.NickName,
                    UserAgreement = productModel.UserAgreement,
                    TOIGeneralLiability = productModel.TOIGeneralLiability,
                    TOIHazard = productModel.TOIHazard,
                    TOIFlood = productModel.TOIFlood,
                    TOIWindAndHail = productModel.TOIWindAndHail,
                    TOIBuilderRisk = productModel.TOIBuilderRisk,
                    IsLenderProductCompleted = productModel.IsLenderProductCompleted,
                    CheckMultiProductAdd = productModel.CheckMultiProductAdd,
                };
                try
                {
                    _context.LenderProduct.Add(product);
                    await _context.SaveChangesAsync();
                }
                catch (Exception)
                {
                    throw;
                }

                // Create a list to hold LenderProgramAmount entities
                if (productModel.LenderProgramAmount != null)
                {
                    var lendingProductAmount = new List<LenderProgramAmount>();
                    foreach (var amountModel in productModel.LenderProgramAmount)
                    {
                        if (amountModel.AdditionalFees != null || amountModel.Amount != null)
                        {
                            var amountData = new LenderProgramAmount()
                            {
                                AdditionalFees = amountModel.AdditionalFees,
                                Amount = amountModel.Amount,
                                ProductId = product.ProductId  // Assuming there's a foreign key relationship between UnitMix and Property
                            };
                            lendingProductAmount.Add(amountData);
                        }
                    }

                    // Add the list of UnitMix to the context and save changes
                    _context.LenderProgramAmount.AddRange(lendingProductAmount);
                    await _context.SaveChangesAsync();
                }

                // Create a list to hold LenderProgramAmount entities
                if (productModel.OtherRequirementProduct != null)
                {
                    var otherRequirement = new List<OtherRequirementProduct>();
                    foreach (var requireModel in productModel.OtherRequirementProduct)
                    {
                        if (requireModel.RequirementDesc != null)
                        {
                            var requireData = new OtherRequirementProduct()
                            {
                                RequirementDesc = requireModel.RequirementDesc,
                                ProductId = product.ProductId  // Assuming there's a foreign key relationship between UnitMix and Property
                            };
                            otherRequirement.Add(requireData);
                        }
                    }

                    // Add the list of UnitMix to the context and save changes
                    _context.OtherRequirementProduct.AddRange(otherRequirement);
                    await _context.SaveChangesAsync();
                }
            }
            else if ((data != null || data.CheckMultiProductAdd != null) && data.IsLenderProductCompleted != 0)
            {
                var product = new LenderProduct()
                {
                    //CreatedOn=DateTime.Today,
                    ProductId = productModel.ProductId,
                    UserId = productModel.Id,
                    CreatedOn = DateTime.Now,
                    LoanProduct = productModel.LoanProduct,
                    FixedOrAdjustableRate = productModel.FixedOrAdjustableRate,
                    AdjustableStructureDesc = productModel.AdjustableStructureDesc,
                    TermValue = productModel.TermValue,
                    TermType = productModel.TermType,
                    Amortization = productModel.Amortization,
                    OtherAmortization = productModel.OtherAmortization,
                    InterestRate = productModel.InterestRate,
                    LoanAmountRangeMin = productModel.LoanAmountRangeMin,
                    LoanAmountRangeMax = productModel.LoanAmountRangeMax,
                    LenderOrigination = productModel.LenderOrigination,
                    StateId = productModel.StateId,
                    Counties = productModel.Counties,
                    City = productModel.City,
                    TypeOfAssets = productModel.TypeOfAssets,
                    MinMultifamilyUnit = productModel.MinMultifamilyUnit,
                    MaxMultifamilyUnit = productModel.MaxMultifamilyUnit,
                    PercentOfPurchaseToLend = productModel.PercentOfPurchaseToLend,
                    PercentOfRehabToLend = productModel.PercentOfRehabToLend,
                    LTVMax = productModel.LTVMax,
                    LTCMax = productModel.LTCMax,
                    MinAcceptableDSCR = productModel.MinAcceptableDSCR,
                    DoesLoanHavePrepaymentPenalty = productModel.DoesLoanHavePrepaymentPenalty,
                    TypeOfPrepaymentStructure = productModel.TypeOfPrepaymentStructure,
                    Description = productModel.Description,
                    InspectionRequired = productModel.InspectionRequired,
                    PropertyIncomeDocsRequired = productModel.PropertyIncomeDocsRequired,
                    EnvironmentalRequired = productModel.EnvironmentalRequired,
                    AppraisalRequired = productModel.AppraisalRequired,
                    SurveyRequired = productModel.SurveyRequired,
                    InsuranceLevelRequirement = productModel.InsuranceLevelRequirement,
                    WillYouCollectEscrows = productModel.WillYouCollectEscrows,
                    OtherCollectEscrows = productModel.OtherCollectEscrows,
                    CreditScoreRequirement = productModel.LiquidityRequirement,
                    LiquidityRequirement = productModel.LiquidityRequirement,
                    TaxReturnRequirement = productModel.TaxReturnRequirement,
                    ExperienceRequirement = productModel.ExperienceRequirement,
                    NetWorthRequirement = productModel.NetWorthRequirement,
                    USCitizenshipStatusRequirement = productModel.USCitizenshipStatusRequirement,
                    UserAgreement = productModel.UserAgreement,
                    TOIGeneralLiability = productModel.TOIGeneralLiability,
                    TOIHazard = productModel.TOIHazard,
                    TOIFlood = productModel.TOIFlood,
                    TOIWindAndHail = productModel.TOIWindAndHail,
                    TOIBuilderRisk = productModel.TOIBuilderRisk,
                    IsLenderProductCompleted = productModel.IsLenderProductCompleted,

                };
                try
                {
                    _context.LenderProduct.Add(product);
                    await _context.SaveChangesAsync();
                }
                catch (Exception)
                {
                    throw;
                }

                // Create a list to hold LenderProgramAmount entities
                if (productModel.LenderProgramAmount != null)
                {
                    var lendingProductAmount = new List<LenderProgramAmount>();
                    foreach (var amountModel in productModel.LenderProgramAmount)
                    {
                        if (amountModel.AdditionalFees != null || amountModel.Amount != null)
                        {
                            var amountData = new LenderProgramAmount()
                            {
                                AdditionalFees = amountModel.AdditionalFees,
                                Amount = amountModel.Amount,
                                ProductId = product.ProductId  // Assuming there's a foreign key relationship between UnitMix and Property
                            };
                            lendingProductAmount.Add(amountData);
                        }
                    }

                    // Add the list of UnitMix to the context and save changes
                    _context.LenderProgramAmount.AddRange(lendingProductAmount);
                    await _context.SaveChangesAsync();
                }

                // Create a list to hold LenderProgramAmount entities
                if (productModel.OtherRequirementProduct != null)
                {
                    var otherRequirement = new List<OtherRequirementProduct>();
                    foreach (var requireModel in productModel.OtherRequirementProduct)
                    {
                        if (requireModel.RequirementDesc != null)
                        {
                            var requireData = new OtherRequirementProduct()
                            {
                                RequirementDesc = requireModel.RequirementDesc,
                                ProductId = product.ProductId  // Assuming there's a foreign key relationship between UnitMix and Property
                            };
                            otherRequirement.Add(requireData);
                        }
                    }

                    // Add the list of UnitMix to the context and save changes
                    _context.OtherRequirementProduct.AddRange(otherRequirement);
                    await _context.SaveChangesAsync();
                }
            }
            else
            {
                data.LoanProduct = productModel.LoanProduct;
                data.FixedOrAdjustableRate = productModel.FixedOrAdjustableRate;
                data.AdjustableStructureDesc = productModel.AdjustableStructureDesc;
                data.TermValue = productModel.TermValue;
                data.TermType = productModel.TermType;
                data.Amortization = productModel.Amortization;
                data.OtherAmortization = productModel.OtherAmortization;
                data.InterestRate = productModel.InterestRate;
                data.LoanAmountRangeMin = productModel.LoanAmountRangeMin;
                data.LoanAmountRangeMax = productModel.LoanAmountRangeMax;
                data.LenderOrigination = productModel.LenderOrigination;
                data.StateId = productModel.StateId;
                data.Counties = productModel.Counties;
                data.City = productModel.City;
                data.TypeOfAssets = productModel.TypeOfAssets;
                data.MinMultifamilyUnit = productModel.MinMultifamilyUnit;
                data.MaxMultifamilyUnit = productModel.MaxMultifamilyUnit;
                data.PercentOfPurchaseToLend = productModel.PercentOfPurchaseToLend;
                data.PercentOfRehabToLend = productModel.PercentOfRehabToLend;
                data.LTVMax = productModel.LTVMax;
                data.LTCMax = productModel.LTCMax;
                data.MinAcceptableDSCR = productModel.MinAcceptableDSCR;
                data.DoesLoanHavePrepaymentPenalty = productModel.DoesLoanHavePrepaymentPenalty;
                data.TypeOfPrepaymentStructure = productModel.TypeOfPrepaymentStructure;
                data.Description = productModel.Description;
                data.InspectionRequired = productModel.InspectionRequired;
                data.PropertyIncomeDocsRequired = productModel.PropertyIncomeDocsRequired;
                data.EnvironmentalRequired = productModel.EnvironmentalRequired;
                data.AppraisalRequired = productModel.AppraisalRequired;
                data.SurveyRequired = productModel.SurveyRequired;
                data.InsuranceLevelRequirement = productModel.InsuranceLevelRequirement;
                data.WillYouCollectEscrows = productModel.WillYouCollectEscrows;
                data.OtherCollectEscrows = productModel.OtherCollectEscrows;
                data.CreditScoreRequirement = productModel.LiquidityRequirement;
                data.LiquidityRequirement = productModel.LiquidityRequirement;
                data.TaxReturnRequirement = productModel.TaxReturnRequirement;
                data.ExperienceRequirement = productModel.ExperienceRequirement;
                data.NetWorthRequirement = productModel.NetWorthRequirement;
                data.USCitizenshipStatusRequirement = productModel.USCitizenshipStatusRequirement;
                data.UserAgreement = productModel.UserAgreement;
                data.TOIGeneralLiability = productModel.TOIGeneralLiability;
                data.TOIHazard = productModel.TOIHazard;
                data.TOIFlood = productModel.TOIFlood;
                data.TOIWindAndHail = productModel.TOIWindAndHail;
                data.TOIBuilderRisk = productModel.TOIBuilderRisk;
                data.IsLenderProductCompleted = productModel.IsLenderProductCompleted;

                _context.LenderProduct.Update(data);
                await _context.SaveChangesAsync();

                // Create a list to hold LenderProgramAmount entities
                if (productModel.LenderProgramAmount != null)
                {
                    var lendingProductAmount = new List<LenderProgramAmount>();
                    foreach (var amountModel in productModel.LenderProgramAmount)
                    {
                        if (amountModel.AdditionalFees != null || amountModel.Amount != null)
                        {
                            var amountData = new LenderProgramAmount()
                            {
                                AdditionalFees = amountModel.AdditionalFees,
                                Amount = amountModel.Amount,
                                ProductId = data.ProductId  // Assuming there's a foreign key relationship between UnitMix and Property
                            };
                            lendingProductAmount.Add(amountData);
                        }
                    }

                    // Add the list of UnitMix to the context and save changes
                    _context.LenderProgramAmount.UpdateRange(lendingProductAmount);
                    await _context.SaveChangesAsync();
                }
                // Create a list to hold LenderProgramAmount entities
                if (productModel.OtherRequirementProduct != null)
                {
                    var otherRequirement = new List<OtherRequirementProduct>();
                    foreach (var requireModel in productModel.OtherRequirementProduct)
                    {
                        if (requireModel.RequirementDesc != null)
                        {
                            var requireData = new OtherRequirementProduct()
                            {
                                RequirementDesc = requireModel.RequirementDesc,
                                ProductId = data.ProductId  // Assuming there's a foreign key relationship between UnitMix and Property
                            };
                            otherRequirement.Add(requireData);
                        }
                    }

                    // Add the list of UnitMix to the context and save changes
                    _context.OtherRequirementProduct.UpdateRange(otherRequirement);
                    await _context.SaveChangesAsync();
                }
            }


            return 200;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public async Task<List<CountryModel>> GetCountryListAsync()
        {
            List<CountryModel> propertystateList = await _context.Country.Select(x => new CountryModel
            {
                CountryID = x.CountryID,
                CountryName = x.CountryName,
            }).ToListAsync();
            return propertystateList;
        }

        /// <summary>
        /// Get the list of lending product
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<List<LenderProductResponceModel>> GetLenderProductListAsync(string id)
        {
            try
            {
                LenderProductResponceModel res = new();
                var lender = new LenderProduct();
                var data = _context.LenderProduct.Where(x => x.UserId == id).FirstOrDefault();

                var userData2 = await _context.LenderProduct.Where(x => x.UserId == id).Select(x => new LenderProductResponceModel()
                {
                  
                    NickName = x.NickName,
                    LoanProduct = x.LoanProduct,
                    LTVMax = x.LTVMax,
                    LTCMax = x.LTCMax,
                    CreditScoreRequirement = x.CreditScoreRequirement,
                    LiquidityRequirement = x.LiquidityRequirement,
                    AppraisalRequired = x.AppraisalRequired,
                    TypeOfAssets = x.TypeOfAssets,
                    LoanAmountRangeMin = x.LoanAmountRangeMin,
                    LoanAmountRangeMax = x.LoanAmountRangeMax,
                    InterestRate = x.InterestRate,
                    DoesLoanHavePrepaymentPenalty = x.DoesLoanHavePrepaymentPenalty,
                    TypeOfPrepaymentStructure = x.TypeOfPrepaymentStructure,
                    City = x.City,                  
                    StateId=x.StateId,
                    CreatedOn = x.CreatedOn,
                   
            }).ToListAsync();

                return userData2;
            }
            catch (Exception)
            {

                throw;
            }
        }

        /// <summary>
        /// Update the status of lending program
        /// </summary>
        /// <param name="lenderModel"></param>
        /// <returns></returns>
        public async Task<int> UpdateStatusAsync(LenderProductModel lenderModel)
        {
            try
            {
                var data = _context.LenderProduct.Where(x => x.ProductId == lenderModel.ProductId).FirstOrDefault();

                data.Status = lenderModel.Status;



                _context.LenderProduct.Update(data);
                await _context.SaveChangesAsync();
                return 200;
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// Save as a draft lender signup
        /// </summary>
        /// <param name="lenderModel"></param>
        /// <returns></returns>
        public async Task<int> SaveProgressAsync(LenderModel lenderModel)
        {
            try
            {
                var data = _context.Lender.Where(x => x.UserId == lenderModel.Id).FirstOrDefault();
                if (data == null)
                {
                    //save lender data into database
                    var lender = new Lender()
                    {
                        FirstName = lenderModel.FirstName,
                        LastName = lenderModel.LastName,
                        Email = lenderModel.Email,
                        PhoneNumber = lenderModel.PhoneNumber,
                        RoleInLendingCompany = lenderModel.RoleInLendingCompany,
                        LenderCompanyName = lenderModel.LenderCompanyName,
                        EntityType = lenderModel.EntityType,
                        LenderPhoneNo = lenderModel.LenderPhoneNo,
                        Address1 = lenderModel.Address1,
                        Address2 = lenderModel.Address2,
                        City = lenderModel.City,
                        StateId = lenderModel.StateId,
                        ZipCode = lenderModel.ZipCode,
                        Country = lenderModel.Country,
                        YearsInBusiness = lenderModel.YearsInBusiness,
                        EstimatedLoansDonePerYear = lenderModel.EstimatedLoansDonePerYear,
                        PreferredAttorneyForDocDrafting = lenderModel.PreferredAttorneyForDocDrafting,
                        PreferredAttorneyPhone = lenderModel.PreferredAttorneyPhone,
                        InterestedInServeLoansRightHereWithInReidy = lenderModel.InterestedInServeLoansRightHereWithInReidy,
                        IdentificationType = lenderModel.IdentificationType,
                        IdentificationFileName = lenderModel.IdentificationFileName,
                        IdentificationFilePath = lenderModel.IdentificationFilePath,
                        Disclosure = lenderModel.Disclosure,
                        IsSignupCompleted = lenderModel.IsSignupCompleted,
                        ProofType = lenderModel.ProofType,
                        UserId = lenderModel.Id,
                        AttorneyEmail = lenderModel.AttorneyEmail,
                    };
                    _context.Lender.Add(lender);
                    await _context.SaveChangesAsync();

                    var updateUserRole = await _userManager.FindByIdAsync(lenderModel.Id);
                    if (updateUserRole != null)
                    {
                        updateUserRole.IsLender = true;
                        updateUserRole.UpdatedDate = DateTime.Now;
                        updateUserRole.RoleType = UserRolesEnum.Lender.ToString();
                        _context.Update(updateUserRole);
                        _context.SaveChanges();
                    }

                    if (!string.IsNullOrEmpty(lenderModel.UploadLenderFileName))
                    {
                        var imgArray = lenderModel.UploadLenderFileName.Split(',');
                        var pathArray = lenderModel.UploadLenderFilePath.Split(',');
                        for (var i = 0; i < imgArray.Length - 1; i++)
                        {
                            LenderFileType fileType = LenderFileType.UploadFile;
                            var propertyImage = new ProofOfLendableFund()
                            {

                                FileName = imgArray[i],
                                FilePath = pathArray[i],
                                FileType = (int)fileType,
                                LenderId = lender.LenderId,

                            };
                            _context.ProofOfLendableFund.Add(propertyImage);
                            await _context.SaveChangesAsync();
                        }
                    }
                    if (!string.IsNullOrEmpty(lenderModel.UploadLendingLicenseName))
                    {
                        var imgArray = lenderModel.UploadLendingLicenseName.Split(',');
                        var pathArray = lenderModel.UploadLendingLicensePath.Split(',');
                        for (var i = 0; i < imgArray.Length - 1; i++)
                        {
                            LenderFileType fileType = LenderFileType.UploadLendingLicense;
                            var propertyImage = new ProofOfLendableFund()
                            {
                                FileName = imgArray[i],
                                FilePath = pathArray[i],
                                FileType = (int)fileType,
                                LenderId = lender.LenderId,

                            };
                            _context.ProofOfLendableFund.Add(propertyImage);
                            await _context.SaveChangesAsync();
                        }
                    }
                }
                else
                {
                    data.FirstName = lenderModel.FirstName;
                    data.LastName = lenderModel.LastName;
                    data.Email = lenderModel.Email;
                    data.PhoneNumber = lenderModel.PhoneNumber;
                    data.RoleInLendingCompany = lenderModel.RoleInLendingCompany;
                    data.LenderCompanyName = lenderModel.LenderCompanyName;
                    data.EntityType = lenderModel.EntityType;
                    data.LenderPhoneNo = lenderModel.LenderPhoneNo;
                    data.Address1 = lenderModel.Address1;
                    data.Address2 = lenderModel.Address2;
                    data.City = lenderModel.City;
                    data.StateId = lenderModel.StateId;
                    data.ZipCode = lenderModel.ZipCode;
                    data.Country = lenderModel.Country;
                    data.YearsInBusiness = lenderModel.YearsInBusiness;
                    data.EstimatedLoansDonePerYear = lenderModel.EstimatedLoansDonePerYear;
                    data.PreferredAttorneyForDocDrafting = lenderModel.PreferredAttorneyForDocDrafting;
                    data.PreferredAttorneyPhone = lenderModel.PreferredAttorneyPhone;
                    data.InterestedInServeLoansRightHereWithInReidy = lenderModel.InterestedInServeLoansRightHereWithInReidy;
                    data.IdentificationType = lenderModel.IdentificationType;
                    data.IdentificationFileName = lenderModel.IdentificationFileName;
                    data.IdentificationFilePath = lenderModel.IdentificationFilePath;
                    data.Disclosure = lenderModel.Disclosure;
                    data.IsSignupCompleted = lenderModel.IsSignupCompleted;
                    data.ProofType = lenderModel.ProofType;
                    data.OfficePhone = lenderModel.OfficePhone;
                    data.Title = lenderModel.Title;
                    data.AttorneyEmail = lenderModel.AttorneyEmail;
                    _context.Lender.Update(data);
                    await _context.SaveChangesAsync();

                    if (!string.IsNullOrEmpty(lenderModel.UploadLenderFileName))
                    {
                        var imgArray = lenderModel.UploadLenderFileName.Split(',');
                        var pathArray = lenderModel.UploadLenderFilePath.Split(',');
                        for (var i = 0; i < imgArray.Length - 1; i++)
                        {
                            LenderFileType fileType = LenderFileType.UploadFile;
                            var propertyImage = new ProofOfLendableFund()
                            {

                                FileName = imgArray[i],
                                FilePath = pathArray[i],
                                FileType = (int)fileType,
                                LenderId = data.LenderId,


                            };
                            _context.ProofOfLendableFund.Update(propertyImage);
                            await _context.SaveChangesAsync();
                        }
                    }
                    if (!string.IsNullOrEmpty(lenderModel.UploadLendingLicenseName))
                    {
                        var imgArray = lenderModel.UploadLendingLicenseName.Split(',');
                        var pathArray = lenderModel.UploadLendingLicensePath.Split(',');
                        for (var i = 0; i < imgArray.Length - 1; i++)
                        {
                            LenderFileType fileType = LenderFileType.UploadLendingLicense;
                            var propertyImage = new ProofOfLendableFund()
                            {
                                FileName = imgArray[i],
                                FilePath = pathArray[i],
                                FileType = (int)fileType,
                                LenderId = data.LenderId,

                            };
                            _context.ProofOfLendableFund.Update(propertyImage);
                            await _context.SaveChangesAsync();
                        }
                    }
                }
                return 200;
            }
            catch (Exception)
            {

                throw;
            }
        }

        //public LenderProductModel GetLenderProductDetailsByIDAsync(string id)
        //{
        //    LenderProductModel lenderProductObject = new LenderProductModel();
        //    try
        //    {
        //        var data = _context.LenderProduct.Where(x => x.UserId == id).FirstOrDefault();
        //        if (data != null)
        //        {

        //            lenderProductObject.ProductId = data.ProductId;
        //            lenderProductObject.Id = data.UserId;
        //            lenderProductObject.LoanProduct = data.LoanProduct;
        //            lenderProductObject.FixedOrAdjustableRate = data.FixedOrAdjustableRate;
        //            lenderProductObject.AdjustableStructureDesc = data.AdjustableStructureDesc;
        //            lenderProductObject.TermValue = data.TermValue;
        //            lenderProductObject.Amortization = data.Amortization;
        //            lenderProductObject.OtherAmortization = data.OtherAmortization;
        //            lenderProductObject.InterestRate = data.InterestRate;
        //            lenderProductObject.LoanAmountRangeMin = data.LoanAmountRangeMin;
        //            lenderProductObject.LoanAmountRangeMax = data.LoanAmountRangeMax;
        //            lenderProductObject.StateId = data.StateId;
        //            lenderProductObject.Counties = data.Counties;
        //            lenderProductObject.City = data.City;
        //            lenderProductObject.TypeOfAssets = data.TypeOfAssets;
        //            lenderProductObject.PercentOfPurchaseToLend = data.PercentOfPurchaseToLend;
        //            lenderProductObject.PercentOfRehabToLend = data.PercentOfRehabToLend;
        //            lenderProductObject.LTVMax = data.LTVMax;
        //            lenderProductObject.LTCMax = data.LTCMax;
        //            lenderProductObject.MinAcceptableDSCR = data.MinAcceptableDSCR;
        //            lenderProductObject.DoesLoanHavePrepaymentPenalty = data.DoesLoanHavePrepaymentPenalty;
        //            lenderProductObject.TypeOfPrepaymentStructure = data.TypeOfPrepaymentStructure;
        //            lenderProductObject.InspectionRequired = data.InspectionRequired;
        //            lenderProductObject.PropertyIncomeDocsRequired = data.PropertyIncomeDocsRequired;
        //            lenderProductObject.EnvironmentalRequired = data.EnvironmentalRequired;
        //            lenderProductObject.AppraisalRequired = data.AppraisalRequired;
        //            lenderProductObject.SurveyRequired = data.SurveyRequired;
        //            lenderProductObject.InsuranceLevelRequirement = data.InsuranceLevelRequirement;
        //            lenderProductObject.WillYouCollectEscrows = data.WillYouCollectEscrows;

        //        }
        //        return lenderProductObject;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw;
        //    }
        //}

        public async Task<int> UpdateLenderProfileAsync(LenderModel lenderModel)
        {
            try
            {
                var data = _context.Lender.Where(x => x.UserId == lenderModel.Id).FirstOrDefault();
                var userdata = _context.Users.Where(x => x.Id == lenderModel.Id).FirstOrDefault();


                userdata.PhoneNumber = lenderModel.PhoneNumber;

                data.PhoneNumber = lenderModel.PhoneNumber;
                data.RoleInLendingCompany = lenderModel.RoleInLendingCompany;
                data.LenderCompanyName = lenderModel.LenderCompanyName;
                data.EntityType = lenderModel.EntityType;
                data.LenderPhoneNo = lenderModel.LenderPhoneNo;
                data.Address1 = lenderModel.Address1;
                data.Address2 = lenderModel.Address2;
                data.City = lenderModel.City;
                data.StateId = lenderModel.StateId;
                data.ZipCode = lenderModel.ZipCode;

                data.YearsInBusiness = lenderModel.YearsInBusiness;
                data.EstimatedLoansDonePerYear = lenderModel.EstimatedLoansDonePerYear;
                data.PreferredAttorneyForDocDrafting = lenderModel.PreferredAttorneyForDocDrafting;
                data.PreferredAttorneyPhone = lenderModel.PreferredAttorneyPhone;
                data.InterestedInServeLoansRightHereWithInReidy = lenderModel.InterestedInServeLoansRightHereWithInReidy;
                data.IdentificationType = lenderModel.IdentificationType;
                data.IdentificationFileName = lenderModel.IdentificationFileName;
                data.IdentificationFilePath = lenderModel.IdentificationFilePath;
                data.ProofType = lenderModel.ProofType;
                data.Title = lenderModel.Title;
                data.OfficePhone = lenderModel.OfficePhone;
                data.IsSignupCompleted = lenderModel.IsSignupCompleted;

                _context.Lender.Update(data);
                _context.Users.Update(userdata);
                await _context.SaveChangesAsync();

                if (!string.IsNullOrEmpty(lenderModel.UploadLenderFileName))
                {
                    var imgArray = lenderModel.UploadLenderFileName.Split(',');
                    var pathArray = lenderModel.UploadLenderFilePath.Split(',');
                    for (var i = 0; i < imgArray.Length - 1; i++)
                    {
                        LenderFileType fileType = LenderFileType.UploadFile;
                        var TrimPath = pathArray[i].Split('\\').LastOrDefault();
                        TrimPath = "/UploadLenderFile/" + TrimPath;
                        var propertyImage = new ProofOfLendableFund()
                        {

                            FileName = imgArray[i],
                            FilePath = pathArray[i],
                            FileType = (int)fileType,
                            LenderId = data.LenderId,

                        };
                        _context.ProofOfLendableFund.Update(propertyImage);
                        await _context.SaveChangesAsync();
                    }
                }
                if (!string.IsNullOrEmpty(lenderModel.UploadLendingLicenseName))
                {
                    var imgArray = lenderModel.UploadLendingLicenseName.Split(',');
                    var pathArray = lenderModel.UploadLendingLicensePath.Split(',');
                    for (var i = 0; i < imgArray.Length - 1; i++)
                    {
                        LenderFileType fileType = LenderFileType.UploadLendingLicense;
                        var propertyImage = new ProofOfLendableFund()
                        {
                            FileName = imgArray[i],
                            FilePath = pathArray[i],
                            FileType = (int)fileType,
                            LenderId = data.LenderId,

                        };
                        _context.ProofOfLendableFund.Update(propertyImage);
                        await _context.SaveChangesAsync();
                    }
                }

                return 200;
            }
            catch (Exception)
            {

                throw;
            }
        }
        /// <summary>
        /// Get Lender product data from database
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<LenderProductModel> GetLenderProductByIdAsync(string id)
        {
            try
            {
              
                LenderProductModel res = new();
                var lender = new LenderProduct();
                var data = _context.LenderProduct.Where(x => x.UserId == id).FirstOrDefault();
                if (data != null)
                {
                    var userData2 = await _context.LenderProduct.Where(x => x.UserId == id).Select(x => new LenderProductModel()
                    {
                        ProductId = x.ProductId,
                        Id = x.UserId,
                        CreatedOn = DateTime.Now,
                        LoanProduct = x.LoanProduct,
                        FixedOrAdjustableRate = x.FixedOrAdjustableRate,
                        AdjustableStructureDesc = x.AdjustableStructureDesc,
                        TermValue = x.TermValue,
                        TermType = x.TermType,
                        Amortization = x.Amortization,
                        OtherAmortization = x.OtherAmortization,
                        InterestRate = x.InterestRate,
                        LoanAmountRangeMin = x.LoanAmountRangeMin,
                        LoanAmountRangeMax = x.LoanAmountRangeMax,
                        LenderOrigination = x.LenderOrigination,
                        LenderProgramAmount = _context.LenderProgramAmount.Where(x => x.ProductId == x.ProductId).Select(l => new LenderProgramAmountModel
                        {
                            AmountId = l.AmountId,
                            AdditionalFees = l.AdditionalFees,
                            Amount = l.Amount,
                            ProductId = l.ProductId,
                        }).ToList(),
                        StateId = x.StateId,
                        Counties = x.Counties,
                        City = x.City,
                        TypeOfAssets = x.TypeOfAssets,
                        MinMultifamilyUnit = x.MinMultifamilyUnit,
                        MaxMultifamilyUnit = x.MaxMultifamilyUnit,
                        PercentOfPurchaseToLend = x.PercentOfPurchaseToLend,
                        PercentOfRehabToLend = x.PercentOfRehabToLend,
                        LTVMax = x.LTVMax,
                        LTCMax = x.LTCMax,
                        MinAcceptableDSCR = x.MinAcceptableDSCR,
                        DoesLoanHavePrepaymentPenalty = x.DoesLoanHavePrepaymentPenalty,
                        TypeOfPrepaymentStructure = x.TypeOfPrepaymentStructure,
                        Description = x.Description,
                        InspectionRequired = x.InspectionRequired,
                        PropertyIncomeDocsRequired = x.PropertyIncomeDocsRequired,
                        EnvironmentalRequired = x.EnvironmentalRequired,
                        AppraisalRequired = x.AppraisalRequired,
                        SurveyRequired = x.SurveyRequired,
                        InsuranceLevelRequirement = x.InsuranceLevelRequirement,
                        WillYouCollectEscrows = x.WillYouCollectEscrows,
                        OtherCollectEscrows = x.OtherCollectEscrows,
                        CreditScoreRequirement = x.CreditScoreRequirement,
                        LiquidityRequirement = x.LiquidityRequirement,
                        TaxReturnRequirement = x.TaxReturnRequirement,
                        ExperienceRequirement = x.ExperienceRequirement,
                        NetWorthRequirement = x.NetWorthRequirement,
                        USCitizenshipStatusRequirement = x.USCitizenshipStatusRequirement,
                        OtherRequirementProduct = _context.OtherRequirementProduct.Where(x => x.ProductId == x.ProductId).Select(l => new OtherRequirementProductModel
                        {
                            RequirementId = l.RequirementId,
                            RequirementDesc = l.RequirementDesc,
                            ProductId = l.ProductId,
                        }).ToList(),
                        UserAgreement = x.UserAgreement,
                        TOIGeneralLiability = x.TOIGeneralLiability,
                        TOIHazard = x.TOIHazard,
                        TOIFlood = x.TOIFlood,
                        TOIWindAndHail = x.TOIWindAndHail,
                        TOIBuilderRisk = x.TOIBuilderRisk,


                    }).FirstOrDefaultAsync();
                    res = userData2;                   
                }              
                return res;
            }
            catch (Exception)
            {

                throw;
            }                          
        }

        public async Task<int> UpdateLenderProductAsync(LenderProductModel productModel)
        {
            var data = _context.LenderProduct.Where(x => x.UserId == productModel.Id).FirstOrDefault();
            if (data == null)
            {
                data.LoanProduct = productModel.LoanProduct;
                data.FixedOrAdjustableRate = productModel.FixedOrAdjustableRate;
                data.AdjustableStructureDesc = productModel.AdjustableStructureDesc;
                data.TermValue = productModel.TermValue;
                data.TermType = productModel.TermType;
                data.Amortization = productModel.Amortization;
                data.OtherAmortization = productModel.OtherAmortization;
                data.InterestRate = productModel.InterestRate;
                data.LoanAmountRangeMin = productModel.LoanAmountRangeMin;
                data.LoanAmountRangeMax = productModel.LoanAmountRangeMax;
                data.LenderOrigination = productModel.LenderOrigination;
                //data.StateId = productModel.StateId;
                //data.Counties = productModel.Counties;
                //data.City = productModel.City;
                //data.TypeOfAssets = productModel.TypeOfAssets;
                //data.MinMultifamilyUnit = productModel.MinMultifamilyUnit;
                //data.MaxMultifamilyUnit = productModel.MaxMultifamilyUnit;
                data.PercentOfPurchaseToLend = productModel.PercentOfPurchaseToLend;
                data.PercentOfRehabToLend = productModel.PercentOfRehabToLend;
                data.LTVMax = productModel.LTVMax;
                data.LTCMax = productModel.LTCMax;
                data.MinAcceptableDSCR = productModel.MinAcceptableDSCR;
                data.DoesLoanHavePrepaymentPenalty = productModel.DoesLoanHavePrepaymentPenalty;
                data.TypeOfPrepaymentStructure = productModel.TypeOfPrepaymentStructure;
                data.Description = productModel.Description;
                data.InspectionRequired = productModel.InspectionRequired;
                data.PropertyIncomeDocsRequired = productModel.PropertyIncomeDocsRequired;
                data.EnvironmentalRequired = productModel.EnvironmentalRequired;
                data.AppraisalRequired = productModel.AppraisalRequired;
                data.SurveyRequired = productModel.SurveyRequired;
                data.InsuranceLevelRequirement = productModel.InsuranceLevelRequirement;
                data.WillYouCollectEscrows = productModel.WillYouCollectEscrows;
                data.OtherCollectEscrows = productModel.OtherCollectEscrows;
                data.CreditScoreRequirement = productModel.LiquidityRequirement;
                data.LiquidityRequirement = productModel.LiquidityRequirement;
                data.TaxReturnRequirement = productModel.TaxReturnRequirement;
                data.ExperienceRequirement = productModel.ExperienceRequirement;
                data.NetWorthRequirement = productModel.NetWorthRequirement;
               // data.USCitizenshipStatusRequirement = productModel.USCitizenshipStatusRequirement;
               // data.UserAgreement = productModel.UserAgreement;
                data.TOIGeneralLiability = productModel.TOIGeneralLiability;
                data.TOIHazard = productModel.TOIHazard;
                data.TOIFlood = productModel.TOIFlood;
                data.TOIWindAndHail = productModel.TOIWindAndHail;
                data.TOIBuilderRisk = productModel.TOIBuilderRisk;
                data.IsLenderProductCompleted = productModel.IsLenderProductCompleted;

                _context.LenderProduct.Update(data);
                await _context.SaveChangesAsync();
            }
            return 200;
        }
    }
}
