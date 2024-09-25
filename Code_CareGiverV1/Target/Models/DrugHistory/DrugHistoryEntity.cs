using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using TTSW.Utils;

namespace App.Domain
{
    public class DrugHistoryEntity : BaseEntity<Guid>
    {


        [ForeignKey("masterDrugID")]
        public MasterDrugEntity? MasterDrug_masterDrugID { get; set; }

        [Column(Order = 2), Comment("ยา")]
        public Guid? masterDrugID { get; set; }

        [ForeignKey("treatmentScheduleId")]
        public TreatmentScheduleEntity? TreatmentSchedule_treatmentScheduleId { get; set; }

        [Column(Order = 3), Comment("รายการการ Treatment")]
        public Guid? treatmentScheduleId { get; set; }

        [Column(Order = 4), Comment("จำนวนยา")]
        public int? amount { get; set; }

        [MaxLength(255), Column(Order = 5), Comment("หมายเหตุ")]
        public string? remark { get; set; }




    }
}
