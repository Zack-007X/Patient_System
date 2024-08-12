var Customer_API = "/api/v1/Customer/";

//================= Search Customizaiton =========================================

function Customer_GetSearchParameter(fileType) {
    var CustomerSearchObject = new Object();
CustomerSearchObject.name = $("#s_Customer_name").val();


    CustomerSearchObject.fileType = fileType;

    //console.log(CustomerSearchObject);

    return CustomerSearchObject;
}

function Customer_FeedDataToSearchForm(data) {
$("#s_Customer_name").val(data.name);

}

//================= Form Data Customizaiton =========================================

function Customer_InitialForm(s) {
    var successFunc = function (result) {
        Customer_FeedDataToSearchForm(result);
        endLoad();
    };
    startLoad();
    AjaxGetRequest(apisite + Customer_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Report display =========================================

var s_Customer_customValidation = function (group) {
    return "";
};


function Customer_DoSearch(fileType) {
    if (!ValidateForm('s_Customer', s_Customer_customValidation)) {
        return;
    }

    var p = $.param(Customer_GetSearchParameter(fileType));    
    var report_url = apisite + "/api/v1/Customer/Customer_report?" + p;

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

