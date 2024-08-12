var Customer_editMode = "CREATE";
var Customer_API = "/api/v1/Customer/";

//================= Form Data Customizaiton =========================================

function Customer_FeedDataToForm(data) {
$("#Customer_id").val(data.id);
$("#Customer_name").val(data.name);
$("#Customer_contactInfo").val(data.contactInfo);
$("#Customer_address").val(data.address);
$("#Customer_username").val(data.username);
$("#Customer_password").val(data.password);


    $('input[type="text"][oninput="formatInputNumber(this)"]').trigger('input');
}

function Customer_GetFromForm() {
    var CustomerObject = new Object();
CustomerObject.id = $("#Customer_id").val();
CustomerObject.name = $("#Customer_name").val();
CustomerObject.contactInfo = $("#Customer_contactInfo").val();
CustomerObject.address = $("#Customer_address").val();
CustomerObject.username = $("#Customer_username").val();
CustomerObject.password = $("#Customer_password").val();


    return CustomerObject;
}

function Customer_InitialForm() {
    var successFunc = function (result) {
        Customer_FeedDataToForm(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + Customer_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Form Mode Setup and Flow =========================================

function Customer_SetEditForm(a) {
    var successFunc = function (result) {
        Customer_editMode = "UPDATE";
        Customer_FeedDataToForm(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + Customer_API + a, successFunc, AlertDanger);
}

function Customer_SetCreateForm() {
    Customer_editMode = "CREATE";
	Customer_InitialForm();
}

//================= Update and Delete =========================================

var Customer_customValidation = function (group) {
    return "";
};

function Customer_PutUpdate() {
	if (!ValidateForm('Customer', Customer_customValidation))
    {
        return;
    }
    var data = Customer_GetFromForm();

    //Update Mode
    if (Customer_editMode === "UPDATE") {
        var successFunc1 = function (result) {
            AlertSuccess(result.code+" "+result.message);
			endLoad();
        };
		startLoad();
        AjaxPutRequest(apisite + Customer_API + data.id, data, successFunc1, AlertDanger);
    }
    // Create mode
    else {
        var successFunc2 = function (result) {
            AlertSuccess(result.code+" "+result.message);
			endLoad();
        };
		startLoad();
        AjaxPostRequest(apisite + Customer_API, data, successFunc2, AlertDanger);
    }
}

function Customer_GoDelete(a) {
    if (confirm('คุณต้องการลบ ' + a + ' ใช่หรือไม่?')) {
        var successFunc = function (result) {
            AlertSuccess(result.code+" "+result.message);
            Customer_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxDeleteRequest(apisite + Customer_API + a, null, successFunc, AlertDanger);
    }
}

//================= File Upload =========================================



//================= Multi-Selection Function =========================================


