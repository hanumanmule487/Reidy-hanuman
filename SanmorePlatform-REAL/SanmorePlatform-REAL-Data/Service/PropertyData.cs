using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using SanmorePlatform_REAL_Data.Entities;
using SanmorePlatform_REAL_Data.Entities.Buyer;
using SanmorePlatform_REAL_Data.Interface;
using SanmorePlatform_REAL_Model.ViewModels;
using SanmorePlatform_REAL_Model.ViewModels.DocumentsModel;
using SanmorePlatform_REAL_Utility.Enum;
using System;
using System.Diagnostics;
using System.Reflection.Emit;
using System.Security.Cryptography;

namespace SanmorePlatform_REAL_Data.Service
{
    public class PropertyData : IPropertyData
    {
        private readonly ApplicationDbContext _context;
        public PropertyData(ApplicationDbContext context)
        {
            _context = context;
        }


        /// <summary>
        /// Add property 
        /// </summary>
        /// <param name="propertyModel"></param>
        /// <returns></returns>
        /// 
        public async Task<int> AddPropertyAsync(FileUploadModel propertyModel)
        {

            //save property data into database
            var property = new Property()
            {
                UserId = propertyModel.UserId,
                CreatedOn = DateTime.Now,
                RelationshipToProperty = propertyModel.RelationshipToProperty,
                TargetPrice = propertyModel.TargetPrice,
                OriginalTargetPrice=propertyModel.OriginalTargetPrice,
                Address1 = propertyModel.Address1,
                Address2 = propertyModel.Address2,
                City = propertyModel.City,
                StateId = propertyModel.StateId,
                ZipCode = propertyModel.ZipCode,
                BuildingStatus = propertyModel.BuildingStatus,
                BuildingCount = propertyModel.BuildingCount,
                Units = propertyModel.Units,
                BuiltSquareFootage = propertyModel.BuiltSquareFootage,
                Floors = propertyModel.Floors,
                YearBuilt = propertyModel.YearBuilt,
                YearRenovated = propertyModel.YearRenovated,
                LandArea = propertyModel.LandArea,
                Occupancy = propertyModel.Occupancy,
                WillOccupantStayAfterSale = propertyModel.WillOccupantStayAfterSale,
                AcceptUserAgreement = propertyModel.AcceptUserAgreement,
                Construction = propertyModel.Construction,
                Elevators = propertyModel.Elevators,
                ParkingCount = propertyModel.ParkingCount,
                Governance = propertyModel.Governance,
                OtherGovernance = propertyModel.OtherGovernance,
                DeliveryBays = propertyModel.DeliveryBays,
                Highlights = propertyModel.Highlights,
                IdentificationVarificationId = propertyModel.IdentificationVarificationId,
                IdentificationFileName = propertyModel.IdentificationFileName,
                IdentificationFilePath = propertyModel.IdentificationFilePath,
                PropertyTypeId = propertyModel.PropertyTypeId,
                IsActive = propertyModel.IsActive,
                Status = propertyModel.Status,
                Latitude = propertyModel.Latitude,
                Longitude = propertyModel.Longitude,
                //Title = propertyModel.Title,
                Description = propertyModel.Description,
                IsSellerfinancing = propertyModel.IsSellerfinancing,
                DownPaymentNeeded = propertyModel.DownPaymentNeeded,
                InterestBeingOffered = propertyModel.InterestBeingOffered,
                TermOfLoanYear = propertyModel.TermOfLoanYear,
                TermOfLoanMonth = propertyModel.TermOfLoanMonth,
                Amortized = propertyModel.Amortized,
                IsthisaSubjecttoAssumption = propertyModel.IsthisaSubjecttoAssumption,
                CashToCloseNeeded = propertyModel.CashToCloseNeeded,
                MortgageBalance = propertyModel.MortgageBalance,
                MonthlyPaymentBeingAssumed = propertyModel.MonthlyPaymentBeingAssumed,
                EscrowsIncludedInMonthlyPayment = propertyModel.EscrowsIncludedInMonthlyPayment,
                TermLeftOnMortgageYear = propertyModel.TermLeftOnMortgageYear,
                TermLeftOnMortgageMonth = propertyModel.TermLeftOnMortgageMonth,
                AmortizationOfMortgage = propertyModel.AmortizationOfMortgage,
                DueDiligencePeriodAvailableDays = propertyModel.DueDiligencePeriodAvailableDays,
                //Add Residential Property field into propertyModel  
                ResidentialBuildingStatus = propertyModel.ResidentialBuildingStatus,
                ResidentialRenovated = propertyModel.ResidentialRenovated,
                ResidentialAfterRepairValue = propertyModel.ResidentialAfterRepairValue,
                ResidentialBedrooms = propertyModel.ResidentialBedrooms,
                ResidentialBathrooms = propertyModel.ResidentialBathrooms,
                ResidentialBuiltSquareFootage = propertyModel.ResidentialBuiltSquareFootage,
                ResidentialLotSizeSquareFootage = propertyModel.ResidentialLotSizeSquareFootage,
                ResidentialBuiltYear = propertyModel.ResidentialBuiltYear,
                ResidentialRenovatedYear = propertyModel.ResidentialRenovatedYear,
                ResidentialParking = propertyModel.ResidentialParking,
                ResidentialParkingSpace = propertyModel.ResidentialParkingSpace,
                ResidentialOccupancy = propertyModel.ResidentialOccupancy,
                ResidentialWillOccupancyStayAfterSale = propertyModel.ResidentialWillOccupancyStayAfterSale,
                KeyFeature1 = propertyModel.KeyFeature1,
                KeyFeature2 = propertyModel.KeyFeature2,
                KeyFeature3 = propertyModel.KeyFeature3,
                KeyFeature4 = propertyModel.KeyFeature4,
                //Add Land Details Section fields in to database or Property table
                LandSquareFootage = propertyModel.LandSquareFootage,
                LandSquareFootageUnit = propertyModel.LandSquareFootageUnit,
                LotStatus = propertyModel.LotStatus,
                LotUse = propertyModel.LotUse,
                Electric = propertyModel.Electric,
                Gas = propertyModel.Gas,
                Water = propertyModel.Water,
                OpenToPartneringWithBuilders = propertyModel.OpenToPartneringWithBuilders,
                SurveyAvailable = propertyModel.SurveyAvailable,
                EnvironmentalAvailable = propertyModel.EnvironmentalAvailable,

            };
            try
            {
                _context.Property.Add(property);
                await _context.SaveChangesAsync();
            }
            catch (Exception)
            {
                throw;
            }


            if (!string.IsNullOrEmpty(propertyModel.ImageName))
            {
                var imgArray = propertyModel.ImageName.Split(',');
                var pathArray = propertyModel.ImagePath.Split(',');
                for (var i = 0; i < imgArray.Length - 1; i++)
                {
                    var propertyImage = new PropertyImage()
                    {
                        ImageName = imgArray[i],
                        ImagePath = pathArray[i],
                        PropertyId = property.PropertyId,
                    };
                    _context.PropertyImage.Add(propertyImage);
                    await _context.SaveChangesAsync();
                }
            }

            if (propertyModel.VideoPath != null)
            {
                var imgArray = propertyModel.VideoName.Split(',');
                var pathArray = propertyModel.VideoPath.Split(',');
                for (var i = 0; i < imgArray.Length - 1; i++)
                {
                    var propertyImage = new PropertyVideo()
                    {
                        VideoName = imgArray[i],
                        VideoPath = pathArray[i],
                        PropertyId = property.PropertyId,
                    };
                    _context.PropertyVideo.Add(propertyImage);
                    await _context.SaveChangesAsync();
                }
            }


            if (propertyModel.AppraisalFileName != null)
            {
                var imgArray = propertyModel.AppraisalFileName.Split(',');
                var pathArray = propertyModel.AppraisalFilePath.Split(',');
                for (var i = 0; i <= imgArray.Length - 2; i++)
                {
                    FileType fileType = FileType.Appraisal;

                    var inspectionImage = new DueDiligenceDocument()
                    {
                        FileName = imgArray[i],
                        FilePath = pathArray[i],
                        FileType = (int)fileType,
                        PropertyId = property.PropertyId,
                    };
                    _context.DueDiligenceDocument.Add(inspectionImage);
                    await _context.SaveChangesAsync();
                }
            }

            if (propertyModel.InspectionFileName != null)
            {
                var imgArray = propertyModel.InspectionFileName.Split(',');
                var pathArray = propertyModel.InspectionFilePath.Split(',');
                for (var i = 0; i <= imgArray.Length - 2; i++)
                {
                    FileType fileType = FileType.Inspection;

                    var inspectionImage = new DueDiligenceDocument()
                    {
                        FileName = imgArray[i],
                        FilePath = pathArray[i],
                        FileType = (int)fileType,
                        PropertyId = property.PropertyId,
                    };
                    _context.DueDiligenceDocument.Add(inspectionImage);
                    await _context.SaveChangesAsync();
                }
            }

            if (propertyModel.SurveyFileName != null)
            {
                var imgArray = propertyModel.SurveyFileName.Split(',');
                var pathArray = propertyModel.SurveyFilePath.Split(',');
                for (var i = 0; i < imgArray.Length - 1; i++)
                {
                    FileType fileType = FileType.Survey;
                    var surveyImage = new DueDiligenceDocument()
                    {
                        FileName = imgArray[i],
                        FilePath = pathArray[i],
                        FileType = (int)fileType,
                        PropertyId = property.PropertyId,
                    };
                    _context.DueDiligenceDocument.Add(surveyImage);
                    await _context.SaveChangesAsync();
                }
            }

            if (propertyModel.EnvironmentalFileName != null)
            {
                var imgArray = propertyModel.EnvironmentalFileName.Split(',');
                var pathArray = propertyModel.EnvironmentalFilePath.Split(',');
                for (var i = 0; i < imgArray.Length - 1; i++)
                {
                    FileType fileType = FileType.Environmental;
                    var environmentalImage = new DueDiligenceDocument()
                    {
                        FileName = imgArray[i],
                        FilePath = pathArray[i],
                        FileType = (int)fileType,
                        PropertyId = property.PropertyId,
                    };
                    _context.DueDiligenceDocument.Add(environmentalImage);
                    await _context.SaveChangesAsync();
                }
            }

            //// Create a list to hold UnitMix entities
            if (propertyModel.UnitMix != null)
            {
                var unitMixdata = new List<UnitMix>();
                foreach (var unitMixModel in propertyModel.UnitMix)
                {
                    if (unitMixModel.Beds != 0 || unitMixModel.Units != 0 || unitMixModel.Baths != 0 || unitMixModel.UnitArea != 0 || unitMixModel.AskingRent != 0)
                    {
                        var unitMix = new UnitMix()
                        {
                            Beds = unitMixModel.Beds,
                            Units = unitMixModel.Units,
                            Baths = unitMixModel.Baths,
                            UnitArea = unitMixModel.UnitArea,
                            AskingRent = unitMixModel.AskingRent,
                            PropertyId = property.PropertyId  // Assuming there's a foreign key relationship between UnitMix and Property
                        };
                        unitMixdata.Add(unitMix);
                    }
                }

                // Add the list of UnitMix to the context and save changes
                _context.UnitMix.AddRange(unitMixdata);
                await _context.SaveChangesAsync();
            }

            if (propertyModel.Link != null)
            {
                //// Create a list to hold UnitMix entities
                var links = new List<Link>();
                foreach (var linkModel in propertyModel.Link)
                {
                    if (linkModel.LinkName != null)
                    {
                        var unitMix = new Link()
                        {
                            LinkName = linkModel.LinkName,
                            PropertyId = property.PropertyId
                        };
                        // Add each unitMix to the list
                        links.Add(unitMix);
                    }
                }
                // Add the list of Link to the context and save changes
                _context.Link.AddRange(links);
                await _context.SaveChangesAsync();
            }

            return property.PropertyId;
        }

