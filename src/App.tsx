import React from 'react';
import { Navbar } from './components/Navbar';
import { DateCalculatorTool } from './components/DateCalculatorTool';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Sarabun',sans-serif]">
      {/* Navigation Header */}
      <Navbar />

      {/* Main Viewport Content: Date Calculator Tool */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <DateCalculatorTool />
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-850/80 py-6 text-xs text-slate-400 text-center no-print">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="text-slate-400">
            เครื่องคำนวณวันยื่นบัญชีทรัพย์สินและหนี้สิน · พ.ร.ป. ป.ป.ช. พ.ศ. ๒๕๖๑
          </div>
          <div className="text-slate-500">
            กรณีวันสิ้นสุดตรงกับวันหยุดทำการ ให้นับวันทำการก่อนวันสิ้นสุด
          </div>
        </div>
      </footer>
    </div>
  );
}
