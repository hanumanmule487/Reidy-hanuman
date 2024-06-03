using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanmorePlatform_REAL_Model.ViewModels
{
    public class TcAllUserListViewModel:ResponceModel
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Roletype { get; set; }
        public string? Company { get; set; }
        public string? Address { get; set; }
        public string? AddressLine1 { get; set; }
        public string? AddressLine2 { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? ZipCode { get; set; }
        public string? CompanyName { get; set; }
        public int? BusinessDuration { get; set; }
        public string? HearAboutUs { get; set; }
        public string? IntrestedIn { get; set; }
        //public bool AcceptAgreement { get; set; }
    }
}