        public async Task<int> SaveSearchValueAsync(PropertyFilterModel filterModel)
        {

            //save property data into database
            var searchKey = new SearchKey()
            {
                UserId = filterModel.UserId,
                Status = filterModel.Status,
                City = filterModel.City,
                StateId = filterModel.StateId,
                //MaxYearBuilt = filterModel.MaxYearBuilt,
                //MinYearBuilt = filterModel.MinYearBuilt,
                FromfundToClose = filterModel.FromfundToClose,
                TofundToClose = filterModel.TofundToClose,
                ZipCode = filterModel.ZipCode,
                BuildingMinSF = filterModel.BuildingMinSF,
                BuildingMaxSF = filterModel.BuildingMaxSF,
                LandMinAcres = filterModel.LandMinAcres,
                LandMaxAcres = filterModel.LandMaxAcres,
                UnitBedsMin = filterModel.UnitBedsMin,
                UnitBedsMax = filterModel.UnitBedsMax,
                Keyword = filterModel.Keyword,
                EnteredDate = filterModel.EnteredDate,
                ReidyId = filterModel.ReidyId,
                YearBuiltMin = filterModel.YearBuiltMin,
                YearBuiltMax = filterModel.YearBuiltMax,
                PropertyTypeList = filterModel.PropertyTypeList,
                PropertKeyword = filterModel.PropertKeyword,
                RegionName = filterModel.RegionName,
                StartDate = filterModel.StartDate,
                EndDate = filterModel.EndDate,
                SearchName = filterModel.SearchName,
                MaxPrice = filterModel.MaxPrice,
                MinPrice = filterModel.MinPrice,
                DueDiligenceValue = filterModel.DueDiligenceValue,
                IsAppraisal = filterModel.IsAppraisal,
                IsSurvey = filterModel.IsSurvey,
                IsEnvironmental = filterModel.IsEnvironmental,
                IsInspection = filterModel.IsInspection,
                IsTotalPrice = filterModel.IsTotalPrice,
                IsPriceSF = filterModel.IsPriceSF,
                IsPriceAcr = filterModel.IsPriceAcr,
                IsPriceUnit = filterModel.IsPriceUnit,
                IsBuildingSF = filterModel.IsBuildingSF,
                IsBuildingSM = filterModel.IsBuildingSM,
                IsLandAcre=filterModel.IsLandAcre,
                IsLandSF = filterModel.IsLandSF,
                IsLandHectares = filterModel.IsLandHectares,
                IsLandMS = filterModel.IsLandMS,
                CreatedOn = DateTime.Now,
                CreatedBy = filterModel.UserId,
                //ModifiedBy = filterModel.UserId,
                //ModifiedOn = DateTime.Now,


            };
            try
            {
                _context.SearchKey.Add(searchKey);
                await _context.SaveChangesAsync();
            }
            catch (Exception)
            {
                throw;
            }
            return searchKey.SearchId;
        }

