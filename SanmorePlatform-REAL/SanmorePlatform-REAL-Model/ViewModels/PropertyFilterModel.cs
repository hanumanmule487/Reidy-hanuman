using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanmorePlatform_REAL_Model.ViewModels
{
    public class PropertyFilterModel
    {

        public PropertyFilterModel()
        {
            //empty
        }


            public PropertyFilterModel(PropertyFilterModel model)
        {
            this.UserId = model.UserId;
            this.Status = model.Status;
            this.City = model.City;
            this.MaxYearBuilt = model.MaxYearBuilt;
            this.MinYearBuilt = model.MinYearBuilt;
            this.BuiltMaxSF = model.BuiltMaxSF;
            this.BuiltMinSF = model.BuiltMinSF;
            this.FromfundToClose = model.FromfundToClose;
            this.TofundToClose = model.TofundToClose;
            this.PropertKeyword = model.PropertKeyword;
            this.ZipCode = model.ZipCode;
            this.MinPrice = model.MinPrice;
            this.MaxPrice = model.MaxPrice;
            this.BuildingMinSF = model.BuildingMinSF;
            this.BuildingMaxSF = model.BuildingMaxSF;
            this.LandMinAcres = model.LandMinAcres;
            this.LandMaxAcres = model.LandMaxAcres;
            this.UnitBedsMin = model.UnitBedsMin;
            this.UnitBedsMax = model.UnitBedsMax;
            this.YearBuiltMin = model.YearBuiltMin;
            this.YearBuiltMax = model.YearBuiltMax;
            this.Keyword = model.Keyword;
            this.EnteredDate = model.EnteredDate;
            this.StartDate = model.StartDate;
            this.EndDate = model.EndDate;
            this.ReidyId = model.ReidyId;
            this.PropertyTypeList = model.PropertyTypeList;
            this.RegionName = model.RegionName;
            this.UnitCategory = model.UnitCategory;
            this.DueDiligenceValue = model.DueDiligenceValue;
            this.MinLat = model.MinLat;
            this.MinLng = model.MinLng;
            this.MaxLat = model.MaxLat;
            this.MaxLng = model.MaxLng;
            this.SearchName = model.SearchName;
            this.StateId = model.StateId;
            this.IsAppraisal = model.IsAppraisal;
            this.IsSurvey = model.IsSurvey;
            this.IsEnvironmental = model.IsEnvironmental;
            this.IsInspection = model.IsInspection;
            this.IsTotalPrice = model.IsTotalPrice;
            this.IsPriceSF = model.IsPriceSF;
            this.IsPriceAcr = model.IsPriceAcr;
            this.IsPriceUnit = model.IsPriceUnit;
            this.IsBuildingSF = model.IsBuildingSF;
            this.IsBuildingSM = model.IsBuildingSM;
            this.IsLandAcre = model.IsLandAcre;
            this.IsLandSF = model.IsLandSF;
            this.IsLandHectares = model.IsLandHectares;
            this.IsLandMS = model.IsLandMS;

        }



        //status,  city,  maxTargetPrice,  minTargetPrice,  maxYearBuilt,  minYearBuilt,  propertyTypeName
        public string? UserId { get; set; }
        public string? Status { get; set; }
        public string? City { get; set; }
        public string? MaxYearBuilt { get; set; }
        public string? MinYearBuilt { get; set; }
        public int? BuiltMaxSF { get; set; }
        public int? BuiltMinSF { get; set; }
        public string? FromfundToClose { get; set; }
        public string? TofundToClose { get; set; }
        public string? PropertKeyword { get; set; }
        //--------------------------All filter
        //public string? ZipCode { get; set; }
        public int? ZipCode { get; set; }
        public string? MinPrice { get; set; }
        public string? MaxPrice { get; set; }
        public decimal? BuildingMinSF { get; set; }
        public decimal? BuildingMaxSF { get; set; }
        public decimal? LandMinAcres { get; set; }
        public decimal? LandMaxAcres { get; set; }
        public int? UnitBedsMin { get; set; }
        public int? UnitBedsMax { get; set; }
        public string? YearBuiltMin { get; set; }
        public string? YearBuiltMax { get; set; }
        public string? Keyword { get; set; }
        public string? EnteredDate { get; set; }
        public string? StartDate { get; set; }
        public string? EndDate { get; set; }
        public int? ReidyId { get; set; }
        public string? PropertyTypeList { get; set;}
        public string? RegionName { get; set; }
        public int? UnitCategory { get; set; }
        public string? DueDiligenceValue { get; set; }
        public decimal? MinLat { get; set; }
        public decimal? MinLng { get; set; }
        public decimal? MaxLat { get; set; }
        public decimal? MaxLng { get; set; }
        public string? SearchName { get; set; }
        public int? StateId { get; set; }
        public bool? IsAppraisal { get; set; }
        public bool? IsSurvey { get; set; }
        public bool? IsEnvironmental { get; set; }
        public bool? IsInspection { get; set; }
        public bool? IsTotalPrice { get; set; }
        public bool? IsPriceSF { get; set; }
        public bool? IsPriceAcr { get; set; }
        public bool? IsPriceUnit { get; set; }
        public bool? IsBuildingSF { get; set; }
        public bool? IsBuildingSM { get; set; }
        public bool? IsLandAcre { get; set; }
        public bool? IsLandSF { get; set; }
        public bool? IsLandHectares { get; set; }
        public bool? IsLandMS { get; set; }


    }
}
