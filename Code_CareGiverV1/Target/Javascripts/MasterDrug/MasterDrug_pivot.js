var MasterDrug_editMode = "CREATE";
var MasterDrug_API = "/api/v1/MasterDrug/";

//================= Search Customizaiton =========================================

function MasterDrug_GetSearchParameter() {
    var MasterDrugSearchObject = new Object();

    return MasterDrugSearchObject;
}

//================= Pivot Table =========================================
var MasterDrugDataPivot = [];

var MasterDrug_setupPivotTable = function (result) {

    MasterDrugDataPivot = result.map(item => [
        item.code,        item.name,        item.dosage,        item.remark,        item.details,
        item.counter
    ]);

    MasterDrugDataPivot.unshift([
        'เลขสถานะผู้ป่วย',        'สถานะผู้ป่วย',        'ปริมาณ',        'หมายเหตุ',        'รายละเอียดยา',
        "จำนวน"
    ]);

    if (MasterDrugDataPivot.length > 1) { // If there's more than just the header row
        pivotTable = $("#MasterDrugPivot").pivotUI(
            MasterDrugDataPivot,
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



function MasterDrug_InitiatePivotTable() {
    startLoad();
    var p = $.param(MasterDrug_GetSearchParameter());
    AjaxGetRequest(apisite + "/api/v1/MasterDrug/GetListBySearch?" + p, MasterDrug_setupPivotTable, AlertDanger);
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
    saveAs(new Blob([getExcelTableBuffer(wbout)], { type: "application/octet-stream" }), 'MasterDrug.xlsx');
};

//================= Excel Pdf =========================================
function exportPdfFile() {
    const { jsPDF } = window.jspdf;
    const tableElement = document.getElementsByClassName('pvtTable')[0];
    const doc = new jsPDF();

    doc.autoTable({ html: tableElement });
    doc.save("MasterDrug.pdf");
};