        public async Task<List<SearchKeyViewModel>> GetSaveSearchesListAsync(string id)
        {

            List<SearchKeyViewModel> searchKeys = null;
            try
            {

                searchKeys = _context.SearchKey.Where(x => x.UserId == id).Select(x => new SearchKeyViewModel
                {
                    UserId = x.UserId,
                    SearchId = x.SearchId,
                    Status = x.Status,
                    City = x.City,
                    //MaxYearBuilt = x.MaxYearBuilt,
                    //MinYearBuilt = x.MinYearBuilt,
                    FromfundToClose = x.FromfundToClose,
                    TofundToClose = x.TofundToClose,
                    ZipCode = x.ZipCode,
                    BuildingMinSF = x.BuildingMinSF,
                    BuildingMaxSF = x.BuildingMaxSF,
                    LandMinAcres = x.LandMinAcres,
                    LandMaxAcres = x.LandMaxAcres,
                    UnitBedsMin = x.UnitBedsMin,
                    UnitBedsMax = x.UnitBedsMax,
                    Keyword = x.Keyword,
                    EnteredDate = x.EnteredDate,
                    ReidyId = x.ReidyId,
                    YearBuiltMin = x.YearBuiltMin,
                    YearBuiltMax = x.YearBuiltMax,
                    PropertyTypeList = x.PropertyTypeList,
                    PropertKeyword = x.PropertKeyword,
                    RegionName = x.RegionName,
                    StartDate = x.StartDate,
                    EndDate = x.EndDate,
                    SearchName = x.SearchName,
                    DueDiligenceValue = x.DueDiligenceValue,
                    IsAppraisal = x.IsAppraisal,
                    IsSurvey = x.IsSurvey,
                    IsEnvironmental = x.IsEnvironmental,
                    IsInspection = x.IsInspection,
                    IsTotalPrice = x.IsTotalPrice,
                    IsPriceSF = x.IsPriceSF,
                    IsPriceAcr = x.IsPriceAcr,
                    IsPriceUnit = x.IsPriceUnit,
                    IsBuildingSF = x.IsBuildingSF,
                    IsBuildingSM = x.IsBuildingSM,
                    CreatedBy = x.CreatedBy,
                    CreatedOn = x.CreatedOn.Date,
                    ModifiedBy = x.ModifiedBy,
                    ModifiedOn = x.ModifiedOn,
                    //Title= Address1 + ', ' + City + ', ' + State + ' ' + ZipCode;
                    //ModifiedOn = Convert.ToDateTime(x.ModifiedOn.ToString("dd-MM-yyyy")),
                }).ToList();

                foreach (var item in searchKeys)
                {
                    string[] propertytypeArray = item.PropertyTypeList.Split(',');
                    int propertytypeArrayLength = propertytypeArray.Length;
                    for (int propertyTypeId = 0; propertyTypeId < propertytypeArrayLength; propertyTypeId++)
                    {
                     string propertyName = _context.PropertyType.Where(pt => pt.PropertyTypeId ==  Convert.ToInt32(propertytypeArray[propertyTypeId])).Select(pt => pt.PropertyTypeName).FirstOrDefault();
                        item.PropTypeNames += propertyName +", ";
                    }
                }
            }
            catch
            {
                throw;
            }
            return searchKeys;
        }
        public async Task<SearchKeyViewModel> GetSaveSearchByIdAsync(int id)
        {
            string? state = (from prop in _context.Property
                             join st in _context.State on prop.StateId equals st.StateId
                             where (prop.PropertyId == id)
                             select st.LongName).FirstOrDefault();

            string? propertyTypeName = (from prop in _context.Property
                                        join pt in _context.PropertyType on prop.PropertyTypeId equals pt.PropertyTypeId
                                        where (prop.PropertyId == id)
                                        select pt.PropertyTypeName).FirstOrDefault();

            var searchList = await _context.SearchKey.Where(x => x.SearchId == id).Select(x => new SearchKeyViewModel()
            {
                UserId = x.UserId,
                SearchId = x.SearchId,
                Status = x.Status,
                City = x.City,
                //MaxYearBuilt = x.MaxYearBuilt,
                //MinYearBuilt = x.MinYearBuilt,
                FromfundToClose = x.FromfundToClose,
                TofundToClose = x.TofundToClose,
                ZipCode = x.ZipCode,
                BuildingMinSF = x.BuildingMinSF,
                BuildingMaxSF = x.BuildingMaxSF,
                LandMinAcres = x.LandMinAcres,
                LandMaxAcres = x.LandMaxAcres,
                UnitBedsMin = x.UnitBedsMin,
                UnitBedsMax = x.UnitBedsMax,
                Keyword = x.Keyword,
                EnteredDate = x.EnteredDate,
                ReidyId = x.ReidyId,
                YearBuiltMin = x.YearBuiltMin,
                YearBuiltMax = x.YearBuiltMax,
                PropertyTypeList = x.PropertyTypeList,
                PropertKeyword = x.PropertKeyword,
                RegionName = x.RegionName,
                StartDate = x.StartDate,
                EndDate = x.EndDate,
                SearchName = x.SearchName,
                DueDiligenceValue = x.DueDiligenceValue,
                IsAppraisal = x.IsAppraisal,
                IsSurvey = x.IsSurvey,
                IsEnvironmental = x.IsEnvironmental,
                IsInspection = x.IsInspection,
                IsTotalPrice = x.IsTotalPrice,
                IsPriceSF = x.IsPriceSF,
                IsPriceAcr = x.IsPriceAcr,
                IsPriceUnit = x.IsPriceUnit,
                IsBuildingSF = x.IsBuildingSF,
                IsBuildingSM = x.IsBuildingSM,
                CreatedBy = x.CreatedBy,
                CreatedOn = x.CreatedOn.Date,
                ModifiedBy = x.ModifiedBy,
                ModifiedOn = x.ModifiedOn,



            }).FirstOrDefaultAsync();
            return searchList;
        }


