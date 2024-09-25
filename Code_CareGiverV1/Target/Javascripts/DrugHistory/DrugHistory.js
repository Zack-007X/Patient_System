var DrugHistory_editMode = "CREATE";
var DrugHistory_API = "/api/v1/DrugHistory/";

//================= Search Customizaiton =========================================

function DrugHistory_GetSearchParameter() {
    var DrugHistorySearchObject = new Object();
DrugHistorySearchObject.masterDrugID = $("#s_DrugHistory_masterDrugID").val();
DrugHistorySearchObject.treatmentScheduleId = $("#s_DrugHistory_treatmentScheduleId").val();

    return DrugHistorySearchObject;
}

function DrugHistory_FeedDataToSearchForm(data) {
DropDownClearFormAndFeedWithData($("#s_DrugHistory_masterDrugID"), data, "id", "name", "item_masterDrugID", data.masterDrugID);
DropDownClearFormAndFeedWithData($("#s_DrugHistory_treatmentScheduleId"), data, "id", "planingTopic", "item_treatmentScheduleId", data.treatmentScheduleId);

}

//================= Form Data Customizaiton =========================================

function DrugHistory_FeedDataToForm(data) {
$("#DrugHistory_id").val(data.id);
DropDownClearFormAndFeedWithData($("#DrugHistory_masterDrugID"), data, "id", "name", "item_masterDrugID", data.masterDrugID);
DropDownClearFormAndFeedWithData($("#DrugHistory_treatmentScheduleId"), data, "id", "planingTopic", "item_treatmentScheduleId", data.treatmentScheduleId);
$("#DrugHistory_amount").val(data.amount);
$("#DrugHistory_remark").val(data.remark);

}

function DrugHistory_GetFromForm() {
    var DrugHistoryObject = new Object();
DrugHistoryObject.id = $("#DrugHistory_id").val();
DrugHistoryObject.masterDrugID = $("#DrugHistory_masterDrugID").val();
DrugHistoryObject.treatmentScheduleId = $("#DrugHistory_treatmentScheduleId").val();
DrugHistoryObject.amount = $("#DrugHistory_amount").val();
DrugHistoryObject.remark = $("#DrugHistory_remark").val();


    return DrugHistoryObject;
}

function DrugHistory_InitialForm(s) {
    var successFunc = function (result) {
        DrugHistory_FeedDataToForm(result);
		DrugHistory_FeedDataToSearchForm(result);
        if (s) {
            // Incase model popup
            $("#DrugHistoryModel").modal("show");
        }
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + DrugHistory_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Form Mode Setup and Flow =========================================

function DrugHistory_GoCreate() {
    // Incase model popup
    DrugHistory_SetCreateForm(true);

    // Incase open new page
    //window_open(appsite + "/DrugHistoryView/DrugHistory_d");
}

function DrugHistory_GoEdit(a) {
    // Incase model popup
    DrugHistory_SetEditForm(a);

    // Incase open new page
    //window_open(appsite + "/DrugHistoryView/DrugHistory_d?id=" + a);
}

function DrugHistory_SetEditForm(a) {
    var successFunc = function (result) {
        DrugHistory_editMode = "UPDATE";
        DrugHistory_FeedDataToForm(result);
        $("#DrugHistoryModel").modal("show");
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + DrugHistory_API + a, successFunc, AlertDanger);
}

function DrugHistory_SetCreateForm(s) {
    DrugHistory_editMode = "CREATE";
	DrugHistory_InitialForm(s);
}

function DrugHistory_RefreshTable() {
    // Incase model popup
    DrugHistory_DoSearch();

    // Incase open new page
    //window.parent.DrugHistory_DoSearch();
}

//================= Update and Delete =========================================

var DrugHistory_customValidation = function (group) {
    return "";
};

function DrugHistory_PutUpdate() {
	if (!ValidateForm('DrugHistory', DrugHistory_customValidation))
    {
        return;
    }

    var data = DrugHistory_GetFromForm();

    //Update Mode
    if (DrugHistory_editMode === "UPDATE") {
        var successFunc1 = function (result) {
            $("#DrugHistoryModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            DrugHistory_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxPutRequest(apisite + DrugHistory_API + data.id, data, successFunc1, AlertDanger);
    }
    // Create mode
    else {
        var successFunc2 = function (result) {
            $("#DrugHistoryModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            DrugHistory_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxPostRequest(apisite + DrugHistory_API, data, successFunc2, AlertDanger);
    }
}

function DrugHistory_GoDelete(a) {
    if (confirm('คุณต้องการลบข้อมูล ใช่หรือไม่?')) {
        var successFunc = function (result) {
            $("#DrugHistoryModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            DrugHistory_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxDeleteRequest(apisite + DrugHistory_API + a, null, successFunc, AlertDanger);
    }
}

//================= Data Table =========================================

var DrugHistoryTableV;

var DrugHistory_setupTable = function (result) {
	tmp = '"';
    DrugHistoryTableV = $('#DrugHistoryTable').DataTable({
        "processing": true,
        "serverSide": false,
        "data": result,
		//"select": {
        //    "style": 'multi'
        //},
        "columns": [
		//{ "data": "" },
		{ "data": "id" },
                { "data": "masterDrugID_MasterDrug_name" },
                { "data": "treatmentScheduleId_TreatmentSchedule_planingTopic" },
                { "data": "amount" },
                { "data": "remark" },            
        ],
        "columnDefs": [
            {
                "targets": 0, //1,
                "data": "id",
                "render": function (data, type, row, meta) {
                    return "<button type='button' class='btn btn-warning btn-sm' onclick='javascript:DrugHistory_GoEdit(" + tmp + data + tmp + ")'><i class='fa fa-pencil-alt'></i></button> <button type='button' class='btn btn-danger btn-sm' onclick='javascript:DrugHistory_GoDelete(" + tmp + data + tmp + ")'><i class='fa fa-trash-alt'></i></button> ";
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

function DrugHistory_InitiateDataTable() {
	startLoad();
	var p = $.param(DrugHistory_GetSearchParameter());
    AjaxGetRequest(apisite + "/api/v1/DrugHistory/GetListBySearch?"+p, DrugHistory_setupTable, AlertDanger);
}

function DrugHistory_DoSearch() {
    var p = $.param(DrugHistory_GetSearchParameter());
    var DrugHistory_reload = function (result) {
        DrugHistoryTableV.destroy();
        DrugHistory_setupTable(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + "/api/v1/DrugHistory/GetListBySearch?"+p, DrugHistory_reload, AlertDanger);
}

function DrugHistory_GetSelect(f) {
    var DrugHistory_selectitem = [];
    $.each(DrugHistoryTableV.rows('.selected').data(), function (key, value) {
        DrugHistory_selectitem.push(value[f]);
    });
    alert(DrugHistory_selectitem);
}

//================= File Upload =========================================



//================= Multi-Selection Function =========================================



