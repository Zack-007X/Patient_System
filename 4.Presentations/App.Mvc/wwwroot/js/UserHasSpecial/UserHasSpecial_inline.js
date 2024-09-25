function UserHasSpecial_ClearForm(i, blankItem) {
	var data = blankItem;
$("#UserHasSpecial_id_" + i).val("");
DropDownClearFormAndFeedWithData($("#UserHasSpecial_masterRoleId_" + i), blankItem, "id", "name", "item_masterRoleId", data.masterRoleId);
$("#UserHasSpecial_specialSkill_" + i).val("");
$("#UserHasSpecial_remark_" + i).val("");

}

function UserHasSpecial_FeedDataToForm(data, i, blankItem) {
$("#UserHasSpecial_id_" + i).val(data.id);
DropDownClearFormAndFeedWithData($("#UserHasSpecial_masterRoleId_" + i), blankItem, "id", "name", "item_masterRoleId", data.masterRoleId);
$("#UserHasSpecial_specialSkill_" + i).val(data.specialSkill);
$("#UserHasSpecial_remark_" + i).val(data.remark);

}

function UserHasSpecial_GetFromForm(obj, i) {
    var UserHasSpecialObject = new Object();
UserHasSpecialObject.id = obj.find("#UserHasSpecial_id_" + i).val();
UserHasSpecialObject.masterRoleId = obj.find("#UserHasSpecial_masterRoleId_" + i).val();
UserHasSpecialObject.specialSkill = obj.find("#UserHasSpecial_specialSkill_" + i).val();
UserHasSpecialObject.remark = obj.find("#UserHasSpecial_remark_" + i).val();

    UserHasSpecialObject.active_mode = obj.find("#isActive_" + i + "_UserHasSpecial").val();
    return UserHasSpecialObject;
}

function UserHasSpecial_GetAllData() {
    //Insert UserHasSpecial List
    var UserHasSpecial = [];
    $('#UserHasSpecialBody tr').each(function () {
        var i = $(this).find("#rowCount").text();
        var eachUserHasSpecial = UserHasSpecial_GetFromForm($(this), i);
        UserHasSpecial.push(eachUserHasSpecial);
    });
    return UserHasSpecial;
}

function UserHasSpecial_Save(id) {
	//Insert UserHasSpecial List
	var UserHasSpecial = UserHasSpecial_GetAllData();

    var successFunc = function (result) {
        AlertSuccess("ปรับปรุงข้อมูลเรียบร้อยแล้ว");
		endLoad();
    };
	startLoad();
	AjaxPutRequest(apisite + '/api/v1/UserHasSpecial/UpdateMultiple', UserHasSpecial, successFunc, AlertDanger);
}

function UserHasSpecial_Get(id, blankItem) {

	$('#UserHasSpecialBody').empty();

	var successFunc = function (response) {
    //console.log(response);
		$.each(response, function (i, data) {
			var tag = '<tr>';
            tag += '<td><label id="rowCount">' + (i + 1) + '</label><input type="hidden" id="isActive_' + (i + 1) + '_UserHasSpecial" value="1" /><input class="form-control" type="hidden" id="UserHasSpecial_id_' + (i + 1)+'" /></td>';
 tag += '<td><select class="form-control" id="UserHasSpecial_masterRoleId_' + (i + 1) +'"></select></td>';
 tag += '<td><input class="form-control" type="text" id="UserHasSpecial_specialSkill_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="UserHasSpecial_remark_' + (i + 1)+'" /></td>';

			tag += '<td><a href="javascript:;" class="btn btn-danger btn-sm" onclick="javascript:UserHasSpecial_RemoveUserHasSpecial(this)" id="removeBtn"><i class="fa fa-trash-alt" style="color:white;"></i></a><a href="javascript:;" class="btn btn-primary btn-sm" onclick="javascript:UserHasSpecial_RestoreUserHasSpecial(this)" style="display: none;" id="restoreBtn"><i class="fa fa-upload" style="color:white;"></i></a></td>';
			tag += '</tr>';
			$('#UserHasSpecialBody').append($(tag));
			UserHasSpecial_FeedDataToForm(data, (i + 1), blankItem);
		});
        UserHasSpecial_Summary();
		endLoad();
	};
	startLoad();
	AjaxGetRequest(apisite + "/api/v1/UserHasSpecial", successFunc, AlertDanger);
			//AjaxGetRequest(apisite + '/api/UserHasSpecial/GetListBymasterRoleId/' + a, successFunc, AlertDanger);

}

