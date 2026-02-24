import React from 'react';
import { Video, BookOpen, Sparkles } from 'lucide-react';

/**
 * Header Component - Top navigation bar with AI tab
 */
const Header = ({ activeTab, onTabChange }) => {
    const tabs = [
        { id: 'scripts', label: 'Thư viện Kịch bản', icon: Video },
        { id: 'ai', label: 'AI Generator', icon: Sparkles },
        { id: 'brief', label: 'Brand Brief', icon: BookOpen },
    ];

    return (
        <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-700 to-violet-600 rounded-lg flex items-center justify-center shadow-md">
                            <span className="text-white font-bold text-xl">F</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-violet-600">
                                Friso x eCentric
                            </h1>
                            <p className="text-xs text-slate-500 font-medium tracking-wide">CREATOR CONTENT HUB</p>
                        </div>
                    </div>
                    <div className="flex bg-slate-100 p-1 rounded-lg">
                        {tabs.map(tab => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => onTabChange(tab.id)}
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 relative ${isActive
                                            ? tab.id === 'ai'
                                                ? 'bg-gradient-to-r from-violet-600 to-purple-600 shadow-sm text-white'
                                                : 'bg-white shadow-sm text-blue-700'
                                            : 'text-slate-500 hover:text-slate-800'
                                        }`}
                                >
                                    <Icon className={`w-4 h-4 inline-block mr-1.5 -mt-0.5 ${tab.id === 'ai' && !isActive ? 'text-violet-500' : ''
                                        }`} />
                                    {tab.label}
                                    {tab.id === 'ai' && !isActive && (
                                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-violet-500 rounded-full animate-pulse" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
