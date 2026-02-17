import React from 'react';
import { ChevronRight } from 'lucide-react';

/**
 * ScriptCard Component - Displays individual script preview
 */
const ScriptCard = ({ script, onClick }) => {
    return (
        <div
            onClick={() => onClick(script)}
            className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-400 transition-all cursor-pointer group flex flex-col h-full"
        >
            <div className="flex justify-between items-start mb-3">
                <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-blue-100">
                    {script.usp}
                </span>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                {script.title}
            </h3>
            <p className="text-slate-500 text-sm mb-4 italic flex-grow">
                "{script.hook}"
            </p>
            <div className="flex items-center text-sm text-blue-600 font-medium">
                Xem kịch bản chi tiết <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
        </div>
    );
};

export default ScriptCard;
