using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanmorePlatform_REAL_Data.Entities
{
    public class Broker
    {
        [Key]
        public int BrokerId { get; set; }
        [Required]
        public string? IdentityFile { get; set; }//Fileu
        [Required]
        public string? RelationWithPropertyFile { get; set; }//File
        [Required]
        public string? ContractFile { get; set; }//File
        [Required]
        public string? DeedForOwner { get; set; }//DropDown
        public string? PicturesFile { get; set; }//File
        public string? AdditionalDocumentsFile { get; set; }//File
        public bool AcceptAgreement { get; set; }//Checkbox
    }
}
