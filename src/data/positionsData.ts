import { PositionItem, DeclarantRecord } from '../types';

export const POSITION_CATEGORIES = [
  { id: 'all', name: 'ทุกหมวดหมู่', count: 0 },
  { id: 'political', name: '1. ตำแหน่งทางการเมือง', count: 0 },
  { id: 'independent', name: '2. ตุลาการและองค์กรอิสระ', count: 0 },
  { id: 'high_civil', name: '3. ผู้ดำรงตำแหน่งระดับสูง (ข้าราชการ/ทหาร/ตร.)', count: 0 },
  { id: 'local_gov', name: '4. ผู้บริหารและสมาชิกสภาท้องถิ่น', count: 0 },
  { id: 'state_enterprise', name: '5. รัฐวิสาหกิจและองค์การมหาชน', count: 0 },
  { id: 'specific_risk', name: '6. ตำแหน่งเฉพาะ/หน่วยงานความเสี่ยงสูง', count: 0 },
];

export const INITIAL_POSITIONS: PositionItem[] = [
  // หมวดที่ 1: ตำแหน่งทางการเมือง
  {
    id: 'pos-101',
    category: 'political',
    name: 'นายกรัฐมนตรี / รองนายกรัฐมนตรี / รัฐมนตรี',
    agencyGroup: 'คณะรัฐมนตรี',
    statutoryBasis: 'พ.ร.ป. ป.ป.ช. 2561 มาตรา 102 (1)',
    defaultDays: 60,
    submissionTarget: 'คณะกรรมการ ป.ป.ช.',
    description: 'ต้องยื่นเมื่อเข้ารับตำแหน่ง, พ้นจากตำแหน่ง และพ้นจากตำแหน่งมาแล้วเป็นเวลา 1 ปี เปิดเผยต่อสาธารณะ'
  },
  {
    id: 'pos-102',
    category: 'political',
    name: 'สมาชิกสภาผู้แทนราษฎร (ส.ส.)',
    agencyGroup: 'รัฐสภา',
    statutoryBasis: 'พ.ร.ป. ป.ป.ช. 2561 มาตรา 102 (2)',
    defaultDays: 60,
    submissionTarget: 'คณะกรรมการ ป.ป.ช.',
    description: 'ยื่นเมื่อเข้ารับตำแหน่ง, พ้นจากตำแหน่ง และพ้นจากตำแหน่งครบ 1 ปี'
  },
  {
    id: 'pos-103',
    category: 'political',
    name: 'สมาชิกวุฒิสภา (ส.ว.)',
    agencyGroup: 'รัฐสภา',
    statutoryBasis: 'พ.ร.ป. ป.ป.ช. 2561 มาตรา 102 (2)',
    defaultDays: 60,
    submissionTarget: 'คณะกรรมการ ป.ป.ช.',
    description: 'ยื่นเมื่อเข้ารับตำแหน่ง, พ้นจากตำแหน่ง และพ้นจากตำแหน่งครบ 1 ปี'
  },
  {
    id: 'pos-104',
    category: 'political',
    name: 'ข้าราชการการเมือง (ที่ปรึกษานายกฯ / เลขานุการ รมต.)',
    agencyGroup: 'สำนักนายกรัฐมนตรีและกระทรวงต่างๆ',
    statutoryBasis: 'พ.ร.ป. ป.ป.ช. 2561 มาตรา 102 (1)',
    defaultDays: 60,
    submissionTarget: 'คณะกรรมการ ป.ป.ช.',
    description: 'ยื่นเมื่อเข้ารับตำแหน่งและพ้นจากตำแหน่ง'
  },

  // หมวดที่ 2: ตุลาการและองค์กรอิสระ
  {
    id: 'pos-201',
    category: 'independent',
    name: 'ประธานและตุลาการศาลรัฐธรรมนูญ',
    agencyGroup: 'ศาลรัฐธรรมนูญ',
    statutoryBasis: 'พ.ร.ป. ป.ป.ช. 2561 มาตรา 102 (3)',
    defaultDays: 60,
    submissionTarget: 'คณะกรรมการ ป.ป.ช.',
    description: 'ผู้ดำรงตำแหน่งในองค์กรอิสระ ยื่นเมื่อเข้ารับและพ้นจากตำแหน่ง'
  },
  {
    id: 'pos-202',
    category: 'independent',
    name: 'ประธานและกรรมการการเลือกตั้ง (กกต.)',
    agencyGroup: 'สำนักงาน กกต.',
    statutoryBasis: 'พ.ร.ป. ป.ป.ช. 2561 มาตรา 102 (4)',
    defaultDays: 60,
    submissionTarget: 'คณะกรรมการ ป.ป.ช.',
    description: 'ยื่นเมื่อเข้ารับตำแหน่งและพ้นจากตำแหน่ง'
  },
  {
    id: 'pos-203',
    category: 'independent',
    name: 'ผู้ตรวจการแผ่นดิน',
    agencyGroup: 'สำนักงานผู้ตรวจการแผ่นดิน',
    statutoryBasis: 'พ.ร.ป. ป.ป.ช. 2561 มาตรา 102 (5)',
    defaultDays: 60,
    submissionTarget: 'คณะกรรมการ ป.ป.ช.',
    description: 'ยื่นเมื่อเข้ารับตำแหน่งและพ้นจากตำแหน่ง'
  },
  {
    id: 'pos-204',
    category: 'independent',
    name: 'ประธานและกรรมการ ป.ป.ช.',
    agencyGroup: 'สำนักงาน ป.ป.ช.',
    statutoryBasis: 'พ.ร.ป. ป.ป.ช. 2561 มาตรา 102 (6)',
    defaultDays: 60,
    submissionTarget: 'ประธานวุฒิสภา',
    description: 'ยื่นต่อประธานวุฒิสภา เมื่อเข้ารับและพ้นจากตำแหน่ง'
  },
  {
    id: 'pos-205',
    category: 'independent',
    name: 'ประธานและกรรมการ คตง. / ผู้ว่าการตรวจเงินแผ่นดิน',
    agencyGroup: 'สำนักงานการตรวจเงินแผ่นดิน (สตง.)',
    statutoryBasis: 'พ.ร.ป. ป.ป.ช. 2561 มาตรา 102 (7)',
    defaultDays: 60,
    submissionTarget: 'คณะกรรมการ ป.ป.ช.',
    description: 'ยื่นเมื่อเข้ารับตำแหน่งและพ้นจากตำแหน่ง'
  },

  // หมวดที่ 3: ผู้ดำรงตำแหน่งระดับสูง
  {
    id: 'pos-301',
    category: 'high_civil',
    name: 'ปลัดกระทรวง / รองปลัดกระทรวง',
    agencyGroup: 'ส่วนราชการระดับกระทรวง',
    statutoryBasis: 'พ.ร.ป. ป.ป.ช. 2561 มาตรา 102 (9)',
    defaultDays: 60,
    submissionTarget: 'คณะกรรมการ ป.ป.ช.',
    description: 'ข้าราชการพลเรือนระดับบริหารสูง ยื่นเมื่อเข้ารับและพ้นจากตำแหน่ง'
  },
  {
    id: 'pos-302',
    category: 'high_civil',
    name: 'อธิบดี / ผู้ว่าราชการจังหวัด / เลขาธิการ',
    agencyGroup: 'กรม / จังหวัด / สำนักงานเทียบเท่า',
    statutoryBasis: 'พ.ร.ป. ป.ป.ช. 2561 มาตรา 102 (9)',
    defaultDays: 60,
    submissionTarget: 'คณะกรรมการ ป.ป.ช.',
    description: 'หัวหน้าส่วนราชการระดับกรมและผู้ว่าราชการจังหวัด'
  },
  {
    id: 'pos-303',
    category: 'high_civil',
    name: 'เอกอัครราชทูตประจำสถานเอกอัครราชทูต',
    agencyGroup: 'กระทรวงการต่างประเทศ',
    statutoryBasis: 'พ.ร.ป. ป.ป.ช. 2561 มาตรา 102 (9)',
    defaultDays: 60,
    submissionTarget: 'คณะกรรมการ ป.ป.ช.',
    description: 'หัวหน้าคณะผู้แทนทางการทูต'
  },
  {
    id: 'pos-304',
    category: 'high_civil',
    name: 'ผู้บัญชาการทหารสูงสุด / ผบ.ทบ. / ผบ.ทร. / ผบ.ทอ.',
    agencyGroup: 'กระทรวงกลาโหม / กองทัพไทย',
    statutoryBasis: 'พ.ร.ป. ป.ป.ช. 2561 มาตรา 102 (9)',
    defaultDays: 60,
    submissionTarget: 'คณะกรรมการ ป.ป.ช.',
    description: 'ผู้บัญชาการเหล่าทัพ ยื่นเมื่อเข้ารับและพ้นจากตำแหน่ง'
  },
  {
    id: 'pos-305',
    category: 'high_civil',
    name: 'ผู้บัญชาการตำรวจแห่งชาติ (ผบ.ตร.) / จเรตำรวจแห่งชาติ',
    agencyGroup: 'สำนักงานตำรวจแห่งชาติ',
    statutoryBasis: 'พ.ร.ป. ป.ป.ช. 2561 มาตรา 102 (9)',
    defaultDays: 60,
    submissionTarget: 'คณะกรรมการ ป.ป.ช.',
    description: 'ผู้บังคับบัญชาระดับสูงของสำนักงานตำรวจแห่งชาติ'
  },
  {
    id: 'pos-306',
    category: 'high_civil',
    name: 'ประธานศาลฎีกา / ผู้พิพากษาศาลฎีกา / อธิบดีผู้พิพากษา',
    agencyGroup: 'สำนักงานศาลยุติธรรม',
    statutoryBasis: 'พ.ร.ป. ป.ป.ช. 2561 มาตรา 102 (9)',
    defaultDays: 60,
    submissionTarget: 'คณะกรรมการ ป.ป.ช.',
    description: 'ข้าราชการตุลาการศาลยุติธรรมตามที่ ป.ป.ช. กำหนด'
  },
  {
    id: 'pos-307',
    category: 'high_civil',
    name: 'อัยการสูงสุด / รองอัยการสูงสุด / อธิบดีอัยการ',
    agencyGroup: 'สำนักงานอัยการสูงสุด',
    statutoryBasis: 'พ.ร.ป. ป.ป.ช. 2561 มาตรา 102 (9)',
    defaultDays: 60,
    submissionTarget: 'คณะกรรมการ ป.ป.ช.',
    description: 'ข้าราชการฝ่ายอัยการระดับสูง'
  },

  // หมวดที่ 4: ผู้บริหารและสมาชิกสภาท้องถิ่น
  {
    id: 'pos-401',
    category: 'local_gov',
    name: 'นายกองค์การบริหารส่วนจังหวัด (นายก อบจ.)',
    agencyGroup: 'องค์กรปกครองส่วนท้องถิ่น (อบจ.)',
    statutoryBasis: 'พ.ร.ป. ป.ป.ช. 2561 มาตรา 102 (8)',
    defaultDays: 60,
    submissionTarget: 'คณะกรรมการ ป.ป.ช.',
    description: 'ผู้บริหารสูงสุดของ อบจ. ยื่นเมื่อรับตำแหน่ง, พ้นตำแหน่ง และพ้นครบ 1 ปี'
  },
  {
    id: 'pos-402',
    category: 'local_gov',
    name: 'นายกเทศมนตรีนคร / นายกเทศมนตรีเมือง / นายกเทศมนตรีตำบล',
    agencyGroup: 'องค์กรปกครองส่วนท้องถิ่น (เทศบาล)',
    statutoryBasis: 'พ.ร.ป. ป.ป.ช. 2561 มาตรา 102 (8)',
    defaultDays: 60,
    submissionTarget: 'คณะกรรมการ ป.ป.ช.',
    description: 'นายกเทศมนตรีทุกระดับ ยื่นเมื่อรับตำแหน่ง, พ้นตำแหน่ง และพ้นครบ 1 ปี'
  },
  {
    id: 'pos-403',
    category: 'local_gov',
    name: 'นายกองค์การบริหารส่วนตำบล (นายก อบต.)',
    agencyGroup: 'องค์กรปกครองส่วนท้องถิ่น (อบต.)',
    statutoryBasis: 'พ.ร.ป. ป.ป.ช. 2561 มาตรา 102 (8)',
    defaultDays: 60,
    submissionTarget: 'คณะกรรมการ ป.ป.ช.',
    description: 'ผู้บริหารสูงสุดของ อบต.'
  },
  {
    id: 'pos-404',
    category: 'local_gov',
    name: 'ผู้ว่าราชการกรุงเทพมหานคร / สมาชิกสภากรุงเทพมหานคร (ส.ก.)',
    agencyGroup: 'กรุงเทพมหานคร (องค์กรปกครองส่วนท้องถิ่นรูปแบบพิเศษ)',
    statutoryBasis: 'พ.ร.ป. ป.ป.ช. 2561 มาตรา 102 (8)',
    defaultDays: 60,
    submissionTarget: 'คณะกรรมการ ป.ป.ช.',
    description: 'ยื่นเมื่อเข้ารับตำแหน่ง, พ้นจากตำแหน่ง และพ้นครบ 1 ปี'
  },
  {
    id: 'pos-405',
    category: 'local_gov',
    name: 'นายกเมืองพัทยา / สมาชิกสภาเมืองพัทยา',
    agencyGroup: 'เมืองพัทยา',
    statutoryBasis: 'พ.ร.ป. ป.ป.ช. 2561 มาตรา 102 (8)',
    defaultDays: 60,
    submissionTarget: 'คณะกรรมการ ป.ป.ช.',
    description: 'ผู้บริหารและสมาชิกสภาองค์กรปกครองส่วนท้องถิ่นรูปแบบพิเศษ'
  },
  {
    id: 'pos-406',
    category: 'local_gov',
    name: 'สมาชิกสภา อบจ. / สมาชิกสภาเทศบาล / สมาชิกสภา อบต.',
    agencyGroup: 'สภาองค์กรปกครองส่วนท้องถิ่น',
    statutoryBasis: 'พ.ร.ป. ป.ป.ช. 2561 มาตรา 102 (8)',
    defaultDays: 60,
    submissionTarget: 'คณะกรรมการ ป.ป.ช.',
    description: 'สมาชิกสภาท้องถิ่น ยื่นเมื่อเข้ารับและพ้นจากตำแหน่ง'
  },

  // หมวดที่ 5: รัฐวิสาหกิจและองค์การมหาชน
  {
    id: 'pos-501',
    category: 'state_enterprise',
    name: 'ประธานกรรมการ / กรรมการรัฐวิสาหกิจ',
    agencyGroup: 'รัฐวิสาหกิจทุกแห่ง (ปตท., กฟผ., ออมสิน, ทอท. ฯลฯ)',
    statutoryBasis: 'พ.ร.ป. ป.ป.ช. 2561 มาตรา 102 (9)',
    defaultDays: 60,
    submissionTarget: 'คณะกรรมการ ป.ป.ช.',
    description: 'กรรมการในคณะกรรมการรัฐวิสาหกิจ ยื่นเมื่อรับตำแหน่งและพ้นตำแหน่ง'
  },
  {
    id: 'pos-502',
    category: 'state_enterprise',
    name: 'ผู้ว่าการ / กรรมการผู้จัดการใหญ่ / ผู้บริหารสูงสุดของรัฐวิสาหกิจ',
    agencyGroup: 'รัฐวิสาหกิจทุกแห่ง',
    statutoryBasis: 'พ.ร.ป. ป.ป.ช. 2561 มาตรา 102 (9)',
    defaultDays: 60,
    submissionTarget: 'คณะกรรมการ ป.ป.ช.',
    description: 'ผู้บริหารสูงสุดของหน่วยงานรัฐวิสาหกิจ'
  },
  {
    id: 'pos-503',
    category: 'state_enterprise',
    name: 'ประธานและกรรมการองค์การมหาชน / ผู้อำนวยการองค์การมหาชน',
    agencyGroup: 'องค์การมหาชนตาม พ.ร.บ. องค์การมหาชน',
    statutoryBasis: 'ประกาศคณะกรรมการ ป.ป.ช.',
    defaultDays: 60,
    submissionTarget: 'คณะกรรมการ ป.ป.ช.',
    description: 'บอร์ดและผู้อำนวยการองค์การมหาชนทุกแห่ง'
  },
  {
    id: 'pos-504',
    category: 'state_enterprise',
    name: 'อธิการบดีมหาวิทยาลัยในกำกับของรัฐ / มหาวิทยาลัยของรัฐ',
    agencyGroup: 'สถาบันอุดมศึกษาของรัฐ',
    statutoryBasis: 'พ.ร.ป. ป.ป.ช. 2561 มาตรา 102 (9)',
    defaultDays: 60,
    submissionTarget: 'คณะกรรมการ ป.ป.ช.',
    description: 'ผู้บริหารสูงสุดของสถาบันอุดมศึกษาของรัฐ'
  },

  // หมวดที่ 6: ตำแหน่งเฉพาะ/หน่วยงานความเสี่ยงสูง
  {
    id: 'pos-601',
    category: 'specific_risk',
    name: 'ผู้อำนวยการสำนัก/กอง ที่มีอำนาจจัดซื้อจัดจ้างเกิน 50 ล้านบาท',
    agencyGroup: 'ส่วนราชการระดับกระทรวง/กรม',
    statutoryBasis: 'พ.ร.ป. ป.ป.ช. 2561 มาตรา 130 / ประกาศ ป.ป.ช.',
    defaultDays: 60,
    submissionTarget: 'ส่วนราชการต้นสังกัด และ ป.ป.ช.',
    description: 'เจ้าพนักงานของรัฐในตำแหน่งที่มีความเสี่ยงต่อการขัดกันแห่งผลประโยชน์'
  },
  {
    id: 'pos-602',
    category: 'specific_risk',
    name: 'เจ้าพนักงานที่ดินจังหวัด / หัวหน้าฝ่ายทะเบียนสิทธิและนิติกรรม',
    agencyGroup: 'กรมที่ดิน กระทรวงมหาดไทย',
    statutoryBasis: 'ประกาศ ป.ป.ช. เรื่อง กำหนดตำแหน่งที่ต้องยื่น',
    defaultDays: 60,
    submissionTarget: 'ส่วนราชการต้นสังกัด',
    description: 'เจ้าหน้าที่ผู้ใช้อำนาจพิจารณาอนุมัติออกเอกสารสิทธิที่ดิน'
  },
  {
    id: 'pos-603',
    category: 'specific_risk',
    name: 'สรรพากรพื้นที่ / ด่านศุลกากร / สรรพสามิตพื้นที่',
    agencyGroup: 'กระทรวงการคลัง',
    statutoryBasis: 'ประกาศ ป.ป.ช. เรื่อง กำหนดตำแหน่งที่ต้องยื่น',
    defaultDays: 60,
    submissionTarget: 'ส่วนราชการต้นสังกัด',
    description: 'เจ้าพนักงานผู้มีอำนาจประเมินและจัดเก็บภาษีอากร'
  },
];

