var Repair_editMode = "CREATE";
var Repair_API = "/api/v1/Repair/";

//================= Search Customizaiton =========================================

function Repair_GetSearchParameter() {
    var RepairSearchObject = new Object();
RepairSearchObject.bookingId = $("#s_Repair_bookingId").val();
RepairSearchObject.repairCode = $("#s_Repair_repairCode").val();
RepairSearchObject.technicianId = $("#s_Repair_technicianId").val();
RepairSearchObject.startDate = formatDateForGetParameter(getDate($("#s_Repair_startDate").val()));
RepairSearchObject.endDate = formatDateForGetParameter(getDate($("#s_Repair_endDate").val()));

    return RepairSearchObject;
}

function Repair_FeedDataToSearchForm(data) {
DropDownClearFormAndFeedWithData($("#s_Repair_bookingId"), data, "id", "bookingNumber", "item_bookingId", data.bookingId);
$("#s_Repair_repairCode").val(data.repairCode);
DropDownClearFormAndFeedWithData($("#s_Repair_technicianId"), data, "id", "nickname", "item_technicianId", data.technicianId);
$("#s_Repair_startDate").val(formatDate(data.startDate));
$("#s_Repair_endDate").val(formatDate(data.endDate));

}

//================= Form Data Customizaiton =========================================

function Repair_FeedDataToForm(data) {
$("#Repair_id").val(data.id);
DropDownClearFormAndFeedWithData($("#Repair_bookingId"), data, "id", "bookingNumber", "item_bookingId", data.bookingId);
$("#Repair_repairCode").val(data.repairCode);
DropDownClearFormAndFeedWithData($("#Repair_technicianId"), data, "id", "nickname", "item_technicianId", data.technicianId);
$("#Repair_startDate").val(formatDate(data.startDate));
$("#Repair_endDate").val(formatDate(data.endDate));
$("#Repair_totalCostEA").val(data.totalCostEA);
$("#Repair_repairNote").val(data.repairNote);

}

function Repair_GetFromForm() {
    var RepairObject = new Object();
RepairObject.id = $("#Repair_id").val();
RepairObject.bookingId = $("#Repair_bookingId").val();
RepairObject.repairCode = $("#Repair_repairCode").val();
RepairObject.technicianId = $("#Repair_technicianId").val();
RepairObject.startDate = getDate($("#Repair_startDate").val());
RepairObject.endDate = getDate($("#Repair_endDate").val());
RepairObject.totalCostEA = $("#Repair_totalCostEA").val();
RepairObject.repairNote = $("#Repair_repairNote").val();


    return RepairObject;
}

function Repair_InitialForm(s) {
    var successFunc = function (result) {
        Repair_FeedDataToForm(result);
		Repair_FeedDataToSearchForm(result);
        if (s) {
            // Incase model popup
            $("#RepairModel").modal("show");
        }
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + Repair_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Form Mode Setup and Flow =========================================

function Repair_GoCreate() {
    // Incase model popup
    Repair_SetCreateForm(true);

    // Incase open new page
    //window_open(appsite + "/RepairView/Repair_d");
}

function Repair_GoEdit(a) {
    // Incase model popup
    Repair_SetEditForm(a);

    // Incase open new page
    //window_open(appsite + "/RepairView/Repair_d?id=" + a);
}

function Repair_SetEditForm(a) {
    var successFunc = function (result) {
        Repair_editMode = "UPDATE";
        Repair_FeedDataToForm(result);
        $("#RepairModel").modal("show");
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + Repair_API + a, successFunc, AlertDanger);
}

function Repair_SetCreateForm(s) {
    Repair_editMode = "CREATE";
	Repair_InitialForm(s);
}

function Repair_RefreshTable() {
    // Incase model popup
    Repair_DoSearch();

    // Incase open new page
    //window.parent.Repair_DoSearch();
}

//================= Update and Delete =========================================

var Repair_customValidation = function (group) {
    return "";
};

function Repair_PutUpdate() {
	if (!ValidateForm('Repair', Repair_customValidation))
    {
        return;
    }

    var data = Repair_GetFromForm();

    //Update Mode
    if (Repair_editMode === "UPDATE") {
        var successFunc1 = function (result) {
            $("#RepairModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            Repair_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxPutRequest(apisite + Repair_API + data.id, data, successFunc1, AlertDanger);
    }
    // Create mode
    else {
        var successFunc2 = function (result) {
            $("#RepairModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            Repair_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxPostRequest(apisite + Repair_API, data, successFunc2, AlertDanger);
    }
}

function Repair_GoDelete(a) {
    if (confirm('คุณต้องการลบข้อมูล ใช่หรือไม่?')) {
        var successFunc = function (result) {
            $("#RepairModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            Repair_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxDeleteRequest(apisite + Repair_API + a, null, successFunc, AlertDanger);
    }
}

//================= Data Table =========================================

var RepairTableV;

var Repair_setupTable = function (result) {
	tmp = '"';
    RepairTableV = $('#RepairTable').DataTable({
        "processing": true,
        "serverSide": false,
        "data": result,
		//"select": {
        //    "style": 'multi'
        //},
        "columns": [
		//{ "data": "" },
		{ "data": "id" },
                { "data": "bookingId_Booking_bookingNumber" },
                { "data": "repairCode" },
                { "data": "technicianId_User_nickname" },
                { "data": "txt_startDate" },
                { "data": "txt_endDate" },
                { "data": "totalCostEA" },
                { "data": "repairNote" },            
        ],
        "columnDefs": [
            {
                "targets": 0, //1,
                "data": "id",
                "render": function (data, type, row, meta) {
                    return "<button type='button' class='btn btn-warning btn-sm' onclick='javascript:Repair_GoEdit(" + tmp + data + tmp + ")'><i class='fa fa-pencil-alt'></i></button> <button type='button' class='btn btn-danger btn-sm' onclick='javascript:Repair_GoDelete(" + tmp + data + tmp + ")'><i class='fa fa-trash-alt'></i></button> ";
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

function Repair_InitiateDataTable() {
	startLoad();
	var p = $.param(Repair_GetSearchParameter());
    AjaxGetRequest(apisite + "/api/v1/Repair/GetListBySearch?"+p, Repair_setupTable, AlertDanger);
}

function Repair_DoSearch() {
    var p = $.param(Repair_GetSearchParameter());
    var Repair_reload = function (result) {
        RepairTableV.destroy();
        Repair_setupTable(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + "/api/v1/Repair/GetListBySearch?"+p, Repair_reload, AlertDanger);
}

function Repair_GetSelect(f) {
    var Repair_selectitem = [];
    $.each(RepairTableV.rows('.selected').data(), function (key, value) {
        Repair_selectitem.push(value[f]);
    });
    alert(Repair_selectitem);
}

//================= File Upload =========================================



//================= Multi-Selection Function =========================================



