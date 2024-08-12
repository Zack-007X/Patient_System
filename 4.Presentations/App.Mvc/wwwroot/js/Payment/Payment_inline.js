function Payment_ClearForm(i, blankItem) {
	var data = blankItem;
$("#Payment_id_" + i).val("");
DropDownClearFormAndFeedWithData($("#Payment_repairId_" + i), blankItem, "id", "repairCode", "item_repairId", data.repairId);
$("#Payment_amountEA_" + i).val("");
$("#Payment_documentCode_" + i).val("");
$("#Payment_paymentMethod_" + i).val("");
$("#Payment_exchangeItems_" + i).val("");
$("#Payment_paymentDate_" + i).val("");
$("#Payment_paymentNote_" + i).val("");

}

function Payment_FeedDataToForm(data, i, blankItem) {
$("#Payment_id_" + i).val(data.id);
DropDownClearFormAndFeedWithData($("#Payment_repairId_" + i), blankItem, "id", "repairCode", "item_repairId", data.repairId);
$("#Payment_amountEA_" + i).val(data.amountEA);
$("#Payment_documentCode_" + i).val(data.documentCode);
$("#Payment_paymentMethod_" + i).val(data.paymentMethod);
$("#Payment_exchangeItems_" + i).val(data.exchangeItems);
$("#Payment_paymentDate_" + i).val(formatDate(data.paymentDate));
$("#Payment_paymentNote_" + i).val(data.paymentNote);

}

function Payment_GetFromForm(obj, i) {
    var PaymentObject = new Object();
PaymentObject.id = obj.find("#Payment_id_" + i).val();
PaymentObject.repairId = obj.find("#Payment_repairId_" + i).val();
PaymentObject.amountEA = obj.find("#Payment_amountEA_" + i).val();
PaymentObject.documentCode = obj.find("#Payment_documentCode_" + i).val();
PaymentObject.paymentMethod = obj.find("#Payment_paymentMethod_" + i).val();
PaymentObject.exchangeItems = obj.find("#Payment_exchangeItems_" + i).val();
PaymentObject.paymentDate = getDate(obj.find("#Payment_paymentDate_" + i).val());
PaymentObject.paymentNote = obj.find("#Payment_paymentNote_" + i).val();

    PaymentObject.active_mode = obj.find("#isActive_" + i + "_Payment").val();
    return PaymentObject;
}

function Payment_GetAllData() {
    //Insert Payment List
    var Payment = [];
    $('#PaymentBody tr').each(function () {
        var i = $(this).find("#rowCount").text();
        var eachPayment = Payment_GetFromForm($(this), i);
        Payment.push(eachPayment);
    });
    return Payment;
}

function Payment_Save(id) {
	//Insert Payment List
	var Payment = Payment_GetAllData();

    var successFunc = function (result) {
        AlertSuccess("ปรับปรุงข้อมูลเรียบร้อยแล้ว");
		endLoad();
    };
	startLoad();
	AjaxPutRequest(apisite + '/api/v1/Payment/UpdateMultiple', Payment, successFunc, AlertDanger);
}

function Payment_Get(id, blankItem) {

	$('#PaymentBody').empty();

	var successFunc = function (response) {
    //console.log(response);
		$.each(response, function (i, data) {
			var tag = '<tr>';
            tag += '<td><label id="rowCount">' + (i + 1) + '</label><input type="hidden" id="isActive_' + (i + 1) + '_Payment" value="1" /><input class="form-control" type="hidden" id="Payment_id_' + (i + 1)+'" /></td>';
 tag += '<td><select class="form-control" id="Payment_repairId_' + (i + 1) +'"></select></td>';
 tag += '<td><input class="form-control" type="number" id="Payment_amountEA_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="Payment_documentCode_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="Payment_paymentMethod_' + (i + 1)+'" /></td>';
 tag += '<td><textarea class="form-control" rows="2" cols="25" id="Payment_exchangeItems_' + (i + 1)+'" ></textarea></td>';
 tag += '<td><input class="form-control" type="text" id="Payment_paymentDate_' + (i + 1)+'" /></td>';
 tag += '<td><textarea class="form-control" rows="2" cols="25" id="Payment_paymentNote_' + (i + 1)+'" ></textarea></td>';

			tag += '<td><a href="javascript:;" class="btn btn-danger btn-sm" onclick="javascript:Payment_RemovePayment(this)" id="removeBtn"><i class="fa fa-trash-alt" style="color:white;"></i></a><a href="javascript:;" class="btn btn-primary btn-sm" onclick="javascript:Payment_RestorePayment(this)" style="display: none;" id="restoreBtn"><i class="fa fa-upload" style="color:white;"></i></a></td>';
			tag += '</tr>';
			$('#PaymentBody').append($(tag));
			Payment_FeedDataToForm(data, (i + 1), blankItem);
		});
        Payment_Summary();
		endLoad();
	};
	startLoad();
	AjaxGetRequest(apisite + "/api/v1/Payment", successFunc, AlertDanger);
			//AjaxGetRequest(apisite + '/api/Payment/GetListByrepairId/' + a, successFunc, AlertDanger);

}

