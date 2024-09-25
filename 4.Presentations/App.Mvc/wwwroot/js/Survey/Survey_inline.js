function Survey_ClearForm(i, blankItem) {
	var data = blankItem;
$("#Survey_id_" + i).val("");
DropDownClearFormAndFeedWithData($("#Survey_patientId_" + i), blankItem, "id", "firstname", "item_patientId", data.patientId);
DropDownClearFormAndFeedWithData($("#Survey_doctorId_" + i), blankItem, "id", "username", "item_doctorId", data.doctorId);
DropDownClearFormAndFeedWithData($("#Survey_masterPatientStateId_" + i), blankItem, "id", "name", "item_masterPatientStateId", data.masterPatientStateId);
$("#Survey_BloodPressure_" + i).val("");
$("#Survey_OxygenLevel_" + i).val("");
$("#Survey_HeartRate_" + i).val("");
$("#Survey_SurveyDate_" + i).val("");
$("#Survey_SurveyDetail_" + i).val("");
$("#Survey_remark_" + i).val("");

}

function Survey_FeedDataToForm(data, i, blankItem) {
$("#Survey_id_" + i).val(data.id);
DropDownClearFormAndFeedWithData($("#Survey_patientId_" + i), blankItem, "id", "firstname", "item_patientId", data.patientId);
DropDownClearFormAndFeedWithData($("#Survey_doctorId_" + i), blankItem, "id", "username", "item_doctorId", data.doctorId);
DropDownClearFormAndFeedWithData($("#Survey_masterPatientStateId_" + i), blankItem, "id", "name", "item_masterPatientStateId", data.masterPatientStateId);
$("#Survey_BloodPressure_" + i).val(data.BloodPressure);
$("#Survey_OxygenLevel_" + i).val(data.OxygenLevel);
$("#Survey_HeartRate_" + i).val(data.HeartRate);
$("#Survey_SurveyDate_" + i).val(formatDate(data.SurveyDate));
$("#Survey_SurveyDetail_" + i).val(data.SurveyDetail);
$("#Survey_remark_" + i).val(data.remark);

}

function Survey_GetFromForm(obj, i) {
    var SurveyObject = new Object();
SurveyObject.id = obj.find("#Survey_id_" + i).val();
SurveyObject.patientId = obj.find("#Survey_patientId_" + i).val();
SurveyObject.doctorId = obj.find("#Survey_doctorId_" + i).val();
SurveyObject.masterPatientStateId = obj.find("#Survey_masterPatientStateId_" + i).val();
SurveyObject.BloodPressure = obj.find("#Survey_BloodPressure_" + i).val();
SurveyObject.OxygenLevel = obj.find("#Survey_OxygenLevel_" + i).val();
SurveyObject.HeartRate = obj.find("#Survey_HeartRate_" + i).val();
SurveyObject.SurveyDate = getDate(obj.find("#Survey_SurveyDate_" + i).val());
SurveyObject.SurveyDetail = obj.find("#Survey_SurveyDetail_" + i).val();
SurveyObject.remark = obj.find("#Survey_remark_" + i).val();

    SurveyObject.active_mode = obj.find("#isActive_" + i + "_Survey").val();
    return SurveyObject;
}

function Survey_GetAllData() {
    //Insert Survey List
    var Survey = [];
    $('#SurveyBody tr').each(function () {
        var i = $(this).find("#rowCount").text();
        var eachSurvey = Survey_GetFromForm($(this), i);
        Survey.push(eachSurvey);
    });
    return Survey;
}

function Survey_Save(id) {
	//Insert Survey List
	var Survey = Survey_GetAllData();

    var successFunc = function (result) {
        AlertSuccess("ปรับปรุงข้อมูลเรียบร้อยแล้ว");
		endLoad();
    };
	startLoad();
	AjaxPutRequest(apisite + '/api/v1/Survey/UpdateMultiple', Survey, successFunc, AlertDanger);
}

