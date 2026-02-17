/**
 * ScriptModel - Data Model for Script Management
 * Contains all business logic and data related to scripts
 */

// Categories configuration
export const categories = [
    { id: 'all', name: 'Tất cả Ý tưởng', icon: 'Video' },
    { id: 'immunity', name: 'Đề kháng & Miễn dịch', icon: 'Shield' },
    { id: 'digestion', name: 'Tiêu hóa & Hấp thu', icon: 'Activity' },
    { id: 'transparency', name: 'Minh bạch Nguồn gốc', icon: 'QrCode' },
    { id: 'funny', name: 'Giải trí & Đời sống', icon: 'Smile' },
];

// Scripts data
export const scriptsData = [
    // --- ĐỀ KHÁNG ---
    {
        id: 1,
        categoryId: 'immunity',
        title: 'Quả bóng nước (Thí nghiệm)',
        hook: 'Đề kháng của con mong manh thế này sao?',
        insight: 'Hình ảnh ẩn dụ giúp mẹ hiểu sự mỏng manh của hệ miễn dịch nếu không được bảo vệ.',
        usp: 'Milk Lipid Complex - 3 Tầng bảo vệ',
        scene: 'Thí nghiệm thực tế',
        visual: 'Chọc kim vào quả bóng nước mỏng -> Nổ BÙM. Chuyển cảnh sang quả bóng có dán băng dính -> Chọc không nổ.',
        audio: 'Đề kháng của con cũng mong manh như quả bóng này, sơ hở là "vỡ trận". Mẹ cần gia cố ngay bằng lớp màng Milk Lipid Complex. Có lớp bảo vệ, tác nhân xấu (vi khuẩn) chào thua!',
        textOverlay: 'Đề kháng mong manh? -> Gia cố ngay!'
    },
    {
        id: 2,
        categoryId: 'immunity',
        title: 'Bé sinh mổ & Khoảng trống',
        hook: 'Giá như mẹ sinh thường được...',
        insight: 'Mẹ sinh mổ thường có tâm lý áy náy vì con lỡ mất nguồn lợi khuẩn tự nhiên. Friso giúp bù đắp.',
        usp: 'Milk Lipid Complex',
        scene: 'Tâm sự của mẹ',
        visual: 'Cảnh 1: Mẹ ngồi nhìn tấm ảnh siêu âm hoặc vết sẹo mổ, mặt hơi buồn.\nCảnh 2: Mẹ pha sữa Friso Pro, hơi ấm bốc lên. Đồ họa: Lớp màng ánh sáng bao quanh bụng bé.',
        audio: 'Mẹ: Nhiều lúc nhìn con ốm vặt, mẹ lại thấy có lỗi... Nhưng mẹ không để con thiệt thòi đâu. Mẹ chọn Friso Pro vì có Milk Lipid Complex, lớp màng bảo vệ tự nhiên bù đắp đề kháng cho bé sinh mổ.',
        textOverlay: 'Friso Pro - Bù đắp đề kháng cho bé sinh mổ.'
    },
    {
        id: 3,
        categoryId: 'immunity',
        title: '70% Bí mật ở bụng',
        hook: 'Mẹ chăm kỹ nhưng quên mất 70% đề kháng nằm ở đâu?',
        insight: 'Giáo dục mẹ rằng hệ tiêu hóa là gốc rễ của hệ miễn dịch.',
        usp: 'Đề kháng đường ruột',
        scene: 'Giải thích kiến thức',
        visual: 'Dùng son/màu vẽ con số 70% thật to lên bụng tròn của bé.',
        audio: 'Mẹ chăm con kỹ từ đầu đến chân nhưng quên mất 70% đề kháng nằm ở đây! (Chỉ vào bụng). Muốn con ít sụt sịt, phải chăm cái bụng trước tiên.',
        textOverlay: '70% Đề kháng ở đâu?'
    },

    // --- TIÊU HÓA ---
    {
        id: 4,
        categoryId: 'digestion',
        title: 'Trứng luộc vs Trứng lòng đào',
        hook: 'Mẹ chọn đạm cứng hay đạm mềm cho bụng con?',
        insight: 'Ẩn dụ về tác hại của nhiệt độ cao làm biến tính đạm sữa, gây táo bón.',
        usp: 'Công nghệ LockNutri - Đạm mềm tự nhiên',
        scene: 'Visual Demo',
        visual: 'Bóp nát quả trứng luộc (cứng, vụn) vs Chọc quả trứng lòng đào (mềm, chảy). Đặt lon Friso Pro cạnh quả lòng đào.',
        audio: 'Mẹ muốn bụng con phải vất vả xử lý đạm cứng hay thảnh thơi với đạm mềm? Friso Pro dùng nhiệt thấp giữ đạm mềm như lòng đào, tiêu hóa cực nhanh.',
        textOverlay: 'Đạm cứng 🆚 Đạm mềm'
    },
    {
        id: 5,
        categoryId: 'digestion',
        title: 'Soi Output (Phân Dê)',
        hook: 'Output của con lổn nhổn như thế này?',
        insight: 'Nỗi ám ảnh của mẹ khi con đi vệ sinh khó khăn. Sữa mát giúp phân mềm.',
        usp: 'Đạm mềm dễ tiêu hóa',
        scene: 'Hài hước / Relatable',
        visual: 'Tay mẹ bóp những viên đất sét nhỏ lổn nhổn, cứng ngắc. Đổi cảnh: Emoji cục "vàng" cười tươi.',
        audio: 'Đầu ra lổn nhổn như "phân dê" là con đang thiếu nước và đạm sữa bị khô cứng đấy. Nạp ngay Friso Pro, đạm mềm giúp output thành khuôn vàng ươm đẹp như mơ.',
        textOverlay: 'Tạm biệt "phân dê"!'
    },
    {
        id: 6,
        categoryId: 'digestion',
        title: 'Thử thách độ tan 3 giây',
        hook: 'Pha sữa không cần thìa khuấy?',
        insight: 'Sữa tan nhanh chứng tỏ đạm nhỏ, tự nhiên, không vón cục.',
        usp: 'LockNutri',
        scene: 'Demo sản phẩm',
        visual: 'Cận cảnh thìa bột sữa đổ vào nước ấm. Không cần thìa, mẹ chỉ lắc nhẹ cổ tay. Đáy bình trong veo.',
        audio: '1... 2... 3... Tan sạch sành sanh! Không một hạt cặn. Chỉ có công nghệ LockNutri bảo vệ đạm mềm nhỏ mới tan nhanh thế này. Vào bụng con hấp thu cũng lẹ.',
        textOverlay: 'Tan nhanh = Dễ tiêu 💧'
    },

    // --- MINH BẠCH / NGUỒN GỐC ---
    {
        id: 7,
        categoryId: 'transparency',
        title: 'Điệp vụ soi sữa (TrackEasy)',
        hook: 'Mua sữa vớ phải hàng giả thì "tăng xông" chứ đề kháng gì!',
        insight: 'Nỗi sợ sữa giả mạo, trôi nổi ảnh hưởng sức khỏe con.',
        usp: 'Công nghệ TrackEasy quét mã QR',
        scene: 'Hài hước / Điệp viên',
        visual: 'Mẹ đeo kính râm, cầm kính lúp soi lon sữa. Lật đáy lon quét mã TrackEasy. Màn hình hiện bản đồ Hà Lan.',
        audio: 'Bắt quả tang nhé! Em này sinh ra tại Hà Lan, bay máy bay về Việt Nam ngày... tháng... năm... Minh bạch thế này ai làm giả được. Chỉ Friso chính hãng mới có!',
        textOverlay: 'Soi nguồn gốc sữa 🕵️‍♀️'
    },
    {
        id: 8,
        categoryId: 'transparency',
        title: 'Thử thách dụ kiến (No Sucrose)',
        hook: 'Sữa nhạt toẹt mà lại tốt?',
        insight: 'Sữa nhiều đường gây sâu răng, béo phì. Friso không chứa đường mía.',
        usp: 'Vị thanh nhạt, Không đường mía (Sucrose)',
        scene: 'Thí nghiệm thực tế',
        visual: 'Nhỏ 1 giọt sữa đặc và 1 giọt Friso Pro ra bàn. Tua nhanh: Kiến bu đen giọt sữa đặc, bỏ qua Friso.',
        audio: 'Kiến nó mê ngọt lắm, sữa kia nhiều đường mía nên bu đầy. Friso Pro vị thanh nhạt tự nhiên, không đường mía nên kiến "chê". Nhưng chê thế này mới tốt cho men răng của con!',
        textOverlay: 'Không đường mía (Sucrose)'
    },

    // --- GIẢI TRÍ / ĐỜI SỐNG ---
    {
        id: 9,
        categoryId: 'funny',
        title: 'Khi Bố pha sữa lúc 3h sáng',
        hook: 'Đang ngủ ngon mà phải dậy pha sữa đã cáu...',
        insight: 'Nỗi khổ pha sữa đêm vón cục, tắc núm ty làm con khóc ré lên.',
        usp: 'Dễ hòa tan, Không bọt',
        scene: 'Góc nhìn của Bố (Dad POV)',
        visual: 'Bố đầu tóc bù xù cầm bình sữa lắc điên cuồng (loại cũ). Sau đó đổi sang lon Friso, lắc nhẹ 1 cái, con mút êm ru ngủ lại.',
        audio: 'Gặp quả sữa lắc mãi không tan, tắc núm ty đúng là trầm cảm! May vợ đổi sang Friso Pro, lắc nhẹ tan ngay, không bọt. Con uống 1 mạch ngủ luôn, bố cũng được ngủ tiếp. Duyệt!',
        textOverlay: 'Ác mộng 3h sáng 🥱'
    },
    {
        id: 10,
        categoryId: 'funny',
        title: 'Ví rỗng nhưng vui',
        hook: 'Friso đắt hơn loại cũ, xót ví phết!',
        insight: 'Định vị cao cấp, giá cao nhưng tiết kiệm tiền thuốc men đường dài.',
        usp: 'Đầu tư sức khỏe toàn diện',
        scene: 'Biến hình / Hài hước',
        visual: 'Cảnh 1: Mẹ xem giá nhăn mặt, mở ví lép kẹp.\nCảnh 2: Mẹ ném đống thuốc men, men tiêu hóa đi. Bỏ tiền vào lợn đất.',
        audio: 'Công nhận lúc mua xót ví phết. Nhưng ngẫm lại: Tiền thuốc men, đi khám, mẹ nghỉ làm chăm con ốm... tốn gấp mấy lần. Đầu tư lon này con khỏe, cả tháng không tốn viên thuốc nào. Tính ra lại siêu tiết kiệm!',
        textOverlay: 'Lỗ hay Lãi? 💸'
    }
];