function Payment_Add() {
	var successFunc = function (result) {
		var i = $("#PaymentBody tr").length;
		var tag = '<tr>';
		tag += '<td><label id="rowCount">' + (i + 1) + '</label><input type="hidden" id="isActive_' + (i + 1) + '_Payment" value="1" /><input class="form-control" type="hidden" id="Payment_id_' + (i + 1)+'" /></td>';
	 tag += '<td><select class="form-control" id="Payment_repairId_' + (i + 1) +'"></select></td>';
 tag += '<td><input class="form-control" type="number" id="Payment_amountEA_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="Payment_documentCode_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="Payment_paymentMethod_' + (i + 1)+'" /></td>';
 tag += '<td><textarea class="form-control" rows="2" cols="25" id="Payment_exchangeItems_' + (i + 1)+'" ></textarea></td>';
 tag += '<td><input class="form-control" type="text" id="Payment_paymentDate_' + (i + 1)+'" /></td>';
 tag += '<td><textarea class="form-control" rows="2" cols="25" id="Payment_paymentNote_' + (i + 1)+'" ></textarea></td>';

		tag += '<td><a href="javascript:;" class="btn btn-danger btn-sm" onclick="javascript:Payment_RemovePayment(this)" id="removeBtn"><i class="fa fa-trash-alt" style="color:white;"></i></a><a href="javascript:;" class="btn btn-primary btn-sm" onclick="javascript:Payment_RestorePayment(this)" style="display: none;" id="restoreBtn"><i class="fa fa-upload" style="color:white;"></i></a></td>';
		tag += '</tr>';
    
		$('#PaymentBody').append($(tag));
		Payment_ClearForm(i + 1, result);
		endLoad();
	};
	startLoad();
    AjaxGetRequest(apisite + "/api/v1/Payment/" + "GetBlankItem", successFunc, AlertDanger);
}

function Payment_RemovePayment(e) {
    if (confirm('กรุณากดตกลง เพื่อยืนยันการลบ?')) {
        $(e).closest('tr').find("input,select,textarea").attr('disabled', true);
        $(e).closest('tr').find("input,select,textarea").css({ opacity: '0.5' });
        $(e).hide();
        $(e).closest('tr').find("#restoreBtn").show();
        $(e).closest('tr').find("input").first().val("0");
        console.log($(e).closest('tr').find("input").first().val());
        Payment_Summary();
    }
}

function Payment_RestorePayment(e) {
    if (confirm('กรุณากดตกลง เพื่อยืนยันการกู้คืน?')) {
        $(e).closest('tr').find("input,select,textarea").attr('disabled', false);
        $(e).closest('tr').find("input,select,textarea").css({ opacity: '1' });
        $(e).hide();
        $(e).closest('tr').find("#removeBtn").show();
        $(e).closest('tr').find("input").first().val("1");
        console.log($(e).closest('tr').find("input").first().val());
        Payment_Summary();
    }
}

function Payment_Summary() {
    var sum = 0;
    $(".input_score").each(function () {
        sum += +$(this).val();
    });
    $("#score_label").text("ผลรวม: " + sum);
}

function Payment_InitialForm(id) {
    var successFunc = function (result) {
        Payment_Get(id, result);
        endLoad();
    };
    startLoad();
    AjaxGetRequest(apisite + "/api/v1/Payment/" + "GetBlankItem", successFunc, AlertDanger);
}
