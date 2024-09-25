var RoleHasPermission_editMode = "CREATE";
var RoleHasPermission_API = "/api/v1/RoleHasPermission/";

//================= Search Customizaiton =========================================

function RoleHasPermission_GetSearchParameter() {
    var RoleHasPermissionSearchObject = new Object();

    return RoleHasPermissionSearchObject;
}

//================= Pivot Table =========================================
var RoleHasPermissionDataPivot = [];

var RoleHasPermission_setupPivotTable = function (result) {

    RoleHasPermissionDataPivot = result.map(item => [
        item.masterRoleId_MasterRole_name,
        item.masterPermissionId_MasterPermission_name,
        item.create,        item.read,        item.update,        item.delete,        item.remark,
        item.counter
    ]);

    RoleHasPermissionDataPivot.unshift([
        'รหัสกลุ่มผู้ใช้',        'รหัสสิทธิ์การใช้งาน',        'สิทธิ์การเพิ่ม',        'สิทธิ์การอ่าน',        'สิทธิ์การแก้ไข',        'สิทธิ์การลบ',        'หมายเหตุ',
        "จำนวน"
    ]);

    if (RoleHasPermissionDataPivot.length > 1) { // If there's more than just the header row
        pivotTable = $("#RoleHasPermissionPivot").pivotUI(
            RoleHasPermissionDataPivot,
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



function RoleHasPermission_InitiatePivotTable() {
    startLoad();
    var p = $.param(RoleHasPermission_GetSearchParameter());
    AjaxGetRequest(apisite + "/api/v1/RoleHasPermission/GetListBySearch?" + p, RoleHasPermission_setupPivotTable, AlertDanger);
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
    saveAs(new Blob([getExcelTableBuffer(wbout)], { type: "application/octet-stream" }), 'RoleHasPermission.xlsx');
};

//================= Excel Pdf =========================================
function exportPdfFile() {
    const { jsPDF } = window.jspdf;
    const tableElement = document.getElementsByClassName('pvtTable')[0];
    const doc = new jsPDF();

    doc.autoTable({ html: tableElement });
    doc.save("RoleHasPermission.pdf");
};



