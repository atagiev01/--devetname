// Admin paneldə seçilə bilən şriftlər (index.html-də Google Fonts ilə yüklənir).
// Ə, İ, Ş, Ç, Ö, Ü, Ğ hərfləri üçün hər stekdə "Noto" ehtiyat şrifti var —
// əsas şriftdə hər hansı hərf yoxdursa brauzer o hərfi Noto ilə göstərir.

export const HEADING_FONTS = ['Cormorant Garamond', 'Playfair Display', 'Lora', 'Noto Serif'];
export const BODY_FONTS = ['Inter', 'Noto Sans', 'Montserrat'];

export const buildHeadingStack = (family: string) =>
  `"${family}", "Noto Serif", Georgia, serif`;
export const buildBodyStack = (family: string) =>
  `"${family}", "Noto Sans", system-ui, sans-serif`;

// 'Playfair Display, serif' -> 'Playfair Display'
export const firstFamily = (stack?: string): string =>
  (stack || '').split(',')[0].replace(/["']/g, '').trim();
