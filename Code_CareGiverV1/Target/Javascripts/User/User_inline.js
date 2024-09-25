function User_ClearForm(i, blankItem) {
	var data = blankItem;
$("#User_id_" + i).val("");
$("#User_username_" + i).val("");
$("#User_passwordHash_" + i).val("");
$("#User_email_" + i).val("");
DropDownClearFormAndFeedWithData($("#User_masterPrefixId_" + i), blankItem, "id", "name", "item_masterPrefixId", data.masterPrefixId);
$("#User_firstname_" + i).val("");
$("#User_lastname_" + i).val("");
$("#User_telephoneNumber_" + i).val("");
DropDownClearFormAndFeedWithData($("#User_masterRoleId_" + i), blankItem, "id", "name", "item_masterRoleId", data.masterRoleId);
$("#User_remark_" + i).val("");

}

function User_FeedDataToForm(data, i, blankItem) {
$("#User_id_" + i).val(data.id);
$("#User_username_" + i).val(data.username);
$("#User_passwordHash_" + i).val(data.passwordHash);
$("#User_email_" + i).val(data.email);
DropDownClearFormAndFeedWithData($("#User_masterPrefixId_" + i), blankItem, "id", "name", "item_masterPrefixId", data.masterPrefixId);
$("#User_firstname_" + i).val(data.firstname);
$("#User_lastname_" + i).val(data.lastname);
$("#User_telephoneNumber_" + i).val(data.telephoneNumber);
DropDownClearFormAndFeedWithData($("#User_masterRoleId_" + i), blankItem, "id", "name", "item_masterRoleId", data.masterRoleId);
$("#User_remark_" + i).val(data.remark);

}

function User_GetFromForm(obj, i) {
    var UserObject = new Object();
UserObject.id = obj.find("#User_id_" + i).val();
UserObject.username = obj.find("#User_username_" + i).val();
UserObject.passwordHash = obj.find("#User_passwordHash_" + i).val();
UserObject.email = obj.find("#User_email_" + i).val();
UserObject.masterPrefixId = obj.find("#User_masterPrefixId_" + i).val();
UserObject.firstname = obj.find("#User_firstname_" + i).val();
UserObject.lastname = obj.find("#User_lastname_" + i).val();
UserObject.telephoneNumber = obj.find("#User_telephoneNumber_" + i).val();
UserObject.masterRoleId = obj.find("#User_masterRoleId_" + i).val();
UserObject.remark = obj.find("#User_remark_" + i).val();

    UserObject.active_mode = obj.find("#isActive_" + i + "_User").val();
    return UserObject;
}

function User_GetAllData() {
    //Insert User List
    var User = [];
    $('#UserBody tr').each(function () {
        var i = $(this).find("#rowCount").text();
        var eachUser = User_GetFromForm($(this), i);
        User.push(eachUser);
    });
    return User;
}

function User_Save(id) {
	//Insert User List
	var User = User_GetAllData();

    var successFunc = function (result) {
        AlertSuccess("ปรับปรุงข้อมูลเรียบร้อยแล้ว");
		endLoad();
    };
	startLoad();
	AjaxPutRequest(apisite + '/api/v1/User/UpdateMultiple', User, successFunc, AlertDanger);
}

