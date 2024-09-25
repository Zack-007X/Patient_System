var Patient_editMode = "CREATE";
var Patient_API = "/api/v1/Patient/";

//================= Form Data Customizaiton =========================================

function Patient_FeedDataToForm(data) {
$("#Patient_id").val(data.id);
DropDownClearFormAndFeedWithData($("#Patient_masterPrefixId"), data, "id", "name", "item_masterPrefixId", data.masterPrefixId);
$("#Patient_firstname").val(data.firstname);
$("#Patient_lastname").val(data.lastname);
$("#Patient_brithDate").val(formatDate(data.brithDate));
DropDownClearFormAndFeedWithData($("#Patient_masterGenderId"), data, "id", "name", "item_masterGenderId", data.masterGenderId);
$("#Patient_age").val(data.age);
$("#Patient_height").val(data.height);
$("#Patient_weight").val(data.weight);
$("#Patient_telephoneNumber").val(data.telephoneNumber);
$("#Patient_relativeName").val(data.relativeName);
$("#Patient_relativeContract").val(data.relativeContract);
$("#Patient_remark").val(data.remark);


    $('input[type="text"][oninput="formatInputNumber(this)"]').trigger('input');
}

function Patient_GetFromForm() {
    var PatientObject = new Object();
PatientObject.id = $("#Patient_id").val();
PatientObject.masterPrefixId = $("#Patient_masterPrefixId").val();
PatientObject.firstname = $("#Patient_firstname").val();
PatientObject.lastname = $("#Patient_lastname").val();
PatientObject.brithDate = getDate($("#Patient_brithDate").val());
PatientObject.masterGenderId = $("#Patient_masterGenderId").val();
PatientObject.age = $("#Patient_age").val();
PatientObject.height = $("#Patient_height").val();
PatientObject.weight = $("#Patient_weight").val();
PatientObject.telephoneNumber = $("#Patient_telephoneNumber").val();
PatientObject.relativeName = $("#Patient_relativeName").val();
PatientObject.relativeContract = $("#Patient_relativeContract").val();
PatientObject.remark = $("#Patient_remark").val();


    return PatientObject;
}

function Patient_InitialForm() {
    var successFunc = function (result) {
        Patient_FeedDataToForm(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + Patient_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Form Mode Setup and Flow =========================================

function Patient_SetEditForm(a) {
    var successFunc = function (result) {
        Patient_editMode = "UPDATE";
        Patient_FeedDataToForm(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + Patient_API + a, successFunc, AlertDanger);
}

function Patient_SetCreateForm() {
    Patient_editMode = "CREATE";
	Patient_InitialForm();
}

//================= Update and Delete =========================================

var Patient_customValidation = function (group) {
    return "";
};

function Patient_PutUpdate() {
	if (!ValidateForm('Patient', Patient_customValidation))
    {
        return;
    }
    var data = Patient_GetFromForm();

    //Update Mode
    if (Patient_editMode === "UPDATE") {
        var successFunc1 = function (result) {
            AlertSuccess(result.code+" "+result.message);
			endLoad();
        };
		startLoad();
        AjaxPutRequest(apisite + Patient_API + data.id, data, successFunc1, AlertDanger);
    }
    // Create mode
    else {
        var successFunc2 = function (result) {
            AlertSuccess(result.code+" "+result.message);
			endLoad();
        };
		startLoad();
        AjaxPostRequest(apisite + Patient_API, data, successFunc2, AlertDanger);
    }
}

function Patient_GoDelete(a) {
    if (confirm('คุณต้องการลบ ' + a + ' ใช่หรือไม่?')) {
        var successFunc = function (result) {
            AlertSuccess(result.code+" "+result.message);
            Patient_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxDeleteRequest(apisite + Patient_API + a, null, successFunc, AlertDanger);
    }
}

//================= File Upload =========================================



//================= Multi-Selection Function =========================================


