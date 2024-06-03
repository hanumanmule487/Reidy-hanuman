using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SanmorePlatform_REAL_Data;
using SanmorePlatform_REAL_Data.Entities;
using SanmorePlatform_REAL_Model.ViewModels;
using SanmorePlatform_REAL_Service.Interface;
using SanmorePlatform_REAL_Utility.Enum;
using System.Net;

namespace SanmorePlatform_REAL_Service.Services
{
    public class BrokerService : IBrokerService
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IWebHostEnvironment _hostEnvironment;
        public BrokerService(ApplicationDbContext context, RoleManager<IdentityRole> roleManager, UserManager<ApplicationUser> userManager, IWebHostEnvironment hostEnvironment)
        {
            _context = context;
            _roleManager = roleManager;
            _userManager = userManager;
            _hostEnvironment = hostEnvironment;
        }

        /// <summary>
        /// This method is to register the Broker
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ResponceModel> AddBrokerAsync(BrokerViewModel model)
        {
            try
            {
                ResponceModel response = new();

                var brokerData = await _context.tblBrokerSignUp.Where(x => x.UserId == model.UserId && x.IsSubmited == true).FirstOrDefaultAsync();
                if (brokerData != null)
                {
                    response.Success = false;
                    response.StatusCode = HttpStatusCode.Conflict;
                    response.Message = "User already is a broker";
                    return response;
                }
                if (model.IsSubmited == true)
                {
                    BrokerSignUp user = new();
                    user.FirstName = model.FirstName;
                    user.LastName = model.LastName;
                    user.CompanyName = model.CompanyName;
                    user.Title = model.Title;
                    user.MainRole = model.MainRole;
                    user.ContactPhoneNumber = model.ContactPhoneNumber;
                    user.CompanyPhoneNumber = model.CompanyPhoneNumber;
                    user.SocialMedia = model.SocialMedia;
                    user.CompanyProfile = model.CompanyProfile;
                    user.BusinessAddress1 = model.BusinessAddress1;
                    user.BusinessAddress2 = model.BusinessAddress2;
                    user.City = model.City;
                    user.State = model.State;
                    user.ZipCode = model.ZipCode;
                    user.NumberOfDeals = model.NumberOfDeals;
                    user.HelpGetMoreDeals = model.HelpGetMoreDeals;
                    user.FeatureYouLikeToSee = model.FeatureYouLikeToSee;
                    user.CountryName = model.CountryName;
                    user.IntrestedInUploadInventory = model.IntrestedInUploadInventory;
                    user.IdentificationType = model.IdentificationType;
                    user.FileName = model.Filename;
                    user.UserId = model.UserId;
                    user.CreatedDate = DateTime.Now;
                    user.IsApproved = false;
                    user.IsSubmited = true;
                    await _context.tblBrokerSignUp.AddAsync(user);
                    await _context.SaveChangesAsync();

                    var updateUserRole = await _userManager.FindByIdAsync(model.UserId);
                    if (updateUserRole != null)
                    {
                        updateUserRole.IsBroker = true;
                        updateUserRole.UpdatedDate = DateTime.Now;
                        updateUserRole.RoleType = UserRolesEnum.Broker.ToString();
                        _context.Update(updateUserRole);
                        _context.SaveChanges();
                    }

                    var users = new ApplicationUser();
                    users = updateUserRole;

                    if (!await _roleManager.RoleExistsAsync(UserRolesEnum.Broker.ToString()))
                    {
                        await _roleManager.CreateAsync(new IdentityRole(UserRolesEnum.Broker.ToString()));
                    }
                    if (await _roleManager.RoleExistsAsync(UserRolesEnum.Broker.ToString()))
                    {
                        await _userManager.AddToRoleAsync(users, UserRolesEnum.Broker.ToString());
                    }
                    response.Success = true;
                    response.Message = "Broker Register Successfully";
                }
                else
                {
                    var draftData = await _context.tblBrokerSignUp.Where(x => x.UserId == model.UserId && x.IsSubmited == false).FirstOrDefaultAsync();
                    if (draftData != null)
                    {
                        BrokerSignUp user = new();
                        user.FirstName = model.FirstName;
                        user.LastName = model.LastName;
                        user.CompanyName = model.CompanyName;
                        user.Title = model.Title;
                        user.MainRole = model.MainRole;
                        user.ContactPhoneNumber = model.ContactPhoneNumber;
                        user.CompanyPhoneNumber = model.CompanyPhoneNumber;
                        user.SocialMedia = model.SocialMedia;
                        user.CompanyProfile = model.CompanyProfile;
                        user.BusinessAddress1 = model.BusinessAddress1;
                        user.BusinessAddress2 = model.BusinessAddress2;
                        user.City = model.City;
                        user.State = model.State;
                        user.ZipCode = model.ZipCode;
                        user.NumberOfDeals = model.NumberOfDeals;
                        user.HelpGetMoreDeals = model.HelpGetMoreDeals;
                        user.FeatureYouLikeToSee = model.FeatureYouLikeToSee;
                        user.CountryName = model.CountryName;
                        user.IntrestedInUploadInventory = model.IntrestedInUploadInventory;
                        user.IdentificationType = model.IdentificationType;
                        user.FileName = model.Filename;
                        user.UserId = model.UserId;
                        user.UpdatedDate = DateTime.Now;
                        user.IsApproved = false;
                        _context.tblBrokerSignUp.Update(user);
                        await _context.SaveChangesAsync();
                        response.Success = true;
                        response.Message = "Record added successfully";
                        response.StatusCode = HttpStatusCode.OK;
                    }
                    else
                    {
                        BrokerSignUp user = new();
                        user.FirstName = model.FirstName;
                        user.LastName = model.LastName;
                        user.CompanyName = model.CompanyName;
                        user.Title = model.Title;
                        user.MainRole = model.MainRole;
                        user.ContactPhoneNumber = model.ContactPhoneNumber;
                        user.CompanyPhoneNumber = model.CompanyPhoneNumber;
                        user.SocialMedia = model.SocialMedia;
                        user.CompanyProfile = model.CompanyProfile;
                        user.BusinessAddress1 = model.BusinessAddress1;
                        user.BusinessAddress2 = model.BusinessAddress2;
                        user.City = model.City;
                        user.State = model.State;
                        user.ZipCode = model.ZipCode;
                        user.NumberOfDeals = model.NumberOfDeals;
                        user.HelpGetMoreDeals = model.HelpGetMoreDeals;
                        user.FeatureYouLikeToSee = model.FeatureYouLikeToSee;
                        user.CountryName = model.CountryName;
                        user.IntrestedInUploadInventory = model.IntrestedInUploadInventory;
                        user.IdentificationType = model.IdentificationType;
                        user.FileName = model.Filename;
                        user.UserId = model.UserId;
                        user.CreatedDate = DateTime.Now;
                        user.IsApproved = false;
                        await _context.tblBrokerSignUp.AddAsync(user);
                        await _context.SaveChangesAsync();
                        response.Success = true;
                        response.Message = "Record added successfully";
                        response.StatusCode = HttpStatusCode.OK;
                    }
                }
                return response;
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// This method is to get the broker profile
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<BrokerProfileModel> GetBrokerProfile(string id)
        {
            BrokerProfileModel response = new();
            try
            {

                var brokerInfo = await _context.tblBrokerSignUp.Include("ApplicationUser").Where(x => x.UserId == id).Select(x => new BrokerProfileModel
                {
                    UserId = x.ApplicationUser.Id,
                    FirstName = x.ApplicationUser.FirstName,
                    LastName = x.ApplicationUser.LastName,
                    Email = x.ApplicationUser.Email,
                    Title = x.ApplicationUser.Title,
                    MobilePhone = x.ApplicationUser.PhoneNumber,
                    OfficePhone = x.ApplicationUser.OfficePhone,
                    PrimaryRole = x.ApplicationUser.PrimaryRole,
                    ProfilePicName = x.ApplicationUser.ProfilePicName,

                    CompanyName = x.CompanyName,
                    MainRole = x.MainRole,
                    BusinessAddress1 = x.BusinessAddress1,
                    ContactPhoneNumber = x.ContactPhoneNumber,
                    CompanyPhoneNumber = x.CompanyPhoneNumber,
                    CompanyProfile = x.CompanyProfile,
                    SocialMedia = x.SocialMedia,

                    NumberOfDeals = x.NumberOfDeals,
                    HelpGetMoreDeals = x.HelpGetMoreDeals,
                    FeatureYouLikeToSee = x.FeatureYouLikeToSee,
                    IntrestedInUploadInventory = x.IntrestedInUploadInventory,
                    IdentificationType = x.IdentificationType,
                    Filename = x.FileName
                }).FirstOrDefaultAsync();

                if (brokerInfo != null)
                {
                    response.Success = true;
                    response.StatusCode = HttpStatusCode.OK;
                    response.Message = "Data fatched successfully";
                }
                else
                {
                    response.Success = false;
                    response.StatusCode = HttpStatusCode.NotFound;
                }
                return brokerInfo;
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// this method is to update the broker profile
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<MyResModel> UpdateBrokerProfile(BrokerProfileModel model)
        {
            MyResModel response = new();
            try
            {
                var basicUserProfile = await _userManager.FindByIdAsync(model.UserId);
                var brokerProfile = await _context.tblBrokerSignUp.Where(x => x.UserId == model.UserId).FirstOrDefaultAsync();
                if (basicUserProfile != null && brokerProfile != null)
                {
                    basicUserProfile.FirstName = model.FirstName;
                    basicUserProfile.LastName = model.LastName;
                    basicUserProfile.Title = model.Title;
                    basicUserProfile.Email = model.Email;
                    basicUserProfile.PhoneNumber = model.MobilePhone;
                    basicUserProfile.OfficePhone = model.OfficePhone;
                    basicUserProfile.PrimaryRole = model.PrimaryRole;
                    basicUserProfile.ProfilePicName = model.ProfilePicName;
                    basicUserProfile.UpdatedDate = DateTime.Now;

                    brokerProfile.CompanyName = model.CompanyName;
                    brokerProfile.MainRole = model.MainRole;
                    brokerProfile.BusinessAddress1 = model.BusinessAddress1;
                    brokerProfile.ContactPhoneNumber = model.ContactPhoneNumber;
                    brokerProfile.CompanyPhoneNumber = model.CompanyPhoneNumber;
                    brokerProfile.CompanyProfile = model.CompanyProfile;
                    brokerProfile.SocialMedia = model.SocialMedia;

                    brokerProfile.NumberOfDeals = model.NumberOfDeals;
                    brokerProfile.HelpGetMoreDeals = model.HelpGetMoreDeals;
                    brokerProfile.FeatureYouLikeToSee = model.FeatureYouLikeToSee;
                    brokerProfile.IntrestedInUploadInventory = model.IntrestedInUploadInventory;
                    brokerProfile.UpdatedDate = DateTime.Now;

                    brokerProfile.IdentificationType = model.IdentificationType;
                    brokerProfile.FileName = model.Filename;
                    _context.Update(basicUserProfile);
                    _context.Update(brokerProfile);
                    _context.SaveChanges();
                    response.Success = true;
                    response.StatusCode = HttpStatusCode.OK;
                    response.Message = "Broker profile updated successfully.";
                }
                else
                {
                    response.StatusCode = HttpStatusCode.NotFound;
                    response.Success = false;
                    response.Message = "Same error occure.";
                }
                return response;
            }
            catch (Exception)
            {
                throw;
            }
        }


        /// <summary>
        /// This method is to delete the property 
        /// </summary>
        /// <param name="propertyId"></param>
        /// <returns></returns>
        public async Task<MyResModel> DeleteProperty(int propertyId)
        {
            MyResModel response = new();
            try
            {
                var property = await _context.Property.Where(x => x.PropertyId == propertyId).FirstOrDefaultAsync();
                if (property != null)
                {
                    _context.Property.Remove(property);
                }
                return response;
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// This method is to get teh property current inventory from the database
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public async Task<List<GetCurrentInventoryViewModel>> CurrentInventory(string id)
        {
            GetCurrentInventoryViewModel response = new();
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

                var gettingAllPropertyList = await _context.Property.Where(x => x.UserId == id).Select(x => new GetCurrentInventoryViewModel()
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
                    decimal? formattedAmount = item.TargetPrice;
                    item.PropertyImages = fileName?.Substring(23);
                    item.PropertyTypeName = propertyTypeName.Where(x => x.PropertyTypeId == item.PropertyTypeId).Select(x => x.PropertyTypeName).FirstOrDefault();
                }

                response.Success = true;
                response.Message = "Please find the List of property";
                response.StatusCode = HttpStatusCode.OK;

                return gettingAllPropertyList;

            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<MyResModel> DeleteProp(int propertyId)
        {
            MyResModel respose = new();
            try
            {
                var data = await _context.Property.Where(x => x.PropertyId == propertyId).FirstOrDefaultAsync();
                if (data != null)
                {
                    data.IsDeleted = true;
                    _context.Update(data);
                    _context.SaveChanges();
                    respose.Success = true;
                    respose.StatusCode = HttpStatusCode.OK;
                    respose.Message = "Property Deleted Successfully";
                }
                else
                {
                    respose.Success = false;
                    respose.StatusCode = HttpStatusCode.NotFound;
                    respose.Message = "Property Not Found";
                }
                return respose;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
