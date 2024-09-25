var UserHasSpecial_editMode = "CREATE";
var UserHasSpecial_API = "/api/v1/UserHasSpecial/";

//================= Form Data Customizaiton =========================================

function UserHasSpecial_FeedDataToForm(data) {
$("#UserHasSpecial_id").val(data.id);
DropDownClearFormAndFeedWithData($("#UserHasSpecial_masterRoleId"), data, "id", "name", "item_masterRoleId", data.masterRoleId);
$("#UserHasSpecial_specialSkill").val(data.specialSkill);
$("#UserHasSpecial_remark").val(data.remark);


    $('input[type="text"][oninput="formatInputNumber(this)"]').trigger('input');
}

function UserHasSpecial_GetFromForm() {
    var UserHasSpecialObject = new Object();
UserHasSpecialObject.id = $("#UserHasSpecial_id").val();
UserHasSpecialObject.masterRoleId = $("#UserHasSpecial_masterRoleId").val();
UserHasSpecialObject.specialSkill = $("#UserHasSpecial_specialSkill").val();
UserHasSpecialObject.remark = $("#UserHasSpecial_remark").val();


    return UserHasSpecialObject;
}

function UserHasSpecial_InitialForm() {
    var successFunc = function (result) {
        UserHasSpecial_FeedDataToForm(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + UserHasSpecial_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Form Mode Setup and Flow =========================================

function UserHasSpecial_SetEditForm(a) {
    var successFunc = function (result) {
        UserHasSpecial_editMode = "UPDATE";
        UserHasSpecial_FeedDataToForm(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + UserHasSpecial_API + a, successFunc, AlertDanger);
}

function UserHasSpecial_SetCreateForm() {
    UserHasSpecial_editMode = "CREATE";
	UserHasSpecial_InitialForm();
}

//================= Update and Delete =========================================

var UserHasSpecial_customValidation = function (group) {
    return "";
};

function UserHasSpecial_PutUpdate() {
	if (!ValidateForm('UserHasSpecial', UserHasSpecial_customValidation))
    {
        return;
    }
    var data = UserHasSpecial_GetFromForm();

    //Update Mode
    if (UserHasSpecial_editMode === "UPDATE") {
        var successFunc1 = function (result) {
            AlertSuccess(result.code+" "+result.message);
			endLoad();
        };
		startLoad();
        AjaxPutRequest(apisite + UserHasSpecial_API + data.id, data, successFunc1, AlertDanger);
    }
    // Create mode
    else {
        var successFunc2 = function (result) {
            AlertSuccess(result.code+" "+result.message);
			endLoad();
        };
		startLoad();
        AjaxPostRequest(apisite + UserHasSpecial_API, data, successFunc2, AlertDanger);
    }
}

function UserHasSpecial_GoDelete(a) {
    if (confirm('คุณต้องการลบ ' + a + ' ใช่หรือไม่?')) {
        var successFunc = function (result) {
            AlertSuccess(result.code+" "+result.message);
            UserHasSpecial_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxDeleteRequest(apisite + UserHasSpecial_API + a, null, successFunc, AlertDanger);
    }
}

//================= File Upload =========================================



//================= Multi-Selection Function =========================================


