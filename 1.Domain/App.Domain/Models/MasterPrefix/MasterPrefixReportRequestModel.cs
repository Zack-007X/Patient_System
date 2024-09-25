﻿using System.Collections.Generic;

namespace App.Domain
{
    public class MasterPrefixReportRequestModel : MasterPrefixSearchModel
    {
	    public string filetype { get; set; }

        public string contentType { get { return Common.GetContentType(filetype); } }
    }
}

