var MasterGender_editMode = "CREATE";
var MasterGender_API = "/api/v1/MasterGender/";

//================= Form Data Customizaiton =========================================

function MasterGender_FeedDataToForm(data) {
$("#MasterGender_id").val(data.id);
$("#MasterGender_code").val(data.code);
$("#MasterGender_name").val(data.name);
$("#MasterGender_remark").val(data.remark);


    $('input[type="text"][oninput="formatInputNumber(this)"]').trigger('input');
}

function MasterGender_GetFromForm() {
    var MasterGenderObject = new Object();
MasterGenderObject.id = $("#MasterGender_id").val();
MasterGenderObject.code = $("#MasterGender_code").val();
MasterGenderObject.name = $("#MasterGender_name").val();
MasterGenderObject.remark = $("#MasterGender_remark").val();


    return MasterGenderObject;
}

function MasterGender_InitialForm() {
    var successFunc = function (result) {
        MasterGender_FeedDataToForm(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + MasterGender_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Form Mode Setup and Flow =========================================

function MasterGender_SetEditForm(a) {
    var successFunc = function (result) {
        MasterGender_editMode = "UPDATE";
        MasterGender_FeedDataToForm(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + MasterGender_API + a, successFunc, AlertDanger);
}

function MasterGender_SetCreateForm() {
    MasterGender_editMode = "CREATE";
	MasterGender_InitialForm();
}

//================= Update and Delete =========================================

var MasterGender_customValidation = function (group) {
    return "";
};

function MasterGender_PutUpdate() {
	if (!ValidateForm('MasterGender', MasterGender_customValidation))
    {
        return;
    }
    var data = MasterGender_GetFromForm();

    //Update Mode
    if (MasterGender_editMode === "UPDATE") {
        var successFunc1 = function (result) {
            AlertSuccess(result.code+" "+result.message);
			endLoad();
        };
		startLoad();
        AjaxPutRequest(apisite + MasterGender_API + data.id, data, successFunc1, AlertDanger);
    }
    // Create mode
    else {
        var successFunc2 = function (result) {
            AlertSuccess(result.code+" "+result.message);
			endLoad();
        };
		startLoad();
        AjaxPostRequest(apisite + MasterGender_API, data, successFunc2, AlertDanger);
    }
}

function MasterGender_GoDelete(a) {
    if (confirm('คุณต้องการลบ ' + a + ' ใช่หรือไม่?')) {
        var successFunc = function (result) {
            AlertSuccess(result.code+" "+result.message);
            MasterGender_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxDeleteRequest(apisite + MasterGender_API + a, null, successFunc, AlertDanger);
    }
}

//================= File Upload =========================================



//================= Multi-Selection Function =========================================


