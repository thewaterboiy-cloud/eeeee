import React from 'react';
import { Calculator } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-30 bg-slate-900 border-b border-slate-800 text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base sm:text-lg font-bold tracking-tight text-white whitespace-nowrap block">
                เครื่องคำนวณวันยื่นบัญชีทรัพย์สิน
              </span>
              <span className="text-[11px] text-slate-400 hidden sm:block whitespace-nowrap">
                Asset Declaration Deadline Calculator (ป.ป.ช.)
              </span>
            </div>
          </div>

          {/* Zone 2: Right indicator */}
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="hidden sm:inline">นับวันทำการก่อนวันสิ้นสุด</span>
            <span className="hidden sm:inline">·</span>
            <span className="bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md font-medium text-[11px]">
              พ.ร.ป. ป.ป.ช. ๒๕๖๑
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
