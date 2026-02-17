/**
 * ScriptController - Handles user interactions and coordinates between View and Model
 */

import ScriptModel from '../models/ScriptModel.js';

class ScriptController {
    /**
     * Get filtered scripts based on category and search query
     */
    getFilteredScripts(categoryId, searchQuery) {
        return ScriptModel.searchScripts(searchQuery, categoryId);
    }

    /**
     * Get single script details
     */
    getScriptDetails(scriptId) {
        return ScriptModel.getScriptById(scriptId);
    }

    /**
     * Get all available categories
     */
    getCategories() {
        return ScriptModel.getAllCategories();
    }

    /**
     * Handle script copy to clipboard
     */
    async copyScriptToClipboard(script) {
        const textToCopy = ScriptModel.formatScriptForCopy(script);

        try {
            // Try modern clipboard API
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(textToCopy);
                return { success: true, message: 'Đã copy!' };
            } else {
                // Fallback for older browsers
                return this._fallbackCopy(textToCopy);
            }
        } catch (error) {
            console.error('Copy failed:', error);
            return { success: false, message: 'Lỗi khi copy' };
        }
    }

    /**
     * Fallback copy method for older browsers
     */
    _fallbackCopy(text) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            document.execCommand('copy');
            textArea.remove();
            return { success: true, message: 'Đã copy!' };
        } catch (error) {
            textArea.remove();
            return { success: false, message: 'Lỗi khi copy' };
        }
    }

    /**
     * Handle category change
     */
    handleCategoryChange(categoryId) {
        // Could add analytics or other side effects here
        return categoryId;
    }

    /**
     * Handle search input
     */
    handleSearchInput(query) {
        // Could add debouncing or validation here
        return query.trim();
    }
}

export default new ScriptController();
