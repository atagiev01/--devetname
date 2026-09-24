export interface Template {
  id: string;
  name: string;
  description: string;
  previewImage: string;
  templatePath?: string;
  category: 'classic' | 'floral' | 'luxury' | 'minimal' | 'modern' | 'custom';
  active: boolean;
  createdAt: string;
  updatedAt: string;

  // Qiymətləndirmə: şablonun (məhsulun) satış qiyməti. Admin panelindən idarə olunur.
  price?: number; // Məs: 45 (manatla)
  currency?: string; // Məs: 'AZN', 'USD'. Boş buraxılarsa admin panelində 'AZN' göstərilir.
  oldPrice?: number; // Endirim göstərmək üçün əvvəlki (üstündən xətt çəkilmiş) qiymət

  // Şablon üçün standart fon musiqisi (bu şablonla yeni dəvətnamə yaradılanda avtomatik seçilir)
  music?: string;
  musicTitle?: string;
  eventType?: 'wedding' | 'birthday'; // Şablonun növü (boş = toy)
  isCustomCode?: boolean;
  customHtml?: string;
  customCss?: string;
  customJs?: string;
  // Template-level media assets for "envelope opening" style custom templates.
  // Order of use in the invitation flow: closedEnvelopeImage -> openingVideo -> background (image or video).
  closedEnvelopeImage?: string; // Bağlı (açılmamış) dəvətnamə şəkli
  openingVideo?: string; // Zərf/kart açılışı zamanı oynayan video
  openingVideoSpeed?: number; // Açılış videosunun sürəti (1 = normal, 0.5 = 2x yavaş, 2 = 2x sürətli)
  openingVideoTrimSeconds?: number; // Videonu bu saniyədə "kəs" (uzun videonun tam bitməsini gözləmədən əsas dizayna keç)
  backgroundMediaType?: 'image' | 'video'; // Əsas hissənin arxa fonu şəkil olsun, yoxsa video
  backgroundImage?: string; // Arxa fon şəkli (backgroundMediaType === 'image' olduqda istifadə olunur)
  backgroundVideo?: string; // Arxa fon videosu (backgroundMediaType === 'video' olduqda istifadə olunur)
  // Fərdi Kod (custom-code) şablonları üçün rənglərin admin panelindən rahat idarə olunması.
  // Boş buraxılan sahələr üçün şablonun öz standart (default) rəngi istifadə olunur.
  customColors?: {
    background?: string; // Əsas fon rəngi
    text?: string; // Əsas mətn rəngi
    accent?: string; // Aksent rəngi (düymələr, xətlər, dekorativ elementlər)
    border?: string; // Çərçivə/bölücü xətt rəngi
    muted?: string; // İkinci dərəcəli (solğun) mətn rəngi
  };
  themeConfig?: {
    primaryColor?: string;
    accentColor?: string;
    fontFamilyHeading?: string;
    fontFamilyBody?: string;
    fontsCustomized?: boolean; // true olduqda admin seçdiyi şriftlər bütün şablona tətbiq olunur
    customCss?: string;
    hasMusic?: boolean;
    hasCountdown?: boolean;
    hasSchedule?: boolean;
    hasGallery?: boolean;
  };
}

export interface ScheduleItem {
  time: string;
  title: string;
  description?: string;
  location?: string;
  icon?: 'ring' | 'cake' | 'music' | 'camera' | 'heart' | 'car';
}

export interface Invitation {
  id: string;
  slug: string; // e.g. 'ali-ve-nigar', 'elvin-nigar-toyu'
  templateId: string;
  brideName: string; // Ad günü dəvətnaməsində boş qalır
  eventType?: 'wedding' | 'birthday';
  celebrantAge?: string; // Ad günü: neçə yaşı tamam olur
  groomName: string;
  brideParents?: string;
  groomParents?: string;
  weddingDate: string; // YYYY-MM-DD
  weddingTime: string; // HH:mm
  venue: string;
  address: string;
  city?: string;
  heroImage: string;
  galleryImages?: string[];
  music?: string; // audio URL or preset
  musicTitle?: string;
  musicEnabled?: boolean; // explicit on/off switch, independent of whether a custom track is set
  video?: string; // YouTube or MP4 url
  customText: string;
  // "Editorial Press — Card" şablonu üçün redaktə oluna bilən kart mətnləri (boş = standart)
  cardIntro?: string; // Kartın yuxarı sol mətni
  cardTitle?: string; // Böyük başlıq (hər sətir ayrıca sətirdir)
  cardReceptionNote?: string; // Şaquli zolaqdakı son qeyd
  dressCode?: string;
  mapCoordinates?: {
    lat: number;
    lng: number;
    mapUrl?: string;
  };
  wazeUrl?: string;
  contactPhone?: string;
  schedule?: ScheduleItem[];
  active: boolean;
  views: number;
  viewLogs?: ViewLogItem[];
  createdAt: string;
  updatedAt: string;
}

export interface ViewLogItem {
  id: string;
  timestamp: string;
  device: 'mobile' | 'desktop' | 'tablet';
  browser?: string;
}

export interface RSVP {
  id: string;
  invitationId: string;
  invitationSlug?: string;
  guestName: string;
  guestCount: number;
  attending: boolean;
  message?: string;
  phone?: string;
  mealPreference?: 'standard' | 'vegetarian' | 'halal' | 'kids' | 'other';
  createdAt: string;
}

export interface StatsSummary {
  totalInvitations: number;
  activeInvitations: number;
  totalViews: number;
  totalRSVPs: number;
  attendingGuests: number;
  declinedRSVPs: number;
  acceptanceRate: number;
}

export interface FirebaseAppConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
}
