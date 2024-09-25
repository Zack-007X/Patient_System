function MasterPosition_ClearForm(i, blankItem) {
	var data = blankItem;
$("#MasterPosition_id_" + i).val("");
$("#MasterPosition_code_" + i).val("");
$("#MasterPosition_name_" + i).val("");
$("#MasterPosition_remark_" + i).val("");

}

function MasterPosition_FeedDataToForm(data, i, blankItem) {
$("#MasterPosition_id_" + i).val(data.id);
$("#MasterPosition_code_" + i).val(data.code);
$("#MasterPosition_name_" + i).val(data.name);
$("#MasterPosition_remark_" + i).val(data.remark);

}

function MasterPosition_GetFromForm(obj, i) {
    var MasterPositionObject = new Object();
MasterPositionObject.id = obj.find("#MasterPosition_id_" + i).val();
MasterPositionObject.code = obj.find("#MasterPosition_code_" + i).val();
MasterPositionObject.name = obj.find("#MasterPosition_name_" + i).val();
MasterPositionObject.remark = obj.find("#MasterPosition_remark_" + i).val();

    MasterPositionObject.active_mode = obj.find("#isActive_" + i + "_MasterPosition").val();
    return MasterPositionObject;
}

function MasterPosition_GetAllData() {
    //Insert MasterPosition List
    var MasterPosition = [];
    $('#MasterPositionBody tr').each(function () {
        var i = $(this).find("#rowCount").text();
        var eachMasterPosition = MasterPosition_GetFromForm($(this), i);
        MasterPosition.push(eachMasterPosition);
    });
    return MasterPosition;
}

function MasterPosition_Save(id) {
	//Insert MasterPosition List
	var MasterPosition = MasterPosition_GetAllData();

    var successFunc = function (result) {
        AlertSuccess("ปรับปรุงข้อมูลเรียบร้อยแล้ว");
		endLoad();
    };
	startLoad();
	AjaxPutRequest(apisite + '/api/v1/MasterPosition/UpdateMultiple', MasterPosition, successFunc, AlertDanger);
}

function MasterPosition_Get(id, blankItem) {

	$('#MasterPositionBody').empty();

	var successFunc = function (response) {
    //console.log(response);
		$.each(response, function (i, data) {
			var tag = '<tr>';
            tag += '<td><label id="rowCount">' + (i + 1) + '</label><input type="hidden" id="isActive_' + (i + 1) + '_MasterPosition" value="1" /><input class="form-control" type="hidden" id="MasterPosition_id_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="MasterPosition_code_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="MasterPosition_name_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="MasterPosition_remark_' + (i + 1)+'" /></td>';

			tag += '<td><a href="javascript:;" class="btn btn-danger btn-sm" onclick="javascript:MasterPosition_RemoveMasterPosition(this)" id="removeBtn"><i class="fa fa-trash-alt" style="color:white;"></i></a><a href="javascript:;" class="btn btn-primary btn-sm" onclick="javascript:MasterPosition_RestoreMasterPosition(this)" style="display: none;" id="restoreBtn"><i class="fa fa-upload" style="color:white;"></i></a></td>';
			tag += '</tr>';
			$('#MasterPositionBody').append($(tag));
			MasterPosition_FeedDataToForm(data, (i + 1), blankItem);
		});
        MasterPosition_Summary();
		endLoad();
	};
	startLoad();
	AjaxGetRequest(apisite + "/api/v1/MasterPosition", successFunc, AlertDanger);
	
}

function MasterPosition_Add() {
	var successFunc = function (result) {
		var i = $("#MasterPositionBody tr").length;
		var tag = '<tr>';
		tag += '<td><label id="rowCount">' + (i + 1) + '</label><input type="hidden" id="isActive_' + (i + 1) + '_MasterPosition" value="1" /><input class="form-control" type="hidden" id="MasterPosition_id_' + (i + 1)+'" /></td>';
	 tag += '<td><input class="form-control" type="text" id="MasterPosition_code_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="MasterPosition_name_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="MasterPosition_remark_' + (i + 1)+'" /></td>';

		tag += '<td><a href="javascript:;" class="btn btn-danger btn-sm" onclick="javascript:MasterPosition_RemoveMasterPosition(this)" id="removeBtn"><i class="fa fa-trash-alt" style="color:white;"></i></a><a href="javascript:;" class="btn btn-primary btn-sm" onclick="javascript:MasterPosition_RestoreMasterPosition(this)" style="display: none;" id="restoreBtn"><i class="fa fa-upload" style="color:white;"></i></a></td>';
		tag += '</tr>';
    
		$('#MasterPositionBody').append($(tag));
		MasterPosition_ClearForm(i + 1, result);
		endLoad();
	};
	startLoad();
    AjaxGetRequest(apisite + "/api/v1/MasterPosition/" + "GetBlankItem", successFunc, AlertDanger);
}

function MasterPosition_RemoveMasterPosition(e) {
    if (confirm('กรุณากดตกลง เพื่อยืนยันการลบ?')) {
        $(e).closest('tr').find("input,select,textarea").attr('disabled', true);
        $(e).closest('tr').find("input,select,textarea").css({ opacity: '0.5' });
        $(e).hide();
        $(e).closest('tr').find("#restoreBtn").show();
        $(e).closest('tr').find("input").first().val("0");
        console.log($(e).closest('tr').find("input").first().val());
        MasterPosition_Summary();
    }
}

function MasterPosition_RestoreMasterPosition(e) {
    if (confirm('กรุณากดตกลง เพื่อยืนยันการกู้คืน?')) {
        $(e).closest('tr').find("input,select,textarea").attr('disabled', false);
        $(e).closest('tr').find("input,select,textarea").css({ opacity: '1' });
        $(e).hide();
        $(e).closest('tr').find("#removeBtn").show();
        $(e).closest('tr').find("input").first().val("1");
        console.log($(e).closest('tr').find("input").first().val());
        MasterPosition_Summary();
    }
}

function MasterPosition_Summary() {
    var sum = 0;
    $(".input_score").each(function () {
        sum += +$(this).val();
    });
    $("#score_label").text("ผลรวม: " + sum);
}

function MasterPosition_InitialForm(id) {
    var successFunc = function (result) {
        MasterPosition_Get(id, result);
        endLoad();
    };
    startLoad();
    AjaxGetRequest(apisite + "/api/v1/MasterPosition/" + "GetBlankItem", successFunc, AlertDanger);
}
