var MasterPermission_editMode = "CREATE";
var MasterPermission_API = "/api/v1/MasterPermission/";

//================= Form Data Customizaiton =========================================

function MasterPermission_FeedDataToForm(data) {
$("#MasterPermission_id").val(data.id);
$("#MasterPermission_code").val(data.code);
$("#MasterPermission_name").val(data.name);
$("#MasterPermission_remark").val(data.remark);


    $('input[type="text"][oninput="formatInputNumber(this)"]').trigger('input');
}

function MasterPermission_GetFromForm() {
    var MasterPermissionObject = new Object();
MasterPermissionObject.id = $("#MasterPermission_id").val();
MasterPermissionObject.code = $("#MasterPermission_code").val();
MasterPermissionObject.name = $("#MasterPermission_name").val();
MasterPermissionObject.remark = $("#MasterPermission_remark").val();


    return MasterPermissionObject;
}

function MasterPermission_InitialForm() {
    var successFunc = function (result) {
        MasterPermission_FeedDataToForm(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + MasterPermission_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Form Mode Setup and Flow =========================================

function MasterPermission_SetEditForm(a) {
    var successFunc = function (result) {
        MasterPermission_editMode = "UPDATE";
        MasterPermission_FeedDataToForm(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + MasterPermission_API + a, successFunc, AlertDanger);
}

function MasterPermission_SetCreateForm() {
    MasterPermission_editMode = "CREATE";
	MasterPermission_InitialForm();
}

//================= Update and Delete =========================================

var MasterPermission_customValidation = function (group) {
    return "";
};

function MasterPermission_PutUpdate() {
	if (!ValidateForm('MasterPermission', MasterPermission_customValidation))
    {
        return;
    }
    var data = MasterPermission_GetFromForm();

    //Update Mode
    if (MasterPermission_editMode === "UPDATE") {
        var successFunc1 = function (result) {
            AlertSuccess(result.code+" "+result.message);
			endLoad();
        };
		startLoad();
        AjaxPutRequest(apisite + MasterPermission_API + data.id, data, successFunc1, AlertDanger);
    }
    // Create mode
    else {
        var successFunc2 = function (result) {
            AlertSuccess(result.code+" "+result.message);
			endLoad();
        };
		startLoad();
        AjaxPostRequest(apisite + MasterPermission_API, data, successFunc2, AlertDanger);
    }
}

function MasterPermission_GoDelete(a) {
    if (confirm('คุณต้องการลบ ' + a + ' ใช่หรือไม่?')) {
        var successFunc = function (result) {
            AlertSuccess(result.code+" "+result.message);
            MasterPermission_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxDeleteRequest(apisite + MasterPermission_API + a, null, successFunc, AlertDanger);
    }
}

//================= File Upload =========================================



//================= Multi-Selection Function =========================================


