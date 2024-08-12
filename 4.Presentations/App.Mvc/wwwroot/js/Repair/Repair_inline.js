function Repair_ClearForm(i, blankItem) {
	var data = blankItem;
$("#Repair_id_" + i).val("");
DropDownClearFormAndFeedWithData($("#Repair_bookingId_" + i), blankItem, "id", "bookingNumber", "item_bookingId", data.bookingId);
$("#Repair_repairCode_" + i).val("");
DropDownClearFormAndFeedWithData($("#Repair_technicianId_" + i), blankItem, "id", "nickname", "item_technicianId", data.technicianId);
$("#Repair_startDate_" + i).val("");
$("#Repair_endDate_" + i).val("");
$("#Repair_totalCostEA_" + i).val("");
$("#Repair_repairNote_" + i).val("");

}

function Repair_FeedDataToForm(data, i, blankItem) {
$("#Repair_id_" + i).val(data.id);
DropDownClearFormAndFeedWithData($("#Repair_bookingId_" + i), blankItem, "id", "bookingNumber", "item_bookingId", data.bookingId);
$("#Repair_repairCode_" + i).val(data.repairCode);
DropDownClearFormAndFeedWithData($("#Repair_technicianId_" + i), blankItem, "id", "nickname", "item_technicianId", data.technicianId);
$("#Repair_startDate_" + i).val(formatDate(data.startDate));
$("#Repair_endDate_" + i).val(formatDate(data.endDate));
$("#Repair_totalCostEA_" + i).val(data.totalCostEA);
$("#Repair_repairNote_" + i).val(data.repairNote);

}

function Repair_GetFromForm(obj, i) {
    var RepairObject = new Object();
RepairObject.id = obj.find("#Repair_id_" + i).val();
RepairObject.bookingId = obj.find("#Repair_bookingId_" + i).val();
RepairObject.repairCode = obj.find("#Repair_repairCode_" + i).val();
RepairObject.technicianId = obj.find("#Repair_technicianId_" + i).val();
RepairObject.startDate = getDate(obj.find("#Repair_startDate_" + i).val());
RepairObject.endDate = getDate(obj.find("#Repair_endDate_" + i).val());
RepairObject.totalCostEA = obj.find("#Repair_totalCostEA_" + i).val();
RepairObject.repairNote = obj.find("#Repair_repairNote_" + i).val();

    RepairObject.active_mode = obj.find("#isActive_" + i + "_Repair").val();
    return RepairObject;
}

function Repair_GetAllData() {
    //Insert Repair List
    var Repair = [];
    $('#RepairBody tr').each(function () {
        var i = $(this).find("#rowCount").text();
        var eachRepair = Repair_GetFromForm($(this), i);
        Repair.push(eachRepair);
    });
    return Repair;
}

function Repair_Save(id) {
	//Insert Repair List
	var Repair = Repair_GetAllData();

    var successFunc = function (result) {
        AlertSuccess("ปรับปรุงข้อมูลเรียบร้อยแล้ว");
		endLoad();
    };
	startLoad();
	AjaxPutRequest(apisite + '/api/v1/Repair/UpdateMultiple', Repair, successFunc, AlertDanger);
}

function Repair_Get(id, blankItem) {

	$('#RepairBody').empty();

	var successFunc = function (response) {
    //console.log(response);
		$.each(response, function (i, data) {
			var tag = '<tr>';
            tag += '<td><label id="rowCount">' + (i + 1) + '</label><input type="hidden" id="isActive_' + (i + 1) + '_Repair" value="1" /><input class="form-control" type="hidden" id="Repair_id_' + (i + 1)+'" /></td>';
 tag += '<td><select class="form-control" id="Repair_bookingId_' + (i + 1) +'"></select></td>';
 tag += '<td><input class="form-control" type="text" id="Repair_repairCode_' + (i + 1)+'" /></td>';
 tag += '<td><select class="form-control" id="Repair_technicianId_' + (i + 1) +'"></select></td>';
 tag += '<td><input class="form-control" type="text" id="Repair_startDate_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="Repair_endDate_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="number" id="Repair_totalCostEA_' + (i + 1)+'" /></td>';
 tag += '<td><textarea class="form-control" rows="2" cols="25" id="Repair_repairNote_' + (i + 1)+'" ></textarea></td>';

			tag += '<td><a href="javascript:;" class="btn btn-danger btn-sm" onclick="javascript:Repair_RemoveRepair(this)" id="removeBtn"><i class="fa fa-trash-alt" style="color:white;"></i></a><a href="javascript:;" class="btn btn-primary btn-sm" onclick="javascript:Repair_RestoreRepair(this)" style="display: none;" id="restoreBtn"><i class="fa fa-upload" style="color:white;"></i></a></td>';
			tag += '</tr>';
			$('#RepairBody').append($(tag));
			Repair_FeedDataToForm(data, (i + 1), blankItem);
		});
        Repair_Summary();
		endLoad();
	};
	startLoad();
	AjaxGetRequest(apisite + "/api/v1/Repair", successFunc, AlertDanger);
			//AjaxGetRequest(apisite + '/api/Repair/GetListBybookingId/' + a, successFunc, AlertDanger);
		//AjaxGetRequest(apisite + '/api/Repair/GetListBytechnicianId/' + a, successFunc, AlertDanger);

}

