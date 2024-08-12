var Payment_editMode = "CREATE";
var Payment_API = "/api/v1/Payment/";

//================= Search Customizaiton =========================================

function Payment_GetSearchParameter() {
    var PaymentSearchObject = new Object();
PaymentSearchObject.documentCode = $("#s_Payment_documentCode").val();

    return PaymentSearchObject;
}

function Payment_FeedDataToSearchForm(data) {
$("#s_Payment_documentCode").val(data.documentCode);

}

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

function Payment_InitialForm(s) {
    var successFunc = function (result) {
        Payment_FeedDataToForm(result);
		Payment_FeedDataToSearchForm(result);
        if (s) {
            // Incase model popup
            $("#PaymentModel").modal("show");
        }
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + Payment_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Form Mode Setup and Flow =========================================

function Payment_GoCreate() {
    // Incase model popup
    Payment_SetCreateForm(true);

    // Incase open new page
    //window_open(appsite + "/PaymentView/Payment_d");
}

function Payment_GoEdit(a) {
    // Incase model popup
    Payment_SetEditForm(a);

    // Incase open new page
    //window_open(appsite + "/PaymentView/Payment_d?id=" + a);
}

function Payment_SetEditForm(a) {
    var successFunc = function (result) {
        Payment_editMode = "UPDATE";
        Payment_FeedDataToForm(result);
        $("#PaymentModel").modal("show");
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + Payment_API + a, successFunc, AlertDanger);
}

function Payment_SetCreateForm(s) {
    Payment_editMode = "CREATE";
	Payment_InitialForm(s);
}

function Payment_RefreshTable() {
    // Incase model popup
    Payment_DoSearch();

    // Incase open new page
    //window.parent.Payment_DoSearch();
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
            $("#PaymentModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            Payment_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxPutRequest(apisite + Payment_API + data.id, data, successFunc1, AlertDanger);
    }
    // Create mode
    else {
        var successFunc2 = function (result) {
            $("#PaymentModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            Payment_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxPostRequest(apisite + Payment_API, data, successFunc2, AlertDanger);
    }
}

function Payment_GoDelete(a) {
    if (confirm('คุณต้องการลบข้อมูล ใช่หรือไม่?')) {
        var successFunc = function (result) {
            $("#PaymentModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            Payment_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxDeleteRequest(apisite + Payment_API + a, null, successFunc, AlertDanger);
    }
}

//================= Data Table =========================================

var PaymentTableV;

var Payment_setupTable = function (result) {
	tmp = '"';
    PaymentTableV = $('#PaymentTable').DataTable({
        "processing": true,
        "serverSide": false,
        "data": result,
		//"select": {
        //    "style": 'multi'
        //},
        "columns": [
		//{ "data": "" },
		{ "data": "id" },
                { "data": "repairId_Repair_repairCode" },
                { "data": "amountEA" },
                { "data": "documentCode" },
                { "data": "paymentMethod" },
                { "data": "exchangeItems" },
                { "data": "txt_paymentDate" },
                { "data": "paymentNote" },            
        ],
        "columnDefs": [
            {
                "targets": 0, //1,
                "data": "id",
                "render": function (data, type, row, meta) {
                    return "<button type='button' class='btn btn-warning btn-sm' onclick='javascript:Payment_GoEdit(" + tmp + data + tmp + ")'><i class='fa fa-pencil-alt'></i></button> <button type='button' class='btn btn-danger btn-sm' onclick='javascript:Payment_GoDelete(" + tmp + data + tmp + ")'><i class='fa fa-trash-alt'></i></button> ";
                }
            },
            //{
            //    targets: 0,
            //    data: "",
            //    defaultContent: '',
            //    orderable: false,
            //    className: 'select-checkbox'
            //}
            ],
        "language": {
            "url": appsite + "/DataTables-1.10.16/thai.json"
        },
        "paging": true,
		"searching": false
    });
	endLoad();
};

function Payment_InitiateDataTable() {
	startLoad();
	var p = $.param(Payment_GetSearchParameter());
    AjaxGetRequest(apisite + "/api/v1/Payment/GetListBySearch?"+p, Payment_setupTable, AlertDanger);
}

function Payment_DoSearch() {
    var p = $.param(Payment_GetSearchParameter());
    var Payment_reload = function (result) {
        PaymentTableV.destroy();
        Payment_setupTable(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + "/api/v1/Payment/GetListBySearch?"+p, Payment_reload, AlertDanger);
}

function Payment_GetSelect(f) {
    var Payment_selectitem = [];
    $.each(PaymentTableV.rows('.selected').data(), function (key, value) {
        Payment_selectitem.push(value[f]);
    });
    alert(Payment_selectitem);
}

//================= File Upload =========================================



//================= Multi-Selection Function =========================================



