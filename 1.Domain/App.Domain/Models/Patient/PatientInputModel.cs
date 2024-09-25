using System.Collections.Generic;

namespace App.Domain
{
    public class PatientInputModel
    {

        public Guid? id { get; set; }

        public Guid? masterPrefixId { get; set; }

        public string? firstname { get; set; }

        public string? lastname { get; set; }

        public DateTime? brithDate { get; set; }

        public Guid? masterGenderId { get; set; }

        public int? age { get; set; }

        public float? height { get; set; }

        public float? weight { get; set; }

        public string? telephoneNumber { get; set; }

        public string? relativeName { get; set; }

        public string? relativeContract { get; set; }

        public string? remark { get; set; }

        public string? active_mode { get; set; }
    }
}

