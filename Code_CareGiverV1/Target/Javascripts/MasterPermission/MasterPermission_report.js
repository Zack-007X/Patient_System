var MasterPermission_API = "/api/v1/MasterPermission/";

//================= Search Customizaiton =========================================

function MasterPermission_GetSearchParameter(fileType) {
    var MasterPermissionSearchObject = new Object();
MasterPermissionSearchObject.code = $("#s_MasterPermission_code").val();
MasterPermissionSearchObject.name = $("#s_MasterPermission_name").val();


    MasterPermissionSearchObject.fileType = fileType;

    //console.log(MasterPermissionSearchObject);

    return MasterPermissionSearchObject;
}

function MasterPermission_FeedDataToSearchForm(data) {
$("#s_MasterPermission_code").val(data.code);
$("#s_MasterPermission_name").val(data.name);

}

//================= Form Data Customizaiton =========================================

function MasterPermission_InitialForm(s) {
    var successFunc = function (result) {
        MasterPermission_FeedDataToSearchForm(result);
        endLoad();
    };
    startLoad();
    AjaxGetRequest(apisite + MasterPermission_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Report display =========================================

var s_MasterPermission_customValidation = function (group) {
    return "";
};


function MasterPermission_DoSearch(fileType) {
    if (!ValidateForm('s_MasterPermission', s_MasterPermission_customValidation)) {
        return;
    }

    var p = $.param(MasterPermission_GetSearchParameter(fileType));    
    var report_url = apisite + "/api/v1/MasterPermission/MasterPermission_report?" + p;

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

