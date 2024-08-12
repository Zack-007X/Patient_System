var Booking_API = "/api/v1/Booking/";

//================= Search Customizaiton =========================================

function Booking_GetSearchParameter(fileType) {
    var BookingSearchObject = new Object();
BookingSearchObject.bookingNumber = $("#s_Booking_bookingNumber").val();
BookingSearchObject.scheduledRepairDate = formatDateForGetParameter(getDate($("#s_Booking_scheduledRepairDate").val()));
BookingSearchObject.spacecraftName = $("#s_Booking_spacecraftName").val();
BookingSearchObject.registrationNumber = $("#s_Booking_registrationNumber").val();
BookingSearchObject.staffId = $("#s_Booking_staffId").val();


    BookingSearchObject.fileType = fileType;

    //console.log(BookingSearchObject);

    return BookingSearchObject;
}

function Booking_FeedDataToSearchForm(data) {
$("#s_Booking_bookingNumber").val(data.bookingNumber);
$("#s_Booking_scheduledRepairDate").val(formatDate(data.scheduledRepairDate));
$("#s_Booking_spacecraftName").val(data.spacecraftName);
$("#s_Booking_registrationNumber").val(data.registrationNumber);
DropDownClearFormAndFeedWithData($("#s_Booking_staffId"), data, "id", "nickname", "item_staffId", data.staffId);

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

