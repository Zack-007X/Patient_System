function MasterPrefix_ClearForm(i, blankItem) {
	var data = blankItem;
$("#MasterPrefix_id_" + i).val("");
$("#MasterPrefix_code_" + i).val("");
$("#MasterPrefix_name_" + i).val("");
$("#MasterPrefix_remark_" + i).val("");

}

function MasterPrefix_FeedDataToForm(data, i, blankItem) {
$("#MasterPrefix_id_" + i).val(data.id);
$("#MasterPrefix_code_" + i).val(data.code);
$("#MasterPrefix_name_" + i).val(data.name);
$("#MasterPrefix_remark_" + i).val(data.remark);

}

function MasterPrefix_GetFromForm(obj, i) {
    var MasterPrefixObject = new Object();
MasterPrefixObject.id = obj.find("#MasterPrefix_id_" + i).val();
MasterPrefixObject.code = obj.find("#MasterPrefix_code_" + i).val();
MasterPrefixObject.name = obj.find("#MasterPrefix_name_" + i).val();
MasterPrefixObject.remark = obj.find("#MasterPrefix_remark_" + i).val();

    MasterPrefixObject.active_mode = obj.find("#isActive_" + i + "_MasterPrefix").val();
    return MasterPrefixObject;
}

function MasterPrefix_GetAllData() {
    //Insert MasterPrefix List
    var MasterPrefix = [];
    $('#MasterPrefixBody tr').each(function () {
        var i = $(this).find("#rowCount").text();
        var eachMasterPrefix = MasterPrefix_GetFromForm($(this), i);
        MasterPrefix.push(eachMasterPrefix);
    });
    return MasterPrefix;
}

function MasterPrefix_Save(id) {
	//Insert MasterPrefix List
	var MasterPrefix = MasterPrefix_GetAllData();

    var successFunc = function (result) {
        AlertSuccess("ปรับปรุงข้อมูลเรียบร้อยแล้ว");
		endLoad();
    };
	startLoad();
	AjaxPutRequest(apisite + '/api/v1/MasterPrefix/UpdateMultiple', MasterPrefix, successFunc, AlertDanger);
}

function MasterPrefix_Get(id, blankItem) {

	$('#MasterPrefixBody').empty();

	var successFunc = function (response) {
    //console.log(response);
		$.each(response, function (i, data) {
			var tag = '<tr>';
            tag += '<td><label id="rowCount">' + (i + 1) + '</label><input type="hidden" id="isActive_' + (i + 1) + '_MasterPrefix" value="1" /><input class="form-control" type="hidden" id="MasterPrefix_id_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="MasterPrefix_code_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="MasterPrefix_name_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="MasterPrefix_remark_' + (i + 1)+'" /></td>';

			tag += '<td><a href="javascript:;" class="btn btn-danger btn-sm" onclick="javascript:MasterPrefix_RemoveMasterPrefix(this)" id="removeBtn"><i class="fa fa-trash-alt" style="color:white;"></i></a><a href="javascript:;" class="btn btn-primary btn-sm" onclick="javascript:MasterPrefix_RestoreMasterPrefix(this)" style="display: none;" id="restoreBtn"><i class="fa fa-upload" style="color:white;"></i></a></td>';
			tag += '</tr>';
			$('#MasterPrefixBody').append($(tag));
			MasterPrefix_FeedDataToForm(data, (i + 1), blankItem);
		});
        MasterPrefix_Summary();
		endLoad();
	};
	startLoad();
	AjaxGetRequest(apisite + "/api/v1/MasterPrefix", successFunc, AlertDanger);
	
}

function MasterPrefix_Add() {
	var successFunc = function (result) {
		var i = $("#MasterPrefixBody tr").length;
		var tag = '<tr>';
		tag += '<td><label id="rowCount">' + (i + 1) + '</label><input type="hidden" id="isActive_' + (i + 1) + '_MasterPrefix" value="1" /><input class="form-control" type="hidden" id="MasterPrefix_id_' + (i + 1)+'" /></td>';
	 tag += '<td><input class="form-control" type="text" id="MasterPrefix_code_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="MasterPrefix_name_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="MasterPrefix_remark_' + (i + 1)+'" /></td>';

		tag += '<td><a href="javascript:;" class="btn btn-danger btn-sm" onclick="javascript:MasterPrefix_RemoveMasterPrefix(this)" id="removeBtn"><i class="fa fa-trash-alt" style="color:white;"></i></a><a href="javascript:;" class="btn btn-primary btn-sm" onclick="javascript:MasterPrefix_RestoreMasterPrefix(this)" style="display: none;" id="restoreBtn"><i class="fa fa-upload" style="color:white;"></i></a></td>';
		tag += '</tr>';
    
		$('#MasterPrefixBody').append($(tag));
		MasterPrefix_ClearForm(i + 1, result);
		endLoad();
	};
	startLoad();
    AjaxGetRequest(apisite + "/api/v1/MasterPrefix/" + "GetBlankItem", successFunc, AlertDanger);
}

function MasterPrefix_RemoveMasterPrefix(e) {
    if (confirm('กรุณากดตกลง เพื่อยืนยันการลบ?')) {
        $(e).closest('tr').find("input,select,textarea").attr('disabled', true);
        $(e).closest('tr').find("input,select,textarea").css({ opacity: '0.5' });
        $(e).hide();
        $(e).closest('tr').find("#restoreBtn").show();
        $(e).closest('tr').find("input").first().val("0");
        console.log($(e).closest('tr').find("input").first().val());
        MasterPrefix_Summary();
    }
}

function MasterPrefix_RestoreMasterPrefix(e) {
    if (confirm('กรุณากดตกลง เพื่อยืนยันการกู้คืน?')) {
        $(e).closest('tr').find("input,select,textarea").attr('disabled', false);
        $(e).closest('tr').find("input,select,textarea").css({ opacity: '1' });
        $(e).hide();
        $(e).closest('tr').find("#removeBtn").show();
        $(e).closest('tr').find("input").first().val("1");
        console.log($(e).closest('tr').find("input").first().val());
        MasterPrefix_Summary();
    }
}

function MasterPrefix_Summary() {
    var sum = 0;
    $(".input_score").each(function () {
        sum += +$(this).val();
    });
    $("#score_label").text("ผลรวม: " + sum);
}

function MasterPrefix_InitialForm(id) {
    var successFunc = function (result) {
        MasterPrefix_Get(id, result);
        endLoad();
    };
    startLoad();
    AjaxGetRequest(apisite + "/api/v1/MasterPrefix/" + "GetBlankItem", successFunc, AlertDanger);
}
