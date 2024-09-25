function MasterGender_ClearForm(i, blankItem) {
	var data = blankItem;
$("#MasterGender_id_" + i).val("");
$("#MasterGender_code_" + i).val("");
$("#MasterGender_name_" + i).val("");
$("#MasterGender_remark_" + i).val("");

}

function MasterGender_FeedDataToForm(data, i, blankItem) {
$("#MasterGender_id_" + i).val(data.id);
$("#MasterGender_code_" + i).val(data.code);
$("#MasterGender_name_" + i).val(data.name);
$("#MasterGender_remark_" + i).val(data.remark);

}

function MasterGender_GetFromForm(obj, i) {
    var MasterGenderObject = new Object();
MasterGenderObject.id = obj.find("#MasterGender_id_" + i).val();
MasterGenderObject.code = obj.find("#MasterGender_code_" + i).val();
MasterGenderObject.name = obj.find("#MasterGender_name_" + i).val();
MasterGenderObject.remark = obj.find("#MasterGender_remark_" + i).val();

    MasterGenderObject.active_mode = obj.find("#isActive_" + i + "_MasterGender").val();
    return MasterGenderObject;
}

function MasterGender_GetAllData() {
    //Insert MasterGender List
    var MasterGender = [];
    $('#MasterGenderBody tr').each(function () {
        var i = $(this).find("#rowCount").text();
        var eachMasterGender = MasterGender_GetFromForm($(this), i);
        MasterGender.push(eachMasterGender);
    });
    return MasterGender;
}

function MasterGender_Save(id) {
	//Insert MasterGender List
	var MasterGender = MasterGender_GetAllData();

    var successFunc = function (result) {
        AlertSuccess("ปรับปรุงข้อมูลเรียบร้อยแล้ว");
		endLoad();
    };
	startLoad();
	AjaxPutRequest(apisite + '/api/v1/MasterGender/UpdateMultiple', MasterGender, successFunc, AlertDanger);
}

function MasterGender_Get(id, blankItem) {

	$('#MasterGenderBody').empty();

	var successFunc = function (response) {
    //console.log(response);
		$.each(response, function (i, data) {
			var tag = '<tr>';
            tag += '<td><label id="rowCount">' + (i + 1) + '</label><input type="hidden" id="isActive_' + (i + 1) + '_MasterGender" value="1" /><input class="form-control" type="hidden" id="MasterGender_id_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="MasterGender_code_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="MasterGender_name_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="MasterGender_remark_' + (i + 1)+'" /></td>';

			tag += '<td><a href="javascript:;" class="btn btn-danger btn-sm" onclick="javascript:MasterGender_RemoveMasterGender(this)" id="removeBtn"><i class="fa fa-trash-alt" style="color:white;"></i></a><a href="javascript:;" class="btn btn-primary btn-sm" onclick="javascript:MasterGender_RestoreMasterGender(this)" style="display: none;" id="restoreBtn"><i class="fa fa-upload" style="color:white;"></i></a></td>';
			tag += '</tr>';
			$('#MasterGenderBody').append($(tag));
			MasterGender_FeedDataToForm(data, (i + 1), blankItem);
		});
        MasterGender_Summary();
		endLoad();
	};
	startLoad();
	AjaxGetRequest(apisite + "/api/v1/MasterGender", successFunc, AlertDanger);
	
}

function MasterGender_Add() {
	var successFunc = function (result) {
		var i = $("#MasterGenderBody tr").length;
		var tag = '<tr>';
		tag += '<td><label id="rowCount">' + (i + 1) + '</label><input type="hidden" id="isActive_' + (i + 1) + '_MasterGender" value="1" /><input class="form-control" type="hidden" id="MasterGender_id_' + (i + 1)+'" /></td>';
	 tag += '<td><input class="form-control" type="text" id="MasterGender_code_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="MasterGender_name_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="MasterGender_remark_' + (i + 1)+'" /></td>';

		tag += '<td><a href="javascript:;" class="btn btn-danger btn-sm" onclick="javascript:MasterGender_RemoveMasterGender(this)" id="removeBtn"><i class="fa fa-trash-alt" style="color:white;"></i></a><a href="javascript:;" class="btn btn-primary btn-sm" onclick="javascript:MasterGender_RestoreMasterGender(this)" style="display: none;" id="restoreBtn"><i class="fa fa-upload" style="color:white;"></i></a></td>';
		tag += '</tr>';
    
		$('#MasterGenderBody').append($(tag));
		MasterGender_ClearForm(i + 1, result);
		endLoad();
	};
	startLoad();
    AjaxGetRequest(apisite + "/api/v1/MasterGender/" + "GetBlankItem", successFunc, AlertDanger);
}

function MasterGender_RemoveMasterGender(e) {
    if (confirm('กรุณากดตกลง เพื่อยืนยันการลบ?')) {
        $(e).closest('tr').find("input,select,textarea").attr('disabled', true);
        $(e).closest('tr').find("input,select,textarea").css({ opacity: '0.5' });
        $(e).hide();
        $(e).closest('tr').find("#restoreBtn").show();
        $(e).closest('tr').find("input").first().val("0");
        console.log($(e).closest('tr').find("input").first().val());
        MasterGender_Summary();
    }
}

function MasterGender_RestoreMasterGender(e) {
    if (confirm('กรุณากดตกลง เพื่อยืนยันการกู้คืน?')) {
        $(e).closest('tr').find("input,select,textarea").attr('disabled', false);
        $(e).closest('tr').find("input,select,textarea").css({ opacity: '1' });
        $(e).hide();
        $(e).closest('tr').find("#removeBtn").show();
        $(e).closest('tr').find("input").first().val("1");
        console.log($(e).closest('tr').find("input").first().val());
        MasterGender_Summary();
    }
}

function MasterGender_Summary() {
    var sum = 0;
    $(".input_score").each(function () {
        sum += +$(this).val();
    });
    $("#score_label").text("ผลรวม: " + sum);
}

function MasterGender_InitialForm(id) {
    var successFunc = function (result) {
        MasterGender_Get(id, result);
        endLoad();
    };
    startLoad();
    AjaxGetRequest(apisite + "/api/v1/MasterGender/" + "GetBlankItem", successFunc, AlertDanger);
}
