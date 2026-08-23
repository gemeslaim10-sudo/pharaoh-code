export interface TermItem {
  num: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  title?: string;
  desc?: string;
}

export const TERMS_ITEMS: TermItem[] = [
  {
    num: '01',
    titleAr: 'نطاق الخدمات والتعاقدات',
    titleEn: 'Scope of Services & Contracts',
    descAr: 'تلتزم Pharaoh Code بتنفيذ وتطوير المشاريع البرمجية والمواقع والتطبيقات وفقاً لوثيقة المتطلبات الفنية (Scope of Work) المتفق عليها والموقعة مع العميل مسبقاً. أي تعديلات أو إضافات برمجية خارج هذا النطاق أثناء أو بعد مرحلة التطوير تخضع لتقييم فني منفصل ورسوم مالية إضافية تُحددها إدارة المشروعات.',
    descEn: 'Pharaoh Code commits to developing software projects, web platforms, and mobile apps according to the Scope of Work agreed upon with the client. Any modifications outside this scope undergo technical evaluation and additional fees.'
  },
  {
    num: '02',
    titleAr: 'حقوق الملكية الفكرية البرمجية',
    titleEn: 'Intellectual Property Rights',
    descAr: 'جميع المحتويات والأدوات الرقمية والعلامات التجارية الموجودة على موقعنا هي ملك لـ Pharaoh Code. أما بالنسبة للمشروعات المطورة، يحصل العميل على كامل حقوق الملكية الفكرية والشيفرات المصدرية (Source Code) الخاصة بمشروعه فور سداد كامل المستحقات المالية المتفق عليها، ولا يحق للشركة إعادة بيع نفس الكود المخصص لأي طرف آخر.',
    descEn: 'All digital assets and tools on our platform belong to Pharaoh Code. For client projects, the client receives full intellectual property and source codes upon final payment. Pharaoh Code commits never to resell custom client code.'
  },
  {
    num: '03',
    titleAr: 'الآلية المالية وجدولة الدفعات',
    titleEn: 'Financial Structure & Milestone Payments',
    descAr: 'يتم العمل على أي مشروع برمي استناداً لجدولة دفعات واضحة يتم تفصيلها في العقد الأساسي (مثال: دفعة مقدمة لبدء العمل، دفعة عند تسليم الواجهات، ودفعة نهائية عند الإطلاق الفعلي). في حال تأخر العميل عن سداد الدفعة المستحقة في موعدها المتفق عليه، يحق لـ Pharaoh Code تعليق العمل بالمشروع مؤقتاً حتى تسوية المستحقات.',
    descEn: 'Projects are scheduled with clear milestone payments outlined in the primary agreement. In case of payment delays, Pharaoh Code reserves the right to pause project progression until dues are settled.'
  },
  {
    num: '04',
    titleAr: 'الخوادم (Servers) والاستضافة',
    titleEn: 'Servers & Cloud Infrastructure',
    descAr: 'إذا تم توفير الاستضافة عبر طرف ثالث من قِبل العميل، فإن Pharaoh Code لا تتحمل أي مسؤولية عن توقف الخوادم، بطء الاستجابة، أو فقدان البيانات الناتج عن مشاكل من مزود الاستضافة. بينما نضمن استقرار الأنظمة بالكامل إذا أُسندت إدارة الخوادم والبنية التحتية لمهندسينا كخدمة سحابية مستقلة.',
    descEn: 'If hosting is provided by a third-party, Pharaoh Code assumes no liability for external server outages or downtime. Complete system uptime is guaranteed when infrastructure is managed directly by our cloud architects.'
  },
  {
    num: '05',
    titleAr: 'الدعم الفني والضمان البرمجي',
    titleEn: 'Technical Support & Code Warranty',
    descAr: 'تقدم Pharaoh Code فترة ضمان مجانية متفق عليها فور تسليم وإطلاق المشروع، وتشمل هذه الفترة إصلاح أي ثغرات أو أخطاء برمجية (Bugs) تظهر في الأكواد الأساسية المكتوبة من قِبلنا. لا يشمل الضمان إصلاح المشاكل الناتجة عن سوء استخدام لوحات التحكم أو عبث أي مطور خارجي بأكواد النظام.',
    descEn: 'Pharaoh Code provides an agreed warranty period upon launch covering bug fixes in core code. Warranty excludes issues caused by unauthorized third-party code tampering or dashboard misuse.'
  },
  {
    num: '06',
    titleAr: 'تعديل الشروط والقوانين الحاكمة',
    titleEn: 'Terms Modification & Governing Laws',
    descAr: 'تحتفظ إدارة Pharaoh Code بالحق في تعديل أو تحديث بنود الشروط والأحكام هذه في أي وقت لضمان تماشيها مع التطورات القانونية وصناعة البرمجيات العالمية. تخضع كافة الاتفاقيات والنزاعات القانونية -لا قدر الله- للقوانين والتشريعات المحلية والمحاكم الاقتصادية المختصة.',
    descEn: 'Pharaoh Code reserves the right to update these terms to align with legal advancements and global software standards. All agreements are governed by applicable economic and digital laws.'
  }
];
