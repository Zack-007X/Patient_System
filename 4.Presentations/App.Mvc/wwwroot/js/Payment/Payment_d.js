var Payment_editMode = "CREATE";
var Payment_API = "/api/v1/Payment/";

//================= Form Data Customizaiton =========================================

function Payment_FeedDataToForm(data) {
$("#Payment_id").val(data.id);
DropDownClearFormAndFeedWithData($("#Payment_repairId"), data, "id", "repairCode", "item_repairId", data.repairId);
$("#Payment_amountEA").val(data.amountEA);
$("#Payment_documentCode").val(data.documentCode);
$("#Payment_paymentMethod").val(data.paymentMethod);
$("#Payment_exchangeItems").val(data.exchangeItems);
$("#Payment_paymentDate").val(formatDate(data.paymentDate));
$("#Payment_paymentNote").val(data.paymentNote);


    $('input[type="text"][oninput="formatInputNumber(this)"]').trigger('input');
}

function Payment_GetFromForm() {
    var PaymentObject = new Object();
PaymentObject.id = $("#Payment_id").val();
PaymentObject.repairId = $("#Payment_repairId").val();
PaymentObject.amountEA = $("#Payment_amountEA").val();
PaymentObject.documentCode = $("#Payment_documentCode").val();
PaymentObject.paymentMethod = $("#Payment_paymentMethod").val();
PaymentObject.exchangeItems = $("#Payment_exchangeItems").val();
PaymentObject.paymentDate = getDate($("#Payment_paymentDate").val());
PaymentObject.paymentNote = $("#Payment_paymentNote").val();


    return PaymentObject;
}

function Payment_InitialForm() {
    var successFunc = function (result) {
        Payment_FeedDataToForm(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + Payment_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Form Mode Setup and Flow =========================================

function Payment_SetEditForm(a) {
    var successFunc = function (result) {
        Payment_editMode = "UPDATE";
        Payment_FeedDataToForm(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + Payment_API + a, successFunc, AlertDanger);
}

function Payment_SetCreateForm() {
    Payment_editMode = "CREATE";
	Payment_InitialForm();
}

//================= Update and Delete =========================================

var Payment_customValidation = function (group) {
    return "";
};

function Payment_PutUpdate() {
	if (!ValidateForm('Payment', Payment_customValidation))
    {
        return;
    }
    var data = Payment_GetFromForm();

    //Update Mode
    if (Payment_editMode === "UPDATE") {
        var successFunc1 = function (result) {
            AlertSuccess(result.code+" "+result.message);
			endLoad();
        };
		startLoad();
        AjaxPutRequest(apisite + Payment_API + data.id, data, successFunc1, AlertDanger);
    }
    // Create mode
    else {
        var successFunc2 = function (result) {
            AlertSuccess(result.code+" "+result.message);
			endLoad();
        };
		startLoad();
        AjaxPostRequest(apisite + Payment_API, data, successFunc2, AlertDanger);
    }
}

function Payment_GoDelete(a) {
    if (confirm('คุณต้องการลบ ' + a + ' ใช่หรือไม่?')) {
        var successFunc = function (result) {
            AlertSuccess(result.code+" "+result.message);
            Payment_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxDeleteRequest(apisite + Payment_API + a, null, successFunc, AlertDanger);
    }
}

//================= File Upload =========================================



//================= Multi-Selection Function =========================================


