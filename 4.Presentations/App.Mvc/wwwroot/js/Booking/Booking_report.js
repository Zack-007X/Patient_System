var Booking_API = "/api/v1/Booking/";

//================= Search Customizaiton =========================================

function Booking_GetSearchParameter(fileType) {
    var BookingSearchObject = new Object();
    BookingSearchObject.bookingNumber = $("#s_Booking_bookingNumber").val();


    BookingSearchObject.fileType = fileType;

    //console.log(BookingSearchObject);

    return BookingSearchObject;
}

function Booking_FeedDataToSearchForm(data) {
    $("#s_Booking_bookingNumber").val(data.bookingNumber);

}

//================= Form Data Customizaiton =========================================

function Booking_InitialForm(s) {
    var successFunc = function (result) {
        Booking_FeedDataToSearchForm(result);
        endLoad();
    };
    startLoad();
    AjaxGetRequest(apisite + Booking_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Report display =========================================

var s_Booking_customValidation = function (group) {
    return "";
};


function Booking_DoSearch(fileType) {
    if (!ValidateForm('s_Booking', s_Booking_customValidation)) {
        return;
    }

    var p = $.param(Booking_GetSearchParameter(fileType));
    var report_url = apisite + "/api/v1/Booking/Booking_report?" + p;

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

