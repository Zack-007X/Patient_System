function RoleHasPermission_ClearForm(i, blankItem) {
	var data = blankItem;
$("#RoleHasPermission_id_" + i).val("");
DropDownClearFormAndFeedWithData($("#RoleHasPermission_masterRoleId_" + i), blankItem, "id", "name", "item_masterRoleId", data.masterRoleId);
DropDownClearFormAndFeedWithData($("#RoleHasPermission_masterPermissionId_" + i), blankItem, "id", "name", "item_masterPermissionId", data.masterPermissionId);
$("#RoleHasPermission_create_" + i).val("");
$("#RoleHasPermission_read_" + i).val("");
$("#RoleHasPermission_update_" + i).val("");
$("#RoleHasPermission_delete_" + i).val("");
$("#RoleHasPermission_remark_" + i).val("");

}

function RoleHasPermission_FeedDataToForm(data, i, blankItem) {
$("#RoleHasPermission_id_" + i).val(data.id);
DropDownClearFormAndFeedWithData($("#RoleHasPermission_masterRoleId_" + i), blankItem, "id", "name", "item_masterRoleId", data.masterRoleId);
DropDownClearFormAndFeedWithData($("#RoleHasPermission_masterPermissionId_" + i), blankItem, "id", "name", "item_masterPermissionId", data.masterPermissionId);
$("#RoleHasPermission_create_" + i).val(data.create);
$("#RoleHasPermission_read_" + i).val(data.read);
$("#RoleHasPermission_update_" + i).val(data.update);
$("#RoleHasPermission_delete_" + i).val(data.delete);
$("#RoleHasPermission_remark_" + i).val(data.remark);

}

function RoleHasPermission_GetFromForm(obj, i) {
    var RoleHasPermissionObject = new Object();
RoleHasPermissionObject.id = obj.find("#RoleHasPermission_id_" + i).val();
RoleHasPermissionObject.masterRoleId = obj.find("#RoleHasPermission_masterRoleId_" + i).val();
RoleHasPermissionObject.masterPermissionId = obj.find("#RoleHasPermission_masterPermissionId_" + i).val();
RoleHasPermissionObject.create = obj.find("#RoleHasPermission_create_" + i).val();
RoleHasPermissionObject.read = obj.find("#RoleHasPermission_read_" + i).val();
RoleHasPermissionObject.update = obj.find("#RoleHasPermission_update_" + i).val();
RoleHasPermissionObject.delete = obj.find("#RoleHasPermission_delete_" + i).val();
RoleHasPermissionObject.remark = obj.find("#RoleHasPermission_remark_" + i).val();

    RoleHasPermissionObject.active_mode = obj.find("#isActive_" + i + "_RoleHasPermission").val();
    return RoleHasPermissionObject;
}

function RoleHasPermission_GetAllData() {
    //Insert RoleHasPermission List
    var RoleHasPermission = [];
    $('#RoleHasPermissionBody tr').each(function () {
        var i = $(this).find("#rowCount").text();
        var eachRoleHasPermission = RoleHasPermission_GetFromForm($(this), i);
        RoleHasPermission.push(eachRoleHasPermission);
    });
    return RoleHasPermission;
}

function RoleHasPermission_Save(id) {
	//Insert RoleHasPermission List
	var RoleHasPermission = RoleHasPermission_GetAllData();

    var successFunc = function (result) {
        AlertSuccess("ปรับปรุงข้อมูลเรียบร้อยแล้ว");
		endLoad();
    };
	startLoad();
	AjaxPutRequest(apisite + '/api/v1/RoleHasPermission/UpdateMultiple', RoleHasPermission, successFunc, AlertDanger);
}

