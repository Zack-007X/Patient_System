var MasterPatientState_editMode = "CREATE";
var MasterPatientState_API = "/api/v1/MasterPatientState/";

//================= Search Customizaiton =========================================

function MasterPatientState_GetSearchParameter() {
    var MasterPatientStateSearchObject = new Object();

    return MasterPatientStateSearchObject;
}

//================= Pivot Table =========================================
var MasterPatientStateDataPivot = [];

var MasterPatientState_setupPivotTable = function (result) {

    MasterPatientStateDataPivot = result.map(item => [
        item.code,        item.name,        item.remark,
        item.counter
    ]);

    MasterPatientStateDataPivot.unshift([
        'เลขสถานะผู้ป่วย',        'สถานะผู้ป่วย',        'หมายเหตุ',
        "จำนวน"
    ]);

    if (MasterPatientStateDataPivot.length > 1) { // If there's more than just the header row
        pivotTable = $("#MasterPatientStatePivot").pivotUI(
            MasterPatientStateDataPivot,
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



function MasterPatientState_InitiatePivotTable() {
    startLoad();
    var p = $.param(MasterPatientState_GetSearchParameter());
    AjaxGetRequest(apisite + "/api/v1/MasterPatientState/GetListBySearch?" + p, MasterPatientState_setupPivotTable, AlertDanger);
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
    saveAs(new Blob([getExcelTableBuffer(wbout)], { type: "application/octet-stream" }), 'MasterPatientState.xlsx');
};

//================= Excel Pdf =========================================
function exportPdfFile() {
    const { jsPDF } = window.jspdf;
    const tableElement = document.getElementsByClassName('pvtTable')[0];
    const doc = new jsPDF();

    doc.autoTable({ html: tableElement });
    doc.save("MasterPatientState.pdf");
};



