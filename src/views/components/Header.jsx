import React from 'react';
import { Video, BookOpen } from 'lucide-react';

/**
 * Header Component - Top navigation bar
 */
const Header = ({ activeTab, onTabChange }) => {
    return (
        <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center shadow-md">
                            <span className="text-white font-bold text-xl">F</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-500">
                                Friso x eCentric
                            </h1>
                            <p className="text-xs text-slate-500 font-medium tracking-wide">CREATOR CONTENT HUB</p>
                        </div>
                    </div>
                    <div className="flex bg-slate-100 p-1 rounded-lg">
                        <button
                            onClick={() => onTabChange('scripts')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'scripts'
                                    ? 'bg-white shadow-sm text-blue-700'
                                    : 'text-slate-500 hover:text-slate-800'
                                }`}
                        >
                            <Video className="w-4 h-4 inline-block mr-1.5 -mt-0.5" /> Thư viện Kịch bản
                        </button>
                        <button
                            onClick={() => onTabChange('brief')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'brief'
                                    ? 'bg-white shadow-sm text-blue-700'
                                    : 'text-slate-500 hover:text-slate-800'
                                }`}
                        >
                            <BookOpen className="w-4 h-4 inline-block mr-1.5 -mt-0.5" /> Brand Brief
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
