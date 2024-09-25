var MasterPrefix_API = "/api/v1/MasterPrefix/";

//================= Search Customizaiton =========================================

function MasterPrefix_GetSearchParameter(fileType) {
    var MasterPrefixSearchObject = new Object();
MasterPrefixSearchObject.name = $("#s_MasterPrefix_name").val();


    MasterPrefixSearchObject.fileType = fileType;

    //console.log(MasterPrefixSearchObject);

    return MasterPrefixSearchObject;
}

function MasterPrefix_FeedDataToSearchForm(data) {
$("#s_MasterPrefix_name").val(data.name);

}

//================= Form Data Customizaiton =========================================

function MasterPrefix_InitialForm(s) {
    var successFunc = function (result) {
        MasterPrefix_FeedDataToSearchForm(result);
        endLoad();
    };
    startLoad();
    AjaxGetRequest(apisite + MasterPrefix_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Report display =========================================

var s_MasterPrefix_customValidation = function (group) {
    return "";
};


function MasterPrefix_DoSearch(fileType) {
    if (!ValidateForm('s_MasterPrefix', s_MasterPrefix_customValidation)) {
        return;
    }

    var p = $.param(MasterPrefix_GetSearchParameter(fileType));    
    var report_url = apisite + "/api/v1/MasterPrefix/MasterPrefix_report?" + p;

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

