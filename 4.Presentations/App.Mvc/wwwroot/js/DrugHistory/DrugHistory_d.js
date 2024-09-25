var DrugHistory_editMode = "CREATE";
var DrugHistory_API = "/api/v1/DrugHistory/";

//================= Form Data Customizaiton =========================================

function DrugHistory_FeedDataToForm(data) {
$("#DrugHistory_id").val(data.id);
DropDownClearFormAndFeedWithData($("#DrugHistory_masterDrugID"), data, "id", "name", "item_masterDrugID", data.masterDrugID);
DropDownClearFormAndFeedWithData($("#DrugHistory_treatmentScheduleId"), data, "id", "planingTopic", "item_treatmentScheduleId", data.treatmentScheduleId);
$("#DrugHistory_amount").val(data.amount);
$("#DrugHistory_remark").val(data.remark);


    $('input[type="text"][oninput="formatInputNumber(this)"]').trigger('input');
}

function DrugHistory_GetFromForm() {
    var DrugHistoryObject = new Object();
DrugHistoryObject.id = $("#DrugHistory_id").val();
DrugHistoryObject.masterDrugID = $("#DrugHistory_masterDrugID").val();
DrugHistoryObject.treatmentScheduleId = $("#DrugHistory_treatmentScheduleId").val();
DrugHistoryObject.amount = $("#DrugHistory_amount").val();
DrugHistoryObject.remark = $("#DrugHistory_remark").val();


    return DrugHistoryObject;
}

function DrugHistory_InitialForm() {
    var successFunc = function (result) {
        DrugHistory_FeedDataToForm(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + DrugHistory_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Form Mode Setup and Flow =========================================

function DrugHistory_SetEditForm(a) {
    var successFunc = function (result) {
        DrugHistory_editMode = "UPDATE";
        DrugHistory_FeedDataToForm(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + DrugHistory_API + a, successFunc, AlertDanger);
}

function DrugHistory_SetCreateForm() {
    DrugHistory_editMode = "CREATE";
	DrugHistory_InitialForm();
}

//================= Update and Delete =========================================

var DrugHistory_customValidation = function (group) {
    return "";
};

function DrugHistory_PutUpdate() {
	if (!ValidateForm('DrugHistory', DrugHistory_customValidation))
    {
        return;
    }
    var data = DrugHistory_GetFromForm();

    //Update Mode
    if (DrugHistory_editMode === "UPDATE") {
        var successFunc1 = function (result) {
            AlertSuccess(result.code+" "+result.message);
			endLoad();
        };
		startLoad();
        AjaxPutRequest(apisite + DrugHistory_API + data.id, data, successFunc1, AlertDanger);
    }
    // Create mode
    else {
        var successFunc2 = function (result) {
            AlertSuccess(result.code+" "+result.message);
			endLoad();
        };
		startLoad();
        AjaxPostRequest(apisite + DrugHistory_API, data, successFunc2, AlertDanger);
    }
}

function DrugHistory_GoDelete(a) {
    if (confirm('คุณต้องการลบ ' + a + ' ใช่หรือไม่?')) {
        var successFunc = function (result) {
            AlertSuccess(result.code+" "+result.message);
            DrugHistory_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxDeleteRequest(apisite + DrugHistory_API + a, null, successFunc, AlertDanger);
    }
}

//================= File Upload =========================================



//================= Multi-Selection Function =========================================


