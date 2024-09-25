var MasterGender_editMode = "CREATE";
var MasterGender_API = "/api/v1/MasterGender/";

//================= Search Customizaiton =========================================

function MasterGender_GetSearchParameter() {
    var MasterGenderSearchObject = new Object();
MasterGenderSearchObject.code = $("#s_MasterGender_code").val();
MasterGenderSearchObject.name = $("#s_MasterGender_name").val();

    return MasterGenderSearchObject;
}

function MasterGender_FeedDataToSearchForm(data) {
$("#s_MasterGender_code").val(data.code);
$("#s_MasterGender_name").val(data.name);

}

//================= Form Data Customizaiton =========================================

function MasterGender_FeedDataToForm(data) {
$("#MasterGender_id").val(data.id);
$("#MasterGender_code").val(data.code);
$("#MasterGender_name").val(data.name);
$("#MasterGender_remark").val(data.remark);

}

function MasterGender_GetFromForm() {
    var MasterGenderObject = new Object();
MasterGenderObject.id = $("#MasterGender_id").val();
MasterGenderObject.code = $("#MasterGender_code").val();
MasterGenderObject.name = $("#MasterGender_name").val();
MasterGenderObject.remark = $("#MasterGender_remark").val();


    return MasterGenderObject;
}

function MasterGender_InitialForm(s) {
    var successFunc = function (result) {
        MasterGender_FeedDataToForm(result);
		MasterGender_FeedDataToSearchForm(result);
        if (s) {
            // Incase model popup
            $("#MasterGenderModel").modal("show");
        }
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + MasterGender_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Form Mode Setup and Flow =========================================

function MasterGender_GoCreate() {
    // Incase model popup
    MasterGender_SetCreateForm(true);

    // Incase open new page
    //window_open(appsite + "/MasterGenderView/MasterGender_d");
}

function MasterGender_GoEdit(a) {
    // Incase model popup
    MasterGender_SetEditForm(a);

    // Incase open new page
    //window_open(appsite + "/MasterGenderView/MasterGender_d?id=" + a);
}

function MasterGender_SetEditForm(a) {
    var successFunc = function (result) {
        MasterGender_editMode = "UPDATE";
        MasterGender_FeedDataToForm(result);
        $("#MasterGenderModel").modal("show");
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + MasterGender_API + a, successFunc, AlertDanger);
}

function MasterGender_SetCreateForm(s) {
    MasterGender_editMode = "CREATE";
	MasterGender_InitialForm(s);
}

function MasterGender_RefreshTable() {
    // Incase model popup
    MasterGender_DoSearch();

    // Incase open new page
    //window.parent.MasterGender_DoSearch();
}

//================= Update and Delete =========================================

var MasterGender_customValidation = function (group) {
    return "";
};

function MasterGender_PutUpdate() {
	if (!ValidateForm('MasterGender', MasterGender_customValidation))
    {
        return;
    }

    var data = MasterGender_GetFromForm();

    //Update Mode
    if (MasterGender_editMode === "UPDATE") {
        var successFunc1 = function (result) {
            $("#MasterGenderModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            MasterGender_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxPutRequest(apisite + MasterGender_API + data.id, data, successFunc1, AlertDanger);
    }
    // Create mode
    else {
        var successFunc2 = function (result) {
            $("#MasterGenderModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            MasterGender_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxPostRequest(apisite + MasterGender_API, data, successFunc2, AlertDanger);
    }
}

function MasterGender_GoDelete(a) {
    if (confirm('คุณต้องการลบข้อมูล ใช่หรือไม่?')) {
        var successFunc = function (result) {
            $("#MasterGenderModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            MasterGender_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxDeleteRequest(apisite + MasterGender_API + a, null, successFunc, AlertDanger);
    }
}

//================= Data Table =========================================

var MasterGenderTableV;

var MasterGender_setupTable = function (result) {
	tmp = '"';
    MasterGenderTableV = $('#MasterGenderTable').DataTable({
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
                    return "<button type='button' class='btn btn-warning btn-sm' onclick='javascript:MasterGender_GoEdit(" + tmp + data + tmp + ")'><i class='fa fa-pencil-alt'></i></button> <button type='button' class='btn btn-danger btn-sm' onclick='javascript:MasterGender_GoDelete(" + tmp + data + tmp + ")'><i class='fa fa-trash-alt'></i></button> ";
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

function MasterGender_InitiateDataTable() {
	startLoad();
	var p = $.param(MasterGender_GetSearchParameter());
    AjaxGetRequest(apisite + "/api/v1/MasterGender/GetListBySearch?"+p, MasterGender_setupTable, AlertDanger);
}

function MasterGender_DoSearch() {
    var p = $.param(MasterGender_GetSearchParameter());
    var MasterGender_reload = function (result) {
        MasterGenderTableV.destroy();
        MasterGender_setupTable(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + "/api/v1/MasterGender/GetListBySearch?"+p, MasterGender_reload, AlertDanger);
}

function MasterGender_GetSelect(f) {
    var MasterGender_selectitem = [];
    $.each(MasterGenderTableV.rows('.selected').data(), function (key, value) {
        MasterGender_selectitem.push(value[f]);
    });
    alert(MasterGender_selectitem);
}

//================= File Upload =========================================



//================= Multi-Selection Function =========================================



