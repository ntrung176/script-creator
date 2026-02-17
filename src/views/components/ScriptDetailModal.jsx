import React from 'react';
import { X, Copy, CheckCircle2 } from 'lucide-react';
import { categories } from '../../models/ScriptModel';

/**
 * ScriptDetailModal Component - Shows full script details in a modal
 */
const ScriptDetailModal = ({ script, onClose, onCopy, copied }) => {
    if (!script) return null;

    const category = categories.find(c => c.id === script.categoryId);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
                {/* Header Modal */}
                <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                    <div>
                        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-100 px-2 py-1 rounded-md mb-1 inline-block">
                            {category?.name}
                        </span>
                        <h2 className="text-xl font-bold text-slate-800">{script.title}</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Body Modal - Kịch bản 3 cột */}
                <div className="p-6 overflow-y-auto flex-grow bg-white">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                        <p className="text-sm font-semibold text-yellow-800 mb-1">
                            Góc độ khai thác (USP): <span className="font-normal">{script.usp}</span>
                        </p>
                        <p className="text-sm font-semibold text-yellow-800">
                            Insight: <span className="font-normal">{script.insight}</span>
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
                            <p className="text-slate-700 font-medium whitespace-pre-wrap">{script.textOverlay}</p>
                        </div>

                        {/* Column 2: Visual */}
                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                            <div className="flex items-center text-sm font-bold text-blue-500 mb-3 uppercase tracking-wide">
                                <div className="w-6 h-6 bg-blue-200 rounded text-blue-700 flex items-center justify-center mr-2">V</div>
                                Hình ảnh / Hành động
                            </div>
                            <p className="text-slate-700 text-sm whitespace-pre-wrap leading-relaxed">{script.visual}</p>
                        </div>

                        {/* Column 3: Audio */}
                        <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                            <div className="flex items-center text-sm font-bold text-green-600 mb-3 uppercase tracking-wide">
                                <div className="w-6 h-6 bg-green-200 rounded text-green-700 flex items-center justify-center mr-2">A</div>
                                Thoại / Âm thanh
                            </div>
                            <p className="text-slate-800 text-sm whitespace-pre-wrap leading-relaxed font-medium">"{script.audio}"</p>
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
        </div>
    );
};

export default ScriptDetailModal;
