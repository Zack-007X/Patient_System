var RoleHasPermission_editMode = "CREATE";
var RoleHasPermission_API = "/api/v1/RoleHasPermission/";

//================= Form Data Customizaiton =========================================

function RoleHasPermission_FeedDataToForm(data) {
$("#RoleHasPermission_id").val(data.id);
DropDownClearFormAndFeedWithData($("#RoleHasPermission_masterRoleId"), data, "id", "name", "item_masterRoleId", data.masterRoleId);
DropDownClearFormAndFeedWithData($("#RoleHasPermission_masterPermissionId"), data, "id", "name", "item_masterPermissionId", data.masterPermissionId);
$("#RoleHasPermission_create").val(data.create);
$("#RoleHasPermission_read").val(data.read);
$("#RoleHasPermission_update").val(data.update);
$("#RoleHasPermission_delete").val(data.delete);
$("#RoleHasPermission_remark").val(data.remark);


    $('input[type="text"][oninput="formatInputNumber(this)"]').trigger('input');
}

function RoleHasPermission_GetFromForm() {
    var RoleHasPermissionObject = new Object();
RoleHasPermissionObject.id = $("#RoleHasPermission_id").val();
RoleHasPermissionObject.masterRoleId = $("#RoleHasPermission_masterRoleId").val();
RoleHasPermissionObject.masterPermissionId = $("#RoleHasPermission_masterPermissionId").val();
RoleHasPermissionObject.create = $("#RoleHasPermission_create").val();
RoleHasPermissionObject.read = $("#RoleHasPermission_read").val();
RoleHasPermissionObject.update = $("#RoleHasPermission_update").val();
RoleHasPermissionObject.delete = $("#RoleHasPermission_delete").val();
RoleHasPermissionObject.remark = $("#RoleHasPermission_remark").val();


    return RoleHasPermissionObject;
}

function RoleHasPermission_InitialForm() {
    var successFunc = function (result) {
        RoleHasPermission_FeedDataToForm(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + RoleHasPermission_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Form Mode Setup and Flow =========================================

function RoleHasPermission_SetEditForm(a) {
    var successFunc = function (result) {
        RoleHasPermission_editMode = "UPDATE";
        RoleHasPermission_FeedDataToForm(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + RoleHasPermission_API + a, successFunc, AlertDanger);
}

function RoleHasPermission_SetCreateForm() {
    RoleHasPermission_editMode = "CREATE";
	RoleHasPermission_InitialForm();
}

//================= Update and Delete =========================================

var RoleHasPermission_customValidation = function (group) {
    return "";
};

function RoleHasPermission_PutUpdate() {
	if (!ValidateForm('RoleHasPermission', RoleHasPermission_customValidation))
    {
        return;
    }
    var data = RoleHasPermission_GetFromForm();

    //Update Mode
    if (RoleHasPermission_editMode === "UPDATE") {
        var successFunc1 = function (result) {
            AlertSuccess(result.code+" "+result.message);
			endLoad();
        };
		startLoad();
        AjaxPutRequest(apisite + RoleHasPermission_API + data.id, data, successFunc1, AlertDanger);
    }
    // Create mode
    else {
        var successFunc2 = function (result) {
            AlertSuccess(result.code+" "+result.message);
			endLoad();
        };
		startLoad();
        AjaxPostRequest(apisite + RoleHasPermission_API, data, successFunc2, AlertDanger);
    }
}

function RoleHasPermission_GoDelete(a) {
    if (confirm('คุณต้องการลบ ' + a + ' ใช่หรือไม่?')) {
        var successFunc = function (result) {
            AlertSuccess(result.code+" "+result.message);
            RoleHasPermission_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxDeleteRequest(apisite + RoleHasPermission_API + a, null, successFunc, AlertDanger);
    }
}

//================= File Upload =========================================



//================= Multi-Selection Function =========================================


