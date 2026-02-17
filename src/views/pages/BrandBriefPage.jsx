import React from 'react';
import { BookOpen } from 'lucide-react';
import BrandBriefModel from '../../models/BrandBriefModel';

/**
 * BrandBriefPage - Brand brief information page
 */
const BrandBriefPage = () => {
    const brief = BrandBriefModel.getBrief();

    return (
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                <BookOpen className="w-6 h-6 mr-2 text-blue-600" />
                Tóm tắt Chiến lược (Content Brief)
            </h2>

            <div className="mb-8">
                <h3 className="text-lg font-semibold text-slate-800 mb-3 border-l-4 border-yellow-400 pl-3">
                    Khách hàng Mục tiêu
                </h3>
                <p className="text-slate-600 bg-slate-50 p-4 rounded-lg">{brief.target}</p>
            </div>

            <div className="mb-8">
                <h3 className="text-lg font-semibold text-slate-800 mb-3 border-l-4 border-red-400 pl-3">
                    Sự thật ngầm hiểu (Insights)
                </h3>
                <ul className="space-y-2">
                    {brief.insights.map((insight, idx) => (
                        <li key={idx} className="flex items-start bg-red-50 text-red-800 p-3 rounded-lg text-sm">
                            <span className="font-bold mr-2 mt-0.5">•</span> {insight}
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4 border-l-4 border-blue-600 pl-3">
                    Điểm Bán Hàng Độc Nhất (USPs)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {brief.usps.map((usp, idx) => (
                        <div key={idx} className="border border-slate-200 rounded-xl p-4 hover:border-blue-400 transition-colors">
                            <h4 className="font-bold text-blue-700 mb-2">{usp.title}</h4>
                            <p className="text-sm text-slate-600">{usp.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BrandBriefPage;
