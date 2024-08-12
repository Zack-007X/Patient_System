using System.Collections.Generic;

namespace App.Domain
{
    public class CustomerInputModel
    {

        public Guid? id { get; set; }

        public string? name { get; set; }

        public string? contactInfo { get; set; }

        public string? address { get; set; }

        public string? username { get; set; }

        public string? password { get; set; }

        public string? active_mode { get; set; }
    }
}

