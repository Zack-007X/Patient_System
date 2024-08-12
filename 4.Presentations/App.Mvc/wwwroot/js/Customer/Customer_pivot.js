var Customer_editMode = "CREATE";
var Customer_API = "/api/v1/Customer/";

//================= Search Customizaiton =========================================

function Customer_GetSearchParameter() {
    var CustomerSearchObject = new Object();

    return CustomerSearchObject;
}

//================= Pivot Table =========================================
var CustomerDataPivot = [];

var Customer_setupPivotTable = function (result) {

    CustomerDataPivot = result.map(item => [
        item.name,        item.contactInfo,        item.address,        item.username,        item.password,
        item.counter
    ]);

    CustomerDataPivot.unshift([
        'ชื่อลูกค้า',        'ข้อมูลติดต่อ',        'ที่อยู่',        'ชื่อผู้ใช้งาน',        'รหัสผ่าน',
        "จำนวน"
    ]);

    if (CustomerDataPivot.length > 1) { // If there's more than just the header row
        pivotTable = $("#CustomerPivot").pivotUI(
            CustomerDataPivot,
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



function Customer_InitiatePivotTable() {
    startLoad();
    var p = $.param(Customer_GetSearchParameter());
    AjaxGetRequest(apisite + "/api/v1/Customer/GetListBySearch?" + p, Customer_setupPivotTable, AlertDanger);
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
    saveAs(new Blob([getExcelTableBuffer(wbout)], { type: "application/octet-stream" }), 'Customer.xlsx');
};

//================= Excel Pdf =========================================
function exportPdfFile() {
    const { jsPDF } = window.jspdf;
    const tableElement = document.getElementsByClassName('pvtTable')[0];
    const doc = new jsPDF();

    doc.autoTable({ html: tableElement });
    doc.save("Customer.pdf");
};



