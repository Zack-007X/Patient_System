var Payment_API = "/api/v1/Payment/";

//================= Search Customizaiton =========================================

function Payment_GetSearchParameter(fileType) {
    var PaymentSearchObject = new Object();
PaymentSearchObject.documentCode = $("#s_Payment_documentCode").val();


    PaymentSearchObject.fileType = fileType;

    //console.log(PaymentSearchObject);

    return PaymentSearchObject;
}

function Payment_FeedDataToSearchForm(data) {
$("#s_Payment_documentCode").val(data.documentCode);

}

//================= Form Data Customizaiton =========================================

function Payment_InitialForm(s) {
    var successFunc = function (result) {
        Payment_FeedDataToSearchForm(result);
        endLoad();
    };
    startLoad();
    AjaxGetRequest(apisite + Payment_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Report display =========================================

var s_Payment_customValidation = function (group) {
    return "";
};


function Payment_DoSearch(fileType) {
    if (!ValidateForm('s_Payment', s_Payment_customValidation)) {
        return;
    }

    var p = $.param(Payment_GetSearchParameter(fileType));    
    var report_url = apisite + "/api/v1/Payment/Payment_report?" + p;

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

