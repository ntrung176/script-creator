/**
 * GeminiService - AI Service using Google Gemini API
 * Handles all AI-related operations for script generation and enhancement
 */

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

// Brand context for AI prompts
const BRAND_CONTEXT = `
Bạn là một chuyên gia sáng tạo nội dung (Content Creator) cho thương hiệu sữa Friso Pro.

THÔNG TIN THƯƠNG HIỆU:
- Sản phẩm: Friso Pro - Sữa công thức cao cấp cho trẻ em
- Khách hàng mục tiêu: Phụ huynh trẻ, tầng lớp trung lưu tại thành thị (Hà Nội, TP.HCM). Sẵn sàng chi trả cho sản phẩm cao cấp, an toàn.
- Xuất xứ: Hà Lan (FrieslandCampina)

ĐIỂM BÁN HÀNG ĐỘC NHẤT (USPs):
1. LockNutri (Đạm Mềm): Xử lý nhiệt 1 lần, bảo vệ cấu trúc protein tự nhiên. Giúp dễ tiêu hóa, không gây táo bón/nóng trong.
2. Milk Lipid Complex (MLC): Phức hợp chất béo tự nhiên mô phỏng sữa mẹ. Xây dựng 3 tầng bảo vệ đường ruột, tăng cường miễn dịch.
3. TrackEasy & Foqus: Mã QR dưới đáy lon truy xuất nguồn gốc từ đồng cỏ Hà Lan đến ly sữa. An tâm tuyệt đối.
4. Vị thanh nhạt: Không đường mía (Sucrose), không hương liệu. Bảo vệ men răng và tránh béo phì ảo.

SỰ THẬT NGẦM HIỂU (INSIGHTS):
- Sợ sữa gây 'nóng trong', táo bón, đầy hơi cho bé.
- Bị ám ảnh bởi sữa giả, hàng xách tay trôi nổi.
- Muốn con có đề kháng tốt nhưng lại sợ sữa công thức nhiều dưỡng chất khó tiêu.

DANH MỤC NỘI DUNG:
- immunity: Đề kháng & Miễn dịch
- digestion: Tiêu hóa & Hấp thu
- transparency: Minh bạch Nguồn gốc
- funny: Giải trí & Đời sống
`;

class GeminiService {
    constructor() {
        this.isAvailable = !!GEMINI_API_KEY;
    }

