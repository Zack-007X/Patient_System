function TreatmentSchedule_ClearForm(i, blankItem) {
	var data = blankItem;
$("#TreatmentSchedule_id_" + i).val("");
DropDownClearFormAndFeedWithData($("#TreatmentSchedule_surveyId_" + i), blankItem, "id", "patientId", "item_surveyId", data.surveyId);
$("#TreatmentSchedule_planingTopic_" + i).val("");
$("#TreatmentSchedule_planingDetails_" + i).val("");
$("#TreatmentSchedule_startTreatmentDate_" + i).val("");
$("#TreatmentSchedule_endtartTreatmentDate_" + i).val("");
DropDownClearFormAndFeedWithData($("#TreatmentSchedule_CaregiverId_" + i), blankItem, "id", "username", "item_CaregiverId", data.CaregiverId);
$("#TreatmentSchedule_TreatmentReportTopic_" + i).val("");
$("#TreatmentSchedule_TreatmentReportDetails_" + i).val("");
$("#TreatmentSchedule_remark_" + i).val("");

}

function TreatmentSchedule_FeedDataToForm(data, i, blankItem) {
$("#TreatmentSchedule_id_" + i).val(data.id);
DropDownClearFormAndFeedWithData($("#TreatmentSchedule_surveyId_" + i), blankItem, "id", "patientId", "item_surveyId", data.surveyId);
$("#TreatmentSchedule_planingTopic_" + i).val(data.planingTopic);
$("#TreatmentSchedule_planingDetails_" + i).val(data.planingDetails);
$("#TreatmentSchedule_startTreatmentDate_" + i).val(formatDate(data.startTreatmentDate));
$("#TreatmentSchedule_endtartTreatmentDate_" + i).val(formatDate(data.endtartTreatmentDate));
DropDownClearFormAndFeedWithData($("#TreatmentSchedule_CaregiverId_" + i), blankItem, "id", "username", "item_CaregiverId", data.CaregiverId);
$("#TreatmentSchedule_TreatmentReportTopic_" + i).val(data.TreatmentReportTopic);
$("#TreatmentSchedule_TreatmentReportDetails_" + i).val(data.TreatmentReportDetails);
$("#TreatmentSchedule_remark_" + i).val(data.remark);

}

function TreatmentSchedule_GetFromForm(obj, i) {
    var TreatmentScheduleObject = new Object();
TreatmentScheduleObject.id = obj.find("#TreatmentSchedule_id_" + i).val();
TreatmentScheduleObject.surveyId = obj.find("#TreatmentSchedule_surveyId_" + i).val();
TreatmentScheduleObject.planingTopic = obj.find("#TreatmentSchedule_planingTopic_" + i).val();
TreatmentScheduleObject.planingDetails = obj.find("#TreatmentSchedule_planingDetails_" + i).val();
TreatmentScheduleObject.startTreatmentDate = getDate(obj.find("#TreatmentSchedule_startTreatmentDate_" + i).val());
TreatmentScheduleObject.endtartTreatmentDate = getDate(obj.find("#TreatmentSchedule_endtartTreatmentDate_" + i).val());
TreatmentScheduleObject.CaregiverId = obj.find("#TreatmentSchedule_CaregiverId_" + i).val();
TreatmentScheduleObject.TreatmentReportTopic = obj.find("#TreatmentSchedule_TreatmentReportTopic_" + i).val();
TreatmentScheduleObject.TreatmentReportDetails = obj.find("#TreatmentSchedule_TreatmentReportDetails_" + i).val();
TreatmentScheduleObject.remark = obj.find("#TreatmentSchedule_remark_" + i).val();

    TreatmentScheduleObject.active_mode = obj.find("#isActive_" + i + "_TreatmentSchedule").val();
    return TreatmentScheduleObject;
}

function TreatmentSchedule_GetAllData() {
    //Insert TreatmentSchedule List
    var TreatmentSchedule = [];
    $('#TreatmentScheduleBody tr').each(function () {
        var i = $(this).find("#rowCount").text();
        var eachTreatmentSchedule = TreatmentSchedule_GetFromForm($(this), i);
        TreatmentSchedule.push(eachTreatmentSchedule);
    });
    return TreatmentSchedule;
}

function TreatmentSchedule_Save(id) {
	//Insert TreatmentSchedule List
	var TreatmentSchedule = TreatmentSchedule_GetAllData();

    var successFunc = function (result) {
        AlertSuccess("ปรับปรุงข้อมูลเรียบร้อยแล้ว");
		endLoad();
    };
	startLoad();
	AjaxPutRequest(apisite + '/api/v1/TreatmentSchedule/UpdateMultiple', TreatmentSchedule, successFunc, AlertDanger);
}

