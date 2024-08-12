var Repair_editMode = "CREATE";
var Repair_API = "/api/v1/Repair/";

//================= Form Data Customizaiton =========================================

function Repair_FeedDataToForm(data) {
$("#Repair_id").val(data.id);
DropDownClearFormAndFeedWithData($("#Repair_bookingId"), data, "id", "bookingNumber", "item_bookingId", data.bookingId);
$("#Repair_repairCode").val(data.repairCode);
DropDownClearFormAndFeedWithData($("#Repair_technicianId"), data, "id", "nickname", "item_technicianId", data.technicianId);
$("#Repair_startDate").val(formatDate(data.startDate));
$("#Repair_endDate").val(formatDate(data.endDate));
$("#Repair_totalCostEA").val(data.totalCostEA);
$("#Repair_repairNote").val(data.repairNote);


    $('input[type="text"][oninput="formatInputNumber(this)"]').trigger('input');
}

function Repair_GetFromForm() {
    var RepairObject = new Object();
RepairObject.id = $("#Repair_id").val();
RepairObject.bookingId = $("#Repair_bookingId").val();
RepairObject.repairCode = $("#Repair_repairCode").val();
RepairObject.technicianId = $("#Repair_technicianId").val();
RepairObject.startDate = getDate($("#Repair_startDate").val());
RepairObject.endDate = getDate($("#Repair_endDate").val());
RepairObject.totalCostEA = $("#Repair_totalCostEA").val();
RepairObject.repairNote = $("#Repair_repairNote").val();


    return RepairObject;
}

function Repair_InitialForm() {
    var successFunc = function (result) {
        Repair_FeedDataToForm(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + Repair_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Form Mode Setup and Flow =========================================

function Repair_SetEditForm(a) {
    var successFunc = function (result) {
        Repair_editMode = "UPDATE";
        Repair_FeedDataToForm(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + Repair_API + a, successFunc, AlertDanger);
}

function Repair_SetCreateForm() {
    Repair_editMode = "CREATE";
	Repair_InitialForm();
}

//================= Update and Delete =========================================

var Repair_customValidation = function (group) {
    return "";
};

function Repair_PutUpdate() {
	if (!ValidateForm('Repair', Repair_customValidation))
    {
        return;
    }
    var data = Repair_GetFromForm();

    //Update Mode
    if (Repair_editMode === "UPDATE") {
        var successFunc1 = function (result) {
            AlertSuccess(result.code+" "+result.message);
			endLoad();
        };
		startLoad();
        AjaxPutRequest(apisite + Repair_API + data.id, data, successFunc1, AlertDanger);
    }
    // Create mode
    else {
        var successFunc2 = function (result) {
            AlertSuccess(result.code+" "+result.message);
			endLoad();
        };
		startLoad();
        AjaxPostRequest(apisite + Repair_API, data, successFunc2, AlertDanger);
    }
}

function Repair_GoDelete(a) {
    if (confirm('คุณต้องการลบ ' + a + ' ใช่หรือไม่?')) {
        var successFunc = function (result) {
            AlertSuccess(result.code+" "+result.message);
            Repair_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxDeleteRequest(apisite + Repair_API + a, null, successFunc, AlertDanger);
    }
}

//================= File Upload =========================================



//================= Multi-Selection Function =========================================


