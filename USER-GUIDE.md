# 🚀 HƯỚNG DẪN SỬ DỤNG - FRISO CONTENT HUB

## 📖 Mục lục
1. [Giới thiệu](#giới-thiệu)
2. [Chạy ứng dụng Local](#chạy-ứng-dụng-local)
3. [Sử dụng Features](#sử-dụng-features)
4. [Thêm/Sửa Content](#thêmsửa-content)
5. [Deploy lên GitHub](#deploy-lên-github)
6. [Troubleshooting](#troubleshooting)

---

## 🎯 Giới thiệu

**Friso Content Hub** là web app quản lý kịch bản nội dung marketing, được xây dựng theo kiến trúc MVC chuyên nghiệp.

### Tính năng chính:
- 📚 Thư viện kịch bản với 10 ý tưởng content
- 🔍 Tìm kiếm và lọc theo danh mục
- 📋 Copy kịch bản một click
- 📊 Brand Brief với insights & USPs
- 📱 Responsive - chạy mọi thiết bị

---

## 💻 Chạy ứng dụng Local

### Lần đầu setup:

```bash
# 1. Mở terminal tại thư mục project
cd "d:\CODE GAME\bao-appdemo"

# 2. (Đã cài rồi) Cài đặt dependencies
npm install

# 3. Chạy development server
npm run dev
```

### Lần sau:

```bash
# Chỉ cần chạy lệnh này
npm run dev
```

✅ Mở trình duyệt: **http://localhost:3000/bao-appdemo/**

### Dừng server:
Nhấn `Ctrl + C` trong terminal

---

## 🎨 Sử dụng Features

### 1. Xem danh sách kịch bản
- Mặc định hiển thị tất cả 10 kịch bản
- Click vào card để xem chi tiết

### 2. Lọc theo danh mục
Click vào các nút filter:
- **Tất cả Ý tưởng** - Hiển thị tất cả
- **Đề kháng & Miễn dịch** - 3 kịch bản
- **Tiêu hóa & Hấp thu** - 3 kịch bản
- **Minh bạch Nguồn gốc** - 2 kịch bản
- **Giải trí & Đời sống** - 2 kịch bản

### 3. Tìm kiếm
- Gõ từ khóa vào ô search
- Tự động filter theo: Tiêu đề, Hook, USP, Insight

### 4. Xem chi tiết kịch bản
1. Click vào card bất kỳ
2. Modal hiện 3 cột:
   - **Text Overlay** - Chữ trên màn hình
   - **Visual/Hành động** - Mô tả hình ảnh
   - **Audio/Thoại** - Nội dung voiceover

### 5. Copy kịch bản
1. Trong modal, click **Copy Kịch bản**
2. Paste (Ctrl+V) vào bất kỳ đâu
3. Format sẵn, chuẩn cho creator

### 6. Xem Brand Brief
1. Click tab **Brand Brief** trên header
2. Xem:
   - Target audience
   - Consumer insights
   - Product USPs

---

## ✏️ Thêm/Sửa Content

### Thêm kịch bản mới:

**File**: `src/models/ScriptModel.js`

```javascript
// Thêm vào array scriptsData
{
    id: 11,  // ← ID mới
    categoryId: 'immunity',  // hoặc digestion, transparency, funny
    title: 'Tiêu đề kịch bản',
    hook: 'Câu hook thu hút',
    insight: 'Consumer insight',
    usp: 'USP muốn nhấn mạnh',
    scene: 'Loại scene',
    visual: 'Mô tả hình ảnh chi tiết',
    audio: 'Nội dung thoại',
    textOverlay: 'Text hiển thị'
}
```

Lưu file → Refresh trình duyệt → Kịch bản mới xuất hiện!

### Sửa kịch bản hiện có:

1. Mở `src/models/ScriptModel.js`
2. Tìm script theo `id`
3. Sửa nội dung
4. Lưu → Refresh

### Thêm danh mục mới:

**File**: `src/models/ScriptModel.js`

```javascript
// Thêm vào array categories
{
    id: 'category-id',
    name: 'Tên danh mục',
    icon: 'IconName'  // Shield, Activity, QrCode, Smile, Video
}
```

### Sửa Brand Brief:

**File**: `src/models/BrandBriefModel.js`

Sửa trực tiếp object `brandBrief`:
- `target` - Target audience
- `insights` - Array các insights
- `usps` - Array các USPs

---

## 🌐 Deploy lên GitHub

### Bước 1: Tạo GitHub Repository

1. Vào https://github.com/new
2. Đặt tên: `bao-appdemo`
3. Click **Create repository**

### Bước 2: Upload code

```bash
# Mở terminal trong project folder
git init
git add .
git commit -m "Initial commit - Friso Content Hub"

# Thay YOUR_USERNAME bằng username GitHub của bạn
git remote add origin https://github.com/YOUR_USERNAME/bao-appdemo.git
git branch -M main
git push -u origin main
```

### Bước 3: Enable GitHub Pages

1. Vào repository trên GitHub
2. **Settings** → **Pages**
3. Source: Chọn **GitHub Actions**
4. Đợi 2-3 phút

### Bước 4: Truy cập website

```
https://YOUR_USERNAME.github.io/bao-appdemo/
```

🎉 **Done! Website online!**

### Update website sau này:

```bash
# Sau khi sửa code
git add .
git commit -m "Update: mô tả thay đổi"
git push
```

GitHub tự động deploy lại!

📘 **Chi tiết hơn**: Xem file `DEPLOY.md`

---

## 🎨 Tùy chỉnh Giao diện

### Đổi màu chủ đạo:

**File**: `tailwind.config.js`

Thêm custom colors:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#1E40AF',  // Xanh dương
      secondary: '#F59E0B', // Cam
    }
  }
}
```

Dùng trong code: `className="bg-primary"`

### Đổi font chữ:

**File**: `src/styles/index.css`

```css
body {
  font-family: 'Your Font', sans-serif;
}
```

### Thêm animation:

**File**: `tailwind.config.js`

```javascript
keyframes: {
  yourAnimation: {
    '0%': { opacity: 0 },
    '100%': { opacity: 1 }
  }
}
```

---

## 🆘 Troubleshooting

### ❌ Lỗi khi chạy `npm run dev`

**Giải pháp**:
```bash
# Xóa node_modules và cài lại
Remove-Item -Recurse -Force node_modules
npm install
npm run dev
```

### ❌ Không thấy thay đổi sau khi sửa code

**Giải pháp**:
- Hard refresh: `Ctrl + Shift + R`
- Hoặc xóa cache trình duyệt

### ❌ Build bị lỗi

**Giải pháp**:
```bash
# Clean build
Remove-Item -Recurse -Force dist
npm run build
```

### ❌ GitHub Pages không hiển thị

**Kiểm tra**:
1. Settings → Pages đã enable?
2. `vite.config.js` → `base` đúng tên repo?
3. Đợi 5-10 phút cho GitHub deploy

### ❌ CSS không load trên GitHub Pages

**Giải pháp**: 
- Check `base` path trong `vite.config.js`
- Phải match với tên repository

---

## 📁 Cấu trúc File Quan trọng

```
📂 src/
  📂 models/           ← Sửa data ở đây
    - ScriptModel.js   ← Thêm/sửa scripts
    - BrandBriefModel.js ← Sửa brand brief
  
  📂 views/            ← Sửa UI ở đây
    📂 components/     ← Các components
    📂 pages/          ← Các trang
  
  📂 styles/           ← Sửa CSS ở đây
    - index.css
```

---

## 📚 Tài liệu Bổ sung

- **README.md** - Overview project
- **MVC-ARCHITECTURE.md** - Hiểu kiến trúc MVC
- **DEPLOY.md** - Deploy chi tiết
- **GIT-COMMANDS.md** - Git commands
- **CHANGELOG.md** - Lịch sử thay đổi

---

## 💡 Tips & Tricks

### Phím tắt hữu ích:
- `Ctrl + C` - Dừng dev server
- `Ctrl + Shift + R` - Hard refresh browser
- `Ctrl + F` - Tìm trong file

### Best Practices:
- ✅ Commit thường xuyên
- ✅ Test local trước khi push
- ✅ Viết commit message rõ ràng
- ✅ Backup code trước khi sửa lớn

### Workflow hiệu quả:
1. Sửa code
2. Test local (`npm run dev`)
3. Build thử (`npm run build`)
4. Commit & Push
5. Xem kết quả trên GitHub Pages

---

## 🎯 Kết luận

Bạn đã có:
- ✅ Web app MVC chuyên nghiệp
- ✅ Chạy được local và online
- ✅ Dễ thêm/sửa content
- ✅ Tài liệu đầy đủ

**Chúc bạn sử dụng tốt!** 🚀

---

*Need help? Đọc các file .md khác hoặc check GitHub Issues*
