import React, { useState } from 'react';
import { X, Copy, CheckCircle2, Sparkles, Loader2, Wand2, Smile, Heart, AlignLeft, Maximize, ArrowLeft } from 'lucide-react';
import { categories } from '../../models/ScriptModel';
import GeminiService from '../../services/GeminiService';

/**
 * ScriptDetailModal Component - Shows full script details with AI enhancement
 */
const ScriptDetailModal = ({ script, onClose, onCopy, copied }) => {
    const [isEnhancing, setIsEnhancing] = useState(false);
    const [enhancedScript, setEnhancedScript] = useState(null);
    const [enhanceError, setEnhanceError] = useState('');
    const [showEnhanceMenu, setShowEnhanceMenu] = useState(false);

    if (!script) return null;

    const category = categories.find(c => c.id === script.categoryId);
    const displayScript = enhancedScript || script;

    const enhanceOptions = [
        { id: 'improve', label: 'Viral hơn', icon: Wand2, desc: 'Hook mạnh, visual ấn tượng hơn' },
        { id: 'funnier', label: 'Hài hước hơn', icon: Smile, desc: 'Dí dỏm, giải trí hơn' },
        { id: 'emotional', label: 'Cảm xúc hơn', icon: Heart, desc: 'Chạm đến trái tim bố mẹ' },
        { id: 'shorter', label: 'Rút gọn (15s)', icon: AlignLeft, desc: 'Phù hợp video ngắn' },
        { id: 'detailed', label: 'Chi tiết hơn', icon: Maximize, desc: 'Mở rộng cảnh quay & thoại' },
    ];

    const handleEnhance = async (type) => {
        setShowEnhanceMenu(false);
        setIsEnhancing(true);
        setEnhanceError('');

        try {
            const result = await GeminiService.enhanceScript(script, type);
            setEnhancedScript({ ...result, categoryId: script.categoryId });
        } catch (err) {
            setEnhanceError(err.message || 'Không thể cải thiện. Thử lại nhé!');
        } finally {
            setIsEnhancing(false);
        }
    };

    const handleRevert = () => {
        setEnhancedScript(null);
        setEnhanceError('');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
                {/* Header Modal */}
                <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-100 px-2 py-1 rounded-md inline-block">
                                {category?.name}
                            </span>
                            {enhancedScript && (
                                <span className="text-xs font-bold text-violet-600 uppercase tracking-wider bg-violet-100 px-2 py-1 rounded-md inline-block flex items-center gap-1">
                                    <Sparkles className="w-3 h-3" /> AI Enhanced
                                </span>
                            )}
                        </div>
                        <h2 className="text-xl font-bold text-slate-800">{displayScript.title}</h2>
                    </div>
                    <div className="flex items-center gap-2">
                        {/* AI Enhance Button */}
                        <div className="relative">
                            <button
                                onClick={() => setShowEnhanceMenu(!showEnhanceMenu)}
                                disabled={isEnhancing}
                                className="flex items-center px-3 py-2 rounded-lg text-sm font-medium
                                    bg-gradient-to-r from-violet-500 to-purple-600 text-white
                                    hover:from-violet-600 hover:to-purple-700
                                    disabled:opacity-50 transition-all shadow-sm hover:shadow-md"
                            >
                                {isEnhancing ? (
                                    <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                                ) : (
                                    <Sparkles className="w-4 h-4 mr-1.5" />
                                )}
                                {isEnhancing ? 'Đang xử lý...' : 'AI Enhance'}
                            </button>

                            {/* Enhance Menu Dropdown */}
                            {showEnhanceMenu && (
                                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-fadeIn">
                                    {enhanceOptions.map(opt => {
                                        const Icon = opt.icon;
                                        return (
                                            <button
                                                key={opt.id}
                                                onClick={() => handleEnhance(opt.id)}
                                                className="w-full px-4 py-2.5 flex items-start gap-3 hover:bg-violet-50 transition-colors text-left"
                                            >
                                                <Icon className="w-4 h-4 text-violet-600 mt-0.5 flex-shrink-0" />
                                                <div>
                                                    <p className="text-sm font-medium text-slate-800">{opt.label}</p>
                                                    <p className="text-xs text-slate-500">{opt.desc}</p>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Revert button */}
                        {enhancedScript && (
                            <button
                                onClick={handleRevert}
                                className="flex items-center px-3 py-2 rounded-lg text-sm font-medium
                                    border border-slate-300 text-slate-600
                                    hover:bg-slate-100 transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4 mr-1.5" />
                                Bản gốc
                            </button>
                        )}

                        <button
                            onClick={onClose}
                            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-full transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Body Modal - Kịch bản 3 cột */}
                <div className="p-6 overflow-y-auto flex-grow bg-white">
                    {/* Enhance Error */}
                    {enhanceError && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 text-sm text-red-700">
                            ⚠️ {enhanceError}
                        </div>
                    )}

                    {/* Enhancing Overlay */}
                    {isEnhancing && (
                        <div className="bg-violet-50 border border-violet-200 rounded-xl p-6 mb-4 text-center">
                            <div className="relative w-12 h-12 mx-auto mb-3">
                                <div className="absolute inset-0 bg-violet-200 rounded-full animate-ping opacity-30" />
                                <div className="relative w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-white animate-pulse" />
                                </div>
                            </div>
                            <p className="text-violet-800 font-medium text-sm">AI đang cải thiện kịch bản...</p>
                        </div>
                    )}

                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                        <p className="text-sm font-semibold text-yellow-800 mb-1">
                            Góc độ khai thác (USP): <span className="font-normal">{displayScript.usp}</span>
                        </p>
                        <p className="text-sm font-semibold text-yellow-800">
                            Insight: <span className="font-normal">{displayScript.insight}</span>
                        </p>
                    </div>

                    <h3 className="font-bold text-slate-800 mb-4 border-b pb-2">Chi tiết Kịch bản</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Column 1: Text */}
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <div className="flex items-center text-sm font-bold text-slate-500 mb-3 uppercase tracking-wide">
                                <div className="w-6 h-6 bg-slate-200 rounded text-slate-600 flex items-center justify-center mr-2">T</div>
                                Text Overlay
                            </div>
                            <p className="text-slate-700 font-medium whitespace-pre-wrap">{displayScript.textOverlay}</p>
                        </div>

                        {/* Column 2: Visual */}
                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                            <div className="flex items-center text-sm font-bold text-blue-500 mb-3 uppercase tracking-wide">
                                <div className="w-6 h-6 bg-blue-200 rounded text-blue-700 flex items-center justify-center mr-2">V</div>
                                Hình ảnh / Hành động
                            </div>
                            <p className="text-slate-700 text-sm whitespace-pre-wrap leading-relaxed">{displayScript.visual}</p>
                        </div>

                        {/* Column 3: Audio */}
                        <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                            <div className="flex items-center text-sm font-bold text-green-600 mb-3 uppercase tracking-wide">
                                <div className="w-6 h-6 bg-green-200 rounded text-green-700 flex items-center justify-center mr-2">A</div>
                                Thoại / Âm thanh
                            </div>
                            <p className="text-slate-800 text-sm whitespace-pre-wrap leading-relaxed font-medium">"{displayScript.audio}"</p>
                        </div>
                    </div>
                </div>

                {/* Footer Modal */}
                <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end">
                    <button
                        onClick={onCopy}
                        className={`flex items-center px-6 py-2.5 rounded-lg font-medium transition-all shadow-sm ${copied
                            ? 'bg-green-600 text-white'
                            : 'bg-blue-700 hover:bg-blue-800 text-white'
                            }`}
                    >
                        {copied ? (
                            <><CheckCircle2 className="w-5 h-5 mr-2" /> Đã copy!</>
                        ) : (
                            <><Copy className="w-5 h-5 mr-2" /> Copy Kịch bản</>
                        )}
                    </button>
                </div>
            </div>

            {/* Click outside to close enhance menu */}
            {showEnhanceMenu && (
                <div className="fixed inset-0 z-40" onClick={() => setShowEnhanceMenu(false)} />
            )}
        </div>
    );
};

export default ScriptDetailModal;
