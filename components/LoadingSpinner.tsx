import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-10" role="status" aria-label="Loading">
      <div className="relative h-16 w-16">
        <div className="absolute top-0 left-0 h-full w-full border-4 border-slate-700 rounded-full"></div>
        <div className="absolute top-0 left-0 h-full w-full border-t-4 border-cyan-400 rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
