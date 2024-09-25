var RoleHasPermission_editMode = "CREATE";
var RoleHasPermission_API = "/api/v1/RoleHasPermission/";

//================= Search Customizaiton =========================================

function RoleHasPermission_GetSearchParameter() {
    var RoleHasPermissionSearchObject = new Object();
RoleHasPermissionSearchObject.masterRoleId = $("#s_RoleHasPermission_masterRoleId").val();
RoleHasPermissionSearchObject.masterPermissionId = $("#s_RoleHasPermission_masterPermissionId").val();

    return RoleHasPermissionSearchObject;
}

function RoleHasPermission_FeedDataToSearchForm(data) {
DropDownClearFormAndFeedWithData($("#s_RoleHasPermission_masterRoleId"), data, "id", "name", "item_masterRoleId", data.masterRoleId);
DropDownClearFormAndFeedWithData($("#s_RoleHasPermission_masterPermissionId"), data, "id", "name", "item_masterPermissionId", data.masterPermissionId);

}

//================= Form Data Customizaiton =========================================

function RoleHasPermission_FeedDataToForm(data) {
$("#RoleHasPermission_id").val(data.id);
DropDownClearFormAndFeedWithData($("#RoleHasPermission_masterRoleId"), data, "id", "name", "item_masterRoleId", data.masterRoleId);
DropDownClearFormAndFeedWithData($("#RoleHasPermission_masterPermissionId"), data, "id", "name", "item_masterPermissionId", data.masterPermissionId);
$("#RoleHasPermission_create").val(data.create);
$("#RoleHasPermission_read").val(data.read);
$("#RoleHasPermission_update").val(data.update);
$("#RoleHasPermission_delete").val(data.delete);
$("#RoleHasPermission_remark").val(data.remark);

}

function RoleHasPermission_GetFromForm() {
    var RoleHasPermissionObject = new Object();
RoleHasPermissionObject.id = $("#RoleHasPermission_id").val();
RoleHasPermissionObject.masterRoleId = $("#RoleHasPermission_masterRoleId").val();
RoleHasPermissionObject.masterPermissionId = $("#RoleHasPermission_masterPermissionId").val();
RoleHasPermissionObject.create = $("#RoleHasPermission_create").val();
RoleHasPermissionObject.read = $("#RoleHasPermission_read").val();
RoleHasPermissionObject.update = $("#RoleHasPermission_update").val();
RoleHasPermissionObject.delete = $("#RoleHasPermission_delete").val();
RoleHasPermissionObject.remark = $("#RoleHasPermission_remark").val();


    return RoleHasPermissionObject;
}

function RoleHasPermission_InitialForm(s) {
    var successFunc = function (result) {
        RoleHasPermission_FeedDataToForm(result);
		RoleHasPermission_FeedDataToSearchForm(result);
        if (s) {
            // Incase model popup
            $("#RoleHasPermissionModel").modal("show");
        }
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + RoleHasPermission_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Form Mode Setup and Flow =========================================

function RoleHasPermission_GoCreate() {
    // Incase model popup
    RoleHasPermission_SetCreateForm(true);

    // Incase open new page
    //window_open(appsite + "/RoleHasPermissionView/RoleHasPermission_d");
}

function RoleHasPermission_GoEdit(a) {
    // Incase model popup
    RoleHasPermission_SetEditForm(a);

    // Incase open new page
    //window_open(appsite + "/RoleHasPermissionView/RoleHasPermission_d?id=" + a);
}

function RoleHasPermission_SetEditForm(a) {
    var successFunc = function (result) {
        RoleHasPermission_editMode = "UPDATE";
        RoleHasPermission_FeedDataToForm(result);
        $("#RoleHasPermissionModel").modal("show");
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + RoleHasPermission_API + a, successFunc, AlertDanger);
}

function RoleHasPermission_SetCreateForm(s) {
    RoleHasPermission_editMode = "CREATE";
	RoleHasPermission_InitialForm(s);
}

function RoleHasPermission_RefreshTable() {
    // Incase model popup
    RoleHasPermission_DoSearch();

    // Incase open new page
    //window.parent.RoleHasPermission_DoSearch();
}

//================= Update and Delete =========================================

var RoleHasPermission_customValidation = function (group) {
    return "";
};

function RoleHasPermission_PutUpdate() {
	if (!ValidateForm('RoleHasPermission', RoleHasPermission_customValidation))
    {
        return;
    }

    var data = RoleHasPermission_GetFromForm();

    //Update Mode
    if (RoleHasPermission_editMode === "UPDATE") {
        var successFunc1 = function (result) {
            $("#RoleHasPermissionModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            RoleHasPermission_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxPutRequest(apisite + RoleHasPermission_API + data.id, data, successFunc1, AlertDanger);
    }
    // Create mode
    else {
        var successFunc2 = function (result) {
            $("#RoleHasPermissionModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            RoleHasPermission_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxPostRequest(apisite + RoleHasPermission_API, data, successFunc2, AlertDanger);
    }
}

function RoleHasPermission_GoDelete(a) {
    if (confirm('คุณต้องการลบข้อมูล ใช่หรือไม่?')) {
        var successFunc = function (result) {
            $("#RoleHasPermissionModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            RoleHasPermission_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxDeleteRequest(apisite + RoleHasPermission_API + a, null, successFunc, AlertDanger);
    }
}

//================= Data Table =========================================

var RoleHasPermissionTableV;

var RoleHasPermission_setupTable = function (result) {
	tmp = '"';
    RoleHasPermissionTableV = $('#RoleHasPermissionTable').DataTable({
        "processing": true,
        "serverSide": false,
        "data": result,
		//"select": {
        //    "style": 'multi'
        //},
        "columns": [
		//{ "data": "" },
		{ "data": "id" },
                { "data": "masterRoleId_MasterRole_name" },
                { "data": "masterPermissionId_MasterPermission_name" },
                { "data": "create" },
                { "data": "read" },
                { "data": "update" },
                { "data": "delete" },
                { "data": "remark" },            
        ],
        "columnDefs": [
            {
                "targets": 0, //1,
                "data": "id",
                "render": function (data, type, row, meta) {
                    return "<button type='button' class='btn btn-warning btn-sm' onclick='javascript:RoleHasPermission_GoEdit(" + tmp + data + tmp + ")'><i class='fa fa-pencil-alt'></i></button> <button type='button' class='btn btn-danger btn-sm' onclick='javascript:RoleHasPermission_GoDelete(" + tmp + data + tmp + ")'><i class='fa fa-trash-alt'></i></button> ";
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

function RoleHasPermission_InitiateDataTable() {
	startLoad();
	var p = $.param(RoleHasPermission_GetSearchParameter());
    AjaxGetRequest(apisite + "/api/v1/RoleHasPermission/GetListBySearch?"+p, RoleHasPermission_setupTable, AlertDanger);
}

function RoleHasPermission_DoSearch() {
    var p = $.param(RoleHasPermission_GetSearchParameter());
    var RoleHasPermission_reload = function (result) {
        RoleHasPermissionTableV.destroy();
        RoleHasPermission_setupTable(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + "/api/v1/RoleHasPermission/GetListBySearch?"+p, RoleHasPermission_reload, AlertDanger);
}

function RoleHasPermission_GetSelect(f) {
    var RoleHasPermission_selectitem = [];
    $.each(RoleHasPermissionTableV.rows('.selected').data(), function (key, value) {
        RoleHasPermission_selectitem.push(value[f]);
    });
    alert(RoleHasPermission_selectitem);
}

//================= File Upload =========================================



//================= Multi-Selection Function =========================================



