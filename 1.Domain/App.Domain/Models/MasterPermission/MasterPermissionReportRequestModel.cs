using System.Collections.Generic;

namespace App.Domain
{
    public class MasterPermissionReportRequestModel : MasterPermissionSearchModel
    {
	    public string filetype { get; set; }

        public string contentType { get { return Common.GetContentType(filetype); } }
    }
}

