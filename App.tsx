import React, { useState, useCallback } from 'react';
import { runSearch } from './services/geminiService';
import type { SearchResult } from './types';
import SearchBar from './components/SearchBar';
import ResultsDisplay from './components/ResultsDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import { MagnifyingGlassIcon } from './components/Icons';

const App: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async () => {
    if (!query.trim()) {
      setError('Please enter a search query.');
      return;
    }

    setIsLoading(true);
    setSearchResult(null);
    setError(null);

    try {
      const result = await runSearch(query);
      setSearchResult(result);
    } catch (err) {
      setError(err instanceof Error ? `An error occurred: ${err.message}` : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <main className="w-full max-w-4xl flex-grow flex flex-col">
        <div className={`transition-all duration-500 ease-in-out ${searchResult || isLoading || error ? 'pt-0' : 'pt-24 sm:pt-32'}`}>
          <div className="text-center mb-8">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-500 inline-flex items-center gap-3">
              <MagnifyingGlassIcon className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14" />
              DB PEEP
            </h1>
            <p className="mt-2 text-slate-400 tracking-widest text-sm uppercase">MADE BY PMB SIAM</p>
          </div>

          <SearchBar
            query={query}
            setQuery={setQuery}
            onSearch={handleSearch}
            isLoading={isLoading}
          />
        </div>

        <div className="mt-8 flex-grow">
          {isLoading && <LoadingSpinner />}
          {error && <div className="text-center text-red-400 bg-red-900/20 p-4 rounded-lg">{error}</div>}
          {searchResult && <ResultsDisplay result={searchResult} />}
          {!isLoading && !error && !searchResult && (
             <div className="text-center text-slate-500 pt-16">
               <p>Enter a query to search the web with Gemini.</p>
             </div>
          )}
        </div>
      </main>
      <footer className="text-center py-4 text-slate-600 text-sm">
        Powered by Google Gemini
      </footer>
    </div>
  );
};

export default App;