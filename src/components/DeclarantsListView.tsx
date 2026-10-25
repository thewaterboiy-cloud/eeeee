import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  FileText, 
  SendHorizontal, 
  Edit3, 
  Trash2, 
  Phone, 
  Mail, 
  ShieldCheck, 
  UserCheck, 
  Building2,
  ChevronRight,
  Plus
} from 'lucide-react';
import { DeclarantRecord, SubmissionStatus, InspectionStatus } from '../types';
import { formatThaiDate, getDaysRemaining, getDeadlineUrgency } from '../utils/dateCalculations';

interface DeclarantsListViewProps {
  declarants: DeclarantRecord[];
  onOpenAddModal: () => void;
  onEditDeclarant: (declarant: DeclarantRecord) => void;
  onDeleteDeclarant: (id: string) => void;
  onOpenCommanderReport: (declarant: DeclarantRecord) => void;
  onQuickMarkSubmitted: (id: string) => void;
}

export const DeclarantsListView: React.FC<DeclarantsListViewProps> = ({
  declarants,
  onOpenAddModal,
  onEditDeclarant,
  onDeleteDeclarant,
  onOpenCommanderReport,
  onQuickMarkSubmitted,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'submitted' | 'urgent' | 'reported'>('all');

  // KPI Metrics Calculation
  const metrics = useMemo(() => {
    const total = declarants.length;
    let submitted = 0;
    let pending = 0;
    let urgent = 0;
    let overdue = 0;
    let reported = 0;

    declarants.forEach(d => {
      const isSub = d.submissionStatus === 'submitted' || !!d.actualSubmissionDate;
      if (isSub) {
        submitted++;
      } else {
        pending++;
        const days = getDaysRemaining(d.deadlineDate);
        if (days < 0) {
          overdue++;
        } else if (days <= 7) {
          urgent++;
        }
      }

      if (d.inspectionStatus === 'reported_to_commander' || d.inspectionStatus === 'commander_acknowledged') {
        reported++;
      }
    });

    return { total, submitted, pending, urgent, overdue, reported };
  }, [declarants]);

  // Filtered Declarants
  const filteredDeclarants = useMemo(() => {
    return declarants.filter(d => {
      const isSub = d.submissionStatus === 'submitted' || !!d.actualSubmissionDate;
      const days = getDaysRemaining(d.deadlineDate);

      // Status tab filter
      if (statusFilter === 'pending' && isSub) return false;
      if (statusFilter === 'submitted' && !isSub) return false;
      if (statusFilter === 'urgent' && (isSub || days > 7)) return false;
      if (statusFilter === 'reported' && !(d.inspectionStatus === 'reported_to_commander' || d.inspectionStatus === 'commander_acknowledged')) return false;

      // Text query
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        d.fullName.toLowerCase().includes(q) ||
        d.positionName.toLowerCase().includes(q) ||
        d.agency.toLowerCase().includes(q) ||
        (d.department && d.department.toLowerCase().includes(q)) ||
        (d.phone && d.phone.includes(q)) ||
        (d.submissionCode && d.submissionCode.toLowerCase().includes(q)) ||
        (d.idCardLast4 && d.idCardLast4.includes(q))
      );
    });
  }, [declarants, statusFilter, searchQuery]);

  const declarationTypeLabel = (type: string) => {
    switch (type) {
      case 'take_office': return 'เข้ารับตำแหน่ง';
      case 'vacate_office': return 'พ้นจากตำแหน่ง';
      case 'vacate_1year': return 'พ้นตำแหน่งครบ 1 ปี';
      case 'every_3years': return 'ครบ 3 ปีที่ดำรงตำแหน่ง';
      default: return 'ประจำปี/เฉพาะ';
    }
  };

  const getChecklistCount = (cl: DeclarantRecord['checklist']) => {
    if (!cl) return { completed: 0, total: 10 };
    const values = Object.values(cl);
    const completed = values.filter(Boolean).length;
    return { completed, total: values.length };
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* KPI Metric Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">ผู้มีหน้าที่ทั้งหมด</div>
          <div className="text-2xl font-bold text-slate-900 font-mono mt-1 tabular-nums">
            {metrics.total} <span className="text-xs font-normal text-slate-400 font-sans">ราย</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">ยื่นบัญชีแล้ว</div>
          <div className="text-2xl font-bold text-emerald-600 font-mono mt-1 tabular-nums">
            {metrics.submitted} <span className="text-xs font-normal text-slate-400 font-sans">ราย</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">ยังไม่ยื่นบัญชี</div>
          <div className="text-2xl font-bold text-slate-700 font-mono mt-1 tabular-nums">
            {metrics.pending} <span className="text-xs font-normal text-slate-400 font-sans">ราย</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">ใกล้ครบกำหนด (≤7 วัน)</div>
          <div className="text-2xl font-bold text-amber-600 font-mono mt-1 tabular-nums">
            {metrics.urgent} <span className="text-xs font-normal text-slate-400 font-sans">ราย</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs col-span-2 sm:col-span-1">
          <div className="text-xs text-slate-500 font-medium">เสนอรายงาน ผบช. แล้ว</div>
          <div className="text-2xl font-bold text-blue-600 font-mono mt-1 tabular-nums">
            {metrics.reported} <span className="text-xs font-normal text-slate-400 font-sans">ราย</span>
          </div>
        </div>
      </div>

      {/* Control Filter Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาชื่อผู้ยื่น, ตำแหน่ง, หน่วยงาน, เบอร์โทร, หรือเลขรับเอกสาร..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Primary Add Button */}
          <button
            onClick={onOpenAddModal}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>เพิ่มผู้ยื่นรายใหม่</span>
          </button>
        </div>

        {/* Status Filter Buttons (Zero-pill button controls) */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1 text-xs font-medium">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-colors ${
              statusFilter === 'all'
                ? 'bg-slate-900 text-white font-semibold'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
            }`}
          >
            ทั้งหมด ({declarants.length})
          </button>

          <button
            onClick={() => setStatusFilter('pending')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-colors ${
              statusFilter === 'pending'
                ? 'bg-slate-900 text-white font-semibold'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
            }`}
          >
            รอยื่น ({metrics.pending})
          </button>

          <button
            onClick={() => setStatusFilter('urgent')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-colors ${
              statusFilter === 'urgent'
                ? 'bg-amber-600 text-white font-semibold'
                : 'bg-amber-50 hover:bg-amber-100 text-amber-800'
            }`}
          >
            ด่วน/ใกล้ครบกำหนด ({metrics.urgent + metrics.overdue})
          </button>

          <button
            onClick={() => setStatusFilter('submitted')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-colors ${
              statusFilter === 'submitted'
                ? 'bg-emerald-700 text-white font-semibold'
                : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800'
            }`}
          >
            ยื่นแล้ว ({metrics.submitted})
          </button>

          <button
            onClick={() => setStatusFilter('reported')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-colors ${
              statusFilter === 'reported'
                ? 'bg-blue-600 text-white font-semibold'
                : 'bg-blue-50 hover:bg-blue-100 text-blue-800'
            }`}
          >
            เสนอรายงาน ผบช. แล้ว ({metrics.reported})
          </button>
        </div>
      </div>

      {/* Main Declarants Roster List */}
      <div className="space-y-3">
        {filteredDeclarants.map(dec => {
          const isSubmitted = dec.submissionStatus === 'submitted' || !!dec.actualSubmissionDate;
          const urgency = getDeadlineUrgency(dec.deadlineDate, isSubmitted);
          const chk = getChecklistCount(dec.checklist);
          const isReported = dec.inspectionStatus === 'reported_to_commander' || dec.inspectionStatus === 'commander_acknowledged';

          return (
            <div
              key={dec.id}
              className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 hover:border-slate-300 transition-colors shadow-xs"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Left Zone: Person & Position */}
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                      {dec.fullName}
                    </span>
                    {dec.idCardLast4 && (
                      <span className="text-xs text-slate-500 font-mono">
                        (..{dec.idCardLast4})
                      </span>
                    )}

                    {/* Unboxed Metadata separator */}
                    <span className="text-slate-300">·</span>
                    <span className="text-xs text-blue-700 font-medium bg-blue-50 px-2 py-0.5 rounded">
                      {declarationTypeLabel(dec.declarationType)}
                    </span>

                    {dec.isExtended && (
                      <span className="text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-medium">
                        ขยายเวลา +30 วัน
                      </span>
                    )}
                  </div>

                  <div className="text-xs sm:text-sm font-medium text-slate-700 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{dec.positionName}</span>
                    <span className="text-slate-400">·</span>
                    <span className="text-slate-500">{dec.agency}</span>
                  </div>

                  {/* Dates & Urgency Countdown strip */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
                    <div className="flex items-center gap-1">
                      <span className="text-slate-400">วันเริ่มมีหน้าที่:</span>
                      <span className="font-medium text-slate-700">{formatThaiDate(dec.eventDate)}</span>
                    </div>

                    <span className="text-slate-300">·</span>

                    <div className="flex items-center gap-1">
                      <span className="text-slate-400">ครบกำหนด:</span>
                      <span className="font-medium text-slate-900 font-mono">{formatThaiDate(dec.deadlineDate)}</span>
                    </div>

                    <span className="text-slate-300">·</span>

                    {/* Urgency Badge */}
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${urgency.badgeBg}`}>
                      {urgency.label}
                    </span>
                  </div>

                  {/* Phone & Submission Ref */}
                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
                    {dec.phone && (
                      <div className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span className="font-mono">{dec.phone}</span>
                      </div>
                    )}
                    {dec.submissionCode && (
                      <div className="flex items-center gap-1">
                        <span className="text-slate-400">เลขรับเอกสาร:</span>
                        <span className="font-mono font-medium text-slate-700">{dec.submissionCode}</span>
                      </div>
                    )}
                    {dec.actualSubmissionDate && (
                      <div className="flex items-center gap-1 text-emerald-700">
                        <CheckCircle className="w-3 h-3" />
                        <span>ยื่นเมื่อ {formatThaiDate(dec.actualSubmissionDate)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Middle Zone: Inspection & Commander Report Status */}
                <div className="lg:w-64 border-t lg:border-t-0 lg:border-l border-slate-100 pt-3 lg:pt-0 lg:pl-4 space-y-2 text-xs">
                  <div>
                    <span className="text-slate-400 block mb-0.5">การตรวจเอกสาร ๙ หมวด:</span>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${chk.completed === 10 ? 'bg-emerald-500' : 'bg-blue-500'}`}
                          style={{ width: `${(chk.completed / chk.total) * 100}%` }}
                        />
                      </div>
                      <span className="font-mono font-semibold text-slate-700 text-[11px]">
                        {chk.completed}/{chk.total}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-400 block mb-0.5">สถานะรายงานผู้บังคับบัญชา:</span>
                    {isReported ? (
                      <div className="text-emerald-700 font-medium flex items-center gap-1 text-xs">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span>เสนอรายงานแล้ว {dec.reportDate ? `(${formatThaiDate(dec.reportDate)})` : ''}</span>
                      </div>
                    ) : (
                      <div className="text-slate-500 flex items-center gap-1 text-xs">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>ยังไม่เสนอรายงาน</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Zone: Action Buttons */}
                <div className="flex flex-wrap items-center gap-1.5 lg:flex-col lg:items-stretch lg:w-44 shrink-0 pt-2 lg:pt-0">
                  {/* Commander Report Action */}
                  <button
                    onClick={() => onOpenCommanderReport(dec)}
                    className="flex-1 lg:flex-none py-1.5 px-2.5 text-xs font-semibold rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 transition-colors flex items-center justify-center gap-1.5"
                    title="เปิดบันทึกข้อความสรุปเสนอผู้บังคับบัญชา"
                  >
                    <SendHorizontal className="w-3.5 h-3.5" />
                    <span>บันทึกเสนอ ผบช.</span>
                  </button>

                  {/* Mark Submitted Quick Toggle */}
                  {!isSubmitted && (
                    <button
                      onClick={() => onQuickMarkSubmitted(dec.id)}
                      className="flex-1 lg:flex-none py-1.5 px-2.5 text-xs font-semibold rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>บันทึกยื่นแล้ว</span>
                    </button>
                  )}

                  {/* Edit & Delete */}
                  <div className="flex items-center gap-1 w-full">
                    <button
                      onClick={() => onEditDeclarant(dec)}
                      className="flex-1 py-1.5 px-2 text-xs font-medium rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center justify-center gap-1"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>แก้ไข</span>
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`ยืนยันการลบรายชื่อ "${dec.fullName}" ออกจากระบบ?`)) {
                          onDeleteDeclarant(dec.id);
                        }
                      }}
                      className="py-1.5 px-2 text-xs font-medium rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors"
                      title="ลบรายการ"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Inspector note if present */}
              {dec.inspectorNotes && (
                <div className="mt-3 pt-2.5 border-t border-slate-100 text-xs text-slate-600 bg-slate-50/70 p-2.5 rounded-lg">
                  <span className="font-semibold text-slate-700">บันทึกช่วยจำ/การประสานงาน: </span>
                  {dec.inspectorNotes}
                </div>
              )}
            </div>
          );
        })}

        {filteredDeclarants.length === 0 && (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <UserCheck className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">ไม่พบรายชื่อผู้ยื่นบัญชีตามเงื่อนไข</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              ลองเปลี่ยนคำค้นหา หรือกดปุ่ม &quot;เพิ่มผู้ยื่นรายใหม่&quot; เพื่อบันทึกรายชื่อผู้มีหน้าที่ในความรับผิดชอบ
            </p>
            <button
              onClick={onOpenAddModal}
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500"
            >
              <Plus className="w-4 h-4" />
              <span>เพิ่มผู้ยื่นเดี๋ยวนี้</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
