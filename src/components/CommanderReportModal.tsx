import React, { useState } from 'react';
import { 
  Printer, 
  Copy, 
  Check, 
  X, 
  FileCheck2, 
  Building, 
  ShieldCheck,
  SendHorizontal
} from 'lucide-react';
import { DeclarantRecord } from '../types';
import { formatThaiDateFull, formatThaiDate } from '../utils/dateCalculations';

interface CommanderReportModalProps {
  declarant: DeclarantRecord;
  onClose: () => void;
  onSaveReportStatus: (updatedData: {
    reportDate: string;
    reportReferenceNo: string;
    commanderName: string;
    commanderNotes?: string;
  }) => void;
}

export const CommanderReportModal: React.FC<CommanderReportModalProps> = ({
  declarant,
  onClose,
  onSaveReportStatus,
}) => {
  const todayStr = new Date().toISOString().split('T')[0];

  const [reportDate, setReportDate] = useState<string>(declarant.reportDate || todayStr);
  const [reportRefNo, setReportRefNo] = useState<string>(
    declarant.reportReferenceNo || `ที่ ${declarant.agency.substring(0, 4)}/${new Date().getFullYear() + 543}/`
  );
  const [commanderName, setCommanderName] = useState<string>(
    declarant.commanderName || 'ผู้บังคับบัญชา / หัวหน้าส่วนราชการ'
  );
  const [commanderNotes, setCommanderNotes] = useState<string>(
    declarant.inspectorNotes || 'เอกสารครบถ้วนสมบูรณ์ตามระเบียบ ป.ป.ช. เห็นควรส่ง ป.ป.ช. เพื่อดำเนินกระบวนการต่อไป'
  );
  const [copied, setCopied] = useState<boolean>(false);

  // Thai declaration type name
  const declarationTypeName = {
    take_office: 'เข้ารับตำแหน่ง',
    vacate_office: 'พ้นจากตำแหน่ง',
    vacate_1year: 'พ้นจากตำแหน่งมาแล้วเป็นเวลา 1 ปี',
    every_3years: 'ยื่นทุก 3 ปีที่ดำรงตำแหน่ง',
    annual: 'ประจำปี / กำหนดเฉพาะ',
  }[declarant.declarationType];

  const handlePrint = () => {
    window.print();
  };

  const fullReportText = `บันทึกข้อความ
ส่วนราชการ: ${declarant.agency} ${declarant.department ? `(${declarant.department})` : ''}
ที่: ${reportRefNo}     วันที่: ${formatThaiDateFull(reportDate)}
เรื่อง: รายงานผลการตรวจสอบการยื่นบัญชีแสดงรายการทรัพย์สินและหนี้สิน
เรียน: ${commanderName}

๑. ต้นเรื่อง
   ตามที่ ${declarant.fullName} ตำแหน่ง ${declarant.positionName} สังกัด ${declarant.agency} มีหน้าที่ต้องยื่นบัญชีแสดงรายการทรัพย์สินและหนี้สินต่อคณะกรรมการ ป.ป.ช. กรณี "${declarationTypeName}" เมื่อวันที่ ${formatThaiDateFull(declarant.eventDate)} ซึ่งครบกำหนดเวลายื่นตามกฎหมายภายในวันที่ ${formatThaiDateFull(declarant.deadlineDate)} นั้น

๒. ข้อเท็จจริง
   ผู้มีหน้าที่ยื่นบัญชีได้ดำเนินการยื่นบัญชีทรัพย์สินและหนี้สินพร้อมเอกสารประกอบเรียบร้อยแล้ว เมื่อวันที่ ${formatThaiDateFull(declarant.actualSubmissionDate || declarant.deadlineDate)} ${declarant.submissionCode ? `เลขที่รับเอกสาร: ${declarant.submissionCode}` : ''} ภายในระยะเวลาที่กฎหมายกำหนด

๓. ผลการตรวจสอบเอกสารเบื้องต้น
   ผู้รับผิดชอบได้ดำเนินการตรวจสอบความถูกต้อง ครบถ้วนของเอกสารหลักฐานเบื้องต้น ๙ หมวด ปรากฏผลดังนี้:
   - สำเนาบัตรประจำตัวประชาชนและทะเบียนบ้าน: ${declarant.checklist.idCardCopy ? 'ครบถ้วน' : 'ไม่พบ'}
   - ข้อมูลคู่สมรสและบุตรที่ยังไม่บรรลุนิติภาวะ: ${declarant.checklist.spouseInfo ? 'ครบถ้วน' : 'ไม่พบ'}
   - บัญชีเงินฝากและสถาบันการเงิน: ${declarant.checklist.bankAccounts ? 'ครบถ้วน' : 'ไม่พบ'}
   - เงินลงทุน หุ้น พันธบัตร: ${declarant.checklist.investments ? 'ครบถ้วน' : 'ไม่พบ'}
   - ที่ดิน โรงเรือนและสิ่งปลูกสร้าง: ${declarant.checklist.realEstate ? 'ครบถ้วน' : 'ไม่พบ'}
   - ยานพาหนะ: ${declarant.checklist.vehicles ? 'ครบถ้วน' : 'ไม่พบ'}
   - สิทธิและสัมปทาน / ทรัพย์สินอื่น: ${declarant.checklist.otherValuableAssets ? 'ครบถ้วน' : 'ไม่พบ'}
   - หนี้สินและภาระผูกพัน: ${declarant.checklist.debtsLoans ? 'ครบถ้วน' : 'ไม่พบ'}
   - หลักฐานการเสียภาษีเงินได้บุคคลธรรมดา: ${declarant.checklist.taxReturns ? 'ครบถ้วน' : 'ไม่พบ'}

๔. ข้อคิดเห็นและข้อเสนอแนะ
   ${commanderNotes}

จึงเรียนมาเพื่อโปรดทราบและพิจารณาลงนามรับทราบ`;

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(fullReportText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleSaveAndConfirm = () => {
    onSaveReportStatus({
      reportDate,
      reportReferenceNo: reportRefNo,
      commanderName,
      commanderNotes,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-2 sm:p-4 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full my-6 shadow-2xl border border-slate-200 flex flex-col max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 shrink-0 bg-slate-900 text-white rounded-t-2xl">
          <div className="flex items-center gap-2.5">
            <FileCheck2 className="w-5 h-5 text-emerald-400" />
            <div>
              <h2 className="text-base sm:text-lg font-bold">
                บันทึกข้อความสรุปรายงานเสนอผู้บังคับบัญชา
              </h2>
              <p className="text-xs text-slate-400">
                เอกสารสรุปผลการตรวจสอบการยื่นบัญชีทรัพย์สินตามแบบราชการไทย (พิมพ์ / เซฟ PDF ได้)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'คัดลอกแล้ว' : 'คัดลอกข้อความ'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 text-xs bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex items-center gap-1.5 transition-colors font-medium shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>พิมพ์ / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Settings Strip + Printable Official Memo Sheet */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Editor Controls */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                เลขที่หนังสือบันทึกข้อความ
              </label>
              <input
                type="text"
                value={reportRefNo}
                onChange={(e) => setReportRefNo(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-slate-900"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                วันที่เสนอรายงาน
              </label>
              <input
                type="date"
                value={reportDate}
                onChange={(e) => setReportDate(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-slate-900"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                เรียน (ตำแหน่งผู้บังคับบัญชา)
              </label>
              <input
                type="text"
                value={commanderName}
                onChange={(e) => setCommanderName(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-slate-900"
              />
            </div>
          </div>

          {/* Printable Official Government Memorandum Box */}
          <div 
            id="official-memo-print-area"
            className="bg-white border-2 border-slate-300 p-8 sm:p-12 rounded-xl text-slate-900 font-['Sarabun'] shadow-sm text-sm sm:text-base leading-relaxed space-y-4 print:border-none print:p-0"
          >
            {/* Header: Garuda Emblem placeholder & Memo Title */}
            <div className="flex flex-col items-center justify-center pb-4 border-b-2 border-slate-900">
              <div className="text-3xl font-extrabold tracking-widest text-slate-900 mb-1">
                บันทึกข้อความ
              </div>
            </div>

            {/* Gov Memo Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 pt-2 text-sm border-b border-slate-200 pb-3">
              <div>
                <span className="font-bold">ส่วนราชการ:</span> {declarant.agency} {declarant.department ? `(${declarant.department})` : ''}
              </div>
              <div className="sm:text-right">
                <span className="font-bold">ที่:</span> {reportRefNo}
              </div>
              <div>
                <span className="font-bold">วันที่:</span> {formatThaiDateFull(reportDate)}
              </div>
              <div className="sm:text-right">
                <span className="font-bold">เรื่อง:</span> รายงานผลการตรวจสอบการยื่นบัญชีทรัพย์สินและหนี้สิน
              </div>
            </div>

            <div className="pt-2 text-sm">
              <span className="font-bold">เรียน:</span> {commanderName}
            </div>

            {/* Paragraph 1: Background */}
            <div className="indent-8 text-justify text-sm">
              ด้วย <span className="font-bold">{declarant.fullName}</span> ผู้ดำรงตำแหน่ง{' '}
              <span className="font-bold">{declarant.positionName}</span> สังกัด {declarant.agency}{' '}
              มีหน้าที่ตามกฎหมายประกอบรัฐธรรมนูญว่าด้วยการป้องกันและปราบปรามการทุจริต พ.ศ. ๒๕๖๑ ในการยื่นบัญชีทรัพย์สินและหนี้สิน
              กรณี <span className="font-bold">&ldquo;{declarationTypeName}&rdquo;</span> ซึ่งมีผลตั้งแต่วันที่{' '}
              {formatThaiDateFull(declarant.eventDate)} โดยมีกำหนดเวลายื่นตามกฎหมายภายในวันที่{' '}
              <span className="font-bold">{formatThaiDateFull(declarant.deadlineDate)}</span> นั้น
            </div>

            {/* Paragraph 2: Facts */}
            <div className="indent-8 text-justify text-sm">
              บัดนี้ ผู้มีหน้าที่ได้ดำเนินการยื่นบัญชีแสดงรายการทรัพย์สินและหนี้สินพร้อมเอกสารประกอบเรียบร้อยแล้ว
              เมื่อวันที่ <span className="font-bold">{formatThaiDateFull(declarant.actualSubmissionDate || declarant.deadlineDate)}</span>{' '}
              {declarant.submissionCode && `(เลขที่รับเอกสาร: ${declarant.submissionCode})`}{' '}
              ซึ่งเป็นการยื่นภายในกรอบระยะเวลาที่กฎหมายและระเบียบกำหนด
            </div>

            {/* Paragraph 3: Inspection Checklist Table */}
            <div className="pt-2 text-sm">
              <div className="font-bold mb-2">ผลการตรวจสอบเอกสารและหลักฐานประกอบ (๙ หมวดหลัก):</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2">
                  <span className={declarant.checklist.idCardCopy ? 'text-emerald-700 font-bold' : 'text-slate-400'}>
                    {declarant.checklist.idCardCopy ? '✓' : '✗'}
                  </span>
                  <span>๑. สำเนาบัตร ปชช. / ทะเบียนบ้าน ผู้ยื่นและครอบครัว</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={declarant.checklist.spouseInfo ? 'text-emerald-700 font-bold' : 'text-slate-400'}>
                    {declarant.checklist.spouseInfo ? '✓' : '✗'}
                  </span>
                  <span>๒. บัญชีทรัพย์สินคู่สมรสและบุตรที่ยังไม่บรรลุนิติภาวะ</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={declarant.checklist.bankAccounts ? 'text-emerald-700 font-bold' : 'text-slate-400'}>
                    {declarant.checklist.bankAccounts ? '✓' : '✗'}
                  </span>
                  <span>๓. บัญชีเงินฝากธนาคาร / สถาบันการเงิน</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={declarant.checklist.investments ? 'text-emerald-700 font-bold' : 'text-slate-400'}>
                    {declarant.checklist.investments ? '✓' : '✗'}
                  </span>
                  <span>๔. เงินลงทุน หุ้น พันธบัตร กองทุนรวม</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={declarant.checklist.realEstate ? 'text-emerald-700 font-bold' : 'text-slate-400'}>
                    {declarant.checklist.realEstate ? '✓' : '✗'}
                  </span>
                  <span>๕. ที่ดิน โรงเรือนและสิ่งปลูกสร้าง (โฉนด/น.ส.๓)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={declarant.checklist.vehicles ? 'text-emerald-700 font-bold' : 'text-slate-400'}>
                    {declarant.checklist.vehicles ? '✓' : '✗'}
                  </span>
                  <span>๖. ยานพาหนะ (คู่มือจดทะเบียนรถยนต์/จยย.)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={declarant.checklist.debtsLoans ? 'text-emerald-700 font-bold' : 'text-slate-400'}>
                    {declarant.checklist.debtsLoans ? '✓' : '✗'}
                  </span>
                  <span>๗. หนี้สินและภาระผูกพัน (สัญญากู้/หนังสือรับรองหนี้)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={declarant.checklist.taxReturns ? 'text-emerald-700 font-bold' : 'text-slate-400'}>
                    {declarant.checklist.taxReturns ? '✓' : '✗'}
                  </span>
                  <span>๘. สำเนาแบบแสดงรายการภาษีเงินได้บุคคลธรรมดา</span>
                </div>
                <div className="flex items-center gap-2 sm:col-span-2">
                  <span className={declarant.checklist.otherValuableAssets ? 'text-emerald-700 font-bold' : 'text-slate-400'}>
                    {declarant.checklist.otherValuableAssets ? '✓' : '✗'}
                  </span>
                  <span>๙. ทรัพย์สินอื่นที่มีมูลค่ารวมเกินสองแสนบาท (พระเครื่อง/ทองคำ/นาฬิกา)</span>
                </div>
              </div>
            </div>

            {/* Paragraph 4: Findings & Recommendation */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                ข้อพิจารณาและข้อเสนอแนะของผู้ตรวจรายงาน:
              </label>
              <textarea
                rows={2}
                value={commanderNotes}
                onChange={(e) => setCommanderNotes(e.target.value)}
                className="w-full p-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 outline-none focus:bg-white"
              />
            </div>

            <div className="indent-8 text-justify text-sm pt-2">
              จึงเรียนมาเพื่อโปรดทราบและพิจารณาลงนามรับทราบผลการตรวจสอบต่อไป
            </div>

            {/* Signature Block */}
            <div className="pt-8 grid grid-cols-2 gap-8 text-center text-xs sm:text-sm">
              <div className="space-y-6">
                <div>(ลงชื่อ).....................................................</div>
                <div>
                  (............................................................)<br />
                  <span className="text-slate-600">เจ้าหน้าที่ผู้รับผิดชอบงานตรวจสอบทรัพย์สิน</span>
                </div>
              </div>

              <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-dashed border-slate-300">
                <div className="font-bold text-slate-800 text-left">ความเห็น/คำสั่งผู้บังคับบัญชา:</div>
                <div className="text-left text-xs text-slate-600 space-y-1">
                  <div>[  ] ทราบ และให้ส่งสำนวนไปยังสำนักงาน ป.ป.ช.</div>
                  <div>[  ] ทราบ และให้เก็บรักษาไว้เป็นหลักฐานประจำสังกัด</div>
                </div>
                <div className="pt-4">
                  (ลงชื่อ).....................................................<br />
                  <span className="text-slate-700 font-medium">({commanderName})</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 rounded-b-2xl">
          <div className="text-xs text-slate-500">
            สถานะปัจจุบัน:{' '}
            <span className="font-semibold text-slate-700">
              {declarant.inspectionStatus === 'reported_to_commander'
                ? 'เสนอรายงานผู้บังคับบัญชาแล้ว'
                : 'ยังไม่ได้บันทึกเสนอรายงาน'}
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
            >
              ปิดหน้าต่าง
            </button>
            <button
              type="button"
              onClick={handleSaveAndConfirm}
              className="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5"
            >
              <SendHorizontal className="w-3.5 h-3.5" />
              <span>บันทึกสถานะ &ldquo;เสนอรายงาน ผบช. แล้ว&rdquo;</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
