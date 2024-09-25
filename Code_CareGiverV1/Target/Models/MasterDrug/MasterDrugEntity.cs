using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using TTSW.Utils;

namespace App.Domain
{
    public class MasterDrugEntity : BaseEntity<Guid>
    {


        [MaxLength(15), Column(Order = 2), Comment("เลขสถานะผู้ป่วย")]
        public string? code { get; set; }

        [MaxLength(255), Column(Order = 3), Comment("สถานะผู้ป่วย")]
        public string? name { get; set; }

        [MaxLength(20), Column(Order = 4), Comment("ปริมาณ")]
        public string? dosage { get; set; }

        [MaxLength(255), Column(Order = 5), Comment("หมายเหตุ")]
        public string? remark { get; set; }

        [MaxLength(100), Column(Order = 6), Comment("รายละเอียดยา")]
        public string? details { get; set; }


        public List<DrugHistoryEntity> DrugHistorys { get; } = new();


    }
}
