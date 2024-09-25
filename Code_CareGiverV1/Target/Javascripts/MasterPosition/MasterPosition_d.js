var MasterPosition_editMode = "CREATE";
var MasterPosition_API = "/api/v1/MasterPosition/";

//================= Form Data Customizaiton =========================================

function MasterPosition_FeedDataToForm(data) {
$("#MasterPosition_id").val(data.id);
$("#MasterPosition_code").val(data.code);
$("#MasterPosition_name").val(data.name);
$("#MasterPosition_remark").val(data.remark);


    $('input[type="text"][oninput="formatInputNumber(this)"]').trigger('input');
}

function MasterPosition_GetFromForm() {
    var MasterPositionObject = new Object();
MasterPositionObject.id = $("#MasterPosition_id").val();
MasterPositionObject.code = $("#MasterPosition_code").val();
MasterPositionObject.name = $("#MasterPosition_name").val();
MasterPositionObject.remark = $("#MasterPosition_remark").val();


    return MasterPositionObject;
}

function MasterPosition_InitialForm() {
    var successFunc = function (result) {
        MasterPosition_FeedDataToForm(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + MasterPosition_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Form Mode Setup and Flow =========================================

function MasterPosition_SetEditForm(a) {
    var successFunc = function (result) {
        MasterPosition_editMode = "UPDATE";
        MasterPosition_FeedDataToForm(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + MasterPosition_API + a, successFunc, AlertDanger);
}

function MasterPosition_SetCreateForm() {
    MasterPosition_editMode = "CREATE";
	MasterPosition_InitialForm();
}

//================= Update and Delete =========================================

var MasterPosition_customValidation = function (group) {
    return "";
};

function MasterPosition_PutUpdate() {
	if (!ValidateForm('MasterPosition', MasterPosition_customValidation))
    {
        return;
    }
    var data = MasterPosition_GetFromForm();

    //Update Mode
    if (MasterPosition_editMode === "UPDATE") {
        var successFunc1 = function (result) {
            AlertSuccess(result.code+" "+result.message);
			endLoad();
        };
		startLoad();
        AjaxPutRequest(apisite + MasterPosition_API + data.id, data, successFunc1, AlertDanger);
    }
    // Create mode
    else {
        var successFunc2 = function (result) {
            AlertSuccess(result.code+" "+result.message);
			endLoad();
        };
		startLoad();
        AjaxPostRequest(apisite + MasterPosition_API, data, successFunc2, AlertDanger);
    }
}

function MasterPosition_GoDelete(a) {
    if (confirm('คุณต้องการลบ ' + a + ' ใช่หรือไม่?')) {
        var successFunc = function (result) {
            AlertSuccess(result.code+" "+result.message);
            MasterPosition_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxDeleteRequest(apisite + MasterPosition_API + a, null, successFunc, AlertDanger);
    }
}

//================= File Upload =========================================



//================= Multi-Selection Function =========================================


