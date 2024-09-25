var TreatmentSchedule_editMode = "CREATE";
var TreatmentSchedule_API = "/api/v1/TreatmentSchedule/";

//================= Search Customizaiton =========================================

function TreatmentSchedule_GetSearchParameter() {
    var TreatmentScheduleSearchObject = new Object();
TreatmentScheduleSearchObject.surveyId = $("#s_TreatmentSchedule_surveyId").val();
TreatmentScheduleSearchObject.planingTopic = $("#s_TreatmentSchedule_planingTopic").val();
TreatmentScheduleSearchObject.planingDetails = $("#s_TreatmentSchedule_planingDetails").val();
TreatmentScheduleSearchObject.CaregiverId = $("#s_TreatmentSchedule_CaregiverId").val();

    return TreatmentScheduleSearchObject;
}

function TreatmentSchedule_FeedDataToSearchForm(data) {
DropDownClearFormAndFeedWithData($("#s_TreatmentSchedule_surveyId"), data, "id", "patientId", "item_surveyId", data.surveyId);
$("#s_TreatmentSchedule_planingTopic").val(data.planingTopic);
$("#s_TreatmentSchedule_planingDetails").val(data.planingDetails);
DropDownClearFormAndFeedWithData($("#s_TreatmentSchedule_CaregiverId"), data, "id", "username", "item_CaregiverId", data.CaregiverId);

}

//================= Form Data Customizaiton =========================================

function TreatmentSchedule_FeedDataToForm(data) {
$("#TreatmentSchedule_id").val(data.id);
DropDownClearFormAndFeedWithData($("#TreatmentSchedule_surveyId"), data, "id", "patientId", "item_surveyId", data.surveyId);
$("#TreatmentSchedule_planingTopic").val(data.planingTopic);
$("#TreatmentSchedule_planingDetails").val(data.planingDetails);
$("#TreatmentSchedule_startTreatmentDate").val(formatDate(data.startTreatmentDate));
$("#TreatmentSchedule_endtartTreatmentDate").val(formatDate(data.endtartTreatmentDate));
DropDownClearFormAndFeedWithData($("#TreatmentSchedule_CaregiverId"), data, "id", "username", "item_CaregiverId", data.CaregiverId);
$("#TreatmentSchedule_TreatmentReportTopic").val(data.TreatmentReportTopic);
$("#TreatmentSchedule_TreatmentReportDetails").val(data.TreatmentReportDetails);
$("#TreatmentSchedule_remark").val(data.remark);

}

function TreatmentSchedule_GetFromForm() {
    var TreatmentScheduleObject = new Object();
TreatmentScheduleObject.id = $("#TreatmentSchedule_id").val();
TreatmentScheduleObject.surveyId = $("#TreatmentSchedule_surveyId").val();
TreatmentScheduleObject.planingTopic = $("#TreatmentSchedule_planingTopic").val();
TreatmentScheduleObject.planingDetails = $("#TreatmentSchedule_planingDetails").val();
TreatmentScheduleObject.startTreatmentDate = getDate($("#TreatmentSchedule_startTreatmentDate").val());
TreatmentScheduleObject.endtartTreatmentDate = getDate($("#TreatmentSchedule_endtartTreatmentDate").val());
TreatmentScheduleObject.CaregiverId = $("#TreatmentSchedule_CaregiverId").val();
TreatmentScheduleObject.TreatmentReportTopic = $("#TreatmentSchedule_TreatmentReportTopic").val();
TreatmentScheduleObject.TreatmentReportDetails = $("#TreatmentSchedule_TreatmentReportDetails").val();
TreatmentScheduleObject.remark = $("#TreatmentSchedule_remark").val();


    return TreatmentScheduleObject;
}

