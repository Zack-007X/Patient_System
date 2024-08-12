var Booking_editMode = "CREATE";
var Booking_API = "/api/v1/Booking/";

//================= Form Data Customizaiton =========================================

function Booking_FeedDataToForm(data) {
$("#Booking_id").val(data.id);
$("#Booking_bookingNumber").val(data.bookingNumber);
DropDownClearFormAndFeedWithData($("#Booking_customerId"), data, "id", "name", "item_customerId", data.customerId);
$("#Booking_bookingDate").val(formatDate(data.bookingDate));
$("#Booking_scheduledRepairDate").val(formatDate(data.scheduledRepairDate));
$("#Booking_estimatedCost").val(data.estimatedCost);
CheckBoxFeedDataToForm($("#Booking_isConfirm"), data.isConfirm);
$("#Booking_spacecraftName").val(data.spacecraftName);
$("#Booking_model").val(data.model);
$("#Booking_manufacturer").val(data.manufacturer);
$("#Booking_yearOfManufacture").val(data.yearOfManufacture);
$("#Booking_registrationNumber").val(data.registrationNumber);
$("#Booking_capacity").val(data.capacity);
$("#Booking_spacecraftNotes").val(data.spacecraftNotes);
$("#Booking_bookingNotes").val(data.bookingNotes);
    feedFileToControlImagePhoto(data.spacecraftImage1, data.spacecraftImage1Display, "Booking_spacecraftImage1", "file");
    feedFileToControlImagePhoto(data.spacecraftImage2, data.spacecraftImage2Display, "Booking_spacecraftImage2", "file");
    feedFileToControlImagePhoto(data.spacecraftImage3, data.spacecraftImage3Display, "Booking_spacecraftImage3", "file");
DropDownClearFormAndFeedWithData($("#Booking_staffId"), data, "id", "nickname", "item_staffId", data.staffId);


    $('input[type="text"][oninput="formatInputNumber(this)"]').trigger('input');
}

function Booking_GetFromForm() {
    var BookingObject = new Object();
BookingObject.id = $("#Booking_id").val();
BookingObject.bookingNumber = $("#Booking_bookingNumber").val();
BookingObject.customerId = $("#Booking_customerId").val();
BookingObject.bookingDate = getDate($("#Booking_bookingDate").val());
BookingObject.scheduledRepairDate = getDate($("#Booking_scheduledRepairDate").val());
BookingObject.estimatedCost = $("#Booking_estimatedCost").val();
BookingObject.isConfirm = CheckBoxGetFromForm($("#Booking_isConfirm"));
BookingObject.spacecraftName = $("#Booking_spacecraftName").val();
BookingObject.model = $("#Booking_model").val();
BookingObject.manufacturer = $("#Booking_manufacturer").val();
BookingObject.yearOfManufacture = $("#Booking_yearOfManufacture").val();
BookingObject.registrationNumber = $("#Booking_registrationNumber").val();
BookingObject.capacity = $("#Booking_capacity").val();
BookingObject.spacecraftNotes = $("#Booking_spacecraftNotes").val();
BookingObject.bookingNotes = $("#Booking_bookingNotes").val();
if ($("#Booking_spacecraftImage1_hidURL").val() !== null) { 
 BookingObject.spacecraftImage1 = $("#Booking_spacecraftImage1_hidURL").val();
}else {
 BookingObject.spacecraftImage1 = "";
}
if ($("#Booking_spacecraftImage2_hidURL").val() !== null) { 
 BookingObject.spacecraftImage2 = $("#Booking_spacecraftImage2_hidURL").val();
}else {
 BookingObject.spacecraftImage2 = "";
}
if ($("#Booking_spacecraftImage3_hidURL").val() !== null) { 
 BookingObject.spacecraftImage3 = $("#Booking_spacecraftImage3_hidURL").val();
}else {
 BookingObject.spacecraftImage3 = "";
}
BookingObject.staffId = $("#Booking_staffId").val();


    return BookingObject;
}

function Booking_InitialForm() {
    var successFunc = function (result) {
        Booking_FeedDataToForm(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + Booking_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Form Mode Setup and Flow =========================================

function Booking_SetEditForm(a) {
    var successFunc = function (result) {
        Booking_editMode = "UPDATE";
        Booking_FeedDataToForm(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + Booking_API + a, successFunc, AlertDanger);
}

function Booking_SetCreateForm() {
    Booking_editMode = "CREATE";
	Booking_InitialForm();
}

//================= Update and Delete =========================================

var Booking_customValidation = function (group) {
    return "";
};

function Booking_PutUpdate() {
	if (!ValidateForm('Booking', Booking_customValidation))
    {
        return;
    }
    var data = Booking_GetFromForm();

    //Update Mode
    if (Booking_editMode === "UPDATE") {
        var successFunc1 = function (result) {
            AlertSuccess(result.code+" "+result.message);
			endLoad();
        };
		startLoad();
        AjaxPutRequest(apisite + Booking_API + data.id, data, successFunc1, AlertDanger);
    }
    // Create mode
    else {
        var successFunc2 = function (result) {
            AlertSuccess(result.code+" "+result.message);
			endLoad();
        };
		startLoad();
        AjaxPostRequest(apisite + Booking_API, data, successFunc2, AlertDanger);
    }
}

function Booking_GoDelete(a) {
    if (confirm('คุณต้องการลบ ' + a + ' ใช่หรือไม่?')) {
        var successFunc = function (result) {
            AlertSuccess(result.code+" "+result.message);
            Booking_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxDeleteRequest(apisite + Booking_API + a, null, successFunc, AlertDanger);
    }
}

//================= File Upload =========================================


$('#Booking_spacecraftImage1_file').change(function () {
    UploadImagePhoto($('#Booking_spacecraftImage1_file'), 'Booking_spacecraftImage1');
});

$('#Booking_spacecraftImage2_file').change(function () {
    UploadImagePhoto($('#Booking_spacecraftImage2_file'), 'Booking_spacecraftImage2');
});

$('#Booking_spacecraftImage3_file').change(function () {
    UploadImagePhoto($('#Booking_spacecraftImage3_file'), 'Booking_spacecraftImage3');
});


//================= Multi-Selection Function =========================================


