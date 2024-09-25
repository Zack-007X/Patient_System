var User_API = "/api/v1/User/";

//================= Search Customizaiton =========================================

function User_GetSearchParameter(fileType) {
    var UserSearchObject = new Object();
UserSearchObject.username = $("#s_User_username").val();
UserSearchObject.firstname = $("#s_User_firstname").val();
UserSearchObject.lastname = $("#s_User_lastname").val();


    UserSearchObject.fileType = fileType;

    //console.log(UserSearchObject);

    return UserSearchObject;
}

function User_FeedDataToSearchForm(data) {
$("#s_User_username").val(data.username);
$("#s_User_firstname").val(data.firstname);
$("#s_User_lastname").val(data.lastname);

}

//================= Form Data Customizaiton =========================================

function User_InitialForm(s) {
    var successFunc = function (result) {
        User_FeedDataToSearchForm(result);
        endLoad();
    };
    startLoad();
    AjaxGetRequest(apisite + User_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Report display =========================================

var s_User_customValidation = function (group) {
    return "";
};


function User_DoSearch(fileType) {
    if (!ValidateForm('s_User', s_User_customValidation)) {
        return;
    }

    var p = $.param(User_GetSearchParameter(fileType));    
    var report_url = apisite + "/api/v1/User/User_report?" + p;

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

