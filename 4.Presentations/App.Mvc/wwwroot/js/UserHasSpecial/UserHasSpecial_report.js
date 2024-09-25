var UserHasSpecial_API = "/api/v1/UserHasSpecial/";

//================= Search Customizaiton =========================================

function UserHasSpecial_GetSearchParameter(fileType) {
    var UserHasSpecialSearchObject = new Object();
UserHasSpecialSearchObject.masterRoleId = $("#s_UserHasSpecial_masterRoleId").val();
UserHasSpecialSearchObject.specialSkill = $("#s_UserHasSpecial_specialSkill").val();


    UserHasSpecialSearchObject.fileType = fileType;

    //console.log(UserHasSpecialSearchObject);

    return UserHasSpecialSearchObject;
}

function UserHasSpecial_FeedDataToSearchForm(data) {
DropDownClearFormAndFeedWithData($("#s_UserHasSpecial_masterRoleId"), data, "id", "name", "item_masterRoleId", data.masterRoleId);
$("#s_UserHasSpecial_specialSkill").val(data.specialSkill);

}

//================= Form Data Customizaiton =========================================

function UserHasSpecial_InitialForm(s) {
    var successFunc = function (result) {
        UserHasSpecial_FeedDataToSearchForm(result);
        endLoad();
    };
    startLoad();
    AjaxGetRequest(apisite + UserHasSpecial_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Report display =========================================

var s_UserHasSpecial_customValidation = function (group) {
    return "";
};


function UserHasSpecial_DoSearch(fileType) {
    if (!ValidateForm('s_UserHasSpecial', s_UserHasSpecial_customValidation)) {
        return;
    }

    var p = $.param(UserHasSpecial_GetSearchParameter(fileType));    
    var report_url = apisite + "/api/v1/UserHasSpecial/UserHasSpecial_report?" + p;

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

