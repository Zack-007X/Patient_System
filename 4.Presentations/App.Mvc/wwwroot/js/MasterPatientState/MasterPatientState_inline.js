function MasterPatientState_ClearForm(i, blankItem) {
	var data = blankItem;
$("#MasterPatientState_id_" + i).val("");
$("#MasterPatientState_code_" + i).val("");
$("#MasterPatientState_name_" + i).val("");
$("#MasterPatientState_remark_" + i).val("");

}

function MasterPatientState_FeedDataToForm(data, i, blankItem) {
$("#MasterPatientState_id_" + i).val(data.id);
$("#MasterPatientState_code_" + i).val(data.code);
$("#MasterPatientState_name_" + i).val(data.name);
$("#MasterPatientState_remark_" + i).val(data.remark);

}

function MasterPatientState_GetFromForm(obj, i) {
    var MasterPatientStateObject = new Object();
MasterPatientStateObject.id = obj.find("#MasterPatientState_id_" + i).val();
MasterPatientStateObject.code = obj.find("#MasterPatientState_code_" + i).val();
MasterPatientStateObject.name = obj.find("#MasterPatientState_name_" + i).val();
MasterPatientStateObject.remark = obj.find("#MasterPatientState_remark_" + i).val();

    MasterPatientStateObject.active_mode = obj.find("#isActive_" + i + "_MasterPatientState").val();
    return MasterPatientStateObject;
}

function MasterPatientState_GetAllData() {
    //Insert MasterPatientState List
    var MasterPatientState = [];
    $('#MasterPatientStateBody tr').each(function () {
        var i = $(this).find("#rowCount").text();
        var eachMasterPatientState = MasterPatientState_GetFromForm($(this), i);
        MasterPatientState.push(eachMasterPatientState);
    });
    return MasterPatientState;
}

function MasterPatientState_Save(id) {
	//Insert MasterPatientState List
	var MasterPatientState = MasterPatientState_GetAllData();

    var successFunc = function (result) {
        AlertSuccess("ปรับปรุงข้อมูลเรียบร้อยแล้ว");
		endLoad();
    };
	startLoad();
	AjaxPutRequest(apisite + '/api/v1/MasterPatientState/UpdateMultiple', MasterPatientState, successFunc, AlertDanger);
}

function MasterPatientState_Get(id, blankItem) {

	$('#MasterPatientStateBody').empty();

	var successFunc = function (response) {
    //console.log(response);
		$.each(response, function (i, data) {
			var tag = '<tr>';
            tag += '<td><label id="rowCount">' + (i + 1) + '</label><input type="hidden" id="isActive_' + (i + 1) + '_MasterPatientState" value="1" /><input class="form-control" type="hidden" id="MasterPatientState_id_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="MasterPatientState_code_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="MasterPatientState_name_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="MasterPatientState_remark_' + (i + 1)+'" /></td>';

			tag += '<td><a href="javascript:;" class="btn btn-danger btn-sm" onclick="javascript:MasterPatientState_RemoveMasterPatientState(this)" id="removeBtn"><i class="fa fa-trash-alt" style="color:white;"></i></a><a href="javascript:;" class="btn btn-primary btn-sm" onclick="javascript:MasterPatientState_RestoreMasterPatientState(this)" style="display: none;" id="restoreBtn"><i class="fa fa-upload" style="color:white;"></i></a></td>';
			tag += '</tr>';
			$('#MasterPatientStateBody').append($(tag));
			MasterPatientState_FeedDataToForm(data, (i + 1), blankItem);
		});
        MasterPatientState_Summary();
		endLoad();
	};
	startLoad();
	AjaxGetRequest(apisite + "/api/v1/MasterPatientState", successFunc, AlertDanger);
	
}

function MasterPatientState_Add() {
	var successFunc = function (result) {
		var i = $("#MasterPatientStateBody tr").length;
		var tag = '<tr>';
		tag += '<td><label id="rowCount">' + (i + 1) + '</label><input type="hidden" id="isActive_' + (i + 1) + '_MasterPatientState" value="1" /><input class="form-control" type="hidden" id="MasterPatientState_id_' + (i + 1)+'" /></td>';
	 tag += '<td><input class="form-control" type="text" id="MasterPatientState_code_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="MasterPatientState_name_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="MasterPatientState_remark_' + (i + 1)+'" /></td>';

		tag += '<td><a href="javascript:;" class="btn btn-danger btn-sm" onclick="javascript:MasterPatientState_RemoveMasterPatientState(this)" id="removeBtn"><i class="fa fa-trash-alt" style="color:white;"></i></a><a href="javascript:;" class="btn btn-primary btn-sm" onclick="javascript:MasterPatientState_RestoreMasterPatientState(this)" style="display: none;" id="restoreBtn"><i class="fa fa-upload" style="color:white;"></i></a></td>';
		tag += '</tr>';
    
		$('#MasterPatientStateBody').append($(tag));
		MasterPatientState_ClearForm(i + 1, result);
		endLoad();
	};
	startLoad();
    AjaxGetRequest(apisite + "/api/v1/MasterPatientState/" + "GetBlankItem", successFunc, AlertDanger);
}

function MasterPatientState_RemoveMasterPatientState(e) {
    if (confirm('กรุณากดตกลง เพื่อยืนยันการลบ?')) {
        $(e).closest('tr').find("input,select,textarea").attr('disabled', true);
        $(e).closest('tr').find("input,select,textarea").css({ opacity: '0.5' });
        $(e).hide();
        $(e).closest('tr').find("#restoreBtn").show();
        $(e).closest('tr').find("input").first().val("0");
        console.log($(e).closest('tr').find("input").first().val());
        MasterPatientState_Summary();
    }
}

function MasterPatientState_RestoreMasterPatientState(e) {
    if (confirm('กรุณากดตกลง เพื่อยืนยันการกู้คืน?')) {
        $(e).closest('tr').find("input,select,textarea").attr('disabled', false);
        $(e).closest('tr').find("input,select,textarea").css({ opacity: '1' });
        $(e).hide();
        $(e).closest('tr').find("#removeBtn").show();
        $(e).closest('tr').find("input").first().val("1");
        console.log($(e).closest('tr').find("input").first().val());
        MasterPatientState_Summary();
    }
}

function MasterPatientState_Summary() {
    var sum = 0;
    $(".input_score").each(function () {
        sum += +$(this).val();
    });
    $("#score_label").text("ผลรวม: " + sum);
}

function MasterPatientState_InitialForm(id) {
    var successFunc = function (result) {
        MasterPatientState_Get(id, result);
        endLoad();
    };
    startLoad();
    AjaxGetRequest(apisite + "/api/v1/MasterPatientState/" + "GetBlankItem", successFunc, AlertDanger);
}
