using System.Collections.Generic;

namespace App.Domain
{
    public class RoleHasPermissionReportRequestModel : RoleHasPermissionSearchModel
    {
	    public string filetype { get; set; }

        public string contentType { get { return Common.GetContentType(filetype); } }
    }
}

