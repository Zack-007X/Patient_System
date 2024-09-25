var Survey_editMode = "CREATE";
var Survey_API = "/api/v1/Survey/";

//================= Search Customizaiton =========================================

function Survey_GetSearchParameter() {
    var SurveySearchObject = new Object();

    return SurveySearchObject;
}

//================= Pivot Table =========================================
var SurveyDataPivot = [];

var Survey_setupPivotTable = function (result) {

    SurveyDataPivot = result.map(item => [
        item.patientId_Patient_firstname,
        item.doctorId_User_username,
        item.masterPatientStateId_MasterPatientState_name,
        item.BloodPressure,        item.OxygenLevel,        item.HeartRate,        item.SurveyDate,        item.SurveyDetail,        item.remark,
        item.counter
    ]);

    SurveyDataPivot.unshift([
        'ผู้ป่วย',        'หมอที่ทำการตรวจ',        'สถานะคนไข้',        'ความดันโลหิต',        'ระดับเลือด',        'อัตราการเต้นของหัวใจ',        'วันที่ทำการตรวจ',        'รายละเอียดการตรวจ',        'หมายเหตุ',
        "จำนวน"
    ]);

    if (SurveyDataPivot.length > 1) { // If there's more than just the header row
        pivotTable = $("#SurveyPivot").pivotUI(
            SurveyDataPivot,
            {
                vals: ["จำนวน"],
                aggregatorName: "Integer Sum"
            }
        );
    } else {
        console.log("The provided data is empty or null.");
    }
    endLoad();
}



function Survey_InitiatePivotTable() {
    startLoad();
    var p = $.param(Survey_GetSearchParameter());
    AjaxGetRequest(apisite + "/api/v1/Survey/GetListBySearch?" + p, Survey_setupPivotTable, AlertDanger);
}

//================= Excel Export =========================================
function getExcelTableBuffer(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}

function exportExcelFile() {
    var tableElement = document.getElementsByClassName('pvtTable')[0];
    var wb = XLSX.utils.table_to_book(tableElement, { sheet: "data" });
    var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
    saveAs(new Blob([getExcelTableBuffer(wbout)], { type: "application/octet-stream" }), 'Survey.xlsx');
};

//================= Excel Pdf =========================================
function exportPdfFile() {
    const { jsPDF } = window.jspdf;
    const tableElement = document.getElementsByClassName('pvtTable')[0];
    const doc = new jsPDF();

    doc.autoTable({ html: tableElement });
    doc.save("Survey.pdf");
};



