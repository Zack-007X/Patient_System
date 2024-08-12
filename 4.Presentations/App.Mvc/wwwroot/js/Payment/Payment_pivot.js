var Payment_editMode = "CREATE";
var Payment_API = "/api/v1/Payment/";

//================= Search Customizaiton =========================================

function Payment_GetSearchParameter() {
    var PaymentSearchObject = new Object();

    return PaymentSearchObject;
}

//================= Pivot Table =========================================
var PaymentDataPivot = [];

var Payment_setupPivotTable = function (result) {

    PaymentDataPivot = result.map(item => [
        item.repairId_Repair_repairCode,
        item.amountEA,        item.documentCode,        item.paymentMethod,        item.exchangeItems,        item.paymentDate,        item.paymentNote,
        item.counter
    ]);

    PaymentDataPivot.unshift([
        'เอกสารซ่อม',        'จำนวนเงินที่ชำระเป็นหน่วย EA',        'เลขที่ใบชำระเงิน',        'วิธีชำระเงิน',        'รายการสิ่งของที่ใช้ในการแลกเปลี่ยน',        'วันที่ชำระ',        'หมายเหตุการชำระ',
        "จำนวน"
    ]);

    if (PaymentDataPivot.length > 1) { // If there's more than just the header row
        pivotTable = $("#PaymentPivot").pivotUI(
            PaymentDataPivot,
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



function Payment_InitiatePivotTable() {
    startLoad();
    var p = $.param(Payment_GetSearchParameter());
    AjaxGetRequest(apisite + "/api/v1/Payment/GetListBySearch?" + p, Payment_setupPivotTable, AlertDanger);
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
    saveAs(new Blob([getExcelTableBuffer(wbout)], { type: "application/octet-stream" }), 'Payment.xlsx');
};

//================= Excel Pdf =========================================
function exportPdfFile() {
    const { jsPDF } = window.jspdf;
    const tableElement = document.getElementsByClassName('pvtTable')[0];
    const doc = new jsPDF();

    doc.autoTable({ html: tableElement });
    doc.save("Payment.pdf");
};



