# Kiến trúc MVC - Friso Content Hub

## 📐 Tổng quan Kiến trúc

Ứng dụng được xây dựng theo mô hình **MVC (Model-View-Controller)** để tách biệt rõ ràng giữa dữ liệu, logic nghiệp vụ và giao diện người dùng.

```
┌─────────────────────────────────────────────────┐
│                   USER INPUT                    │
│              (Click, Search, Filter)            │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│                   VIEW LAYER                    │
│            (React Components/JSX)               │
│   - Header.jsx                                  │
│   - FilterToolbar.jsx                           │
│   - ScriptCard.jsx                              │
│   - ScriptDetailModal.jsx                       │
│   - ScriptsPage.jsx                             │
│   - BrandBriefPage.jsx                          │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│               CONTROLLER LAYER                  │
│            (Business Logic Handler)             │
│   - ScriptController.js                         │
│     • getFilteredScripts()                      │
│     • copyScriptToClipboard()                   │
│     • handleCategoryChange()                    │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│                  MODEL LAYER                    │
│              (Data & Business Logic)            │
│   - ScriptModel.js                              │
│     • scriptsData                               │
│     • searchScripts()                           │
│     • formatScriptForCopy()                     │
│   - BrandBriefModel.js                          │
│     • brandBrief                                │
└─────────────────────────────────────────────────┘
```

---

## 🗂️ Chi tiết từng Layer

### 1️⃣ MODEL LAYER (Data & Business Logic)

**Mục đích**: Quản lý dữ liệu và logic nghiệp vụ

**Files**:
- `src/models/ScriptModel.js`
- `src/models/BrandBriefModel.js`

**Trách nhiệm**:
- ✅ Lưu trữ dữ liệu (scripts, categories, brand brief)
- ✅ Xử lý logic nghiệp vụ (search, filter, format)
- ✅ Cung cấp API để truy xuất dữ liệu
- ❌ **KHÔNG** chứa UI code
- ❌ **KHÔNG** biết về React components

**Ví dụ**:
```javascript
// ScriptModel.js
class ScriptModel {
    getAllScripts() {
        return this.scripts;
    }

    searchScripts(query, categoryId) {
        // Business logic for searching
        return filteredResults;
    }
}
```

---

### 2️⃣ CONTROLLER LAYER (Logic Handler)

**Mục đích**: Điều phối giữa View và Model, xử lý user actions

**Files**:
- `src/controllers/ScriptController.js`

**Trách nhiệm**:
- ✅ Nhận input từ View
- ✅ Gọi các method từ Model
- ✅ Xử lý side effects (clipboard, validation)
- ✅ Trả kết quả về cho View
- ❌ **KHÔNG** chứa UI code
- ❌ **KHÔNG** lưu trữ dữ liệu trực tiếp

**Ví dụ**:
```javascript
// ScriptController.js
class ScriptController {
    getFilteredScripts(categoryId, searchQuery) {
        // Gọi Model để lấy data đã filter
        return ScriptModel.searchScripts(searchQuery, categoryId);
    }

    async copyScriptToClipboard(script) {
        // Xử lý clipboard logic
        const text = ScriptModel.formatScriptForCopy(script);
        await navigator.clipboard.writeText(text);
    }
}
```

---

### 3️⃣ VIEW LAYER (Presentation/UI)

**Mục đích**: Hiển thị giao diện và nhận input từ người dùng

**Files**:
- `src/views/components/` - Các component tái sử dụng
- `src/views/pages/` - Các trang chính

**Trách nhiệm**:
- ✅ Render UI (JSX/React components)
- ✅ Nhận user input (click, type, etc.)
- ✅ Gọi Controller khi có user action
- ✅ Hiển thị data từ Controller
- ❌ **KHÔNG** chứa business logic
- ❌ **KHÔNG** truy cập Model trực tiếp

