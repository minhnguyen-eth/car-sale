# 🚗 BYD Car Sale Web — Hướng dẫn khởi chạy đầy đủ

Landing page bán xe BYD chuyên nghiệp, dữ liệu từ Google Sheet, deploy GitHub Pages miễn phí.

---

## ✅ Checklist trước khi bắt đầu

- [ ] Đã cài Node.js (https://nodejs.org) — kiểm tra bằng `node -v`
- [ ] Đã cài Git (https://git-scm.com)
- [ ] Có tài khoản GitHub
- [ ] Có tài khoản Google (để dùng Google Sheet + Apps Script)

---

## 🚀 BƯỚC 1 — Chạy project local

```bash
# Cài dependencies
npm install

# Chạy dev server
npm run dev

# Mở trình duyệt → http://localhost:5173
```

Web sẽ chạy với **dữ liệu mẫu** (6 mẫu xe BYD). Không cần cấu hình gì thêm để xem giao diện.

---

## ⚙️ BƯỚC 2 — Tuỳ chỉnh thông tin cơ bản

Mở file `src/config.js` và chỉnh:

```js
export const CONFIG = {
  phone: "0909 123 456",        // ← Số điện thoại showroom của bạn
  phoneRaw: "0909123456",       // ← Số không khoảng cách
  zaloPhone: "0909123456",      // ← Số Zalo
  address: "...",               // ← Địa chỉ showroom
  email: "...",                 // ← Email
  workingHours: "...",          // ← Giờ làm việc
};
```

**Chỉ cần sửa file này, không cần đụng code khác.**

---

## 📊 BƯỚC 3 — Cài Google Sheet + Apps Script (để quản lý xe)

### 3.1 Tạo Google Sheet

1. Vào https://sheets.google.com → Tạo file mới tên **BYD Car Data**
2. Tạo 2 sheet (tab):
   - `Xe` — danh sách xe
   - `Leads` — tự tạo khi có khách hàng gửi form

### 3.2 Cấu hình sheet "Xe"

Dòng **1** là header (chính xác chữ thường, không dấu cách):

| name | category | price | range | power | acceleration | image | badge | badgeColor | description | colors | features |
|------|----------|-------|-------|-------|--------------|-------|-------|------------|-------------|--------|----------|
| BYD ATTO 3 | SUV Điện | Từ 679.000.000 đ | 480 km | 150 kW | 7.3 giây | https://link-anh.jpg | Bán chạy nhất | #e4002b | Mô tả xe... | #1a1a2e,#c0392b | Blade Battery,AWD |

> 💡 Cột **colors**: nhập các mã màu HEX cách nhau bằng dấu phẩy  
> 💡 Cột **features**: nhập tính năng cách nhau bằng dấu phẩy  
> 💡 Cột **image**: link ảnh trực tiếp (Google Drive public link, Imgur, Cloudinary...)  
> 💡 Cột **badge** và **badgeColor**: để trống nếu không muốn hiển thị nhãn

### 3.3 Tạo Apps Script

1. Trong Google Sheet → **Extensions → Apps Script**
2. Xóa hết code mặc định
3. Mở file `google-apps-script.js` trong project, copy toàn bộ và dán vào
4. Bấm **Save** (Ctrl+S)

### 3.4 Deploy Apps Script

1. Bấm **Deploy → New Deployment**
2. Bấm ⚙️ bên cạnh "Select type" → chọn **Web App**
3. Điền:
   - Description: `BYD API v1`
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Bấm **Deploy**
5. Google sẽ yêu cầu **cấp quyền** → nhấn **Authorize** → đăng nhập Google → Allow
6. Copy URL dạng: `https://script.google.com/macros/s/XXXX.../exec`

### 3.5 Điền API URL vào config

Mở `src/config.js`:

```js
CARS_API_URL: "https://script.google.com/macros/s/XXXX.../exec",   // URL vừa copy
LEADS_API_URL: "https://script.google.com/macros/s/XXXX.../exec",  // Cùng 1 URL là được
```

> ⚠️ **Quan trọng**: Cả 2 URL đều dùng cùng 1 App Script URL. Script tự phân biệt GET (lấy xe) và POST (lưu lead).

---

## 📦 BƯỚC 4 — Deploy lên GitHub Pages

### 4.1 Tạo GitHub repo

1. Vào https://github.com/new
2. Tên repo: `car-sale-web` (phải khớp với `base` trong `vite.config.js`)
3. Để Public, không tick README
4. Bấm **Create repository**

> ⚠️ Nếu muốn đổi tên repo, mở `vite.config.js` và sửa:
> ```js
> base: '/tên-repo-của-bạn/',
> ```

### 4.2 Push code lên GitHub

```bash
git init
git add .
git commit -m "first commit: BYD landing page"
git branch -M main
git remote add origin https://github.com/USERNAME/car-sale-web.git
git push -u origin main
```

### 4.3 Bật GitHub Pages

1. Vào repo trên GitHub → **Settings → Pages**
2. Source: chọn **GitHub Actions**
3. GitHub sẽ tự chạy workflow deploy (xem tab **Actions**)
4. Sau ~2 phút, web live tại: `https://USERNAME.github.io/car-sale-web/`

### 4.4 Auto deploy sau này

Mỗi lần push code → GitHub tự động build & deploy. Không cần làm gì thêm.

---

## 🔄 BƯỚC 5 — Cập nhật nội dung (không cần code)

### Thêm/sửa/xóa xe:
1. Mở Google Sheet tab **Xe**
2. Thêm dòng mới hoặc sửa dữ liệu
3. Reload web → tự cập nhật ngay

### Xem lead khách hàng:
1. Mở Google Sheet tab **Leads**
2. Mỗi form khách gửi = 1 dòng mới (có timestamp, tên, SĐT, nhu cầu...)

---

## 🖼️ Thêm ảnh xe

Có 3 cách dùng link ảnh cho cột `image`:

**Cách 1 — Google Drive (khuyên dùng):**
1. Upload ảnh lên Google Drive
2. Right click → Share → Anyone with link → Viewer
3. Copy link ID (phần `1aBc...` trong URL)
4. Dùng: `https://drive.google.com/uc?id=1aBc...`

**Cách 2 — Imgur:**
1. Upload tại https://imgur.com
2. Copy Direct Link (đuôi `.jpg`/`.png`)

**Cách 3 — Unsplash (ảnh mẫu miễn phí):**
`https://images.unsplash.com/photo-ID?w=800&q=80`

---

## 🎨 Tuỳ chỉnh giao diện

| Muốn đổi | Sửa ở đâu |
|-----------|-----------|
| Màu đỏ BYD | `src/index.css` → `--byd-red` |
| Font chữ | `index.html` (Google Fonts) + `src/index.css` |
| Ảnh hero | `src/components/Hero.jsx` → `backgroundImage` |
| Ưu đãi tháng | `src/components/PromoSection.jsx` → mảng `promos` |
| Câu hỏi form | `src/config.js` → `FORM_OPTIONS` |
| Dòng xe trong dropdown form | `src/components/ContactForm.jsx` |

---

## 📁 Cấu trúc project

```
car-sale-web/
├── src/
│   ├── config.js              ← ⭐ File cấu hình chính (SĐT, API URL...)
│   ├── App.jsx                ← Layout tổng thể
│   ├── index.css              ← Style + CSS variables
│   ├── main.jsx               ← Entry point
│   └── components/
│       ├── Navbar.jsx         ← Thanh navigation
│       ├── Hero.jsx           ← Banner đầu trang
│       ├── CarsSection.jsx    ← Danh sách xe (fetch từ API)
│       ├── CarCard.jsx        ← Card từng xe
│       ├── PromoSection.jsx   ← Ưu đãi / khuyến mãi
│       ├── ContactForm.jsx    ← Form đặt lịch → Google Sheet
│       ├── Footer.jsx         ← Footer
│       └── FloatingCTA.jsx    ← Nút Zalo + Gọi nổi
├── google-apps-script.js      ← ⭐ Code dán vào Apps Script
├── vite.config.js             ← Cấu hình build
├── .github/workflows/         ← Auto deploy GitHub Pages
└── README.md                  ← File này
```

---

## ❓ Troubleshoot

**Web hiện dữ liệu mẫu thay vì dữ liệu Sheet?**
→ Kiểm tra `CARS_API_URL` trong `src/config.js` đã điền đúng chưa.

**Form gửi nhưng không thấy trong Sheet?**
→ Kiểm tra `LEADS_API_URL` đúng chưa. Xem Console (F12) có lỗi không.
→ Thử mở API URL trực tiếp trên trình duyệt — nếu hiện JSON là API đang hoạt động.

**GitHub Actions build fail?**
→ Vào tab **Actions** → xem log lỗi.
→ Thường do thiếu file hoặc lỗi syntax JS.

**Web deploy nhưng vào URL bị 404?**
→ Kiểm tra `base` trong `vite.config.js` khớp với tên repo GitHub chưa.

**Ảnh không hiện?**
→ Dùng link ảnh public (không cần đăng nhập để xem).
→ Google Drive link dùng format: `https://drive.google.com/uc?id=FILE_ID`

---

## 📞 Liên hệ hỗ trợ

Nếu gặp vấn đề, liên hệ qua Zalo: **0909 123 456**
