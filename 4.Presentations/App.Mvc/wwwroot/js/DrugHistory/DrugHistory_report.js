var DrugHistory_API = "/api/v1/DrugHistory/";

//================= Search Customizaiton =========================================

function DrugHistory_GetSearchParameter(fileType) {
    var DrugHistorySearchObject = new Object();
DrugHistorySearchObject.masterDrugID = $("#s_DrugHistory_masterDrugID").val();
DrugHistorySearchObject.treatmentScheduleId = $("#s_DrugHistory_treatmentScheduleId").val();


    DrugHistorySearchObject.fileType = fileType;

    //console.log(DrugHistorySearchObject);

    return DrugHistorySearchObject;
}

function DrugHistory_FeedDataToSearchForm(data) {
DropDownClearFormAndFeedWithData($("#s_DrugHistory_masterDrugID"), data, "id", "name", "item_masterDrugID", data.masterDrugID);
DropDownClearFormAndFeedWithData($("#s_DrugHistory_treatmentScheduleId"), data, "id", "planingTopic", "item_treatmentScheduleId", data.treatmentScheduleId);

}

//================= Form Data Customizaiton =========================================

function DrugHistory_InitialForm(s) {
    var successFunc = function (result) {
        DrugHistory_FeedDataToSearchForm(result);
        endLoad();
    };
    startLoad();
    AjaxGetRequest(apisite + DrugHistory_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Report display =========================================

var s_DrugHistory_customValidation = function (group) {
    return "";
};


function DrugHistory_DoSearch(fileType) {
    if (!ValidateForm('s_DrugHistory', s_DrugHistory_customValidation)) {
        return;
    }

    var p = $.param(DrugHistory_GetSearchParameter(fileType));    
    var report_url = apisite + "/api/v1/DrugHistory/DrugHistory_report?" + p;

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

