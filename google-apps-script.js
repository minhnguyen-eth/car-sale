// ============================================================
// 📊 GOOGLE APPS SCRIPT — DÁN CODE NÀY VÀO APPS SCRIPT
// ============================================================
// Hướng dẫn:
// 1. Mở Google Sheet → Extensions → Apps Script
// 2. Xóa hết code cũ, dán code này vào
// 3. Deploy → New Deployment → Web App
// 4. Execute as: Me | Who has access: Anyone
// 5. Copy URL dán vào src/config.js
// ============================================================

// ===== SHEET 1: LẤY DANH SÁCH XE (GET) =====
// Cột trong sheet "Xe" (chính xác):
// name | category | price | range | power | acceleration | image | badge | badgeColor | description | colors | features

// ===== SHEET 2: LƯU LEAD KHÁCH HÀNG (POST) =====
// Sheet "Leads" tự tạo các cột từ form

function doGet(e) {
  const sheetName = e.parameter.sheet || "Xe";
  
  try {
    const sheet = SpreadsheetApp
      .getActiveSpreadsheet()
      .getSheetByName(sheetName);
    
    if (!sheet) {
      return jsonResponse({ error: "Sheet not found: " + sheetName });
    }
    
    const data = sheet.getDataRange().getValues();
    if (data.length < 2) {
      return jsonResponse([]);
    }
    
    const headers = data[0];
    const rows = data.slice(1);
    
    const result = rows
      .filter(row => row.some(cell => cell !== "")) // bỏ dòng trống
      .map(row => {
        let obj = {};
        headers.forEach((header, index) => {
          obj[header] = row[index];
        });
        return obj;
      });
    
    return jsonResponse(result);
    
  } catch (err) {
    return jsonResponse({ error: err.toString() });
  }
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName("Leads");
    
    // Tự tạo sheet Leads nếu chưa có
    if (!sheet) {
      sheet = ss.insertSheet("Leads");
      sheet.appendRow([
        "Thời gian",
        "Họ tên",
        "Điện thoại",
        "Email",
        "Nhu cầu",
        "Ngân sách",
        "Dòng xe",
        "Ghi chú",
        "Nguồn",
      ]);
      
      // Format header
      const headerRange = sheet.getRange(1, 1, 1, 9);
      headerRange.setBackground("#e4002b");
      headerRange.setFontColor("#ffffff");
      headerRange.setFontWeight("bold");
    }
    
    sheet.appendRow([
      data.submittedAt || new Date().toLocaleString("vi-VN"),
      data.name || "",
      data.phone || "",
      data.email || "",
      data.interest || "",
      data.budget || "",
      data.carModel || "",
      data.note || "",
      data.source || "",
    ]);
    
    return jsonResponse({ success: true });
    
  } catch (err) {
    return jsonResponse({ error: err.toString() });
  }
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}


// ============================================================
// 📋 CẤU TRÚC GOOGLE SHEET "Xe" — CỘT CẦN TẠO:
// ============================================================
// name                  → Tên xe (BYD ATTO 3)
// type                  → Loại xe dùng để filter: EV, SEDAN, SUV, MPV, DM-I SUPER HYBRID
// category              → Phân khúc hiển thị (SUV Điện, Sedan Cao Cấp...)
// price                 → Giá hiển thị (Từ 679.000.000 đ)
// variantAdvancedName   → Tên phiên bản 1 (ADVANCED)
// variantAdvancedPrice  → Giá phiên bản 1 (839.000.000 đ)
// variantPremiumName    → Tên phiên bản 2 (PREMIUM)
// variantPremiumPrice   → Giá phiên bản 2 (936.000.000 đ)
// variants              → Dòng các phiên bản tùy chọn, ví dụ ADVANCED:839.000.000, PREMIUM:936.000.000
// images                → Nhiều link ảnh, cách nhau bằng dấu phẩy, dấu chấm phẩy hoặc xuống dòng
// promotion             → Nội dung khuyến mãi hiển thị ngay bên dưới card sản phẩm
// range                 → Tầm xa (480 km)
// power                 → Công suất (150 kW)
// acceleration          → Tăng tốc (7.3 giây)
// battery               → Pin (60 kWh)
// charging              → Sạc (DC 150 kW)
// seats                 → Số chỗ (5 chỗ)
// warranty              → Bảo hành (8 năm / 160.000 km)
// image                 → Link ảnh (https://...)
// badge                 → Nhãn badge (Bán chạy nhất) — để trống nếu không cần
// badgeColor            → Màu badge (#e4002b) — để trống để dùng màu đỏ mặc định
// description           → Mô tả ngắn
// colors                → Các màu xe, cách nhau bằng dấu phẩy (#1a1a2e, #c0392b)
// features              → Tính năng, cách nhau bằng dấu phẩy (Blade Battery, AWD)
// ============================================================
