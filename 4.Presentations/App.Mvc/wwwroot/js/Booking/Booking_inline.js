function Booking_ClearForm(i, blankItem) {
	var data = blankItem;
$("#Booking_id_" + i).val("");
$("#Booking_bookingNumber_" + i).val("");
DropDownClearFormAndFeedWithData($("#Booking_customerId_" + i), blankItem, "id", "name", "item_customerId", data.customerId);
$("#Booking_bookingDate_" + i).val("");
$("#Booking_scheduledRepairDate_" + i).val("");
$("#Booking_estimatedCost_" + i).val("");
$("#Booking_isConfirm_" + i).prop('checked', false);
$("#Booking_spacecraftName_" + i).val("");
$("#Booking_model_" + i).val("");
$("#Booking_manufacturer_" + i).val("");
$("#Booking_yearOfManufacture_" + i).val("");
$("#Booking_registrationNumber_" + i).val("");
$("#Booking_capacity_" + i).val("");
$("#Booking_spacecraftNotes_" + i).val("");
$("#Booking_bookingNotes_" + i).val("");



DropDownClearFormAndFeedWithData($("#Booking_staffId_" + i), blankItem, "id", "nickname", "item_staffId", data.staffId);

}

function Booking_FeedDataToForm(data, i, blankItem) {
$("#Booking_id_" + i).val(data.id);
$("#Booking_bookingNumber_" + i).val(data.bookingNumber);
DropDownClearFormAndFeedWithData($("#Booking_customerId_" + i), blankItem, "id", "name", "item_customerId", data.customerId);
$("#Booking_bookingDate_" + i).val(formatDate(data.bookingDate));
$("#Booking_scheduledRepairDate_" + i).val(formatDate(data.scheduledRepairDate));
$("#Booking_estimatedCost_" + i).val(data.estimatedCost);
CheckBoxFeedDataToForm($("#Booking_isConfirm_" + i), data.isConfirm);
$("#Booking_spacecraftName_" + i).val(data.spacecraftName);
$("#Booking_model_" + i).val(data.model);
$("#Booking_manufacturer_" + i).val(data.manufacturer);
$("#Booking_yearOfManufacture_" + i).val(data.yearOfManufacture);
$("#Booking_registrationNumber_" + i).val(data.registrationNumber);
$("#Booking_capacity_" + i).val(data.capacity);
$("#Booking_spacecraftNotes_" + i).val(data.spacecraftNotes);
$("#Booking_bookingNotes_" + i).val(data.bookingNotes);



DropDownClearFormAndFeedWithData($("#Booking_staffId_" + i), blankItem, "id", "nickname", "item_staffId", data.staffId);

}

function Booking_GetFromForm(obj, i) {
    var BookingObject = new Object();
BookingObject.id = obj.find("#Booking_id_" + i).val();
BookingObject.bookingNumber = obj.find("#Booking_bookingNumber_" + i).val();
BookingObject.customerId = obj.find("#Booking_customerId_" + i).val();
BookingObject.bookingDate = getDate(obj.find("#Booking_bookingDate_" + i).val());
BookingObject.scheduledRepairDate = getDate(obj.find("#Booking_scheduledRepairDate_" + i).val());
BookingObject.estimatedCost = obj.find("#Booking_estimatedCost_" + i).val();
BookingObject.isConfirm = CheckBoxGetFromForm(obj.find("#Booking_isConfirm_" + i));
BookingObject.spacecraftName = obj.find("#Booking_spacecraftName_" + i).val();
BookingObject.model = obj.find("#Booking_model_" + i).val();
BookingObject.manufacturer = obj.find("#Booking_manufacturer_" + i).val();
BookingObject.yearOfManufacture = obj.find("#Booking_yearOfManufacture_" + i).val();
BookingObject.registrationNumber = obj.find("#Booking_registrationNumber_" + i).val();
BookingObject.capacity = obj.find("#Booking_capacity_" + i).val();
BookingObject.spacecraftNotes = obj.find("#Booking_spacecraftNotes_" + i).val();
BookingObject.bookingNotes = obj.find("#Booking_bookingNotes_" + i).val();



BookingObject.staffId = obj.find("#Booking_staffId_" + i).val();

    BookingObject.active_mode = obj.find("#isActive_" + i + "_Booking").val();
    return BookingObject;
}

function Booking_GetAllData() {
    //Insert Booking List
    var Booking = [];
    $('#BookingBody tr').each(function () {
        var i = $(this).find("#rowCount").text();
        var eachBooking = Booking_GetFromForm($(this), i);
        Booking.push(eachBooking);
    });
    return Booking;
}

function Booking_Save(id) {
	//Insert Booking List
	var Booking = Booking_GetAllData();

    var successFunc = function (result) {
        AlertSuccess("ปรับปรุงข้อมูลเรียบร้อยแล้ว");
		endLoad();
    };
	startLoad();
	AjaxPutRequest(apisite + '/api/v1/Booking/UpdateMultiple', Booking, successFunc, AlertDanger);
}

