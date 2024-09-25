var MasterPosition_editMode = "CREATE";
var MasterPosition_API = "/api/v1/MasterPosition/";

//================= Search Customizaiton =========================================

function MasterPosition_GetSearchParameter() {
    var MasterPositionSearchObject = new Object();
MasterPositionSearchObject.code = $("#s_MasterPosition_code").val();
MasterPositionSearchObject.name = $("#s_MasterPosition_name").val();

    return MasterPositionSearchObject;
}

function MasterPosition_FeedDataToSearchForm(data) {
$("#s_MasterPosition_code").val(data.code);
$("#s_MasterPosition_name").val(data.name);

}

//================= Form Data Customizaiton =========================================

function MasterPosition_FeedDataToForm(data) {
$("#MasterPosition_id").val(data.id);
$("#MasterPosition_code").val(data.code);
$("#MasterPosition_name").val(data.name);
$("#MasterPosition_remark").val(data.remark);

}

function MasterPosition_GetFromForm() {
    var MasterPositionObject = new Object();
MasterPositionObject.id = $("#MasterPosition_id").val();
MasterPositionObject.code = $("#MasterPosition_code").val();
MasterPositionObject.name = $("#MasterPosition_name").val();
MasterPositionObject.remark = $("#MasterPosition_remark").val();


    return MasterPositionObject;
}

function MasterPosition_InitialForm(s) {
    var successFunc = function (result) {
        MasterPosition_FeedDataToForm(result);
		MasterPosition_FeedDataToSearchForm(result);
        if (s) {
            // Incase model popup
            $("#MasterPositionModel").modal("show");
        }
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + MasterPosition_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Form Mode Setup and Flow =========================================

function MasterPosition_GoCreate() {
    // Incase model popup
    MasterPosition_SetCreateForm(true);

    // Incase open new page
    //window_open(appsite + "/MasterPositionView/MasterPosition_d");
}

function MasterPosition_GoEdit(a) {
    // Incase model popup
    MasterPosition_SetEditForm(a);

    // Incase open new page
    //window_open(appsite + "/MasterPositionView/MasterPosition_d?id=" + a);
}

function MasterPosition_SetEditForm(a) {
    var successFunc = function (result) {
        MasterPosition_editMode = "UPDATE";
        MasterPosition_FeedDataToForm(result);
        $("#MasterPositionModel").modal("show");
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + MasterPosition_API + a, successFunc, AlertDanger);
}

function MasterPosition_SetCreateForm(s) {
    MasterPosition_editMode = "CREATE";
	MasterPosition_InitialForm(s);
}

function MasterPosition_RefreshTable() {
    // Incase model popup
    MasterPosition_DoSearch();

    // Incase open new page
    //window.parent.MasterPosition_DoSearch();
}

//================= Update and Delete =========================================

var MasterPosition_customValidation = function (group) {
    return "";
};

function MasterPosition_PutUpdate() {
	if (!ValidateForm('MasterPosition', MasterPosition_customValidation))
    {
        return;
    }

    var data = MasterPosition_GetFromForm();

    //Update Mode
    if (MasterPosition_editMode === "UPDATE") {
        var successFunc1 = function (result) {
            $("#MasterPositionModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            MasterPosition_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxPutRequest(apisite + MasterPosition_API + data.id, data, successFunc1, AlertDanger);
    }
    // Create mode
    else {
        var successFunc2 = function (result) {
            $("#MasterPositionModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            MasterPosition_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxPostRequest(apisite + MasterPosition_API, data, successFunc2, AlertDanger);
    }
}

function MasterPosition_GoDelete(a) {
    if (confirm('คุณต้องการลบข้อมูล ใช่หรือไม่?')) {
        var successFunc = function (result) {
            $("#MasterPositionModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            MasterPosition_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxDeleteRequest(apisite + MasterPosition_API + a, null, successFunc, AlertDanger);
    }
}

//================= Data Table =========================================

var MasterPositionTableV;

var MasterPosition_setupTable = function (result) {
	tmp = '"';
    MasterPositionTableV = $('#MasterPositionTable').DataTable({
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
                    return "<button type='button' class='btn btn-warning btn-sm' onclick='javascript:MasterPosition_GoEdit(" + tmp + data + tmp + ")'><i class='fa fa-pencil-alt'></i></button> <button type='button' class='btn btn-danger btn-sm' onclick='javascript:MasterPosition_GoDelete(" + tmp + data + tmp + ")'><i class='fa fa-trash-alt'></i></button> ";
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

function MasterPosition_InitiateDataTable() {
	startLoad();
	var p = $.param(MasterPosition_GetSearchParameter());
    AjaxGetRequest(apisite + "/api/v1/MasterPosition/GetListBySearch?"+p, MasterPosition_setupTable, AlertDanger);
}

function MasterPosition_DoSearch() {
    var p = $.param(MasterPosition_GetSearchParameter());
    var MasterPosition_reload = function (result) {
        MasterPositionTableV.destroy();
        MasterPosition_setupTable(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + "/api/v1/MasterPosition/GetListBySearch?"+p, MasterPosition_reload, AlertDanger);
}

function MasterPosition_GetSelect(f) {
    var MasterPosition_selectitem = [];
    $.each(MasterPositionTableV.rows('.selected').data(), function (key, value) {
        MasterPosition_selectitem.push(value[f]);
    });
    alert(MasterPosition_selectitem);
}

//================= File Upload =========================================



//================= Multi-Selection Function =========================================



