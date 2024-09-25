using System.Collections.Generic;

namespace App.Domain
{
    public class SurveySearchModel
    {

        public Guid id { get; set; }

        public Guid? patientId { get; set; }

        public Guid? doctorId { get; set; }

    }
}