**Ví dụ**:
```javascript
// ScriptsPage.jsx
const ScriptsPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    
    // Gọi Controller để lấy filtered data
    const filteredScripts = useMemo(() => {
        return ScriptController.getFilteredScripts(activeCategory, searchQuery);
    }, [activeCategory, searchQuery]);

    // Handle user action
    const handleCopy = async () => {
        await ScriptController.copyScriptToClipboard(selectedScript);
    };

    return (
        <div>
            {/* Hiển thị UI */}
            {filteredScripts.map(script => ...)}
        </div>
    );
};
```

---

## 🔄 Data Flow (Luồng dữ liệu)

### Ví dụ: User tìm kiếm script

```
1. USER types in search box
         ↓
2. VIEW (FilterToolbar) 
   → onChange event fires
   → calls onSearchChange(query)
         ↓
3. VIEW (ScriptsPage)
   → handleSearchChange(query)
   → updates state: setSearchQuery(query)
         ↓
4. CONTROLLER (ScriptController)
   → getFilteredScripts(categoryId, query)
         ↓
5. MODEL (ScriptModel)
   → searchScripts(query, categoryId)
   → filters data
   → returns filtered array
         ↓
6. VIEW (ScriptsPage)
   → receives filtered data
   → re-renders with new results
         ↓
7. USER sees filtered scripts
```

---

## 📦 Component Structure

### Reusable Components (`src/views/components/`)

```
components/
├── Header.jsx              - Top navigation bar
├── FilterToolbar.jsx       - Category filter + search
├── ScriptCard.jsx          - Script preview card
└── ScriptDetailModal.jsx   - Full script details modal
```

### Page Components (`src/views/pages/`)

```
pages/
├── ScriptsPage.jsx         - Main scripts library page
└── BrandBriefPage.jsx      - Brand brief information page
```

---

## 🎯 Ưu điểm của MVC

### ✅ Separation of Concerns
Mỗi layer có trách nhiệm riêng biệt, không bị lẫn lộn

### ✅ Testability
Dễ dàng test từng layer độc lập:
- Test Model: Business logic
- Test Controller: User action handling
- Test View: UI rendering

### ✅ Maintainability
Dễ bảo trì và mở rộng:
- Thêm feature mới? → Thêm method vào Model/Controller
- Đổi UI? → Chỉ sửa View
- Đổi logic? → Chỉ sửa Controller/Model

### ✅ Scalability
Dễ scale khi dự án lớn:
- Thêm nhiều Models cho các entities khác
- Thêm Controllers cho các features mới
- Tái sử dụng components trong Views

### ✅ Team Collaboration
Nhiều người có thể làm việc song song:
- Backend dev: làm Models + Controllers
- Frontend dev: làm Views
- Designer: focus vào UI trong Views

---

## 🚀 Mở rộng trong Tương lai

### Thêm API Integration

```javascript
// src/services/ApiService.js
class ApiService {
    async fetchScripts() {
        const response = await fetch('/api/scripts');
        return response.json();
    }
}

// Update Model to use API
class ScriptModel {
    async getAllScripts() {
        this.scripts = await ApiService.fetchScripts();
        return this.scripts;
    }
}
```

### Thêm State Management (Redux/Zustand)

```javascript
// src/store/scriptStore.js
const useScriptStore = create((set) => ({
    scripts: [],
    activeCategory: 'all',
    setCategory: (id) => set({ activeCategory: id }),
}));
```

### Thêm Routing (React Router)

```javascript
// App.jsx
<Router>
    <Routes>
        <Route path="/" element={<ScriptsPage />} />
        <Route path="/brief" element={<BrandBriefPage />} />
        <Route path="/script/:id" element={<ScriptDetailPage />} />
    </Routes>
</Router>
```

---

## 📚 Best Practices

### 1. Keep Models Pure
Models chỉ nên chứa data và pure functions (no side effects)

### 2. Controllers Handle Side Effects
Async operations, API calls, clipboard → trong Controllers

### 3. Views Stay Dumb
Components chỉ nhận props và render, delegate logic cho Controllers

### 4. Single Responsibility
Mỗi file/class/function chỉ làm MỘT việc duy nhất

### 5. Composition over Inheritance
Tái sử dụng components thông qua composition, không inheritance

---

**Kiến trúc MVC giúp code sạch hơn, dễ maintain hơn và scale tốt hơn!** 🎉
