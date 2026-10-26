// Thai Date and Asset Declaration Deadline Utility
// Compliant with NACC Organic Act on Anti-Corruption B.E. 2561 (2018) & Civil and Commercial Code Section 193/8

export const THAI_MONTHS_SHORT = [
  'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
  'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
];

export const THAI_MONTHS_FULL = [
  'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
  'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
];

export const THAI_DAYS = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'];

// Fixed annual Thai public holidays (MM-DD) with official Thai names
export const THAI_HOLIDAYS_MAP: Record<string, string> = {
  '01-01': 'วันขึ้นปีใหม่',
  '04-06': 'วันจักรี (วันพระบาทสมเด็จพระพุทธยอดฟ้าจุฬาโลกมหาราช และวันที่ระลึกมหาจักรีบรมราชวงศ์)',
  '04-13': 'วันสงกรานต์',
  '04-14': 'วันสงกรานต์ (วันครอบครัว)',
  '04-15': 'วันสงกรานต์',
  '05-01': 'วันแรงงานแห่งชาติ',
  '05-04': 'วันฉัตรมงคล',
  '06-03': 'วันเฉลิมพระชนมพรรษาสมเด็จพระนางเจ้าฯ พระบรมราชินี',
  '07-28': 'วันเฉลิมพระชนมพรรษาพระบาทสมเด็จพระเจ้าอยู่หัว (ร.๑๐)',
  '08-12': 'วันแม่แห่งชาติ (วันเฉลิมพระชนมพรรษาสมเด็จพระบรมราชชนนีพันปีหลวง)',
  '10-13': 'วันนวมินทรมหาราช (วันคล้ายวันสวรรคต ร.๙)',
  '10-23': 'วันปิยมหาราช',
  '12-05': 'วันคล้ายวันพระบรมราชสมภพ ร.๙ / วันชาติ / วันพ่อแห่งชาติ',
  '12-10': 'วันรัฐธรรมนูญ',
  '12-31': 'วันสิ้นปี',
};

// Major variable lunar Thai Buddhist holidays by year (YYYY-MM-DD)
export const VARIABLE_THAI_HOLIDAYS: Record<string, string> = {
  // 2024 (พ.ศ. 2567)
  '2024-02-24': 'วันมาฆบูชา',
  '2024-02-26': 'วันหยุดชดเชยวันมาฆบูชา',
  '2024-05-22': 'วันวิสาขบูชา',
  '2024-07-20': 'วันอาสาฬหบูชา',
  '2024-07-21': 'วันเข้าพรรษา',
  '2024-07-22': 'วันหยุดชดเชยวันอาสาฬหบูชา/เข้าพรรษา',

  // 2025 (พ.ศ. 2568)
  '2025-02-12': 'วันมาฆบูชา',
  '2025-05-11': 'วันวิสาขบูชา',
  '2025-05-12': 'วันหยุดชดเชยวันวิสาขบูชา',
  '2025-07-10': 'วันอาสาฬหบูชา',
  '2025-07-11': 'วันเข้าพรรษา',

  // 2026 (พ.ศ. 2569)
  '2026-03-03': 'วันมาฆบูชา',
  '2026-05-31': 'วันวิสาขบูชา',
  '2026-06-01': 'วันหยุดชดเชยวันวิสาขบูชา',
  '2026-07-29': 'วันอาสาฬหบูชา',
  '2026-07-30': 'วันเข้าพรรษา',

  // 2027 (พ.ศ. 2570)
  '2027-02-21': 'วันมาฆบูชา',
  '2027-02-22': 'วันหยุดชดเชยวันมาฆบูชา',
  '2027-05-20': 'วันวิสาขบูชา',
  '2027-07-18': 'วันอาสาฬหบูชา',
  '2027-07-19': 'วันเข้าพรรษา',

  // 2028 (พ.ศ. 2571)
  '2028-02-10': 'วันมาฆบูชา',
  '2028-05-08': 'วันวิสาขบูชา',
  '2028-07-06': 'วันอาสาฬหบูชา',
  '2028-07-07': 'วันเข้าพรรษา',

  // 2029 (พ.ศ. 2572)
  '2029-02-28': 'วันมาฆบูชา',
  '2029-05-27': 'วันวิสาขบูชา',
  '2029-05-28': 'วันหยุดชดเชยวันวิสาขบูชา',
  '2029-07-26': 'วันอาสาฬหบูชา',
  '2029-07-27': 'วันเข้าพรรษา',

  // 2030 (พ.ศ. 2573)
  '2030-02-17': 'วันมาฆบูชา',
  '2030-05-17': 'วันวิสาขบูชา',
  '2030-07-15': 'วันอาสาฬหบูชา',
  '2030-07-16': 'วันเข้าพรรษา',
};

