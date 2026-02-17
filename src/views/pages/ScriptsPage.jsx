import React, { useState, useMemo } from 'react';
import { Smile } from 'lucide-react';
import FilterToolbar from '../components/FilterToolbar';
import ScriptCard from '../components/ScriptCard';
import ScriptDetailModal from '../components/ScriptDetailModal';
import ScriptController from '../../controllers/ScriptController';

/**
 * ScriptsPage - Main page for browsing scripts
 */
const ScriptsPage = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedScript, setSelectedScript] = useState(null);
    const [copied, setCopied] = useState(false);

    // Get categories from controller
    const categories = ScriptController.getCategories();

    // Filter scripts based on category and search
    const filteredScripts = useMemo(() => {
        return ScriptController.getFilteredScripts(activeCategory, searchQuery);
    }, [activeCategory, searchQuery]);

    // Handle category change
    const handleCategoryChange = (categoryId) => {
        setActiveCategory(ScriptController.handleCategoryChange(categoryId));
    };

    // Handle search input
    const handleSearchChange = (query) => {
        setSearchQuery(ScriptController.handleSearchInput(query));
    };

    // Handle script selection
    const handleScriptClick = (script) => {
        setSelectedScript(script);
        setCopied(false);
    };

    // Handle close modal
    const handleCloseModal = () => {
        setSelectedScript(null);
        setCopied(false);
    };

    // Handle copy to clipboard
    const handleCopy = async () => {
        if (!selectedScript) return;

        const result = await ScriptController.copyScriptToClipboard(selectedScript);

        if (result.success) {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <>
            {/* TOOLBAR */}
            <FilterToolbar
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
            />

            {/* GRID KỊCH BẢN */}
            {filteredScripts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredScripts.map(script => (
                        <ScriptCard
                            key={script.id}
                            script={script}
                            onClick={handleScriptClick}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
                    <Smile className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-slate-600">Không tìm thấy ý tưởng phù hợp</h3>
                    <p className="text-slate-400 text-sm">Thử tìm kiếm bằng từ khóa khác xem sao nhé!</p>
                </div>
            )}

            {/* SCRIPT DETAIL MODAL */}
            {selectedScript && (
                <ScriptDetailModal
                    script={selectedScript}
                    onClose={handleCloseModal}
                    onCopy={handleCopy}
                    copied={copied}
                />
            )}
        </>
    );
};

export default ScriptsPage;
