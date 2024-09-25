function Patient_ClearForm(i, blankItem) {
	var data = blankItem;
$("#Patient_id_" + i).val("");
DropDownClearFormAndFeedWithData($("#Patient_masterPrefixId_" + i), blankItem, "id", "name", "item_masterPrefixId", data.masterPrefixId);
$("#Patient_firstname_" + i).val("");
$("#Patient_lastname_" + i).val("");
$("#Patient_brithDate_" + i).val("");
DropDownClearFormAndFeedWithData($("#Patient_masterGenderId_" + i), blankItem, "id", "name", "item_masterGenderId", data.masterGenderId);
$("#Patient_age_" + i).val("");
$("#Patient_height_" + i).val("");
$("#Patient_weight_" + i).val("");
$("#Patient_telephoneNumber_" + i).val("");
$("#Patient_relativeName_" + i).val("");
$("#Patient_relativeContract_" + i).val("");
$("#Patient_remark_" + i).val("");

}

function Patient_FeedDataToForm(data, i, blankItem) {
$("#Patient_id_" + i).val(data.id);
DropDownClearFormAndFeedWithData($("#Patient_masterPrefixId_" + i), blankItem, "id", "name", "item_masterPrefixId", data.masterPrefixId);
$("#Patient_firstname_" + i).val(data.firstname);
$("#Patient_lastname_" + i).val(data.lastname);
$("#Patient_brithDate_" + i).val(formatDate(data.brithDate));
DropDownClearFormAndFeedWithData($("#Patient_masterGenderId_" + i), blankItem, "id", "name", "item_masterGenderId", data.masterGenderId);
$("#Patient_age_" + i).val(data.age);
$("#Patient_height_" + i).val(data.height);
$("#Patient_weight_" + i).val(data.weight);
$("#Patient_telephoneNumber_" + i).val(data.telephoneNumber);
$("#Patient_relativeName_" + i).val(data.relativeName);
$("#Patient_relativeContract_" + i).val(data.relativeContract);
$("#Patient_remark_" + i).val(data.remark);

}

function Patient_GetFromForm(obj, i) {
    var PatientObject = new Object();
PatientObject.id = obj.find("#Patient_id_" + i).val();
PatientObject.masterPrefixId = obj.find("#Patient_masterPrefixId_" + i).val();
PatientObject.firstname = obj.find("#Patient_firstname_" + i).val();
PatientObject.lastname = obj.find("#Patient_lastname_" + i).val();
PatientObject.brithDate = getDate(obj.find("#Patient_brithDate_" + i).val());
PatientObject.masterGenderId = obj.find("#Patient_masterGenderId_" + i).val();
PatientObject.age = obj.find("#Patient_age_" + i).val();
PatientObject.height = obj.find("#Patient_height_" + i).val();
PatientObject.weight = obj.find("#Patient_weight_" + i).val();
PatientObject.telephoneNumber = obj.find("#Patient_telephoneNumber_" + i).val();
PatientObject.relativeName = obj.find("#Patient_relativeName_" + i).val();
PatientObject.relativeContract = obj.find("#Patient_relativeContract_" + i).val();
PatientObject.remark = obj.find("#Patient_remark_" + i).val();

    PatientObject.active_mode = obj.find("#isActive_" + i + "_Patient").val();
    return PatientObject;
}

function Patient_GetAllData() {
    //Insert Patient List
    var Patient = [];
    $('#PatientBody tr').each(function () {
        var i = $(this).find("#rowCount").text();
        var eachPatient = Patient_GetFromForm($(this), i);
        Patient.push(eachPatient);
    });
    return Patient;
}

function Patient_Save(id) {
	//Insert Patient List
	var Patient = Patient_GetAllData();

    var successFunc = function (result) {
        AlertSuccess("ปรับปรุงข้อมูลเรียบร้อยแล้ว");
		endLoad();
    };
	startLoad();
	AjaxPutRequest(apisite + '/api/v1/Patient/UpdateMultiple', Patient, successFunc, AlertDanger);
}

