import React from 'react';
import { Search, Shield, Activity, QrCode, Smile, Video } from 'lucide-react';

// Icon mapping
const iconMap = {
    'Video': Video,
    'Shield': Shield,
    'Activity': Activity,
    'QrCode': QrCode,
    'Smile': Smile,
};

/**
 * FilterToolbar Component - Category filters and search
 */
const FilterToolbar = ({ categories, activeCategory, onCategoryChange, searchQuery, onSearchChange }) => {
    return (
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
            <div className="flex flex-wrap gap-2">
                {categories.map(cat => {
                    const Icon = iconMap[cat.icon] || Video;
                    return (
                        <button
                            key={cat.id}
                            onClick={() => onCategoryChange(cat.id)}
                            className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat.id
                                    ? 'bg-blue-700 text-white shadow-md'
                                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:border-blue-300'
                                }`}
                        >
                            <Icon className="w-4 h-4 mr-2" />
                            {cat.name}
                        </button>
                    );
                })}
            </div>
            <div className="relative w-full md:w-72">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                    type="text"
                    placeholder="Tìm ý tưởng, USP..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
            </div>
        </div>
    );
};

export default FilterToolbar;
