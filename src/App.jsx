import React, { useState } from 'react';
import Header from './views/components/Header';
import ScriptsPage from './views/pages/ScriptsPage';
import BrandBriefPage from './views/pages/BrandBriefPage';

/**
 * Main App Component - Root of the application
 */
function App() {
    const [activeTab, setActiveTab] = useState('scripts');

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
            <Header activeTab={activeTab} onTabChange={setActiveTab} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {activeTab === 'scripts' ? (
                    <ScriptsPage />
                ) : (
                    <BrandBriefPage />
                )}
            </main>
        </div>
    );
}

export default App;
