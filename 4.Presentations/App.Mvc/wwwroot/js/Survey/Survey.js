var Survey_editMode = "CREATE";
var Survey_API = "/api/v1/Survey/";

//================= Search Customizaiton =========================================

function Survey_GetSearchParameter() {
    var SurveySearchObject = new Object();
SurveySearchObject.patientId = $("#s_Survey_patientId").val();
SurveySearchObject.doctorId = $("#s_Survey_doctorId").val();
SurveySearchObject.masterPatientStateId = $("#s_Survey_masterPatientStateId").val();

    return SurveySearchObject;
}

function Survey_FeedDataToSearchForm(data) {
DropDownClearFormAndFeedWithData($("#s_Survey_patientId"), data, "id", "firstname", "item_patientId", data.patientId);
DropDownClearFormAndFeedWithData($("#s_Survey_doctorId"), data, "id", "username", "item_doctorId", data.doctorId);
DropDownClearFormAndFeedWithData($("#s_Survey_masterPatientStateId"), data, "id", "name", "item_masterPatientStateId", data.masterPatientStateId);

}

//================= Form Data Customizaiton =========================================

function Survey_FeedDataToForm(data) {
$("#Survey_id").val(data.id);
DropDownClearFormAndFeedWithData($("#Survey_patientId"), data, "id", "firstname", "item_patientId", data.patientId);
DropDownClearFormAndFeedWithData($("#Survey_doctorId"), data, "id", "username", "item_doctorId", data.doctorId);
DropDownClearFormAndFeedWithData($("#Survey_masterPatientStateId"), data, "id", "name", "item_masterPatientStateId", data.masterPatientStateId);
$("#Survey_BloodPressure").val(data.BloodPressure);
$("#Survey_OxygenLevel").val(data.OxygenLevel);
$("#Survey_HeartRate").val(data.HeartRate);
$("#Survey_SurveyDate").val(formatDate(data.SurveyDate));
$("#Survey_SurveyDetail").val(data.SurveyDetail);
$("#Survey_remark").val(data.remark);

}

function Survey_GetFromForm() {
    var SurveyObject = new Object();
SurveyObject.id = $("#Survey_id").val();
SurveyObject.patientId = $("#Survey_patientId").val();
SurveyObject.doctorId = $("#Survey_doctorId").val();
SurveyObject.masterPatientStateId = $("#Survey_masterPatientStateId").val();
SurveyObject.BloodPressure = $("#Survey_BloodPressure").val();
SurveyObject.OxygenLevel = $("#Survey_OxygenLevel").val();
SurveyObject.HeartRate = $("#Survey_HeartRate").val();
SurveyObject.SurveyDate = getDate($("#Survey_SurveyDate").val());
SurveyObject.SurveyDetail = $("#Survey_SurveyDetail").val();
SurveyObject.remark = $("#Survey_remark").val();


    return SurveyObject;
}

function Survey_InitialForm(s) {
    var successFunc = function (result) {
        Survey_FeedDataToForm(result);
		Survey_FeedDataToSearchForm(result);
        if (s) {
            // Incase model popup
            $("#SurveyModel").modal("show");
        }
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + Survey_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Form Mode Setup and Flow =========================================

function Survey_GoCreate() {
    // Incase model popup
    Survey_SetCreateForm(true);

    // Incase open new page
    //window_open(appsite + "/SurveyView/Survey_d");
}

function Survey_GoEdit(a) {
    // Incase model popup
    Survey_SetEditForm(a);

    // Incase open new page
    //window_open(appsite + "/SurveyView/Survey_d?id=" + a);
}

function Survey_SetEditForm(a) {
    var successFunc = function (result) {
        Survey_editMode = "UPDATE";
        Survey_FeedDataToForm(result);
        $("#SurveyModel").modal("show");
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + Survey_API + a, successFunc, AlertDanger);
}

function Survey_SetCreateForm(s) {
    Survey_editMode = "CREATE";
	Survey_InitialForm(s);
}

function Survey_RefreshTable() {
    // Incase model popup
    Survey_DoSearch();

    // Incase open new page
    //window.parent.Survey_DoSearch();
}

//================= Update and Delete =========================================

var Survey_customValidation = function (group) {
    return "";
};

function Survey_PutUpdate() {
	if (!ValidateForm('Survey', Survey_customValidation))
    {
        return;
    }

    var data = Survey_GetFromForm();

    //Update Mode
    if (Survey_editMode === "UPDATE") {
        var successFunc1 = function (result) {
            $("#SurveyModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            Survey_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxPutRequest(apisite + Survey_API + data.id, data, successFunc1, AlertDanger);
    }
    // Create mode
    else {
        var successFunc2 = function (result) {
            $("#SurveyModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            Survey_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxPostRequest(apisite + Survey_API, data, successFunc2, AlertDanger);
    }
}

function Survey_GoDelete(a) {
    if (confirm('คุณต้องการลบข้อมูล ใช่หรือไม่?')) {
        var successFunc = function (result) {
            $("#SurveyModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            Survey_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxDeleteRequest(apisite + Survey_API + a, null, successFunc, AlertDanger);
    }
}

//================= Data Table =========================================

var SurveyTableV;

var Survey_setupTable = function (result) {
	tmp = '"';
    SurveyTableV = $('#SurveyTable').DataTable({
        "processing": true,
        "serverSide": false,
        "data": result,
		//"select": {
        //    "style": 'multi'
        //},
        "columns": [
		//{ "data": "" },
		{ "data": "id" },
                { "data": "patientId_Patient_firstname" },
                { "data": "doctorId_User_username" },
                { "data": "masterPatientStateId_MasterPatientState_name" },
                { "data": "BloodPressure" },
                { "data": "OxygenLevel" },
                { "data": "HeartRate" },
                { "data": "txt_SurveyDate" },            
        ],
        "columnDefs": [
            {
                "targets": 0, //1,
                "data": "id",
                "render": function (data, type, row, meta) {
                    return "<button type='button' class='btn btn-warning btn-sm' onclick='javascript:Survey_GoEdit(" + tmp + data + tmp + ")'><i class='fa fa-pencil-alt'></i></button> <button type='button' class='btn btn-danger btn-sm' onclick='javascript:Survey_GoDelete(" + tmp + data + tmp + ")'><i class='fa fa-trash-alt'></i></button> ";
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

function Survey_InitiateDataTable() {
	startLoad();
	var p = $.param(Survey_GetSearchParameter());
    AjaxGetRequest(apisite + "/api/v1/Survey/GetListBySearch?"+p, Survey_setupTable, AlertDanger);
}

function Survey_DoSearch() {
    var p = $.param(Survey_GetSearchParameter());
    var Survey_reload = function (result) {
        SurveyTableV.destroy();
        Survey_setupTable(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + "/api/v1/Survey/GetListBySearch?"+p, Survey_reload, AlertDanger);
}

function Survey_GetSelect(f) {
    var Survey_selectitem = [];
    $.each(SurveyTableV.rows('.selected').data(), function (key, value) {
        Survey_selectitem.push(value[f]);
    });
    alert(Survey_selectitem);
}

//================= File Upload =========================================



//================= Multi-Selection Function =========================================



