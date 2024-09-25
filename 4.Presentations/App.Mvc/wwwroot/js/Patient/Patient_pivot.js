var Patient_editMode = "CREATE";
var Patient_API = "/api/v1/Patient/";

//================= Search Customizaiton =========================================

function Patient_GetSearchParameter() {
    var PatientSearchObject = new Object();

    return PatientSearchObject;
}

//================= Pivot Table =========================================
var PatientDataPivot = [];

var Patient_setupPivotTable = function (result) {

    PatientDataPivot = result.map(item => [
        item.masterPrefixId_MasterPrefix_name,
        item.firstname,        item.lastname,        item.brithDate,        item.masterGenderId_MasterGender_name,
        item.age,        item.height,        item.weight,        item.telephoneNumber,        item.relativeName,        item.relativeContract,        item.remark,
        item.counter
    ]);

    PatientDataPivot.unshift([
        'คำนำหน้า',        'ชื่อจริงผู้ใช้',        'นามสกุลผู้ใช้',        'เบอร์โทรศัพท์',        'เพศ',        'อายุ',        'ส่วนสูง',        'น้ำหนัก',        'เบอร์โทรศัพท์ผู้ป่วย',        'ชื่่อญาติที่ติดต่อได้',        'เบอร์โทรศัพท์ญาติที่ติดต่อได้',        'หมายเหตุ',
        "จำนวน"
    ]);

    if (PatientDataPivot.length > 1) { // If there's more than just the header row
        pivotTable = $("#PatientPivot").pivotUI(
            PatientDataPivot,
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



function Patient_InitiatePivotTable() {
    startLoad();
    var p = $.param(Patient_GetSearchParameter());
    AjaxGetRequest(apisite + "/api/v1/Patient/GetListBySearch?" + p, Patient_setupPivotTable, AlertDanger);
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
    saveAs(new Blob([getExcelTableBuffer(wbout)], { type: "application/octet-stream" }), 'Patient.xlsx');
};

//================= Excel Pdf =========================================
function exportPdfFile() {
    const { jsPDF } = window.jspdf;
    const tableElement = document.getElementsByClassName('pvtTable')[0];
    const doc = new jsPDF();

    doc.autoTable({ html: tableElement });
    doc.save("Patient.pdf");
};



