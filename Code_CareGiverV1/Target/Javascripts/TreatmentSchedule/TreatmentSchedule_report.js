var TreatmentSchedule_API = "/api/v1/TreatmentSchedule/";

//================= Search Customizaiton =========================================

function TreatmentSchedule_GetSearchParameter(fileType) {
    var TreatmentScheduleSearchObject = new Object();
TreatmentScheduleSearchObject.surveyId = $("#s_TreatmentSchedule_surveyId").val();
TreatmentScheduleSearchObject.planingTopic = $("#s_TreatmentSchedule_planingTopic").val();
TreatmentScheduleSearchObject.planingDetails = $("#s_TreatmentSchedule_planingDetails").val();
TreatmentScheduleSearchObject.CaregiverId = $("#s_TreatmentSchedule_CaregiverId").val();


    TreatmentScheduleSearchObject.fileType = fileType;

    //console.log(TreatmentScheduleSearchObject);

    return TreatmentScheduleSearchObject;
}

function TreatmentSchedule_FeedDataToSearchForm(data) {
DropDownClearFormAndFeedWithData($("#s_TreatmentSchedule_surveyId"), data, "id", "patientId", "item_surveyId", data.surveyId);
$("#s_TreatmentSchedule_planingTopic").val(data.planingTopic);
$("#s_TreatmentSchedule_planingDetails").val(data.planingDetails);
DropDownClearFormAndFeedWithData($("#s_TreatmentSchedule_CaregiverId"), data, "id", "username", "item_CaregiverId", data.CaregiverId);

}

//================= Form Data Customizaiton =========================================

function TreatmentSchedule_InitialForm(s) {
    var successFunc = function (result) {
        TreatmentSchedule_FeedDataToSearchForm(result);
        endLoad();
    };
    startLoad();
    AjaxGetRequest(apisite + TreatmentSchedule_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Report display =========================================

var s_TreatmentSchedule_customValidation = function (group) {
    return "";
};


function TreatmentSchedule_DoSearch(fileType) {
    if (!ValidateForm('s_TreatmentSchedule', s_TreatmentSchedule_customValidation)) {
        return;
    }

    var p = $.param(TreatmentSchedule_GetSearchParameter(fileType));    
    var report_url = apisite + "/api/v1/TreatmentSchedule/TreatmentSchedule_report?" + p;

    if (fileType === "pdf") {
        var successFunc = function (result) {
            $("#report_result").attr("src", result);
            $("#report_result").show();
            //$("#report_xModel").modal("show");
            endLoad();
        };
        startLoad();
        AjaxGetBinaryRequest(report_url, successFunc, AlertDanger);
    } else {
        var successFunc = function (result) {
            $("#report_result").hide();
            window.open(result);
            endLoad();
        };
        startLoad();
        AjaxGetBinaryRequest(report_url, successFunc, AlertDanger);       
	}
}