// Helper to get today's formatted string in Bangkok local time
function getRelativeDate(daysOffset: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysOffset);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export const SAMPLE_DECLARANTS: DeclarantRecord[] = [
  {
    id: 'dec-001',
    fullName: 'นายวิชัย สุวรรณรัตน์',
    idCardLast4: '4589',
    positionId: 'pos-402',
    positionName: 'นายกเทศมนตรีตำบลหนองหญ้าแพรก',
    agency: 'เทศบาลตำบลหนองหญ้าแพรก',
    department: 'สำนักปลัดเทศบาล',
    phone: '081-234-5678',
    email: 'wichai.suw@localgov.mail.go.th',
    declarationType: 'take_office',
    eventDate: getRelativeDate(-45), // 45 days ago
    daysAllowed: 60,
    isExtended: false,
    extensionDays: 0,
    deadlineDate: getRelativeDate(15), // 15 days remaining (urgent/warning)
    submissionStatus: 'pending',
    inspectionStatus: 'not_inspected',
    checklist: {
      idCardCopy: true,
      spouseInfo: false,
      childrenInfo: false,
      bankAccounts: false,
      investments: false,
      realEstate: false,
      vehicles: false,
      debtsLoans: false,
      taxReturns: false,
      otherValuableAssets: false,
    },
    inspectorNotes: 'โทรแจ้งเตือนเมื่อ 3 วันก่อน เจ้าตัวแจ้งว่ากำลังรวบรวมรายการบัญชีเงินฝากจากธนาคารพาณิชย์',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'dec-002',
    fullName: 'ดร.สมชาย เจริญสุข',
    idCardLast4: '1204',
    positionId: 'pos-302',
    positionName: 'ผู้ว่าราชการจังหวัด',
    agency: 'ศาลากลางจังหวัด',
    department: 'สำนักงานจังหวัด',
    phone: '089-876-5432',
    email: 'somchai.gov@moi.go.th',
    declarationType: 'take_office',
    eventDate: getRelativeDate(-75), // 75 days ago with extension
    daysAllowed: 60,
    isExtended: true,
    extensionDays: 30,
    extensionApprovedDate: getRelativeDate(-20),
    deadlineDate: getRelativeDate(15), // Extended to 90 days
    actualSubmissionDate: getRelativeDate(-5),
    submissionCode: 'ปช-สนง-2569/0042',
    submissionStatus: 'submitted',
    inspectionStatus: 'reported_to_commander',
    reportDate: getRelativeDate(-2),
    reportReferenceNo: 'ที่ นร 0502/ว 1145',
    commanderName: 'ปลัดกระทรวงมหาดไทย',
    inspectorNotes: 'ตรวจสอบบัญชีทรัพย์สินและหนี้สินเอกสารครบถ้วน 9 หมวด และได้จัดทำบันทึกข้อความเสนอรายงานผู้บังคับบัญชาลงนามรับทราบแล้ว',
    checklist: {
      idCardCopy: true,
      spouseInfo: true,
      childrenInfo: true,
      bankAccounts: true,
      investments: true,
      realEstate: true,
      vehicles: true,
      debtsLoans: true,
      taxReturns: true,
      otherValuableAssets: true,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'dec-003',
    fullName: 'นางสาวกนกพร ศรีสวัสดิ์',
    idCardLast4: '7812',
    positionId: 'pos-601',
    positionName: 'ผู้อำนวยการกองพัสดุและจัดซื้อจัดจ้าง',
    agency: 'กรมชลประทาน',
    department: 'กองพัสดุ',
    phone: '084-555-1234',
    email: 'kanokporn.s@rid.go.th',
    declarationType: 'take_office',
    eventDate: getRelativeDate(-55), // 55 days ago
    daysAllowed: 60,
    isExtended: false,
    extensionDays: 0,
    deadlineDate: getRelativeDate(5), // 5 days remaining (CRITICAL!)
    submissionStatus: 'pending',
    inspectionStatus: 'not_inspected',
    inspectorNotes: 'ใกล้ครบกำหนด (เหลือ 5 วัน) เจ้าหน้าที่ประสานงานทำหนังสือแจ้งเตือนลายลักษณ์อักษรแล้ว',
    checklist: {
      idCardCopy: true,
      spouseInfo: true,
      childrenInfo: false,
      bankAccounts: false,
      investments: false,
      realEstate: false,
      vehicles: false,
      debtsLoans: false,
      taxReturns: false,
      otherValuableAssets: false,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'dec-004',
    fullName: 'พันตำรวจเอก ธีรพงศ์ วงศ์สว่าง',
    idCardLast4: '9921',
    positionId: 'pos-305',
    positionName: 'ผู้บังคับการตำรวจภูธรจังหวัด',
    agency: 'สำนักงานตำรวจแห่งชาติ',
    department: 'ตำรวจภูธรภาค 1',
    phone: '086-111-2233',
    email: 'theerapong.w@police.go.th',
    declarationType: 'vacate_office',
    eventDate: getRelativeDate(-80), // 80 days ago
    daysAllowed: 60,
    isExtended: false,
    extensionDays: 0,
    deadlineDate: getRelativeDate(-20), // OVERDUE 20 days!
    submissionStatus: 'overdue',
    inspectionStatus: 'clarification_needed',
    inspectorNotes: 'พ้นกำหนด 60 วัน ยังไม่ปรากฏหลักฐานการยื่น ได้ทำหนังสือแจ้งเตือนครั้งที่ 2 ตามระเบียบ ป.ป.ช.',
    checklist: {
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
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'dec-005',
    fullName: 'นายเกรียงไกร ชัยมงคล',
    idCardLast4: '3341',
    positionId: 'pos-502',
    positionName: 'กรรมการผู้จัดการใหญ่',
    agency: 'บริษัท วิทยุการบินแห่งประเทศไทย จำกัด',
    department: 'ฝ่ายบริหาร',
    phone: '082-999-8877',
    email: 'kriangkrai.c@aerothai.co.th',
    declarationType: 'vacate_1year',
    eventDate: getRelativeDate(-30),
    daysAllowed: 60,
    isExtended: false,
    extensionDays: 0,
    deadlineDate: getRelativeDate(30),
    actualSubmissionDate: getRelativeDate(-2),
    submissionCode: 'AERO-ACT-2569/081',
    submissionStatus: 'submitted',
    inspectionStatus: 'in_progress',
    inspectorNotes: 'รับเอกสารแล้ว อยู่ระหว่างตรวจสอบสัญญากู้ยืมเงินและเอกสารหลักทรัพย์ต่างประเทศ',
    checklist: {
      idCardCopy: true,
      spouseInfo: true,
      childrenInfo: true,
      bankAccounts: true,
      investments: true,
      realEstate: true,
      vehicles: true,
      debtsLoans: false,
      taxReturns: true,
      otherValuableAssets: false,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];
