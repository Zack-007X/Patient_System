var MasterGender_editMode = "CREATE";
var MasterGender_API = "/api/v1/MasterGender/";

//================= Search Customizaiton =========================================

function MasterGender_GetSearchParameter() {
    var MasterGenderSearchObject = new Object();

    return MasterGenderSearchObject;
}

//================= Pivot Table =========================================
var MasterGenderDataPivot = [];

var MasterGender_setupPivotTable = function (result) {

    MasterGenderDataPivot = result.map(item => [
        item.code,        item.name,        item.remark,
        item.counter
    ]);

    MasterGenderDataPivot.unshift([
        'เลขเพศ',        'เพศ',        'หมายเหตุ',
        "จำนวน"
    ]);

    if (MasterGenderDataPivot.length > 1) { // If there's more than just the header row
        pivotTable = $("#MasterGenderPivot").pivotUI(
            MasterGenderDataPivot,
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



function MasterGender_InitiatePivotTable() {
    startLoad();
    var p = $.param(MasterGender_GetSearchParameter());
    AjaxGetRequest(apisite + "/api/v1/MasterGender/GetListBySearch?" + p, MasterGender_setupPivotTable, AlertDanger);
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
    saveAs(new Blob([getExcelTableBuffer(wbout)], { type: "application/octet-stream" }), 'MasterGender.xlsx');
};

//================= Excel Pdf =========================================
function exportPdfFile() {
    const { jsPDF } = window.jspdf;
    const tableElement = document.getElementsByClassName('pvtTable')[0];
    const doc = new jsPDF();

    doc.autoTable({ html: tableElement });
    doc.save("MasterGender.pdf");
};