function UserHasSpecial_Add() {
	var successFunc = function (result) {
		var i = $("#UserHasSpecialBody tr").length;
		var tag = '<tr>';
		tag += '<td><label id="rowCount">' + (i + 1) + '</label><input type="hidden" id="isActive_' + (i + 1) + '_UserHasSpecial" value="1" /><input class="form-control" type="hidden" id="UserHasSpecial_id_' + (i + 1)+'" /></td>';
	 tag += '<td><select class="form-control" id="UserHasSpecial_masterRoleId_' + (i + 1) +'"></select></td>';
 tag += '<td><input class="form-control" type="text" id="UserHasSpecial_specialSkill_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="UserHasSpecial_remark_' + (i + 1)+'" /></td>';

		tag += '<td><a href="javascript:;" class="btn btn-danger btn-sm" onclick="javascript:UserHasSpecial_RemoveUserHasSpecial(this)" id="removeBtn"><i class="fa fa-trash-alt" style="color:white;"></i></a><a href="javascript:;" class="btn btn-primary btn-sm" onclick="javascript:UserHasSpecial_RestoreUserHasSpecial(this)" style="display: none;" id="restoreBtn"><i class="fa fa-upload" style="color:white;"></i></a></td>';
		tag += '</tr>';
    
		$('#UserHasSpecialBody').append($(tag));
		UserHasSpecial_ClearForm(i + 1, result);
		endLoad();
	};
	startLoad();
    AjaxGetRequest(apisite + "/api/v1/UserHasSpecial/" + "GetBlankItem", successFunc, AlertDanger);
}

function UserHasSpecial_RemoveUserHasSpecial(e) {
    if (confirm('กรุณากดตกลง เพื่อยืนยันการลบ?')) {
        $(e).closest('tr').find("input,select,textarea").attr('disabled', true);
        $(e).closest('tr').find("input,select,textarea").css({ opacity: '0.5' });
        $(e).hide();
        $(e).closest('tr').find("#restoreBtn").show();
        $(e).closest('tr').find("input").first().val("0");
        console.log($(e).closest('tr').find("input").first().val());
        UserHasSpecial_Summary();
    }
}

function UserHasSpecial_RestoreUserHasSpecial(e) {
    if (confirm('กรุณากดตกลง เพื่อยืนยันการกู้คืน?')) {
        $(e).closest('tr').find("input,select,textarea").attr('disabled', false);
        $(e).closest('tr').find("input,select,textarea").css({ opacity: '1' });
        $(e).hide();
        $(e).closest('tr').find("#removeBtn").show();
        $(e).closest('tr').find("input").first().val("1");
        console.log($(e).closest('tr').find("input").first().val());
        UserHasSpecial_Summary();
    }
}

function UserHasSpecial_Summary() {
    var sum = 0;
    $(".input_score").each(function () {
        sum += +$(this).val();
    });
    $("#score_label").text("ผลรวม: " + sum);
}

function UserHasSpecial_InitialForm(id) {
    var successFunc = function (result) {
        UserHasSpecial_Get(id, result);
        endLoad();
    };
    startLoad();
    AjaxGetRequest(apisite + "/api/v1/UserHasSpecial/" + "GetBlankItem", successFunc, AlertDanger);
}
