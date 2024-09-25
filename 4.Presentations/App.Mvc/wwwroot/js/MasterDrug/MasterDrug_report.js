var MasterDrug_API = "/api/v1/MasterDrug/";

//================= Search Customizaiton =========================================

function MasterDrug_GetSearchParameter(fileType) {
    var MasterDrugSearchObject = new Object();
MasterDrugSearchObject.code = $("#s_MasterDrug_code").val();
MasterDrugSearchObject.name = $("#s_MasterDrug_name").val();


    MasterDrugSearchObject.fileType = fileType;

    //console.log(MasterDrugSearchObject);

    return MasterDrugSearchObject;
}

function MasterDrug_FeedDataToSearchForm(data) {
$("#s_MasterDrug_code").val(data.code);
$("#s_MasterDrug_name").val(data.name);

}

//================= Form Data Customizaiton =========================================

function MasterDrug_InitialForm(s) {
    var successFunc = function (result) {
        MasterDrug_FeedDataToSearchForm(result);
        endLoad();
    };
    startLoad();
    AjaxGetRequest(apisite + MasterDrug_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Report display =========================================

var s_MasterDrug_customValidation = function (group) {
    return "";
};


function MasterDrug_DoSearch(fileType) {
    if (!ValidateForm('s_MasterDrug', s_MasterDrug_customValidation)) {
        return;
    }

    var p = $.param(MasterDrug_GetSearchParameter(fileType));    
    var report_url = apisite + "/api/v1/MasterDrug/MasterDrug_report?" + p;

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

