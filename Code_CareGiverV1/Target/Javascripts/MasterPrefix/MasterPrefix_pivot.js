var MasterPrefix_editMode = "CREATE";
var MasterPrefix_API = "/api/v1/MasterPrefix/";

//================= Search Customizaiton =========================================

function MasterPrefix_GetSearchParameter() {
    var MasterPrefixSearchObject = new Object();

    return MasterPrefixSearchObject;
}

//================= Pivot Table =========================================
var MasterPrefixDataPivot = [];

var MasterPrefix_setupPivotTable = function (result) {

    MasterPrefixDataPivot = result.map(item => [
        item.code,        item.name,        item.remark,
        item.counter
    ]);

    MasterPrefixDataPivot.unshift([
        'เลขคำนำหน้า',        'คำนำหน้า',        'หมายเหตุ',
        "จำนวน"
    ]);

    if (MasterPrefixDataPivot.length > 1) { // If there's more than just the header row
        pivotTable = $("#MasterPrefixPivot").pivotUI(
            MasterPrefixDataPivot,
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



function MasterPrefix_InitiatePivotTable() {
    startLoad();
    var p = $.param(MasterPrefix_GetSearchParameter());
    AjaxGetRequest(apisite + "/api/v1/MasterPrefix/GetListBySearch?" + p, MasterPrefix_setupPivotTable, AlertDanger);
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
    saveAs(new Blob([getExcelTableBuffer(wbout)], { type: "application/octet-stream" }), 'MasterPrefix.xlsx');
};

//================= Excel Pdf =========================================
function exportPdfFile() {
    const { jsPDF } = window.jspdf;
    const tableElement = document.getElementsByClassName('pvtTable')[0];
    const doc = new jsPDF();

    doc.autoTable({ html: tableElement });
    doc.save("MasterPrefix.pdf");
};



