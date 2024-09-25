var RoleHasPermission_API = "/api/v1/RoleHasPermission/";

//================= Search Customizaiton =========================================

function RoleHasPermission_GetSearchParameter(fileType) {
    var RoleHasPermissionSearchObject = new Object();
RoleHasPermissionSearchObject.masterRoleId = $("#s_RoleHasPermission_masterRoleId").val();
RoleHasPermissionSearchObject.masterPermissionId = $("#s_RoleHasPermission_masterPermissionId").val();


    RoleHasPermissionSearchObject.fileType = fileType;

    //console.log(RoleHasPermissionSearchObject);

    return RoleHasPermissionSearchObject;
}

function RoleHasPermission_FeedDataToSearchForm(data) {
DropDownClearFormAndFeedWithData($("#s_RoleHasPermission_masterRoleId"), data, "id", "name", "item_masterRoleId", data.masterRoleId);
DropDownClearFormAndFeedWithData($("#s_RoleHasPermission_masterPermissionId"), data, "id", "name", "item_masterPermissionId", data.masterPermissionId);

}

//================= Form Data Customizaiton =========================================

function RoleHasPermission_InitialForm(s) {
    var successFunc = function (result) {
        RoleHasPermission_FeedDataToSearchForm(result);
        endLoad();
    };
    startLoad();
    AjaxGetRequest(apisite + RoleHasPermission_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Report display =========================================

var s_RoleHasPermission_customValidation = function (group) {
    return "";
};


function RoleHasPermission_DoSearch(fileType) {
    if (!ValidateForm('s_RoleHasPermission', s_RoleHasPermission_customValidation)) {
        return;
    }

    var p = $.param(RoleHasPermission_GetSearchParameter(fileType));    
    var report_url = apisite + "/api/v1/RoleHasPermission/RoleHasPermission_report?" + p;

    if (fileType === "pdf") {
        var successFunc = function (result) {
            $("#report_result").attr("src", result);
            $("#report_result").show();
            //$("#report_xModel").modal("show");
            endLoad();
        };
        startLoad();
        AjaxGetBinaryRequest(report_url, successFunc, AlertDanger);
    } else {
        var successFunc = function (result) {
            $("#report_result").hide();
            window.open(result);
            endLoad();
        };
        startLoad();
        AjaxGetBinaryRequest(report_url, successFunc, AlertDanger);       
	}
}