function Patient_Get(id, blankItem) {

	$('#PatientBody').empty();

	var successFunc = function (response) {
    //console.log(response);
		$.each(response, function (i, data) {
			var tag = '<tr>';
            tag += '<td><label id="rowCount">' + (i + 1) + '</label><input type="hidden" id="isActive_' + (i + 1) + '_Patient" value="1" /><input class="form-control" type="hidden" id="Patient_id_' + (i + 1)+'" /></td>';
 tag += '<td><select class="form-control" id="Patient_masterPrefixId_' + (i + 1) +'"></select></td>';
 tag += '<td><input class="form-control" type="text" id="Patient_firstname_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="Patient_lastname_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="Patient_brithDate_' + (i + 1)+'" /></td>';
 tag += '<td><select class="form-control" id="Patient_masterGenderId_' + (i + 1) +'"></select></td>';
 tag += '<td><input class="form-control" type="text" id="Patient_age_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="Patient_height_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="Patient_weight_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="Patient_telephoneNumber_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="Patient_relativeName_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="Patient_relativeContract_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="Patient_remark_' + (i + 1)+'" /></td>';

			tag += '<td><a href="javascript:;" class="btn btn-danger btn-sm" onclick="javascript:Patient_RemovePatient(this)" id="removeBtn"><i class="fa fa-trash-alt" style="color:white;"></i></a><a href="javascript:;" class="btn btn-primary btn-sm" onclick="javascript:Patient_RestorePatient(this)" style="display: none;" id="restoreBtn"><i class="fa fa-upload" style="color:white;"></i></a></td>';
			tag += '</tr>';
			$('#PatientBody').append($(tag));
			Patient_FeedDataToForm(data, (i + 1), blankItem);
		});
        Patient_Summary();
		endLoad();
	};
	startLoad();
	AjaxGetRequest(apisite + "/api/v1/Patient", successFunc, AlertDanger);
			//AjaxGetRequest(apisite + '/api/Patient/GetListBymasterPrefixId/' + a, successFunc, AlertDanger);
		//AjaxGetRequest(apisite + '/api/Patient/GetListBymasterGenderId/' + a, successFunc, AlertDanger);

}

function Patient_Add() {
	var successFunc = function (result) {
		var i = $("#PatientBody tr").length;
		var tag = '<tr>';
		tag += '<td><label id="rowCount">' + (i + 1) + '</label><input type="hidden" id="isActive_' + (i + 1) + '_Patient" value="1" /><input class="form-control" type="hidden" id="Patient_id_' + (i + 1)+'" /></td>';
	 tag += '<td><select class="form-control" id="Patient_masterPrefixId_' + (i + 1) +'"></select></td>';
 tag += '<td><input class="form-control" type="text" id="Patient_firstname_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="Patient_lastname_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="Patient_brithDate_' + (i + 1)+'" /></td>';
 tag += '<td><select class="form-control" id="Patient_masterGenderId_' + (i + 1) +'"></select></td>';
 tag += '<td><input class="form-control" type="text" id="Patient_age_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="Patient_height_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="Patient_weight_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="Patient_telephoneNumber_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="Patient_relativeName_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="Patient_relativeContract_' + (i + 1)+'" /></td>';
 tag += '<td><input class="form-control" type="text" id="Patient_remark_' + (i + 1)+'" /></td>';

		tag += '<td><a href="javascript:;" class="btn btn-danger btn-sm" onclick="javascript:Patient_RemovePatient(this)" id="removeBtn"><i class="fa fa-trash-alt" style="color:white;"></i></a><a href="javascript:;" class="btn btn-primary btn-sm" onclick="javascript:Patient_RestorePatient(this)" style="display: none;" id="restoreBtn"><i class="fa fa-upload" style="color:white;"></i></a></td>';
		tag += '</tr>';
    
		$('#PatientBody').append($(tag));
		Patient_ClearForm(i + 1, result);
		endLoad();
	};
	startLoad();
    AjaxGetRequest(apisite + "/api/v1/Patient/" + "GetBlankItem", successFunc, AlertDanger);
}

function Patient_RemovePatient(e) {
    if (confirm('กรุณากดตกลง เพื่อยืนยันการลบ?')) {
        $(e).closest('tr').find("input,select,textarea").attr('disabled', true);
        $(e).closest('tr').find("input,select,textarea").css({ opacity: '0.5' });
        $(e).hide();
        $(e).closest('tr').find("#restoreBtn").show();
        $(e).closest('tr').find("input").first().val("0");
        console.log($(e).closest('tr').find("input").first().val());
        Patient_Summary();
    }
}

function Patient_RestorePatient(e) {
    if (confirm('กรุณากดตกลง เพื่อยืนยันการกู้คืน?')) {
        $(e).closest('tr').find("input,select,textarea").attr('disabled', false);
        $(e).closest('tr').find("input,select,textarea").css({ opacity: '1' });
        $(e).hide();
        $(e).closest('tr').find("#removeBtn").show();
        $(e).closest('tr').find("input").first().val("1");
        console.log($(e).closest('tr').find("input").first().val());
        Patient_Summary();
    }
}

function Patient_Summary() {
    var sum = 0;
    $(".input_score").each(function () {
        sum += +$(this).val();
    });
    $("#score_label").text("ผลรวม: " + sum);
}

function Patient_InitialForm(id) {
    var successFunc = function (result) {
        Patient_Get(id, result);
        endLoad();
    };
    startLoad();
    AjaxGetRequest(apisite + "/api/v1/Patient/" + "GetBlankItem", successFunc, AlertDanger);
}
