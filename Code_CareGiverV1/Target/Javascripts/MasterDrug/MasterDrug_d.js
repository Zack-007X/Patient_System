var MasterDrug_editMode = "CREATE";
var MasterDrug_API = "/api/v1/MasterDrug/";

//================= Form Data Customizaiton =========================================

function MasterDrug_FeedDataToForm(data) {
$("#MasterDrug_id").val(data.id);
$("#MasterDrug_code").val(data.code);
$("#MasterDrug_name").val(data.name);
$("#MasterDrug_dosage").val(data.dosage);
$("#MasterDrug_remark").val(data.remark);
$("#MasterDrug_details").val(data.details);


    $('input[type="text"][oninput="formatInputNumber(this)"]').trigger('input');
}

function MasterDrug_GetFromForm() {
    var MasterDrugObject = new Object();
MasterDrugObject.id = $("#MasterDrug_id").val();
MasterDrugObject.code = $("#MasterDrug_code").val();
MasterDrugObject.name = $("#MasterDrug_name").val();
MasterDrugObject.dosage = $("#MasterDrug_dosage").val();
MasterDrugObject.remark = $("#MasterDrug_remark").val();
MasterDrugObject.details = $("#MasterDrug_details").val();


    return MasterDrugObject;
}

function MasterDrug_InitialForm() {
    var successFunc = function (result) {
        MasterDrug_FeedDataToForm(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + MasterDrug_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Form Mode Setup and Flow =========================================

function MasterDrug_SetEditForm(a) {
    var successFunc = function (result) {
        MasterDrug_editMode = "UPDATE";
        MasterDrug_FeedDataToForm(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + MasterDrug_API + a, successFunc, AlertDanger);
}

function MasterDrug_SetCreateForm() {
    MasterDrug_editMode = "CREATE";
	MasterDrug_InitialForm();
}

//================= Update and Delete =========================================

var MasterDrug_customValidation = function (group) {
    return "";
};

function MasterDrug_PutUpdate() {
	if (!ValidateForm('MasterDrug', MasterDrug_customValidation))
    {
        return;
    }
    var data = MasterDrug_GetFromForm();

    //Update Mode
    if (MasterDrug_editMode === "UPDATE") {
        var successFunc1 = function (result) {
            AlertSuccess(result.code+" "+result.message);
			endLoad();
        };
		startLoad();
        AjaxPutRequest(apisite + MasterDrug_API + data.id, data, successFunc1, AlertDanger);
    }
    // Create mode
    else {
        var successFunc2 = function (result) {
            AlertSuccess(result.code+" "+result.message);
			endLoad();
        };
		startLoad();
        AjaxPostRequest(apisite + MasterDrug_API, data, successFunc2, AlertDanger);
    }
}

function MasterDrug_GoDelete(a) {
    if (confirm('คุณต้องการลบ ' + a + ' ใช่หรือไม่?')) {
        var successFunc = function (result) {
            AlertSuccess(result.code+" "+result.message);
            MasterDrug_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxDeleteRequest(apisite + MasterDrug_API + a, null, successFunc, AlertDanger);
    }
}

//================= File Upload =========================================



//================= Multi-Selection Function =========================================