function TreatmentSchedule_Get(id, blankItem) {

	$('#TreatmentScheduleBody').empty();

	var successFunc = function (response) {
    //console.log(response);
		$.each(response, function (i, data) {
			var tag = '<tr>';
            tag += '<td><label id="rowCount">' + (i + 1) + '</label><input type="hidden" id="isActive_' + (i + 1) + '_TreatmentSchedule" value="1" /><input class="form-control" type="hidden" id="TreatmentSchedule_id_' + (i + 1)+'" /></td>';
 tag += '<td><select class="form-control" id="TreatmentSchedule_surveyId_' + (i + 1) +'"></select></td>';
 tag += '<td><input class="form-control" type="text" id="TreatmentSchedule_planingTopic_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="TreatmentSchedule_planingDetails_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="TreatmentSchedule_startTreatmentDate_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="TreatmentSchedule_endtartTreatmentDate_' + (i + 1)+'" /></td>';
 tag += '<td><select class="form-control" id="TreatmentSchedule_CaregiverId_' + (i + 1) +'"></select></td>';
 tag += '<td><input class="form-control" type="text" id="TreatmentSchedule_TreatmentReportTopic_' + (i + 1)+'" /></td>';
 tag += '<td><textarea class="form-control" rows="2" cols="25" id="TreatmentSchedule_TreatmentReportDetails_' + (i + 1)+'" ></textarea></td>';
 tag += '<td><input class="form-control" type="text" id="TreatmentSchedule_remark_' + (i + 1)+'" /></td>';

			tag += '<td><a href="javascript:;" class="btn btn-danger btn-sm" onclick="javascript:TreatmentSchedule_RemoveTreatmentSchedule(this)" id="removeBtn"><i class="fa fa-trash-alt" style="color:white;"></i></a><a href="javascript:;" class="btn btn-primary btn-sm" onclick="javascript:TreatmentSchedule_RestoreTreatmentSchedule(this)" style="display: none;" id="restoreBtn"><i class="fa fa-upload" style="color:white;"></i></a></td>';
			tag += '</tr>';
			$('#TreatmentScheduleBody').append($(tag));
			TreatmentSchedule_FeedDataToForm(data, (i + 1), blankItem);
		});
        TreatmentSchedule_Summary();
		endLoad();
	};
	startLoad();
	AjaxGetRequest(apisite + "/api/v1/TreatmentSchedule", successFunc, AlertDanger);
			//AjaxGetRequest(apisite + '/api/TreatmentSchedule/GetListBysurveyId/' + a, successFunc, AlertDanger);
		//AjaxGetRequest(apisite + '/api/TreatmentSchedule/GetListByCaregiverId/' + a, successFunc, AlertDanger);

}

function TreatmentSchedule_Add() {
	var successFunc = function (result) {
		var i = $("#TreatmentScheduleBody tr").length;
		var tag = '<tr>';
		tag += '<td><label id="rowCount">' + (i + 1) + '</label><input type="hidden" id="isActive_' + (i + 1) + '_TreatmentSchedule" value="1" /><input class="form-control" type="hidden" id="TreatmentSchedule_id_' + (i + 1)+'" /></td>';
	 tag += '<td><select class="form-control" id="TreatmentSchedule_surveyId_' + (i + 1) +'"></select></td>';
 tag += '<td><input class="form-control" type="text" id="TreatmentSchedule_planingTopic_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="TreatmentSchedule_planingDetails_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="TreatmentSchedule_startTreatmentDate_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="TreatmentSchedule_endtartTreatmentDate_' + (i + 1)+'" /></td>';
 tag += '<td><select class="form-control" id="TreatmentSchedule_CaregiverId_' + (i + 1) +'"></select></td>';
 tag += '<td><input class="form-control" type="text" id="TreatmentSchedule_TreatmentReportTopic_' + (i + 1)+'" /></td>';
 tag += '<td><textarea class="form-control" rows="2" cols="25" id="TreatmentSchedule_TreatmentReportDetails_' + (i + 1)+'" ></textarea></td>';
 tag += '<td><input class="form-control" type="text" id="TreatmentSchedule_remark_' + (i + 1)+'" /></td>';

		tag += '<td><a href="javascript:;" class="btn btn-danger btn-sm" onclick="javascript:TreatmentSchedule_RemoveTreatmentSchedule(this)" id="removeBtn"><i class="fa fa-trash-alt" style="color:white;"></i></a><a href="javascript:;" class="btn btn-primary btn-sm" onclick="javascript:TreatmentSchedule_RestoreTreatmentSchedule(this)" style="display: none;" id="restoreBtn"><i class="fa fa-upload" style="color:white;"></i></a></td>';
		tag += '</tr>';
    
		$('#TreatmentScheduleBody').append($(tag));
		TreatmentSchedule_ClearForm(i + 1, result);
		endLoad();
	};
	startLoad();
    AjaxGetRequest(apisite + "/api/v1/TreatmentSchedule/" + "GetBlankItem", successFunc, AlertDanger);
}

function TreatmentSchedule_RemoveTreatmentSchedule(e) {
    if (confirm('กรุณากดตกลง เพื่อยืนยันการลบ?')) {
        $(e).closest('tr').find("input,select,textarea").attr('disabled', true);
        $(e).closest('tr').find("input,select,textarea").css({ opacity: '0.5' });
        $(e).hide();
        $(e).closest('tr').find("#restoreBtn").show();
        $(e).closest('tr').find("input").first().val("0");
        console.log($(e).closest('tr').find("input").first().val());
        TreatmentSchedule_Summary();
    }
}

function TreatmentSchedule_RestoreTreatmentSchedule(e) {
    if (confirm('กรุณากดตกลง เพื่อยืนยันการกู้คืน?')) {
        $(e).closest('tr').find("input,select,textarea").attr('disabled', false);
        $(e).closest('tr').find("input,select,textarea").css({ opacity: '1' });
        $(e).hide();
        $(e).closest('tr').find("#removeBtn").show();
        $(e).closest('tr').find("input").first().val("1");
        console.log($(e).closest('tr').find("input").first().val());
        TreatmentSchedule_Summary();
    }
}

function TreatmentSchedule_Summary() {
    var sum = 0;
    $(".input_score").each(function () {
        sum += +$(this).val();
    });
    $("#score_label").text("ผลรวม: " + sum);
}

function TreatmentSchedule_InitialForm(id) {
    var successFunc = function (result) {
        TreatmentSchedule_Get(id, result);
        endLoad();
    };
    startLoad();
    AjaxGetRequest(apisite + "/api/v1/TreatmentSchedule/" + "GetBlankItem", successFunc, AlertDanger);
}
