var MasterPosition_editMode = "CREATE";
var MasterPosition_API = "/api/v1/MasterPosition/";

//================= Search Customizaiton =========================================

function MasterPosition_GetSearchParameter() {
    var MasterPositionSearchObject = new Object();

    return MasterPositionSearchObject;
}

//================= Pivot Table =========================================
var MasterPositionDataPivot = [];

var MasterPosition_setupPivotTable = function (result) {

    MasterPositionDataPivot = result.map(item => [
        item.code,        item.name,        item.remark,
        item.counter
    ]);

    MasterPositionDataPivot.unshift([
        'เลขตำแหน่งราชการ',        'ชื่อตำแหน่งราชการ',        'หมายเหตุ',
        "จำนวน"
    ]);

    if (MasterPositionDataPivot.length > 1) { // If there's more than just the header row
        pivotTable = $("#MasterPositionPivot").pivotUI(
            MasterPositionDataPivot,
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



function MasterPosition_InitiatePivotTable() {
    startLoad();
    var p = $.param(MasterPosition_GetSearchParameter());
    AjaxGetRequest(apisite + "/api/v1/MasterPosition/GetListBySearch?" + p, MasterPosition_setupPivotTable, AlertDanger);
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
    saveAs(new Blob([getExcelTableBuffer(wbout)], { type: "application/octet-stream" }), 'MasterPosition.xlsx');
};

//================= Excel Pdf =========================================
function exportPdfFile() {
    const { jsPDF } = window.jspdf;
    const tableElement = document.getElementsByClassName('pvtTable')[0];
    const doc = new jsPDF();

    doc.autoTable({ html: tableElement });
    doc.save("MasterPosition.pdf");
};



