var MasterRole_editMode = "CREATE";
var MasterRole_API = "/api/v1/MasterRole/";

//================= Search Customizaiton =========================================

function MasterRole_GetSearchParameter() {
    var MasterRoleSearchObject = new Object();
MasterRoleSearchObject.code = $("#s_MasterRole_code").val();
MasterRoleSearchObject.name = $("#s_MasterRole_name").val();

    return MasterRoleSearchObject;
}

function MasterRole_FeedDataToSearchForm(data) {
$("#s_MasterRole_code").val(data.code);
$("#s_MasterRole_name").val(data.name);

}

//================= Form Data Customizaiton =========================================

function MasterRole_FeedDataToForm(data) {
$("#MasterRole_id").val(data.id);
$("#MasterRole_code").val(data.code);
$("#MasterRole_name").val(data.name);
$("#MasterRole_remark").val(data.remark);

}

function MasterRole_GetFromForm() {
    var MasterRoleObject = new Object();
MasterRoleObject.id = $("#MasterRole_id").val();
MasterRoleObject.code = $("#MasterRole_code").val();
MasterRoleObject.name = $("#MasterRole_name").val();
MasterRoleObject.remark = $("#MasterRole_remark").val();


    return MasterRoleObject;
}

function MasterRole_InitialForm(s) {
    var successFunc = function (result) {
        MasterRole_FeedDataToForm(result);
		MasterRole_FeedDataToSearchForm(result);
        if (s) {
            // Incase model popup
            $("#MasterRoleModel").modal("show");
        }
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + MasterRole_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Form Mode Setup and Flow =========================================

function MasterRole_GoCreate() {
    // Incase model popup
    MasterRole_SetCreateForm(true);

    // Incase open new page
    //window_open(appsite + "/MasterRoleView/MasterRole_d");
}

function MasterRole_GoEdit(a) {
    // Incase model popup
    MasterRole_SetEditForm(a);

    // Incase open new page
    //window_open(appsite + "/MasterRoleView/MasterRole_d?id=" + a);
}

function MasterRole_SetEditForm(a) {
    var successFunc = function (result) {
        MasterRole_editMode = "UPDATE";
        MasterRole_FeedDataToForm(result);
        $("#MasterRoleModel").modal("show");
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + MasterRole_API + a, successFunc, AlertDanger);
}

function MasterRole_SetCreateForm(s) {
    MasterRole_editMode = "CREATE";
	MasterRole_InitialForm(s);
}

function MasterRole_RefreshTable() {
    // Incase model popup
    MasterRole_DoSearch();

    // Incase open new page
    //window.parent.MasterRole_DoSearch();
}

//================= Update and Delete =========================================

var MasterRole_customValidation = function (group) {
    return "";
};

function MasterRole_PutUpdate() {
	if (!ValidateForm('MasterRole', MasterRole_customValidation))
    {
        return;
    }

    var data = MasterRole_GetFromForm();

    //Update Mode
    if (MasterRole_editMode === "UPDATE") {
        var successFunc1 = function (result) {
            $("#MasterRoleModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            MasterRole_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxPutRequest(apisite + MasterRole_API + data.id, data, successFunc1, AlertDanger);
    }
    // Create mode
    else {
        var successFunc2 = function (result) {
            $("#MasterRoleModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            MasterRole_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxPostRequest(apisite + MasterRole_API, data, successFunc2, AlertDanger);
    }
}

function MasterRole_GoDelete(a) {
    if (confirm('คุณต้องการลบข้อมูล ใช่หรือไม่?')) {
        var successFunc = function (result) {
            $("#MasterRoleModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            MasterRole_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxDeleteRequest(apisite + MasterRole_API + a, null, successFunc, AlertDanger);
    }
}

//================= Data Table =========================================

var MasterRoleTableV;

var MasterRole_setupTable = function (result) {
	tmp = '"';
    MasterRoleTableV = $('#MasterRoleTable').DataTable({
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
                    return "<button type='button' class='btn btn-warning btn-sm' onclick='javascript:MasterRole_GoEdit(" + tmp + data + tmp + ")'><i class='fa fa-pencil-alt'></i></button> <button type='button' class='btn btn-danger btn-sm' onclick='javascript:MasterRole_GoDelete(" + tmp + data + tmp + ")'><i class='fa fa-trash-alt'></i></button> ";
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

function MasterRole_InitiateDataTable() {
	startLoad();
	var p = $.param(MasterRole_GetSearchParameter());
    AjaxGetRequest(apisite + "/api/v1/MasterRole/GetListBySearch?"+p, MasterRole_setupTable, AlertDanger);
}

function MasterRole_DoSearch() {
    var p = $.param(MasterRole_GetSearchParameter());
    var MasterRole_reload = function (result) {
        MasterRoleTableV.destroy();
        MasterRole_setupTable(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + "/api/v1/MasterRole/GetListBySearch?"+p, MasterRole_reload, AlertDanger);
}

function MasterRole_GetSelect(f) {
    var MasterRole_selectitem = [];
    $.each(MasterRoleTableV.rows('.selected').data(), function (key, value) {
        MasterRole_selectitem.push(value[f]);
    });
    alert(MasterRole_selectitem);
}

//================= File Upload =========================================



//================= Multi-Selection Function =========================================



