var TreatmentSchedule_editMode = "CREATE";
var TreatmentSchedule_API = "/api/v1/TreatmentSchedule/";

//================= Search Customizaiton =========================================

function TreatmentSchedule_GetSearchParameter() {
    var TreatmentScheduleSearchObject = new Object();

    return TreatmentScheduleSearchObject;
}

//================= Pivot Table =========================================
var TreatmentScheduleDataPivot = [];

var TreatmentSchedule_setupPivotTable = function (result) {

    TreatmentScheduleDataPivot = result.map(item => [
        item.surveyId_Survey_patientId,
        item.planingTopic,        item.planingDetails,        item.startTreatmentDate,        item.endtartTreatmentDate,        item.CaregiverId_User_username,
        item.TreatmentReportTopic,        item.TreatmentReportDetails,        item.remark,
        item.counter
    ]);

    TreatmentScheduleDataPivot.unshift([
        'รายงานการตรวจ',        'แผน Treatment',        'สถานะ Treatment',        'วันเริ่มต้น Treatment',        'วันสุดท้าย Treatment',        'ผู้ดูแล',        'ผลการ Treatment',        'รายละเอียด ผลการ Treatment',        'หมายเหตุ',
        "จำนวน"
    ]);

    if (TreatmentScheduleDataPivot.length > 1) { // If there's more than just the header row
        pivotTable = $("#TreatmentSchedulePivot").pivotUI(
            TreatmentScheduleDataPivot,
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



function TreatmentSchedule_InitiatePivotTable() {
    startLoad();
    var p = $.param(TreatmentSchedule_GetSearchParameter());
    AjaxGetRequest(apisite + "/api/v1/TreatmentSchedule/GetListBySearch?" + p, TreatmentSchedule_setupPivotTable, AlertDanger);
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
    saveAs(new Blob([getExcelTableBuffer(wbout)], { type: "application/octet-stream" }), 'TreatmentSchedule.xlsx');
};

//================= Excel Pdf =========================================
function exportPdfFile() {
    const { jsPDF } = window.jspdf;
    const tableElement = document.getElementsByClassName('pvtTable')[0];
    const doc = new jsPDF();

    doc.autoTable({ html: tableElement });
    doc.save("TreatmentSchedule.pdf");
};



