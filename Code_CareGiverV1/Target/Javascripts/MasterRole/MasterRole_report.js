var MasterRole_API = "/api/v1/MasterRole/";

//================= Search Customizaiton =========================================

function MasterRole_GetSearchParameter(fileType) {
    var MasterRoleSearchObject = new Object();
MasterRoleSearchObject.code = $("#s_MasterRole_code").val();
MasterRoleSearchObject.name = $("#s_MasterRole_name").val();


    MasterRoleSearchObject.fileType = fileType;

    //console.log(MasterRoleSearchObject);

    return MasterRoleSearchObject;
}

function MasterRole_FeedDataToSearchForm(data) {
$("#s_MasterRole_code").val(data.code);
$("#s_MasterRole_name").val(data.name);

}

//================= Form Data Customizaiton =========================================

function MasterRole_InitialForm(s) {
    var successFunc = function (result) {
        MasterRole_FeedDataToSearchForm(result);
        endLoad();
    };
    startLoad();
    AjaxGetRequest(apisite + MasterRole_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Report display =========================================

var s_MasterRole_customValidation = function (group) {
    return "";
};


function MasterRole_DoSearch(fileType) {
    if (!ValidateForm('s_MasterRole', s_MasterRole_customValidation)) {
        return;
    }

    var p = $.param(MasterRole_GetSearchParameter(fileType));    
    var report_url = apisite + "/api/v1/MasterRole/MasterRole_report?" + p;

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

