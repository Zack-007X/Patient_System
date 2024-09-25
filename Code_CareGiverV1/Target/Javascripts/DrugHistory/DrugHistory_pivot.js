var DrugHistory_editMode = "CREATE";
var DrugHistory_API = "/api/v1/DrugHistory/";

//================= Search Customizaiton =========================================

function DrugHistory_GetSearchParameter() {
    var DrugHistorySearchObject = new Object();

    return DrugHistorySearchObject;
}

//================= Pivot Table =========================================
var DrugHistoryDataPivot = [];

var DrugHistory_setupPivotTable = function (result) {

    DrugHistoryDataPivot = result.map(item => [
        item.masterDrugID_MasterDrug_name,
        item.treatmentScheduleId_TreatmentSchedule_planingTopic,
        item.amount,        item.remark,
        item.counter
    ]);

    DrugHistoryDataPivot.unshift([
        'ยา',        'รายการการ Treatment',        'จำนวนยา',        'หมายเหตุ',
        "จำนวน"
    ]);

    if (DrugHistoryDataPivot.length > 1) { // If there's more than just the header row
        pivotTable = $("#DrugHistoryPivot").pivotUI(
            DrugHistoryDataPivot,
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



function DrugHistory_InitiatePivotTable() {
    startLoad();
    var p = $.param(DrugHistory_GetSearchParameter());
    AjaxGetRequest(apisite + "/api/v1/DrugHistory/GetListBySearch?" + p, DrugHistory_setupPivotTable, AlertDanger);
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
    saveAs(new Blob([getExcelTableBuffer(wbout)], { type: "application/octet-stream" }), 'DrugHistory.xlsx');
};

//================= Excel Pdf =========================================
function exportPdfFile() {
    const { jsPDF } = window.jspdf;
    const tableElement = document.getElementsByClassName('pvtTable')[0];
    const doc = new jsPDF();

    doc.autoTable({ html: tableElement });
    doc.save("DrugHistory.pdf");
};



