var MasterRole_editMode = "CREATE";
var MasterRole_API = "/api/v1/MasterRole/";

//================= Search Customizaiton =========================================

function MasterRole_GetSearchParameter() {
    var MasterRoleSearchObject = new Object();

    return MasterRoleSearchObject;
}

//================= Pivot Table =========================================
var MasterRoleDataPivot = [];

var MasterRole_setupPivotTable = function (result) {

    MasterRoleDataPivot = result.map(item => [
        item.code,        item.name,        item.remark,
        item.counter
    ]);

    MasterRoleDataPivot.unshift([
        'เลขกลุ่มผู้ใช้',        'ชื่อกลุ่มผู้ใช้',        'หมายเหตุ',
        "จำนวน"
    ]);

    if (MasterRoleDataPivot.length > 1) { // If there's more than just the header row
        pivotTable = $("#MasterRolePivot").pivotUI(
            MasterRoleDataPivot,
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



function MasterRole_InitiatePivotTable() {
    startLoad();
    var p = $.param(MasterRole_GetSearchParameter());
    AjaxGetRequest(apisite + "/api/v1/MasterRole/GetListBySearch?" + p, MasterRole_setupPivotTable, AlertDanger);
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
    saveAs(new Blob([getExcelTableBuffer(wbout)], { type: "application/octet-stream" }), 'MasterRole.xlsx');
};

//================= Excel Pdf =========================================
function exportPdfFile() {
    const { jsPDF } = window.jspdf;
    const tableElement = document.getElementsByClassName('pvtTable')[0];
    const doc = new jsPDF();

    doc.autoTable({ html: tableElement });
    doc.save("MasterRole.pdf");
};



