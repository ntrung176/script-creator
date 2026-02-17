# Friso Content Hub 🎬

Web application quản lý kịch bản nội dung marketing cho Friso x eCentric, được xây dựng theo kiến trúc MVC.

## 📋 Mô tả

Ứng dụng giúp quản lý và xem các ý tưởng content marketing cho sản phẩm sữa Friso, bao gồm:
- Thư viện kịch bản nội dung phân theo danh mục
- Tìm kiếm và lọc kịch bản
- Xem chi tiết kịch bản với format Text/Visual/Audio
- Brand Brief với thông tin chiến lược

## 🏗️ Cấu trúc MVC

```
bao-appdemo/
├── src/
│   ├── models/              # DATA LAYER - Quản lý dữ liệu
│   │   ├── ScriptModel.js   # Script data & business logic
│   │   └── BrandBriefModel.js # Brand brief data
│   │
│   ├── controllers/         # CONTROLLER LAYER - Xử lý logic
│   │   └── ScriptController.js # Script operations handler
│   │
│   ├── views/               # VIEW LAYER - UI Components
│   │   ├── components/      # Reusable components
│   │   │   ├── Header.jsx
│   │   │   ├── FilterToolbar.jsx
│   │   │   ├── ScriptCard.jsx
│   │   │   └── ScriptDetailModal.jsx
│   │   └── pages/           # Page components
│   │       ├── ScriptsPage.jsx
│   │       └── BrandBriefPage.jsx
│   │
│   ├── styles/              # CSS files
│   │   └── index.css
│   │
│   ├── App.jsx              # Main app component
│   └── main.jsx             # Entry point
│
├── public/                  # Static assets
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🚀 Hướng dẫn Cài đặt

### 1. Clone repository

```bash
git clone https://github.com/[your-username]/bao-appdemo.git
cd bao-appdemo
```

### 2. Cài đặt dependencies

```bash
npm install
```

### 3. Chạy development server

```bash
npm run dev
```

Ứng dụng sẽ chạy tại `http://localhost:3000`

## 📦 Build Production

```bash
npm run build
```

Build output sẽ nằm trong thư mục `dist/`

## 🌐 Deploy lên GitHub Pages

### Bước 1: Cấu hình repository

1. Vào repository settings trên GitHub
2. Chọn **Pages** từ sidebar
3. Trong **Source**, chọn **GitHub Actions**

### Bước 2: Deploy

```bash
npm run deploy
```

Hoặc tự động deploy khi push lên main branch bằng GitHub Actions.

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool & dev server
- **TailwindCSS 3** - Styling
- **Lucide React** - Icons
- **MVC Architecture** - Clean code structure

## 📱 Tính năng

### Thư viện Kịch bản
- ✅ Hiển thị danh sách kịch bản dạng card
- ✅ Lọc theo danh mục (Đề kháng, Tiêu hóa, Minh bạch, Giải trí)
- ✅ Tìm kiếm theo tiêu đề, hook, USP
- ✅ Xem chi tiết kịch bản (Text/Visual/Audio)
- ✅ Copy kịch bản ra clipboard

### Brand Brief
- ✅ Hiển thị target audience
- ✅ Consumer insights
- ✅ Unique Selling Points (USPs)

## 🎨 Kiến trúc MVC

### Model (Data Layer)
- `ScriptModel.js` - Quản lý dữ liệu scripts và business logic
- `BrandBriefModel.js` - Quản lý thông tin brand

### Controller (Logic Layer)
- `ScriptController.js` - Xử lý tương tác người dùng, filter, search, copy

### View (UI Layer)
- **Components**: Header, FilterToolbar, ScriptCard, ScriptDetailModal
- **Pages**: ScriptsPage, BrandBriefPage

## 📝 Scripts

```json
{
  "dev": "vite",                    // Chạy development server
  "build": "vite build",            // Build production
  "preview": "vite preview",        // Preview production build
  "deploy": "gh-pages -d dist"      // Deploy to GitHub Pages
}
```

## 🤝 Contributing

Mọi đóng góp đều được hoan nghênh! Please fork và tạo pull request.

## 📄 License

MIT License

## 👨‍💻 Author

Friso x eCentric Content Team

---

**Made with ❤️ using React + Vite + MVC Architecture**
