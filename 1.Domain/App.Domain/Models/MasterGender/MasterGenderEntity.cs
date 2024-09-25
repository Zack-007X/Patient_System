using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using TTSW.Utils;

namespace App.Domain
{
    public class MasterGenderEntity : BaseEntity<Guid>
    {


        [MaxLength(15), Column(Order = 2), Comment("เลขเพศ")]
        public string? code { get; set; }

        [MaxLength(255), Column(Order = 3), Comment("เพศ")]
        public string? name { get; set; }

        [MaxLength(255), Column(Order = 4), Comment("หมายเหตุ")]
        public string? remark { get; set; }


        public List<PatientEntity> Patients { get; } = new();


    }
}
