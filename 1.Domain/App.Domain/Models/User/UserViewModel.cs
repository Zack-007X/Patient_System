using System.Collections.Generic;

namespace App.Domain
{
    public class UserViewModel : BaseViewModel<Guid>
    {

        public string? nickname { get; set; }

        public string? fullname { get; set; }

        public string? phone { get; set; }

        public string? email { get; set; }

        public string? password { get; set; }

        public bool? isCustomerService { get; set; }

        public bool? isTechnician { get; set; }

        public bool? isAdministrator { get; set; }

        public bool? isInventoryManager { get; set; }


        
        public int? counter { get { return 1; }  }
    }
}