var UserHasSpecial_editMode = "CREATE";
var UserHasSpecial_API = "/api/v1/UserHasSpecial/";

//================= Search Customizaiton =========================================

function UserHasSpecial_GetSearchParameter() {
    var UserHasSpecialSearchObject = new Object();

    return UserHasSpecialSearchObject;
}

//================= Pivot Table =========================================
var UserHasSpecialDataPivot = [];

var UserHasSpecial_setupPivotTable = function (result) {

    UserHasSpecialDataPivot = result.map(item => [
        item.masterRoleId_MasterRole_name,
        item.specialSkill,        item.remark,
        item.counter
    ]);

    UserHasSpecialDataPivot.unshift([
        'รหัสกลุ่มผู้ใช้',        'ความเชี่ยวชาญ',        'หมายเหตุ',
        "จำนวน"
    ]);

    if (UserHasSpecialDataPivot.length > 1) { // If there's more than just the header row
        pivotTable = $("#UserHasSpecialPivot").pivotUI(
            UserHasSpecialDataPivot,
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



function UserHasSpecial_InitiatePivotTable() {
    startLoad();
    var p = $.param(UserHasSpecial_GetSearchParameter());
    AjaxGetRequest(apisite + "/api/v1/UserHasSpecial/GetListBySearch?" + p, UserHasSpecial_setupPivotTable, AlertDanger);
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
    saveAs(new Blob([getExcelTableBuffer(wbout)], { type: "application/octet-stream" }), 'UserHasSpecial.xlsx');
};

//================= Excel Pdf =========================================
function exportPdfFile() {
    const { jsPDF } = window.jspdf;
    const tableElement = document.getElementsByClassName('pvtTable')[0];
    const doc = new jsPDF();

    doc.autoTable({ html: tableElement });
    doc.save("UserHasSpecial.pdf");
};



