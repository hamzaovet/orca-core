import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const LanguageContext = createContext(null)

const messages = {
  en: {
    brand: 'NEXARA',
    tagline: 'Next-generation digital experiences.',
    heroTitle: 'Build the future with NEXARA',
    heroSubtitle:
      'A modern platform for intelligent, data-driven experiences — crafted for ambitious teams.',
    getStarted: 'Get started',
    viewDashboard: 'Admin dashboard',
    featuresTitle: 'Why NEXARA',
    feature1Title: 'Real-time insights',
    feature1Body: 'Stream and visualize your business metrics in milliseconds.',
    feature2Title: 'Scalable by design',
    feature2Body: 'From prototype to millions of users without changing stack.',
    feature3Title: 'Secure by default',
    feature3Body: 'Enterprise-grade security powered by Firebase and modern tooling.',
    adminTitle: 'Admin dashboard',
    adminSubtitle:
      'This is a starter structure for your future NEXARA admin experience.',
    adminCardAnalytics: 'Analytics',
    adminCardUsers: 'Users',
    adminCardSettings: 'Platform settings',
    adminComingSoon: 'More modules coming soon…',
    languageLabel: 'العربية',
    contactWhatsApp: 'WhatsApp',
  },
  ar: {
    brand: 'نيكْسارا',
    tagline: 'تجارب رقمية من الجيل القادم.',
    heroTitle: 'ابنِ المستقبل مع نيكْسارا',
    heroSubtitle:
      'منصّة عصرية للتجارب الذكية المعتمدة على البيانات — مخصّصة للفرق الطموحة.',
    getStarted: 'ابدأ الآن',
    viewDashboard: 'لوحة التحكم',
    featuresTitle: 'لماذا نيكْسارا',
    feature1Title: 'تحليلات فورية',
    feature1Body: 'تدفق وعرض مؤشرات عملك في أجزاء من الثانية.',
    feature2Title: 'قابلة للتوسع',
    feature2Body: 'من النموذج الأولي حتى ملايين المستخدمين دون تغيير التقنيات.',
    feature3Title: 'أمان افتراضي',
    feature3Body: 'أمان بمستوى المؤسسات مدعوم بـ Firebase وأحدث الأدوات.',
    adminTitle: 'لوحة التحكم',
    adminSubtitle:
      'هيكل مبدئي للوحة تحكم نيكْسارا يمكنك البناء عليه لاحقًا.',
    adminCardAnalytics: 'التحليلات',
    adminCardUsers: 'المستخدمون',
    adminCardSettings: 'إعدادات المنصّة',
    adminComingSoon: 'مزيد من الوحدات قريبًا…',
    languageLabel: 'EN',
    contactWhatsApp: 'واتساب',
  },
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en')

  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  useEffect(() => {
    document.documentElement.lang = lang === 'ar' ? 'ar' : 'en'
    document.documentElement.dir = dir
  }, [lang, dir])

  const value = useMemo(
    () => ({
      lang,
      dir,
      toggleLanguage: () => setLang((prev) => (prev === 'en' ? 'ar' : 'en')),
      t: (key) => messages[lang][key] ?? key,
    }),
    [lang],
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return ctx
}