/**
 * Returns holiday name if the date is a Thai public holiday, otherwise null.
 */
export function getHolidayName(date: Date): string | null {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const fullKey = `${y}-${m}-${d}`;
  const shortKey = `${m}-${d}`;

  if (VARIABLE_THAI_HOLIDAYS[fullKey]) {
    return VARIABLE_THAI_HOLIDAYS[fullKey];
  }
  if (THAI_HOLIDAYS_MAP[shortKey]) {
    return THAI_HOLIDAYS_MAP[shortKey];
  }
  return null;
}

export function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6; // 0 = Sunday, 6 = Saturday
}

export function isHoliday(date: Date): boolean {
  return getHolidayName(date) !== null;
}

export function isNonWorkingDay(date: Date): boolean {
  return isWeekend(date) || isHoliday(date);
}

/**
 * Formats a description of why this day is a non-working day.
 * e.g. "วันหยุดนักขัตฤกษ์: วันสงกรานต์", "วันหยุดประจำสัปดาห์ (วันเสาร์)"
 */
export function getNonWorkingDayReason(date: Date): string | null {
  const holiday = getHolidayName(date);
  const weekend = isWeekend(date);

  if (holiday && weekend) {
    return `วันหยุดเสาร์-อาทิตย์ และวันหยุดนักขัตฤกษ์ (${holiday})`;
  }
  if (holiday) {
    return `วันหยุดนักขัตฤกษ์ (${holiday})`;
  }
  if (weekend) {
    return `วันหยุดเสาร์-อาทิตย์ (วัน${THAI_DAYS[date.getDay()]})`;
  }
  return null;
}

/**
 * Adjusts date if it falls on Saturday, Sunday or public holiday.
 * By user rule: "วันสิ้นสุดเดิมตรงกับวันหยุดทำการ ให้นับวันทำการก่อนวันสิ้นสุด"
 * Default mode is 'preceding' (นับวันทำการก่อนวันสิ้นสุด).
 */
export function rollToWorkingDay(
  targetDate: Date,
  mode: 'preceding' | 'next' = 'preceding'
): { adjustedDate: Date; wasPostponed: boolean; originalDate: Date; mode: 'preceding' | 'next' } {
  const original = new Date(targetDate);
  const adjusted = new Date(targetDate);
  let wasPostponed = false;

  while (isNonWorkingDay(adjusted)) {
    wasPostponed = true;
    if (mode === 'preceding') {
      // ให้นับวันทำการก่อนวันสิ้นสุด (เลื่อนถอยกลับมาหาวันทำการก่อนหน้า เช่น วันศุกร์)
      adjusted.setDate(adjusted.getDate() - 1);
    } else {
      // เลื่อนไปวันทำการถัดไป
      adjusted.setDate(adjusted.getDate() + 1);
    }
  }

  return { adjustedDate: adjusted, wasPostponed, originalDate: original, mode };
}

/**
 * Backward-compatible helper: Adjusts date to the next working day.
 */
export function rollToNextWorkingDay(targetDate: Date) {
  return rollToWorkingDay(targetDate, 'next');
}

