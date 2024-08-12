function Customer_ClearForm(i, blankItem) {
	var data = blankItem;
$("#Customer_id_" + i).val("");
$("#Customer_name_" + i).val("");
$("#Customer_contactInfo_" + i).val("");
$("#Customer_address_" + i).val("");
$("#Customer_username_" + i).val("");
$("#Customer_password_" + i).val("");

}

function Customer_FeedDataToForm(data, i, blankItem) {
$("#Customer_id_" + i).val(data.id);
$("#Customer_name_" + i).val(data.name);
$("#Customer_contactInfo_" + i).val(data.contactInfo);
$("#Customer_address_" + i).val(data.address);
$("#Customer_username_" + i).val(data.username);
$("#Customer_password_" + i).val(data.password);

}

function Customer_GetFromForm(obj, i) {
    var CustomerObject = new Object();
CustomerObject.id = obj.find("#Customer_id_" + i).val();
CustomerObject.name = obj.find("#Customer_name_" + i).val();
CustomerObject.contactInfo = obj.find("#Customer_contactInfo_" + i).val();
CustomerObject.address = obj.find("#Customer_address_" + i).val();
CustomerObject.username = obj.find("#Customer_username_" + i).val();
CustomerObject.password = obj.find("#Customer_password_" + i).val();

    CustomerObject.active_mode = obj.find("#isActive_" + i + "_Customer").val();
    return CustomerObject;
}

function Customer_GetAllData() {
    //Insert Customer List
    var Customer = [];
    $('#CustomerBody tr').each(function () {
        var i = $(this).find("#rowCount").text();
        var eachCustomer = Customer_GetFromForm($(this), i);
        Customer.push(eachCustomer);
    });
    return Customer;
}

function Customer_Save(id) {
	//Insert Customer List
	var Customer = Customer_GetAllData();

    var successFunc = function (result) {
        AlertSuccess("ปรับปรุงข้อมูลเรียบร้อยแล้ว");
		endLoad();
    };
	startLoad();
	AjaxPutRequest(apisite + '/api/v1/Customer/UpdateMultiple', Customer, successFunc, AlertDanger);
}

function Customer_Get(id, blankItem) {

	$('#CustomerBody').empty();

	var successFunc = function (response) {
    //console.log(response);
		$.each(response, function (i, data) {
			var tag = '<tr>';
            tag += '<td><label id="rowCount">' + (i + 1) + '</label><input type="hidden" id="isActive_' + (i + 1) + '_Customer" value="1" /><input class="form-control" type="hidden" id="Customer_id_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="Customer_name_' + (i + 1)+'" /></td>';
 tag += '<td><textarea class="form-control" rows="2" cols="25" id="Customer_contactInfo_' + (i + 1)+'" ></textarea></td>';
 tag += '<td><textarea class="form-control" rows="2" cols="25" id="Customer_address_' + (i + 1)+'" ></textarea></td>';
 tag += '<td><input class="form-control" type="text" id="Customer_username_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="Customer_password_' + (i + 1)+'" /></td>';

			tag += '<td><a href="javascript:;" class="btn btn-danger btn-sm" onclick="javascript:Customer_RemoveCustomer(this)" id="removeBtn"><i class="fa fa-trash-alt" style="color:white;"></i></a><a href="javascript:;" class="btn btn-primary btn-sm" onclick="javascript:Customer_RestoreCustomer(this)" style="display: none;" id="restoreBtn"><i class="fa fa-upload" style="color:white;"></i></a></td>';
			tag += '</tr>';
			$('#CustomerBody').append($(tag));
			Customer_FeedDataToForm(data, (i + 1), blankItem);
		});
        Customer_Summary();
		endLoad();
	};
	startLoad();
	AjaxGetRequest(apisite + "/api/v1/Customer", successFunc, AlertDanger);
	
}

function Customer_Add() {
	var successFunc = function (result) {
		var i = $("#CustomerBody tr").length;
		var tag = '<tr>';
		tag += '<td><label id="rowCount">' + (i + 1) + '</label><input type="hidden" id="isActive_' + (i + 1) + '_Customer" value="1" /><input class="form-control" type="hidden" id="Customer_id_' + (i + 1)+'" /></td>';
	 tag += '<td><input class="form-control" type="text" id="Customer_name_' + (i + 1)+'" /></td>';
 tag += '<td><textarea class="form-control" rows="2" cols="25" id="Customer_contactInfo_' + (i + 1)+'" ></textarea></td>';
 tag += '<td><textarea class="form-control" rows="2" cols="25" id="Customer_address_' + (i + 1)+'" ></textarea></td>';
 tag += '<td><input class="form-control" type="text" id="Customer_username_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="Customer_password_' + (i + 1)+'" /></td>';

		tag += '<td><a href="javascript:;" class="btn btn-danger btn-sm" onclick="javascript:Customer_RemoveCustomer(this)" id="removeBtn"><i class="fa fa-trash-alt" style="color:white;"></i></a><a href="javascript:;" class="btn btn-primary btn-sm" onclick="javascript:Customer_RestoreCustomer(this)" style="display: none;" id="restoreBtn"><i class="fa fa-upload" style="color:white;"></i></a></td>';
		tag += '</tr>';
    
		$('#CustomerBody').append($(tag));
		Customer_ClearForm(i + 1, result);
		endLoad();
	};
	startLoad();
    AjaxGetRequest(apisite + "/api/v1/Customer/" + "GetBlankItem", successFunc, AlertDanger);
}

function Customer_RemoveCustomer(e) {
    if (confirm('กรุณากดตกลง เพื่อยืนยันการลบ?')) {
        $(e).closest('tr').find("input,select,textarea").attr('disabled', true);
        $(e).closest('tr').find("input,select,textarea").css({ opacity: '0.5' });
        $(e).hide();
        $(e).closest('tr').find("#restoreBtn").show();
        $(e).closest('tr').find("input").first().val("0");
        console.log($(e).closest('tr').find("input").first().val());
        Customer_Summary();
    }
}

function Customer_RestoreCustomer(e) {
    if (confirm('กรุณากดตกลง เพื่อยืนยันการกู้คืน?')) {
        $(e).closest('tr').find("input,select,textarea").attr('disabled', false);
        $(e).closest('tr').find("input,select,textarea").css({ opacity: '1' });
        $(e).hide();
        $(e).closest('tr').find("#removeBtn").show();
        $(e).closest('tr').find("input").first().val("1");
        console.log($(e).closest('tr').find("input").first().val());
        Customer_Summary();
    }
}

function Customer_Summary() {
    var sum = 0;
    $(".input_score").each(function () {
        sum += +$(this).val();
    });
    $("#score_label").text("ผลรวม: " + sum);
}

function Customer_InitialForm(id) {
    var successFunc = function (result) {
        Customer_Get(id, result);
        endLoad();
    };
    startLoad();
    AjaxGetRequest(apisite + "/api/v1/Customer/" + "GetBlankItem", successFunc, AlertDanger);
}
