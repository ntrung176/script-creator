import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Loader2, Wand2, Lightbulb, MessageSquare, ChevronRight, Copy, CheckCircle2, AlertTriangle } from 'lucide-react';
import GeminiService from '../../services/GeminiService';
import { categories } from '../../models/ScriptModel';

/**
 * AIGeneratorPage - AI Script Generator Page
 * Allows users to generate scripts, brainstorm ideas, and chat with AI
 */
const AIGeneratorPage = () => {
    const [activeMode, setActiveMode] = useState('generate'); // generate | ideas | chat
    const [prompt, setPrompt] = useState('');
    const [categoryId, setCategoryId] = useState('immunity');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Generate mode state
    const [generatedScript, setGeneratedScript] = useState(null);
    const [copied, setCopied] = useState(false);

    // Ideas mode state
    const [ideas, setIdeas] = useState([]);
    const [ideaCount, setIdeaCount] = useState(3);

    // Chat mode state
    const [chatMessages, setChatMessages] = useState([]);
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatMessages]);

    const categoryOptions = categories.filter(c => c.id !== 'all');

    // --- Generate Script ---
    const handleGenerate = async () => {
        if (!prompt.trim()) return;
        setIsLoading(true);
        setError('');
        setGeneratedScript(null);

        try {
            const script = await GeminiService.generateScript(prompt, categoryId);
            setGeneratedScript({ ...script, categoryId });
        } catch (err) {
            setError(err.message || 'Không thể tạo kịch bản. Vui lòng thử lại.');
        } finally {
            setIsLoading(false);
        }
    };

    // --- Generate Ideas ---
    const handleGenerateIdeas = async () => {
        if (!prompt.trim()) return;
        setIsLoading(true);
        setError('');
        setIdeas([]);

        try {
            const result = await GeminiService.generateScriptIdeas(prompt, ideaCount);
            setIdeas(Array.isArray(result) ? result : [result]);
        } catch (err) {
            setError(err.message || 'Không thể tạo ý tưởng. Vui lòng thử lại.');
        } finally {
            setIsLoading(false);
        }
    };

    // --- Chat ---
    const handleChat = async () => {
        if (!prompt.trim()) return;
        const userMessage = prompt.trim();
        setPrompt('');

        const newMessages = [...chatMessages, { role: 'user', text: userMessage }];
        setChatMessages(newMessages);
        setIsLoading(true);
        setError('');

        try {
            const response = await GeminiService.chatAboutContent(userMessage, chatMessages.slice(-10));
            setChatMessages(prev => [...prev, { role: 'ai', text: response }]);
        } catch (err) {
            setError(err.message || 'Lỗi kết nối AI.');
        } finally {
            setIsLoading(false);
        }
    };

    // --- Copy Script ---
    const handleCopy = async () => {
        if (!generatedScript) return;
        const text = `
[AI GỢI Ý - FRISO PRO]
Tiêu đề: ${generatedScript.title}
Hook: ${generatedScript.hook}
USP: ${generatedScript.usp}
Insight: ${generatedScript.insight}
Scene: ${generatedScript.scene}

--- KỊCH BẢN CHI TIẾT ---
1. TEXT OVERLAY: ${generatedScript.textOverlay}
2. VISUAL: ${generatedScript.visual}
3. AUDIO: ${generatedScript.audio}
        `.trim();

        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // fallback
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (activeMode === 'generate') handleGenerate();
        else if (activeMode === 'ideas') handleGenerateIdeas();
        else handleChat();
    };

    const modes = [
        { id: 'generate', label: 'Tạo Kịch bản', icon: Wand2, desc: 'Tạo kịch bản video hoàn chỉnh' },
        { id: 'ideas', label: 'Brainstorm', icon: Lightbulb, desc: 'Gợi ý nhiều ý tưởng' },
        { id: 'chat', label: 'Tư vấn AI', icon: MessageSquare, desc: 'Chat về chiến lược nội dung' },
    ];

    const samplePrompts = {
        generate: [
            'Kịch bản thí nghiệm so sánh sữa gây nóng vs sữa mát',
            'Video review hài hước của bố lần đầu pha sữa',
            'Phản ứng của bé khi uống sữa không đường',
        ],
        ideas: [
            'Ý tưởng video mùa hè cho bé khỏe mạnh',
            'Content về dinh dưỡng cho bé sinh mổ',
            'Series video giải thích khoa học cho phụ huynh',
        ],
        chat: [
            'Xu hướng content sữa trẻ em trên TikTok',
            'Làm sao để hook video hấp dẫn hơn?',
            'So sánh các góc tiếp cận cho USP đạm mềm',
        ],
    };

    return (
        <div className="max-w-5xl mx-auto">
            {/* Mode Selector */}
            <div className="grid grid-cols-3 gap-3 mb-6">
                {modes.map(mode => {
                    const Icon = mode.icon;
                    return (
                        <button
                            key={mode.id}
                            onClick={() => { setActiveMode(mode.id); setError(''); }}
                            className={`relative p-4 rounded-xl border-2 transition-all duration-300 text-left group ${activeMode === mode.id
                                    ? 'border-violet-500 bg-gradient-to-br from-violet-50 to-purple-50 shadow-lg shadow-violet-100'
                                    : 'border-slate-200 bg-white hover:border-violet-300 hover:shadow-md'
                                }`}
                        >
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 transition-colors ${activeMode === mode.id
                                    ? 'bg-violet-600 text-white'
                                    : 'bg-slate-100 text-slate-500 group-hover:bg-violet-100 group-hover:text-violet-600'
                                }`}>
                                <Icon className="w-5 h-5" />
                            </div>
                            <h3 className={`font-bold text-sm ${activeMode === mode.id ? 'text-violet-800' : 'text-slate-700'}`}>
                                {mode.label}
                            </h3>
                            <p className="text-xs text-slate-500 mt-0.5">{mode.desc}</p>
                            {activeMode === mode.id && (
                                <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-violet-500 rounded-full animate-pulse" />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Input Area */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">
                <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-5 h-5 text-violet-600" />
                        <h2 className="font-bold text-slate-800">
                            {activeMode === 'generate' ? 'Mô tả kịch bản bạn muốn tạo' :
                                activeMode === 'ideas' ? 'Nhập chủ đề để brainstorm' :
                                    'Hỏi AI về chiến lược content'}
                        </h2>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="flex gap-3">
                            <textarea
                                value={prompt}
                                onChange={e => setPrompt(e.target.value)}
                                placeholder={
                                    activeMode === 'generate' ? 'VD: Kịch bản thí nghiệm so sánh độ tan của sữa...' :
                                        activeMode === 'ideas' ? 'VD: Video viral cho mùa hè...' :
                                            'VD: Làm sao để content organic không bị nhàm chán?'
                                }
                                rows={2}
                                className="flex-1 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none transition-shadow"
                                onKeyDown={e => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSubmit(e);
                                    }
                                }}
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !prompt.trim()}
                                className="self-end px-5 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-medium
                                    hover:from-violet-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed
                                    transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center gap-2"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <Send className="w-5 h-5" />
                                )}
                            </button>
                        </div>

                        {/* Category & Count selector for generate/ideas */}
                        {(activeMode === 'generate' || activeMode === 'ideas') && (
                            <div className="flex gap-3 mt-3 flex-wrap items-center">
                                <select
                                    value={categoryId}
                                    onChange={e => setCategoryId(e.target.value)}
                                    className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-violet-400"
                                >
                                    {categoryOptions.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                                {activeMode === 'ideas' && (
                                    <select
                                        value={ideaCount}
                                        onChange={e => setIdeaCount(Number(e.target.value))}
                                        className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-violet-400"
                                    >
                                        <option value={2}>2 ý tưởng</option>
                                        <option value={3}>3 ý tưởng</option>
                                        <option value={5}>5 ý tưởng</option>
                                    </select>
                                )}
                            </div>
                        )}
                    </form>

                    {/* Sample Prompts */}
                    <div className="mt-3 flex gap-2 flex-wrap">
                        <span className="text-xs text-slate-400">Gợi ý:</span>
                        {samplePrompts[activeMode].map((sp, i) => (
                            <button
                                key={i}
                                onClick={() => setPrompt(sp)}
                                className="text-xs bg-slate-50 border border-slate-200 text-slate-600 px-2.5 py-1 rounded-full
                                    hover:bg-violet-50 hover:border-violet-300 hover:text-violet-700 transition-colors"
                            >
                                {sp}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Error */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3 animate-shake">
                    <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-red-800 text-sm font-medium">Lỗi</p>
                        <p className="text-red-600 text-sm mt-0.5">{error}</p>
                    </div>
                </div>
            )}

            {/* Loading */}
            {isLoading && (
                <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center mb-6">
                    <div className="relative w-16 h-16 mx-auto mb-4">
                        <div className="absolute inset-0 bg-violet-200 rounded-full animate-ping opacity-30" />
                        <div className="relative w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center">
                            <Sparkles className="w-7 h-7 text-white animate-pulse" />
                        </div>
                    </div>
                    <p className="text-slate-600 font-medium">AI đang sáng tạo...</p>
                    <p className="text-slate-400 text-sm mt-1">Gemini đang xử lý yêu cầu của bạn</p>
                </div>
            )}

            {/* === RESULTS === */}

            {/* Generate Mode - Script Result */}
            {activeMode === 'generate' && generatedScript && !isLoading && (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-fadeIn">
                    <div className="px-6 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white flex justify-between items-center">
                        <div>
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-5 h-5" />
                                <span className="text-xs font-medium opacity-80 uppercase tracking-wider">AI Generated</span>
                            </div>
                            <h3 className="text-xl font-bold mt-1">{generatedScript.title}</h3>
                        </div>
                        <button
                            onClick={handleCopy}
                            className={`flex items-center px-4 py-2 rounded-lg font-medium text-sm transition-all ${copied
                                    ? 'bg-green-500 text-white'
                                    : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                                }`}
                        >
                            {copied ? <><CheckCircle2 className="w-4 h-4 mr-1.5" /> Đã copy!</> : <><Copy className="w-4 h-4 mr-1.5" /> Copy</>}
                        </button>
                    </div>

                    <div className="p-6">
                        {/* Hook & Meta */}
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-5">
                            <p className="text-amber-800 font-bold text-lg italic">"{generatedScript.hook}"</p>
                            <div className="flex gap-4 mt-3 text-sm">
                                <span className="text-amber-700"><strong>USP:</strong> {generatedScript.usp}</span>
                                <span className="text-amber-700"><strong>Scene:</strong> {generatedScript.scene}</span>
                            </div>
                        </div>

                        <p className="text-sm text-slate-600 mb-5">
                            <strong className="text-slate-700">Insight:</strong> {generatedScript.insight}
                        </p>

                        {/* 3-column layout */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <div className="flex items-center text-sm font-bold text-slate-500 mb-3 uppercase tracking-wide">
                                    <div className="w-6 h-6 bg-slate-200 rounded text-slate-600 flex items-center justify-center mr-2">T</div>
                                    Text Overlay
                                </div>
                                <p className="text-slate-700 font-medium whitespace-pre-wrap">{generatedScript.textOverlay}</p>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                                <div className="flex items-center text-sm font-bold text-blue-500 mb-3 uppercase tracking-wide">
                                    <div className="w-6 h-6 bg-blue-200 rounded text-blue-700 flex items-center justify-center mr-2">V</div>
                                    Hình ảnh / Hành động
                                </div>
                                <p className="text-slate-700 text-sm whitespace-pre-wrap leading-relaxed">{generatedScript.visual}</p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                                <div className="flex items-center text-sm font-bold text-green-600 mb-3 uppercase tracking-wide">
                                    <div className="w-6 h-6 bg-green-200 rounded text-green-700 flex items-center justify-center mr-2">A</div>
                                    Thoại / Âm thanh
                                </div>
                                <p className="text-slate-800 text-sm whitespace-pre-wrap leading-relaxed font-medium">"{generatedScript.audio}"</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Ideas Mode - Results */}
            {activeMode === 'ideas' && ideas.length > 0 && !isLoading && (
                <div className="space-y-4 animate-fadeIn">
                    <h3 className="font-bold text-slate-700 flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-amber-500" />
                        {ideas.length} Ý tưởng được gợi ý
                    </h3>
                    {ideas.map((idea, idx) => (
                        <div key={idx} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow group">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="bg-violet-100 text-violet-700 text-xs font-bold px-2 py-0.5 rounded-md">
                                            #{idx + 1}
                                        </span>
                                        <span className="bg-blue-50 text-blue-600 text-xs font-medium px-2 py-0.5 rounded-full border border-blue-100">
                                            {idea.usp}
                                        </span>
                                        <span className="bg-slate-100 text-slate-500 text-xs px-2 py-0.5 rounded-full">
                                            {categories.find(c => c.id === idea.categoryId)?.name || idea.categoryId}
                                        </span>
                                    </div>
                                    <h4 className="font-bold text-slate-800 text-lg">{idea.title}</h4>
                                    <p className="text-sm text-violet-700 italic mt-1">"{idea.hook}"</p>
                                    <p className="text-sm text-slate-600 mt-2">{idea.briefDescription}</p>
                                </div>
                                <button
                                    onClick={() => {
                                        setActiveMode('generate');
                                        setPrompt(idea.title + ': ' + idea.briefDescription);
                                        setCategoryId(idea.categoryId || 'immunity');
                                    }}
                                    className="flex-shrink-0 ml-4 p-2.5 rounded-lg border border-slate-200 text-slate-400
                                        hover:border-violet-400 hover:text-violet-600 hover:bg-violet-50 transition-all
                                        opacity-0 group-hover:opacity-100"
                                    title="Tạo kịch bản từ ý tưởng này"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Chat Mode - Messages */}
            {activeMode === 'chat' && chatMessages.length > 0 && (
                <div className="space-y-4 animate-fadeIn">
                    {chatMessages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-2xl px-5 py-3 ${msg.role === 'user'
                                    ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-br-md'
                                    : 'bg-white border border-slate-200 text-slate-700 rounded-bl-md shadow-sm'
                                }`}>
                                {msg.role === 'ai' && (
                                    <div className="flex items-center gap-1.5 mb-1.5">
                                        <Sparkles className="w-3.5 h-3.5 text-violet-500" />
                                        <span className="text-xs font-bold text-violet-600">Gemini AI</span>
                                    </div>
                                )}
                                <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-md px-5 py-3 shadow-sm">
                                <div className="flex gap-1.5">
                                    <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>
            )}
        </div>
    );
};

export default AIGeneratorPage;
