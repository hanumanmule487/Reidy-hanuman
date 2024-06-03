using Microsoft.EntityFrameworkCore;
using SanmorePlatform_REAL_Data;
using SanmorePlatform_REAL_Data.Entities;
using SanmorePlatform_REAL_Data.Entities.Buyer;
using SanmorePlatform_REAL_Data.Interface;
using SanmorePlatform_REAL_Model.ViewModels;
using SanmorePlatform_REAL_Model.ViewModels.DocumentsModel;
using SanmorePlatform_REAL_Service.Interface;
using SanmorePlatform_REAL_Utility.Enum;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace SanmorePlatform_REAL_Service.Services
{
    public class PropertyService : IPropertyService
    {
        private readonly IPropertyData _repository;
        private readonly ApplicationDbContext _context;
        public PropertyService(IPropertyData repository, ApplicationDbContext context)
        {
            _context = context;
            _repository = repository;
        }
        public async Task<int> AddPropertyAsync(FileUploadModel propertyModel)
        {
            return await _repository.AddPropertyAsync(propertyModel);
        }
        public async Task<int> SaveSearchValueAsync(PropertyFilterModel filterModel)
        {
            return await _repository.SaveSearchValueAsync(filterModel);
        }
        public async Task<List<SearchKeyViewModel>> GetSaveSearchesListAsync(string id)
        {
            var propertyList = await _repository.GetSaveSearchesListAsync(id);
            return propertyList;
        }
        public async Task<SearchKeyViewModel> GetSaveSearchByIdAsync(int propertyId)
        {
            return await _repository.GetSaveSearchByIdAsync(propertyId);
        }
        public async Task<PropertyViewModel> GetPropertyByIdAsync(int propertyId)
        {
            return await _repository.GetPropertyByIdAsync(propertyId);
        }
        public async Task<List<Sp_GetPropertyListModel>> GetPropertyListAsync(PropertyFilterModel filterModel)
        {
            List<Sp_GetPropertyListModel> FilterPropertyList = new();
            List<Sp_GetPropertyListModel> DouDiligenslist = new List<Sp_GetPropertyListModel>();

            var propertyListt = await _repository.GetPropertyListAsync(filterModel);



            if (!string.IsNullOrEmpty(filterModel.DueDiligenceValue))
            {
                if (filterModel.DueDiligenceValue != null)
                {
                    string[]? ddlDocument = filterModel.DueDiligenceValue.Split(',');
                    int[] DueDiligence = ddlDocument.Select(int.Parse).ToArray();

                    List<int> DiligenceValue = new();
                    DiligenceValue.AddRange(DueDiligence);

                    var result = _context.DueDiligenceDocument.Where(obj => DiligenceValue.Contains(obj.FileType)).GroupBy(obj => obj.PropertyId)
                        .Where(group => group.Select(g => g.FileType).Distinct().Count() == DiligenceValue.Count)
                        .Select(group => group.Key);

                    foreach (var item in result)
                    {
                        Console.WriteLine(item);
                        var AllList = propertyListt.Where(x => x.PropertyId == item).Select(x => new Sp_GetPropertyListModel
                        {
                            PropertyId = x.PropertyId,
                            Description = x.Description,
                            Latitude = x.Latitude,

                            TargetPrice = x.TargetPrice,
                            ImageName = x.ImageName,
                            Status = x.Status,
                            IsActive = x.IsActive,
                            RelationshipToProperty = x.RelationshipToProperty,
                            Address1 = x.Address1,
                            Address2 = x.Address2,
                            City = x.City,
                            Title = x.Title,
                            //StateId = x.StateId,
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
                            WillOccupantStayAfterSale = x.WillOccupantStayAfterSale,
                            Construction = x.Construction,
                            Elevators = x.Elevators,
                            ParkingCount = x.ParkingCount,
                            Governance = x.Governance,
                            DeliveryBays = x.DeliveryBays,
                            Highlights = x.Highlights,
                            AcceptUserAgreement = x.AcceptUserAgreement,
                            PropertyTypeId = x.PropertyTypeId,
                            Longitude = x.Longitude,

                        }).FirstOrDefault();
                        DouDiligenslist.Add(AllList);
                    }
                    propertyListt = DouDiligenslist.ToList();

                }

            }

            foreach (var property in propertyListt)
            {

                decimal T_price;
                decimal SquareFoot;
                decimal DollarePerValue;
                decimal? MinPrice;
                decimal? MaxPrice;

                if ((filterModel.MinPrice == null && filterModel.MaxPrice == null) && (filterModel.UnitCategory == 1 || filterModel.UnitCategory == 2 || filterModel.UnitCategory == 3 || filterModel.UnitCategory == 4))
                {
                    return propertyListt;
                }

                else if (filterModel.MinPrice != null && filterModel.MaxPrice != null)
                {
                    if (filterModel.UnitCategory == 1)
                    {
                        var propertyList = propertyListt.Where(x => x.TargetPrice >= Convert.ToDecimal(filterModel.MinPrice)).Where(x => x.TargetPrice <= Convert.ToDecimal(filterModel.MaxPrice)).ToList();
                        propertyListt = propertyList.ToList();
                        return propertyList;
                    }
                    else if (filterModel.UnitCategory == 2)
                    {
                        T_price = property.TargetPrice;
                        SquareFoot = property.BuiltSquareFootage;
                        DollarePerValue = T_price / SquareFoot;
                        MinPrice = Convert.ToDecimal(filterModel.MinPrice);
                        MaxPrice = Convert.ToDecimal(filterModel.MaxPrice);

                        if (MinPrice <= DollarePerValue && DollarePerValue <= MaxPrice)
                        {
                            FilterPropertyList.Add(property);
                        }

                    }
                    else if (filterModel.UnitCategory == 3)
                    {
                        T_price = property.TargetPrice;
                        SquareFoot = property.BuiltSquareFootage;
                        DollarePerValue = T_price / SquareFoot;

                        decimal? OneAcre = 43560;// One Acre=43560 SF
                        decimal? PerAcre = DollarePerValue * OneAcre;

                        MinPrice = Convert.ToDecimal(filterModel.MinPrice);
                        MaxPrice = Convert.ToDecimal(filterModel.MaxPrice);
                        if (MinPrice <= PerAcre && PerAcre <= MaxPrice/* && property.BuiltSquareFootage>=OneAcre*/)
                        {
                            FilterPropertyList.Add(property);
                        }
                    }
                    else if (filterModel.UnitCategory == 4)
                    {
                        T_price = property.TargetPrice;
                        var Unit = property.Units;
                        DollarePerValue = T_price / Unit;

                        MinPrice = Convert.ToDecimal(filterModel.MinPrice);
                        MaxPrice = Convert.ToDecimal(filterModel.MaxPrice);
                        if (MinPrice <= DollarePerValue && DollarePerValue <= MaxPrice)
                        {
                            FilterPropertyList.Add(property);
                        }
                    }

                }

                else if ((filterModel.MinPrice != null && filterModel.MaxPrice == null) || (filterModel.MinPrice == null && filterModel.MaxPrice != null) && (filterModel.UnitCategory == 1 || filterModel.UnitCategory == 2 || filterModel.UnitCategory == 3 || filterModel.UnitCategory == 4))
                {
                    if (filterModel.UnitCategory == 1)
                    {
                        if (filterModel.MinPrice != null)
                        {
                            var propertyList1 = propertyListt.Where(x => x.TargetPrice >= Convert.ToDecimal(filterModel.MinPrice)).ToList();
                            propertyListt = propertyList1.ToList();
                            return propertyListt;
                        }
                        else if (filterModel.MaxPrice != null)
                        {
                            var propertyList1 = propertyListt.Where(x => x.TargetPrice <= Convert.ToDecimal(filterModel.MaxPrice)).ToList();
                            propertyListt = propertyList1.ToList();
                            return propertyList1;
                        }
                        //propertyListt = propertyList1.ToList();
                        //return propertyList1;
                    }
                    else if (filterModel.UnitCategory == 2)
                    {
                        T_price = property.TargetPrice;
                        SquareFoot = property.BuiltSquareFootage;
                        DollarePerValue = T_price / SquareFoot;
                        MinPrice = Convert.ToDecimal(filterModel.MinPrice);
                        MaxPrice = Convert.ToDecimal(filterModel.MaxPrice);
                        if (filterModel.MinPrice != null)
                        {
                            if (MinPrice <= DollarePerValue)
                            {
                                FilterPropertyList.Add(property);
                            }
                        }
                        else if (filterModel.MaxPrice != null)
                        {

                            if (DollarePerValue <= MaxPrice)
                            {
                                FilterPropertyList.Add(property);
                            }
                        }

                    }
                    else if (filterModel.UnitCategory == 3)
                    {
                        T_price = property.TargetPrice;
                        SquareFoot = property.BuiltSquareFootage;
                        DollarePerValue = T_price / SquareFoot;

                        decimal? OneAcre = 43560;// One Acre=43560 SF
                        decimal? PerAcre = DollarePerValue * OneAcre;

                        MinPrice = Convert.ToDecimal(filterModel.MinPrice);
                        MaxPrice = Convert.ToDecimal(filterModel.MaxPrice);


                        if (filterModel.MinPrice != null)
                        {
                            if (MinPrice <= PerAcre)
                            {
                                FilterPropertyList.Add(property);
                            }
                        }
                        else if (filterModel.MaxPrice != null)
                        {

                            if (PerAcre <= MaxPrice)
                            {
                                FilterPropertyList.Add(property);
                            }
                        }
                    }
                    else if (filterModel.UnitCategory == 4)
                    {
                        T_price = property.TargetPrice;
                        var Unit = property.Units;
                        DollarePerValue = T_price / Unit;

                        MinPrice = Convert.ToDecimal(filterModel.MinPrice);
                        MaxPrice = Convert.ToDecimal(filterModel.MaxPrice);

                        if (filterModel.MinPrice != null)
                        {
                            if (MinPrice <= DollarePerValue)
                            {
                                FilterPropertyList.Add(property);
                            }
                        }
                        else if (filterModel.MaxPrice != null)
                        {
                            if (DollarePerValue <= MaxPrice)
                            {
                                FilterPropertyList.Add(property);
                            }
                        }

                    }

                }

                else
                {
                    return propertyListt;
                }
            }
            return FilterPropertyList;
        }
        public async Task<List<PropertyNameTypeModel>> GetPropertyTypeListAsync()
        {
            var propertyTypeList = await _repository.GetPropertyTypeListAsync();
            return propertyTypeList;
        }
        public async Task<List<PropertyStateViewModel>> GetPropertyStateListAsync()
        {
            var propertyStateList = await _repository.GetPropertyStateListAsync();
            return propertyStateList;
        }
        public async Task<OfferContractReqModel> GetDataOfferContractForm(int propertyId)
        {
            OfferContractReqModel res = new();
            try
            {
                string isDocAvlable = "0";
                var isDoc = await _context.DueDiligenceDocument.Where(x => x.PropertyId == propertyId).FirstOrDefaultAsync();
                var data = await _context.Property.Where(x => x.PropertyId == propertyId).FirstOrDefaultAsync();
                if (isDoc != null)
                {
                    isDocAvlable = data.DueDiligencePeriodAvailableDays.ToString();
                }
                if (data != null)
                {
                    //res.PurchasePrice = $"${data.TargetPrice:n0}";
                    res.PurchasePrice = data.TargetPrice;
                    res.DueDiligencePeriod = isDocAvlable;
                    res.PropertyId = propertyId;
                }
                return res;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task<OfferContractReqModel> SaveOfferContractInfo(OfferContractReqModel model)
        {
            OfferContractReqModel response = new();
            OfferContract data = new();
            try
            {
                data.NameOfBuyingEntity = model.NameOfBuyingEntity;
                data.PhoneNumber = model.PhoneNumber;
                data.Address1 = model.Address1;
                data.Address2 = model.Address2;
                data.City = model.City;
                data.State = model.State;
                data.ZipCode = model.ZipCode;
                data.Country = model.Country;
                data.PurchasePrice = model.PurchasePrice;
                data.DueDiligencePeriod = model.DueDiligencePeriod;
                data.ClosingDate = model.ClosingDate;
                data.LoanExitStrategy = "4";
                data.RefiLenderName = model.RefiLenderName;
                data.Other = "test";
                data.ProofOfFundsFile = model.ProofOfFundsFile;
                data.UserId = model.UserId;
                data.PropertyId = model.PropertyId;

                await _context.tblOfferContract.AddAsync(data);
                await _context.SaveChangesAsync();
                return response;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