    /**
     * Call Gemini API with a prompt
     */
    async _callGemini(prompt, maxTokens = 2048) {
        if (!this.isAvailable) {
            throw new Error('Gemini API key not configured');
        }

        try {
            const response = await fetch(GEMINI_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: prompt }]
                    }],
                    generationConfig: {
                        temperature: 0.85,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: maxTokens,
                    }
                })
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.error?.message || `API Error: ${response.status}`);
            }

            const data = await response.json();
            const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

            if (!text) {
                throw new Error('No response from Gemini');
            }

            return text;
        } catch (error) {
            console.error('Gemini API Error:', error);
            throw error;
        }
    }

    /**
     * Generate a new script based on user prompt
     */
    async generateScript(userPrompt, categoryId = 'immunity') {
        const prompt = `${BRAND_CONTEXT}

YÊU CẦU: Tạo 1 kịch bản video TikTok/Reels cho Friso Pro dựa trên yêu cầu sau:
"${userPrompt}"

Thuộc danh mục: ${categoryId}

FORMAT OUTPUT (trả về JSON thuần túy, KHÔNG có markdown code block):
{
    "title": "Tiêu đề ngắn gọn hấp dẫn",
    "hook": "Câu hook mở đầu gây tò mò (dưới 15 từ)",
    "insight": "Insight/sự thật ngầm hiểu đằng sau ý tưởng",
    "usp": "USP chính được khai thác",
    "scene": "Loại cảnh quay (VD: Thí nghiệm, Demo, Hài hước...)",
    "visual": "Mô tả chi tiết hình ảnh, hành động từng cảnh",
    "audio": "Lời thoại/voiceover chi tiết",
    "textOverlay": "Text hiển thị trên màn hình"
}

CHÚ Ý:
- Kịch bản phải sáng tạo, viral, phù hợp TikTok/Reels (15-60s)
- Hook phải cực kỳ cuốn hút để người xem không lướt qua
- Giọng văn gần gũi, hài hước, đời thường
- Lồng ghép USP tự nhiên, không quảng cáo lộ liễu
- Trả về JSON hợp lệ, KHÔNG bọc trong markdown code block`;

        const response = await this._callGemini(prompt);
        return this._parseJSON(response);
    }

    /**
     * Generate multiple script ideas
     */
    async generateScriptIdeas(topic, count = 3) {
        const prompt = `${BRAND_CONTEXT}

YÊU CẦU: Tạo ${count} ý tưởng kịch bản video TikTok/Reels cho Friso Pro về chủ đề: "${topic}"

FORMAT OUTPUT (trả về JSON thuần túy, KHÔNG có markdown code block):
[
    {
        "title": "Tiêu đề",
        "hook": "Câu hook",
        "categoryId": "immunity|digestion|transparency|funny",
        "usp": "USP chính",
        "briefDescription": "Mô tả ngắn 2-3 câu về ý tưởng"
    }
]

CHÚ Ý: 
- Mỗi ý tưởng phải khác biệt về góc tiếp cận
- Hook phải viral, gây tò mò
- Đa dạng danh mục
- Trả về JSON hợp lệ, KHÔNG bọc trong markdown code block`;

        const response = await this._callGemini(prompt);
        return this._parseJSON(response);
    }

    /**
     * Enhance/improve an existing script
     */
    async enhanceScript(script, enhanceType = 'improve') {
        const enhancePrompts = {
            improve: 'Cải thiện kịch bản này cho VIRAL hơn, hook mạnh hơn, visual ấn tượng hơn',
            funnier: 'Viết lại kịch bản này theo hướng HÀI HƯỚC hơn, dí dỏm hơn nhưng vẫn giữ thông điệp',
            emotional: 'Viết lại kịch bản này theo hướng CẢM XÚC hơn, chạm đến trái tim bố mẹ',
            shorter: 'Rút gọn kịch bản này cho phù hợp video 15s, giữ hook và thông điệp chính',
            detailed: 'Mở rộng kịch bản này chi tiết hơn, thêm nhiều cảnh quay và lời thoại dài hơn',
        };

        const instruction = enhancePrompts[enhanceType] || enhancePrompts.improve;

        const prompt = `${BRAND_CONTEXT}

KỊCH BẢN HIỆN TẠI:
- Tiêu đề: ${script.title}
- Hook: ${script.hook}
- Insight: ${script.insight}
- USP: ${script.usp}
- Cảnh quay: ${script.scene}
- Visual: ${script.visual}
- Audio: ${script.audio}
- Text Overlay: ${script.textOverlay}

YÊU CẦU: ${instruction}

FORMAT OUTPUT (trả về JSON thuần túy, KHÔNG có markdown code block):
{
    "title": "Tiêu đề mới",
    "hook": "Hook mới",
    "insight": "Insight",
    "usp": "USP",
    "scene": "Loại cảnh",
    "visual": "Visual mới chi tiết",
    "audio": "Audio/thoại mới chi tiết",
    "textOverlay": "Text overlay mới"
}

CHÚ Ý: Trả về JSON hợp lệ, KHÔNG bọc trong markdown code block`;

        const response = await this._callGemini(prompt);
        return this._parseJSON(response);
    }

    /**
     * Chat with AI about brand strategy / content ideas
     */
    async chatAboutContent(message, conversationHistory = []) {
        const historyText = conversationHistory.length > 0
            ? '\n\nLIỊCH SỬ HỘI THOẠI:\n' + conversationHistory.map(m =>
                `${m.role === 'user' ? 'Người dùng' : 'AI'}: ${m.text}`
            ).join('\n')
            : '';

        const prompt = `${BRAND_CONTEXT}
${historyText}

Bạn là trợ lý AI sáng tạo nội dung cho Friso Pro. Hãy trả lời câu hỏi/yêu cầu sau bằng tiếng Việt, ngắn gọn và hữu ích:

"${message}"

Trả lời tự nhiên, thân thiện, không cần format JSON.`;

        return await this._callGemini(prompt, 1024);
    }

    /**
     * Parse JSON from AI response (handles markdown code blocks)
     */
    _parseJSON(text) {
        try {
            // Try direct parse first
            return JSON.parse(text);
        } catch {
            // Try to extract JSON from markdown code block
            const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[1].trim());
            }
            // Try to find JSON array or object in the text
            const bracketMatch = text.match(/[\[{][\s\S]*[\]}]/);
            if (bracketMatch) {
                return JSON.parse(bracketMatch[0]);
            }
            throw new Error('Cannot parse AI response as JSON');
        }
    }
}

export default new GeminiService();
