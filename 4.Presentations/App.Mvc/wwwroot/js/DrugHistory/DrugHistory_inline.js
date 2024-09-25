function DrugHistory_ClearForm(i, blankItem) {
	var data = blankItem;
$("#DrugHistory_id_" + i).val("");
DropDownClearFormAndFeedWithData($("#DrugHistory_masterDrugID_" + i), blankItem, "id", "name", "item_masterDrugID", data.masterDrugID);
DropDownClearFormAndFeedWithData($("#DrugHistory_treatmentScheduleId_" + i), blankItem, "id", "planingTopic", "item_treatmentScheduleId", data.treatmentScheduleId);
$("#DrugHistory_amount_" + i).val("");
$("#DrugHistory_remark_" + i).val("");

}

function DrugHistory_FeedDataToForm(data, i, blankItem) {
$("#DrugHistory_id_" + i).val(data.id);
DropDownClearFormAndFeedWithData($("#DrugHistory_masterDrugID_" + i), blankItem, "id", "name", "item_masterDrugID", data.masterDrugID);
DropDownClearFormAndFeedWithData($("#DrugHistory_treatmentScheduleId_" + i), blankItem, "id", "planingTopic", "item_treatmentScheduleId", data.treatmentScheduleId);
$("#DrugHistory_amount_" + i).val(data.amount);
$("#DrugHistory_remark_" + i).val(data.remark);

}

function DrugHistory_GetFromForm(obj, i) {
    var DrugHistoryObject = new Object();
DrugHistoryObject.id = obj.find("#DrugHistory_id_" + i).val();
DrugHistoryObject.masterDrugID = obj.find("#DrugHistory_masterDrugID_" + i).val();
DrugHistoryObject.treatmentScheduleId = obj.find("#DrugHistory_treatmentScheduleId_" + i).val();
DrugHistoryObject.amount = obj.find("#DrugHistory_amount_" + i).val();
DrugHistoryObject.remark = obj.find("#DrugHistory_remark_" + i).val();

    DrugHistoryObject.active_mode = obj.find("#isActive_" + i + "_DrugHistory").val();
    return DrugHistoryObject;
}

function DrugHistory_GetAllData() {
    //Insert DrugHistory List
    var DrugHistory = [];
    $('#DrugHistoryBody tr').each(function () {
        var i = $(this).find("#rowCount").text();
        var eachDrugHistory = DrugHistory_GetFromForm($(this), i);
        DrugHistory.push(eachDrugHistory);
    });
    return DrugHistory;
}

function DrugHistory_Save(id) {
	//Insert DrugHistory List
	var DrugHistory = DrugHistory_GetAllData();

    var successFunc = function (result) {
        AlertSuccess("ปรับปรุงข้อมูลเรียบร้อยแล้ว");
		endLoad();
    };
	startLoad();
	AjaxPutRequest(apisite + '/api/v1/DrugHistory/UpdateMultiple', DrugHistory, successFunc, AlertDanger);
}

function DrugHistory_Get(id, blankItem) {

	$('#DrugHistoryBody').empty();

	var successFunc = function (response) {
    //console.log(response);
		$.each(response, function (i, data) {
			var tag = '<tr>';
            tag += '<td><label id="rowCount">' + (i + 1) + '</label><input type="hidden" id="isActive_' + (i + 1) + '_DrugHistory" value="1" /><input class="form-control" type="hidden" id="DrugHistory_id_' + (i + 1)+'" /></td>';
 tag += '<td><select class="form-control" id="DrugHistory_masterDrugID_' + (i + 1) +'"></select></td>';
 tag += '<td><select class="form-control" id="DrugHistory_treatmentScheduleId_' + (i + 1) +'"></select></td>';
 tag += '<td><input class="form-control" type="text" id="DrugHistory_amount_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="DrugHistory_remark_' + (i + 1)+'" /></td>';

			tag += '<td><a href="javascript:;" class="btn btn-danger btn-sm" onclick="javascript:DrugHistory_RemoveDrugHistory(this)" id="removeBtn"><i class="fa fa-trash-alt" style="color:white;"></i></a><a href="javascript:;" class="btn btn-primary btn-sm" onclick="javascript:DrugHistory_RestoreDrugHistory(this)" style="display: none;" id="restoreBtn"><i class="fa fa-upload" style="color:white;"></i></a></td>';
			tag += '</tr>';
			$('#DrugHistoryBody').append($(tag));
			DrugHistory_FeedDataToForm(data, (i + 1), blankItem);
		});
        DrugHistory_Summary();
		endLoad();
	};
	startLoad();
	AjaxGetRequest(apisite + "/api/v1/DrugHistory", successFunc, AlertDanger);
			//AjaxGetRequest(apisite + '/api/DrugHistory/GetListBymasterDrugID/' + a, successFunc, AlertDanger);
		//AjaxGetRequest(apisite + '/api/DrugHistory/GetListBytreatmentScheduleId/' + a, successFunc, AlertDanger);

}