function RoleHasPermission_Get(id, blankItem) {

	$('#RoleHasPermissionBody').empty();

	var successFunc = function (response) {
    //console.log(response);
		$.each(response, function (i, data) {
			var tag = '<tr>';
            tag += '<td><label id="rowCount">' + (i + 1) + '</label><input type="hidden" id="isActive_' + (i + 1) + '_RoleHasPermission" value="1" /><input class="form-control" type="hidden" id="RoleHasPermission_id_' + (i + 1)+'" /></td>';
 tag += '<td><select class="form-control" id="RoleHasPermission_masterRoleId_' + (i + 1) +'"></select></td>';
 tag += '<td><select class="form-control" id="RoleHasPermission_masterPermissionId_' + (i + 1) +'"></select></td>';
 tag += '<td><input class="form-control" type="text" id="RoleHasPermission_create_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="RoleHasPermission_read_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="RoleHasPermission_update_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="RoleHasPermission_delete_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="RoleHasPermission_remark_' + (i + 1)+'" /></td>';

			tag += '<td><a href="javascript:;" class="btn btn-danger btn-sm" onclick="javascript:RoleHasPermission_RemoveRoleHasPermission(this)" id="removeBtn"><i class="fa fa-trash-alt" style="color:white;"></i></a><a href="javascript:;" class="btn btn-primary btn-sm" onclick="javascript:RoleHasPermission_RestoreRoleHasPermission(this)" style="display: none;" id="restoreBtn"><i class="fa fa-upload" style="color:white;"></i></a></td>';
			tag += '</tr>';
			$('#RoleHasPermissionBody').append($(tag));
			RoleHasPermission_FeedDataToForm(data, (i + 1), blankItem);
		});
        RoleHasPermission_Summary();
		endLoad();
	};
	startLoad();
	AjaxGetRequest(apisite + "/api/v1/RoleHasPermission", successFunc, AlertDanger);
			//AjaxGetRequest(apisite + '/api/RoleHasPermission/GetListBymasterRoleId/' + a, successFunc, AlertDanger);
		//AjaxGetRequest(apisite + '/api/RoleHasPermission/GetListBymasterPermissionId/' + a, successFunc, AlertDanger);

}

function RoleHasPermission_Add() {
	var successFunc = function (result) {
		var i = $("#RoleHasPermissionBody tr").length;
		var tag = '<tr>';
		tag += '<td><label id="rowCount">' + (i + 1) + '</label><input type="hidden" id="isActive_' + (i + 1) + '_RoleHasPermission" value="1" /><input class="form-control" type="hidden" id="RoleHasPermission_id_' + (i + 1)+'" /></td>';
	 tag += '<td><select class="form-control" id="RoleHasPermission_masterRoleId_' + (i + 1) +'"></select></td>';
 tag += '<td><select class="form-control" id="RoleHasPermission_masterPermissionId_' + (i + 1) +'"></select></td>';
 tag += '<td><input class="form-control" type="text" id="RoleHasPermission_create_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="RoleHasPermission_read_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="RoleHasPermission_update_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="RoleHasPermission_delete_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="RoleHasPermission_remark_' + (i + 1)+'" /></td>';

		tag += '<td><a href="javascript:;" class="btn btn-danger btn-sm" onclick="javascript:RoleHasPermission_RemoveRoleHasPermission(this)" id="removeBtn"><i class="fa fa-trash-alt" style="color:white;"></i></a><a href="javascript:;" class="btn btn-primary btn-sm" onclick="javascript:RoleHasPermission_RestoreRoleHasPermission(this)" style="display: none;" id="restoreBtn"><i class="fa fa-upload" style="color:white;"></i></a></td>';
		tag += '</tr>';
    
		$('#RoleHasPermissionBody').append($(tag));
		RoleHasPermission_ClearForm(i + 1, result);
		endLoad();
	};
	startLoad();
    AjaxGetRequest(apisite + "/api/v1/RoleHasPermission/" + "GetBlankItem", successFunc, AlertDanger);
}

function RoleHasPermission_RemoveRoleHasPermission(e) {
    if (confirm('กรุณากดตกลง เพื่อยืนยันการลบ?')) {
        $(e).closest('tr').find("input,select,textarea").attr('disabled', true);
        $(e).closest('tr').find("input,select,textarea").css({ opacity: '0.5' });
        $(e).hide();
        $(e).closest('tr').find("#restoreBtn").show();
        $(e).closest('tr').find("input").first().val("0");
        console.log($(e).closest('tr').find("input").first().val());
        RoleHasPermission_Summary();
    }
}

function RoleHasPermission_RestoreRoleHasPermission(e) {
    if (confirm('กรุณากดตกลง เพื่อยืนยันการกู้คืน?')) {
        $(e).closest('tr').find("input,select,textarea").attr('disabled', false);
        $(e).closest('tr').find("input,select,textarea").css({ opacity: '1' });
        $(e).hide();
        $(e).closest('tr').find("#removeBtn").show();
        $(e).closest('tr').find("input").first().val("1");
        console.log($(e).closest('tr').find("input").first().val());
        RoleHasPermission_Summary();
    }
}

function RoleHasPermission_Summary() {
    var sum = 0;
    $(".input_score").each(function () {
        sum += +$(this).val();
    });
    $("#score_label").text("ผลรวม: " + sum);
}

function RoleHasPermission_InitialForm(id) {
    var successFunc = function (result) {
        RoleHasPermission_Get(id, result);
        endLoad();
    };
    startLoad();
    AjaxGetRequest(apisite + "/api/v1/RoleHasPermission/" + "GetBlankItem", successFunc, AlertDanger);
}
