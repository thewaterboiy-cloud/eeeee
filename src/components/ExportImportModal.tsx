import React, { useRef, useState } from 'react';
import { 
  X, 
  Download, 
  Upload, 
  RefreshCw, 
  FileSpreadsheet, 
  FileCode, 
  Check, 
  AlertTriangle 
} from 'lucide-react';
import { DeclarantRecord, PositionItem } from '../types';
import { formatThaiDate } from '../utils/dateCalculations';
import { SAMPLE_DECLARANTS, INITIAL_POSITIONS } from '../data/positionsData';

interface ExportImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  declarants: DeclarantRecord[];
  positions: PositionItem[];
  onImportData: (declarants: DeclarantRecord[], positions?: PositionItem[]) => void;
  onResetSampleData: () => void;
}

export const ExportImportModal: React.FC<ExportImportModalProps> = ({
  isOpen,
  onClose,
  declarants,
  positions,
  onImportData,
  onResetSampleData,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [copiedStatus, setCopiedStatus] = useState(false);

  if (!isOpen) return null;

  // Export to CSV with UTF-8 BOM for Thai Excel compatibility
  const handleExportCSV = () => {
    const headers = [
      'ลำดับ',
      'ชื่อ-นามสกุล',
      'ตำแหน่ง',
      'สังกัด/หน่วยงาน',
      'ส่วน/ฝ่าย/กอง',
      'เบอร์โทร',
      'ประเภทการยื่น',
      'วันเริ่มมีหน้าที่',
      'วันครบกำหนด',
      'สถานะขอขยายเวลา',
      'สถานะการยื่น',
      'วันที่ยื่นจริง',
      'เลขรับเอกสาร',
      'สถานะการตรวจสอบ',
      'วันที่เสนอรายงาน ผบช.',
      'เลขที่หนังสือเสนอรายงาน',
      'ชื่อผู้บังคับบัญชา',
      'ข้อสังเกต/หมายเหตุ'
    ];

    const rows = declarants.map((d, index) => {
      const typeLabel = d.declarationType === 'take_office' 
        ? 'เข้ารับตำแหน่ง' 
        : d.declarationType === 'vacate_office' 
        ? 'พ้นจากตำแหน่ง' 
        : d.declarationType === 'vacate_1year' 
        ? 'พ้นตำแหน่งครบ 1 ปี' 
        : 'ประจำปี/เฉพาะ';

      const statusLabel = d.submissionStatus === 'submitted'
        ? 'ยื่นแล้ว'
        : d.submissionStatus === 'overdue'
        ? 'เกินกำหนด'
        : d.submissionStatus === 'extended'
        ? 'ขอขยายเวลา'
        : 'ยังไม่ยื่น';

      const inspectLabel = d.inspectionStatus === 'reported_to_commander'
        ? 'เสนอรายงาน ผบช. แล้ว'
        : d.inspectionStatus === 'completed_valid'
        ? 'ตรวจแล้วถูกต้องครบถ้วน'
        : d.inspectionStatus === 'clarification_needed'
        ? 'มีข้อสังเกต'
        : 'ยังไม่ตรวจ';

      return [
        index + 1,
        `"${d.fullName.replace(/"/g, '""')}"`,
        `"${d.positionName.replace(/"/g, '""')}"`,
        `"${d.agency.replace(/"/g, '""')}"`,
        `"${(d.department || '').replace(/"/g, '""')}"`,
        `"${d.phone || ''}"`,
        `"${typeLabel}"`,
        `"${d.eventDate}"`,
        `"${d.deadlineDate}"`,
        `"${d.isExtended ? 'ขยายเวลา +30 วัน' : 'ไม่ขยาย'}"`,
        `"${statusLabel}"`,
        `"${d.actualSubmissionDate || ''}"`,
        `"${d.submissionCode || ''}"`,
        `"${inspectLabel}"`,
        `"${d.reportDate || ''}"`,
        `"${d.reportReferenceNo || ''}"`,
        `"${d.commanderName || ''}"`,
        `"${(d.inspectorNotes || '').replace(/"/g, '""')}"`
      ].join(',');
    });

    const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `ทะเบียนยื่นบัญชีทรัพย์สิน_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export full JSON Backup
  const handleExportJSON = () => {
    const backupData = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      declarants,
      customPositions: positions.filter(p => p.isCustom),
    };

    const jsonStr = JSON.stringify(backupData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `backup_asset_declaration_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Import JSON File
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed)) {
          // Array of declarants directly
          onImportData(parsed);
          alert(`นำเข้าข้อมูลสำเร็จ ${parsed.length} รายการ`);
          onClose();
        } else if (parsed && parsed.declarants && Array.isArray(parsed.declarants)) {
          // Wrapped backup
          onImportData(parsed.declarants, parsed.customPositions);
          alert(`นำเข้าข้อมูลสำเร็จ ${parsed.declarants.length} รายการ`);
          onClose();
        } else {
          alert('รูปแบบไฟล์ไม่ถูกต้อง');
        }
      } catch (err) {
        alert('เกิดข้อผิดพลาดในการอ่านไฟล์ JSON');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg font-bold text-slate-900">
              สำรองและส่งออกข้อมูล (Export / Backup)
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs sm:text-sm">
          {/* Export to Excel CSV */}
          <div className="p-4 rounded-xl border border-slate-200 hover:border-emerald-300 bg-emerald-50/40 space-y-2 transition-colors">
            <div className="flex items-center justify-between">
              <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                ส่งออกเป็นไฟล์ Excel / Sheets (.CSV)
              </div>
              <span className="text-[11px] font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                เปิดได้ใน iPad &amp; PC
              </span>
            </div>
            <p className="text-slate-600 text-xs">
              ส่งออกรายชื่อทั้งหมด {declarants.length} รายการ พร้อมสถานะการยื่นและการเสนอรายงานผู้บังคับบัญชา รองรับภาษาไทยใน Microsoft Excel, Google Sheets และ Apple Numbers
            </p>
            <button
              onClick={handleExportCSV}
              className="mt-2 w-full py-2 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>ดาวน์โหลดไฟล์ Excel (.CSV)</span>
            </button>
          </div>

          {/* Export / Import JSON Backup */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <FileCode className="w-4 h-4 text-blue-600" />
              สำรองและนำเข้าไฟล์ระบบ (.JSON)
            </div>
            <p className="text-slate-600 text-xs">
              ใช้สำหรับสำรองข้อมูลเก็บไว้ในเครื่อง iPad หรือถ่ายโอนข้อมูลไปยังเครื่องคอมพิวเตอร์เครื่องอื่น
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={handleExportJSON}
                className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>ดาวน์โหลดสำรอง (.JSON)</span>
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>นำเข้าไฟล์ (.JSON)</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Reset to Sample Data */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">ต้องการโหลดชุดตัวอย่างเพื่อทดสอบระบบ:</span>
            <button
              onClick={() => {
                if (confirm('ต้องการโหลดข้อมูลตัวอย่างเริ่มต้น 5 รายการใช่หรือไม่? (ข้อมูลปัจจุบันจะถูกรีเซ็ต)')) {
                  onResetSampleData();
                  onClose();
                }
              }}
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 py-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>รีเซ็ตเป็นข้อมูลตัวอย่าง</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
