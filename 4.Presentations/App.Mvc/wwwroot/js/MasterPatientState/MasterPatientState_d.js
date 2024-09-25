var MasterPatientState_editMode = "CREATE";
var MasterPatientState_API = "/api/v1/MasterPatientState/";

//================= Form Data Customizaiton =========================================

function MasterPatientState_FeedDataToForm(data) {
$("#MasterPatientState_id").val(data.id);
$("#MasterPatientState_code").val(data.code);
$("#MasterPatientState_name").val(data.name);
$("#MasterPatientState_remark").val(data.remark);


    $('input[type="text"][oninput="formatInputNumber(this)"]').trigger('input');
}

function MasterPatientState_GetFromForm() {
    var MasterPatientStateObject = new Object();
MasterPatientStateObject.id = $("#MasterPatientState_id").val();
MasterPatientStateObject.code = $("#MasterPatientState_code").val();
MasterPatientStateObject.name = $("#MasterPatientState_name").val();
MasterPatientStateObject.remark = $("#MasterPatientState_remark").val();


    return MasterPatientStateObject;
}

function MasterPatientState_InitialForm() {
    var successFunc = function (result) {
        MasterPatientState_FeedDataToForm(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + MasterPatientState_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Form Mode Setup and Flow =========================================

function MasterPatientState_SetEditForm(a) {
    var successFunc = function (result) {
        MasterPatientState_editMode = "UPDATE";
        MasterPatientState_FeedDataToForm(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + MasterPatientState_API + a, successFunc, AlertDanger);
}

function MasterPatientState_SetCreateForm() {
    MasterPatientState_editMode = "CREATE";
	MasterPatientState_InitialForm();
}

//================= Update and Delete =========================================

var MasterPatientState_customValidation = function (group) {
    return "";
};

function MasterPatientState_PutUpdate() {
	if (!ValidateForm('MasterPatientState', MasterPatientState_customValidation))
    {
        return;
    }
    var data = MasterPatientState_GetFromForm();

    //Update Mode
    if (MasterPatientState_editMode === "UPDATE") {
        var successFunc1 = function (result) {
            AlertSuccess(result.code+" "+result.message);
			endLoad();
        };
		startLoad();
        AjaxPutRequest(apisite + MasterPatientState_API + data.id, data, successFunc1, AlertDanger);
    }
    // Create mode
    else {
        var successFunc2 = function (result) {
            AlertSuccess(result.code+" "+result.message);
			endLoad();
        };
		startLoad();
        AjaxPostRequest(apisite + MasterPatientState_API, data, successFunc2, AlertDanger);
    }
}

function MasterPatientState_GoDelete(a) {
    if (confirm('คุณต้องการลบ ' + a + ' ใช่หรือไม่?')) {
        var successFunc = function (result) {
            AlertSuccess(result.code+" "+result.message);
            MasterPatientState_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxDeleteRequest(apisite + MasterPatientState_API + a, null, successFunc, AlertDanger);
    }
}

//================= File Upload =========================================



//================= Multi-Selection Function =========================================


