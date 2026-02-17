# Hướng dẫn Deploy lên GitHub Pages

## Bước 1: Khởi tạo Git Repository

```bash
git init
git add .
git commit -m "Initial commit - MVC structure"
```

## Bước 2: Tạo Repository trên GitHub

1. Vào https://github.com/new
2. Đặt tên repository: `bao-appdemo` (hoặc tên khác)
3. **KHÔNG** chọn "Initialize this repository with a README"
4. Click "Create repository"

## Bước 3: Kết nối với GitHub

```bash
git remote add origin https://github.com/[your-username]/bao-appdemo.git
git branch -M main
git push -u origin main
```

**Lưu ý**: Thay `[your-username]` bằng username GitHub của bạn.

## Bước 4: Cấu hình vite.config.js

Mở file `vite.config.js` và cập nhật dòng `base`:

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/bao-appdemo/', // ← Thay 'bao-appdemo' bằng tên repository của bạn
  // ...
})
```

## Bước 5: Deploy

### Cách 1: Deploy thủ công bằng gh-pages

```bash
npm run build
npm run deploy
```

### Cách 2: Deploy tự động với GitHub Actions (Khuyên dùng)

1. Vào repository trên GitHub
2. Chọn **Settings** → **Pages**
3. Trong **Source**, chọn **GitHub Actions**
4. Push code lên GitHub:

```bash
git add .
git commit -m "Update config for deployment"
git push
```

GitHub Actions sẽ tự động build và deploy khi bạn push code.

## Bước 6: Truy cập Website

Sau khi deploy thành công, website sẽ có tại:

```
https://[your-username].github.io/bao-appdemo/
```

## Cập nhật Website

Mỗi khi bạn muốn cập nhật:

```bash
git add .
git commit -m "Update: mô tả thay đổi"
git push
```

GitHub Actions sẽ tự động deploy phiên bản mới.

## Troubleshooting

### Lỗi: Page không hiển thị

**Giải pháp**: 
1. Kiểm tra `base` trong `vite.config.js` phải khớp với tên repository
2. Chờ vài phút để GitHub Pages build xong
3. Xóa cache trình duyệt và refresh

### Lỗi: 404 Not Found

**Giải pháp**: 
- Đảm bảo đã enable GitHub Pages trong Settings → Pages
- Chọn đúng source là "GitHub Actions"

### Lỗi: CSS không load

**Giải pháp**: 
- Kiểm tra `base` path trong `vite.config.js`
- Build lại: `npm run build`

## Chạy Local để Test

```bash
# Development
npm run dev

# Build production local
npm run build

# Preview production build
npm run preview
```

---

**Chúc bạn deploy thành công!** 🚀
