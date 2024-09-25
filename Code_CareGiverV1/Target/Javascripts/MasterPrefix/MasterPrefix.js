var MasterPrefix_editMode = "CREATE";
var MasterPrefix_API = "/api/v1/MasterPrefix/";

//================= Search Customizaiton =========================================

function MasterPrefix_GetSearchParameter() {
    var MasterPrefixSearchObject = new Object();
MasterPrefixSearchObject.name = $("#s_MasterPrefix_name").val();

    return MasterPrefixSearchObject;
}

function MasterPrefix_FeedDataToSearchForm(data) {
$("#s_MasterPrefix_name").val(data.name);

}

//================= Form Data Customizaiton =========================================

function MasterPrefix_FeedDataToForm(data) {
$("#MasterPrefix_id").val(data.id);
$("#MasterPrefix_code").val(data.code);
$("#MasterPrefix_name").val(data.name);
$("#MasterPrefix_remark").val(data.remark);

}

function MasterPrefix_GetFromForm() {
    var MasterPrefixObject = new Object();
MasterPrefixObject.id = $("#MasterPrefix_id").val();
MasterPrefixObject.code = $("#MasterPrefix_code").val();
MasterPrefixObject.name = $("#MasterPrefix_name").val();
MasterPrefixObject.remark = $("#MasterPrefix_remark").val();


    return MasterPrefixObject;
}

function MasterPrefix_InitialForm(s) {
    var successFunc = function (result) {
        MasterPrefix_FeedDataToForm(result);
		MasterPrefix_FeedDataToSearchForm(result);
        if (s) {
            // Incase model popup
            $("#MasterPrefixModel").modal("show");
        }
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + MasterPrefix_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Form Mode Setup and Flow =========================================

function MasterPrefix_GoCreate() {
    // Incase model popup
    MasterPrefix_SetCreateForm(true);

    // Incase open new page
    //window_open(appsite + "/MasterPrefixView/MasterPrefix_d");
}

function MasterPrefix_GoEdit(a) {
    // Incase model popup
    MasterPrefix_SetEditForm(a);

    // Incase open new page
    //window_open(appsite + "/MasterPrefixView/MasterPrefix_d?id=" + a);
}

function MasterPrefix_SetEditForm(a) {
    var successFunc = function (result) {
        MasterPrefix_editMode = "UPDATE";
        MasterPrefix_FeedDataToForm(result);
        $("#MasterPrefixModel").modal("show");
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + MasterPrefix_API + a, successFunc, AlertDanger);
}

function MasterPrefix_SetCreateForm(s) {
    MasterPrefix_editMode = "CREATE";
	MasterPrefix_InitialForm(s);
}

function MasterPrefix_RefreshTable() {
    // Incase model popup
    MasterPrefix_DoSearch();

    // Incase open new page
    //window.parent.MasterPrefix_DoSearch();
}

//================= Update and Delete =========================================

var MasterPrefix_customValidation = function (group) {
    return "";
};

function MasterPrefix_PutUpdate() {
	if (!ValidateForm('MasterPrefix', MasterPrefix_customValidation))
    {
        return;
    }

    var data = MasterPrefix_GetFromForm();

    //Update Mode
    if (MasterPrefix_editMode === "UPDATE") {
        var successFunc1 = function (result) {
            $("#MasterPrefixModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            MasterPrefix_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxPutRequest(apisite + MasterPrefix_API + data.id, data, successFunc1, AlertDanger);
    }
    // Create mode
    else {
        var successFunc2 = function (result) {
            $("#MasterPrefixModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            MasterPrefix_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxPostRequest(apisite + MasterPrefix_API, data, successFunc2, AlertDanger);
    }
}

function MasterPrefix_GoDelete(a) {
    if (confirm('คุณต้องการลบข้อมูล ใช่หรือไม่?')) {
        var successFunc = function (result) {
            $("#MasterPrefixModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            MasterPrefix_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxDeleteRequest(apisite + MasterPrefix_API + a, null, successFunc, AlertDanger);
    }
}

//================= Data Table =========================================

var MasterPrefixTableV;

var MasterPrefix_setupTable = function (result) {
	tmp = '"';
    MasterPrefixTableV = $('#MasterPrefixTable').DataTable({
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
                    return "<button type='button' class='btn btn-warning btn-sm' onclick='javascript:MasterPrefix_GoEdit(" + tmp + data + tmp + ")'><i class='fa fa-pencil-alt'></i></button> <button type='button' class='btn btn-danger btn-sm' onclick='javascript:MasterPrefix_GoDelete(" + tmp + data + tmp + ")'><i class='fa fa-trash-alt'></i></button> ";
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

function MasterPrefix_InitiateDataTable() {
	startLoad();
	var p = $.param(MasterPrefix_GetSearchParameter());
    AjaxGetRequest(apisite + "/api/v1/MasterPrefix/GetListBySearch?"+p, MasterPrefix_setupTable, AlertDanger);
}

function MasterPrefix_DoSearch() {
    var p = $.param(MasterPrefix_GetSearchParameter());
    var MasterPrefix_reload = function (result) {
        MasterPrefixTableV.destroy();
        MasterPrefix_setupTable(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + "/api/v1/MasterPrefix/GetListBySearch?"+p, MasterPrefix_reload, AlertDanger);
}

function MasterPrefix_GetSelect(f) {
    var MasterPrefix_selectitem = [];
    $.each(MasterPrefixTableV.rows('.selected').data(), function (key, value) {
        MasterPrefix_selectitem.push(value[f]);
    });
    alert(MasterPrefix_selectitem);
}

//================= File Upload =========================================



//================= Multi-Selection Function =========================================



