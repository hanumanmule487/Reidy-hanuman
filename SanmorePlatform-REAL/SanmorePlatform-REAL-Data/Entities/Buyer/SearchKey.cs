﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanmorePlatform_REAL_Data.Entities.Buyer
{
    public class SearchKey
    {
        [Key]
        public int SearchId { get; set; }
        public string? UserId { get; set; }
        public int? Status { get; set; }
        public string? City { get; set; }
        //public string? MaxYearBuilt { get; set; }
        //public string? MinYearBuilt { get; set; }
        public string? FromfundToClose { get; set; }
        public string? TofundToClose { get; set; }
        public string? ZipCode { get; set; }
        public string? BuildingMinSF { get; set; }
        public string? BuildingMaxSF { get; set; }
        public string? LandMinAcres { get; set; }
        public string? LandMaxAcres { get; set; }
        public string? UnitBedsMin { get; set; }
        public string? UnitBedsMax { get; set; }
        public string? Keyword { get; set; }
        public string? EnteredDate { get; set; }
        public string? ReidyId { get; set; }
        public string? YearBuiltMin { get; set; }
        public string? YearBuiltMax { get; set; }
        public string? PropertyTypeList { get; set; }
        public string? PropertKeyword { get; set; }
        public string? RegionName { get; set; }
        public string? StartDate { get; set; }
        public string? EndDate { get; set; }
        public string? SearchName { get; set; }
         public string? MinPrice { get; set; }
        public string? MaxPrice { get; set; }
        public string? DueDiligenceValue { get; set; }
        public int StateId { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string? ModifiedBy { get; set; }
        public DateTime ModifiedOn { get; set; }
        public bool IsAppraisal { get; set; }
        public bool IsSurvey { get; set; }
        public bool IsEnvironmental { get; set; }
        public bool IsInspection { get; set; }
        public bool IsTotalPrice { get; set; }
        public bool IsPriceSF { get; set; }
        public bool IsPriceAcr { get; set; }
        public bool IsPriceUnit { get; set; }
        public bool IsBuildingSF { get; set; }
        public bool IsBuildingSM { get; set; }
        public bool IsLandAcre { get; set; }
        public bool IsLandSF { get; set; }
        public bool IsLandHectares { get; set; }
        public bool IsLandMS { get; set; }
    }
}
