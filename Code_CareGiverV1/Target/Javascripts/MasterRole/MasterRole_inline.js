function MasterRole_ClearForm(i, blankItem) {
	var data = blankItem;
$("#MasterRole_id_" + i).val("");
$("#MasterRole_code_" + i).val("");
$("#MasterRole_name_" + i).val("");
$("#MasterRole_remark_" + i).val("");

}

function MasterRole_FeedDataToForm(data, i, blankItem) {
$("#MasterRole_id_" + i).val(data.id);
$("#MasterRole_code_" + i).val(data.code);
$("#MasterRole_name_" + i).val(data.name);
$("#MasterRole_remark_" + i).val(data.remark);

}

function MasterRole_GetFromForm(obj, i) {
    var MasterRoleObject = new Object();
MasterRoleObject.id = obj.find("#MasterRole_id_" + i).val();
MasterRoleObject.code = obj.find("#MasterRole_code_" + i).val();
MasterRoleObject.name = obj.find("#MasterRole_name_" + i).val();
MasterRoleObject.remark = obj.find("#MasterRole_remark_" + i).val();

    MasterRoleObject.active_mode = obj.find("#isActive_" + i + "_MasterRole").val();
    return MasterRoleObject;
}

function MasterRole_GetAllData() {
    //Insert MasterRole List
    var MasterRole = [];
    $('#MasterRoleBody tr').each(function () {
        var i = $(this).find("#rowCount").text();
        var eachMasterRole = MasterRole_GetFromForm($(this), i);
        MasterRole.push(eachMasterRole);
    });
    return MasterRole;
}

function MasterRole_Save(id) {
	//Insert MasterRole List
	var MasterRole = MasterRole_GetAllData();

    var successFunc = function (result) {
        AlertSuccess("ปรับปรุงข้อมูลเรียบร้อยแล้ว");
		endLoad();
    };
	startLoad();
	AjaxPutRequest(apisite + '/api/v1/MasterRole/UpdateMultiple', MasterRole, successFunc, AlertDanger);
}

function MasterRole_Get(id, blankItem) {

	$('#MasterRoleBody').empty();

	var successFunc = function (response) {
    //console.log(response);
		$.each(response, function (i, data) {
			var tag = '<tr>';
            tag += '<td><label id="rowCount">' + (i + 1) + '</label><input type="hidden" id="isActive_' + (i + 1) + '_MasterRole" value="1" /><input class="form-control" type="hidden" id="MasterRole_id_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="MasterRole_code_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="MasterRole_name_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="MasterRole_remark_' + (i + 1)+'" /></td>';

			tag += '<td><a href="javascript:;" class="btn btn-danger btn-sm" onclick="javascript:MasterRole_RemoveMasterRole(this)" id="removeBtn"><i class="fa fa-trash-alt" style="color:white;"></i></a><a href="javascript:;" class="btn btn-primary btn-sm" onclick="javascript:MasterRole_RestoreMasterRole(this)" style="display: none;" id="restoreBtn"><i class="fa fa-upload" style="color:white;"></i></a></td>';
			tag += '</tr>';
			$('#MasterRoleBody').append($(tag));
			MasterRole_FeedDataToForm(data, (i + 1), blankItem);
		});
        MasterRole_Summary();
		endLoad();
	};
	startLoad();
	AjaxGetRequest(apisite + "/api/v1/MasterRole", successFunc, AlertDanger);
	
}

function MasterRole_Add() {
	var successFunc = function (result) {
		var i = $("#MasterRoleBody tr").length;
		var tag = '<tr>';
		tag += '<td><label id="rowCount">' + (i + 1) + '</label><input type="hidden" id="isActive_' + (i + 1) + '_MasterRole" value="1" /><input class="form-control" type="hidden" id="MasterRole_id_' + (i + 1)+'" /></td>';
	 tag += '<td><input class="form-control" type="text" id="MasterRole_code_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="MasterRole_name_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="MasterRole_remark_' + (i + 1)+'" /></td>';

		tag += '<td><a href="javascript:;" class="btn btn-danger btn-sm" onclick="javascript:MasterRole_RemoveMasterRole(this)" id="removeBtn"><i class="fa fa-trash-alt" style="color:white;"></i></a><a href="javascript:;" class="btn btn-primary btn-sm" onclick="javascript:MasterRole_RestoreMasterRole(this)" style="display: none;" id="restoreBtn"><i class="fa fa-upload" style="color:white;"></i></a></td>';
		tag += '</tr>';
    
		$('#MasterRoleBody').append($(tag));
		MasterRole_ClearForm(i + 1, result);
		endLoad();
	};
	startLoad();
    AjaxGetRequest(apisite + "/api/v1/MasterRole/" + "GetBlankItem", successFunc, AlertDanger);
}

function MasterRole_RemoveMasterRole(e) {
    if (confirm('กรุณากดตกลง เพื่อยืนยันการลบ?')) {
        $(e).closest('tr').find("input,select,textarea").attr('disabled', true);
        $(e).closest('tr').find("input,select,textarea").css({ opacity: '0.5' });
        $(e).hide();
        $(e).closest('tr').find("#restoreBtn").show();
        $(e).closest('tr').find("input").first().val("0");
        console.log($(e).closest('tr').find("input").first().val());
        MasterRole_Summary();
    }
}

function MasterRole_RestoreMasterRole(e) {
    if (confirm('กรุณากดตกลง เพื่อยืนยันการกู้คืน?')) {
        $(e).closest('tr').find("input,select,textarea").attr('disabled', false);
        $(e).closest('tr').find("input,select,textarea").css({ opacity: '1' });
        $(e).hide();
        $(e).closest('tr').find("#removeBtn").show();
        $(e).closest('tr').find("input").first().val("1");
        console.log($(e).closest('tr').find("input").first().val());
        MasterRole_Summary();
    }
}

function MasterRole_Summary() {
    var sum = 0;
    $(".input_score").each(function () {
        sum += +$(this).val();
    });
    $("#score_label").text("ผลรวม: " + sum);
}

function MasterRole_InitialForm(id) {
    var successFunc = function (result) {
        MasterRole_Get(id, result);
        endLoad();
    };
    startLoad();
    AjaxGetRequest(apisite + "/api/v1/MasterRole/" + "GetBlankItem", successFunc, AlertDanger);
}
