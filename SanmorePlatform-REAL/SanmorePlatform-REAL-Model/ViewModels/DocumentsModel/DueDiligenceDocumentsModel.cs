using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanmorePlatform_REAL_Model.ViewModels.DocumentsModel
{
    public class DueDiligenceDocumentsModel
    {
        public int DueDiligenceDocumentId { get; set; }
        public string? FileName { get; set; }
        public string? FilePath { get; set; }
        public int FileType { get; set; }
        public int PropertyId { get; set; }

        public List<IFormFile>? AppraisalFileUpload { get; set; }

        public List<IFormFile>? InspectionFileUpload { get; set; }

        public List<IFormFile>? SurveyFileUpload { get; set; }

        public List<IFormFile>? EnvironmentalFileUpload { get; set; }

    }
}
