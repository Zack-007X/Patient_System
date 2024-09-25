using System.Collections.Generic;

namespace App.Domain
{
    public class PatientViewModel : BaseViewModel<Guid>
    {

        public Guid? masterPrefixId { get; set; }

        public string? firstname { get; set; }

        public string? lastname { get; set; }

        public DateTime? brithDate { get; set; }

        public string txt_brithDate { get { return Common.GetDateStringForReport(this.brithDate); } }

        public Guid? masterGenderId { get; set; }

        public int? age { get; set; }

        public float? height { get; set; }

        public float? weight { get; set; }

        public string? telephoneNumber { get; set; }

        public string? relativeName { get; set; }

        public string? relativeContract { get; set; }

        public string? remark { get; set; }

        public string? masterPrefixId_MasterPrefix_name { get; set; }
        public string? masterGenderId_MasterGender_name { get; set; }

        
        public int? counter { get { return 1; }  }
    }
}