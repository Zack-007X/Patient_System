var UserHasSpecial_editMode = "CREATE";
var UserHasSpecial_API = "/api/v1/UserHasSpecial/";

//================= Search Customizaiton =========================================

function UserHasSpecial_GetSearchParameter() {
    var UserHasSpecialSearchObject = new Object();
UserHasSpecialSearchObject.masterRoleId = $("#s_UserHasSpecial_masterRoleId").val();
UserHasSpecialSearchObject.specialSkill = $("#s_UserHasSpecial_specialSkill").val();

    return UserHasSpecialSearchObject;
}

function UserHasSpecial_FeedDataToSearchForm(data) {
DropDownClearFormAndFeedWithData($("#s_UserHasSpecial_masterRoleId"), data, "id", "name", "item_masterRoleId", data.masterRoleId);
$("#s_UserHasSpecial_specialSkill").val(data.specialSkill);

}

//================= Form Data Customizaiton =========================================

function UserHasSpecial_FeedDataToForm(data) {
$("#UserHasSpecial_id").val(data.id);
DropDownClearFormAndFeedWithData($("#UserHasSpecial_masterRoleId"), data, "id", "name", "item_masterRoleId", data.masterRoleId);
$("#UserHasSpecial_specialSkill").val(data.specialSkill);
$("#UserHasSpecial_remark").val(data.remark);

}

function UserHasSpecial_GetFromForm() {
    var UserHasSpecialObject = new Object();
UserHasSpecialObject.id = $("#UserHasSpecial_id").val();
UserHasSpecialObject.masterRoleId = $("#UserHasSpecial_masterRoleId").val();
UserHasSpecialObject.specialSkill = $("#UserHasSpecial_specialSkill").val();
UserHasSpecialObject.remark = $("#UserHasSpecial_remark").val();


    return UserHasSpecialObject;
}

function UserHasSpecial_InitialForm(s) {
    var successFunc = function (result) {
        UserHasSpecial_FeedDataToForm(result);
		UserHasSpecial_FeedDataToSearchForm(result);
        if (s) {
            // Incase model popup
            $("#UserHasSpecialModel").modal("show");
        }
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + UserHasSpecial_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Form Mode Setup and Flow =========================================

function UserHasSpecial_GoCreate() {
    // Incase model popup
    UserHasSpecial_SetCreateForm(true);

    // Incase open new page
    //window_open(appsite + "/UserHasSpecialView/UserHasSpecial_d");
}

function UserHasSpecial_GoEdit(a) {
    // Incase model popup
    UserHasSpecial_SetEditForm(a);

    // Incase open new page
    //window_open(appsite + "/UserHasSpecialView/UserHasSpecial_d?id=" + a);
}

function UserHasSpecial_SetEditForm(a) {
    var successFunc = function (result) {
        UserHasSpecial_editMode = "UPDATE";
        UserHasSpecial_FeedDataToForm(result);
        $("#UserHasSpecialModel").modal("show");
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + UserHasSpecial_API + a, successFunc, AlertDanger);
}

function UserHasSpecial_SetCreateForm(s) {
    UserHasSpecial_editMode = "CREATE";
	UserHasSpecial_InitialForm(s);
}

function UserHasSpecial_RefreshTable() {
    // Incase model popup
    UserHasSpecial_DoSearch();

    // Incase open new page
    //window.parent.UserHasSpecial_DoSearch();
}

//================= Update and Delete =========================================

var UserHasSpecial_customValidation = function (group) {
    return "";
};

function UserHasSpecial_PutUpdate() {
	if (!ValidateForm('UserHasSpecial', UserHasSpecial_customValidation))
    {
        return;
    }

    var data = UserHasSpecial_GetFromForm();

    //Update Mode
    if (UserHasSpecial_editMode === "UPDATE") {
        var successFunc1 = function (result) {
            $("#UserHasSpecialModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            UserHasSpecial_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxPutRequest(apisite + UserHasSpecial_API + data.id, data, successFunc1, AlertDanger);
    }
    // Create mode
    else {
        var successFunc2 = function (result) {
            $("#UserHasSpecialModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            UserHasSpecial_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxPostRequest(apisite + UserHasSpecial_API, data, successFunc2, AlertDanger);
    }
}

function UserHasSpecial_GoDelete(a) {
    if (confirm('คุณต้องการลบข้อมูล ใช่หรือไม่?')) {
        var successFunc = function (result) {
            $("#UserHasSpecialModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            UserHasSpecial_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxDeleteRequest(apisite + UserHasSpecial_API + a, null, successFunc, AlertDanger);
    }
}

//================= Data Table =========================================

var UserHasSpecialTableV;

var UserHasSpecial_setupTable = function (result) {
	tmp = '"';
    UserHasSpecialTableV = $('#UserHasSpecialTable').DataTable({
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
                { "data": "specialSkill" },
                { "data": "remark" },            
        ],
        "columnDefs": [
            {
                "targets": 0, //1,
                "data": "id",
                "render": function (data, type, row, meta) {
                    return "<button type='button' class='btn btn-warning btn-sm' onclick='javascript:UserHasSpecial_GoEdit(" + tmp + data + tmp + ")'><i class='fa fa-pencil-alt'></i></button> <button type='button' class='btn btn-danger btn-sm' onclick='javascript:UserHasSpecial_GoDelete(" + tmp + data + tmp + ")'><i class='fa fa-trash-alt'></i></button> ";
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

function UserHasSpecial_InitiateDataTable() {
	startLoad();
	var p = $.param(UserHasSpecial_GetSearchParameter());
    AjaxGetRequest(apisite + "/api/v1/UserHasSpecial/GetListBySearch?"+p, UserHasSpecial_setupTable, AlertDanger);
}

function UserHasSpecial_DoSearch() {
    var p = $.param(UserHasSpecial_GetSearchParameter());
    var UserHasSpecial_reload = function (result) {
        UserHasSpecialTableV.destroy();
        UserHasSpecial_setupTable(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + "/api/v1/UserHasSpecial/GetListBySearch?"+p, UserHasSpecial_reload, AlertDanger);
}

function UserHasSpecial_GetSelect(f) {
    var UserHasSpecial_selectitem = [];
    $.each(UserHasSpecialTableV.rows('.selected').data(), function (key, value) {
        UserHasSpecial_selectitem.push(value[f]);
    });
    alert(UserHasSpecial_selectitem);
}

//================= File Upload =========================================



//================= Multi-Selection Function =========================================



