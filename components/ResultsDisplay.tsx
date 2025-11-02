import React from 'react';
import type { SearchResult } from '../types';
import { LinkIcon } from './Icons';

interface ResultsDisplayProps {
  result: SearchResult;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result }) => {
  // A simple markdown-like formatter
  const formatText = (text: string) => {
    return text
      .split('\n')
      .map((line, index) => {
        if (line.startsWith('### ')) {
          return <h3 key={index} className="text-xl font-semibold mt-4 mb-2 text-cyan-300">{line.substring(4)}</h3>;
        }
        if (line.startsWith('## ')) {
          return <h2 key={index} className="text-2xl font-bold mt-6 mb-3 text-cyan-200">{line.substring(3)}</h2>;
        }
        if (line.startsWith('# ')) {
          return <h1 key={index} className="text-3xl font-bold mt-8 mb-4 text-cyan-100">{line.substring(2)}</h1>;
        }
        if (line.startsWith('* ')) {
          return <li key={index} className="ml-5 list-disc">{line.substring(2)}</li>;
        }
        return <p key={index} className="mb-4">{line}</p>;
      });
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl shadow-2xl p-6 sm:p-8 animate-fade-in">
      <div className="prose prose-invert prose-p:text-slate-300 prose-headings:text-slate-100 max-w-none leading-relaxed">
        {formatText(result.text)}
      </div>

      {result.sources.length > 0 && (
        <div className="mt-8 pt-6 border-t border-slate-700">
          <h3 className="text-lg font-semibold text-slate-300 mb-4 flex items-center gap-2">
            <LinkIcon className="h-5 w-5"/>
            Sources
          </h3>
          <ul className="space-y-3">
            {result.sources.map((source, index) => (
              <li key={index}>
                <a
                  href={source.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <p className="font-medium group-hover:underline truncate">{source.title}</p>
                  <p className="text-sm text-slate-500 truncate">{source.uri}</p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ResultsDisplay;