/**
 * Calculates deadline for asset declaration.
 * Under Thai Law: 60 days starting the day after the event date.
 * If extension is granted: +30 days (total 90 days).
 * If deadline falls on a weekend or public holiday:
 * Defaults to 'preceding' (ให้นับวันทำการก่อนวันสิ้นสุด).
 */
export function calculateDeclarationDeadline(
  eventDateString: string,
  daysAllowed: number = 60,
  extensionDays: number = 0,
  rollMode: 'preceding' | 'next' = 'preceding'
): {
  deadlineString: string;
  adjustedDate: Date;
  rawDate: Date;
  wasPostponed: boolean;
  totalDays: number;
  rollMode: 'preceding' | 'next';
  holidayName: string | null;
  rawReason: string | null;
  isRawWeekend: boolean;
  isRawHoliday: boolean;
} {
  if (!eventDateString) {
    const today = new Date();
    const holidayName = getHolidayName(today);
    const isRawWeekend = isWeekend(today);
    const isRawHoliday = holidayName !== null;
    const rawReason = getNonWorkingDayReason(today);
    return {
      deadlineString: today.toISOString().split('T')[0],
      adjustedDate: today,
      rawDate: today,
      wasPostponed: false,
      totalDays: daysAllowed + extensionDays,
      rollMode,
      holidayName,
      rawReason,
      isRawWeekend,
      isRawHoliday
    };
  }

  const [year, month, day] = eventDateString.split('-').map(Number);
  const baseDate = new Date(year, month - 1, day);
  
  const totalDays = (daysAllowed || 60) + (extensionDays || 0);

  // Day 1 starts the day after eventDate
  const rawTarget = new Date(baseDate);
  rawTarget.setDate(rawTarget.getDate() + totalDays);

  const holidayName = getHolidayName(rawTarget);
  const isRawWeekend = isWeekend(rawTarget);
  const isRawHoliday = holidayName !== null;
  const rawReason = getNonWorkingDayReason(rawTarget);

  const { adjustedDate, wasPostponed } = rollToWorkingDay(rawTarget, rollMode);

  const adjYear = adjustedDate.getFullYear();
  const adjMonth = String(adjustedDate.getMonth() + 1).padStart(2, '0');
  const adjDay = String(adjustedDate.getDate()).padStart(2, '0');
  const deadlineString = `${adjYear}-${adjMonth}-${adjDay}`;

  return {
    deadlineString,
    adjustedDate,
    rawDate: rawTarget,
    wasPostponed,
    totalDays,
    rollMode,
    holidayName,
    rawReason,
    isRawWeekend,
    isRawHoliday
  };
}

/**
 * Formats YYYY-MM-DD or Date to Thai Buddhist Era string
 * e.g. "2026-04-15" => "15 เม.ย. 2569"
 */
export function formatThaiDate(dateInput: string | Date | undefined, includeYear: boolean = true): string {
  if (!dateInput) return '-';
  
  let d: Date;
  if (typeof dateInput === 'string') {
    const [y, m, day] = dateInput.split('-').map(Number);
    d = new Date(y, (m || 1) - 1, day || 1);
  } else {
    d = dateInput;
  }

  if (isNaN(d.getTime())) return '-';

  const day = d.getDate();
  const month = THAI_MONTHS_SHORT[d.getMonth()];
  const thaiYear = d.getFullYear() + 543;

  return includeYear ? `${day} ${month} ${thaiYear}` : `${day} ${month}`;
}

export function formatThaiDateFull(dateInput: string | Date | undefined): string {
  if (!dateInput) return '-';
  
  let d: Date;
  if (typeof dateInput === 'string') {
    const [y, m, day] = dateInput.split('-').map(Number);
    d = new Date(y, (m || 1) - 1, day || 1);
  } else {
    d = dateInput;
  }

  if (isNaN(d.getTime())) return '-';

  const day = d.getDate();
  const month = THAI_MONTHS_FULL[d.getMonth()];
  const thaiYear = d.getFullYear() + 543;

  return `${day} ${month} พ.ศ. ${thaiYear}`;
}

