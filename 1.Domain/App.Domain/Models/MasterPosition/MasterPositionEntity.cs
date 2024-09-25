using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using TTSW.Utils;

namespace App.Domain
{
    public class MasterPositionEntity : BaseEntity<Guid>
    {


        [MaxLength(15), Column(Order = 2), Comment("เลขตำแหน่งราชการ")]
        public string? code { get; set; }

        [MaxLength(255), Column(Order = 3), Comment("ชื่อตำแหน่งราชการ")]
        public string? name { get; set; }

        [MaxLength(255), Column(Order = 4), Comment("หมายเหตุ")]
        public string? remark { get; set; }




    }
}
