var TreatmentSchedule_editMode = "CREATE";
var TreatmentSchedule_API = "/api/v1/TreatmentSchedule/";

//================= Form Data Customizaiton =========================================

function TreatmentSchedule_FeedDataToForm(data) {
$("#TreatmentSchedule_id").val(data.id);
DropDownClearFormAndFeedWithData($("#TreatmentSchedule_surveyId"), data, "id", "patientId", "item_surveyId", data.surveyId);
$("#TreatmentSchedule_planingTopic").val(data.planingTopic);
$("#TreatmentSchedule_planingDetails").val(data.planingDetails);
$("#TreatmentSchedule_startTreatmentDate").val(formatDate(data.startTreatmentDate));
$("#TreatmentSchedule_endtartTreatmentDate").val(formatDate(data.endtartTreatmentDate));
DropDownClearFormAndFeedWithData($("#TreatmentSchedule_CaregiverId"), data, "id", "username", "item_CaregiverId", data.CaregiverId);
$("#TreatmentSchedule_TreatmentReportTopic").val(data.TreatmentReportTopic);
$("#TreatmentSchedule_TreatmentReportDetails").val(data.TreatmentReportDetails);
$("#TreatmentSchedule_remark").val(data.remark);


    $('input[type="text"][oninput="formatInputNumber(this)"]').trigger('input');
}

function TreatmentSchedule_GetFromForm() {
    var TreatmentScheduleObject = new Object();
TreatmentScheduleObject.id = $("#TreatmentSchedule_id").val();
TreatmentScheduleObject.surveyId = $("#TreatmentSchedule_surveyId").val();
TreatmentScheduleObject.planingTopic = $("#TreatmentSchedule_planingTopic").val();
TreatmentScheduleObject.planingDetails = $("#TreatmentSchedule_planingDetails").val();
TreatmentScheduleObject.startTreatmentDate = getDate($("#TreatmentSchedule_startTreatmentDate").val());
TreatmentScheduleObject.endtartTreatmentDate = getDate($("#TreatmentSchedule_endtartTreatmentDate").val());
TreatmentScheduleObject.CaregiverId = $("#TreatmentSchedule_CaregiverId").val();
TreatmentScheduleObject.TreatmentReportTopic = $("#TreatmentSchedule_TreatmentReportTopic").val();
TreatmentScheduleObject.TreatmentReportDetails = $("#TreatmentSchedule_TreatmentReportDetails").val();
TreatmentScheduleObject.remark = $("#TreatmentSchedule_remark").val();


    return TreatmentScheduleObject;
}

function TreatmentSchedule_InitialForm() {
    var successFunc = function (result) {
        TreatmentSchedule_FeedDataToForm(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + TreatmentSchedule_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Form Mode Setup and Flow =========================================

function TreatmentSchedule_SetEditForm(a) {
    var successFunc = function (result) {
        TreatmentSchedule_editMode = "UPDATE";
        TreatmentSchedule_FeedDataToForm(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + TreatmentSchedule_API + a, successFunc, AlertDanger);
}

function TreatmentSchedule_SetCreateForm() {
    TreatmentSchedule_editMode = "CREATE";
	TreatmentSchedule_InitialForm();
}

//================= Update and Delete =========================================

var TreatmentSchedule_customValidation = function (group) {
    return "";
};

function TreatmentSchedule_PutUpdate() {
	if (!ValidateForm('TreatmentSchedule', TreatmentSchedule_customValidation))
    {
        return;
    }
    var data = TreatmentSchedule_GetFromForm();

    //Update Mode
    if (TreatmentSchedule_editMode === "UPDATE") {
        var successFunc1 = function (result) {
            AlertSuccess(result.code+" "+result.message);
			endLoad();
        };
		startLoad();
        AjaxPutRequest(apisite + TreatmentSchedule_API + data.id, data, successFunc1, AlertDanger);
    }
    // Create mode
    else {
        var successFunc2 = function (result) {
            AlertSuccess(result.code+" "+result.message);
			endLoad();
        };
		startLoad();
        AjaxPostRequest(apisite + TreatmentSchedule_API, data, successFunc2, AlertDanger);
    }
}

function TreatmentSchedule_GoDelete(a) {
    if (confirm('คุณต้องการลบ ' + a + ' ใช่หรือไม่?')) {
        var successFunc = function (result) {
            AlertSuccess(result.code+" "+result.message);
            TreatmentSchedule_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxDeleteRequest(apisite + TreatmentSchedule_API + a, null, successFunc, AlertDanger);
    }
}

//================= File Upload =========================================



//================= Multi-Selection Function =========================================


