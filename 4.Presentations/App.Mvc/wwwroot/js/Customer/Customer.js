var Customer_editMode = "CREATE";
var Customer_API = "/api/v1/Customer/";

//================= Search Customizaiton =========================================

function Customer_GetSearchParameter() {
    var CustomerSearchObject = new Object();
CustomerSearchObject.name = $("#s_Customer_name").val();

    return CustomerSearchObject;
}

function Customer_FeedDataToSearchForm(data) {
$("#s_Customer_name").val(data.name);

}

//================= Form Data Customizaiton =========================================

function Customer_FeedDataToForm(data) {
$("#Customer_id").val(data.id);
$("#Customer_name").val(data.name);
$("#Customer_contactInfo").val(data.contactInfo);
$("#Customer_address").val(data.address);
$("#Customer_username").val(data.username);
$("#Customer_password").val(data.password);

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

function Customer_InitialForm(s) {
    var successFunc = function (result) {
        Customer_FeedDataToForm(result);
		Customer_FeedDataToSearchForm(result);
        if (s) {
            // Incase model popup
            $("#CustomerModel").modal("show");
        }
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + Customer_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Form Mode Setup and Flow =========================================

function Customer_GoCreate() {
    // Incase model popup
    Customer_SetCreateForm(true);

    // Incase open new page
    //window_open(appsite + "/CustomerView/Customer_d");
}

function Customer_GoEdit(a) {
    // Incase model popup
    Customer_SetEditForm(a);

    // Incase open new page
    //window_open(appsite + "/CustomerView/Customer_d?id=" + a);
}

function Customer_SetEditForm(a) {
    var successFunc = function (result) {
        Customer_editMode = "UPDATE";
        Customer_FeedDataToForm(result);
        $("#CustomerModel").modal("show");
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + Customer_API + a, successFunc, AlertDanger);
}

function Customer_SetCreateForm(s) {
    Customer_editMode = "CREATE";
	Customer_InitialForm(s);
}

function Customer_RefreshTable() {
    // Incase model popup
    Customer_DoSearch();

    // Incase open new page
    //window.parent.Customer_DoSearch();
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
            $("#CustomerModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            Customer_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxPutRequest(apisite + Customer_API + data.id, data, successFunc1, AlertDanger);
    }
    // Create mode
    else {
        var successFunc2 = function (result) {
            $("#CustomerModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            Customer_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxPostRequest(apisite + Customer_API, data, successFunc2, AlertDanger);
    }
}

function Customer_GoDelete(a) {
    if (confirm('คุณต้องการลบข้อมูล ใช่หรือไม่?')) {
        var successFunc = function (result) {
            $("#CustomerModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            Customer_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxDeleteRequest(apisite + Customer_API + a, null, successFunc, AlertDanger);
    }
}

//================= Data Table =========================================

var CustomerTableV;

var Customer_setupTable = function (result) {
	tmp = '"';
    CustomerTableV = $('#CustomerTable').DataTable({
        "processing": true,
        "serverSide": false,
        "data": result,
		//"select": {
        //    "style": 'multi'
        //},
        "columns": [
		//{ "data": "" },
		{ "data": "id" },
                { "data": "name" },
                { "data": "contactInfo" },
                { "data": "address" },
                { "data": "username" },            
        ],
        "columnDefs": [
            {
                "targets": 0, //1,
                "data": "id",
                "render": function (data, type, row, meta) {
                    return "<button type='button' class='btn btn-warning btn-sm' onclick='javascript:Customer_GoEdit(" + tmp + data + tmp + ")'><i class='fa fa-pencil-alt'></i></button> <button type='button' class='btn btn-danger btn-sm' onclick='javascript:Customer_GoDelete(" + tmp + data + tmp + ")'><i class='fa fa-trash-alt'></i></button> ";
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

function Customer_InitiateDataTable() {
	startLoad();
	var p = $.param(Customer_GetSearchParameter());
    AjaxGetRequest(apisite + "/api/v1/Customer/GetListBySearch?"+p, Customer_setupTable, AlertDanger);
}

function Customer_DoSearch() {
    var p = $.param(Customer_GetSearchParameter());
    var Customer_reload = function (result) {
        CustomerTableV.destroy();
        Customer_setupTable(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + "/api/v1/Customer/GetListBySearch?"+p, Customer_reload, AlertDanger);
}

function Customer_GetSelect(f) {
    var Customer_selectitem = [];
    $.each(CustomerTableV.rows('.selected').data(), function (key, value) {
        Customer_selectitem.push(value[f]);
    });
    alert(Customer_selectitem);
}

//================= File Upload =========================================



//================= Multi-Selection Function =========================================



