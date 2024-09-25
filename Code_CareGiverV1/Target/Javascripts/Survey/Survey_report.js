var Survey_API = "/api/v1/Survey/";

//================= Search Customizaiton =========================================

function Survey_GetSearchParameter(fileType) {
    var SurveySearchObject = new Object();
SurveySearchObject.patientId = $("#s_Survey_patientId").val();
SurveySearchObject.doctorId = $("#s_Survey_doctorId").val();


    SurveySearchObject.fileType = fileType;

    //console.log(SurveySearchObject);

    return SurveySearchObject;
}

function Survey_FeedDataToSearchForm(data) {
DropDownClearFormAndFeedWithData($("#s_Survey_patientId"), data, "id", "firstname", "item_patientId", data.patientId);
DropDownClearFormAndFeedWithData($("#s_Survey_doctorId"), data, "id", "username", "item_doctorId", data.doctorId);

}

//================= Form Data Customizaiton =========================================

function Survey_InitialForm(s) {
    var successFunc = function (result) {
        Survey_FeedDataToSearchForm(result);
        endLoad();
    };
    startLoad();
    AjaxGetRequest(apisite + Survey_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Report display =========================================

var s_Survey_customValidation = function (group) {
    return "";
};


function Survey_DoSearch(fileType) {
    if (!ValidateForm('s_Survey', s_Survey_customValidation)) {
        return;
    }

    var p = $.param(Survey_GetSearchParameter(fileType));    
    var report_url = apisite + "/api/v1/Survey/Survey_report?" + p;

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

