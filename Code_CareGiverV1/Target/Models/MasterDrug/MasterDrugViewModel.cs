using System.Collections.Generic;

namespace App.Domain
{
    public class MasterDrugViewModel : BaseViewModel<Guid>
    {

        public string? code { get; set; }

        public string? name { get; set; }

        public string? dosage { get; set; }

        public string? remark { get; set; }

        public string? details { get; set; }


        
        public int? counter { get { return 1; }  }
    }
}