function Booking_Get(id, blankItem) {

	$('#BookingBody').empty();

	var successFunc = function (response) {
    //console.log(response);
		$.each(response, function (i, data) {
			var tag = '<tr>';
            tag += '<td><label id="rowCount">' + (i + 1) + '</label><input type="hidden" id="isActive_' + (i + 1) + '_Booking" value="1" /><input class="form-control" type="hidden" id="Booking_id_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="Booking_bookingNumber_' + (i + 1)+'" /></td>';
 tag += '<td><select class="form-control" id="Booking_customerId_' + (i + 1) +'"></select></td>';
 tag += '<td><input class="form-control" type="text" id="Booking_bookingDate_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="Booking_scheduledRepairDate_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="number" id="Booking_estimatedCost_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="checkbox" id="Booking_isConfirm_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="Booking_spacecraftName_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="Booking_model_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="Booking_manufacturer_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="Booking_yearOfManufacture_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="Booking_registrationNumber_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="number" id="Booking_capacity_' + (i + 1)+'" /></td>';
 tag += '<td><textarea class="form-control" rows="2" cols="25" id="Booking_spacecraftNotes_' + (i + 1)+'" ></textarea></td>';
 tag += '<td><textarea class="form-control" rows="2" cols="25" id="Booking_bookingNotes_' + (i + 1)+'" ></textarea></td>';



 tag += '<td><select class="form-control" id="Booking_staffId_' + (i + 1) +'"></select></td>';

			tag += '<td><a href="javascript:;" class="btn btn-danger btn-sm" onclick="javascript:Booking_RemoveBooking(this)" id="removeBtn"><i class="fa fa-trash-alt" style="color:white;"></i></a><a href="javascript:;" class="btn btn-primary btn-sm" onclick="javascript:Booking_RestoreBooking(this)" style="display: none;" id="restoreBtn"><i class="fa fa-upload" style="color:white;"></i></a></td>';
			tag += '</tr>';
			$('#BookingBody').append($(tag));
			Booking_FeedDataToForm(data, (i + 1), blankItem);
		});
        Booking_Summary();
		endLoad();
	};
	startLoad();
	AjaxGetRequest(apisite + "/api/v1/Booking", successFunc, AlertDanger);
			//AjaxGetRequest(apisite + '/api/Booking/GetListBycustomerId/' + a, successFunc, AlertDanger);
		//AjaxGetRequest(apisite + '/api/Booking/GetListBystaffId/' + a, successFunc, AlertDanger);

}

function Booking_Add() {
	var successFunc = function (result) {
		var i = $("#BookingBody tr").length;
		var tag = '<tr>';
		tag += '<td><label id="rowCount">' + (i + 1) + '</label><input type="hidden" id="isActive_' + (i + 1) + '_Booking" value="1" /><input class="form-control" type="hidden" id="Booking_id_' + (i + 1)+'" /></td>';
	 tag += '<td><input class="form-control" type="text" id="Booking_bookingNumber_' + (i + 1)+'" /></td>';
 tag += '<td><select class="form-control" id="Booking_customerId_' + (i + 1) +'"></select></td>';
 tag += '<td><input class="form-control" type="text" id="Booking_bookingDate_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="Booking_scheduledRepairDate_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="number" id="Booking_estimatedCost_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="checkbox" id="Booking_isConfirm_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="Booking_spacecraftName_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="Booking_model_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="Booking_manufacturer_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="Booking_yearOfManufacture_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="Booking_registrationNumber_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="number" id="Booking_capacity_' + (i + 1)+'" /></td>';
 tag += '<td><textarea class="form-control" rows="2" cols="25" id="Booking_spacecraftNotes_' + (i + 1)+'" ></textarea></td>';
 tag += '<td><textarea class="form-control" rows="2" cols="25" id="Booking_bookingNotes_' + (i + 1)+'" ></textarea></td>';



 tag += '<td><select class="form-control" id="Booking_staffId_' + (i + 1) +'"></select></td>';

		tag += '<td><a href="javascript:;" class="btn btn-danger btn-sm" onclick="javascript:Booking_RemoveBooking(this)" id="removeBtn"><i class="fa fa-trash-alt" style="color:white;"></i></a><a href="javascript:;" class="btn btn-primary btn-sm" onclick="javascript:Booking_RestoreBooking(this)" style="display: none;" id="restoreBtn"><i class="fa fa-upload" style="color:white;"></i></a></td>';
		tag += '</tr>';
    
		$('#BookingBody').append($(tag));
		Booking_ClearForm(i + 1, result);
		endLoad();
	};
	startLoad();
    AjaxGetRequest(apisite + "/api/v1/Booking/" + "GetBlankItem", successFunc, AlertDanger);
}

function Booking_RemoveBooking(e) {
    if (confirm('กรุณากดตกลง เพื่อยืนยันการลบ?')) {
        $(e).closest('tr').find("input,select,textarea").attr('disabled', true);
        $(e).closest('tr').find("input,select,textarea").css({ opacity: '0.5' });
        $(e).hide();
        $(e).closest('tr').find("#restoreBtn").show();
        $(e).closest('tr').find("input").first().val("0");
        console.log($(e).closest('tr').find("input").first().val());
        Booking_Summary();
    }
}

function Booking_RestoreBooking(e) {
    if (confirm('กรุณากดตกลง เพื่อยืนยันการกู้คืน?')) {
        $(e).closest('tr').find("input,select,textarea").attr('disabled', false);
        $(e).closest('tr').find("input,select,textarea").css({ opacity: '1' });
        $(e).hide();
        $(e).closest('tr').find("#removeBtn").show();
        $(e).closest('tr').find("input").first().val("1");
        console.log($(e).closest('tr').find("input").first().val());
        Booking_Summary();
    }
}

function Booking_Summary() {
    var sum = 0;
    $(".input_score").each(function () {
        sum += +$(this).val();
    });
    $("#score_label").text("ผลรวม: " + sum);
}

function Booking_InitialForm(id) {
    var successFunc = function (result) {
        Booking_Get(id, result);
        endLoad();
    };
    startLoad();
    AjaxGetRequest(apisite + "/api/v1/Booking/" + "GetBlankItem", successFunc, AlertDanger);
}
