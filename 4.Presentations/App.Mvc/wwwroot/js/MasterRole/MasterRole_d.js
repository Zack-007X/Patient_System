var MasterRole_editMode = "CREATE";
var MasterRole_API = "/api/v1/MasterRole/";

//================= Form Data Customizaiton =========================================

function MasterRole_FeedDataToForm(data) {
$("#MasterRole_id").val(data.id);
$("#MasterRole_code").val(data.code);
$("#MasterRole_name").val(data.name);
$("#MasterRole_remark").val(data.remark);


    $('input[type="text"][oninput="formatInputNumber(this)"]').trigger('input');
}

function MasterRole_GetFromForm() {
    var MasterRoleObject = new Object();
MasterRoleObject.id = $("#MasterRole_id").val();
MasterRoleObject.code = $("#MasterRole_code").val();
MasterRoleObject.name = $("#MasterRole_name").val();
MasterRoleObject.remark = $("#MasterRole_remark").val();


    return MasterRoleObject;
}

function MasterRole_InitialForm() {
    var successFunc = function (result) {
        MasterRole_FeedDataToForm(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + MasterRole_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Form Mode Setup and Flow =========================================

function MasterRole_SetEditForm(a) {
    var successFunc = function (result) {
        MasterRole_editMode = "UPDATE";
        MasterRole_FeedDataToForm(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + MasterRole_API + a, successFunc, AlertDanger);
}

function MasterRole_SetCreateForm() {
    MasterRole_editMode = "CREATE";
	MasterRole_InitialForm();
}

//================= Update and Delete =========================================

var MasterRole_customValidation = function (group) {
    return "";
};

function MasterRole_PutUpdate() {
	if (!ValidateForm('MasterRole', MasterRole_customValidation))
    {
        return;
    }
    var data = MasterRole_GetFromForm();

    //Update Mode
    if (MasterRole_editMode === "UPDATE") {
        var successFunc1 = function (result) {
            AlertSuccess(result.code+" "+result.message);
			endLoad();
        };
		startLoad();
        AjaxPutRequest(apisite + MasterRole_API + data.id, data, successFunc1, AlertDanger);
    }
    // Create mode
    else {
        var successFunc2 = function (result) {
            AlertSuccess(result.code+" "+result.message);
			endLoad();
        };
		startLoad();
        AjaxPostRequest(apisite + MasterRole_API, data, successFunc2, AlertDanger);
    }
}

function MasterRole_GoDelete(a) {
    if (confirm('คุณต้องการลบ ' + a + ' ใช่หรือไม่?')) {
        var successFunc = function (result) {
            AlertSuccess(result.code+" "+result.message);
            MasterRole_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxDeleteRequest(apisite + MasterRole_API + a, null, successFunc, AlertDanger);
    }
}

//================= File Upload =========================================



//================= Multi-Selection Function =========================================


