using System.Collections.Generic;

namespace App.Domain
{
    public class MasterRoleReportRequestModel : MasterRoleSearchModel
    {
	    public string filetype { get; set; }

        public string contentType { get { return Common.GetContentType(filetype); } }
    }
}

