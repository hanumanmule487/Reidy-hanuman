using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanmorePlatform_REAL_Model.ViewModels
{
#nullable disable
    public class LenderSignupReqModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string RoleInLendingCompany { get; set; }
        public string LenderCompanyName { get; set; }
        public int EntityType { get; set; }
        public string LenderPhone { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }
        public string YearsInBusiness { get; set; }
        public string EstimatedNumberLoanDone { get; set; }
        public string PreferredAttorneyDoc { get; set; }
        public string PreferredAttorneyPhone { get; set; }
        public int ServicingLoanReidy { get; set; }
        public int ProofType { get; set; }
        public byte[] UploadFileLender { get; set; } // Change data type based on storage needs
        public byte[] UploadLenderLicense { get; set; } // Change data type based on storage needs
        public int IdentificationVerificationType { get; set; }
        public byte[] StateIssuedId { get; set; } // Change data type based on storage needs
        public bool AcceptUserAgreement { get; set; }
    }
}
