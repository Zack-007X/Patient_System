var Survey_editMode = "CREATE";
var Survey_API = "/api/v1/Survey/";

//================= Form Data Customizaiton =========================================

function Survey_FeedDataToForm(data) {
$("#Survey_id").val(data.id);
DropDownClearFormAndFeedWithData($("#Survey_patientId"), data, "id", "firstname", "item_patientId", data.patientId);
DropDownClearFormAndFeedWithData($("#Survey_doctorId"), data, "id", "username", "item_doctorId", data.doctorId);
DropDownClearFormAndFeedWithData($("#Survey_masterPatientStateId"), data, "id", "name", "item_masterPatientStateId", data.masterPatientStateId);
$("#Survey_BloodPressure").val(data.BloodPressure);
$("#Survey_OxygenLevel").val(data.OxygenLevel);
$("#Survey_HeartRate").val(data.HeartRate);
$("#Survey_SurveyDate").val(formatDate(data.SurveyDate));
$("#Survey_SurveyDetail").val(data.SurveyDetail);
$("#Survey_remark").val(data.remark);


    $('input[type="text"][oninput="formatInputNumber(this)"]').trigger('input');
}

function Survey_GetFromForm() {
    var SurveyObject = new Object();
SurveyObject.id = $("#Survey_id").val();
SurveyObject.patientId = $("#Survey_patientId").val();
SurveyObject.doctorId = $("#Survey_doctorId").val();
SurveyObject.masterPatientStateId = $("#Survey_masterPatientStateId").val();
SurveyObject.BloodPressure = $("#Survey_BloodPressure").val();
SurveyObject.OxygenLevel = $("#Survey_OxygenLevel").val();
SurveyObject.HeartRate = $("#Survey_HeartRate").val();
SurveyObject.SurveyDate = getDate($("#Survey_SurveyDate").val());
SurveyObject.SurveyDetail = $("#Survey_SurveyDetail").val();
SurveyObject.remark = $("#Survey_remark").val();


    return SurveyObject;
}

function Survey_InitialForm() {
    var successFunc = function (result) {
        Survey_FeedDataToForm(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + Survey_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Form Mode Setup and Flow =========================================

function Survey_SetEditForm(a) {
    var successFunc = function (result) {
        Survey_editMode = "UPDATE";
        Survey_FeedDataToForm(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + Survey_API + a, successFunc, AlertDanger);
}

function Survey_SetCreateForm() {
    Survey_editMode = "CREATE";
	Survey_InitialForm();
}

//================= Update and Delete =========================================

var Survey_customValidation = function (group) {
    return "";
};

function Survey_PutUpdate() {
	if (!ValidateForm('Survey', Survey_customValidation))
    {
        return;
    }
    var data = Survey_GetFromForm();

    //Update Mode
    if (Survey_editMode === "UPDATE") {
        var successFunc1 = function (result) {
            AlertSuccess(result.code+" "+result.message);
			endLoad();
        };
		startLoad();
        AjaxPutRequest(apisite + Survey_API + data.id, data, successFunc1, AlertDanger);
    }
    // Create mode
    else {
        var successFunc2 = function (result) {
            AlertSuccess(result.code+" "+result.message);
			endLoad();
        };
		startLoad();
        AjaxPostRequest(apisite + Survey_API, data, successFunc2, AlertDanger);
    }
}

function Survey_GoDelete(a) {
    if (confirm('คุณต้องการลบ ' + a + ' ใช่หรือไม่?')) {
        var successFunc = function (result) {
            AlertSuccess(result.code+" "+result.message);
            Survey_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxDeleteRequest(apisite + Survey_API + a, null, successFunc, AlertDanger);
    }
}

//================= File Upload =========================================



//================= Multi-Selection Function =========================================


