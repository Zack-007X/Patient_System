var Repair_API = "/api/v1/Repair/";

//================= Search Customizaiton =========================================

function Repair_GetSearchParameter(fileType) {
    var RepairSearchObject = new Object();
RepairSearchObject.bookingId = $("#s_Repair_bookingId").val();
RepairSearchObject.repairCode = $("#s_Repair_repairCode").val();
RepairSearchObject.technicianId = $("#s_Repair_technicianId").val();
RepairSearchObject.startDate = formatDateForGetParameter(getDate($("#s_Repair_startDate").val()));
RepairSearchObject.endDate = formatDateForGetParameter(getDate($("#s_Repair_endDate").val()));


    RepairSearchObject.fileType = fileType;

    //console.log(RepairSearchObject);

    return RepairSearchObject;
}

function Repair_FeedDataToSearchForm(data) {
DropDownClearFormAndFeedWithData($("#s_Repair_bookingId"), data, "id", "bookingNumber", "item_bookingId", data.bookingId);
$("#s_Repair_repairCode").val(data.repairCode);
DropDownClearFormAndFeedWithData($("#s_Repair_technicianId"), data, "id", "nickname", "item_technicianId", data.technicianId);
$("#s_Repair_startDate").val(formatDate(data.startDate));
$("#s_Repair_endDate").val(formatDate(data.endDate));

}

//================= Form Data Customizaiton =========================================

function Repair_InitialForm(s) {
    var successFunc = function (result) {
        Repair_FeedDataToSearchForm(result);
        endLoad();
    };
    startLoad();
    AjaxGetRequest(apisite + Repair_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Report display =========================================

var s_Repair_customValidation = function (group) {
    return "";
};


function Repair_DoSearch(fileType) {
    if (!ValidateForm('s_Repair', s_Repair_customValidation)) {
        return;
    }

    var p = $.param(Repair_GetSearchParameter(fileType));    
    var report_url = apisite + "/api/v1/Repair/Repair_report?" + p;

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

