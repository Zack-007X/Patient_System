function MasterPermission_ClearForm(i, blankItem) {
	var data = blankItem;
$("#MasterPermission_id_" + i).val("");
$("#MasterPermission_code_" + i).val("");
$("#MasterPermission_name_" + i).val("");
$("#MasterPermission_remark_" + i).val("");

}

function MasterPermission_FeedDataToForm(data, i, blankItem) {
$("#MasterPermission_id_" + i).val(data.id);
$("#MasterPermission_code_" + i).val(data.code);
$("#MasterPermission_name_" + i).val(data.name);
$("#MasterPermission_remark_" + i).val(data.remark);

}

function MasterPermission_GetFromForm(obj, i) {
    var MasterPermissionObject = new Object();
MasterPermissionObject.id = obj.find("#MasterPermission_id_" + i).val();
MasterPermissionObject.code = obj.find("#MasterPermission_code_" + i).val();
MasterPermissionObject.name = obj.find("#MasterPermission_name_" + i).val();
MasterPermissionObject.remark = obj.find("#MasterPermission_remark_" + i).val();

    MasterPermissionObject.active_mode = obj.find("#isActive_" + i + "_MasterPermission").val();
    return MasterPermissionObject;
}

function MasterPermission_GetAllData() {
    //Insert MasterPermission List
    var MasterPermission = [];
    $('#MasterPermissionBody tr').each(function () {
        var i = $(this).find("#rowCount").text();
        var eachMasterPermission = MasterPermission_GetFromForm($(this), i);
        MasterPermission.push(eachMasterPermission);
    });
    return MasterPermission;
}

function MasterPermission_Save(id) {
	//Insert MasterPermission List
	var MasterPermission = MasterPermission_GetAllData();

    var successFunc = function (result) {
        AlertSuccess("ปรับปรุงข้อมูลเรียบร้อยแล้ว");
		endLoad();
    };
	startLoad();
	AjaxPutRequest(apisite + '/api/v1/MasterPermission/UpdateMultiple', MasterPermission, successFunc, AlertDanger);
}

function MasterPermission_Get(id, blankItem) {

	$('#MasterPermissionBody').empty();

	var successFunc = function (response) {
    //console.log(response);
		$.each(response, function (i, data) {
			var tag = '<tr>';
            tag += '<td><label id="rowCount">' + (i + 1) + '</label><input type="hidden" id="isActive_' + (i + 1) + '_MasterPermission" value="1" /><input class="form-control" type="hidden" id="MasterPermission_id_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="MasterPermission_code_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="MasterPermission_name_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="MasterPermission_remark_' + (i + 1)+'" /></td>';

			tag += '<td><a href="javascript:;" class="btn btn-danger btn-sm" onclick="javascript:MasterPermission_RemoveMasterPermission(this)" id="removeBtn"><i class="fa fa-trash-alt" style="color:white;"></i></a><a href="javascript:;" class="btn btn-primary btn-sm" onclick="javascript:MasterPermission_RestoreMasterPermission(this)" style="display: none;" id="restoreBtn"><i class="fa fa-upload" style="color:white;"></i></a></td>';
			tag += '</tr>';
			$('#MasterPermissionBody').append($(tag));
			MasterPermission_FeedDataToForm(data, (i + 1), blankItem);
		});
        MasterPermission_Summary();
		endLoad();
	};
	startLoad();
	AjaxGetRequest(apisite + "/api/v1/MasterPermission", successFunc, AlertDanger);
	
}

function MasterPermission_Add() {
	var successFunc = function (result) {
		var i = $("#MasterPermissionBody tr").length;
		var tag = '<tr>';
		tag += '<td><label id="rowCount">' + (i + 1) + '</label><input type="hidden" id="isActive_' + (i + 1) + '_MasterPermission" value="1" /><input class="form-control" type="hidden" id="MasterPermission_id_' + (i + 1)+'" /></td>';
	 tag += '<td><input class="form-control" type="text" id="MasterPermission_code_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="MasterPermission_name_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="MasterPermission_remark_' + (i + 1)+'" /></td>';

		tag += '<td><a href="javascript:;" class="btn btn-danger btn-sm" onclick="javascript:MasterPermission_RemoveMasterPermission(this)" id="removeBtn"><i class="fa fa-trash-alt" style="color:white;"></i></a><a href="javascript:;" class="btn btn-primary btn-sm" onclick="javascript:MasterPermission_RestoreMasterPermission(this)" style="display: none;" id="restoreBtn"><i class="fa fa-upload" style="color:white;"></i></a></td>';
		tag += '</tr>';
    
		$('#MasterPermissionBody').append($(tag));
		MasterPermission_ClearForm(i + 1, result);
		endLoad();
	};
	startLoad();
    AjaxGetRequest(apisite + "/api/v1/MasterPermission/" + "GetBlankItem", successFunc, AlertDanger);
}

function MasterPermission_RemoveMasterPermission(e) {
    if (confirm('กรุณากดตกลง เพื่อยืนยันการลบ?')) {
        $(e).closest('tr').find("input,select,textarea").attr('disabled', true);
        $(e).closest('tr').find("input,select,textarea").css({ opacity: '0.5' });
        $(e).hide();
        $(e).closest('tr').find("#restoreBtn").show();
        $(e).closest('tr').find("input").first().val("0");
        console.log($(e).closest('tr').find("input").first().val());
        MasterPermission_Summary();
    }
}

function MasterPermission_RestoreMasterPermission(e) {
    if (confirm('กรุณากดตกลง เพื่อยืนยันการกู้คืน?')) {
        $(e).closest('tr').find("input,select,textarea").attr('disabled', false);
        $(e).closest('tr').find("input,select,textarea").css({ opacity: '1' });
        $(e).hide();
        $(e).closest('tr').find("#removeBtn").show();
        $(e).closest('tr').find("input").first().val("1");
        console.log($(e).closest('tr').find("input").first().val());
        MasterPermission_Summary();
    }
}

function MasterPermission_Summary() {
    var sum = 0;
    $(".input_score").each(function () {
        sum += +$(this).val();
    });
    $("#score_label").text("ผลรวม: " + sum);
}

function MasterPermission_InitialForm(id) {
    var successFunc = function (result) {
        MasterPermission_Get(id, result);
        endLoad();
    };
    startLoad();
    AjaxGetRequest(apisite + "/api/v1/MasterPermission/" + "GetBlankItem", successFunc, AlertDanger);
}
