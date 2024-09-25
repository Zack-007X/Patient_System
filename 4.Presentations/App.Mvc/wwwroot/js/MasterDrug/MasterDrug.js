var MasterDrug_editMode = "CREATE";
var MasterDrug_API = "/api/v1/MasterDrug/";

//================= Search Customizaiton =========================================

function MasterDrug_GetSearchParameter() {
    var MasterDrugSearchObject = new Object();
MasterDrugSearchObject.code = $("#s_MasterDrug_code").val();
MasterDrugSearchObject.name = $("#s_MasterDrug_name").val();

    return MasterDrugSearchObject;
}

function MasterDrug_FeedDataToSearchForm(data) {
$("#s_MasterDrug_code").val(data.code);
$("#s_MasterDrug_name").val(data.name);

}

//================= Form Data Customizaiton =========================================

function MasterDrug_FeedDataToForm(data) {
$("#MasterDrug_id").val(data.id);
$("#MasterDrug_code").val(data.code);
$("#MasterDrug_name").val(data.name);
$("#MasterDrug_dosage").val(data.dosage);
$("#MasterDrug_remark").val(data.remark);
$("#MasterDrug_details").val(data.details);

}

function MasterDrug_GetFromForm() {
    var MasterDrugObject = new Object();
MasterDrugObject.id = $("#MasterDrug_id").val();
MasterDrugObject.code = $("#MasterDrug_code").val();
MasterDrugObject.name = $("#MasterDrug_name").val();
MasterDrugObject.dosage = $("#MasterDrug_dosage").val();
MasterDrugObject.remark = $("#MasterDrug_remark").val();
MasterDrugObject.details = $("#MasterDrug_details").val();


    return MasterDrugObject;
}

function MasterDrug_InitialForm(s) {
    var successFunc = function (result) {
        MasterDrug_FeedDataToForm(result);
		MasterDrug_FeedDataToSearchForm(result);
        if (s) {
            // Incase model popup
            $("#MasterDrugModel").modal("show");
        }
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + MasterDrug_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Form Mode Setup and Flow =========================================

function MasterDrug_GoCreate() {
    // Incase model popup
    MasterDrug_SetCreateForm(true);

    // Incase open new page
    //window_open(appsite + "/MasterDrugView/MasterDrug_d");
}

function MasterDrug_GoEdit(a) {
    // Incase model popup
    MasterDrug_SetEditForm(a);

    // Incase open new page
    //window_open(appsite + "/MasterDrugView/MasterDrug_d?id=" + a);
}

function MasterDrug_SetEditForm(a) {
    var successFunc = function (result) {
        MasterDrug_editMode = "UPDATE";
        MasterDrug_FeedDataToForm(result);
        $("#MasterDrugModel").modal("show");
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + MasterDrug_API + a, successFunc, AlertDanger);
}

function MasterDrug_SetCreateForm(s) {
    MasterDrug_editMode = "CREATE";
	MasterDrug_InitialForm(s);
}

function MasterDrug_RefreshTable() {
    // Incase model popup
    MasterDrug_DoSearch();

    // Incase open new page
    //window.parent.MasterDrug_DoSearch();
}

//================= Update and Delete =========================================

var MasterDrug_customValidation = function (group) {
    return "";
};

function MasterDrug_PutUpdate() {
	if (!ValidateForm('MasterDrug', MasterDrug_customValidation))
    {
        return;
    }

    var data = MasterDrug_GetFromForm();

    //Update Mode
    if (MasterDrug_editMode === "UPDATE") {
        var successFunc1 = function (result) {
            $("#MasterDrugModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            MasterDrug_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxPutRequest(apisite + MasterDrug_API + data.id, data, successFunc1, AlertDanger);
    }
    // Create mode
    else {
        var successFunc2 = function (result) {
            $("#MasterDrugModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            MasterDrug_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxPostRequest(apisite + MasterDrug_API, data, successFunc2, AlertDanger);
    }
}

function MasterDrug_GoDelete(a) {
    if (confirm('คุณต้องการลบข้อมูล ใช่หรือไม่?')) {
        var successFunc = function (result) {
            $("#MasterDrugModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            MasterDrug_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxDeleteRequest(apisite + MasterDrug_API + a, null, successFunc, AlertDanger);
    }
}

//================= Data Table =========================================

var MasterDrugTableV;

var MasterDrug_setupTable = function (result) {
	tmp = '"';
    MasterDrugTableV = $('#MasterDrugTable').DataTable({
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
                { "data": "dosage" },
                { "data": "remark" },
                { "data": "details" },            
        ],
        "columnDefs": [
            {
                "targets": 0, //1,
                "data": "id",
                "render": function (data, type, row, meta) {
                    return "<button type='button' class='btn btn-warning btn-sm' onclick='javascript:MasterDrug_GoEdit(" + tmp + data + tmp + ")'><i class='fa fa-pencil-alt'></i></button> <button type='button' class='btn btn-danger btn-sm' onclick='javascript:MasterDrug_GoDelete(" + tmp + data + tmp + ")'><i class='fa fa-trash-alt'></i></button> ";
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

function MasterDrug_InitiateDataTable() {
	startLoad();
	var p = $.param(MasterDrug_GetSearchParameter());
    AjaxGetRequest(apisite + "/api/v1/MasterDrug/GetListBySearch?"+p, MasterDrug_setupTable, AlertDanger);
}

function MasterDrug_DoSearch() {
    var p = $.param(MasterDrug_GetSearchParameter());
    var MasterDrug_reload = function (result) {
        MasterDrugTableV.destroy();
        MasterDrug_setupTable(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + "/api/v1/MasterDrug/GetListBySearch?"+p, MasterDrug_reload, AlertDanger);
}

function MasterDrug_GetSelect(f) {
    var MasterDrug_selectitem = [];
    $.each(MasterDrugTableV.rows('.selected').data(), function (key, value) {
        MasterDrug_selectitem.push(value[f]);
    });
    alert(MasterDrug_selectitem);
}

//================= File Upload =========================================



//================= Multi-Selection Function =========================================