function Repair_Add() {
	var successFunc = function (result) {
		var i = $("#RepairBody tr").length;
		var tag = '<tr>';
		tag += '<td><label id="rowCount">' + (i + 1) + '</label><input type="hidden" id="isActive_' + (i + 1) + '_Repair" value="1" /><input class="form-control" type="hidden" id="Repair_id_' + (i + 1)+'" /></td>';
	 tag += '<td><select class="form-control" id="Repair_bookingId_' + (i + 1) +'"></select></td>';
 tag += '<td><input class="form-control" type="text" id="Repair_repairCode_' + (i + 1)+'" /></td>';
 tag += '<td><select class="form-control" id="Repair_technicianId_' + (i + 1) +'"></select></td>';
 tag += '<td><input class="form-control" type="text" id="Repair_startDate_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="Repair_endDate_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="number" id="Repair_totalCostEA_' + (i + 1)+'" /></td>';
 tag += '<td><textarea class="form-control" rows="2" cols="25" id="Repair_repairNote_' + (i + 1)+'" ></textarea></td>';

		tag += '<td><a href="javascript:;" class="btn btn-danger btn-sm" onclick="javascript:Repair_RemoveRepair(this)" id="removeBtn"><i class="fa fa-trash-alt" style="color:white;"></i></a><a href="javascript:;" class="btn btn-primary btn-sm" onclick="javascript:Repair_RestoreRepair(this)" style="display: none;" id="restoreBtn"><i class="fa fa-upload" style="color:white;"></i></a></td>';
		tag += '</tr>';
    
		$('#RepairBody').append($(tag));
		Repair_ClearForm(i + 1, result);
		endLoad();
	};
	startLoad();
    AjaxGetRequest(apisite + "/api/v1/Repair/" + "GetBlankItem", successFunc, AlertDanger);
}

function Repair_RemoveRepair(e) {
    if (confirm('กรุณากดตกลง เพื่อยืนยันการลบ?')) {
        $(e).closest('tr').find("input,select,textarea").attr('disabled', true);
        $(e).closest('tr').find("input,select,textarea").css({ opacity: '0.5' });
        $(e).hide();
        $(e).closest('tr').find("#restoreBtn").show();
        $(e).closest('tr').find("input").first().val("0");
        console.log($(e).closest('tr').find("input").first().val());
        Repair_Summary();
    }
}

function Repair_RestoreRepair(e) {
    if (confirm('กรุณากดตกลง เพื่อยืนยันการกู้คืน?')) {
        $(e).closest('tr').find("input,select,textarea").attr('disabled', false);
        $(e).closest('tr').find("input,select,textarea").css({ opacity: '1' });
        $(e).hide();
        $(e).closest('tr').find("#removeBtn").show();
        $(e).closest('tr').find("input").first().val("1");
        console.log($(e).closest('tr').find("input").first().val());
        Repair_Summary();
    }
}

function Repair_Summary() {
    var sum = 0;
    $(".input_score").each(function () {
        sum += +$(this).val();
    });
    $("#score_label").text("ผลรวม: " + sum);
}

function Repair_InitialForm(id) {
    var successFunc = function (result) {
        Repair_Get(id, result);
        endLoad();
    };
    startLoad();
    AjaxGetRequest(apisite + "/api/v1/Repair/" + "GetBlankItem", successFunc, AlertDanger);
}
