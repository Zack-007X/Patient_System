var Patient_editMode = "CREATE";
var Patient_API = "/api/v1/Patient/";

//================= Search Customizaiton =========================================

function Patient_GetSearchParameter() {
    var PatientSearchObject = new Object();
PatientSearchObject.firstname = $("#s_Patient_firstname").val();
PatientSearchObject.lastname = $("#s_Patient_lastname").val();

    return PatientSearchObject;
}

function Patient_FeedDataToSearchForm(data) {
$("#s_Patient_firstname").val(data.firstname);
$("#s_Patient_lastname").val(data.lastname);

}

//================= Form Data Customizaiton =========================================

function Patient_FeedDataToForm(data) {
$("#Patient_id").val(data.id);
DropDownClearFormAndFeedWithData($("#Patient_masterPrefixId"), data, "id", "name", "item_masterPrefixId", data.masterPrefixId);
$("#Patient_firstname").val(data.firstname);
$("#Patient_lastname").val(data.lastname);
$("#Patient_brithDate").val(formatDate(data.brithDate));
DropDownClearFormAndFeedWithData($("#Patient_masterGenderId"), data, "id", "name", "item_masterGenderId", data.masterGenderId);
$("#Patient_age").val(data.age);
$("#Patient_height").val(data.height);
$("#Patient_weight").val(data.weight);
$("#Patient_telephoneNumber").val(data.telephoneNumber);
$("#Patient_relativeName").val(data.relativeName);
$("#Patient_relativeContract").val(data.relativeContract);
$("#Patient_remark").val(data.remark);

}

function Patient_GetFromForm() {
    var PatientObject = new Object();
PatientObject.id = $("#Patient_id").val();
PatientObject.masterPrefixId = $("#Patient_masterPrefixId").val();
PatientObject.firstname = $("#Patient_firstname").val();
PatientObject.lastname = $("#Patient_lastname").val();
PatientObject.brithDate = getDate($("#Patient_brithDate").val());
PatientObject.masterGenderId = $("#Patient_masterGenderId").val();
PatientObject.age = $("#Patient_age").val();
PatientObject.height = $("#Patient_height").val();
PatientObject.weight = $("#Patient_weight").val();
PatientObject.telephoneNumber = $("#Patient_telephoneNumber").val();
PatientObject.relativeName = $("#Patient_relativeName").val();
PatientObject.relativeContract = $("#Patient_relativeContract").val();
PatientObject.remark = $("#Patient_remark").val();


    return PatientObject;
}

function Patient_InitialForm(s) {
    var successFunc = function (result) {
        Patient_FeedDataToForm(result);
		Patient_FeedDataToSearchForm(result);
        if (s) {
            // Incase model popup
            $("#PatientModel").modal("show");
        }
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + Patient_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Form Mode Setup and Flow =========================================

function Patient_GoCreate() {
    // Incase model popup
    Patient_SetCreateForm(true);

    // Incase open new page
    //window_open(appsite + "/PatientView/Patient_d");
}

function Patient_GoEdit(a) {
    // Incase model popup
    Patient_SetEditForm(a);

    // Incase open new page
    //window_open(appsite + "/PatientView/Patient_d?id=" + a);
}

function Patient_SetEditForm(a) {
    var successFunc = function (result) {
        Patient_editMode = "UPDATE";
        Patient_FeedDataToForm(result);
        $("#PatientModel").modal("show");
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + Patient_API + a, successFunc, AlertDanger);
}

function Patient_SetCreateForm(s) {
    Patient_editMode = "CREATE";
	Patient_InitialForm(s);
}

function Patient_RefreshTable() {
    // Incase model popup
    Patient_DoSearch();

    // Incase open new page
    //window.parent.Patient_DoSearch();
}

//================= Update and Delete =========================================

var Patient_customValidation = function (group) {
    return "";
};

function Patient_PutUpdate() {
	if (!ValidateForm('Patient', Patient_customValidation))
    {
        return;
    }

    var data = Patient_GetFromForm();

    //Update Mode
    if (Patient_editMode === "UPDATE") {
        var successFunc1 = function (result) {
            $("#PatientModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            Patient_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxPutRequest(apisite + Patient_API + data.id, data, successFunc1, AlertDanger);
    }
    // Create mode
    else {
        var successFunc2 = function (result) {
            $("#PatientModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            Patient_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxPostRequest(apisite + Patient_API, data, successFunc2, AlertDanger);
    }
}

function Patient_GoDelete(a) {
    if (confirm('คุณต้องการลบข้อมูล ใช่หรือไม่?')) {
        var successFunc = function (result) {
            $("#PatientModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            Patient_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxDeleteRequest(apisite + Patient_API + a, null, successFunc, AlertDanger);
    }
}

//================= Data Table =========================================

var PatientTableV;

var Patient_setupTable = function (result) {
	tmp = '"';
    PatientTableV = $('#PatientTable').DataTable({
        "processing": true,
        "serverSide": false,
        "data": result,
		//"select": {
        //    "style": 'multi'
        //},
        "columns": [
		//{ "data": "" },
		{ "data": "id" },
                { "data": "masterPrefixId_MasterPrefix_name" },
                { "data": "firstname" },
                { "data": "lastname" },
                { "data": "txt_brithDate" },
                { "data": "masterGenderId_MasterGender_name" },
                { "data": "age" },
                { "data": "height" },
                { "data": "weight" },
                { "data": "telephoneNumber" },
                { "data": "relativeName" },
                { "data": "relativeContract" },
                { "data": "remark" },            
        ],
        "columnDefs": [
            {
                "targets": 0, //1,
                "data": "id",
                "render": function (data, type, row, meta) {
                    return "<button type='button' class='btn btn-warning btn-sm' onclick='javascript:Patient_GoEdit(" + tmp + data + tmp + ")'><i class='fa fa-pencil-alt'></i></button> <button type='button' class='btn btn-danger btn-sm' onclick='javascript:Patient_GoDelete(" + tmp + data + tmp + ")'><i class='fa fa-trash-alt'></i></button> ";
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

function Patient_InitiateDataTable() {
	startLoad();
	var p = $.param(Patient_GetSearchParameter());
    AjaxGetRequest(apisite + "/api/v1/Patient/GetListBySearch?"+p, Patient_setupTable, AlertDanger);
}

function Patient_DoSearch() {
    var p = $.param(Patient_GetSearchParameter());
    var Patient_reload = function (result) {
        PatientTableV.destroy();
        Patient_setupTable(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + "/api/v1/Patient/GetListBySearch?"+p, Patient_reload, AlertDanger);
}

function Patient_GetSelect(f) {
    var Patient_selectitem = [];
    $.each(PatientTableV.rows('.selected').data(), function (key, value) {
        Patient_selectitem.push(value[f]);
    });
    alert(Patient_selectitem);
}

//================= File Upload =========================================



//================= Multi-Selection Function =========================================



