// Bəzi brauzerlərdə (məs. Chrome, az-AZ) ay adları düzgün gəlmir: "2026 M10 10".
// Bu köməkçi ay və gün adlarını özümüz Azərbaycan dilində yazır.

const MONTHS = [
  'yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun',
  'iyul', 'avqust', 'sentyabr', 'oktyabr', 'noyabr', 'dekabr',
];
const MONTHS_SHORT = ['yan', 'fev', 'mar', 'apr', 'may', 'iyn', 'iyl', 'avq', 'sen', 'okt', 'noy', 'dek'];
// Date.getDay(): 0 = bazar
const WEEKDAYS = ['bazar', 'bazar ertəsi', 'çərşənbə axşamı', 'çərşənbə', 'cümə axşamı', 'cümə', 'şənbə'];

export interface AzDateOptions {
  weekday?: 'long';
  day?: 'numeric' | '2-digit';
  month?: 'long' | 'short';
  year?: 'numeric';
}

// toLocaleDateString('az-AZ', {...}) əvəzi: "10 oktyabr 2026" / "10 oktyabr 2026, şənbə"
export function toLocaleDateAz(d: Date, opts: AzDateOptions = { day: 'numeric', month: 'long', year: 'numeric' }): string {
  if (isNaN(d.getTime())) return '';
  const parts: string[] = [];
  if (opts.day) parts.push(opts.day === '2-digit' ? String(d.getDate()).padStart(2, '0') : String(d.getDate()));
  if (opts.month) parts.push((opts.month === 'short' ? MONTHS_SHORT : MONTHS)[d.getMonth()]);
  if (opts.year) parts.push(String(d.getFullYear()));
  let out = parts.join(' ');
  if (opts.weekday) out = out ? `${out}, ${WEEKDAYS[d.getDay()]}` : WEEKDAYS[d.getDay()];
  return out;
}

export const weekdayAz = (d: Date): string => (isNaN(d.getTime()) ? '' : WEEKDAYS[d.getDay()]);

// "10 okt, 17:30"
export function formatAzDateTime(d: Date): string {
  if (isNaN(d.getTime())) return '';
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `${toLocaleDateAz(d, { day: 'numeric', month: 'short' })}, ${hh}:${mm}`;
}
