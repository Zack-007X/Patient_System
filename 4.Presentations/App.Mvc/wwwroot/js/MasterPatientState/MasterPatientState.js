var MasterPatientState_editMode = "CREATE";
var MasterPatientState_API = "/api/v1/MasterPatientState/";

//================= Search Customizaiton =========================================

function MasterPatientState_GetSearchParameter() {
    var MasterPatientStateSearchObject = new Object();
MasterPatientStateSearchObject.code = $("#s_MasterPatientState_code").val();
MasterPatientStateSearchObject.name = $("#s_MasterPatientState_name").val();

    return MasterPatientStateSearchObject;
}

function MasterPatientState_FeedDataToSearchForm(data) {
$("#s_MasterPatientState_code").val(data.code);
$("#s_MasterPatientState_name").val(data.name);

}

//================= Form Data Customizaiton =========================================

function MasterPatientState_FeedDataToForm(data) {
$("#MasterPatientState_id").val(data.id);
$("#MasterPatientState_code").val(data.code);
$("#MasterPatientState_name").val(data.name);
$("#MasterPatientState_remark").val(data.remark);

}

function MasterPatientState_GetFromForm() {
    var MasterPatientStateObject = new Object();
MasterPatientStateObject.id = $("#MasterPatientState_id").val();
MasterPatientStateObject.code = $("#MasterPatientState_code").val();
MasterPatientStateObject.name = $("#MasterPatientState_name").val();
MasterPatientStateObject.remark = $("#MasterPatientState_remark").val();


    return MasterPatientStateObject;
}

function MasterPatientState_InitialForm(s) {
    var successFunc = function (result) {
        MasterPatientState_FeedDataToForm(result);
		MasterPatientState_FeedDataToSearchForm(result);
        if (s) {
            // Incase model popup
            $("#MasterPatientStateModel").modal("show");
        }
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + MasterPatientState_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Form Mode Setup and Flow =========================================

function MasterPatientState_GoCreate() {
    // Incase model popup
    MasterPatientState_SetCreateForm(true);

    // Incase open new page
    //window_open(appsite + "/MasterPatientStateView/MasterPatientState_d");
}

function MasterPatientState_GoEdit(a) {
    // Incase model popup
    MasterPatientState_SetEditForm(a);

    // Incase open new page
    //window_open(appsite + "/MasterPatientStateView/MasterPatientState_d?id=" + a);
}

function MasterPatientState_SetEditForm(a) {
    var successFunc = function (result) {
        MasterPatientState_editMode = "UPDATE";
        MasterPatientState_FeedDataToForm(result);
        $("#MasterPatientStateModel").modal("show");
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + MasterPatientState_API + a, successFunc, AlertDanger);
}

function MasterPatientState_SetCreateForm(s) {
    MasterPatientState_editMode = "CREATE";
	MasterPatientState_InitialForm(s);
}

function MasterPatientState_RefreshTable() {
    // Incase model popup
    MasterPatientState_DoSearch();

    // Incase open new page
    //window.parent.MasterPatientState_DoSearch();
}

//================= Update and Delete =========================================

var MasterPatientState_customValidation = function (group) {
    return "";
};

function MasterPatientState_PutUpdate() {
	if (!ValidateForm('MasterPatientState', MasterPatientState_customValidation))
    {
        return;
    }

    var data = MasterPatientState_GetFromForm();

    //Update Mode
    if (MasterPatientState_editMode === "UPDATE") {
        var successFunc1 = function (result) {
            $("#MasterPatientStateModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            MasterPatientState_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxPutRequest(apisite + MasterPatientState_API + data.id, data, successFunc1, AlertDanger);
    }
    // Create mode
    else {
        var successFunc2 = function (result) {
            $("#MasterPatientStateModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            MasterPatientState_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxPostRequest(apisite + MasterPatientState_API, data, successFunc2, AlertDanger);
    }
}

function MasterPatientState_GoDelete(a) {
    if (confirm('คุณต้องการลบข้อมูล ใช่หรือไม่?')) {
        var successFunc = function (result) {
            $("#MasterPatientStateModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            MasterPatientState_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxDeleteRequest(apisite + MasterPatientState_API + a, null, successFunc, AlertDanger);
    }
}

//================= Data Table =========================================

var MasterPatientStateTableV;

var MasterPatientState_setupTable = function (result) {
	tmp = '"';
    MasterPatientStateTableV = $('#MasterPatientStateTable').DataTable({
        "processing": true,
        "serverSide": false,
        "data": result,
		//"select": {
        //    "style": 'multi'
        //},
        "columns": [
		//{ "data": "" },
		{ "data": "id" },
                { "data": "code" },
                { "data": "name" },
                { "data": "remark" },            
        ],
        "columnDefs": [
            {
                "targets": 0, //1,
                "data": "id",
                "render": function (data, type, row, meta) {
                    return "<button type='button' class='btn btn-warning btn-sm' onclick='javascript:MasterPatientState_GoEdit(" + tmp + data + tmp + ")'><i class='fa fa-pencil-alt'></i></button> <button type='button' class='btn btn-danger btn-sm' onclick='javascript:MasterPatientState_GoDelete(" + tmp + data + tmp + ")'><i class='fa fa-trash-alt'></i></button> ";
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

function MasterPatientState_InitiateDataTable() {
	startLoad();
	var p = $.param(MasterPatientState_GetSearchParameter());
    AjaxGetRequest(apisite + "/api/v1/MasterPatientState/GetListBySearch?"+p, MasterPatientState_setupTable, AlertDanger);
}

function MasterPatientState_DoSearch() {
    var p = $.param(MasterPatientState_GetSearchParameter());
    var MasterPatientState_reload = function (result) {
        MasterPatientStateTableV.destroy();
        MasterPatientState_setupTable(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + "/api/v1/MasterPatientState/GetListBySearch?"+p, MasterPatientState_reload, AlertDanger);
}

function MasterPatientState_GetSelect(f) {
    var MasterPatientState_selectitem = [];
    $.each(MasterPatientStateTableV.rows('.selected').data(), function (key, value) {
        MasterPatientState_selectitem.push(value[f]);
    });
    alert(MasterPatientState_selectitem);
}

//================= File Upload =========================================



//================= Multi-Selection Function =========================================



