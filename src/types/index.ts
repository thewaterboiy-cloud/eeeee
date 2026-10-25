export type DeclarationType = 
  | 'take_office'     // เข้ารับตำแหน่ง (ภายใน 60 วัน)
  | 'vacate_office'   // พ้นจากตำแหน่ง (ภายใน 60 วัน)
  | 'vacate_1year'    // พ้นจากตำแหน่งมาแล้วเป็นเวลา 1 ปี (ภายใน 60 วัน)
  | 'every_3years'    // ยื่นครบ 3 ปี / ทุก 3 ปีที่ดำรงตำแหน่ง (ภายใน 30 หรือ 60 วัน)
  | 'annual';         // ประจำปี / กำหนดเฉพาะ

export type SubmissionStatus = 
  | 'pending'    // ยังไม่ยื่น
  | 'submitted'  // ยื่นแล้ว
  | 'extended'   // ขอขยายเวลา (+30 วัน)
  | 'overdue';   // พ้นกำหนด / เกินกำหนด

export type InspectionStatus = 
  | 'not_inspected'          // ยังไม่เริ่มตรวจสอบ
  | 'in_progress'            // อยู่ระหว่างตรวจสอบเอกสาร
  | 'completed_valid'        // ตรวจสอบแล้ว ถูกต้องครบถ้วน
  | 'clarification_needed'   // มีข้อสังเกต / ขอเอกสารชี้แจงเพิ่ม
  | 'reported_to_commander'  // เสนอรายงานผู้บังคับบัญชาแล้ว
  | 'commander_acknowledged' // ผู้บังคับบัญชาลงนามรับทราบแล้ว
  | 'forwarded_to_nacc';     // ส่งต่อ ป.ป.ช. / หน่วยงานตรวจสอบแล้ว

export interface PositionCategory {
  id: string;
  name: string;
  description: string;
  color: string;
}

export interface PositionItem {
  id: string;
  category: string;
  name: string;
  agencyGroup: string;
  statutoryBasis: string; // เช่น ม.102 พ.ร.ป. ป.ป.ช. 2561
  defaultDays: number;    // ปกติ 60 วัน
  submissionTarget: string; // ป.ป.ช. / ส่วนราชการต้นสังกัด / รัฐสภา
  description: string;
  isCustom?: boolean;
}

export interface InspectionChecklist {
  idCardCopy: boolean;        // สำเนาบัตร ปชช. / ทะเบียนบ้าน ผู้ยื่น
  spouseInfo: boolean;        // ข้อมูลและเอกสารคู่สมรส (นิตินัย/พฤตินัย)
  childrenInfo: boolean;      // ข้อมูลบุตรที่ยังไม่บรรลุนิติภาวะ
  bankAccounts: boolean;      // บัญชีเงินฝากธนาคาร / สถาบันการเงิน
  investments: boolean;       // เงินลงทุน / หุ้น / กองทุน
  realEstate: boolean;        // ที่ดิน / โรงเรือนและสิ่งปลูกสร้าง
  vehicles: boolean;          // ยานพาหนะ (รถยนต์/จักรยานยนต์/เรือ)
  debtsLoans: boolean;        // หนี้สิน (เงินเบิกเกินบัญชี/เงินกู้)
  taxReturns: boolean;        // สำเนาแบบแสดงรายการภาษีเงินได้บุคคลธรรมดา
  otherValuableAssets: boolean; // ทรัพย์สินอื่น (มูลค่ารวมเกินเกณฑ์)
}

export interface DeclarantRecord {
  id: string;
  fullName: string;
  idCardLast4?: string;
  positionId?: string;
  positionName: string;
  agency: string;
  department?: string;
  phone: string;
  email?: string;
  declarationType: DeclarationType;
  eventDate: string;           // วันที่เข้ารับ/พ้นตำแหน่ง (YYYY-MM-DD)
  daysAllowed: number;         // 60 วัน
  isExtended: boolean;         // มีการขอขยายเวลาหรือไม่ (+30 วัน)
  extensionDays: number;       // 0 หรือ 30 วัน
  extensionApprovedDate?: string;
  deadlineDate: string;        // วันที่ครบกำหนด (YYYY-MM-DD) คำนวณอัตโนมัติ
  actualSubmissionDate?: string; // วันที่ยื่นบัญชีจริง
  submissionCode?: string;     // เลขที่รับเอกสาร / เลขสารบบ
  submissionStatus: SubmissionStatus;
  inspectionStatus: InspectionStatus;
  reportDate?: string;         // วันที่เสนอรายงานผู้บังคับบัญชา
  reportReferenceNo?: string;  // เลขที่หนังสือบันทึกข้อความเสนอรายงาน
  commanderName?: string;      // ชื่อผู้บังคับบัญชาที่เสนอรายงาน
  inspectorNotes?: string;     // บันทึกผลการตรวจของผู้รับผิดชอบ
  checklist: InspectionChecklist;
  createdAt: string;
  updatedAt: string;
}
