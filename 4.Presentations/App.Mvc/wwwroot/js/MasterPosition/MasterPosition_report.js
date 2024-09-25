var MasterPosition_API = "/api/v1/MasterPosition/";

//================= Search Customizaiton =========================================

function MasterPosition_GetSearchParameter(fileType) {
    var MasterPositionSearchObject = new Object();
MasterPositionSearchObject.code = $("#s_MasterPosition_code").val();
MasterPositionSearchObject.name = $("#s_MasterPosition_name").val();


    MasterPositionSearchObject.fileType = fileType;

    //console.log(MasterPositionSearchObject);

    return MasterPositionSearchObject;
}

function MasterPosition_FeedDataToSearchForm(data) {
$("#s_MasterPosition_code").val(data.code);
$("#s_MasterPosition_name").val(data.name);

}

//================= Form Data Customizaiton =========================================

function MasterPosition_InitialForm(s) {
    var successFunc = function (result) {
        MasterPosition_FeedDataToSearchForm(result);
        endLoad();
    };
    startLoad();
    AjaxGetRequest(apisite + MasterPosition_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Report display =========================================

var s_MasterPosition_customValidation = function (group) {
    return "";
};


function MasterPosition_DoSearch(fileType) {
    if (!ValidateForm('s_MasterPosition', s_MasterPosition_customValidation)) {
        return;
    }

    var p = $.param(MasterPosition_GetSearchParameter(fileType));    
    var report_url = apisite + "/api/v1/MasterPosition/MasterPosition_report?" + p;

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

