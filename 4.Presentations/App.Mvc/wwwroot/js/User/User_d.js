var User_editMode = "CREATE";
var User_API = "/api/v1/User/";

//================= Form Data Customizaiton =========================================

function User_FeedDataToForm(data) {
$("#User_id").val(data.id);
$("#User_username").val(data.username);
$("#User_passwordHash").val(data.passwordHash);
$("#User_email").val(data.email);
DropDownClearFormAndFeedWithData($("#User_masterPrefixId"), data, "id", "name", "item_masterPrefixId", data.masterPrefixId);
$("#User_firstname").val(data.firstname);
$("#User_lastname").val(data.lastname);
$("#User_telephoneNumber").val(data.telephoneNumber);
DropDownClearFormAndFeedWithData($("#User_masterRoleId"), data, "id", "name", "item_masterRoleId", data.masterRoleId);
$("#User_remark").val(data.remark);


    $('input[type="text"][oninput="formatInputNumber(this)"]').trigger('input');
}

function User_GetFromForm() {
    var UserObject = new Object();
UserObject.id = $("#User_id").val();
UserObject.username = $("#User_username").val();
UserObject.passwordHash = $("#User_passwordHash").val();
UserObject.email = $("#User_email").val();
UserObject.masterPrefixId = $("#User_masterPrefixId").val();
UserObject.firstname = $("#User_firstname").val();
UserObject.lastname = $("#User_lastname").val();
UserObject.telephoneNumber = $("#User_telephoneNumber").val();
UserObject.masterRoleId = $("#User_masterRoleId").val();
UserObject.remark = $("#User_remark").val();


    return UserObject;
}

function User_InitialForm() {
    var successFunc = function (result) {
        User_FeedDataToForm(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + User_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Form Mode Setup and Flow =========================================

function User_SetEditForm(a) {
    var successFunc = function (result) {
        User_editMode = "UPDATE";
        User_FeedDataToForm(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + User_API + a, successFunc, AlertDanger);
}

function User_SetCreateForm() {
    User_editMode = "CREATE";
	User_InitialForm();
}

//================= Update and Delete =========================================

var User_customValidation = function (group) {
    return "";
};

function User_PutUpdate() {
	if (!ValidateForm('User', User_customValidation))
    {
        return;
    }
    var data = User_GetFromForm();

    //Update Mode
    if (User_editMode === "UPDATE") {
        var successFunc1 = function (result) {
            AlertSuccess(result.code+" "+result.message);
			endLoad();
        };
		startLoad();
        AjaxPutRequest(apisite + User_API + data.id, data, successFunc1, AlertDanger);
    }
    // Create mode
    else {
        var successFunc2 = function (result) {
            AlertSuccess(result.code+" "+result.message);
			endLoad();
        };
		startLoad();
        AjaxPostRequest(apisite + User_API, data, successFunc2, AlertDanger);
    }
}

function User_GoDelete(a) {
    if (confirm('คุณต้องการลบ ' + a + ' ใช่หรือไม่?')) {
        var successFunc = function (result) {
            AlertSuccess(result.code+" "+result.message);
            User_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxDeleteRequest(apisite + User_API + a, null, successFunc, AlertDanger);
    }
}

//================= File Upload =========================================



//================= Multi-Selection Function =========================================