function TreatmentSchedule_InitialForm(s) {
    var successFunc = function (result) {
        TreatmentSchedule_FeedDataToForm(result);
		TreatmentSchedule_FeedDataToSearchForm(result);
        if (s) {
            // Incase model popup
            $("#TreatmentScheduleModel").modal("show");
        }
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + TreatmentSchedule_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Form Mode Setup and Flow =========================================

function TreatmentSchedule_GoCreate() {
    // Incase model popup
    TreatmentSchedule_SetCreateForm(true);

    // Incase open new page
    //window_open(appsite + "/TreatmentScheduleView/TreatmentSchedule_d");
}

function TreatmentSchedule_GoEdit(a) {
    // Incase model popup
    TreatmentSchedule_SetEditForm(a);

    // Incase open new page
    //window_open(appsite + "/TreatmentScheduleView/TreatmentSchedule_d?id=" + a);
}

function TreatmentSchedule_SetEditForm(a) {
    var successFunc = function (result) {
        TreatmentSchedule_editMode = "UPDATE";
        TreatmentSchedule_FeedDataToForm(result);
        $("#TreatmentScheduleModel").modal("show");
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + TreatmentSchedule_API + a, successFunc, AlertDanger);
}

function TreatmentSchedule_SetCreateForm(s) {
    TreatmentSchedule_editMode = "CREATE";
	TreatmentSchedule_InitialForm(s);
}

function TreatmentSchedule_RefreshTable() {
    // Incase model popup
    TreatmentSchedule_DoSearch();

    // Incase open new page
    //window.parent.TreatmentSchedule_DoSearch();
}

//================= Update and Delete =========================================

var TreatmentSchedule_customValidation = function (group) {
    return "";
};

function TreatmentSchedule_PutUpdate() {
	if (!ValidateForm('TreatmentSchedule', TreatmentSchedule_customValidation))
    {
        return;
    }

    var data = TreatmentSchedule_GetFromForm();

    //Update Mode
    if (TreatmentSchedule_editMode === "UPDATE") {
        var successFunc1 = function (result) {
            $("#TreatmentScheduleModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            TreatmentSchedule_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxPutRequest(apisite + TreatmentSchedule_API + data.id, data, successFunc1, AlertDanger);
    }
    // Create mode
    else {
        var successFunc2 = function (result) {
            $("#TreatmentScheduleModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            TreatmentSchedule_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxPostRequest(apisite + TreatmentSchedule_API, data, successFunc2, AlertDanger);
    }
}

function TreatmentSchedule_GoDelete(a) {
    if (confirm('คุณต้องการลบข้อมูล ใช่หรือไม่?')) {
        var successFunc = function (result) {
            $("#TreatmentScheduleModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            TreatmentSchedule_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxDeleteRequest(apisite + TreatmentSchedule_API + a, null, successFunc, AlertDanger);
    }
}

//================= Data Table =========================================

var TreatmentScheduleTableV;

var TreatmentSchedule_setupTable = function (result) {
	tmp = '"';
    TreatmentScheduleTableV = $('#TreatmentScheduleTable').DataTable({
        "processing": true,
        "serverSide": false,
        "data": result,
		//"select": {
        //    "style": 'multi'
        //},
        "columns": [
		//{ "data": "" },
		{ "data": "id" },
                { "data": "surveyId_Survey_patientId" },
                { "data": "planingTopic" },
                { "data": "planingDetails" },
                { "data": "txt_startTreatmentDate" },
                { "data": "CaregiverId_User_username" },
                { "data": "TreatmentReportTopic" },
                { "data": "TreatmentReportDetails" },            
        ],
        "columnDefs": [
            {
                "targets": 0, //1,
                "data": "id",
                "render": function (data, type, row, meta) {
                    return "<button type='button' class='btn btn-warning btn-sm' onclick='javascript:TreatmentSchedule_GoEdit(" + tmp + data + tmp + ")'><i class='fa fa-pencil-alt'></i></button> <button type='button' class='btn btn-danger btn-sm' onclick='javascript:TreatmentSchedule_GoDelete(" + tmp + data + tmp + ")'><i class='fa fa-trash-alt'></i></button> ";
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

function TreatmentSchedule_InitiateDataTable() {
	startLoad();
	var p = $.param(TreatmentSchedule_GetSearchParameter());
    AjaxGetRequest(apisite + "/api/v1/TreatmentSchedule/GetListBySearch?"+p, TreatmentSchedule_setupTable, AlertDanger);
}

function TreatmentSchedule_DoSearch() {
    var p = $.param(TreatmentSchedule_GetSearchParameter());
    var TreatmentSchedule_reload = function (result) {
        TreatmentScheduleTableV.destroy();
        TreatmentSchedule_setupTable(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + "/api/v1/TreatmentSchedule/GetListBySearch?"+p, TreatmentSchedule_reload, AlertDanger);
}

function TreatmentSchedule_GetSelect(f) {
    var TreatmentSchedule_selectitem = [];
    $.each(TreatmentScheduleTableV.rows('.selected').data(), function (key, value) {
        TreatmentSchedule_selectitem.push(value[f]);
    });
    alert(TreatmentSchedule_selectitem);
}

//================= File Upload =========================================



//================= Multi-Selection Function =========================================