function User_Get(id, blankItem) {

	$('#UserBody').empty();

	var successFunc = function (response) {
    //console.log(response);
		$.each(response, function (i, data) {
			var tag = '<tr>';
            tag += '<td><label id="rowCount">' + (i + 1) + '</label><input type="hidden" id="isActive_' + (i + 1) + '_User" value="1" /><input class="form-control" type="hidden" id="User_id_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="User_username_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="User_passwordHash_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="User_email_' + (i + 1)+'" /></td>';
 tag += '<td><select class="form-control" id="User_masterPrefixId_' + (i + 1) +'"></select></td>';
 tag += '<td><input class="form-control" type="text" id="User_firstname_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="User_lastname_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="User_telephoneNumber_' + (i + 1)+'" /></td>';
 tag += '<td><select class="form-control" id="User_masterRoleId_' + (i + 1) +'"></select></td>';
 tag += '<td><input class="form-control" type="text" id="User_remark_' + (i + 1)+'" /></td>';

			tag += '<td><a href="javascript:;" class="btn btn-danger btn-sm" onclick="javascript:User_RemoveUser(this)" id="removeBtn"><i class="fa fa-trash-alt" style="color:white;"></i></a><a href="javascript:;" class="btn btn-primary btn-sm" onclick="javascript:User_RestoreUser(this)" style="display: none;" id="restoreBtn"><i class="fa fa-upload" style="color:white;"></i></a></td>';
			tag += '</tr>';
			$('#UserBody').append($(tag));
			User_FeedDataToForm(data, (i + 1), blankItem);
		});
        User_Summary();
		endLoad();
	};
	startLoad();
	AjaxGetRequest(apisite + "/api/v1/User", successFunc, AlertDanger);
			//AjaxGetRequest(apisite + '/api/User/GetListBymasterPrefixId/' + a, successFunc, AlertDanger);
		//AjaxGetRequest(apisite + '/api/User/GetListBymasterRoleId/' + a, successFunc, AlertDanger);

}

function User_Add() {
	var successFunc = function (result) {
		var i = $("#UserBody tr").length;
		var tag = '<tr>';
		tag += '<td><label id="rowCount">' + (i + 1) + '</label><input type="hidden" id="isActive_' + (i + 1) + '_User" value="1" /><input class="form-control" type="hidden" id="User_id_' + (i + 1)+'" /></td>';
	 tag += '<td><input class="form-control" type="text" id="User_username_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="User_passwordHash_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="User_email_' + (i + 1)+'" /></td>';
 tag += '<td><select class="form-control" id="User_masterPrefixId_' + (i + 1) +'"></select></td>';
 tag += '<td><input class="form-control" type="text" id="User_firstname_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="User_lastname_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="User_telephoneNumber_' + (i + 1)+'" /></td>';
 tag += '<td><select class="form-control" id="User_masterRoleId_' + (i + 1) +'"></select></td>';
 tag += '<td><input class="form-control" type="text" id="User_remark_' + (i + 1)+'" /></td>';

		tag += '<td><a href="javascript:;" class="btn btn-danger btn-sm" onclick="javascript:User_RemoveUser(this)" id="removeBtn"><i class="fa fa-trash-alt" style="color:white;"></i></a><a href="javascript:;" class="btn btn-primary btn-sm" onclick="javascript:User_RestoreUser(this)" style="display: none;" id="restoreBtn"><i class="fa fa-upload" style="color:white;"></i></a></td>';
		tag += '</tr>';
    
		$('#UserBody').append($(tag));
		User_ClearForm(i + 1, result);
		endLoad();
	};
	startLoad();
    AjaxGetRequest(apisite + "/api/v1/User/" + "GetBlankItem", successFunc, AlertDanger);
}

function User_RemoveUser(e) {
    if (confirm('กรุณากดตกลง เพื่อยืนยันการลบ?')) {
        $(e).closest('tr').find("input,select,textarea").attr('disabled', true);
        $(e).closest('tr').find("input,select,textarea").css({ opacity: '0.5' });
        $(e).hide();
        $(e).closest('tr').find("#restoreBtn").show();
        $(e).closest('tr').find("input").first().val("0");
        console.log($(e).closest('tr').find("input").first().val());
        User_Summary();
    }
}

function User_RestoreUser(e) {
    if (confirm('กรุณากดตกลง เพื่อยืนยันการกู้คืน?')) {
        $(e).closest('tr').find("input,select,textarea").attr('disabled', false);
        $(e).closest('tr').find("input,select,textarea").css({ opacity: '1' });
        $(e).hide();
        $(e).closest('tr').find("#removeBtn").show();
        $(e).closest('tr').find("input").first().val("1");
        console.log($(e).closest('tr').find("input").first().val());
        User_Summary();
    }
}

function User_Summary() {
    var sum = 0;
    $(".input_score").each(function () {
        sum += +$(this).val();
    });
    $("#score_label").text("ผลรวม: " + sum);
}

function User_InitialForm(id) {
    var successFunc = function (result) {
        User_Get(id, result);
        endLoad();
    };
    startLoad();
    AjaxGetRequest(apisite + "/api/v1/User/" + "GetBlankItem", successFunc, AlertDanger);
}
