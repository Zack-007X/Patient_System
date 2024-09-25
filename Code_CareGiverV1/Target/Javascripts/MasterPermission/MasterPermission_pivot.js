var MasterPermission_editMode = "CREATE";
var MasterPermission_API = "/api/v1/MasterPermission/";

//================= Search Customizaiton =========================================

function MasterPermission_GetSearchParameter() {
    var MasterPermissionSearchObject = new Object();

    return MasterPermissionSearchObject;
}

//================= Pivot Table =========================================
var MasterPermissionDataPivot = [];

var MasterPermission_setupPivotTable = function (result) {

    MasterPermissionDataPivot = result.map(item => [
        item.code,        item.name,        item.remark,
        item.counter
    ]);

    MasterPermissionDataPivot.unshift([
        'เลขสิทธิ์การใช้งาน',        'ชื่อสิทธิ์การใช้งาน',        'หมายเหตุ',
        "จำนวน"
    ]);

    if (MasterPermissionDataPivot.length > 1) { // If there's more than just the header row
        pivotTable = $("#MasterPermissionPivot").pivotUI(
            MasterPermissionDataPivot,
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



function MasterPermission_InitiatePivotTable() {
    startLoad();
    var p = $.param(MasterPermission_GetSearchParameter());
    AjaxGetRequest(apisite + "/api/v1/MasterPermission/GetListBySearch?" + p, MasterPermission_setupPivotTable, AlertDanger);
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
    saveAs(new Blob([getExcelTableBuffer(wbout)], { type: "application/octet-stream" }), 'MasterPermission.xlsx');
};

//================= Excel Pdf =========================================
function exportPdfFile() {
    const { jsPDF } = window.jspdf;
    const tableElement = document.getElementsByClassName('pvtTable')[0];
    const doc = new jsPDF();

    doc.autoTable({ html: tableElement });
    doc.save("MasterPermission.pdf");
};



