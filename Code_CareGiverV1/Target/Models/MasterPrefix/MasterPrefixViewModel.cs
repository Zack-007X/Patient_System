using System.Collections.Generic;

namespace App.Domain
{
    public class MasterPrefixViewModel : BaseViewModel<Guid>
    {

        public string? code { get; set; }

        public string? name { get; set; }

        public string? remark { get; set; }


        
        public int? counter { get { return 1; }  }
    }
}