/**
 * ScriptModel class - Business logic for script operations
 */
class ScriptModel {
    constructor() {
        this.scripts = scriptsData;
        this.categories = categories;
    }

    // Get all scripts
    getAllScripts() {
        return this.scripts;
    }

    // Get script by ID
    getScriptById(id) {
        return this.scripts.find(script => script.id === id);
    }

    // Filter scripts by category
    getScriptsByCategory(categoryId) {
        if (categoryId === 'all') {
            return this.scripts;
        }
        return this.scripts.filter(script => script.categoryId === categoryId);
    }

    // Search scripts
    searchScripts(query, categoryId = 'all') {
        const lowerQuery = query.toLowerCase();
        let filtered = this.scripts;

        // Filter by category first
        if (categoryId !== 'all') {
            filtered = filtered.filter(script => script.categoryId === categoryId);
        }

        // Then filter by search query
        if (query) {
            filtered = filtered.filter(script =>
                script.title.toLowerCase().includes(lowerQuery) ||
                script.hook.toLowerCase().includes(lowerQuery) ||
                script.usp.toLowerCase().includes(lowerQuery) ||
                script.insight.toLowerCase().includes(lowerQuery)
            );
        }

        return filtered;
    }

    // Get all categories
    getAllCategories() {
        return this.categories;
    }

    // Get category by ID
    getCategoryById(id) {
        return this.categories.find(cat => cat.id === id);
    }

    // Format script for clipboard
    formatScriptForCopy(script) {
        return `
[GÓC Ý TƯỞNG - FRISO PRO]
Tiêu đề: ${script.title}
Góc độ (USP): ${script.usp}
Insight: ${script.insight}

--- KỊCH BẢN CHI TIẾT ---
1. TEXT TRÊN MÀN HÌNH (Overlay):
${script.textOverlay}

2. HÌNH ẢNH (Visual / Hành động):
${script.visual}

3. ÂM THANH (Thoại / Voiceover):
${script.audio}
        `.trim();
    }
}

export default new ScriptModel();