function DrugHistory_Add() {
	var successFunc = function (result) {
		var i = $("#DrugHistoryBody tr").length;
		var tag = '<tr>';
		tag += '<td><label id="rowCount">' + (i + 1) + '</label><input type="hidden" id="isActive_' + (i + 1) + '_DrugHistory" value="1" /><input class="form-control" type="hidden" id="DrugHistory_id_' + (i + 1)+'" /></td>';
	 tag += '<td><select class="form-control" id="DrugHistory_masterDrugID_' + (i + 1) +'"></select></td>';
 tag += '<td><select class="form-control" id="DrugHistory_treatmentScheduleId_' + (i + 1) +'"></select></td>';
 tag += '<td><input class="form-control" type="text" id="DrugHistory_amount_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="DrugHistory_remark_' + (i + 1)+'" /></td>';

		tag += '<td><a href="javascript:;" class="btn btn-danger btn-sm" onclick="javascript:DrugHistory_RemoveDrugHistory(this)" id="removeBtn"><i class="fa fa-trash-alt" style="color:white;"></i></a><a href="javascript:;" class="btn btn-primary btn-sm" onclick="javascript:DrugHistory_RestoreDrugHistory(this)" style="display: none;" id="restoreBtn"><i class="fa fa-upload" style="color:white;"></i></a></td>';
		tag += '</tr>';
    
		$('#DrugHistoryBody').append($(tag));
		DrugHistory_ClearForm(i + 1, result);
		endLoad();
	};
	startLoad();
    AjaxGetRequest(apisite + "/api/v1/DrugHistory/" + "GetBlankItem", successFunc, AlertDanger);
}

function DrugHistory_RemoveDrugHistory(e) {
    if (confirm('กรุณากดตกลง เพื่อยืนยันการลบ?')) {
        $(e).closest('tr').find("input,select,textarea").attr('disabled', true);
        $(e).closest('tr').find("input,select,textarea").css({ opacity: '0.5' });
        $(e).hide();
        $(e).closest('tr').find("#restoreBtn").show();
        $(e).closest('tr').find("input").first().val("0");
        console.log($(e).closest('tr').find("input").first().val());
        DrugHistory_Summary();
    }
}

function DrugHistory_RestoreDrugHistory(e) {
    if (confirm('กรุณากดตกลง เพื่อยืนยันการกู้คืน?')) {
        $(e).closest('tr').find("input,select,textarea").attr('disabled', false);
        $(e).closest('tr').find("input,select,textarea").css({ opacity: '1' });
        $(e).hide();
        $(e).closest('tr').find("#removeBtn").show();
        $(e).closest('tr').find("input").first().val("1");
        console.log($(e).closest('tr').find("input").first().val());
        DrugHistory_Summary();
    }
}

function DrugHistory_Summary() {
    var sum = 0;
    $(".input_score").each(function () {
        sum += +$(this).val();
    });
    $("#score_label").text("ผลรวม: " + sum);
}

function DrugHistory_InitialForm(id) {
    var successFunc = function (result) {
        DrugHistory_Get(id, result);
        endLoad();
    };
    startLoad();
    AjaxGetRequest(apisite + "/api/v1/DrugHistory/" + "GetBlankItem", successFunc, AlertDanger);
}
