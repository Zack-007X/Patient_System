var Patient_API = "/api/v1/Patient/";

//================= Search Customizaiton =========================================

function Patient_GetSearchParameter(fileType) {
    var PatientSearchObject = new Object();
PatientSearchObject.firstname = $("#s_Patient_firstname").val();
PatientSearchObject.lastname = $("#s_Patient_lastname").val();


    PatientSearchObject.fileType = fileType;

    //console.log(PatientSearchObject);

    return PatientSearchObject;
}

function Patient_FeedDataToSearchForm(data) {
$("#s_Patient_firstname").val(data.firstname);
$("#s_Patient_lastname").val(data.lastname);

}

//================= Form Data Customizaiton =========================================

function Patient_InitialForm(s) {
    var successFunc = function (result) {
        Patient_FeedDataToSearchForm(result);
        endLoad();
    };
    startLoad();
    AjaxGetRequest(apisite + Patient_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Report display =========================================

var s_Patient_customValidation = function (group) {
    return "";
};


function Patient_DoSearch(fileType) {
    if (!ValidateForm('s_Patient', s_Patient_customValidation)) {
        return;
    }

    var p = $.param(Patient_GetSearchParameter(fileType));    
    var report_url = apisite + "/api/v1/Patient/Patient_report?" + p;

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

