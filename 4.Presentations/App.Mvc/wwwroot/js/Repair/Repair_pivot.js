var Repair_editMode = "CREATE";
var Repair_API = "/api/v1/Repair/";

//================= Search Customizaiton =========================================

function Repair_GetSearchParameter() {
    var RepairSearchObject = new Object();

    return RepairSearchObject;
}

//================= Pivot Table =========================================
var RepairDataPivot = [];

var Repair_setupPivotTable = function (result) {

    RepairDataPivot = result.map(item => [
        item.bookingId_Booking_bookingNumber,
        item.repairCode,        item.technicianId_User_nickname,
        item.startDate,        item.endDate,        item.totalCostEA,        item.repairNote,
        item.counter
    ]);

    RepairDataPivot.unshift([
        'Booking',        'เลขที่การซ่อม',        'ช่างซ่อม',        'วันที่เริ่มซ่อม',        'วันที่ซ่อมเสร็จ',        'มูลค่าการซ่อมเป็นหน่วย EA',        'หมายเหตุการซ่อม',
        "จำนวน"
    ]);

    if (RepairDataPivot.length > 1) { // If there's more than just the header row
        pivotTable = $("#RepairPivot").pivotUI(
            RepairDataPivot,
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



function Repair_InitiatePivotTable() {
    startLoad();
    var p = $.param(Repair_GetSearchParameter());
    AjaxGetRequest(apisite + "/api/v1/Repair/GetListBySearch?" + p, Repair_setupPivotTable, AlertDanger);
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
    saveAs(new Blob([getExcelTableBuffer(wbout)], { type: "application/octet-stream" }), 'Repair.xlsx');
};

//================= Excel Pdf =========================================
function exportPdfFile() {
    const { jsPDF } = window.jspdf;
    const tableElement = document.getElementsByClassName('pvtTable')[0];
    const doc = new jsPDF();

    doc.autoTable({ html: tableElement });
    doc.save("Repair.pdf");
};



