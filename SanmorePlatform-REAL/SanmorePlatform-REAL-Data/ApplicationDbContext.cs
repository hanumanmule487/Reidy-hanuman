using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SanmorePlatform_REAL_Data.Entities;
using SanmorePlatform_REAL_Data.Entities.Buyer;
using SanmorePlatform_REAL_Data.Entities.Lender;
using SanmorePlatform_REAL_Data.Entities.Location;
using SanmorePlatform_REAL_Model.ViewModels;
using SanmorePlatform_REAL_Model.ViewModels.BuyerModels;
#nullable disable
namespace SanmorePlatform_REAL_Data
{
    public partial class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public virtual DbSet<ApplicationUser> ApplicationUser { get; set; }
        public virtual DbSet<Property> Property { get; set; }
        public virtual DbSet<SearchKey> SearchKey { get; set; }

        public virtual DbSet<PropertyType> PropertyType { get; set; }
        public virtual DbSet<PropertyImage> PropertyImage { get; set; }
        public virtual DbSet<State> State { get; set; }
        public virtual DbSet<PropertyVideo> PropertyVideo { get; set; }
        public virtual DbSet<UnitMix> UnitMix { get; set; }
        public virtual DbSet<DueDiligenceDocument> DueDiligenceDocument { get; set; }
        public virtual DbSet<Link> Link { get; set; }
        public virtual DbSet<BrokerSignUp> tblBrokerSignUp { get; set; }
        public virtual DbSet<OfferContract> tblOfferContract { get; set; }
        public virtual DbSet<SeenProperty> tblSeenProperty { get; set; }
        public virtual DbSet<Sp_GetPropertyListModel> Sp_GetPropertyList { get; set; }

        public virtual DbSet<Assets> Assets { get; set; }
        public virtual DbSet<BankDocument> BankDocument { get; set; }
        public virtual DbSet<Business> Business  { get; set; }
        public virtual DbSet<Buyer> Buyer { get; set; }
        public virtual DbSet<CreditDocument> CreditDocument { get; set; }
        public virtual DbSet<Loan> Loan { get; set; }
        public virtual DbSet<OtherDebts> OtherDebts { get; set; }
        public virtual DbSet<Passport> Passport { get; set; }
        public virtual DbSet<RealEstate> RealEstate { get; set; }
        public virtual DbSet<WorkExperience> WorkExperience { get; set; }
       


        public virtual DbSet<Lender> Lender { get; set; }
        public virtual DbSet<ProofOfLendableFund> ProofOfLendableFund { get; set; }
        public virtual DbSet<OtherRequirementProduct> OtherRequirementProduct { get; set; }

        public virtual DbSet<LenderProduct> LenderProduct { get; set; }
        public virtual DbSet<LenderProgramAmount> LenderProgramAmount { get; set; }
        public virtual DbSet<Country> Country { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
