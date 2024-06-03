using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using SanmorePlatform_REAL_Data.Entities;
using SanmorePlatform_REAL_Data.Entities.Buyer;
using SanmorePlatform_REAL_Data.Interface;
using SanmorePlatform_REAL_Model.ViewModels;
using SanmorePlatform_REAL_Model.ViewModels.BuyerModels;
using SanmorePlatform_REAL_Model.ViewModels.DocumentsModel;
using SanmorePlatform_REAL_Utility.Enum;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection.Emit;
using System.Runtime.Intrinsics.X86;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using static System.Collections.Specialized.BitVector32;

namespace SanmorePlatform_REAL_Data.Service
{
    public class BuyerData : IBuyerData
    {
        private readonly ApplicationDbContext _context;
        public BuyerData(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<BuyerGetViewModel> GetUserById(string id)
        {
            try
            {
                var propTypeList = _context.PropertyType.ToList();
                var data = _context.Buyer.Where(x => x.UserID == id).FirstOrDefault();

                if (data != null)
                {
                    if (data.SectionID != "tab13" && data != null)
                    {
                        var userData = await _context.Buyer.Where(x => x.UserID == id).Select(x => new BuyerGetViewModel()
                        {
                            //PropTypeList=propTypeList,
                            //PropTypeList = _context.PropertyType.Where(x => x.PropertyTypeId != 0).ToList(),
                            BuyerID = x.BuyerID,
                            FirstName = _context.Users.Where(x => x.Id == id).Select(x => x.FirstName).FirstOrDefault(),
                            LastName = _context.Users.Where(x => x.Id == id).Select(x => x.LastName).FirstOrDefault(),
                            //Email = x.Email,
                            PhoneNumber = _context.Users.Where(x => x.Id == id).Select(x => x.PhoneNumber).FirstOrDefault(),
                            SectionID = x.SectionID,
                            AddressLine1 = x.AddressLine1,
                            AddressLine2 = x.AddressLine2,
                            City = x.City,
                            StateId = x.StateId,
                            ZipCode = x.ZipCode,
                            DealsDescription = x.DealsDescription,
                            IsOtherRealEstate = x.IsOtherRealEstate,
                            Liquidity = x.Liquidity,
                            IsDueLoans = x.IsDueLoans,
                            //Collateral = x.Collateral,
                            CreatedBy = x.UserID,
                            CreatedOn = x.CreatedOn,
                            InsurancePolicyValue = x.InsurancePolicyValue,
                            IslifeInsurance = x.IslifeInsurance,
                            IsStocksOrBonds = x.IsStocksOrBonds,
                            StocksAndBondsValue = x.StocksAndBondsValue,
                            NoteValue = x.NoteValue,
                            SocialSecurityNumber = x.SocialSecurityNumber,
                            SSN1 = x.SSN1,
                            SSN2 = x.SSN2,
                            SSN3 = x.SSN3,
                            DateOfBirth = x.DateOfBirth,
                            MaritalStatusValue = x.MaritalStatusValue,
                            iSfiledtaxreturns = x.iSfiledtaxreturns,
                            AcquiringpropertyType = x.AcquiringpropertyType,
                            IsCriminalBackground = x.IsCriminalBackground,
                            OtherDetailsDescription1 = x.OtherDetailsDescription1,
                            OtherDetailsDescription2 = x.OtherDetailsDescription2,
                            CitizenshipStatus = x.CitizenshipStatus,
                            ISAccept = x.ISAccept,
                            CashOnHand = x.CashOnHand,
                            IsOwnedBusiness = x.IsOwnedBusiness,
                            IsOtherDebts = x.IsOtherDebts,
                            OwnedAutomobilesWorth = x.OwnedAutomobilesWorth,
                            DebtAutosOwned = x.DebtAutosOwned,
                            UserID = x.UserID,

                            WorkExpModel = _context.WorkExperience.Where(x => x.BuyerID == x.BuyerID).Select(b => new WoExViewModel
                            {
                                WorkExperienceID = b.WorkExperienceID,
                                CompanyName = b.CompanyName,
                                FromDate = b.FromDate,
                                ToDate = b.ToDate,
                                Description = b.Description
                            }).ToList(),

                            RealEstateVM = _context.RealEstate.Where(a => a.BuyerID == x.BuyerID).Select(c => new RealEstateViewModel
                            {
                                RealEstateID = c.RealEstateID,
                                BuyerID = c.BuyerID,
                                OtherAddressLine1 = c.OtherAddressLine1,
                                OtherAddressLine2 = c.OtherAddressLine2,
                                City = c.City,
                                State = c.State,
                                ZipCode = c.ZipCode,
                                PropertyTypeID = c.PropertyTypeID,
                                PropertyWorth = c.PropertyWorth,
                                DebtOnProperty = c.DebtOnProperty,
                                AcquiredDate = c.AcquiredDate,
                                PercentageOfOwnedProperty = c.PercentageOfOwnedProperty
                            }).ToList(),
                            LoanViewModel = _context.Loan.Where(l => l.BuyerID == x.BuyerID).Select(b => new LoanViewModel
                            {
                                LoanID = b.LoanID,
                                DescriptionsNote = b.DescriptionsNote,
                                IsCollateralized = b.IsCollateralized,
                                Collateral = b.Collateral,
                                NoteValue = b.CollateralNoteValue,
                                CollateralValue = b.CollateralValue
                            }).ToList(),
                            BusinessViewModel = _context.Business.Where(l => l.BuyerID == x.BuyerID).Select(b => new BusinessViewModel
                            {
                                BusinessID = b.BusinessID,
                                BusinessType = b.BusinessType,
                                OwnedBusinessPercentage = b.OwnedBusinessPercentage,
                                BusinessValue = b.BusinessValue
                            }).ToList(),
                            AssetsViewModel = _context.Assets.Where(l => l.BuyerID == x.BuyerID).Select(b => new AssetsViewModel
                            {
                                AssetsID = b.AssetsID,
                                OtherAssetsWorth = b.OtherAssetsWorth,
                                DebtOnAssetsOwned = b.DebtOnAssetsOwned
                            }).ToList(),
                            OtherDebtsViewModel = _context.OtherDebts.Where(l => l.BuyerID == x.BuyerID).Select(b => new OtherDebtsViewModel
                            {
                                DebtsID = b.DebtsID,
                                DebtType = b.DebtType,
                                DebtAmount = b.DebtAmount
                            }).ToList(),
                            BankDocument = _context.BankDocument.Where(x => x.BuyerID == data.BuyerID).Select(l => new BankDocumentViewModel
                            {
                                BankDocumentID = l.BankDocumentID,
                                DocumentName = l.DocumentName,
                                DocumentPath = l.DocumentPath,
                                BuyerID = l.BuyerID,
                            }).ToList(),
                            CreditReports = _context.CreditDocument.Where(x => x.BuyerID == data.BuyerID).Select(k => new CreditDocumentViewModel
                            {
                                CreditDocumentID = k.CreditDocumentID,
                                CreditReportDocName = k.CreditReportDocName,
                                CreditReportDocPath = k.CreditReportDocPath,
                                BuyerID = k.BuyerID,
                            }).ToList(),
                            PassportsList = _context.Passport.Where(x => x.BuyerID == data.BuyerID).Select(k => new PassportViewModel
                            {
                                PassportID = k.PassportID,
                                PassportName = k.PassportName,
                                PassportPath = k.PassportPath,
                                BuyerID = k.BuyerID,
                            }).ToList(),

                        }).FirstOrDefaultAsync();

                        return userData;
                    }
                    else
                    {



                        var userData = await _context.Users.Where(x => x.Id == id).Select(x => new BuyerGetViewModel()
                        {
                            UserID = x.Id,
                            FirstName = x.FirstName,
                            LastName = x.LastName,
                            PhoneNumber = x.PhoneNumber,


                        }).FirstOrDefaultAsync();
                        return userData;
                    }
                }
                else
                {
                    var userData = await _context.Users.Where(x => x.Id == id).Select(x => new BuyerGetViewModel()
                    {
                        UserID = x.Id,
                        FirstName = x.FirstName,
                        LastName = x.LastName,
                        PhoneNumber = x.PhoneNumber,


                    }).FirstOrDefaultAsync();
                    return userData;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task<int> BuyerRegistrationAsync(BuyerViewModel buyerModel)
        {
            try
            {
                var uId = buyerModel.UserID;
                var data = _context.Buyer.Where(x => x.UserID == uId).FirstOrDefault();

                if (data == null)
                {
                    //save FastTrack registration data into database
                    var buyer = new Buyer()
                    {

                        UserID = buyerModel.UserID,
                        SectionID = buyerModel.SectionID,
                        AddressLine1 = buyerModel.AddressLine1,
                        AddressLine2 = buyerModel.AddressLine2,
                        City = buyerModel.City,
                        StateId = buyerModel.StateId,
                        ZipCode = buyerModel.ZipCode,
                        DealsDescription = buyerModel.DealsDescription,
                        IsOtherRealEstate = Convert.ToBoolean(buyerModel.IsOtherRealEstate),
                        Liquidity = buyerModel.Liquidity,
                        IsDueLoans = buyerModel.IsDueLoans,
                        //DescriptionsNote = buyerModel.DescriptionsNote,
                        //IsCollateralized = Convert.ToBoolean(buyerModel.IsCollateralized),
                        //Collateral = buyerModel.Collateral,
                        CreatedBy = buyerModel.UserID,
                        CreatedOn = DateTime.Now,
                        InsurancePolicyValue = buyerModel.InsurancePolicyValue,
                        IslifeInsurance = buyerModel.IslifeInsurance,
                        IsStocksOrBonds = buyerModel.IsStocksOrBonds,
                        StocksAndBondsValue = buyerModel.StocksAndBondsValue,//=====
                        NoteValue = buyerModel.NoteValue,
                        SocialSecurityNumber = buyerModel.SocialSecurityNumber,
                        SSN1 = buyerModel.SSN1,
                        SSN2 = buyerModel.SSN2,
                        SSN3 = buyerModel.SSN3,
                        DateOfBirth = buyerModel.DateOfBirth,
                        MaritalStatusValue = buyerModel.MaritalStatusValue,
                        iSfiledtaxreturns = buyerModel.iSfiledtaxreturns,//=====
                        AcquiringpropertyType = buyerModel.AcquiringpropertyType,//======
                        IsCriminalBackground = buyerModel.IsCriminalBackground,//=======
                        OtherDetailsDescription1 = buyerModel.OtherDetailsDescription1,
                        OtherDetailsDescription2 = buyerModel.OtherDetailsDescription2,
                        CitizenshipStatus = buyerModel.CitizenshipStatus,
                        ISAccept = buyerModel.ISAccept,
                        CashOnHand = buyerModel.CashOnHand,
                        IsOwnedBusiness = buyerModel.IsOwnedBusiness,
                        IsOtherDebts = buyerModel.IsOtherDebts,
                        OwnedAutomobilesWorth = buyerModel.OwnedAutomobilesWorth,
                        DebtAutosOwned = buyerModel.DebtAutosOwned


                    };
                    try
                    {
                        _context.Buyer.Add(buyer);
                        await _context.SaveChangesAsync();
                    }
                    catch (Exception)
                    {
                        throw;
                    }

                    if (buyerModel.WorkExpModel != null)
                    {
                        var workExpData = new List<WorkExperience>();
                        foreach (var WoExModel in buyerModel.WorkExpModel)
                        {
                            if (WoExModel.CompanyName != null || WoExModel.Description != null)
                            {
                                var workExp = new WorkExperience()
                                {
                                    CompanyName = WoExModel.CompanyName,
                                    FromDate = WoExModel.FromDate,
                                    ToDate = WoExModel.ToDate,
                                    Description = WoExModel.Description,
                                    BuyerID = buyer.BuyerID,
                                    CreatedBy = buyerModel.UserID,
                                    CreatedOn = DateTime.Now


                                };
                                workExpData.Add(workExp);
                            }

                        }

                        // Add the list of WorkExperience
                        _context.WorkExperience.AddRange(workExpData);
                        await _context.SaveChangesAsync();
                    }
                    if (buyerModel.RealEstateVM != null)
                    {
                        var realEstate = new List<RealEstate>();

                        foreach (var item in buyerModel.RealEstateVM)
                        {
                            if (item.OtherAddressLine1 != null || item.City != null || item.State != "0")
                            {

                                var realEstateData = new RealEstate()
                                {
                                    OtherAddressLine1 = item.OtherAddressLine1,
                                    OtherAddressLine2 = item.OtherAddressLine2,
                                    City = item.City,
                                    State = item.State,
                                    ZipCode = item.ZipCode,
                                    PropertyTypeID = item.PropertyTypeID,
                                    PropertyWorth = item.PropertyWorth,
                                    DebtOnProperty = item.DebtOnProperty,
                                    AcquiredDate = item.AcquiredDate,
                                    PercentageOfOwnedProperty = item.PercentageOfOwnedProperty,
                                    BuyerID = buyer.BuyerID,
                                    CreatedBy = buyerModel.UserID,
                                    CreatedOn = DateTime.Now

                                };
                                realEstate.Add(realEstateData);
                            }

                        }

                        // Add the list of UnitMix to the context and save changes
                        _context.RealEstate.AddRange(realEstate);
                        await _context.SaveChangesAsync();
                    }
                    if (buyerModel.LoanViewModel != null)
                    {
                        var loanList = new List<Loan>();

                        foreach (var item in buyerModel.LoanViewModel)
                        {
                            string CollateralValue = item.CollateralValue.ToString();
                            if (item.Collateral != null)
                            {

                                var loanData = new Loan()
                                {

                                    DescriptionsNote = item.DescriptionsNote,
                                    // IsCollateralized= Convert.ToBoolean(buyerModel.IsCollateralized) == true ? 1 : 0,
                                    IsCollateralized = item.IsCollateralized,
                                    CollateralValue = item.CollateralValue,
                                    Collateral = item.Collateral,
                                    CollateralNoteValue = item.NoteValue,
                                    BuyerID = buyer.BuyerID,
                                    CreatedBy = buyerModel.UserID,
                                    CreatedOn = DateTime.Now

                                };
                                loanList.Add(loanData);
                            }


                        }
                        try
                        {
                            // Add the list of UnitMix to the context and save changes
                            _context.Loan.AddRange(loanList);
                            await _context.SaveChangesAsync();
                        }
                        catch (Exception e)
                        {
                            throw;
                        }
                    }
                    if (buyerModel.BusinessViewModel != null)
                    {
                        var businessList = new List<Business>();

                        foreach (var item in buyerModel.BusinessViewModel)
                        {
                            if (item.BusinessType != null /*|| item.BusinessValue != null*/)
                            {

                                var buisnessData = new Business()
                                {
                                    BusinessType = item.BusinessType,
                                    BusinessValue = item.BusinessValue,
                                    OwnedBusinessPercentage = item.OwnedBusinessPercentage,
                                    BuyerID = buyer.BuyerID,
                                    CreatedBy = buyerModel.UserID,
                                    CreatedOn = DateTime.Now

                                };
                                businessList.Add(buisnessData);
                            }


                        }
                        try
                        {
                            // Add the list of UnitMix to the context and save changes
                            _context.Business.AddRange(businessList);
                            await _context.SaveChangesAsync();
                        }
                        catch (Exception e)
                        {
                            throw;
                        }
                    }

                    if (buyerModel.AssetsViewModel != null)
                    {
                        var assetsList = new List<Assets>();

                        foreach (var item in buyerModel.AssetsViewModel)
                        {
                            int AssetsValue = Convert.ToInt32(item.OtherAssetsWorth);
                            if (AssetsValue != 0)
                            {

                                var assetsData = new Assets()
                                {
                                    OtherAssetsWorth = item.OtherAssetsWorth,
                                    DebtOnAssetsOwned = item.DebtOnAssetsOwned,
                                    BuyerID = buyer.BuyerID,
                                    CreatedBy = buyerModel.UserID,
                                    CreatedOn = DateTime.Now

                                };
                                assetsList.Add(assetsData);
                            }


                        }
                        try
                        {

                            _context.Assets.AddRange(assetsList);
                            await _context.SaveChangesAsync();
                        }
                        catch (Exception e)
                        {
                            throw;
                        }
                    }
                    if (buyerModel.OtherDebtsViewModel != null)
                    {
                        var otherDebtsList = new List<OtherDebts>();

                        foreach (var item in buyerModel.OtherDebtsViewModel)
                        {
                            if (item.DebtType != 0)
                            {

                                var otherDebtsData = new OtherDebts()
                                {
                                    DebtType = item.DebtType,
                                    DebtAmount = item.DebtAmount,
                                    BuyerID = buyer.BuyerID,
                                    CreatedBy = buyerModel.UserID,
                                    CreatedOn = DateTime.Now

                                };
                                otherDebtsList.Add(otherDebtsData);
                            }


                        }
                        try
                        {
                            _context.OtherDebts.AddRange(otherDebtsList);
                            await _context.SaveChangesAsync();
                        }
                        catch (Exception e)
                        {
                            throw;
                        }
                    }

                    if (!string.IsNullOrEmpty(buyerModel.DocumentName))
                    {
                        var imgArray = buyerModel.DocumentName.Split(',');
                        var pathArray = buyerModel.DocumentPath.Split(',');
                        for (var i = 0; i < imgArray.Length - 1; i++)
                        {

                            var TrimPath = pathArray[i].Split('\\').LastOrDefault();
                            TrimPath = "/BankStatementFiles/" + TrimPath;


                            var bamkDocumentImage = new BankDocument()
                            {
                                DocumentName = imgArray[i],
                                DocumentPath = TrimPath,
                                BuyerID = buyer.BuyerID,

                            };
                            try
                            {
                                _context.BankDocument.Add(bamkDocumentImage);
                                await _context.SaveChangesAsync();

                            }
                            catch (Exception e)
                            {
                                throw;
                            }
                        }
                    }
                    if (!string.IsNullOrEmpty(buyerModel.CreditReportDocName))
                    {
                        var imgArray = buyerModel.CreditReportDocName.Split(',');
                        var pathArray = buyerModel.CreditReportDocPath.Split(',');
                        for (var i = 0; i < imgArray.Length - 1; i++)
                        {
                            var TrimPath = pathArray[i].Split('\\').LastOrDefault();
                            TrimPath = "/CreditReportFiles/" + TrimPath;
                            var creditDocument = new CreditDocument()
                            {
                                CreditReportDocName = imgArray[i],
                                CreditReportDocPath = TrimPath,
                                BuyerID = buyer.BuyerID,
                                CreatedOn = DateTime.Now,

                            };
                            try
                            {
                                _context.CreditDocument.Add(creditDocument);
                                await _context.SaveChangesAsync();
                            }
                            catch (Exception e)
                            {

                                throw;
                            }

                        }
                    }
                    if (!string.IsNullOrEmpty(buyerModel.PassportName))
                    {
                        var imgArray = buyerModel.PassportName.Split(',');
                        var pathArray = buyerModel.PassportPath.Split(',');
                        for (var i = 0; i < imgArray.Length - 1; i++)
                        {
                            var TrimPath = pathArray[i].Split('\\').LastOrDefault();
                            TrimPath = "/IDsPassportFiles/" + TrimPath;
                            var iDsDocument = new Passport()
                            {
                                PassportName = imgArray[i],
                                PassportPath = TrimPath,
                                BuyerID = buyer.BuyerID,
                                //CreatedOn = DateTime.Now,

                            };
                            try
                            {
                                _context.Passport.Add(iDsDocument);
                                await _context.SaveChangesAsync();
                            }
                            catch (Exception e)
                            {

                                throw;
                            }

                        }
                    }
                }
                else
                {
                    data.SectionID = buyerModel.SectionID;
                    data.AddressLine1 = buyerModel.AddressLine1;
                    data.AddressLine2 = buyerModel.AddressLine2;
                    data.City = buyerModel.City;
                    data.StateId = buyerModel.StateId;
                    data.ZipCode = buyerModel.ZipCode;
                    data.DealsDescription = buyerModel.DealsDescription;
                    data.IsOtherRealEstate = Convert.ToBoolean(buyerModel.IsOtherRealEstate);
                    data.Liquidity = buyerModel.Liquidity;
                    data.IsDueLoans = buyerModel.IsDueLoans;
                    //data.DescriptionsNote = buyerModel.DescriptionsNote,
                    //data.IsCollateralized = Convert.ToBoolean(buyerModel.IsCollateralized),
                    //data.Collateral = buyerModel.Collateral;
                    //data.CreatedBy = buyerModel.UserID;
                    //data.CreatedOn = DateTime.Now;
                    data.ModifiedBy = buyerModel.UserID;
                    data.ModifiedOn = DateTime.Now;
                    data.InsurancePolicyValue = buyerModel.InsurancePolicyValue;
                    data.IslifeInsurance = buyerModel.IslifeInsurance;
                    data.IsStocksOrBonds = buyerModel.IsStocksOrBonds;
                    data.StocksAndBondsValue = buyerModel.StocksAndBondsValue;
                    data.NoteValue = buyerModel.NoteValue;
                    data.SocialSecurityNumber = buyerModel.SocialSecurityNumber;
                    data.SSN1 = buyerModel.SSN1;
                    data.SSN2 = buyerModel.SSN2;
                    data.SSN3 = buyerModel.SSN3;
                    data.DateOfBirth = buyerModel.DateOfBirth;
                    data.MaritalStatusValue = buyerModel.MaritalStatusValue;
                    data.iSfiledtaxreturns = buyerModel.iSfiledtaxreturns;
                    data.AcquiringpropertyType = buyerModel.AcquiringpropertyType;
                    data.IsCriminalBackground = buyerModel.IsCriminalBackground;
                    data.OtherDetailsDescription1 = buyerModel.OtherDetailsDescription1;
                    data.OtherDetailsDescription2 = buyerModel.OtherDetailsDescription2;
                    data.CitizenshipStatus = buyerModel.CitizenshipStatus;
                    data.ISAccept = buyerModel.ISAccept;
                    data.CashOnHand = buyerModel.CashOnHand;
                    data.IsOwnedBusiness = buyerModel.IsOwnedBusiness;
                    data.IsOtherDebts = buyerModel.IsOtherDebts;
                    data.OwnedAutomobilesWorth = buyerModel.OwnedAutomobilesWorth;
                    data.DebtAutosOwned = buyerModel.DebtAutosOwned;
                    _context.Buyer.Update(data);
                    await _context.SaveChangesAsync();

                    if (!object.Equals(buyerModel.DeleteWorkExperience, null))
                    {
                        foreach (var item in buyerModel.DeleteWorkExperience)
                        {
                            WorkExperience? DeleteWorkExperience = _context.WorkExperience.Where(x => x.WorkExperienceID == item).FirstOrDefault();
                            if (!object.Equals(DeleteWorkExperience, null))
                            {
                                _context.WorkExperience.Remove(DeleteWorkExperience);
                                _context.SaveChanges();
                            }
                        }
                    }
                    if (!object.Equals(buyerModel.DeleteRealEstate, null))
                    {
                        foreach (var item in buyerModel.DeleteRealEstate)
                        {
                            RealEstate? DeleteRealEstate = _context.RealEstate.Where(x => x.RealEstateID == item).FirstOrDefault();
                            if (!object.Equals(DeleteRealEstate, null))
                            {
                                _context.RealEstate.Remove(DeleteRealEstate);
                                _context.SaveChanges();
                            }
                        }
                    }
                    if (!object.Equals(buyerModel.DeleteLoanAndNote, null))
                    {
                        foreach (var item in buyerModel.DeleteLoanAndNote)
                        {
                            Loan? DeleteLoanAndNote = _context.Loan.Where(x => x.LoanID == item).FirstOrDefault();
                            if (!object.Equals(DeleteLoanAndNote, null))
                            {
                                _context.Loan.Remove(DeleteLoanAndNote);
                                _context.SaveChanges();
                            }
                        }
                    }
                    if (!object.Equals(buyerModel.DeleteBuisnessOwned, null))
                    {
                        foreach (var item in buyerModel.DeleteBuisnessOwned)
                        {
                            Business? DeleteBusiness = _context.Business.Where(x => x.BusinessID == item).FirstOrDefault();
                            if (!object.Equals(DeleteBusiness, null))
                            {
                                _context.Business.Remove(DeleteBusiness);
                                _context.SaveChanges();
                            }
                        }
                    }
                    if (!object.Equals(buyerModel.DeleteAssets, null))
                    {
                        foreach (var items in buyerModel.DeleteAssets)
                        {
                            try
                            {

                                var DeleteAssets = _context.Assets.Where(x => x.AssetsID == items).FirstOrDefault();

                                if (!object.Equals(DeleteAssets, null))
                                {
                                    _context.Assets.Remove(DeleteAssets);
                                    _context.SaveChanges();
                                }
                            }
                            catch (Exception)
                            {

                                throw;
                            }
                        }

                    }
                    if (!object.Equals(buyerModel.DeleteOtherDebts, null))
                    {
                        foreach (var item in buyerModel.DeleteOtherDebts)
                        {
                            OtherDebts? DeleteOtherDebts = _context.OtherDebts.Where(x => x.DebtsID == item).FirstOrDefault();
                            if (!object.Equals(DeleteOtherDebts, null))
                            {
                                _context.OtherDebts.Remove(DeleteOtherDebts);
                                _context.SaveChanges();
                            }
                        }
                    }
                    if (!object.Equals(buyerModel.DeleteBankDocuments, null))
                    {
                        foreach (var bankDocumentId in buyerModel.DeleteBankDocuments)
                        {
                            BankDocument? DeleteBankDocument = _context.BankDocument.Where(x => x.BankDocumentID == bankDocumentId).FirstOrDefault();
                            if (!object.Equals(DeleteBankDocument, null))
                            {
                                _context.BankDocument.Remove(DeleteBankDocument);
                                _context.SaveChanges();
                            }
                        }
                    }
                    if (!object.Equals(buyerModel.DeleteCreditDocuments, null))
                    {
                        foreach (var CreditDocumentId in buyerModel.DeleteCreditDocuments)
                        {
                            CreditDocument? DeleteCreditDocument = _context.CreditDocument.Where(x => x.CreditDocumentID == CreditDocumentId).FirstOrDefault();
                            if (!object.Equals(DeleteCreditDocument, null))
                            {
                                _context.CreditDocument.Remove(DeleteCreditDocument);
                                _context.SaveChanges();
                            }
                        }
                    }
                    if (!object.Equals(buyerModel.DeletePassportDocuments, null))
                    {
                        foreach (var PassportDocumentId in buyerModel.DeletePassportDocuments)
                        {
                            Passport? DeletePassportDocument = _context.Passport.Where(x => x.PassportID == PassportDocumentId).FirstOrDefault();
                            if (!object.Equals(DeletePassportDocument, null))
                            {
                                _context.Passport.Remove(DeletePassportDocument);
                                _context.SaveChanges();
                            }
                        }
                    }

                    if (buyerModel.WorkExpModel != null)
                    {
                        foreach (var WoExModel in buyerModel.WorkExpModel)
                        {
                            if (WoExModel.CompanyName != null || WoExModel.Description != null)
                            {
                                var WorkExperienceAllList = _context.WorkExperience.Where(x => x.BuyerID == data.BuyerID).ToList();

                                var existingWorkExp = _context.WorkExperience.FirstOrDefault(w => w.BuyerID == data.BuyerID && w.WorkExperienceID == WoExModel.WorkExperienceID);
                                if (existingWorkExp != null)
                                {
                                    // Update existing record
                                    try
                                    {
                                        existingWorkExp.CompanyName = WoExModel.CompanyName;
                                        existingWorkExp.FromDate = WoExModel.FromDate;
                                        existingWorkExp.ToDate = WoExModel.ToDate;
                                        existingWorkExp.Description = WoExModel.Description;
                                        existingWorkExp.ModifiedBy = buyerModel.UserID;
                                        existingWorkExp.ModifiedOn = DateTime.Now;
                                        _context.WorkExperience.Update(existingWorkExp);
                                        await _context.SaveChangesAsync();
                                    }
                                    catch (Exception)
                                    {

                                        throw;
                                    }

                                }
                                else
                                {
                                    // Create new record
                                    var workExpData = new List<WorkExperience>();
                                    var newWorkExp = new WorkExperience()
                                    {
                                        CompanyName = WoExModel.CompanyName,
                                        FromDate = WoExModel.FromDate,
                                        ToDate = WoExModel.ToDate,
                                        Description = WoExModel.Description,
                                        BuyerID = data.BuyerID,
                                        CreatedBy = buyerModel.UserID,
                                        CreatedOn = DateTime.Now
                                    };
                                    try
                                    {
                                        workExpData.Add(newWorkExp);
                                        _context.WorkExperience.AddRange(workExpData);
                                        await _context.SaveChangesAsync();
                                    }
                                    catch (Exception)
                                    {

                                        throw;
                                    }

                                }
                            }
                        }
                    }


                    if (buyerModel.RealEstateVM != null)
                    {

                        foreach (var item in buyerModel.RealEstateVM)
                        {
                            if (item.OtherAddressLine1 != null || item.City != null || item.State != "0")
                            {
                                var existingRealEstate = _context.RealEstate.FirstOrDefault(w => w.BuyerID == data.BuyerID && w.RealEstateID == item.RealEstateID);
                                if (existingRealEstate != null)
                                {
                                    // Update existing record
                                    try
                                    {
                                        existingRealEstate.OtherAddressLine1 = item.OtherAddressLine1;
                                        existingRealEstate.OtherAddressLine2 = item.OtherAddressLine2;
                                        existingRealEstate.City = item.City;
                                        existingRealEstate.State = item.State;
                                        existingRealEstate.ZipCode = item.ZipCode;
                                        existingRealEstate.PropertyTypeID = item.PropertyTypeID;
                                        existingRealEstate.PropertyWorth = item.PropertyWorth;
                                        existingRealEstate.DebtOnProperty = item.DebtOnProperty;
                                        existingRealEstate.AcquiredDate = item.AcquiredDate;
                                        existingRealEstate.PercentageOfOwnedProperty = item.PercentageOfOwnedProperty;

                                        _context.RealEstate.Update(existingRealEstate);
                                        await _context.SaveChangesAsync();
                                    }
                                    catch (Exception)
                                    {

                                        throw;
                                    }

                                }
                                else
                                {
                                    var realEstateDataList = new List<RealEstate>();
                                    var realEstateData = new RealEstate()
                                    {
                                        OtherAddressLine1 = item.OtherAddressLine1,
                                        OtherAddressLine2 = item.OtherAddressLine2,
                                        City = item.City,
                                        State = item.State,
                                        ZipCode = item.ZipCode,
                                        PropertyTypeID = item.PropertyTypeID,
                                        PropertyWorth = item.PropertyWorth,
                                        DebtOnProperty = item.DebtOnProperty,
                                        AcquiredDate = item.AcquiredDate,
                                        PercentageOfOwnedProperty = item.PercentageOfOwnedProperty,
                                        BuyerID = data.BuyerID,
                                        CreatedBy = buyerModel.UserID,
                                        CreatedOn = DateTime.Now
                                    };
                                    try
                                    {
                                        realEstateDataList.Add(realEstateData);
                                        _context.RealEstate.AddRange(realEstateDataList);
                                        await _context.SaveChangesAsync();
                                    }
                                    catch (Exception)
                                    {

                                        throw;
                                    }

                                }

                            }
                        }

                    }
                    if (buyerModel.LoanViewModel != null)
                    {
                        //var loanList = new List<Loan>();

                        foreach (var item in buyerModel.LoanViewModel)
                        {
                            string CollateralValue = item.CollateralValue.ToString();
                            if (item.Collateral != null)
                            {
                                var existingLoan = _context.Loan.FirstOrDefault(w => w.BuyerID == data.BuyerID && w.LoanID == item.LoanID);

                                if (!object.Equals(existingLoan, null))
                                {
                                    try
                                    {
                                        existingLoan.DescriptionsNote = item.DescriptionsNote;
                                        existingLoan.IsCollateralized = item.IsCollateralized;
                                        existingLoan.CollateralValue = item.CollateralValue;
                                        existingLoan.Collateral = item.Collateral;
                                        existingLoan.CollateralNoteValue = item.NoteValue;
                                        existingLoan.BuyerID = data.BuyerID;
                                        //existingLoan.CreatedBy = buyerModel.CreatedBy;
                                        //existingLoan.CreatedOn = DateTime.Now;
                                        _context.Loan.Update(existingLoan);
                                        await _context.SaveChangesAsync();
                                    }
                                    catch (Exception)
                                    {

                                        throw;
                                    }
                                }
                                else
                                {
                                    // Create new record
                                    var loanList = new List<Loan>();
                                    var loanData = new Loan()
                                    {
                                        DescriptionsNote = item.DescriptionsNote,
                                        // IsCollateralized= Convert.ToBoolean(buyerModel.IsCollateralized) == true ? 1 : 0,
                                        IsCollateralized = item.IsCollateralized,
                                        CollateralValue = item.CollateralValue,
                                        Collateral = item.Collateral,
                                        CollateralNoteValue = item.NoteValue,
                                        BuyerID = data.BuyerID,
                                        CreatedBy = buyerModel.UserID,
                                        CreatedOn = DateTime.Now
                                    };
                                    try
                                    {
                                        loanList.Add(loanData);
                                        _context.Loan.AddRange(loanList);
                                        await _context.SaveChangesAsync();
                                    }
                                    catch (Exception)
                                    {

                                        throw;
                                    }
                                }
                            }
                        }
                    }
                    if (buyerModel.BusinessViewModel != null)
                    {
                        foreach (var item in buyerModel.BusinessViewModel)
                        {
                            if (item.BusinessType != null)
                            {
                                var existingBusinessId = _context.Business.FirstOrDefault(w => w.BuyerID == data.BuyerID && w.BusinessID == item.BusinessID);

                                if (!object.Equals(existingBusinessId, null))
                                {
                                    try
                                    {
                                        existingBusinessId.BusinessType = item.BusinessType;
                                        existingBusinessId.BusinessValue = item.BusinessValue;
                                        existingBusinessId.OwnedBusinessPercentage = item.OwnedBusinessPercentage;
                                        existingBusinessId.BuyerID = data.BuyerID;
                                        _context.Business.Update(existingBusinessId);
                                        await _context.SaveChangesAsync();
                                    }
                                    catch (Exception)
                                    {

                                        throw;
                                    }
                                }
                                else
                                {
                                    // Create new record
                                    var businessDataList = new List<Business>();
                                    var businessData = new Business()
                                    {
                                        BusinessType = item.BusinessType,
                                        BusinessValue = item.BusinessValue,
                                        OwnedBusinessPercentage = item.OwnedBusinessPercentage,
                                        BuyerID = data.BuyerID,
                                        CreatedBy = buyerModel.UserID,
                                        CreatedOn = DateTime.Now
                                    };
                                    try
                                    {
                                        businessDataList.Add(businessData);
                                        _context.Business.AddRange(businessDataList);
                                        await _context.SaveChangesAsync();
                                    }
                                    catch (Exception)
                                    {

                                        throw;
                                    }

                                }
                            }

                        }
                    }

                    if (buyerModel.AssetsViewModel != null)
                    {
                        foreach (var item in buyerModel.AssetsViewModel)
                        {
                            int AssetsValue = Convert.ToInt32(item.OtherAssetsWorth);
                            if (AssetsValue != 0)
                            {
                                var existingAssetsId = _context.Assets.FirstOrDefault(w => w.BuyerID == data.BuyerID && w.AssetsID == item.AssetsID);

                                if (!object.Equals(existingAssetsId, null))
                                {
                                    try
                                    {
                                        existingAssetsId.OtherAssetsWorth = item.OtherAssetsWorth;
                                        existingAssetsId.DebtOnAssetsOwned = item.DebtOnAssetsOwned;
                                        existingAssetsId.BuyerID = data.BuyerID;

                                        _context.Assets.Update(existingAssetsId);
                                        await _context.SaveChangesAsync();
                                    }
                                    catch (Exception)
                                    {

                                        throw;
                                    }
                                }
                                else
                                {
                                    // Create new record
                                    var assetsDataList = new List<Assets>();
                                    var assetsData = new Assets()
                                    {
                                        OtherAssetsWorth = item.OtherAssetsWorth,
                                        DebtOnAssetsOwned = item.DebtOnAssetsOwned,
                                        BuyerID = data.BuyerID,
                                        CreatedBy = buyerModel.UserID,
                                        CreatedOn = DateTime.Now
                                    };
                                    try
                                    {
                                        assetsDataList.Add(assetsData);
                                        _context.Assets.AddRange(assetsDataList);
                                        await _context.SaveChangesAsync();
                                    }
                                    catch (Exception)
                                    {
                                        throw;
                                    }
                                }
                            }
                        }
                    }
                    if (buyerModel.OtherDebtsViewModel != null)
                    {
                        foreach (var item in buyerModel.OtherDebtsViewModel)
                        {
                            if (item.DebtType != 0)
                            {
                                var existingOtherDebtsId = _context.OtherDebts.FirstOrDefault(w => w.BuyerID == data.BuyerID && w.DebtsID == item.DebtsID);

                                if (!object.Equals(existingOtherDebtsId, null))
                                {
                                    try
                                    {
                                        existingOtherDebtsId.DebtType = item.DebtType;
                                        existingOtherDebtsId.DebtAmount = item.DebtAmount;


                                        _context.OtherDebts.Update(existingOtherDebtsId);
                                        await _context.SaveChangesAsync();
                                    }
                                    catch (Exception)
                                    {

                                        throw;
                                    }
                                }
                                else
                                {
                                    // Create new record
                                    var otherDebtsDataList = new List<OtherDebts>();
                                    var otherDebtsData = new OtherDebts()
                                    {
                                        DebtType = item.DebtType,
                                        DebtAmount = item.DebtAmount,
                                        BuyerID = data.BuyerID,
                                        CreatedBy = buyerModel.UserID,
                                        CreatedOn = DateTime.Now
                                    };
                                    try
                                    {
                                        otherDebtsDataList.Add(otherDebtsData);
                                        _context.OtherDebts.AddRange(otherDebtsDataList);
                                        await _context.SaveChangesAsync();
                                    }
                                    catch (Exception)
                                    {

                                        throw;
                                    }

                                }
                            }

                        }

                    }

                    if (!string.IsNullOrEmpty(buyerModel.DocumentName))
                    {
                        var imgArray = buyerModel.DocumentName.Split(',');
                        var pathArray = buyerModel.DocumentPath.Split(',');
                        for (var i = 0; i < imgArray.Length - 1; i++)
                        {

                            var TrimPath = pathArray[i].Split('\\').LastOrDefault();
                            TrimPath = "/BankStatementFiles/" + TrimPath;


                            var bamkDocumentImage = new BankDocument()
                            {
                                DocumentName = imgArray[i],
                                DocumentPath = TrimPath,
                                BuyerID = data.BuyerID,

                            };
                            try
                            {
                                _context.BankDocument.Add(bamkDocumentImage);
                                await _context.SaveChangesAsync();

                            }
                            catch (Exception e)
                            {
                                throw;
                            }
                        }
                    }
                    if (!string.IsNullOrEmpty(buyerModel.CreditReportDocName))
                    {
                        var imgArray = buyerModel.CreditReportDocName.Split(',');
                        var pathArray = buyerModel.CreditReportDocPath.Split(',');
                        for (var i = 0; i < imgArray.Length - 1; i++)
                        {
                            var TrimPath = pathArray[i].Split('\\').LastOrDefault();
                            TrimPath = "/CreditReportFiles/" + TrimPath;
                            var creditDocument = new CreditDocument()
                            {
                                CreditReportDocName = imgArray[i],
                                CreditReportDocPath = TrimPath,
                                BuyerID = data.BuyerID,
                                CreatedOn = DateTime.Now,

                            };
                            try
                            {
                                _context.CreditDocument.Add(creditDocument);
                                await _context.SaveChangesAsync();
                            }
                            catch (Exception e)
                            {
                                throw;
                            }

                        }
                    }
                    if (!string.IsNullOrEmpty(buyerModel.PassportName))
                    {
                        var imgArray = buyerModel.PassportName.Split(',');
                        var pathArray = buyerModel.PassportPath.Split(',');
                        for (var i = 0; i < imgArray.Length - 1; i++)
                        {
                            var TrimPath = pathArray[i].Split('\\').LastOrDefault();
                            TrimPath = "/IDsPassportFiles/" + TrimPath;
                            var iDsDocument = new Passport()
                            {
                                PassportName = imgArray[i],
                                PassportPath = TrimPath,
                                BuyerID = data.BuyerID,
                                //CreatedOn = DateTime.Now,

                            };
                            try
                            {
                                _context.Passport.Add(iDsDocument);
                                await _context.SaveChangesAsync();
                            }
                            catch (Exception e)
                            {

                                throw;
                            }

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

        public async Task<List<PropertyStateViewModel>> GetPropertyStateListAsync()
        {
            List<PropertyStateViewModel> propertystateList = await _context.State.Select(x => new PropertyStateViewModel
            {
                StateId = x.StateId,
                ShortName = x.ShortName,
                LongName = x.LongName,
            }).ToListAsync();
            return propertystateList;
        }
    }
}
