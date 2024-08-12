using System.Collections.Generic;

namespace App.Domain
{
    public class CustomerViewModel : BaseViewModel<Guid>
    {

        public string? name { get; set; }

        public string? contactInfo { get; set; }

        public string? address { get; set; }

        public string? username { get; set; }

        public string? password { get; set; }


        
        public int? counter { get { return 1; }  }
    }
}