var MasterGender_API = "/api/v1/MasterGender/";

//================= Search Customizaiton =========================================

function MasterGender_GetSearchParameter(fileType) {
    var MasterGenderSearchObject = new Object();
MasterGenderSearchObject.code = $("#s_MasterGender_code").val();
MasterGenderSearchObject.name = $("#s_MasterGender_name").val();


    MasterGenderSearchObject.fileType = fileType;

    //console.log(MasterGenderSearchObject);

    return MasterGenderSearchObject;
}

function MasterGender_FeedDataToSearchForm(data) {
$("#s_MasterGender_code").val(data.code);
$("#s_MasterGender_name").val(data.name);

}

//================= Form Data Customizaiton =========================================

function MasterGender_InitialForm(s) {
    var successFunc = function (result) {
        MasterGender_FeedDataToSearchForm(result);
        endLoad();
    };
    startLoad();
    AjaxGetRequest(apisite + MasterGender_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Report display =========================================

var s_MasterGender_customValidation = function (group) {
    return "";
};


function MasterGender_DoSearch(fileType) {
    if (!ValidateForm('s_MasterGender', s_MasterGender_customValidation)) {
        return;
    }

    var p = $.param(MasterGender_GetSearchParameter(fileType));    
    var report_url = apisite + "/api/v1/MasterGender/MasterGender_report?" + p;

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