function Survey_Get(id, blankItem) {

	$('#SurveyBody').empty();

	var successFunc = function (response) {
    //console.log(response);
		$.each(response, function (i, data) {
			var tag = '<tr>';
            tag += '<td><label id="rowCount">' + (i + 1) + '</label><input type="hidden" id="isActive_' + (i + 1) + '_Survey" value="1" /><input class="form-control" type="hidden" id="Survey_id_' + (i + 1)+'" /></td>';
 tag += '<td><select class="form-control" id="Survey_patientId_' + (i + 1) +'"></select></td>';
 tag += '<td><select class="form-control" id="Survey_doctorId_' + (i + 1) +'"></select></td>';
 tag += '<td><select class="form-control" id="Survey_masterPatientStateId_' + (i + 1) +'"></select></td>';
 tag += '<td><input class="form-control" type="text" id="Survey_BloodPressure_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="Survey_OxygenLevel_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="Survey_HeartRate_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="Survey_SurveyDate_' + (i + 1)+'" /></td>';
 tag += '<td><textarea class="form-control" rows="2" cols="25" id="Survey_SurveyDetail_' + (i + 1)+'" ></textarea></td>';
 tag += '<td><input class="form-control" type="text" id="Survey_remark_' + (i + 1)+'" /></td>';

			tag += '<td><a href="javascript:;" class="btn btn-danger btn-sm" onclick="javascript:Survey_RemoveSurvey(this)" id="removeBtn"><i class="fa fa-trash-alt" style="color:white;"></i></a><a href="javascript:;" class="btn btn-primary btn-sm" onclick="javascript:Survey_RestoreSurvey(this)" style="display: none;" id="restoreBtn"><i class="fa fa-upload" style="color:white;"></i></a></td>';
			tag += '</tr>';
			$('#SurveyBody').append($(tag));
			Survey_FeedDataToForm(data, (i + 1), blankItem);
		});
        Survey_Summary();
		endLoad();
	};
	startLoad();
	AjaxGetRequest(apisite + "/api/v1/Survey", successFunc, AlertDanger);
			//AjaxGetRequest(apisite + '/api/Survey/GetListBypatientId/' + a, successFunc, AlertDanger);
		//AjaxGetRequest(apisite + '/api/Survey/GetListBydoctorId/' + a, successFunc, AlertDanger);
		//AjaxGetRequest(apisite + '/api/Survey/GetListBymasterPatientStateId/' + a, successFunc, AlertDanger);

}

function Survey_Add() {
	var successFunc = function (result) {
		var i = $("#SurveyBody tr").length;
		var tag = '<tr>';
		tag += '<td><label id="rowCount">' + (i + 1) + '</label><input type="hidden" id="isActive_' + (i + 1) + '_Survey" value="1" /><input class="form-control" type="hidden" id="Survey_id_' + (i + 1)+'" /></td>';
	 tag += '<td><select class="form-control" id="Survey_patientId_' + (i + 1) +'"></select></td>';
 tag += '<td><select class="form-control" id="Survey_doctorId_' + (i + 1) +'"></select></td>';
 tag += '<td><select class="form-control" id="Survey_masterPatientStateId_' + (i + 1) +'"></select></td>';
 tag += '<td><input class="form-control" type="text" id="Survey_BloodPressure_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="Survey_OxygenLevel_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="Survey_HeartRate_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="Survey_SurveyDate_' + (i + 1)+'" /></td>';
 tag += '<td><textarea class="form-control" rows="2" cols="25" id="Survey_SurveyDetail_' + (i + 1)+'" ></textarea></td>';
 tag += '<td><input class="form-control" type="text" id="Survey_remark_' + (i + 1)+'" /></td>';

		tag += '<td><a href="javascript:;" class="btn btn-danger btn-sm" onclick="javascript:Survey_RemoveSurvey(this)" id="removeBtn"><i class="fa fa-trash-alt" style="color:white;"></i></a><a href="javascript:;" class="btn btn-primary btn-sm" onclick="javascript:Survey_RestoreSurvey(this)" style="display: none;" id="restoreBtn"><i class="fa fa-upload" style="color:white;"></i></a></td>';
		tag += '</tr>';
    
		$('#SurveyBody').append($(tag));
		Survey_ClearForm(i + 1, result);
		endLoad();
	};
	startLoad();
    AjaxGetRequest(apisite + "/api/v1/Survey/" + "GetBlankItem", successFunc, AlertDanger);
}

function Survey_RemoveSurvey(e) {
    if (confirm('กรุณากดตกลง เพื่อยืนยันการลบ?')) {
        $(e).closest('tr').find("input,select,textarea").attr('disabled', true);
        $(e).closest('tr').find("input,select,textarea").css({ opacity: '0.5' });
        $(e).hide();
        $(e).closest('tr').find("#restoreBtn").show();
        $(e).closest('tr').find("input").first().val("0");
        console.log($(e).closest('tr').find("input").first().val());
        Survey_Summary();
    }
}

function Survey_RestoreSurvey(e) {
    if (confirm('กรุณากดตกลง เพื่อยืนยันการกู้คืน?')) {
        $(e).closest('tr').find("input,select,textarea").attr('disabled', false);
        $(e).closest('tr').find("input,select,textarea").css({ opacity: '1' });
        $(e).hide();
        $(e).closest('tr').find("#removeBtn").show();
        $(e).closest('tr').find("input").first().val("1");
        console.log($(e).closest('tr').find("input").first().val());
        Survey_Summary();
    }
}

function Survey_Summary() {
    var sum = 0;
    $(".input_score").each(function () {
        sum += +$(this).val();
    });
    $("#score_label").text("ผลรวม: " + sum);
}

function Survey_InitialForm(id) {
    var successFunc = function (result) {
        Survey_Get(id, result);
        endLoad();
    };
    startLoad();
    AjaxGetRequest(apisite + "/api/v1/Survey/" + "GetBlankItem", successFunc, AlertDanger);
}