/**
 * Calculates days remaining from today until deadline.
 * Positive = remaining days. 0 = today. Negative = overdue days.
 */
export function getDaysRemaining(deadlineDateString: string): number {
  if (!deadlineDateString) return 0;
  
  const [y, m, d] = deadlineDateString.split('-').map(Number);
  const deadline = new Date(y, m - 1, d);
  deadline.setHours(23, 59, 59, 999);

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const diffMs = deadline.getTime() - now.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

export interface DeadlineUrgency {
  daysRemaining: number;
  label: string;
  urgency: 'overdue' | 'critical' | 'warning' | 'normal' | 'submitted';
  textColor: string;
  badgeBg: string;
}

export function getDeadlineUrgency(
  deadlineDateString: string,
  isSubmitted: boolean = false
): DeadlineUrgency {
  if (isSubmitted) {
    return {
      daysRemaining: 0,
      label: 'ยื่นบัญชีแล้ว',
      urgency: 'submitted',
      textColor: 'text-emerald-300',
      badgeBg: 'bg-emerald-950/70 border border-emerald-800/60 text-emerald-300'
    };
  }

  const days = getDaysRemaining(deadlineDateString);

  if (days < 0) {
    return {
      daysRemaining: days,
      label: `เกินกำหนด ${Math.abs(days)} วัน`,
      urgency: 'overdue',
      textColor: 'text-rose-300',
      badgeBg: 'bg-rose-950/70 border border-rose-800/60 text-rose-300'
    };
  }

  if (days === 0) {
    return {
      daysRemaining: 0,
      label: 'ครบกำหนดวันนี้',
      urgency: 'critical',
      textColor: 'text-rose-300',
      badgeBg: 'bg-rose-950/80 border border-rose-800/70 text-rose-300'
    };
  }

  if (days <= 7) {
    return {
      daysRemaining: days,
      label: `เหลืออีก ${days} วัน (ด่วนมาก)`,
      urgency: 'critical',
      textColor: 'text-amber-300',
      badgeBg: 'bg-amber-950/80 border border-amber-800/70 text-amber-300'
    };
  }

  if (days <= 20) {
    return {
      daysRemaining: days,
      label: `เหลืออีก ${days} วัน`,
      urgency: 'warning',
      textColor: 'text-amber-300',
      badgeBg: 'bg-amber-950/50 border border-amber-800/50 text-amber-300'
    };
  }

  return {
    daysRemaining: days,
    label: `เหลืออีก ${days} วัน`,
    urgency: 'normal',
    textColor: 'text-slate-300',
    badgeBg: 'bg-slate-800/80 border border-slate-700/60 text-slate-300'
  };
}

/**
 * Calculates the exact date when a 3-year term of office is completed.
 * Under Thai Law (พ.ร.ป. ป.ป.ช. 2561 ม.105 วรรคสาม):
 * เมื่อดำรงตำแหน่งติดต่อกันครบ 3 ปี ให้มีหน้าที่ยื่นบัญชีทรัพย์สิน
 * 
 * @param appointmentDateStr Date string in 'YYYY-MM-DD' format
 * @param minusOneDay If true, returns the last day of the 3rd year (e.g. 1 Oct 2021 -> 30 Sep 2024); if false, returns the exact same date 3 years later (e.g. 1 Oct 2021 -> 1 Oct 2024)
 */
export function calculate3YearAnniversary(appointmentDateStr: string, minusOneDay: boolean = false): string {
  if (!appointmentDateStr) return '';
  const [y, m, d] = appointmentDateStr.split('-').map(Number);
  const target = new Date(y + 3, m - 1, d);
  
  if (minusOneDay) {
    target.setDate(target.getDate() - 1);
  }

  const targetY = target.getFullYear();
  const targetM = String(target.getMonth() + 1).padStart(2, '0');
  const targetD = String(target.getDate()).padStart(2, '0');
  return `${targetY}-${targetM}-${targetD}`;
}

