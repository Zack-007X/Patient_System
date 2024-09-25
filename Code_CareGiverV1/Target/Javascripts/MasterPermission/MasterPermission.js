var MasterPermission_editMode = "CREATE";
var MasterPermission_API = "/api/v1/MasterPermission/";

//================= Search Customizaiton =========================================

function MasterPermission_GetSearchParameter() {
    var MasterPermissionSearchObject = new Object();
MasterPermissionSearchObject.code = $("#s_MasterPermission_code").val();
MasterPermissionSearchObject.name = $("#s_MasterPermission_name").val();

    return MasterPermissionSearchObject;
}

function MasterPermission_FeedDataToSearchForm(data) {
$("#s_MasterPermission_code").val(data.code);
$("#s_MasterPermission_name").val(data.name);

}

//================= Form Data Customizaiton =========================================

function MasterPermission_FeedDataToForm(data) {
$("#MasterPermission_id").val(data.id);
$("#MasterPermission_code").val(data.code);
$("#MasterPermission_name").val(data.name);
$("#MasterPermission_remark").val(data.remark);

}

function MasterPermission_GetFromForm() {
    var MasterPermissionObject = new Object();
MasterPermissionObject.id = $("#MasterPermission_id").val();
MasterPermissionObject.code = $("#MasterPermission_code").val();
MasterPermissionObject.name = $("#MasterPermission_name").val();
MasterPermissionObject.remark = $("#MasterPermission_remark").val();


    return MasterPermissionObject;
}

function MasterPermission_InitialForm(s) {
    var successFunc = function (result) {
        MasterPermission_FeedDataToForm(result);
		MasterPermission_FeedDataToSearchForm(result);
        if (s) {
            // Incase model popup
            $("#MasterPermissionModel").modal("show");
        }
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + MasterPermission_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Form Mode Setup and Flow =========================================

function MasterPermission_GoCreate() {
    // Incase model popup
    MasterPermission_SetCreateForm(true);

    // Incase open new page
    //window_open(appsite + "/MasterPermissionView/MasterPermission_d");
}

function MasterPermission_GoEdit(a) {
    // Incase model popup
    MasterPermission_SetEditForm(a);

    // Incase open new page
    //window_open(appsite + "/MasterPermissionView/MasterPermission_d?id=" + a);
}

function MasterPermission_SetEditForm(a) {
    var successFunc = function (result) {
        MasterPermission_editMode = "UPDATE";
        MasterPermission_FeedDataToForm(result);
        $("#MasterPermissionModel").modal("show");
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + MasterPermission_API + a, successFunc, AlertDanger);
}

function MasterPermission_SetCreateForm(s) {
    MasterPermission_editMode = "CREATE";
	MasterPermission_InitialForm(s);
}

function MasterPermission_RefreshTable() {
    // Incase model popup
    MasterPermission_DoSearch();

    // Incase open new page
    //window.parent.MasterPermission_DoSearch();
}

//================= Update and Delete =========================================

var MasterPermission_customValidation = function (group) {
    return "";
};

function MasterPermission_PutUpdate() {
	if (!ValidateForm('MasterPermission', MasterPermission_customValidation))
    {
        return;
    }

    var data = MasterPermission_GetFromForm();

    //Update Mode
    if (MasterPermission_editMode === "UPDATE") {
        var successFunc1 = function (result) {
            $("#MasterPermissionModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            MasterPermission_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxPutRequest(apisite + MasterPermission_API + data.id, data, successFunc1, AlertDanger);
    }
    // Create mode
    else {
        var successFunc2 = function (result) {
            $("#MasterPermissionModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            MasterPermission_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxPostRequest(apisite + MasterPermission_API, data, successFunc2, AlertDanger);
    }
}

function MasterPermission_GoDelete(a) {
    if (confirm('คุณต้องการลบข้อมูล ใช่หรือไม่?')) {
        var successFunc = function (result) {
            $("#MasterPermissionModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            MasterPermission_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxDeleteRequest(apisite + MasterPermission_API + a, null, successFunc, AlertDanger);
    }
}

//================= Data Table =========================================

var MasterPermissionTableV;

var MasterPermission_setupTable = function (result) {
	tmp = '"';
    MasterPermissionTableV = $('#MasterPermissionTable').DataTable({
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
                    return "<button type='button' class='btn btn-warning btn-sm' onclick='javascript:MasterPermission_GoEdit(" + tmp + data + tmp + ")'><i class='fa fa-pencil-alt'></i></button> <button type='button' class='btn btn-danger btn-sm' onclick='javascript:MasterPermission_GoDelete(" + tmp + data + tmp + ")'><i class='fa fa-trash-alt'></i></button> ";
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

function MasterPermission_InitiateDataTable() {
	startLoad();
	var p = $.param(MasterPermission_GetSearchParameter());
    AjaxGetRequest(apisite + "/api/v1/MasterPermission/GetListBySearch?"+p, MasterPermission_setupTable, AlertDanger);
}

function MasterPermission_DoSearch() {
    var p = $.param(MasterPermission_GetSearchParameter());
    var MasterPermission_reload = function (result) {
        MasterPermissionTableV.destroy();
        MasterPermission_setupTable(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + "/api/v1/MasterPermission/GetListBySearch?"+p, MasterPermission_reload, AlertDanger);
}

function MasterPermission_GetSelect(f) {
    var MasterPermission_selectitem = [];
    $.each(MasterPermissionTableV.rows('.selected').data(), function (key, value) {
        MasterPermission_selectitem.push(value[f]);
    });
    alert(MasterPermission_selectitem);
}

//================= File Upload =========================================



//================= Multi-Selection Function =========================================



