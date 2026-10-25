import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  Copy, 
  Check, 
  Printer, 
  RotateCcw,
  Info,
  CalendarDays,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { 
  calculateDeclarationDeadline, 
  formatThaiDateFull, 
  formatThaiDate, 
  getDaysRemaining, 
  getDeadlineUrgency,
  calculate3YearAnniversary,
  THAI_DAYS
} from '../utils/dateCalculations';
import { DeclarationType } from '../types';

export const DateCalculatorTool: React.FC = () => {
  // Helper to format today's date
  const todayStr = useMemo(() => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }, []);

  const [eventDate, setEventDate] = useState<string>(todayStr);
  const [declarationType, setDeclarationType] = useState<DeclarationType>('take_office');
  const [customDays, setCustomDays] = useState<number>(60);
  const [isExtended, setIsExtended] = useState<boolean>(false);
  const [extensionDays, setExtensionDays] = useState<number>(30);
  const [rollMode, setRollMode] = useState<'preceding' | 'next'>('preceding');
  const [copied, setCopied] = useState<boolean>(false);

  // 3-Year Helper state: date of original appointment to calculate 3 years anniversary
  const [appointmentDate, setAppointmentDate] = useState<string>('');
  const [show3YearHelper, setShow3YearHelper] = useState<boolean>(false);

  // Calculate results
  const calculation = useMemo(() => {
    return calculateDeclarationDeadline(
      eventDate, 
      customDays, 
      isExtended ? extensionDays : 0,
      rollMode
    );
  }, [eventDate, customDays, isExtended, extensionDays, rollMode]);

  const daysRemaining = useMemo(() => {
    return getDaysRemaining(calculation.deadlineString);
  }, [calculation.deadlineString]);

  const urgency = useMemo(() => {
    return getDeadlineUrgency(calculation.deadlineString, false);
  }, [calculation.deadlineString]);

  // Compute next day (Day 1)
  const startCountDate = useMemo(() => {
    if (!eventDate) return null;
    const [y, m, d] = eventDate.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    date.setDate(date.getDate() + 1);
    return date;
  }, [eventDate]);

  // Helper to calculate exactly 3 years from appointment date
  const handleCalculate3YearsFromStart = (startDateStr: string, minusOneDay: boolean = false) => {
    if (!startDateStr) return;
    const computed3YearDate = calculate3YearAnniversary(startDateStr, minusOneDay);
    if (computed3YearDate) {
      setEventDate(computed3YearDate);
    }
  };

  // When appointmentDate changes, auto-update 3-year completion date if in every_3years mode
  const handleAppointmentDateChange = (newAppointmentDate: string) => {
    setAppointmentDate(newAppointmentDate);
    if (newAppointmentDate) {
      const computed = calculate3YearAnniversary(newAppointmentDate, false);
      if (computed) {
        setEventDate(computed);
      }
    }
  };

  // Presets
  const setQuickPreset = (offsetDays: number) => {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    setEventDate(`${y}-${m}-${day}`);
  };

  // Preset appointment 3 years ago
  const setAppointment3YearsAgo = () => {
    const d = new Date();
    const y = d.getFullYear() - 3;
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const dateStr = `${y}-${m}-${day}`;
    handleAppointmentDateChange(dateStr);
  };

  const handleReset = () => {
    setEventDate(todayStr);
    setDeclarationType('take_office');
    setCustomDays(60);
    setIsExtended(false);
    setRollMode('preceding');
    setShow3YearHelper(true);
    setAppointmentDate('');
  };

  // Declaration Type Thai Name
  const declarationTypeName = useMemo(() => {
    switch (declarationType) {
      case 'take_office': return 'เข้ารับตำแหน่ง (ภายใน ๖๐ วัน)';
      case 'vacate_office': return 'พ้นจากตำแหน่ง (ภายใน ๖๐ วัน)';
      case 'vacate_1year': return 'พ้นจากตำแหน่งมาแล้วครบ ๑ ปี (ภายใน ๖๐ วัน)';
      case 'every_3years': return `วันที่มีหน้าที่ยื่นครบ ๓ ปี (ดำรงตำแหน่งครบ ๓ ปี - ภายใน ${customDays} วัน)`;
      default: return `กำหนดเฉพาะ (${customDays} วัน)`;
    }
  }, [declarationType, customDays]);

  // Copy Summary text for official memo / notes
  const holidayDetail = calculation.holidayName 
    ? ` (ตรงกับวันหยุดนักขัตฤกษ์: ${calculation.holidayName})` 
    : calculation.isRawWeekend 
    ? ' (ตรงกับวันหยุดเสาร์-อาทิตย์)' 
    : '';

  const summaryText = `[สรุปผลการคำนวณกำหนดเวลายื่นบัญชีทรัพย์สินและหนี้สิน]
ประเภทการยื่น: ${declarationTypeName}
${declarationType === 'every_3years' && appointmentDate ? `วันที่เข้ารับตำแหน่งเดิม: ${formatThaiDateFull(appointmentDate)}\n` : ''}${declarationType === 'every_3years' ? 'วันที่มีหน้าที่ยื่นครบ ๓ ปี' : 'วันที่เริ่มมีหน้าที่'}: ${formatThaiDateFull(eventDate)}
วันเริ่มนับวันแรก (วันถัดไป): ${formatThaiDateFull(startCountDate || eventDate)}
ระยะเวลาตามกฎหมาย: ${customDays} วัน ${isExtended ? `+ ขอขยายเวลา ๓๐ วัน (รวม ${customDays + extensionDays} วัน)` : ''}
วันครบกำหนดเดิม: ${formatThaiDateFull(calculation.rawDate)} (วัน${THAI_DAYS[calculation.rawDate.getDay()]})${holidayDetail}
${calculation.wasPostponed 
  ? `* หมายเหตุวันหยุด: วันสิ้นสุดเดิมตรงกับวันหยุดทำการ (${calculation.holidayName ? `วันหยุดนักขัตฤกษ์: ${calculation.holidayName}` : 'วันหยุดเสาร์-อาทิตย์'}) ให้นับวันทำการก่อนวันสิ้นสุด เลื่อนขึ้นมาเป็นวัน${THAI_DAYS[calculation.adjustedDate.getDay()]}ที่ ${formatThaiDateFull(calculation.adjustedDate)}`
  : '* วันสิ้นสุดตรงกับวันทำการปกติของราชการ'}
วันหมดเขตยื่นบัญชีทรัพย์สิน (วันสุดท้าย): ${formatThaiDateFull(calculation.deadlineString)} (วัน${THAI_DAYS[calculation.adjustedDate.getDay()]})
สถานะปัจจุบัน: ${urgency.label}`;

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-6">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                เครื่องคำนวณวันและกำหนดเวลายื่นบัญชีทรัพย์สิน
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                คำนวณวันครบกำหนด ๖๐ วัน / ๙๐ วัน กรณีตรงกับวันหยุดราชการ ให้นับวันทำการก่อนวันสิ้นสุด
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={handleReset}
              className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
              title="รีเซ็ตค่าเป็นค่าเริ่มต้น"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>รีเซ็ต</span>
            </button>
            <div className="text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 font-medium">
              พ.ร.ป. ป.ป.ช. ๒๕๖๑
            </div>
          </div>
        </div>

        {/* Input Parameters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column: Input Form */}
          <div className="space-y-4">
            {/* Step 1: Declaration Type */}
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                ๑. เลือกประเภทการยื่นบัญชี
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setDeclarationType('take_office');
                    setCustomDays(60);
                  }}
                  className={`p-3 text-left rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                    declarationType === 'take_office'
                      ? 'border-blue-600 bg-blue-50/80 text-blue-900 shadow-xs ring-1 ring-blue-600/20'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="font-bold">เข้ารับตำแหน่ง</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">ภายใน ๖๐ วัน</div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setDeclarationType('vacate_office');
                    setCustomDays(60);
                  }}
                  className={`p-3 text-left rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                    declarationType === 'vacate_office'
                      ? 'border-blue-600 bg-blue-50/80 text-blue-900 shadow-xs ring-1 ring-blue-600/20'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="font-bold">พ้นจากตำแหน่ง</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">ภายใน ๖๐ วัน</div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setDeclarationType('vacate_1year');
                    setCustomDays(60);
                  }}
                  className={`p-3 text-left rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                    declarationType === 'vacate_1year'
                      ? 'border-blue-600 bg-blue-50/80 text-blue-900 shadow-xs ring-1 ring-blue-600/20'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="font-bold">พ้นตำแหน่งครบ ๑ ปี</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">ภายใน ๖๐ วัน (เฉพาะ ผบช./การเมือง)</div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setDeclarationType('every_3years');
                    setCustomDays(30);
                    if (!appointmentDate) {
                      const d = new Date();
                      const y = d.getFullYear() - 3;
                      const m = String(d.getMonth() + 1).padStart(2, '0');
                      const day = String(d.getDate()).padStart(2, '0');
                      const defaultStart = `${y}-${m}-${day}`;
                      setAppointmentDate(defaultStart);
                      const computed = calculate3YearAnniversary(defaultStart, false);
                      if (computed) setEventDate(computed);
                    }
                  }}
                  className={`p-3 text-left rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                    declarationType === 'every_3years'
                      ? 'border-blue-600 bg-blue-50/90 text-blue-950 shadow-xs ring-2 ring-blue-600/30'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="font-bold flex items-center justify-between text-blue-950">
                    <span>วันที่มีหน้าที่ยื่นครบ ๓ ปี</span>
                    <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded font-mono font-semibold">
                      ครบ ๓ ปี
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">ดำรงตำแหน่งครบ ๓ ปีติดต่อกัน (ภายใน ๓๐ หรือ ๖๐ วัน)</div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setDeclarationType('annual');
                  }}
                  className={`p-3 text-left rounded-xl border text-xs sm:text-sm font-medium transition-all sm:col-span-2 ${
                    declarationType === 'annual'
                      ? 'border-blue-600 bg-blue-50/80 text-blue-900 shadow-xs ring-1 ring-blue-600/20'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="font-bold">กำหนดเฉพาะ / อื่นๆ</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">ระบุจำนวนวันตามประกาศหรือระเบียบหน่วยงาน</div>
                </button>
              </div>
            </div>

            {/* Step 2: Date Inputs & 3-Year Calculator Section */}
            {declarationType === 'every_3years' ? (
              /* Dedicated 3-Year Section */
              <div className="p-4 bg-blue-50/60 border border-blue-200 rounded-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-blue-100 pb-2">
                  <label className="text-sm font-bold text-blue-950 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span>๒. วันที่มีหน้าที่ยื่นครบ ๓ ปี (วันดำรงตำแหน่งครบ ๓ ปี)</span>
                  </label>
                  <span className="text-[11px] text-blue-800 bg-blue-100 font-semibold px-2 py-0.5 rounded-full">
                    พ.ร.ป. ป.ป.ช. ม.๑๐๕ วรรคสาม
                  </span>
                </div>

                {/* Sub-card 1: Appointment Date */}
                <div className="space-y-1.5 bg-white p-3 rounded-xl border border-blue-100 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-800">
                      (ก) วันที่เข้ารับตำแหน่งเดิม:
                    </label>
                    <div className="flex items-center gap-1 text-[11px]">
                      <button
                        type="button"
                        onClick={setAppointment3YearsAgo}
                        className="text-blue-600 hover:underline"
                      >
                        ๓ ปีก่อนวันนี้
                      </button>
                      <span className="text-slate-300">·</span>
                      <button
                        type="button"
                        onClick={() => handleAppointmentDateChange('2021-10-01')}
                        className="text-slate-500 hover:underline"
                      >
                        ๑ ต.ค. ๖๔
                      </button>
                    </div>
                  </div>
                  <input
                    type="date"
                    value={appointmentDate}
                    onChange={(e) => handleAppointmentDateChange(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none font-sans"
                  />
                  {appointmentDate && (
                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                      <span>วันตามปฏิทินไทย: <strong>{formatThaiDateFull(appointmentDate)}</strong></span>
                      <div className="flex gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleCalculate3YearsFromStart(appointmentDate, false)}
                          className="px-2 py-0.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded border border-blue-200 font-semibold text-[10px]"
                          title="คำนวณวันตรงกันอีก 3 ปี"
                        >
                          +๓ ปีพอดี
                        </button>
                        <button
                          type="button"
                          onClick={() => handleCalculate3YearsFromStart(appointmentDate, true)}
                          className="px-2 py-0.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded border border-slate-200 text-[10px]"
                          title="คำนวณวันก่อนครบ 1 วัน"
                        >
                          ก่อนครบ ๑ วัน
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Sub-card 2: 3-Year Completion Date (วันที่มีหน้าที่ยื่นครบ ๓ ปี) */}
                <div className="space-y-1.5 bg-white p-3.5 rounded-xl border-2 border-blue-500 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-blue-950 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                      <span>(ข) วันที่มีหน้าที่ยื่นครบ ๓ ปี (วันดำรงตำแหน่งครบ ๓ ปี):</span>
                    </label>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 font-bold px-1.5 py-0.5 rounded">
                      วันตั้งต้นคำนวณ
                    </span>
                  </div>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-3 py-2 bg-blue-50/40 border border-blue-400 rounded-lg text-slate-900 text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none font-sans"
                  />
                  <div className="space-y-1 pt-1 text-xs">
                    <div className="text-slate-700 font-medium">
                      วันที่มีหน้าที่ยื่นครบ ๓ ปี: <span className="font-bold text-blue-900">{formatThaiDateFull(eventDate)}</span>
                    </div>
                    <div className="text-slate-500 text-[11px]">
                      วันเริ่มนับวันแรก (วันถัดไป): <span className="font-semibold text-blue-700">{formatThaiDateFull(startCountDate || eventDate)}</span>
                    </div>
                  </div>
                </div>

                {/* Duration selector for 3-Year Declaration */}
                <div className="space-y-1.5 pt-1 text-xs">
                  <div className="flex items-center justify-between font-semibold text-slate-800">
                    <span>ระยะเวลาการยื่นบัญชีทรัพย์สิน:</span>
                    <span className="font-mono text-blue-900 bg-blue-100 px-2 py-0.5 rounded font-bold">
                      ภายใน {customDays} วัน
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setCustomDays(30)}
                      className={`py-2 px-2.5 rounded-lg border text-xs font-medium transition-all ${
                        customDays === 30 
                          ? 'bg-blue-600 text-white border-blue-600 font-semibold shadow-2xs' 
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div>ภายใน ๓๐ วัน</div>
                      <div className="text-[10px] opacity-80 mt-0.5">(ตาม ม.๑๐๕ วรรคสาม)</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setCustomDays(60)}
                      className={`py-2 px-2.5 rounded-lg border text-xs font-medium transition-all ${
                        customDays === 60 
                          ? 'bg-blue-600 text-white border-blue-600 font-semibold shadow-2xs' 
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div>ภายใน ๖๐ วัน</div>
                      <div className="text-[10px] opacity-80 mt-0.5">(ตามประกาศ ป.ป.ช.)</div>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Standard Date Inputs for other declaration types */
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-sm font-semibold text-slate-800">
                    {declarationType === 'take_office'
                      ? '๒. วันที่เริ่มมีหน้าที่ (วันเข้ารับตำแหน่ง)'
                      : declarationType === 'vacate_office'
                      ? '๒. วันที่เริ่มมีหน้าที่ (วันพ้นจากตำแหน่ง)'
                      : declarationType === 'vacate_1year'
                      ? '๒. วันที่เริ่มมีหน้าที่ (วันพ้นตำแหน่งครบ ๑ ปี)'
                      : '๒. วันที่เริ่มมีหน้าที่ (วันรับตำแหน่ง / วันพ้นตำแหน่ง / วันที่มีหน้าที่ยื่นครบ ๓ ปี)'}
                  </label>
                  {/* Quick Presets */}
                  <div className="flex items-center gap-1.5 text-xs">
                    <button
                      type="button"
                      onClick={() => setQuickPreset(0)}
                      className="text-blue-600 hover:underline"
                    >
                      วันนี้
                    </button>
                    <span className="text-slate-300">·</span>
                    <button
                      type="button"
                      onClick={() => setQuickPreset(-30)}
                      className="text-slate-500 hover:underline"
                    >
                      ย้อน ๓๐ วัน
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors font-sans"
                  />
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  วันตามปฏิทินไทย: <span className="font-medium text-slate-800">{formatThaiDateFull(eventDate)}</span>
                </div>

                {/* Switch to 3-Year Mode shortcut hint */}
                <div className="mt-2.5 p-2.5 bg-blue-50/70 border border-blue-200/80 rounded-xl flex items-center justify-between text-xs text-blue-900">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    ต้องการคำนวณ <strong>วันที่มีหน้าที่ยื่นครบ ๓ ปี</strong> หรือไม่?
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setDeclarationType('every_3years');
                      setCustomDays(30);
                      if (!appointmentDate) {
                        const d = new Date();
                        const y = d.getFullYear() - 3;
                        const m = String(d.getMonth() + 1).padStart(2, '0');
                        const day = String(d.getDate()).padStart(2, '0');
                        const defaultStart = `${y}-${m}-${day}`;
                        setAppointmentDate(defaultStart);
                        const computed = calculate3YearAnniversary(defaultStart, false);
                        if (computed) setEventDate(computed);
                      }
                    }}
                    className="font-bold text-blue-700 hover:text-blue-950 underline shrink-0 ml-2"
                  >
                    คำนวณวันครบ ๓ ปี
                  </button>
                </div>
              </div>
            )}

            {/* Custom Days Input if 'annual' selected */}
            {declarationType === 'annual' && (
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                <label className="block text-xs font-semibold text-slate-800">
                  ระบุจำนวนวันที่กำหนด (วัน)
                </label>
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    min="1"
                    max="365"
                    value={customDays}
                    onChange={(e) => setCustomDays(Number(e.target.value) || 30)}
                    className="w-32 px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none font-mono"
                  />
                  <span className="text-xs text-slate-600">วัน นับแต่วันถัดจากวันเริ่มมีหน้าที่</span>
                </div>
              </div>
            )}

            {/* Step 3: Extension (+30 days) */}
            <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="calcExtension"
                    checked={isExtended}
                    onChange={(e) => setIsExtended(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                  />
                  <label htmlFor="calcExtension" className="text-sm font-semibold text-amber-950 cursor-pointer">
                    ขอขยายระยะเวลายื่น (+๓๐ วัน)
                  </label>
                </div>
                <span className="text-xs font-mono px-2 py-0.5 bg-amber-200 text-amber-900 rounded font-bold">
                  {isExtended ? '+๓๐ วัน (รวม ๙๐ วัน)' : 'ไม่ขยาย'}
                </span>
              </div>
              <p className="text-[12px] text-amber-800 leading-relaxed">
                ตามระเบียบ ป.ป.ช. หากมีเหตุจำเป็นอันมิอาจก้าวล่วงได้ ผู้มีหน้าที่ยื่นสามารถยื่นคำร้องขอขยายเวลาได้ไม่เกิน ๓๐ วัน ก่อนครบกำหนดเดิม
              </p>
            </div>

            {/* Step 4: Holiday Roll Mode (Preceding by default as requested) */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <label className="block text-xs font-bold text-slate-800">
                เกณฑ์กรณีวันสิ้นสุดตรงกับวันหยุดทำการ (เสาร์-อาทิตย์ / วันหยุดราชการ):
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setRollMode('preceding')}
                  className={`p-2.5 text-left rounded-lg border transition-all ${
                    rollMode === 'preceding'
                      ? 'border-blue-600 bg-blue-50/90 text-blue-900 font-bold shadow-xs'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                    <span>ให้นับวันทำการก่อนวันสิ้นสุด</span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-normal mt-0.5 pl-3.5">
                    (เลื่อนขึ้นเป็นวันทำการก่อนหน้า)
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setRollMode('next')}
                  className={`p-2.5 text-left rounded-lg border transition-all ${
                    rollMode === 'next'
                      ? 'border-blue-600 bg-blue-50/90 text-blue-900 font-bold shadow-xs'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                    <span>ให้นับวันทำการถัดไป</span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-normal mt-0.5 pl-3.5">
                    (ตาม ป.พ.พ. มาตรา ๑๙๓/๘)
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Calculation Results Card */}
          <div className="bg-slate-900 rounded-2xl p-6 text-white flex flex-col justify-between shadow-lg">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-5">
                <div className="text-xs font-semibold text-slate-400">ผลการคำนวณกำหนดเวลาอย่างเป็นทางการ</div>
                <div className={`text-xs px-2.5 py-1 rounded-full font-bold ${urgency.badgeBg}`}>
                  {urgency.label}
                </div>
              </div>

              {/* Big Highlight: Deadline Date */}
              <div className="mb-6">
                <div className="text-xs text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <CalendarDays className="w-4 h-4 text-blue-400" />
                  <span>วันหมดเขตยื่นบัญชีทรัพย์สิน (วันสุดท้าย):</span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {formatThaiDateFull(calculation.deadlineString)}
                </div>
                <div className="text-xs sm:text-sm text-blue-400 font-medium mt-1">
                  ตรงกับวัน{THAI_DAYS[calculation.adjustedDate.getDay()]}
                </div>
              </div>

              {/* Breakdown steps */}
              <div className="space-y-3 text-xs border-t border-slate-800 pt-4 font-mono text-slate-300">
                <div className="flex justify-between items-center font-sans">
                  <span className="text-slate-400">ประเภทการยื่น:</span>
                  <span className="font-semibold text-blue-300 text-right">
                    {declarationType === 'every_3years' ? 'วันที่มีหน้าที่ยื่นครบ ๓ ปี' : declarationTypeName}
                  </span>
                </div>

                {declarationType === 'every_3years' && appointmentDate && (
                  <div className="flex justify-between items-center bg-slate-800/80 px-2.5 py-1.5 rounded-lg border border-slate-700/60 font-sans">
                    <span className="text-slate-400">วันที่เข้ารับตำแหน่งเดิม:</span>
                    <span className="font-semibold text-slate-200">{formatThaiDate(appointmentDate)}</span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-sans">
                    {declarationType === 'every_3years' ? 'วันที่มีหน้าที่ยื่นครบ ๓ ปี:' : 'วันเริ่มมีหน้าที่:'}
                  </span>
                  <span className={`font-semibold ${declarationType === 'every_3years' ? 'text-amber-300 font-bold' : 'text-white'}`}>
                    {formatThaiDate(eventDate)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-sans">วันเริ่มนับวันแรก (วันถัดไป):</span>
                  <span className="font-semibold text-blue-300">{formatThaiDate(startCountDate || eventDate)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-sans">ระยะเวลาตามเกณฑ์:</span>
                  <span className="font-semibold text-white">
                    {customDays} วัน {isExtended && `+ ๓๐ วัน (ขยายเวลา) = ${customDays + extensionDays} วัน`}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                  <span className="text-slate-400 font-sans">วันครบกำหนดเดิม:</span>
                  <div className="text-right">
                    <span className="text-slate-200 font-medium">
                      {formatThaiDate(calculation.rawDate)} (วัน{THAI_DAYS[calculation.rawDate.getDay()]})
                    </span>
                    {calculation.holidayName && (
                      <span className="block text-[11px] text-amber-300 font-medium mt-0.5">
                        (ตรงกับวันหยุดนักขัตฤกษ์: {calculation.holidayName})
                      </span>
                    )}
                    {!calculation.holidayName && calculation.isRawWeekend && (
                      <span className="block text-[11px] text-amber-200/90 font-medium mt-0.5">
                        (ตรงกับวันหยุดเสาร์-อาทิตย์)
                      </span>
                    )}
                  </div>
                </div>

                {calculation.wasPostponed ? (
                  <div className="p-3 bg-amber-950/70 border border-amber-800/80 rounded-xl text-amber-200 text-[11px] leading-relaxed font-sans">
                    <div className="font-bold flex items-center gap-1.5 text-amber-300 mb-1 flex-wrap">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      <span>วันสิ้นสุดเดิมตรงกับวันหยุดทำการ</span>
                      {calculation.holidayName && (
                        <span className="bg-amber-900/90 text-amber-100 px-2 py-0.5 rounded text-[10px] font-semibold border border-amber-700/60">
                          {calculation.holidayName}
                        </span>
                      )}
                      {!calculation.holidayName && calculation.isRawWeekend && (
                        <span className="bg-amber-900/90 text-amber-100 px-2 py-0.5 rounded text-[10px] font-semibold border border-amber-700/60">
                          วันหยุดเสาร์-อาทิตย์
                        </span>
                      )}
                    </div>
                    {rollMode === 'preceding'
                      ? `ให้นับวันทำการก่อนวันสิ้นสุด เลื่อนขึ้นมาเป็นวัน${THAI_DAYS[calculation.adjustedDate.getDay()]}ที่ ${formatThaiDate(calculation.adjustedDate)}`
                      : `ตาม ป.พ.พ. มาตรา ๑๙๓/๘ ให้นับวันทำการถัดไป เลื่อนมาเป็นวัน${THAI_DAYS[calculation.adjustedDate.getDay()]}ที่ ${formatThaiDate(calculation.adjustedDate)}`}
                  </div>
                ) : (
                  <div className="p-2.5 bg-slate-800/80 rounded-xl text-slate-300 text-[11px] flex items-center gap-1.5 font-sans">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    วันสิ้นสุดตรงกับวันทำการปกติของราชการ
                  </div>
                )}

                <div className="flex justify-between items-center pt-3 border-t border-slate-800 text-sm font-sans">
                  <span className="text-slate-300 font-medium">สถานะนับจากวันนี้:</span>
                  <span className={`font-bold tabular-nums ${daysRemaining < 0 ? 'text-rose-400' : daysRemaining <= 7 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {daysRemaining < 0 
                      ? `เกินกำหนดแล้ว ${Math.abs(daysRemaining)} วัน` 
                      : daysRemaining === 0 
                      ? 'ครบกำหนดในวันนี้' 
                      : `คงเหลืออีก ${daysRemaining} วัน`}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Action buttons */}
            <div className="mt-6 pt-4 border-t border-slate-800 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleCopySummary}
                className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'คัดลอกข้อความแล้ว' : 'คัดลอกผลสรุป'}</span>
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="py-2.5 px-3 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>พิมพ์ / บันทึก PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Printable Area for Formal Slip (When Print button clicked) */}
      <div 
        id="official-memo-print-area" 
        className="hidden print:block bg-white text-black p-8 border border-black space-y-4 font-['Sarabun']"
      >
        <div className="text-center font-bold text-xl border-b pb-2">
          ใบสรุปผลการคำนวณกำหนดเวลายื่นบัญชีแสดงรายการทรัพย์สินและหนี้สิน
        </div>
        <div className="space-y-2 text-sm pt-2">
          <div><strong>ประเภทการยื่น:</strong> {declarationTypeName}</div>
          {declarationType === 'every_3years' && appointmentDate && (
            <div><strong>วันที่เข้ารับตำแหน่งเดิม:</strong> {formatThaiDateFull(appointmentDate)}</div>
          )}
          <div>
            <strong>{declarationType === 'every_3years' ? 'วันที่มีหน้าที่ยื่นครบ ๓ ปี:' : 'วันที่เริ่มมีหน้าที่:'}</strong> {formatThaiDateFull(eventDate)}
          </div>
          <div><strong>วันเริ่มนับวันแรก (วันถัดไป):</strong> {formatThaiDateFull(startCountDate || eventDate)}</div>
          <div><strong>ระยะเวลาตามที่กำหนด:</strong> {customDays} วัน {isExtended ? `+ ขยายเวลา ๓๐ วัน (รวม ๙๐ วัน)` : ''}</div>
          <div>
            <strong>วันครบกำหนดเดิม:</strong> {formatThaiDateFull(calculation.rawDate)} (วัน{THAI_DAYS[calculation.rawDate.getDay()]})
            {calculation.holidayName && (
              <span className="font-semibold text-rose-700 ml-1.5">
                (ตรงกับวันหยุดนักขัตฤกษ์: {calculation.holidayName})
              </span>
            )}
            {!calculation.holidayName && calculation.isRawWeekend && (
              <span className="font-semibold text-amber-800 ml-1.5">
                (ตรงกับวันหยุดเสาร์-อาทิตย์)
              </span>
            )}
          </div>
          {calculation.wasPostponed && (
            <div>
              <strong>หมายเหตุวันหยุดราชการ:</strong> วันสิ้นสุดเดิมตรงกับวันหยุดทำการ {calculation.holidayName ? `(${calculation.holidayName})` : '(วันหยุดเสาร์-อาทิตย์)'} {rollMode === 'preceding' ? 'ให้นับวันทำการก่อนวันสิ้นสุด' : 'ให้นับวันทำการถัดไป'} เลื่อนมาเป็นวัน{THAI_DAYS[calculation.adjustedDate.getDay()]}ที่ {formatThaiDateFull(calculation.adjustedDate)}
            </div>
          )}
          <div className="text-base font-bold pt-2 border-t">
            วันหมดเขตยื่นบัญชีทรัพย์สิน (วันสุดท้าย): {formatThaiDateFull(calculation.deadlineString)} (วัน{THAI_DAYS[calculation.adjustedDate.getDay()]})
          </div>
        </div>
      </div>

      {/* Legal Reference & Knowledge Box */}
      <div className="bg-slate-100/90 rounded-2xl p-6 border border-slate-200">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3">
          <Info className="w-4 h-4 text-blue-600" />
          หลักเกณฑ์และข้อกฎหมายสำคัญในการนับกำหนดเวลายื่นบัญชีทรัพย์สิน
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-slate-600">
          <div className="p-3.5 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
            <div className="font-bold text-slate-900 mb-1">๑. การนับวันแรก (Day 1)</div>
            <p className="leading-relaxed">
              ตาม ป.พ.พ. มาตรา ๑๙๓/๓ วรรคสอง มิให้นับวันแรกแห่งระยะเวลารวมเข้าด้วยกัน ให้เริ่มนับวันถัดไปเป็นวันแรก
            </p>
          </div>
          <div className="p-3.5 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
            <div className="font-bold text-slate-900 mb-1">๒. วันหยุดราชการในวันสิ้นสุด</div>
            <p className="leading-relaxed">
              กำหนดให้นับวันทำการก่อนวันสิ้นสุด (Preceding Working Day) เพื่อให้การยื่นเอกสารเสร็จสิ้นก่อนวันหยุดทำการ
            </p>
          </div>
          <div className="p-3.5 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
            <div className="font-bold text-slate-900 mb-1">๓. การขอขยายระยะเวลา</div>
            <p className="leading-relaxed">
              ต้องยื่นคำร้องก่อนพ้นกำหนด โดยผู้มีอำนาจอาจอนุญาตให้ขยายได้ไม่เกิน ๓๐ วัน
            </p>
          </div>
          <div className="p-3.5 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
            <div className="font-bold text-slate-900 mb-1">๔. วันที่มีหน้าที่ยื่นครบ ๓ ปี</div>
            <p className="leading-relaxed">
              ตาม พ.ร.ป. ป.ป.ช. ๒๕๖๑ มาตรา ๑๐๕ วรรคสาม เมื่อดำรงตำแหน่งเดิมหรือใหม่ติดต่อกันครบ ๓ ปี ให้นับวันดำรงตำแหน่งครบ ๓ ปีเป็นวันเริ่มมีหน้าที่ และยื่นภายใน ๓๐ วัน (หรือ ๖๐ วันตามประกาศ)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
