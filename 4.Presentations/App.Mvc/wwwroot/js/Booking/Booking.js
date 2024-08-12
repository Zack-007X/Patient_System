var Booking_editMode = "CREATE";
var Booking_API = "/api/v1/Booking/";

//================= Search Customizaiton =========================================

function Booking_GetSearchParameter() {
    var BookingSearchObject = new Object();
BookingSearchObject.bookingNumber = $("#s_Booking_bookingNumber").val();
BookingSearchObject.scheduledRepairDate = formatDateForGetParameter(getDate($("#s_Booking_scheduledRepairDate").val()));
BookingSearchObject.spacecraftName = $("#s_Booking_spacecraftName").val();
BookingSearchObject.registrationNumber = $("#s_Booking_registrationNumber").val();
BookingSearchObject.staffId = $("#s_Booking_staffId").val();

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

function Booking_InitialForm(s) {
    var successFunc = function (result) {
        Booking_FeedDataToForm(result);
		Booking_FeedDataToSearchForm(result);
        if (s) {
            // Incase model popup
            $("#BookingModel").modal("show");
        }
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + Booking_API + "GetBlankItem", successFunc, AlertDanger);
}

//================= Form Mode Setup and Flow =========================================

function Booking_GoCreate() {
    // Incase model popup
    Booking_SetCreateForm(true);

    // Incase open new page
    //window_open(appsite + "/BookingView/Booking_d");
}

function Booking_GoEdit(a) {
    // Incase model popup
    Booking_SetEditForm(a);

    // Incase open new page
    //window_open(appsite + "/BookingView/Booking_d?id=" + a);
}

function Booking_SetEditForm(a) {
    var successFunc = function (result) {
        Booking_editMode = "UPDATE";
        Booking_FeedDataToForm(result);
        $("#BookingModel").modal("show");
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + Booking_API + a, successFunc, AlertDanger);
}

function Booking_SetCreateForm(s) {
    Booking_editMode = "CREATE";
	Booking_InitialForm(s);
}

function Booking_RefreshTable() {
    // Incase model popup
    Booking_DoSearch();

    // Incase open new page
    //window.parent.Booking_DoSearch();
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
            $("#BookingModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            Booking_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxPutRequest(apisite + Booking_API + data.id, data, successFunc1, AlertDanger);
    }
    // Create mode
    else {
        var successFunc2 = function (result) {
            $("#BookingModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            Booking_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxPostRequest(apisite + Booking_API, data, successFunc2, AlertDanger);
    }
}

function Booking_GoDelete(a) {
    if (confirm('คุณต้องการลบข้อมูล ใช่หรือไม่?')) {
        var successFunc = function (result) {
            $("#BookingModel").modal("hide");
            AlertSuccess(result.code+" "+result.message);
            Booking_RefreshTable();
			endLoad();
        };
		startLoad();
        AjaxDeleteRequest(apisite + Booking_API + a, null, successFunc, AlertDanger);
    }
}

//================= Data Table =========================================

var BookingTableV;

var Booking_setupTable = function (result) {
	tmp = '"';
    BookingTableV = $('#BookingTable').DataTable({
        "processing": true,
        "serverSide": false,
        "data": result,
		//"select": {
        //    "style": 'multi'
        //},
        "columns": [
		//{ "data": "" },
		{ "data": "id" },
                { "data": "bookingNumber" },
                { "data": "customerId_Customer_name" },
                { "data": "txt_scheduledRepairDate" },
                { "data": "estimatedCost" },
                { "data": "isConfirm" },
                { "data": "spacecraftName" },
                { "data": "model" },
                { "data": "manufacturer" },
                { "data": "yearOfManufacture" },
                { "data": "registrationNumber" },
                { "data": "staffId_User_nickname" },            
        ],
        "columnDefs": [
            {
                "targets": 0, //1,
                "data": "id",
                "render": function (data, type, row, meta) {
                    return "<button type='button' class='btn btn-warning btn-sm' onclick='javascript:Booking_GoEdit(" + tmp + data + tmp + ")'><i class='fa fa-pencil-alt'></i></button> <button type='button' class='btn btn-danger btn-sm' onclick='javascript:Booking_GoDelete(" + tmp + data + tmp + ")'><i class='fa fa-trash-alt'></i></button> ";
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

function Booking_InitiateDataTable() {
	startLoad();
	var p = $.param(Booking_GetSearchParameter());
    AjaxGetRequest(apisite + "/api/v1/Booking/GetListBySearch?"+p, Booking_setupTable, AlertDanger);
}

function Booking_DoSearch() {
    var p = $.param(Booking_GetSearchParameter());
    var Booking_reload = function (result) {
        BookingTableV.destroy();
        Booking_setupTable(result);
		endLoad();
    };
	startLoad();
    AjaxGetRequest(apisite + "/api/v1/Booking/GetListBySearch?"+p, Booking_reload, AlertDanger);
}

function Booking_GetSelect(f) {
    var Booking_selectitem = [];
    $.each(BookingTableV.rows('.selected').data(), function (key, value) {
        Booking_selectitem.push(value[f]);
    });
    alert(Booking_selectitem);
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



