var MasterPatientState_API = "/api/v1/MasterPatientState/";

//================= Search Customizaiton =========================================

function MasterPatientState_GetSearchParameter(fileType) {
    var MasterPatientStateSearchObject = new Object();
MasterPatientStateSearchObject.code = $("#s_MasterPatientState_code").val();
MasterPatientStateSearchObject.name = $("#s_MasterPatientState_name").val();


    MasterPatientStateSearchObject.fileType = fileType;

    //console.log(MasterPatientStateSearchObject);

    return MasterPatientStateSearchObject;
}

function MasterPatientState_FeedDataToSearchForm(data) {
$("#s_MasterPatientState_code").val(data.code);
$("#s_MasterPatientState_name").val(data.name);

}

//================= Form Data Customizaiton =========================================

function MasterPatientState_InitialForm(s) {
    var successFunc = function (result) {
        MasterPatientState_FeedDataToSearchForm(result);
        endLoad();
    };
    startLoad();
    AjaxGetRequest(apisite + MasterPatientState_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Report display =========================================

var s_MasterPatientState_customValidation = function (group) {
    return "";
};


function MasterPatientState_DoSearch(fileType) {
    if (!ValidateForm('s_MasterPatientState', s_MasterPatientState_customValidation)) {
        return;
    }

    var p = $.param(MasterPatientState_GetSearchParameter(fileType));    
    var report_url = apisite + "/api/v1/MasterPatientState/MasterPatientState_report?" + p;

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

