var MasterPrefix_editMode = "CREATE";
var MasterPrefix_API = "/api/v1/MasterPrefix/";

//================= Form Data Customizaiton =========================================

function MasterPrefix_FeedDataToForm(data) {
$("#MasterPrefix_id").val(data.id);
$("#MasterPrefix_code").val(data.code);
$("#MasterPrefix_name").val(data.name);
$("#MasterPrefix_remark").val(data.remark);


    $('input[type="text"][oninput="formatInputNumber(this)"]').trigger('input');
}

function MasterPrefix_GetFromForm() {
    var MasterPrefixObject = new Object();
MasterPrefixObject.id = $("#MasterPrefix_id").val();
MasterPrefixObject.code = $("#MasterPrefix_code").val();
MasterPrefixObject.name = $("#MasterPrefix_name").val();
MasterPrefixObject.remark = $("#MasterPrefix_remark").val();


    return MasterPrefixObject;
}

function MasterPrefix_InitialForm() {
    var successFunc = function (result) {
        MasterPrefix_FeedDataToForm(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + MasterPrefix_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Form Mode Setup and Flow =========================================

function MasterPrefix_SetEditForm(a) {
    var successFunc = function (result) {
        MasterPrefix_editMode = "UPDATE";
        MasterPrefix_FeedDataToForm(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + MasterPrefix_API + a, successFunc, AlertDanger);
}

function MasterPrefix_SetCreateForm() {
    MasterPrefix_editMode = "CREATE";
	MasterPrefix_InitialForm();
}

//================= Update and Delete =========================================

var MasterPrefix_customValidation = function (group) {
    return "";
};

function MasterPrefix_PutUpdate() {
	if (!ValidateForm('MasterPrefix', MasterPrefix_customValidation))
    {
        return;
    }
    var data = MasterPrefix_GetFromForm();

    //Update Mode
    if (MasterPrefix_editMode === "UPDATE") {
        var successFunc1 = function (result) {
            AlertSuccess(result.code+" "+result.message);
			endLoad();
        };
		startLoad();
        AjaxPutRequest(apisite + MasterPrefix_API + data.id, data, successFunc1, AlertDanger);
    }
    // Create mode
    else {
        var successFunc2 = function (result) {
            AlertSuccess(result.code+" "+result.message);
			endLoad();
        };
		startLoad();
        AjaxPostRequest(apisite + MasterPrefix_API, data, successFunc2, AlertDanger);
    }
}

function MasterPrefix_GoDelete(a) {
    if (confirm('คุณต้องการลบ ' + a + ' ใช่หรือไม่?')) {
        var successFunc = function (result) {
            AlertSuccess(result.code+" "+result.message);
            MasterPrefix_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxDeleteRequest(apisite + MasterPrefix_API + a, null, successFunc, AlertDanger);
    }
}

//================= File Upload =========================================



//================= Multi-Selection Function =========================================


