import {
  Smartphone, Cpu, Wrench, CreditCard, BarChart3,
  UtensilsCrossed, Layers, Zap, Radio, Eye,
  Factory, Boxes, GitBranch, Warehouse, TrendingUp,
  CheckCircle, XCircle,
  Network, FolderTree, Truck, Settings, ScanLine,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type AccentColor = "cyan" | "purple" | "emerald";

export interface FeatureItem {
  icon: React.ElementType;
  title: string;
  desc: string;
}

export interface Stage {
  number: string;
  label: string;
  title: string;
  color: string;
}

export interface CompareRow {
  feature: string;
  lite: boolean | string;
  enterprise: boolean | string;
}

export type SlideData =
  | { type: "title"; title: string; subtitle: string; tagline?: string }
  | { type: "roadmap"; title: string; subtitle: string; stages: Stage[] }
  | { type: "features"; title: string; subtitle?: string; features: FeatureItem[] }
  | { type: "comparison"; title: string; subtitle?: string; rows: CompareRow[] }
  | { type: "stage"; stageNum: string; stageLabel: string; title: string; subtitle: string; features: FeatureItem[] };

export interface Product {
  name: string;
  tagline: string;
  accent: AccentColor;
  slides: SlideData[];
}

// ─── Color maps ───────────────────────────────────────────────────────────────

export const accentMap: Record<AccentColor, {
  gradient: string; glow: string; badge: string; border: string;
  bg: string; text: string; progress: string;
}> = {
  cyan: {
    gradient: "from-cyan-400 via-sky-300 to-blue-500",
    glow: "rgba(0,255,255,0.15)",
    badge: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
    border: "border-cyan-500/20",
    bg: "bg-cyan-500/5",
    text: "text-cyan-400",
    progress: "from-cyan-400 to-blue-500",
  },
  purple: {
    gradient: "from-purple-400 via-fuchsia-300 to-pink-500",
    glow: "rgba(168,85,247,0.15)",
    badge: "bg-purple-500/10 border-purple-500/20 text-purple-400",
    border: "border-purple-500/20",
    bg: "bg-purple-500/5",
    text: "text-purple-400",
    progress: "from-purple-400 to-pink-500",
  },
  emerald: {
    gradient: "from-emerald-400 via-teal-300 to-green-500",
    glow: "rgba(16,185,129,0.15)",
    badge: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
    border: "border-emerald-500/20",
    bg: "bg-emerald-500/5",
    text: "text-emerald-400",
    progress: "from-emerald-400 to-teal-500",
  },
};

// ─── ORCA ERP ─────────────────────────────────────────────────────────────────

export const orcaErp: Product = {
  name: "ORCA ERP",
  tagline: "نظام إدارة المحلات والكيانات الكبرى",
  accent: "cyan",
  slides: [
    {
      type: "title",
      title: "خارطة طريق أوركا للموبايلات",
      subtitle: "من المحلات الناشئة إلى الكيانات الكبرى — منظومة واحدة تتكيف مع حجم عملك",
      tagline: "ORCA ERP · Mobile Intelligence",
    },
    {
      type: "features",
      title: "شريحتان — مسار واحد",
      subtitle: "نصمم كل تجربة بناءً على حجم عملك وطموحاتك",
      features: [
        { icon: Smartphone, title: "ORCA Lite", desc: "للمحلات الناشئة: سريع، خفيف، يبدأ في دقائق" },
        { icon: Cpu, title: "ORCA Enterprise", desc: "للكيانات الكبرى: تتبع متقدم، صيانة، أقساط" },
        { icon: BarChart3, title: "تقارير يومية", desc: "أرباح ومصاريف وجرد فوري على شاشتك" },
        { icon: TrendingUp, title: "توسّع بلا حدود", desc: "ابدأ بـ Lite وانتقل لـ Enterprise متى شئت" },
      ],
    },
    {
      type: "features",
      title: "ORCA Lite — للمحلات الناشئة",
      subtitle: "بساطة لا تعني نقصًا. كل ما تحتاجه في يدك",
      features: [
        { icon: Zap, title: "مبيعات فائقة السرعة", desc: "فاتورة في ثوانٍ مع باركود أو بحث ذكي" },
        { icon: Boxes, title: "جرد مبسّط", desc: "إضافة وتعديل المنتجات بضغطة واحدة" },
        { icon: BarChart3, title: "أرباح يومية فورية", desc: "تقرير الربح والخسارة في نهاية كل يوم" },
        { icon: Smartphone, title: "Offline-First", desc: "يعمل بلا إنترنت ويزامن عند الاتصال" },
      ],
    },
    {
      type: "features",
      title: "ORCA Enterprise — للكيانات الكبرى",
      subtitle: "تحكم كامل. لا شيء يفوتك",
      features: [
        { icon: Cpu, title: "تتبع IMEI", desc: "كل جهاز له هوية فريدة وتاريخ كامل" },
        { icon: Wrench, title: "إدارة الصيانة", desc: "استقبال، تشخيص، تسليم — كل شيء مرصود" },
        { icon: CreditCard, title: "نظام الأقساط", desc: "خطط تقسيط مرنة مع تنبيهات تلقائية" },
        { icon: GitBranch, title: "متعدد الفروع", desc: "إدارة جميع الفروع من لوحة تحكم مركزية" },
      ],
    },
    {
      type: "comparison",
      title: "Lite مقابل Enterprise — المقارنة الكاملة",
      subtitle: "اختر النظام الذي يناسب مرحلة نموك",
      rows: [
        { feature: "إدارة المبيعات الأساسية", lite: true, enterprise: true },
        { feature: "الجرد والمخزون", lite: true, enterprise: true },
        { feature: "تقارير الربح اليومي", lite: true, enterprise: true },
        { feature: "Offline-First", lite: true, enterprise: true },
        { feature: "تتبع IMEI للأجهزة", lite: false, enterprise: true },
        { feature: "إدارة الصيانة", lite: false, enterprise: true },
        { feature: "نظام الأقساط والتقسيط", lite: false, enterprise: true },
        { feature: "إدارة متعدد الفروع", lite: false, enterprise: true },
        { feature: "تقارير متقدمة BI", lite: false, enterprise: true },
      ],
    },
  ],
};

// ─── ORCA FOOD ────────────────────────────────────────────────────────────────

export const orcaFood: Product = {
  name: "ORCA FOOD",
  tagline: "المنظومة الكاملة لإدارة المطاعم",
  accent: "purple",
  slides: [
    {
      type: "title",
      title: "أوركافود: بناء المملكة الكاملة لإدارة المطاعم",
      subtitle: "من الهوية البصرية إلى تزامن المطبخ — كل شيء في نظام واحد لا يتوقف",
      tagline: "ORCA FOOD · Restaurant Intelligence",
    },
    {
      type: "roadmap",
      title: "خارطة طريق المملكة",
      subtitle: "أربع مراحل متكاملة تبني مطعماً يُدار وحده",
      stages: [
        { number: "01", label: "الهوية", title: "Brand Identity", color: "text-purple-400" },
        { number: "02", label: "الحقن السحري", title: "Magic Injection", color: "text-fuchsia-400" },
        { number: "03", label: "السيمفونية", title: "Real-Time Symphony", color: "text-pink-400" },
        { number: "04", label: "المراقبة", title: "Live Monitoring", color: "text-rose-400" },
      ],
    },
    {
      type: "stage",
      stageNum: "01",
      stageLabel: "الهوية",
      title: "اطبع اسمك على كل شيء",
      subtitle: "الهوية البصرية هي أول ما يراه عميلك — نضعها في كل مكان",
      features: [
        { icon: UtensilsCrossed, title: "شاشات الكاشير", desc: "لوجو المطعم يظهر على كل شاشة بيع" },
        { icon: Layers, title: "فواتير بهويتك", desc: "كل إيصال يحمل اسمك وعلامتك التجارية" },
        { icon: Smartphone, title: "واجهة مخصصة", desc: "ألوان وخطوط تعكس شخصية مطعمك" },
        { icon: Eye, title: "انطباع أول لا يُنسى", desc: "احترافية من أول لحظة يدخل فيها الزبون" },
      ],
    },
    {
      type: "stage",
      stageNum: "02",
      stageLabel: "الحقن السحري",
      title: "بيانات كاملة بضغطة واحدة",
      subtitle: "60 صنفاً في 10 أقسام — بدون إدخال يدوي. مجرد رابط واحد",
      features: [
        { icon: Zap, title: "رابط التضمين", desc: "شارك رابط القائمة — النظام يملأ نفسه تلقائياً" },
        { icon: Layers, title: "10 أقسام جاهزة", desc: "مشهيات، رئيسي، مشروبات، حلويات والمزيد" },
        { icon: Boxes, title: "60 صنف محمّل", desc: "كل الأصناف بأسعارها وصورها في لحظة" },
        { icon: CheckCircle, title: "صفر إدخال يدوي", desc: "وقتك للعمل الحقيقي — لا للنسخ واللصق" },
      ],
    },
    {
      type: "stage",
      stageNum: "03",
      stageLabel: "السيمفونية",
      title: "POS + KDS + Call Center = تناغم تام",
      subtitle: "ثلاثة أنظمة تعمل معاً في وقت حقيقي — صفر تأخير، صفر أخطاء",
      features: [
        { icon: Zap, title: "نقطة البيع (POS)", desc: "استقبال الطلبات من الطاولة أو الكاشير" },
        { icon: Radio, title: "شاشة المطبخ (KDS)", desc: "الطلب يصل للمطبخ فورياً بمجرد تسجيله" },
        { icon: Smartphone, title: "مركز الاتصال", desc: "طلبات الديليفري تدخل مباشرة للنظام" },
        { icon: Eye, title: "مزامنة حية", desc: "كل تغيير في أي شاشة يظهر في الباقية لحظياً" },
      ],
    },
    {
      type: "stage",
      stageNum: "04",
      stageLabel: "المراقبة",
      title: "يدك على كل شيء — في أي وقت",
      subtitle: "مراقبة مخزون حي، خصم بالوصفات، وتقارير الشيفت",
      features: [
        { icon: Eye, title: "جرد حي", desc: "كميات المواد الخام تُحدَّث مع كل طلب" },
        { icon: Layers, title: "خصم بالوصفة", desc: "النظام يعرف ما يستهلكه كل طبق ويخصمه" },
        { icon: BarChart3, title: "تقارير الشيفت", desc: "مبيعات كل وردية وأداء كل موظف" },
        { icon: TrendingUp, title: "تحليل الأداء", desc: "الأصناف الأكثر مبيعاً والأوقات الذروة" },
      ],
    },
  ],
};

// ─── ORCA FLOW ────────────────────────────────────────────────────────────────

export const orcaFlow: Product = {
  name: "ORCA FLOW",
  tagline: "عصب الإدارة الصناعية واللوجستية",
  accent: "emerald",
  slides: [
    // ── Slide 1: Title ────────────────────────────────────────────────────────
    {
      type: "title",
      title: "ORCA FLOW: عصب الإدارة الصناعية واللوجستية",
      subtitle: "السيطرة التامة من خط الإنتاج إلى رف المعرض.",
      tagline: "ORCA FLOW · Industrial & Logistics Intelligence",
    },
    // ── Slide 2: Mission ──────────────────────────────────────────────────────
    {
      type: "features",
      title: "وداعاً للعشوائية الصناعية",
      subtitle: "ربط المخازن، خطوط الإنتاج، والموردين في نبضة واحدة بنظام سحابي متزامن",
      features: [
        { icon: Network,    title: "شبكة موحدة",       desc: "جميع الأقسام مترابطة في نظام سحابي واحد لحظي" },
        { icon: Warehouse,  title: "مخازن متكاملة",    desc: "مواد خام، إنتاج جارٍ، ومنتج تام — كل شيء مرئي" },
        { icon: Factory,    title: "خطوط الإنتاج",     desc: "مراقبة كل آلة وكل مرحلة في الوقت الحقيقي" },
        { icon: Truck,      title: "سلاسل الإمداد",    desc: "من أمر الشراء حتى التسليم الأخير — لا شيء يفوتك" },
      ],
    },
    // ── Slide 3: Stage 1 — Asset Tree ─────────────────────────────────────────
    {
      type: "stage",
      stageNum: "01",
      stageLabel: "الهيكلة",
      title: "بناء شجرة الأصول",
      subtitle: "تعريف المصانع، الفروع، خطوط الإنتاج، وماكينات التشغيل لضمان تتبع دقيق لكل أصل",
      features: [
        { icon: FolderTree, title: "هيكل هرمي",        desc: "مجموعة → مصنع → خط → ماكينة — بدقة مطلقة" },
        { icon: Factory,    title: "ماكينات التشغيل",  desc: "تسجيل كل آلة بمعاملاتها وطاقتها الإنتاجية" },
        { icon: GitBranch,  title: "فروع متعددة",      desc: "إدارة جميع الفروع من لوحة تحكم مركزية واحدة" },
        { icon: Eye,        title: "تتبع الأصول",      desc: "كل أصل له هوية فريدة وتاريخ حركة كامل" },
      ],
    },
    // ── Slide 4: Stage 2 — Supply Chain ───────────────────────────────────────
    {
      type: "stage",
      stageNum: "02",
      stageLabel: "الإمداد",
      title: "سلاسل الإمداد",
      subtitle: "التحكم الصارم في المواد الخام، مراقبة المخزون الصفري، أوامر الشراء الذكية، وحساب تكاليف الاستيراد بدقة",
      features: [
        { icon: Truck,      title: "أوامر الشراء",         desc: "إنشاء وتتبع أوامر الشراء من الطلب حتى الاستلام" },
        { icon: Boxes,      title: "مخزون صفري",           desc: "نقطة إعادة الطلب تُحسب تلقائياً لكل مادة" },
        { icon: TrendingUp, title: "تكاليف الاستيراد",     desc: "الجمارك والشحن والرسوم مُوزَّعة بدقة على الوحدات" },
        { icon: Network,    title: "شبكة الموردين",        desc: "تقييم أداء كل مورد ومواعيد تسليمه التاريخية" },
      ],
    },
    // ── Slide 5: Stage 3 — Production Symphony ────────────────────────────────
    {
      type: "stage",
      stageNum: "03",
      stageLabel: "الإنتاج",
      title: "سيمفونية الإنتاج",
      subtitle: "تحويل المادة الخام لمنتج تام، حساب تكلفة الهالك آلياً، ومراقبة الجودة على خطوط الإنتاج",
      features: [
        { icon: Settings,   title: "أوامر الإنتاج",      desc: "تحويل المواد الخام لمنتج نهائي بوصفة محددة" },
        { icon: Zap,        title: "معدل الإنتاج الحي",  desc: "الوحدات المنتجة مقابل المخطط — لحظةً بلحظة" },
        { icon: Wrench,     title: "تكلفة الهالك",       desc: "حساب نسبة الهالك وتوزيع تكلفته آلياً" },
        { icon: BarChart3,  title: "مراقبة الجودة",      desc: "نقاط تفتيش الجودة مُدمجة في خط الإنتاج" },
      ],
    },
    // ── Slide 6: Stage 4 — Logistics Radar ───────────────────────────────────
    {
      type: "stage",
      stageNum: "04",
      stageLabel: "الرادار",
      title: "رادار المايسترو اللوجستي",
      subtitle: "تتبع الشحنات بين الفروع، جرد الباركود والـ RFID، وتقارير الربحية الصناعية اللحظية",
      features: [
        { icon: Truck,      title: "تتبع الشحنات",       desc: "كل حركة بين الفروع مرصودة بالتوقيت والكمية" },
        { icon: ScanLine,   title: "جرد ذكي",            desc: "باركود وRFID — جرد آلاف الأصناف في دقائق" },
        { icon: TrendingUp, title: "ربحية صناعية",       desc: "هامش الربح لكل منتج بعد خصم جميع التكاليف" },
        { icon: Eye,        title: "لوحة المايسترو",     desc: "كل المؤشرات الحيوية في شاشة واحدة في أي وقت" },
      ],
    },
  ],
};

// ─── Registry ─────────────────────────────────────────────────────────────────

export const products: Record<string, Product> = {
  "orca-erp": orcaErp,
  "orca-food": orcaFood,
  "orca-flow": orcaFlow,
};
