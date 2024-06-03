using Microsoft.EntityFrameworkCore;
using SanmorePlatform_REAL_Data;
using SanmorePlatform_REAL_Model.ViewModels;
using SanmorePlatform_REAL_Model.ViewModels.DocumentsModel;
using SanmorePlatform_REAL_Service.Interface;
using System.Net;

namespace SanmorePlatform_REAL_Service.Services
{
    public class TransactionCoordinatorService : ITransactionCoordinator
    {
        private readonly ApplicationDbContext _context;

        public TransactionCoordinatorService(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<List<TcPropertyListingViewModel>> GetAllPropList()
        {
            try
            {
                var state = (from prop in _context.Property
                             join st in _context.State on prop.StateId equals st.StateId
                             select new
                             {
                                 st.StateId,
                                 st.ShortName,
                                 st.LongName
                             }).ToList();

                var propertyTypeName = (from prop in _context.Property
                                        join pt in _context.PropertyType on prop.PropertyTypeId equals pt.PropertyTypeId
                                        select new
                                        {
                                            pt.PropertyTypeId,
                                            pt.PropertyTypeName
                                        }).ToList();

                var pImg = (from prop in _context.Property
                            join pt in _context.PropertyImage on prop.PropertyId equals pt.PropertyId
                            select new
                            {
                                pt.PropertyId,
                                pt.ImagePath
                            }).ToList();

                var userDetails = (from p in _context.Property
                                   join u in _context.tblBrokerSignUp
                                   on p.UserId equals u.UserId
                                   select new
                                   {
                                       u.UserId,
                                       u.FirstName,
                                       u.LastName,
                                       u.ContactPhoneNumber
                                   }).ToList();

                var gettingAllPropertyList = await _context.Property.Select(x => new TcPropertyListingViewModel()
                {
                    UserId = x.UserId,
                    PropertyId = x.PropertyId,
                    RelationshipToProperty = x.RelationshipToProperty,
                    TargetPrice = x.TargetPrice,
                    OriginalContractPrice = x.OriginalTargetPrice,
                    Address1 = x.Address1,
                    Address2 = x.Address2,
                    City = x.City,
                    StateId = x.StateId,
                    ZipCode = x.ZipCode,
                    BuildingStatus = x.BuildingStatus,
                    CreatedOn = x.CreatedOn.ToString(),
                    ModifyDate = x.ModifiedOn.ToString(),
                    IsApproved = x.IsApproved,
                    StateName = x.StateName,
                    PropertyTypeId = x.PropertyTypeId,
                    IsActive = x.IsActive,

                }).ToListAsync();

                foreach (var item in gettingAllPropertyList)
                {
                    item.FirstName = userDetails.Where(x => x.UserId == item.UserId).Select(x => x.FirstName).FirstOrDefault();
                    item.LastName = userDetails.Where(x => x.UserId == item.UserId).Select(x => x.LastName).FirstOrDefault();
                    item.ContactNumber = userDetails.Where(x => x.UserId == item.UserId).Select(x => x.ContactPhoneNumber).FirstOrDefault();

                    item.TotalViews = _context.tblSeenProperty.Where(x => x.PropertyId == item.PropertyId).Count();
                    item.LastMonthsViews = _context.tblSeenProperty.Count(sp => sp.CreatedDate >= DateTime.Now.AddDays(-30));

                    item.State = state.Where(x => x.StateId == item.StateId).Select(x => x.ShortName).FirstOrDefault();
                    string? fileName = pImg.Where(x => x.PropertyId == item.PropertyId).Select(x => x.ImagePath).FirstOrDefault();
                    string? formattedAmount = item.TargetPrice.ToString();
                    item.PropertyImages = fileName?.Substring(23);
                    item.PropertyTypeName = propertyTypeName.Where(x => x.PropertyTypeId == item.PropertyTypeId).Select(x => x.PropertyTypeName).FirstOrDefault();
                }
                return gettingAllPropertyList;
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<TcGetPropByIdModel> GetPropById(int propertyId)
        {
            try
            {
                string? state = (from prop in _context.Property
                                 join st in _context.State on prop.StateId equals st.StateId
                                 where (prop.PropertyId == propertyId)
                                 select st.LongName).FirstOrDefault();

                string? propertyTypeName = (from prop in _context.Property
                                            join pt in _context.PropertyType on prop.PropertyTypeId equals pt.PropertyTypeId
                                            where (prop.PropertyId == propertyId)
                                            select pt.PropertyTypeName).FirstOrDefault();

                var propertyList = await _context.Property.Where(x => x.PropertyId == propertyId).Select(x => new TcGetPropByIdModel()
                {
                    PropertyId = x.PropertyId,
                    RelationshipToProperty = x.RelationshipToProperty,
                    TargetPrice = x.TargetPrice,
                    OriginalTargetPrice = x.OriginalTargetPrice,
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
                        ImagePath = l.ImagePath.Substring(23),
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
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<TcAllUserListViewModel>> GetAllUserList()
        {
            TcAllUserListViewModel responce = new();
            try
            {
                var allUserList = await _context.Users.Select(x => new TcAllUserListViewModel
                {
                    FirstName = x.FirstName,
                    LastName = x.LastName,
                    Email = x.Email,
                    Address = x.Address,
                    CompanyName = x.CompanyName,
                    Roletype = x.RoleType,
                    HearAboutUs = x.HearAboutUs
                }).ToListAsync();
                return allUserList;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<ResponceModel> UpdatePropStatus(int propId, string status)
        {
            try
            {
                ResponceModel response = new();
                var data = await _context.Property.Where(x => x.PropertyId == propId).FirstOrDefaultAsync();
                if (data != null && status != null)
                {
                    data.IsApproved = status;
                    _context.Property.Update(data);
                    _context.SaveChanges();
                    response.Success = true;
                    response.StatusCode = HttpStatusCode.OK;
                    response.Message = "Successfully updated";
                }
                else
                {
                    response.StatusCode = HttpStatusCode.BadRequest;
                    response.Success = false;
                }
                return response;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<TcPropertyListingViewModel>> FilterPropertyListing(string search)
        {
            ResponceModel respose = new();
            try
            {
                var state = (from prop in _context.Property
                             join st in _context.State on prop.StateId equals st.StateId
                             select new
                             {
                                 st.StateId,
                                 st.ShortName,
                                 st.LongName
                             }).ToList();

                var propertyTypeName = (from prop in _context.Property
                                        join pt in _context.PropertyType on prop.PropertyTypeId equals pt.PropertyTypeId
                                        select new
                                        {
                                            pt.PropertyTypeId,
                                            pt.PropertyTypeName
                                        }).ToList();

                var pImg = (from prop in _context.Property
                            join pt in _context.PropertyImage on prop.PropertyId equals pt.PropertyId
                            select new
                            {
                                pt.PropertyId,
                                pt.ImagePath
                            }).ToList();

                var userDetails = (from p in _context.Property
                                   join u in _context.tblBrokerSignUp
                                   on p.UserId equals u.UserId
                                   select new
                                   {
                                       u.UserId,
                                       u.FirstName,
                                       u.LastName,
                                       u.ContactPhoneNumber
                                   }).ToList();

                var gettingAllPropertyList = await _context.Property.Select(x => new TcPropertyListingViewModel()
                {
                    UserId = x.UserId,
                    PropertyId = x.PropertyId,
                    RelationshipToProperty = x.RelationshipToProperty,
                    TargetPrice = x.TargetPrice,
                    OriginalContractPrice = x.OriginalTargetPrice,
                    Address1 = x.Address1,
                    Address2 = x.Address2,
                    City = x.City,
                    StateId = x.StateId,
                    ZipCode = x.ZipCode,
                    BuildingStatus = x.BuildingStatus,
                    CreatedOn = x.CreatedOn.ToString(),
                    ModifyDate = x.ModifiedOn.ToString(),
                    IsApproved = x.IsApproved,
                    StateName = x.StateName,
                    PropertyTypeId = x.PropertyTypeId,
                    IsActive = x.IsActive,

                }).ToListAsync();

                foreach (var item in gettingAllPropertyList)
                {
                    item.FirstName = userDetails.Where(x => x.UserId == item.UserId).Select(x => x.FirstName).FirstOrDefault();
                    item.LastName = userDetails.Where(x => x.UserId == item.UserId).Select(x => x.LastName).FirstOrDefault();
                    item.ContactNumber = userDetails.Where(x => x.UserId == item.UserId).Select(x => x.ContactPhoneNumber).FirstOrDefault();

                    item.TotalViews = _context.tblSeenProperty.Where(x => x.PropertyId == item.PropertyId).Count();
                    item.LastMonthsViews = _context.tblSeenProperty.Count(sp => sp.CreatedDate >= DateTime.Now.AddDays(-30));

                    item.State = state.Where(x => x.StateId == item.StateId).Select(x => x.ShortName).FirstOrDefault();
                    string? fileName = pImg.Where(x => x.PropertyId == item.PropertyId).Select(x => x.ImagePath).FirstOrDefault();
                    string? formattedAmount = item.TargetPrice.ToString();
                    if (fileName != null)
                    {
                        item.PropertyImages = fileName?.Substring(23);
                    }
                    item.PropertyTypeName = propertyTypeName.Where(x => x.PropertyTypeId == item.PropertyTypeId).Select(x => x.PropertyTypeName).FirstOrDefault();
                }

                if (!string.IsNullOrWhiteSpace(search))
                {
                    gettingAllPropertyList = gettingAllPropertyList.Where(p => p.Address1.Contains(search, StringComparison.OrdinalIgnoreCase)

                    || p.City.Contains(search, StringComparison.OrdinalIgnoreCase)
                    || p.State.Contains(search, StringComparison.OrdinalIgnoreCase)
                    || p.ZipCode.ToString().Contains(search, StringComparison.OrdinalIgnoreCase)
                    || p.TargetPrice.ToString().Contains(search, StringComparison.OrdinalIgnoreCase)

                    || p.PropertyTypeName.Contains(search, StringComparison.OrdinalIgnoreCase)
                    || p.LastMonthsViews.ToString().Contains(search, StringComparison.OrdinalIgnoreCase)
                    || p.TotalViews.ToString().Contains(search, StringComparison.OrdinalIgnoreCase)

                    || p.RelationshipToProperty.Contains(search, StringComparison.OrdinalIgnoreCase)
                    || p.ContactNumber.Contains(search, StringComparison.OrdinalIgnoreCase)
                    || p.CreatedOn.Contains(search, StringComparison.OrdinalIgnoreCase)
                    || p.ModifyDate != null && p.ModifyDate.Contains(search, StringComparison.OrdinalIgnoreCase)
                    || p.FirstName.Contains(search, StringComparison.OrdinalIgnoreCase)
                    || p.LastName.Contains(search, StringComparison.OrdinalIgnoreCase)).ToList();
                }

                //                gettingAllPropertyList = gettingAllPropertyList.Where(p =>
                //    (p.Address1 != null && p.Address1.Contains(search, StringComparison.OrdinalIgnoreCase)) ||
                //    (p.City != null && p.City.Contains(search, StringComparison.OrdinalIgnoreCase)) ||
                //    (p.State != null && p.State.Contains(search, StringComparison.OrdinalIgnoreCase)) ||
                //    (p.ZipCode != null && p.ZipCode.ToString().Contains(search, StringComparison.OrdinalIgnoreCase)) ||
                //    (p.TargetPrice != null && p.TargetPrice.ToString().Contains(search, StringComparison.OrdinalIgnoreCase)) ||
                //    (p.PropertyTypeName != null && p.PropertyTypeName.Contains(search, StringComparison.OrdinalIgnoreCase)) ||
                //    (p.LastMonthsViews != null && p.LastMonthsViews.ToString().Contains(search, StringComparison.OrdinalIgnoreCase)) ||
                //    (p.TotalViews != null && p.TotalViews.ToString().Contains(search, StringComparison.OrdinalIgnoreCase)) ||
                //    (p.RelationshipToProperty != null && p.RelationshipToProperty.Contains(search, StringComparison.OrdinalIgnoreCase)) ||
                //    (p.ContactNumber != null && p.ContactNumber.Contains(search, StringComparison.OrdinalIgnoreCase)) ||
                //    (p.CreatedOn != null && p.CreatedOn.Contains(search, StringComparison.OrdinalIgnoreCase)) ||
                //    (p.ModifyDate != null && p.ModifyDate.Contains(search, StringComparison.OrdinalIgnoreCase)) ||
                //    (p.FirstName != null && p.FirstName.Contains(search, StringComparison.OrdinalIgnoreCase)) ||
                //    (p.LastName != null && p.LastName.Contains(search, StringComparison.OrdinalIgnoreCase))
                //).ToList();


                //switch (sortBy)
                //{
                //    case "name":
                //        products = list.OrderBy(p => p.Name);
                //        break;
                //    case "price":
                //        products = list.OrderBy(p => p.Price);
                //        break;
                //    // Add more sorting options as needed
                //    default:
                //        break;
                //}
                //return Ok(products);
                respose.Success = true;
                respose.StatusCode = HttpStatusCode.OK;
                respose.Message = "Success";

                return gettingAllPropertyList;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
