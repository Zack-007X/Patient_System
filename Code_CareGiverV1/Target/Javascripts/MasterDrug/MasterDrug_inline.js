function MasterDrug_ClearForm(i, blankItem) {
	var data = blankItem;
$("#MasterDrug_id_" + i).val("");
$("#MasterDrug_code_" + i).val("");
$("#MasterDrug_name_" + i).val("");
$("#MasterDrug_dosage_" + i).val("");
$("#MasterDrug_remark_" + i).val("");
$("#MasterDrug_details_" + i).val("");

}

function MasterDrug_FeedDataToForm(data, i, blankItem) {
$("#MasterDrug_id_" + i).val(data.id);
$("#MasterDrug_code_" + i).val(data.code);
$("#MasterDrug_name_" + i).val(data.name);
$("#MasterDrug_dosage_" + i).val(data.dosage);
$("#MasterDrug_remark_" + i).val(data.remark);
$("#MasterDrug_details_" + i).val(data.details);

}

function MasterDrug_GetFromForm(obj, i) {
    var MasterDrugObject = new Object();
MasterDrugObject.id = obj.find("#MasterDrug_id_" + i).val();
MasterDrugObject.code = obj.find("#MasterDrug_code_" + i).val();
MasterDrugObject.name = obj.find("#MasterDrug_name_" + i).val();
MasterDrugObject.dosage = obj.find("#MasterDrug_dosage_" + i).val();
MasterDrugObject.remark = obj.find("#MasterDrug_remark_" + i).val();
MasterDrugObject.details = obj.find("#MasterDrug_details_" + i).val();

    MasterDrugObject.active_mode = obj.find("#isActive_" + i + "_MasterDrug").val();
    return MasterDrugObject;
}

function MasterDrug_GetAllData() {
    //Insert MasterDrug List
    var MasterDrug = [];
    $('#MasterDrugBody tr').each(function () {
        var i = $(this).find("#rowCount").text();
        var eachMasterDrug = MasterDrug_GetFromForm($(this), i);
        MasterDrug.push(eachMasterDrug);
    });
    return MasterDrug;
}

function MasterDrug_Save(id) {
	//Insert MasterDrug List
	var MasterDrug = MasterDrug_GetAllData();

    var successFunc = function (result) {
        AlertSuccess("ปรับปรุงข้อมูลเรียบร้อยแล้ว");
		endLoad();
    };
	startLoad();
	AjaxPutRequest(apisite + '/api/v1/MasterDrug/UpdateMultiple', MasterDrug, successFunc, AlertDanger);
}

function MasterDrug_Get(id, blankItem) {

	$('#MasterDrugBody').empty();

	var successFunc = function (response) {
    //console.log(response);
		$.each(response, function (i, data) {
			var tag = '<tr>';
            tag += '<td><label id="rowCount">' + (i + 1) + '</label><input type="hidden" id="isActive_' + (i + 1) + '_MasterDrug" value="1" /><input class="form-control" type="hidden" id="MasterDrug_id_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="MasterDrug_code_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="MasterDrug_name_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="MasterDrug_dosage_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="MasterDrug_remark_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="MasterDrug_details_' + (i + 1)+'" /></td>';

			tag += '<td><a href="javascript:;" class="btn btn-danger btn-sm" onclick="javascript:MasterDrug_RemoveMasterDrug(this)" id="removeBtn"><i class="fa fa-trash-alt" style="color:white;"></i></a><a href="javascript:;" class="btn btn-primary btn-sm" onclick="javascript:MasterDrug_RestoreMasterDrug(this)" style="display: none;" id="restoreBtn"><i class="fa fa-upload" style="color:white;"></i></a></td>';
			tag += '</tr>';
			$('#MasterDrugBody').append($(tag));
			MasterDrug_FeedDataToForm(data, (i + 1), blankItem);
		});
        MasterDrug_Summary();
		endLoad();
	};
	startLoad();
	AjaxGetRequest(apisite + "/api/v1/MasterDrug", successFunc, AlertDanger);
	
}

function MasterDrug_Add() {
	var successFunc = function (result) {
		var i = $("#MasterDrugBody tr").length;
		var tag = '<tr>';
		tag += '<td><label id="rowCount">' + (i + 1) + '</label><input type="hidden" id="isActive_' + (i + 1) + '_MasterDrug" value="1" /><input class="form-control" type="hidden" id="MasterDrug_id_' + (i + 1)+'" /></td>';
	 tag += '<td><input class="form-control" type="text" id="MasterDrug_code_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="MasterDrug_name_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="MasterDrug_dosage_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="MasterDrug_remark_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="MasterDrug_details_' + (i + 1)+'" /></td>';

		tag += '<td><a href="javascript:;" class="btn btn-danger btn-sm" onclick="javascript:MasterDrug_RemoveMasterDrug(this)" id="removeBtn"><i class="fa fa-trash-alt" style="color:white;"></i></a><a href="javascript:;" class="btn btn-primary btn-sm" onclick="javascript:MasterDrug_RestoreMasterDrug(this)" style="display: none;" id="restoreBtn"><i class="fa fa-upload" style="color:white;"></i></a></td>';
		tag += '</tr>';
    
		$('#MasterDrugBody').append($(tag));
		MasterDrug_ClearForm(i + 1, result);
		endLoad();
	};
	startLoad();
    AjaxGetRequest(apisite + "/api/v1/MasterDrug/" + "GetBlankItem", successFunc, AlertDanger);
}

function MasterDrug_RemoveMasterDrug(e) {
    if (confirm('กรุณากดตกลง เพื่อยืนยันการลบ?')) {
        $(e).closest('tr').find("input,select,textarea").attr('disabled', true);
        $(e).closest('tr').find("input,select,textarea").css({ opacity: '0.5' });
        $(e).hide();
        $(e).closest('tr').find("#restoreBtn").show();
        $(e).closest('tr').find("input").first().val("0");
        console.log($(e).closest('tr').find("input").first().val());
        MasterDrug_Summary();
    }
}

function MasterDrug_RestoreMasterDrug(e) {
    if (confirm('กรุณากดตกลง เพื่อยืนยันการกู้คืน?')) {
        $(e).closest('tr').find("input,select,textarea").attr('disabled', false);
        $(e).closest('tr').find("input,select,textarea").css({ opacity: '1' });
        $(e).hide();
        $(e).closest('tr').find("#removeBtn").show();
        $(e).closest('tr').find("input").first().val("1");
        console.log($(e).closest('tr').find("input").first().val());
        MasterDrug_Summary();
    }
}

function MasterDrug_Summary() {
    var sum = 0;
    $(".input_score").each(function () {
        sum += +$(this).val();
    });
    $("#score_label").text("ผลรวม: " + sum);
}

function MasterDrug_InitialForm(id) {
    var successFunc = function (result) {
        MasterDrug_Get(id, result);
        endLoad();
    };
    startLoad();
    AjaxGetRequest(apisite + "/api/v1/MasterDrug/" + "GetBlankItem", successFunc, AlertDanger);
}
