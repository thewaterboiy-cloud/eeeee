import React, { useState, useEffect } from 'react';
import { 
  X, 
  Save, 
  Calendar, 
  AlertCircle, 
  CheckSquare, 
  User, 
  Building, 
  Phone, 
  Mail, 
  FileText,
  Clock,
  Sparkles
} from 'lucide-react';
import { DeclarantRecord, DeclarationType, SubmissionStatus, InspectionStatus, PositionItem } from '../types';
import { 
  calculateDeclarationDeadline, 
  formatThaiDateFull, 
  formatThaiDate, 
  getDaysRemaining 
} from '../utils/dateCalculations';

interface DeclarantFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (record: DeclarantRecord) => void;
  initialData?: DeclarantRecord | null;
  positions: PositionItem[];
  presetCalculation?: {
    declarationType: DeclarationType;
    eventDate: string;
    daysAllowed: number;
    isExtended: boolean;
    extensionDays: number;
    deadlineDate: string;
  } | null;
  presetPosition?: PositionItem | null;
}

export const DeclarantFormModal: React.FC<DeclarantFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  positions,
  presetCalculation,
  presetPosition,
}) => {
  const todayStr = new Date().toISOString().split('T')[0];

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [idCardLast4, setIdCardLast4] = useState('');
  const [positionId, setPositionId] = useState('');
  const [positionName, setPositionName] = useState('');
  const [agency, setAgency] = useState('');
  const [department, setDepartment] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [declarationType, setDeclarationType] = useState<DeclarationType>('take_office');
  const [eventDate, setEventDate] = useState(todayStr);
  const [daysAllowed, setDaysAllowed] = useState(60);
  const [isExtended, setIsExtended] = useState(false);
  const [extensionDays, setExtensionDays] = useState(30);
  const [extensionApprovedDate, setExtensionApprovedDate] = useState('');
  
  // Submission
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('pending');
  const [actualSubmissionDate, setActualSubmissionDate] = useState('');
  const [submissionCode, setSubmissionCode] = useState('');

  // Inspection & Commander
  const [inspectionStatus, setInspectionStatus] = useState<InspectionStatus>('not_inspected');
  const [reportDate, setReportDate] = useState('');
  const [reportReferenceNo, setReportReferenceNo] = useState('');
  const [commanderName, setCommanderName] = useState('');
  const [inspectorNotes, setInspectorNotes] = useState('');

  // Checklist
  const [checklist, setChecklist] = useState({
    idCardCopy: false,
    spouseInfo: false,
    childrenInfo: false,
    bankAccounts: false,
    investments: false,
    realEstate: false,
    vehicles: false,
    debtsLoans: false,
    taxReturns: false,
    otherValuableAssets: false,
  });

  // Calculate deadline live
  const calcDeadline = calculateDeclarationDeadline(
    eventDate, 
    daysAllowed, 
    isExtended ? extensionDays : 0
  );

  // Initialize form state
  useEffect(() => {
    if (!isOpen) return;

    if (initialData) {
      setFullName(initialData.fullName || '');
      setIdCardLast4(initialData.idCardLast4 || '');
      setPositionId(initialData.positionId || '');
      setPositionName(initialData.positionName || '');
      setAgency(initialData.agency || '');
      setDepartment(initialData.department || '');
      setPhone(initialData.phone || '');
      setEmail(initialData.email || '');
      setDeclarationType(initialData.declarationType || 'take_office');
      setEventDate(initialData.eventDate || todayStr);
      setDaysAllowed(initialData.daysAllowed || 60);
      setIsExtended(initialData.isExtended || false);
      setExtensionDays(initialData.extensionDays || 30);
      setExtensionApprovedDate(initialData.extensionApprovedDate || '');
      setSubmissionStatus(initialData.submissionStatus || 'pending');
      setActualSubmissionDate(initialData.actualSubmissionDate || '');
      setSubmissionCode(initialData.submissionCode || '');
      setInspectionStatus(initialData.inspectionStatus || 'not_inspected');
      setReportDate(initialData.reportDate || '');
      setReportReferenceNo(initialData.reportReferenceNo || '');
      setCommanderName(initialData.commanderName || '');
      setInspectorNotes(initialData.inspectorNotes || '');
      setChecklist(initialData.checklist || {
        idCardCopy: false,
        spouseInfo: false,
        childrenInfo: false,
        bankAccounts: false,
        investments: false,
        realEstate: false,
        vehicles: false,
        debtsLoans: false,
        taxReturns: false,
        otherValuableAssets: false,
      });
    } else {
      // Reset form
      setFullName('');
      setIdCardLast4('');
      setPhone('');
      setEmail('');
      setSubmissionStatus('pending');
      setActualSubmissionDate('');
      setSubmissionCode('');
      setInspectionStatus('not_inspected');
      setReportDate('');
      setReportReferenceNo('');
      setCommanderName('');
      setInspectorNotes('');
      setChecklist({
        idCardCopy: false,
        spouseInfo: false,
        childrenInfo: false,
        bankAccounts: false,
        investments: false,
        realEstate: false,
        vehicles: false,
        debtsLoans: false,
        taxReturns: false,
        otherValuableAssets: false,
      });

      // Apply preset calculation if passed from calculator
      if (presetCalculation) {
        setDeclarationType(presetCalculation.declarationType);
        setEventDate(presetCalculation.eventDate);
        setDaysAllowed(presetCalculation.daysAllowed);
        setIsExtended(presetCalculation.isExtended);
        setExtensionDays(presetCalculation.extensionDays);
      } else {
        setDeclarationType('take_office');
        setEventDate(todayStr);
        setDaysAllowed(60);
        setIsExtended(false);
      }

      // Apply preset position if passed
      if (presetPosition) {
        setPositionId(presetPosition.id);
        setPositionName(presetPosition.name);
        setAgency(presetPosition.agencyGroup);
      } else {
        setPositionId('');
        setPositionName('');
        setAgency('');
        setDepartment('');
      }
    }
  }, [isOpen, initialData, presetCalculation, presetPosition, todayStr]);

  if (!isOpen) return null;

  // Handle position select dropdown
  const handlePositionSelect = (posId: string) => {
    setPositionId(posId);
    const found = positions.find(p => p.id === posId);
    if (found) {
      setPositionName(found.name);
      setAgency(found.agencyGroup);
      setDaysAllowed(found.defaultDays || 60);
    }
  };

  const handleToggleChecklist = (key: keyof typeof checklist) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSelectAllChecklist = (val: boolean) => {
    setChecklist({
      idCardCopy: val,
      spouseInfo: val,
      childrenInfo: val,
      bankAccounts: val,
      investments: val,
      realEstate: val,
      vehicles: val,
      debtsLoans: val,
      taxReturns: val,
      otherValuableAssets: val,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !positionName.trim() || !agency.trim()) {
      alert('กรุณากรอกชื่อ-นามสกุล, ตำแหน่ง และหน่วยงานให้ครบถ้วน');
      return;
    }

    const finalDeadline = calcDeadline.deadlineString;
    const daysLeft = getDaysRemaining(finalDeadline);

    let calculatedSubmissionStatus = submissionStatus;
    if (actualSubmissionDate && submissionStatus !== 'submitted') {
      calculatedSubmissionStatus = 'submitted';
    } else if (!actualSubmissionDate && daysLeft < 0 && submissionStatus !== 'submitted') {
      calculatedSubmissionStatus = 'overdue';
    } else if (isExtended && submissionStatus === 'pending') {
      calculatedSubmissionStatus = 'extended';
    }

    const record: DeclarantRecord = {
      id: initialData?.id || `dec-${Date.now()}`,
      fullName: fullName.trim(),
      idCardLast4: idCardLast4.trim() || undefined,
      positionId: positionId || undefined,
      positionName: positionName.trim(),
      agency: agency.trim(),
      department: department.trim() || undefined,
      phone: phone.trim(),
      email: email.trim() || undefined,
      declarationType,
      eventDate,
      daysAllowed,
      isExtended,
      extensionDays: isExtended ? extensionDays : 0,
      extensionApprovedDate: isExtended ? extensionApprovedDate : undefined,
      deadlineDate: finalDeadline,
      actualSubmissionDate: actualSubmissionDate || undefined,
      submissionCode: submissionCode.trim() || undefined,
      submissionStatus: calculatedSubmissionStatus,
      inspectionStatus,
      reportDate: reportDate || undefined,
      reportReferenceNo: reportReferenceNo.trim() || undefined,
      commanderName: commanderName.trim() || undefined,
      inspectorNotes: inspectorNotes.trim() || undefined,
      checklist,
      createdAt: initialData?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onSave(record);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-2 sm:p-4 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full my-6 shadow-2xl border border-slate-200 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-900 text-white rounded-t-2xl shrink-0">
          <div>
            <h2 className="text-lg font-bold">
              {initialData ? 'แก้ไขข้อมูลผู้มีหน้าที่ยื่นบัญชี' : 'บันทึกผู้มีหน้าที่ยื่นบัญชีใหม่'}
            </h2>
            <p className="text-xs text-slate-400">
              บันทึกข้อมูลรายบุคคล คำนวณวันหมดเขต และติดตามกระบวนการตรวจสอบ
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Section 1: Personal & Position Info */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 tracking-wide mb-3 flex items-center gap-1.5 border-b border-slate-200 pb-2">
              <User className="w-4 h-4 text-blue-600" />
              ๑. ข้อมูลผู้ยื่นและตำแหน่งหน้าที่
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  ชื่อ-นามสกุล *
                </label>
                <input
                  type="text"
                  required
                  placeholder="เช่น นายวิชัย สุวรรณรัตน์"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  เลขบัตร ปชช. 4 หลักท้าย (เพื่อการค้นหา)
                </label>
                <input
                  type="text"
                  maxLength={4}
                  placeholder="เช่น 4589"
                  value={idCardLast4}
                  onChange={(e) => setIdCardLast4(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none font-mono"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-800 mb-1">
                  เลือกจากฐานข้อมูลตำแหน่ง ป.ป.ช. (มีผลต่อการกรอกอัตโนมัติ)
                </label>
                <select
                  value={positionId}
                  onChange={(e) => handlePositionSelect(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-xs sm:text-sm"
                >
                  <option value="">-- หรือพิมพ์ตำแหน่งเองด้านล่าง --</option>
                  {positions.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} [{p.agencyGroup}]
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  ชื่อตำแหน่ง *
                </label>
                <input
                  type="text"
                  required
                  placeholder="เช่น นายกเทศมนตรีตำบลหนองหญ้าแพรก"
                  value={positionName}
                  onChange={(e) => setPositionName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  หน่วยงาน / สังกัด *
                </label>
                <input
                  type="text"
                  required
                  placeholder="เช่น เทศบาลตำบลหนองหญ้าแพรก"
                  value={agency}
                  onChange={(e) => setAgency(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  เบอร์โทรศัพท์ติดต่อ
                </label>
                <input
                  type="tel"
                  placeholder="เช่น 081-234-5678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  อีเมลติดต่อ
                </label>
                <input
                  type="email"
                  placeholder="เช่น officer@agency.go.th"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Declaration Dates & Calculation */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 tracking-wide mb-3 flex items-center gap-1.5 border-b border-slate-200 pb-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              ๒. ประเภทการยื่นและวันครบกำหนด (คำนวณอัตโนมัติ)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  ประเภทการยื่นบัญชี *
                </label>
                <select
                  value={declarationType}
                  onChange={(e) => setDeclarationType(e.target.value as DeclarationType)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="take_office">เข้ารับตำแหน่ง (ภายใน 60 วัน)</option>
                  <option value="vacate_office">พ้นจากตำแหน่ง (ภายใน 60 วัน)</option>
                  <option value="vacate_1year">พ้นจากตำแหน่งมาแล้วครบ 1 ปี (ภายใน 60 วัน)</option>
                  <option value="every_3years">ดำรงตำแหน่งครบ 3 ปี (ยื่นทุก 3 ปี)</option>
                  <option value="annual">ประจำปี / กำหนดเฉพาะ</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  วันที่เริ่มมีหน้าที่ (วันรับตำแหน่ง/พ้นตำแหน่ง) *
                </label>
                <input
                  type="date"
                  required
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <div className="text-[11px] text-slate-500 mt-1">
                  {formatThaiDateFull(eventDate)}
                </div>
              </div>
            </div>

            {/* Extension Setting */}
            <div className="mt-3 p-3 bg-amber-50/80 border border-amber-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="formIsExtended"
                    checked={isExtended}
                    onChange={(e) => setIsExtended(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                  />
                  <label htmlFor="formIsExtended" className="text-xs sm:text-sm font-semibold text-amber-950 cursor-pointer">
                    ขอขยายระยะเวลายื่น (+30 วัน)
                  </label>
                </div>
                {isExtended && (
                  <span className="text-xs font-mono px-2 py-0.5 bg-amber-200 text-amber-900 rounded font-semibold">
                    รวมเป็น 90 วัน
                  </span>
                )}
              </div>

              {isExtended && (
                <div className="pt-2 border-t border-amber-200/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-amber-900 font-medium mb-1">
                      วันที่อนุมัติให้ขยายเวลา
                    </label>
                    <input
                      type="date"
                      value={extensionApprovedDate}
                      onChange={(e) => setExtensionApprovedDate(e.target.value)}
                      className="w-full px-2 py-1.5 bg-white border border-amber-300 rounded text-slate-900"
                    />
                  </div>
                  <div className="text-[11px] text-amber-800 flex items-center">
                    การขยายเวลาต้องได้รับอนุมัติจากผู้มีอำนาจก่อนครบกำหนดเดิม
                  </div>
                </div>
              )}
            </div>

            {/* Calculated Deadline Display Banner */}
            <div className="mt-3 p-3.5 bg-slate-900 rounded-xl text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <div className="text-slate-400">วันครบกำหนดยื่นสุดท้าย (กรณีตรงวันหยุด ให้นับวันทำการก่อนวันสิ้นสุด):</div>
                <div className="text-base sm:text-lg font-bold text-blue-400 font-mono">
                  {formatThaiDateFull(calcDeadline.deadlineString)}
                </div>
                {calcDeadline.wasPostponed && (
                  <div className="text-[11px] text-amber-300 font-sans mt-0.5">
                    (วันสิ้นสุดเดิมตรงกับวันหยุด เลื่อนขึ้นมาเป็นวันทำการก่อนหน้า)
                  </div>
                )}
              </div>
              <div className="text-right sm:border-l sm:border-slate-800 sm:pl-4">
                <div className="text-slate-400">สถานะกำหนด:</div>
                <div className="font-semibold text-white">
                  {getDaysRemaining(calcDeadline.deadlineString) < 0 ? (
                    <span className="text-rose-400">เกินกำหนด {Math.abs(getDaysRemaining(calcDeadline.deadlineString))} วัน</span>
                  ) : (
                    <span>เหลือเวลาอีก {getDaysRemaining(calcDeadline.deadlineString)} วัน</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Actual Submission Details */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 tracking-wide mb-3 flex items-center gap-1.5 border-b border-slate-200 pb-2">
              <FileText className="w-4 h-4 text-blue-600" />
              ๓. สถานะการยื่นบัญชีจริง
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  สถานะการยื่น
                </label>
                <select
                  value={submissionStatus}
                  onChange={(e) => setSubmissionStatus(e.target.value as SubmissionStatus)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="pending">ยังไม่ยื่น (อยู่ระหว่างเตรียมเอกสาร)</option>
                  <option value="submitted">ยื่นบัญชีเรียบร้อยแล้ว</option>
                  <option value="extended">ขอขยายเวลา (+30 วัน)</option>
                  <option value="overdue">พ้นกำหนดเวลายื่น (เกินกำหนด)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  วันที่ยื่นจริง (ถ้ามี)
                </label>
                <input
                  type="date"
                  value={actualSubmissionDate}
                  onChange={(e) => {
                    setActualSubmissionDate(e.target.value);
                    if (e.target.value && submissionStatus === 'pending') {
                      setSubmissionStatus('submitted');
                    }
                  }}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  เลขรับเอกสาร / เลขสารบบ
                </label>
                <input
                  type="text"
                  placeholder="เช่น ปช-69/0412"
                  value={submissionCode}
                  onChange={(e) => setSubmissionCode(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none font-mono"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Document Checklist (9 Categories) */}
          <div>
            <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
              <h3 className="text-xs font-bold text-slate-900 tracking-wide flex items-center gap-1.5">
                <CheckSquare className="w-4 h-4 text-blue-600" />
                ๔. รายการเอกสารตรวจสอบความครบถ้วน (๙ หมวดหลัก)
              </h3>
              <div className="flex items-center gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => handleSelectAllChecklist(true)}
                  className="text-blue-600 hover:underline"
                >
                  เลือกทั้งหมด
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => handleSelectAllChecklist(false)}
                  className="text-slate-500 hover:underline"
                >
                  ยกเลิกทั้งหมด
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {[
                { key: 'idCardCopy', label: '๑. สำเนาบัตร ปชช. / ทะเบียนบ้าน ผู้ยื่น' },
                { key: 'spouseInfo', label: '๒. ข้อมูลคู่สมรส (นิตินัย/พฤตินัย)' },
                { key: 'childrenInfo', label: '๓. บุตรที่ยังไม่บรรลุนิติภาวะ' },
                { key: 'bankAccounts', label: '๔. บัญชีเงินฝากธนาคาร/สถาบันการเงิน' },
                { key: 'investments', label: '๕. เงินลงทุน หุ้น กองทุนรวม พันธบัตร' },
                { key: 'realEstate', label: '๖. ที่ดิน โรงเรือนและสิ่งปลูกสร้าง' },
                { key: 'vehicles', label: '๗. ยานพาหนะ (รถยนต์/จยย./เรือ)' },
                { key: 'debtsLoans', label: '๘. หนี้สินและภาระผูกพัน' },
                { key: 'taxReturns', label: '๙. สำเนาแบบแสดงภาษีเงินได้บุคคลธรรมดา' },
                { key: 'otherValuableAssets', label: '๑๐. ทรัพย์สินอื่น (รวมมูลค่าเกิน 200,000 บ.)' },
              ].map(item => (
                <label
                  key={item.key}
                  className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-colors ${
                    checklist[item.key as keyof typeof checklist]
                      ? 'bg-emerald-50/60 border-emerald-300 text-emerald-950 font-medium'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checklist[item.key as keyof typeof checklist]}
                    onChange={() => handleToggleChecklist(item.key as keyof typeof checklist)}
                    className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Section 5: Inspection & Commander Reporting */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 tracking-wide mb-3 flex items-center gap-1.5 border-b border-slate-200 pb-2">
              <Clock className="w-4 h-4 text-blue-600" />
              ๕. สถานะการตรวจสอบและเสนอรายงานผู้บังคับบัญชา
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  สถานะการตรวจ & เสนอรายงาน *
                </label>
                <select
                  value={inspectionStatus}
                  onChange={(e) => setInspectionStatus(e.target.value as InspectionStatus)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                >
                  <option value="not_inspected">ยังไม่เริ่มตรวจสอบ</option>
                  <option value="in_progress">อยู่ระหว่างตรวจสอบเอกสาร</option>
                  <option value="completed_valid">ตรวจสอบแล้ว ถูกต้องครบถ้วน</option>
                  <option value="clarification_needed">มีข้อสังเกต / รอเอกสารชี้แจงเพิ่ม</option>
                  <option value="reported_to_commander">เสนอรายงานผู้บังคับบัญชาแล้ว</option>
                  <option value="commander_acknowledged">ผู้บังคับบัญชาลงนามรับทราบแล้ว</option>
                  <option value="forwarded_to_nacc">ส่งต่อ ป.ป.ช. เรียบร้อยแล้ว</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  วันที่เสนอรายงานผู้บังคับบัญชา
                </label>
                <input
                  type="date"
                  value={reportDate}
                  onChange={(e) => setReportDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  เลขที่บันทึกข้อความเสนอรายงาน
                </label>
                <input
                  type="text"
                  placeholder="เช่น ที่ มท 0208/ว 221"
                  value={reportReferenceNo}
                  onChange={(e) => setReportReferenceNo(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  ชื่อผู้บังคับบัญชาที่เสนอรายงาน
                </label>
                <input
                  type="text"
                  placeholder="เช่น ปลัดเทศบาล / ผู้ว่าราชการจังหวัด"
                  value={commanderName}
                  onChange={(e) => setCommanderName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-800 mb-1">
                  บันทึกข้อความผลการตรวจสอบ / ข้อสังเกตเพิ่มเติม
                </label>
                <textarea
                  rows={2}
                  value={inspectorNotes}
                  onChange={(e) => setInspectorNotes(e.target.value)}
                  placeholder="เช่น โทรแจ้งเตือนแล้ว 3 ครั้ง หรือ อยู่ระหว่างรอสำเนาโฉนดที่ดินจากสำนักงานที่ดิน..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>บันทึกข้อมูลผู้มีหน้าที่ยื่น</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
