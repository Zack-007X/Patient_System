using System.Collections.Generic;

namespace App.Domain
{
    public class MasterDrugInputModel
    {

        public Guid? id { get; set; }

        public string? code { get; set; }

        public string? name { get; set; }

        public string? dosage { get; set; }

        public string? remark { get; set; }

        public string? details { get; set; }

        public string? active_mode { get; set; }
    }
}