        /// <summary>
        /// GetPropertyByIdAsync Method 
        /// </summary>
        /// <param name="propertyId"></param>
        /// <returns></returns>
        public async Task<PropertyViewModel> GetPropertyByIdAsync(int propertyId)
        {
            string? state = (from prop in _context.Property
                             join st in _context.State on prop.StateId equals st.StateId
                             where (prop.PropertyId == propertyId)
                             select st.LongName).FirstOrDefault();

            string? propertyTypeName = (from prop in _context.Property
                                        join pt in _context.PropertyType on prop.PropertyTypeId equals pt.PropertyTypeId
                                        where (prop.PropertyId == propertyId)
                                        select pt.PropertyTypeName).FirstOrDefault();

            var propertyList = await _context.Property.Where(x => x.PropertyId == propertyId).Select(x => new PropertyViewModel()
            {
                PropertyId = x.PropertyId,
                RelationshipToProperty = x.RelationshipToProperty,
                TargetPrice = x.TargetPrice,
                Address1 = x.Address1,
                Address2 = x.Address2,
                City = x.City,
                StateId = x.StateId,
                State = state,
                ZipCode = x.ZipCode,
                BuildingStatus = x.BuildingStatus,
                BuildingCount = x.BuildingCount,
                Units = x.Units,
                BuiltSquareFootage = x.BuiltSquareFootage,
                Floors = x.Floors,
                YearBuilt = x.YearBuilt,
                YearRenovated = x.YearRenovated,
                LandArea = x.LandArea,
                Occupancy = x.Occupancy,
                Construction = x.Construction,
                Elevators = x.Elevators,
                ParkingCount = x.ParkingCount,
                Governance = x.Governance,
                DeliveryBays = x.DeliveryBays,
                Highlights = x.Highlights,
                AcceptUserAgreement = x.AcceptUserAgreement,
                PropertyTypeId = x.PropertyTypeId,
                PropertyTypeName = propertyTypeName,
                IsActive = x.IsActive,
                Status = x.Status,
                Latitude = x.Latitude,
                Longitude = x.Longitude,
                Title = propertyTypeName + " in " + _context.Property.Where(x => x.PropertyId == propertyId).Select(x => x.City).FirstOrDefault() + " and " + state,
                Description = x.Description,
                PropertyImages = _context.PropertyImage.Where(x => x.PropertyId == propertyId).Select(l => new PropertyImageViewModel
                {
                    PropertyImageId = l.PropertyImageId,
                    ImageName = l.ImageName,
                    ImagePath = l.ImagePath,
                    PropertyId = l.PropertyId,
                }).ToList(),
                DueDiligenceDocuments = _context.DueDiligenceDocument.Where(x => x.PropertyId == propertyId).Select(l => new DueDiligenceDocumentsModel
                {
                    DueDiligenceDocumentId = l.DueDiligenceDocumentId,
                    FileName = l.FileName,
                    FilePath = l.FilePath,
                    FileType = l.FileType,
                    PropertyId = l.PropertyId,
                }).ToList(),
                PropertyVideo = _context.PropertyVideo.Where(x => x.PropertyId == propertyId).Select(l => new PropertyVideoViewModel
                {
                    PropertyVideoId = l.PropertyVideoId,
                    VideoName = l.VideoName,
                    VideoPath = l.VideoPath,
                    PropertyId = l.PropertyId,
                }).ToList(),
                KeyFeature1 = x.KeyFeature1,
                KeyFeature2 = x.KeyFeature2,
                KeyFeature3 = x.KeyFeature3,
                KeyFeature4 = x.KeyFeature4,



            }).FirstOrDefaultAsync();
            return propertyList;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="filterModel"></param>
        /// <returns></returns>
        public async Task<List<Sp_GetPropertyListModel>> GetPropertyListAsync(PropertyFilterModel filterModel)
        {
            try
            {
                if (filterModel.StartDate != null)
                {
                    filterModel.StartDate = Convert.ToDateTime(filterModel.StartDate).ToString("yyyy-MM-dd");
                }
                if (filterModel.EndDate != null)
                {
                    filterModel.EndDate = Convert.ToDateTime(filterModel.EndDate).ToString("yyyy-MM-dd");
                }

                if (filterModel.BuildingMinSF == "0")
                {
                    filterModel.BuildingMinSF = null;
                }
                if (filterModel.BuildingMaxSF == "0")
                {
                    filterModel.BuildingMaxSF = null;
                }
                if (filterModel.LandMinAcres == "0")
                {
                    filterModel.LandMinAcres = null;
                }
                if (filterModel.LandMaxAcres == "0")
                {
                    filterModel.LandMaxAcres = null;
                }
                if (filterModel.PropertyTypeList == null || filterModel.PropertyTypeList == "")
                {
                    filterModel.PropertyTypeList = null;
                }
                if (filterModel.PropertKeyword == "0")
                {
                    filterModel.PropertKeyword = null;
                }
                if (filterModel.EnteredDate == "0")
                {
                    filterModel.EnteredDate = null;
                }
                if (filterModel.FromfundToClose == "0" || filterModel.FromfundToClose == "NaN")
                {
                    filterModel.FromfundToClose = null;
                }
                if (filterModel.TofundToClose == "0" || filterModel.TofundToClose == "NaN")
                {
                    filterModel.TofundToClose = null;
                }
                if (filterModel.RegionName == "0")
                {
                    filterModel.RegionName = null;
                }

                var parameter1 = new SqlParameter("@status", (object?)filterModel.Status ?? DBNull.Value);//0
                var parameter2 = new SqlParameter("@City", (object?)filterModel.City ?? DBNull.Value);
                var parameter3 = new SqlParameter("@maxYearBuilt", (object?)filterModel.MaxYearBuilt ?? DBNull.Value);
                var parameter4 = new SqlParameter("@minYearBuilt", (object?)filterModel.MinYearBuilt ?? DBNull.Value);
                var parameter5 = new SqlParameter("@FromfundToClose", (object?)filterModel.FromfundToClose ?? DBNull.Value);
                var parameter6 = new SqlParameter("@TofundToClose", (object?)filterModel.TofundToClose ?? DBNull.Value);
                var parameter7 = new SqlParameter("@ZipCode", (object?)filterModel.ZipCode ?? DBNull.Value);
                var parameter8 = new SqlParameter("@BuildingMinSF", (object?)filterModel.BuildingMinSF ?? DBNull.Value);
                var parameter9 = new SqlParameter("@BuildingMaxSF", (object?)filterModel.BuildingMaxSF ?? DBNull.Value);
                var parameter10 = new SqlParameter("@LandMinAcres", (object?)filterModel.LandMinAcres ?? DBNull.Value);
                var parameter11 = new SqlParameter("@LandMaxAcres", (object?)filterModel.LandMaxAcres ?? DBNull.Value);
                var parameter12 = new SqlParameter("@UnitBedsMin", (object?)filterModel.UnitBedsMin ?? DBNull.Value);
                var parameter13 = new SqlParameter("@UnitBedsMax", (object?)filterModel.UnitBedsMax ?? DBNull.Value);
                var parameter14 = new SqlParameter("@Keyword", (object?)filterModel.Keyword ?? DBNull.Value);
                var parameter15 = new SqlParameter("@EnteredDate", (object?)filterModel.EnteredDate ?? DBNull.Value);
                var parameter16 = new SqlParameter("@ReidyId", (object?)filterModel.ReidyId ?? DBNull.Value);
                var parameter17 = new SqlParameter("@YearBuiltMin", (object?)filterModel.YearBuiltMin ?? DBNull.Value);
                var parameter18 = new SqlParameter("@YearBuiltMax", (object?)filterModel.YearBuiltMax ?? DBNull.Value);
                var parameter19 = new SqlParameter("@PropertyTypeList", (object?)filterModel.PropertyTypeList ?? DBNull.Value);
                var parameter20 = new SqlParameter("@PropertyKeyword", (object?)filterModel.PropertKeyword ?? DBNull.Value);
                var parameter21 = new SqlParameter("@RegionName", (object?)filterModel.RegionName ?? DBNull.Value);
                var parameter22 = new SqlParameter("@FromDate", (object?)filterModel.StartDate ?? DBNull.Value);
                var parameter23 = new SqlParameter("@ToDate", (object?)filterModel.EndDate ?? DBNull.Value);



                var AllReports = await _context.Sp_GetPropertyList.FromSqlRaw($"exec Sp_GetPropertyList @status, @City,@maxYearBuilt,@minYearBuilt,@FromfundToClose,@TofundToClose,@ZipCode,@BuildingMinSF,@BuildingMaxSF,@LandMinAcres,@LandMaxAcres,@UnitBedsMin,@UnitBedsMax,@Keyword,@EnteredDate,@ReidyId,@YearBuiltMin,@YearBuiltMax,@PropertyTypeList,@PropertyKeyword,@RegionName,@FromDate,@ToDate",
                    parameter1, parameter2, parameter3, parameter4, parameter5, parameter6, parameter7, parameter8, parameter9, parameter10, parameter11, parameter12, parameter13, parameter14, parameter15, parameter16, parameter17, parameter18, parameter19, parameter20, parameter21, parameter22, parameter23).ToListAsync();

                //Filter the Property List if area drawn on Map
                decimal dec = 0.0M;

                if (!(decimal.Equals(filterModel.MaxLat, dec) && decimal.Equals(filterModel.MinLat, dec) && decimal.Equals(filterModel.MaxLng, dec) && decimal.Equals(filterModel.MinLng, dec)))
                {
                    AllReports = (List<Sp_GetPropertyListModel>)(from c in AllReports
                                                                 where Convert.ToDecimal(c.Latitude) > filterModel.MinLat &&
                                                                       Convert.ToDecimal(c.Latitude) < filterModel.MaxLat &&
                                                                       Convert.ToDecimal(c.Longitude) > filterModel.MinLng &&
                                                                       Convert.ToDecimal(c.Longitude) < filterModel.MaxLng
                                                                 select c).ToList();

                }

                string? path;
                if (AllReports.Count != 0)
                {
                    foreach (var report in AllReports)
                    {
                        path = _context.PropertyImage.Where(q => q.PropertyId == report.PropertyId).Select(x => x.ImagePath).FirstOrDefault();


                        if (path != null)
                        {
                            char[] charsToTrim = { '\\' };

                            var TrimPath = path.Split('\\').LastOrDefault();
                            report.ImageName = TrimPath;
                        }
                        if (path == null || path == "")
                        {
                            report.ImageName = "no-imge-1.jpg";
                        }


                    }
                }

                return AllReports;
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// </summary>
        /// <returns></returns>
        public async Task<List<PropertyNameTypeModel>> GetPropertyTypeListAsync()
        {
            List<PropertyNameTypeModel> propertyTypeList = await _context.PropertyType.Select(x => new PropertyNameTypeModel
            {
                PropertyTypeId = x.PropertyTypeId,
                PropertyTypeName = x.PropertyTypeName,

            }).ToListAsync();
            return propertyTypeList;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
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
