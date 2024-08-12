var Booking_editMode = "CREATE";
var Booking_API = "/api/v1/Booking/";

//================= Search Customizaiton =========================================

function Booking_GetSearchParameter() {
    var BookingSearchObject = new Object();

    return BookingSearchObject;
}

//================= Pivot Table =========================================
var BookingDataPivot = [];

var Booking_setupPivotTable = function (result) {

    BookingDataPivot = result.map(item => [
        item.bookingNumber,        item.customerId_Customer_name,
        item.bookingDate,        item.scheduledRepairDate,        item.estimatedCost,        item.isConfirm,        item.spacecraftName,        item.model,        item.manufacturer,        item.yearOfManufacture,        item.registrationNumber,        item.capacity,        item.spacecraftNotes,        item.bookingNotes,        item.spacecraftImage1,        item.spacecraftImage2,        item.spacecraftImage3,        item.staffId_User_nickname,

        item.counter
    ]);

    BookingDataPivot.unshift([
        'เลขที่การจอง',        'ลูกค้า',        'วันที่จอง',        'วันที่นัดซ่อม',        'ราคาประเมิน หน่วยเป็น EA',        'Confirm แล้ว',        'ชื่อยานอวกาศ',        'รุ่นของยานอวกาศ',        'ผู้ผลิตยานอวกาศ',        'ปีที่ผลิต',        'หมายเลขทะเบียนยานอวกาศ',        'ความจุหรือจำนวนผู้โดยสารที่รองรับได้',        'หมายเหตุเพิ่มเติมเกี่ยวกับยาน',        'หมายเหตุ การ Booking',        'รูปถ่ายยาน 1',        'รูปถ่ายยาน 2',        'รูปถ่ายยาน 3',        'ผู้ดูแลลูกค้า',
        "จำนวน"
    ]);

    if (BookingDataPivot.length > 1) { // If there's more than just the header row
        pivotTable = $("#BookingPivot").pivotUI(
            BookingDataPivot,
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



function Booking_InitiatePivotTable() {
    startLoad();
    var p = $.param(Booking_GetSearchParameter());
    AjaxGetRequest(apisite + "/api/v1/Booking/GetListBySearch?" + p, Booking_setupPivotTable, AlertDanger);
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
    saveAs(new Blob([getExcelTableBuffer(wbout)], { type: "application/octet-stream" }), 'Booking.xlsx');
};

//================= Excel Pdf =========================================
function exportPdfFile() {
    const { jsPDF } = window.jspdf;
    const tableElement = document.getElementsByClassName('pvtTable')[0];
    const doc = new jsPDF();

    doc.autoTable({ html: tableElement });
    doc.save("Booking.pdf");
};



