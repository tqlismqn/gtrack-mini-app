const tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
if (tg && typeof tg.expand === "function") {
  tg.expand();
}

const DIRECTORS = {
  "dir-001": "Петр Седлачек",
  "dir-002": "Анна Лисова",
  "dir-003": "Михаил Ковал"
};

const WORK_LOCATION_LABELS = {
  praha: "Praha",
  kladno: "Kladno"
};

const WORK_LOCATION_ADDRESSES = {
  praha: "Do Čertous 2622/14, 193 00 Praha 20",
  kladno: "Československé armády 3212, 272 01 Kladno 1"
};

const STATUS_LABELS = {
  active: "Активен",
  on_leave: "В отпуске",
  inactive: "Неактивен",
  terminated: "Уволен"
};

const DOCUMENT_LABELS = {
  license_generic: "Лицензия (общая)",
  a1: "A1 (EU)",
  a1_switzerland: "A1 Switzerland",
  declaration: "Декларация",
  insurance: "Pojištění",
  travel_insurance: "Cestovní pojištění",
  residence: "Прописка (Propiska)",
  licence: "Права (Driver’s licence)",
  adr: "ADR",
  tacho_card: "Чип (тахограф)",
  code95: "Код 95",
  medical: "Медицинская prohlídka",
  psihotest: "Психотест",
  visa: "Виза / Биометрия",
  passport: "Паспорт"
};

const DOCUMENT_DEFINITIONS = [
  { type: "license_generic", label: DOCUMENT_LABELS.license_generic, showNumber: false, showCountry: false },
  { type: "a1", label: DOCUMENT_LABELS.a1, showNumber: false, showCountry: false },
  { type: "a1_switzerland", label: DOCUMENT_LABELS.a1_switzerland, showNumber: false, showCountry: false },
  { type: "declaration", label: DOCUMENT_LABELS.declaration, showNumber: false, showCountry: false },
  { type: "insurance", label: DOCUMENT_LABELS.insurance, showNumber: false, showCountry: false },
  { type: "travel_insurance", label: DOCUMENT_LABELS.travel_insurance, showNumber: false, showCountry: false },
  { type: "residence", label: DOCUMENT_LABELS.residence, showNumber: false, showCountry: false },
  { type: "licence", label: DOCUMENT_LABELS.licence, showNumber: true, showCountry: false },
  { type: "adr", label: DOCUMENT_LABELS.adr, showNumber: false, showCountry: false },
  { type: "tacho_card", label: DOCUMENT_LABELS.tacho_card, showNumber: true, showCountry: false },
  { type: "code95", label: DOCUMENT_LABELS.code95, showNumber: false, showCountry: false },
  { type: "medical", label: DOCUMENT_LABELS.medical, showNumber: false, showCountry: false },
  { type: "psihotest", label: DOCUMENT_LABELS.psihotest, showNumber: false, showCountry: false },
  { type: "visa", label: DOCUMENT_LABELS.visa, showNumber: true, showCountry: true },
  { type: "passport", label: DOCUMENT_LABELS.passport, showNumber: true, showCountry: true }
];

const DOCUMENT_STATUS_LABELS = {
  expired: "Просрочен",
  soon: "Истекает ≤ 30",
  warning: "Истекает 31-60",
  valid: "Актуален",
  unknown: "Без срока"
};

const GENDER_LABELS = {
  male: "Мужской",
  female: "Женский",
  other: "Другое"
};

const EU_COUNTRY_CODES = new Set([
  "AT",
  "BE",
  "BG",
  "HR",
  "CY",
  "CZ",
  "DK",
  "EE",
  "FI",
  "FR",
  "DE",
  "GR",
  "HU",
  "IE",
  "IT",
  "LV",
  "LT",
  "LU",
  "MT",
  "NL",
  "PL",
  "PT",
  "RO",
  "SK",
  "SI",
  "ES",
  "SE"
]);

const COUNTRY_CODE_ALIASES = {
  cz: "CZ",
  "czech republic": "CZ",
  czechia: "CZ",
  czech: "CZ",
  "ceska republika": "CZ",
  cesko: "CZ",
  "чехия": "CZ",
  "чешская республика": "CZ",
  sk: "SK",
  slovakia: "SK",
  "slovenska republika": "SK",
  slovensko: "SK",
  "словакия": "SK",
  de: "DE",
  germany: "DE",
  deutschland: "DE",
  "германия": "DE",
  at: "AT",
  austria: "AT",
  osterreich: "AT",
  "österreich": "AT",
  "австрия": "AT",
  pl: "PL",
  poland: "PL",
  polska: "PL",
  "польша": "PL",
  ua: "UA",
  ukraine: "UA",
  "украина": "UA",
  ru: "RU",
  russia: "RU",
  "russian federation": "RU",
  "россия": "RU",
  "российская федерация": "RU",
  by: "BY",
  belarus: "BY",
  belarussia: "BY",
  "беларусь": "BY",
  lt: "LT",
  lithuania: "LT",
  lietuva: "LT",
  "литва": "LT",
  lv: "LV",
  latvia: "LV",
  latvija: "LV",
  "латвия": "LV",
  ee: "EE",
  estonia: "EE",
  eesti: "EE",
  "эстония": "EE",
  ro: "RO",
  romania: "RO",
  romaniaa: "RO",
  "румыния": "RO",
  bg: "BG",
  bulgaria: "BG",
  balgariya: "BG",
  "болгария": "BG",
  hu: "HU",
  hungary: "HU",
  magyarorszag: "HU",
  "венгрия": "HU",
  it: "IT",
  italy: "IT",
  italia: "IT",
  "италия": "IT",
  es: "ES",
  spain: "ES",
  espana: "ES",
  "испания": "ES",
  pt: "PT",
  portugal: "PT",
  portuguesa: "PT",
  "португалия": "PT",
  fr: "FR",
  france: "FR",
  francee: "FR",
  "франция": "FR",
  nl: "NL",
  netherlands: "NL",
  nederland: "NL",
  "нидерланды": "NL",
  be: "BE",
  belgium: "BE",
  belgie: "BE",
  "бельгия": "BE",
  se: "SE",
  sweden: "SE",
  sverige: "SE",
  "швеция": "SE",
  fi: "FI",
  finland: "FI",
  suomi: "FI",
  "финляндия": "FI",
  dk: "DK",
  denmark: "DK",
  danmark: "DK",
  "дания": "DK",
  ie: "IE",
  ireland: "IE",
  eire: "IE",
  "ирландия": "IE",
  gr: "GR",
  greece: "GR",
  hellas: "GR",
  "греция": "GR",
  hr: "HR",
  croatia: "HR",
  hrvatska: "HR",
  "хорватия": "HR",
  si: "SI",
  slovenia: "SI",
  slovenija: "SI",
  "словения": "SI",
  mt: "MT",
  malta: "MT",
  maltese: "MT",
  "мальта": "MT",
  cy: "CY",
  cyprus: "CY",
  kypros: "CY",
  "кипр": "CY",
  lu: "LU",
  luxembourg: "LU",
  letzebuerg: "LU",
  "люксембург": "LU",
  no: "NO",
  norway: "NO",
  norge: "NO",
  "норвегия": "NO",
  gb: "GB",
  uk: "GB",
  "united kingdom": "GB",
  britain: "GB",
  "great britain": "GB",
  "великобритания": "GB",
  us: "US",
  usa: "US",
  "united states": "US",
  america: "US",
  "сша": "US",
  kz: "KZ",
  kazakhstan: "KZ",
  "казахстан": "KZ"
};

const COUNTRY_NAME_FALLBACK = {
  AT: "Австрия",
  BE: "Бельгия",
  BG: "Болгария",
  HR: "Хорватия",
  CY: "Кипр",
  CZ: "Чехия",
  DK: "Дания",
  EE: "Эстония",
  FI: "Финляндия",
  FR: "Франция",
  DE: "Германия",
  GR: "Греция",
  HU: "Венгрия",
  IE: "Ирландия",
  IT: "Италия",
  LV: "Латвия",
  LT: "Литва",
  LU: "Люксембург",
  MT: "Мальта",
  NL: "Нидерланды",
  PL: "Польша",
  PT: "Португалия",
  RO: "Румыния",
  SK: "Словакия",
  SI: "Словения",
  ES: "Испания",
  SE: "Швеция",
  UA: "Украина",
  RU: "Россия",
  BY: "Беларусь",
  NO: "Норвегия",
  GB: "Великобритания",
  US: "США",
  KZ: "Казахстан"
};

const REGION_DISPLAY = typeof Intl !== "undefined" && typeof Intl.DisplayNames === "function"
  ? new Intl.DisplayNames(["ru"], { type: "region" })
  : null;

const FOCUSABLE_SELECTORS =
  'a[href], area[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB
const ALLOWED_FILE_EXTENSIONS = [".pdf", ".png", ".jpg", ".jpeg"];
const ALLOWED_MIME_TYPES = ["application/pdf", "image/png", "image/jpeg"];
const FILE_ACCEPT_ATTRIBUTE = ALLOWED_FILE_EXTENSIONS.join(",");

function createMockFile(name, options = {}) {
  const {
    mime = "application/pdf",
    uploadedAt = new Date().toISOString(),
    sizeBytes = 512 * 1024,
    content = "Файл-заглушка для предпросмотра"
  } = options;

  let url = "#";
  if (typeof Blob !== "undefined" && typeof URL !== "undefined" && typeof URL.createObjectURL === "function") {
    try {
      const blob = new Blob([content], { type: mime });
      url = URL.createObjectURL(blob);
    } catch (error) {
      console.warn("Не удалось создать заглушку файла", error);
    }
  }

  return {
    id: `mock-${Math.random().toString(36).slice(2, 9)}`,
    name,
    uploadedAt,
    size: sizeBytes,
    mime,
    url,
    mock: true
  };
}

function formatFileSize(bytes) {
  if (bytes === undefined || bytes === null || Number.isNaN(Number(bytes))) {
    return "—";
  }
  const units = ["Б", "КБ", "МБ", "ГБ"];
  let size = Number(bytes);
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex += 1;
  }
  return `${size % 1 === 0 ? size : size.toFixed(1)} ${units[unitIndex]}`;
}

function validateFileInput(file) {
  if (!file) {
    return { valid: false, error: "Файл не выбран." };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: "Файл превышает 20 МБ." };
  }

  const extension = file.name ? file.name.substring(file.name.lastIndexOf(".")).toLowerCase() : "";
  const isAllowedExtension = ALLOWED_FILE_EXTENSIONS.includes(extension);
  const isAllowedMime = ALLOWED_MIME_TYPES.includes(file.type);

  if (!isAllowedExtension && !isAllowedMime) {
    return { valid: false, error: "Допускаются только PDF, PNG или JPEG." };
  }

  return { valid: true };
}

function buildFileRecordFromInput(file) {
  const uploadedAt = new Date().toISOString();
  let url = "#";
  if (typeof URL !== "undefined" && typeof URL.createObjectURL === "function") {
    try {
      url = URL.createObjectURL(file);
    } catch (error) {
      console.warn("Не удалось создать ссылку на файл", error);
    }
  }

  return {
    id: `file-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name: file.name,
    uploadedAt,
    size: file.size,
    mime: file.type || guessMimeFromExtension(file.name),
    url
  };
}

function guessMimeFromExtension(name = "") {
  const extension = name.substring(name.lastIndexOf(".")).toLowerCase();
  switch (extension) {
    case ".pdf":
      return "application/pdf";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    default:
      return "application/octet-stream";
  }
}

function getLatestDocumentFile(doc) {
  if (!doc || !doc.files || !doc.files.length) {
    return null;
  }
  return doc.files[0];
}

function ensureDocumentRecord(driver, type) {
  if (!driver) {
    return null;
  }
  driver.documents = Array.isArray(driver.documents) ? driver.documents : [];
  let doc = driver.documents.find((item) => item.type === type);
  if (!doc) {
    doc = {
      id: `${driver.id || "driver"}-${type}`,
      type,
      number: null,
      issueDate: null,
      expiryDate: null,
      country: null,
      files: [],
      extra: {}
    };
    driver.documents.push(doc);
  }
  return doc;
}

function isDocumentEmpty(doc) {
  if (!doc) {
    return true;
  }
  const hasCoreFields = Boolean(
    doc.number ||
      doc.issueDate ||
      doc.expiryDate ||
      doc.country ||
      doc.countryCode ||
      doc.country_code ||
      doc.issuer ||
      (Array.isArray(doc.categories) && doc.categories.length) ||
      (Array.isArray(doc.files) && doc.files.length)
  );
  const hasExtra = doc.extra && Object.values(doc.extra).some((value) => Boolean(value));
  return !(hasCoreFields || hasExtra);
}

function getDocumentEffectiveExpiry(doc, driver) {
  if (!doc) {
    return null;
  }
  if (doc.expiryDate) {
    return doc.expiryDate;
  }
  if (doc.type === "psihotest") {
    return calculatePsihotestExpiry(driver?.personal?.birthDate, doc.issueDate);
  }
  return null;
}

function calculatePsihotestExpiry(birthDate, completionDate) {
  if (!completionDate) {
    return null;
  }
  const completion = new Date(completionDate);
  if (Number.isNaN(completion.getTime())) {
    return null;
  }
  const age = getAgeOnDate(birthDate, completion);
  const yearsToAdd = age !== null && age >= 60 ? 1 : 3;
  const expiry = new Date(completion);
  expiry.setFullYear(expiry.getFullYear() + yearsToAdd);
  return expiry.toISOString().split("T")[0];
}

function getAgeOnDate(birthDate, referenceDate) {
  if (!birthDate) {
    return null;
  }
  const birth = new Date(birthDate);
  const reference = new Date(referenceDate);
  if (Number.isNaN(birth.getTime()) || Number.isNaN(reference.getTime())) {
    return null;
  }
  let age = reference.getFullYear() - birth.getFullYear();
  const monthDiff = reference.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && reference.getDate() < birth.getDate())) {
    age -= 1;
  }
  return age;
}

function formatDocumentCountryOrIssuer(doc) {
  if (!doc) {
    return "—";
  }
  const countryValue = doc.country || doc.countryCode || doc.country_code;
  if (countryValue) {
    const code = resolveCountryCode(countryValue);
    if (code) {
      return getCountryDisplayName(code, countryValue);
    }
    return typeof countryValue === "string" ? countryValue : String(countryValue);
  }
  return doc.issuer || "—";
}

const driversData = [
  {
    id: "drv-001",
    internalNumber: "DRV-0001",
    status: "active",
    personal: {
      firstName: "Jan",
      lastName: "Novák",
      middleName: "",
      birthDate: "1987-03-22",
      rodneCislo: "870322/1234",
      citizenship: "Чехия",
      gender: "male",
      registrationAddress: "K Zahradám 123, Praha",
      residenceAddress: "K Zahradám 123, Praha",
      phone: "+420 777 123 456",
      email: "jan.novak@gtrack.cz"
    },
    work: {
      hireDate: "2018-02-01",
      fireDate: null,
      contract: {
        startDate: "2018-02-01",
        endDate: null,
        type: "permanent",
        indefinite: true,
        signed: true,
        signedBy: "dir-001"
      },
      workLocation: "praha",
      workAddress: WORK_LOCATION_ADDRESSES.praha
    },
    bank: {
      countryCode: "CZ",
      bankAccount: "123456789/0100",
      iban: null,
      swift: null
    },
    flags: {
      passportInArchive: true,
      czResidence: true,
      a1Sw: false
    },
    documents: [
      {
        id: "drv-001-license",
        type: "license_generic",
        issueDate: "2019-01-10",
        expiryDate: "2026-01-09",
        files: [
          createMockFile("company_license.pdf", {
            uploadedAt: "2024-12-28T10:00:00Z",
            sizeBytes: Math.round(0.5 * 1024 * 1024)
          })
        ]
      },
      {
        id: "drv-001-a1",
        type: "a1",
        issueDate: "2025-01-01",
        expiryDate: "2025-12-31",
        files: []
      },
      {
        id: "drv-001-a1-sw",
        type: "a1_switzerland",
        issueDate: "2025-01-01",
        expiryDate: "2025-12-31",
        files: []
      },
      {
        id: "drv-001-declaration",
        type: "declaration",
        issueDate: "2024-03-01",
        expiryDate: "2025-03-01",
        extra: { handed_over: true },
        files: []
      },
      {
        id: "drv-001-insurance",
        type: "insurance",
        issueDate: "2025-01-01",
        expiryDate: "2025-12-31",
        files: []
      },
      {
        id: "drv-001-travel-insurance",
        type: "travel_insurance",
        issueDate: "2025-01-01",
        expiryDate: "2025-12-31",
        files: []
      },
      {
        id: "drv-001-residence",
        type: "residence",
        issueDate: "2020-04-15",
        expiryDate: "2030-04-14",
        issuer: "Praha 20",
        files: [
          createMockFile("residence_confirmation.pdf", {
            uploadedAt: "2020-04-16T09:30:00Z",
            sizeBytes: Math.round(0.3 * 1024 * 1024)
          })
        ]
      },
      {
        id: "drv-001-licence",
        type: "licence",
        number: "CZ998877",
        issueDate: "2020-05-10",
        expiryDate: "2030-05-09",
        categories: ["C", "E"],
        country: "CZ",
        files: [
          createMockFile("drivers_licence_jan.pdf", {
            uploadedAt: "2024-11-18T08:00:00Z",
            sizeBytes: Math.round(740 * 1024)
          })
        ]
      },
      {
        id: "drv-001-adr",
        type: "adr",
        issueDate: "2023-03-01",
        expiryDate: "2026-03-01",
        files: []
      },
      {
        id: "drv-001-tacho",
        type: "tacho_card",
        number: "1234567890",
        issueDate: "2021-08-01",
        expiryDate: "2025-08-01",
        files: [
          createMockFile("tachograph_card_2023.pdf", {
            uploadedAt: "2023-08-02T12:00:00Z",
            sizeBytes: Math.round(620 * 1024)
          })
        ]
      },
      {
        id: "drv-001-code95",
        type: "code95",
        issueDate: "2022-09-01",
        expiryDate: "2026-08-31",
        files: []
      },
      {
        id: "drv-001-medical",
        type: "medical",
        issueDate: "2024-02-01",
        expiryDate: "2026-02-01",
        files: []
      },
      {
        id: "drv-001-psihotest",
        type: "psihotest",
        issueDate: "2023-11-12",
        expiryDate: null,
        files: []
      },
      {
        id: "drv-001-visa",
        type: "visa",
        number: null,
        issueDate: null,
        expiryDate: null,
        country: null,
        files: []
      },
      {
        id: "drv-001-passport",
        type: "passport",
        number: "CZ1234567",
        issueDate: "2021-01-15",
        expiryDate: "2031-01-14",
        country: "CZ",
        files: [
          createMockFile("passport_jan_2025.pdf", {
            uploadedAt: "2025-07-02T10:15:00Z",
            sizeBytes: Math.round(980 * 1024)
          }),
          createMockFile("passport_jan_2024.pdf", {
            uploadedAt: "2024-01-20T09:00:00Z",
            sizeBytes: Math.round(1.2 * 1024 * 1024)
          })
        ]
      }
    ],
    salary: {
      type: "monthly",
      baseAmount: 3200,
      currency: "EUR",
      bonuses: [
        { label: "Квартальный бонус", amount: 400, currency: "EUR" }
      ],
      deductions: [
        { label: "Штраф за парковку", amount: 80, currency: "EUR" }
      ],
      notes: "Повышение ставки с июля 2024"
    },
    perDiem: {
      currentPeriod: "2025-08",
      trips: [
        { country: "DE", from: "2025-08-02", to: "2025-08-05", days: 4, amount: 240, currency: "EUR" },
        { country: "AT", from: "2025-08-12", to: "2025-08-14", days: 3, amount: 162, currency: "EUR" }
      ],
      deductions: [
        { label: "Проживание оплачено", amount: 90, currency: "EUR" }
      ]
    },
    history: [
      { date: "2025-08-12", action: "Документы", details: "Загружен Psihotest", author: "HR · Petra Malá" },
      { date: "2025-07-01", action: "Командировки", details: "Расчёт per-diem за июнь", author: "Accounting · Marek V." }
    ],
    comments: [
      {
        date: "2025-08-18T08:30:00Z",
        author: "HR Анна",
        text: "Запросить продление A1 за 60 дней до срока.",
        file: createMockFile("a1_extension_plan.pdf", {
          uploadedAt: "2025-08-18T08:25:00Z",
          sizeBytes: Math.round(340 * 1024)
        })
      }
    ],
    files: [
      { ...createMockFile("passport_jan.pdf", { uploadedAt: "2024-01-20T09:00:00Z", sizeBytes: Math.round(1.2 * 1024 * 1024) }), description: "Паспорт" },
      { ...createMockFile("a1_2025.pdf", { uploadedAt: "2025-01-03T11:00:00Z", sizeBytes: Math.round(420 * 1024) }), description: "A1 сертификат" }
    ]
  },
  {
    id: "drv-002",
    internalNumber: "DRV-0002",
    status: "on_leave",
    personal: {
      firstName: "Olena",
      lastName: "Shevchenko",
      middleName: "",
      birthDate: "1991-07-11",
      rodneCislo: null,
      citizenship: "Украина",
      gender: "female",
      registrationAddress: "Lvivska 45, Brno",
      residenceAddress: "Lvivska 45, Brno",
      phone: "+420 733 222 110",
      email: "olena.shevchenko@gtrack.cz"
    },
    work: {
      hireDate: "2022-05-10",
      fireDate: null,
      contract: {
        startDate: "2022-05-10",
        endDate: "2025-05-09",
        type: "fixed",
        indefinite: false,
        signed: true,
        signedBy: "dir-002"
      },
      workLocation: "kladno",
      workAddress: WORK_LOCATION_ADDRESSES.kladno
    },
    bank: {
      countryCode: "UA",
      bankAccount: null,
      iban: "UA903220010000026203123456789",
      swift: "PBANUA2X"
    },
    flags: {
      passportInArchive: false,
      czResidence: true,
      a1Sw: true
    },
    documents: [
      {
        id: "drv-002-license",
        type: "license_generic",
        issueDate: "2022-05-05",
        expiryDate: "2025-05-04",
        files: []
      },
      {
        id: "drv-002-a1",
        type: "a1",
        issueDate: "2024-02-01",
        expiryDate: "2024-12-31",
        files: []
      },
      {
        id: "drv-002-a1-sw",
        type: "a1_switzerland",
        issueDate: "2024-02-01",
        expiryDate: "2024-12-31",
        files: []
      },
      {
        id: "drv-002-declaration",
        type: "declaration",
        issueDate: "2024-02-15",
        expiryDate: "2025-02-14",
        extra: { handed_over: false },
        files: []
      },
      {
        id: "drv-002-insurance",
        type: "insurance",
        issueDate: "2024-04-01",
        expiryDate: "2025-04-01",
        files: []
      },
      {
        id: "drv-002-travel",
        type: "travel_insurance",
        issueDate: "2024-04-01",
        expiryDate: "2025-04-01",
        files: []
      },
      {
        id: "drv-002-residence",
        type: "residence",
        issueDate: "2023-02-10",
        expiryDate: "2024-02-09",
        issuer: "Kladno",
        files: []
      },
      {
        id: "drv-002-licence",
        type: "licence",
        number: "UA112233",
        issueDate: "2019-08-20",
        expiryDate: "2029-08-19",
        categories: ["C"],
        country: "UA",
        files: []
      },
      {
        id: "drv-002-adr",
        type: "adr",
        issueDate: "2022-06-01",
        expiryDate: "2025-06-01",
        files: []
      },
      {
        id: "drv-002-tacho",
        type: "tacho_card",
        number: "9080706050",
        issueDate: "2021-12-10",
        expiryDate: "2024-12-09",
        files: []
      },
      {
        id: "drv-002-code95",
        type: "code95",
        issueDate: "2020-10-01",
        expiryDate: "2025-10-01",
        files: []
      },
      {
        id: "drv-002-medical",
        type: "medical",
        issueDate: "2023-09-20",
        expiryDate: "2025-09-20",
        files: []
      },
      {
        id: "drv-002-psihotest",
        type: "psihotest",
        issueDate: "2023-10-18",
        expiryDate: null,
        files: []
      },
      {
        id: "drv-002-visa",
        type: "visa",
        number: "CZV-556677",
        issueDate: "2024-05-15",
        expiryDate: "2025-05-14",
        country: "CZ",
        files: [
          createMockFile("olena_visa_2024.pdf", {
            uploadedAt: "2024-05-16T13:20:00Z",
            sizeBytes: Math.round(780 * 1024)
          })
        ]
      },
      {
        id: "drv-002-passport",
        type: "passport",
        number: "EP123456",
        issueDate: "2020-09-01",
        expiryDate: "2030-08-31",
        country: "UA",
        files: [
          createMockFile("olena_passport_2023.pdf", {
            uploadedAt: "2023-09-15T09:45:00Z",
            sizeBytes: Math.round(860 * 1024)
          })
        ]
      }
    ],
    salary: {
      type: "per_trip",
      baseAmount: 180,
      currency: "EUR",
      bonuses: [
        { label: "Бонус за пунктуальность", amount: 150, currency: "EUR" }
      ],
      deductions: [],
      notes: "Перешла на командировочный график с января 2024"
    },
    perDiem: {
      currentPeriod: "2025-07",
      trips: [
        { country: "IT", from: "2025-07-03", to: "2025-07-07", days: 5, amount: 260, currency: "EUR" },
        { country: "FR", from: "2025-07-15", to: "2025-07-19", days: 5, amount: 310, currency: "EUR" }
      ],
      deductions: [
        { label: "Штраф за простой", amount: 120, currency: "EUR" }
      ]
    },
    history: [
      { date: "2025-06-22", action: "Отпуск", details: "Оформлен отпуск по уходу за ребёнком", author: "HR · Lenka P." },
      { date: "2025-05-14", action: "Документы", details: "Продлена рабочая виза", author: "HR · Lenka P." }
    ],
    comments: [
      { date: "2025-07-02T10:12:00Z", author: "Dispatcher", text: "После отпуска требуется обновить обучение по ADR." }
    ],
    files: [
      { ...createMockFile("visa_2024.pdf", { uploadedAt: "2024-05-16T13:25:00Z", sizeBytes: Math.round(0.8 * 1024 * 1024) }), description: "Виза" }
    ]
  },
  {
    id: "drv-003",
    internalNumber: "DRV-0003",
    status: "terminated",
    personal: {
      firstName: "Marek",
      lastName: "Svoboda",
      middleName: "",
      birthDate: "1980-01-09",
      rodneCislo: "800109/5543",
      citizenship: "Чехия",
      gender: "male",
      registrationAddress: "Mostecká 9, Kladno",
      residenceAddress: "Mostecká 9, Kladno",
      phone: "+420 602 555 888",
      email: "marek.svoboda@gtrack.cz"
    },
    work: {
      hireDate: "2014-03-01",
      fireDate: "2024-06-15",
      contract: {
        startDate: "2014-03-01",
        endDate: "2024-06-15",
        type: "permanent",
        indefinite: false,
        signed: true,
        signedBy: "dir-003"
      },
      workLocation: "kladno",
      workAddress: WORK_LOCATION_ADDRESSES.kladno
    },
    bank: {
      countryCode: "CZ",
      bankAccount: "987654321/0300",
      iban: null,
      swift: null
    },
    flags: {
      passportInArchive: true,
      czResidence: false,
      a1Sw: false
    },
    documents: [
      {
        id: "drv-003-license",
        type: "license_generic",
        issueDate: "2014-03-01",
        expiryDate: "2020-03-01",
        files: []
      },
      {
        id: "drv-003-a1",
        type: "a1",
        issueDate: "2022-01-01",
        expiryDate: "2022-12-31",
        files: []
      },
      {
        id: "drv-003-a1-sw",
        type: "a1_switzerland",
        issueDate: null,
        expiryDate: null,
        files: []
      },
      {
        id: "drv-003-declaration",
        type: "declaration",
        issueDate: "2022-03-01",
        expiryDate: "2023-03-01",
        extra: { handed_over: true },
        files: []
      },
      {
        id: "drv-003-insurance",
        type: "insurance",
        issueDate: "2023-01-01",
        expiryDate: "2023-12-31",
        files: []
      },
      {
        id: "drv-003-travel",
        type: "travel_insurance",
        issueDate: "2023-01-01",
        expiryDate: "2023-12-31",
        files: []
      },
      {
        id: "drv-003-residence",
        type: "residence",
        issueDate: "2014-03-01",
        expiryDate: "2024-03-01",
        issuer: "Kladno",
        files: []
      },
      {
        id: "drv-003-licence",
        type: "licence",
        number: "CZ445566",
        issueDate: "2015-06-01",
        expiryDate: "2025-06-01",
        categories: ["C", "E"],
        country: "CZ",
        files: []
      },
      {
        id: "drv-003-adr",
        type: "adr",
        issueDate: "2021-02-01",
        expiryDate: "2024-02-01",
        files: []
      },
      {
        id: "drv-003-tacho",
        type: "tacho_card",
        number: "4455667788",
        issueDate: "2019-09-01",
        expiryDate: "2024-09-01",
        files: []
      },
      {
        id: "drv-003-code95",
        type: "code95",
        issueDate: "2018-05-01",
        expiryDate: "2023-05-01",
        files: []
      },
      {
        id: "drv-003-medical",
        type: "medical",
        issueDate: "2022-01-10",
        expiryDate: "2024-01-09",
        files: []
      },
      {
        id: "drv-003-psihotest",
        type: "psihotest",
        issueDate: "2021-11-15",
        expiryDate: null,
        files: []
      },
      {
        id: "drv-003-visa",
        type: "visa",
        number: null,
        issueDate: null,
        expiryDate: null,
        country: null,
        files: []
      },
      {
        id: "drv-003-passport",
        type: "passport",
        number: "CZ7654321",
        issueDate: "2016-04-04",
        expiryDate: "2026-04-03",
        country: "CZ",
        files: [
          createMockFile("marek_passport_2022.pdf", {
            uploadedAt: "2022-04-06T07:30:00Z",
            sizeBytes: Math.round(910 * 1024)
          })
        ]
      }
    ],
    salary: {
      type: "monthly",
      baseAmount: 2800,
      currency: "EUR",
      bonuses: [],
      deductions: [
        { label: "Удержание за недостачу", amount: 300, currency: "EUR" }
      ],
      notes: "Расчёт окончательного расчёта в июне 2024"
    },
    perDiem: {
      currentPeriod: "2024-05",
      trips: [
        { country: "PL", from: "2024-05-04", to: "2024-05-08", days: 5, amount: 180, currency: "EUR" }
      ],
      deductions: []
    },
    history: [
      { date: "2024-06-15", action: "Увольнение", details: "Увольнение по собственному желанию", author: "HR · Pavel H." },
      { date: "2024-05-30", action: "Документы", details: "Напоминание о сдаче A1", author: "HR · Pavel H." }
    ],
    comments: [
      { date: "2024-06-20T12:00:00Z", author: "Accounting", text: "Закрыть выплату компенсации за отпуск." }
    ],
    files: [
      { ...createMockFile("termination_protocol.pdf", { uploadedAt: "2024-06-16T15:40:00Z", sizeBytes: Math.round(0.6 * 1024 * 1024) }), description: "Протокол увольнения" }
    ]
  }
];

const state = {
  filters: {
    search: "",
    status: "all",
    document: "all",
    euOnly: false
  },
  selectedDriverId: null,
  selectedDriverIds: new Set(),
  cardMode: "view",
  filteredDrivers: [],
  modalOpen: false,
  pendingDocumentUpload: null
};

const modalState = {
  previouslyFocusedElement: null,
  scrollPosition: 0,
  focusableElements: []
};

const elements = {
  tableBody: document.getElementById("driversTableBody"),
  driversCount: document.getElementById("driversCount"),
  selectAll: document.getElementById("selectAll"),
  message: document.getElementById("appMessage"),
  driverCard: document.getElementById("driverCard"),
  reminderButton: document.getElementById("sendReminderBtn"),
  addDriverButton: document.getElementById("addDriverBtn"),
  searchInput: document.getElementById("searchInput"),
  statusFilter: document.getElementById("statusFilter"),
  documentFilter: document.getElementById("documentFilter"),
  euOnlyFilter: document.getElementById("euOnlyFilter"),
  modal: document.getElementById("driverModal"),
  modalContainer: document.querySelector("#driverModal .modal-container"),
  modalBackdrop: document.querySelector("#driverModal [data-modal-dismiss]"),
  modalClose: document.querySelector("#driverModal .modal-close")
};

const documentUploadInput = document.createElement("input");
documentUploadInput.type = "file";
documentUploadInput.accept = FILE_ACCEPT_ATTRIBUTE;
documentUploadInput.hidden = true;
document.body.appendChild(documentUploadInput);
documentUploadInput.addEventListener("change", handleDocumentFileSelected);

function init() {
  attachEvents();
  refresh();
}

function attachEvents() {
  elements.searchInput.addEventListener("input", () => {
    state.filters.search = elements.searchInput.value.trim().toLowerCase();
    refresh();
  });

  elements.statusFilter.addEventListener("change", () => {
    state.filters.status = elements.statusFilter.value;
    refresh();
  });

  elements.documentFilter.addEventListener("change", () => {
    state.filters.document = elements.documentFilter.value;
    refresh();
  });

  elements.euOnlyFilter.addEventListener("change", () => {
    state.filters.euOnly = elements.euOnlyFilter.checked;
    refresh();
  });

  elements.selectAll.addEventListener("change", (event) => {
    handleSelectAll(event.target.checked);
  });

  elements.reminderButton.addEventListener("click", sendDocumentReminders);

  elements.addDriverButton.addEventListener("click", () => {
    state.cardMode = "create";
    openDriverModal();
  });

  if (elements.modalClose) {
    elements.modalClose.addEventListener("click", () => closeDriverModal());
  }

  if (elements.modalBackdrop) {
    elements.modalBackdrop.addEventListener("click", () => closeDriverModal());
  }

  if (elements.modal) {
    elements.modal.addEventListener("keydown", handleModalKeydown);
  }

  document.addEventListener("keydown", handleGlobalKeyDown, { passive: false });

  if (elements.driverCard) {
    elements.driverCard.addEventListener("click", handleDriverCardClick);
  }
}

function refresh() {
  state.filteredDrivers = getFilteredDrivers();
  renderDriverList();
  updateSelectAllCheckbox();
  updateMassActionsState();

  const driverStillVisible = state.selectedDriverId
    ? state.filteredDrivers.some((driver) => driver.id === state.selectedDriverId)
    : false;

  if (!driverStillVisible && state.cardMode === "view") {
    if (state.modalOpen) {
      closeDriverModal();
    }
    state.selectedDriverId = null;
  }

  if (state.modalOpen) {
    if (state.cardMode === "create") {
      renderDriverCard(null);
    } else {
      const driver = getDriverById(state.selectedDriverId);
      if (driver) {
        renderDriverCard(driver);
      } else {
        closeDriverModal();
      }
    }
  }

  highlightSelectedRow(state.selectedDriverId);
}

function getDriverById(id) {
  return driversData.find((driver) => driver.id === id) || null;
}

function getFilteredDrivers() {
  return driversData.filter((driver) => {
    if (state.filters.status !== "all" && driver.status !== state.filters.status) {
      return false;
    }

    if (state.filters.euOnly) {
      const info = getDriverCitizenshipInfo(driver);
      if (!info?.isEu) {
        return false;
      }
    }

    if (state.filters.document !== "all") {
      const docs = Array.isArray(driver.documents) ? driver.documents : [];
      const matchesDocument = docs.some(
        (doc) => !isDocumentEmpty(doc) && getDocumentStatus(doc, driver) === state.filters.document
      );
      if (!matchesDocument) {
        return false;
      }
    }

    if (state.filters.search) {
      const term = state.filters.search;
      const searchable = [
        getDriverFullName(driver).toLowerCase(),
        driver.personal.email?.toLowerCase() || "",
        driver.personal.phone?.toLowerCase() || ""
      ];
      if (!searchable.some((value) => value.includes(term))) {
        return false;
      }
    }

    return true;
  });
}

function openDriverModal(driverId) {
  if (typeof driverId === "string") {
    state.selectedDriverId = driverId;
  }

  if (state.modalOpen) {
    const driver = state.cardMode === "view" ? getDriverById(state.selectedDriverId) : null;
    renderDriverCard(driver);
    highlightSelectedRow(state.selectedDriverId);
    updateModalFocusables();
    return;
  }

  modalState.previouslyFocusedElement = document.activeElement;
  modalState.scrollPosition = window.scrollY || document.documentElement.scrollTop || 0;

  if (elements.modal) {
    elements.modal.removeAttribute("hidden");
  }

  document.body.classList.add("modal-open");
  document.body.style.top = `-${modalState.scrollPosition}px`;
  state.modalOpen = true;

  const driver = state.cardMode === "view" ? getDriverById(state.selectedDriverId) : null;
  renderDriverCard(driver);
  highlightSelectedRow(state.selectedDriverId);
  updateModalFocusables();

  requestAnimationFrame(() => {
    focusFirstModalElement();
  });
}

function closeDriverModal() {
  if (!state.modalOpen) {
    return;
  }

  state.modalOpen = false;
  state.cardMode = "view";
  state.pendingDocumentUpload = null;
  document.querySelectorAll(".file-history-overlay").forEach((node) => node.remove());

  if (elements.modal) {
    elements.modal.setAttribute("hidden", "");
  }

  document.body.classList.remove("modal-open");
  document.body.style.top = "";
  window.scrollTo({ top: modalState.scrollPosition });

  modalState.scrollPosition = 0;
  modalState.focusableElements = [];

  const focusTarget = modalState.previouslyFocusedElement;
  modalState.previouslyFocusedElement = null;
  if (focusTarget && typeof focusTarget.focus === "function" && document.body.contains(focusTarget)) {
    focusTarget.focus();
  } else if (elements.addDriverButton) {
    elements.addDriverButton.focus();
  }

  highlightSelectedRow(state.selectedDriverId);
}

function handleModalKeydown(event) {
  if (!state.modalOpen || event.key !== "Tab") {
    return;
  }

  updateModalFocusables();
  const focusables = modalState.focusableElements;
  if (!focusables.length) {
    event.preventDefault();
    if (elements.modalContainer) {
      elements.modalContainer.focus();
    }
    return;
  }

  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  const active = document.activeElement;

  if (event.shiftKey && active === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && active === last) {
    event.preventDefault();
    first.focus();
  }
}

function handleGlobalKeyDown(event) {
  if (!state.modalOpen) {
    return;
  }

  if (event.key === "Escape") {
    event.preventDefault();
    closeDriverModal();
  }
}

function focusFirstModalElement() {
  if (!state.modalOpen) {
    return;
  }
  if (elements.modalContainer) {
    elements.modalContainer.focus();
  }
}

function updateModalFocusables() {
  if (!elements.modal) {
    modalState.focusableElements = [];
    return;
  }

  const focusables = Array.from(elements.modal.querySelectorAll(FOCUSABLE_SELECTORS));
  modalState.focusableElements = focusables.filter((element) => isFocusable(element));
}

function isFocusable(element) {
  if (!element || element.hasAttribute("disabled") || element.getAttribute("aria-hidden") === "true") {
    return false;
  }
  const style = window.getComputedStyle(element);
  if (style.display === "none" || style.visibility === "hidden") {
    return false;
  }
  if (typeof element.offsetParent !== "undefined" && element.offsetParent === null && !element.getClientRects().length) {
    return false;
  }
  return true;
}

function renderDriverList() {
  elements.tableBody.innerHTML = "";
  elements.driversCount.textContent = state.filteredDrivers.length;

  if (!state.filteredDrivers.length) {
    const emptyRow = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 4;
    td.innerHTML = '<div class="empty-state">Нет водителей по заданным фильтрам.</div>';
    emptyRow.appendChild(td);
    elements.tableBody.appendChild(emptyRow);
    return;
  }

  state.filteredDrivers.forEach((driver) => {
    const tr = document.createElement("tr");
    tr.dataset.driverId = driver.id;
    tr.tabIndex = 0;
    tr.setAttribute("aria-label", `Открыть карточку водителя ${getDriverFullName(driver) || ""}`.trim());
    const isActive = state.cardMode === "view" && driver.id === state.selectedDriverId;
    tr.classList.toggle("active", isActive);
    tr.setAttribute("aria-selected", isActive ? "true" : "false");

    tr.addEventListener("click", (event) => {
      if (event.target.closest("input, button, a")) {
        return;
      }
      state.selectedDriverId = driver.id;
      state.cardMode = "view";
      openDriverModal(driver.id);
    });

    tr.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        if (event.key === " ") {
          event.preventDefault();
        }
        state.selectedDriverId = driver.id;
        state.cardMode = "view";
        openDriverModal(driver.id);
      } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        const rows = Array.from(elements.tableBody.querySelectorAll("tr[data-driver-id]"));
        const currentIndex = rows.indexOf(tr);
        if (currentIndex === -1) {
          return;
        }
        const nextIndex = event.key === "ArrowDown" ? Math.min(currentIndex + 1, rows.length - 1) : Math.max(currentIndex - 1, 0);
        if (rows[nextIndex]) {
          rows[nextIndex].focus();
        }
      }
    });

    const selectCell = document.createElement("td");
    selectCell.classList.add("select-col");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = state.selectedDriverIds.has(driver.id);
    checkbox.setAttribute("aria-label", `Выбрать ${getDriverFullName(driver) || "водителя"}`);
    checkbox.addEventListener("click", (event) => event.stopPropagation());
    checkbox.addEventListener("keydown", (event) => event.stopPropagation());
    checkbox.addEventListener("change", (event) => {
      if (event.target.checked) {
        state.selectedDriverIds.add(driver.id);
      } else {
        state.selectedDriverIds.delete(driver.id);
      }
      updateMassActionsState();
      updateSelectAllCheckbox();
    });
    selectCell.appendChild(checkbox);
    tr.appendChild(selectCell);

    const nameCell = document.createElement("td");
    const fullName = getDriverFullName(driver) || "—";
    const contactsLine = formatDriverContacts(driver);
    const contactsMarkup = contactsLine ? `<div class="text-muted contact-line">${contactsLine}</div>` : "";
    nameCell.innerHTML = `<div class="driver-name"><strong>${fullName}</strong>${contactsMarkup}</div>`;
    tr.appendChild(nameCell);

    const statusCell = document.createElement("td");
    statusCell.innerHTML = `<span class="status-badge status-${driver.status}">${STATUS_LABELS[driver.status]}</span>`;
    tr.appendChild(statusCell);

    const docsCell = document.createElement("td");
    docsCell.appendChild(renderDocumentBadges(driver));
    tr.appendChild(docsCell);

    elements.tableBody.appendChild(tr);
  });
}

function highlightSelectedRow(id) {
  Array.from(elements.tableBody.querySelectorAll("tr[data-driver-id]")).forEach((row) => {
    const isActive = Boolean(id && row.dataset.driverId === id && state.cardMode === "view");
    row.classList.toggle("active", isActive);
    row.setAttribute("aria-selected", isActive ? "true" : "false");
  });
}

function getDriverCitizenshipInfo(driver) {
  if (!driver) {
    return null;
  }

  const personalValue = driver.personal?.citizenship || "";
  const personalCode = resolveCountryCode(personalValue);
  let code = personalCode;
  let fallbackValue = personalValue;

  if (!code) {
    const passport = getPrimaryPassport(driver);
    if (passport) {
      code = resolveCountryCode(passport.country || passport.country_code || "");
      fallbackValue = passport.country || passport.country_code || fallbackValue;
    }
  }

  if (!code) {
    return null;
  }

  const normalizedCode = code.toUpperCase();
  return {
    code: normalizedCode,
    name: getCountryDisplayName(normalizedCode, fallbackValue),
    isEu: EU_COUNTRY_CODES.has(normalizedCode)
  };
}

function shouldShowRodneCislo(driver) {
  if (!driver?.personal?.rodneCislo) {
    return false;
  }
  const citizenshipCode = resolveCountryCode(driver.personal.citizenship || "");
  if (citizenshipCode && citizenshipCode.toUpperCase() === "CZ") {
    return true;
  }
  const docs = Array.isArray(driver.documents) ? driver.documents : [];
  return docs.some((doc) => doc.type === "visa" && resolveCountryCode(doc.country || doc.countryCode) === "CZ");
}

function getPrimaryPassport(driver) {
  if (!driver?.documents?.length) {
    return null;
  }
  const passports = driver.documents.filter((doc) => doc.type === "passport");
  if (!passports.length) {
    return null;
  }
  const explicitPrimary = passports.find((doc) => doc.primary || doc.extra?.primary);
  if (explicitPrimary) {
    return explicitPrimary;
  }
  const sorted = [...passports].sort((a, b) => parseDateForSort(a.issueDate) - parseDateForSort(b.issueDate));
  return sorted[0] || passports[0];
}

function resolveCountryCode(value) {
  if (!value || typeof value !== "string") {
    return null;
  }
  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }
  if (/^[a-z]{2}$/i.test(trimmed)) {
    return trimmed.toUpperCase();
  }
  const normalized = trimmed.normalize
    ? trimmed.normalize("NFD").replace(new RegExp("[\\u0300-\\u036f]", "g"), "")
    : trimmed;
  const cleaned = normalized.replace(/[^a-zA-Zа-яА-ЯёЁ0-9\s-]/g, "");
  const key = cleaned.replace(/\s+/g, " ").trim().toLowerCase();
  if (!key) {
    return null;
  }
  return COUNTRY_CODE_ALIASES[key] || null;
}

function getCountryDisplayName(code, fallbackValue = "") {
  if (!code) {
    return fallbackValue || "—";
  }
  let localized = null;
  if (REGION_DISPLAY) {
    try {
      localized = REGION_DISPLAY.of(code);
    } catch (error) {
      localized = null;
    }
  }
  if (localized && localized !== code) {
    return localized;
  }
  return COUNTRY_NAME_FALLBACK[code] || fallbackValue || code;
}

function parseDateForSort(value) {
  if (!value) {
    return Number.POSITIVE_INFINITY;
  }
  const timestamp = Date.parse(value);
  return Number.isNaN(timestamp) ? Number.POSITIVE_INFINITY : timestamp;
}

function renderDocumentBadges(driver) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("badges");
  const summary = getDriverDocumentSummary(driver);
  Object.entries(summary).forEach(([status, count]) => {
    if (!count) return;
    const badge = document.createElement("span");
    badge.className = `badge ${status}`;
    badge.textContent = `${DOCUMENT_STATUS_LABELS[status]}: ${count}`;
    wrapper.appendChild(badge);
  });
  if (!wrapper.children.length) {
    wrapper.textContent = "Документов нет";
  }
  return wrapper;
}

function getDriverDocumentSummary(driver) {
  const summary = { expired: 0, soon: 0, warning: 0, valid: 0, unknown: 0 };
  const docs = Array.isArray(driver.documents) ? driver.documents : [];
  docs.forEach((doc) => {
    if (isDocumentEmpty(doc)) {
      return;
    }
    const status = getDocumentStatus(doc, driver);
    summary[status] = (summary[status] || 0) + 1;
  });
  return summary;
}

function getDocumentStatus(doc, driver) {
  const expiryValue = getDocumentEffectiveExpiry(doc, driver);
  if (!expiryValue) {
    return "unknown";
  }
  const expiry = new Date(expiryValue);
  if (Number.isNaN(expiry.getTime())) {
    return "unknown";
  }
  const today = new Date();
  const diffDays = Math.floor((expiry.getTime() - normalizeDate(today).getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays < 0) {
    return "expired";
  }
  if (diffDays <= 30) {
    return "soon";
  }
  if (diffDays <= 60) {
    return "warning";
  }
  return "valid";
}

function normalizeDate(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function renderDriverCard(driver, options = {}) {
  const { preserveScroll = false } = options;
  const previousScroll = elements.driverCard ? elements.driverCard.scrollTop : 0;

  if (state.cardMode === "create") {
    renderCreateDriverForm();
    if (state.modalOpen) {
      elements.driverCard.scrollTop = 0;
      updateModalFocusables();
    }
    return;
  }

  if (!driver) {
    elements.driverCard.classList.add("placeholder");
    elements.driverCard.innerHTML = `
      <h2 id="driverModalTitle" class="visually-hidden">Карточка водителя</h2>
      <p>Нет данных для отображения. Измените фильтры или создайте нового водителя.</p>
    `;
    if (state.modalOpen) {
      updateModalFocusables();
    }
    return;
  }

  document.querySelectorAll(".file-history-overlay").forEach((node) => node.remove());

  elements.driverCard.classList.remove("placeholder");
  const summary = getDriverDocumentSummary(driver);
  const docBadges = Object.entries(summary)
    .filter(([, count]) => count)
    .map(([status, count]) => `<span class="badge ${status}">${DOCUMENT_STATUS_LABELS[status]}: ${count}</span>`)
    .join(" ") || "—";

  const tags = [];
  if (driver.flags?.passportInArchive) {
    tags.push("<span class=\"tag\">Pas souhlas</span>");
  }
  if (driver.flags?.czResidence) {
    tags.push("<span class=\"tag\">Propiska CZ</span>");
  }
  if (driver.flags?.a1Sw) {
    tags.push("<span class=\"tag\">A1 SW</span>");
  }

  const salary = driver.salary || {};
  const perDiem = driver.perDiem || {};

  const salaryBonuses = (salary.bonuses || []).reduce((sum, item) => sum + (item.amount || 0), 0);
  const salaryDeductions = (salary.deductions || []).reduce((sum, item) => sum + (item.amount || 0), 0);
  const salaryTotal = (salary.baseAmount || 0) + salaryBonuses - salaryDeductions;

  const perDiemTotal = (perDiem.trips || []).reduce((sum, trip) => sum + (trip.amount || 0), 0);
  const perDiemDeductionTotal = (perDiem.deductions || []).reduce((sum, item) => sum + (item.amount || 0), 0);
  const perDiemNet = perDiemTotal - perDiemDeductionTotal;

  const metaItems = [
    `Дата рождения: ${formatDate(driver.personal.birthDate)}`,
    `Гражданство: ${driver.personal.citizenship || "—"}`,
    `Внутренний №: ${driver.internalNumber || "—"}`
  ];
  if (shouldShowRodneCislo(driver)) {
    metaItems.push(`RČ: ${driver.personal.rodneCislo}`);
  }
  const metaMarkup = metaItems.map((item) => `<span>${item}</span>`).join("");

  elements.driverCard.innerHTML = `
    <div class="card-header">
      <div>
        <h2 id="driverModalTitle">${getDriverFullName(driver)}</h2>
        <div class="card-meta">
          ${metaMarkup}${tags.length ? ` ${tags.join(" ")}` : ""}
        </div>
      </div>
      <span class="status-badge status-${driver.status}">${STATUS_LABELS[driver.status]}</span>
    </div>

    <section>
      <h3>Персональные данные</h3>
      <table>
        <tbody>
          <tr><th>Имя</th><td>${driver.personal.firstName || "—"}</td></tr>
          <tr><th>Фамилия</th><td>${driver.personal.lastName || "—"}</td></tr>
          <tr><th>Отчество</th><td>${driver.personal.middleName || "—"}</td></tr>
          <tr><th>Пол</th><td>${formatGender(driver.personal.gender)}</td></tr>
          <tr><th>Внутренний №</th><td>${driver.internalNumber || "—"}</td></tr>
          <tr><th>Телефон</th><td>${driver.personal.phone || "—"}</td></tr>
          <tr><th>E-mail</th><td>${driver.personal.email || "—"}</td></tr>
          <tr><th>Адрес регистрации</th><td>${driver.personal.registrationAddress || "—"}</td></tr>
          <tr><th>Адрес проживания</th><td>${driver.personal.residenceAddress || "—"}</td></tr>
        </tbody>
      </table>
    </section>

    <section>
      <h3>Рабочая информация</h3>
      <table>
        <tbody>
          <tr><th>Дата найма</th><td>${formatDate(driver.work.hireDate)}</td></tr>
          <tr><th>Дата увольнения</th><td>${formatDate(driver.work.fireDate)}</td></tr>
          <tr><th>Договор</th><td>${formatContract(driver.work.contract)}</td></tr>
          <tr><th>Рабочая локация</th><td>${WORK_LOCATION_LABELS[driver.work.workLocation] || "—"} · ${driver.work.workAddress || ""}</td></tr>
          <tr><th>Статус документов</th><td class="badges">${docBadges}</td></tr>
        </tbody>
      </table>
    </section>

    <section>
      <h3>Банковские реквизиты</h3>
      <table>
        <tbody>
          <tr><th>Страна банка</th><td>${driver.bank.countryCode || "—"}</td></tr>
          <tr><th>Счёт (CZ)</th><td>${driver.bank.bankAccount || "—"}</td></tr>
          <tr><th>IBAN</th><td>${driver.bank.iban || "—"}</td></tr>
          <tr><th>SWIFT</th><td>${driver.bank.swift || "—"}</td></tr>
        </tbody>
      </table>
    </section>

    <section>
      <h3>Основные документы</h3>
      ${renderPrimaryDocuments(driver)}
    </section>

    <section>
      <h3>Документы</h3>
      <div class="table-wrapper">
        <table class="documents-table">
          <thead>
            <tr>
              <th>Тип</th>
              <th>№</th>
              <th>Выдан</th>
              <th>Действует до</th>
              <th>Страна/Орган</th>
              <th>Статус</th>
              <th>Файлы</th>
              <th>Примечания</th>
            </tr>
          </thead>
          <tbody>
            ${renderDocumentsRows(driver)}
          </tbody>
        </table>
      </div>
    </section>

    <section>
      <h3>Зарплата</h3>
      <table>
        <tbody>
          <tr><th>Тип</th><td>${formatSalaryType(salary.type)}</td></tr>
          <tr><th>Базовая ставка</th><td>${formatCurrency(salary.baseAmount, salary.currency)}</td></tr>
          <tr><th>Бонусы</th><td>${formatAdjustmentsList(salary.bonuses)}</td></tr>
          <tr><th>Удержания</th><td>${formatAdjustmentsList(salary.deductions)}</td></tr>
          <tr><th>Итого</th><td>${formatCurrency(salaryTotal, salary.currency)}</td></tr>
          <tr><th>Комментарий</th><td>${salary.notes || "—"}</td></tr>
        </tbody>
      </table>
    </section>

    <section>
      <h3>Командировочные</h3>
      <table>
        <tbody>
          <tr><th>Период</th><td>${perDiem.currentPeriod || "—"}</td></tr>
          <tr><th>Рейсы</th><td>${formatTrips(perDiem.trips)}</td></tr>
          <tr><th>Сумма суточных</th><td>${formatCurrency(perDiemTotal, perDiem.trips?.[0]?.currency)}</td></tr>
          <tr><th>Удержания</th><td>${formatAdjustmentsList(perDiem.deductions)}</td></tr>
          <tr><th>К выплате</th><td>${formatCurrency(perDiemNet, perDiem.trips?.[0]?.currency)}</td></tr>
        </tbody>
      </table>
    </section>

    <section>
      <h3>Файлы</h3>
      ${renderFiles(driver.files)}
    </section>

    <section>
      <h3>История</h3>
      ${renderHistory(driver.history)}
    </section>

    <section>
      <h3>Комментарии</h3>
      ${renderComments(driver.comments)}
      <form class="comment-form" id="commentForm">
        <label for="commentInput">Новый комментарий</label>
        <textarea id="commentInput" placeholder="Добавьте комментарий по документам или задачам..."></textarea>
        <label class="file-input">
          <span>Прикрепить файл (PDF, PNG, JPEG; до 20 МБ)</span>
          <input type="file" id="commentFileInput" accept="${FILE_ACCEPT_ATTRIBUTE}">
        </label>
        <div class="file-hint text-muted" id="commentFileHint">Файл не выбран</div>
        <div class="actions">
          <button type="submit" class="primary">Сохранить комментарий</button>
        </div>
      </form>
    </section>
  `;

  if (preserveScroll) {
    requestAnimationFrame(() => {
      elements.driverCard.scrollTop = previousScroll;
    });
  } else {
    elements.driverCard.scrollTop = 0;
  }

  if (state.modalOpen) {
    updateModalFocusables();
  }

  const commentForm = document.getElementById("commentForm");
  if (commentForm) {
    const commentFileInput = document.getElementById("commentFileInput");
    const commentFileHint = document.getElementById("commentFileHint");

    if (commentFileInput && commentFileHint) {
      commentFileInput.addEventListener("change", () => {
        const file = commentFileInput.files?.[0];
        commentFileHint.textContent = file
          ? `${file.name} (${formatFileSize(file.size)})`
          : "Файл не выбран";
      });
    }

    commentForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const textarea = commentForm.querySelector("#commentInput");
      const text = textarea.value.trim();
      if (!text) {
        setAppMessage("Введите текст комментария.", "error");
        return;
      }
      driver.comments = driver.comments || [];
      let attachment = null;
      if (commentFileInput && commentFileInput.files?.[0]) {
        const candidate = commentFileInput.files[0];
        const validation = validateFileInput(candidate);
        if (!validation.valid) {
          setAppMessage(validation.error, "error");
          return;
        }
        attachment = buildFileRecordFromInput(candidate);
      }

      const newComment = {
        date: new Date().toISOString(),
        author: "Вы",
        text
      };

      if (attachment) {
        newComment.file = attachment;
      }

      driver.comments.unshift(newComment);
      textarea.value = "";
      if (commentFileInput) {
        commentFileInput.value = "";
      }
      if (commentFileHint) {
        commentFileHint.textContent = "Файл не выбран";
      }
      setAppMessage("Комментарий добавлен.", "success");
      renderDriverCard(driver, { preserveScroll: true });
    });
  }
}

function renderPrimaryDocuments(driver) {
  const documents = Array.isArray(driver.documents) ? driver.documents : [];
  const importantDocs = [
    { type: "passport", label: DOCUMENT_LABELS.passport },
    { type: "licence", label: DOCUMENT_LABELS.licence },
    { type: "tacho_card", label: DOCUMENT_LABELS.tacho_card }
  ];

  const cards = importantDocs.map(({ type, label }) => {
    const doc = documents.find((item) => item.type === type) || null;
    const number = doc?.number || "—";
    const expiryRaw = doc ? getDocumentEffectiveExpiry(doc, driver) : null;
    const expiry = expiryRaw ? formatDate(expiryRaw) : "—";
    const latestFile = getLatestDocumentFile(doc);
    const hasData = doc && !isDocumentEmpty(doc);
    const status = hasData ? getDocumentStatus(doc, driver) : null;
    const statusLabel = status ? DOCUMENT_STATUS_LABELS[status] : "Нет данных";
    const lastFileDate = latestFile ? formatDate(latestFile.uploadedAt) : null;
    const hasLastFileDate = lastFileDate && lastFileDate !== "—";

    const statusBadge = status
      ? `<span class="badge ${status}">${statusLabel}</span>`
      : '<span class="badge unknown">Нет данных</span>';

    return `
      <article class="doc-card" data-doc-type="${type}">
        <header>
          <span class="doc-card-title">${label}</span>
          ${statusBadge}
        </header>
        <dl>
          <div><dt>Номер</dt><dd>${number}</dd></div>
          <div><dt>Действует до</dt><dd>${expiry}</dd></div>
          <div><dt>Файл</dt><dd>${hasLastFileDate ? `от ${lastFileDate}` : "Не загружен"}</dd></div>
        </dl>
      </article>
    `;
  });

  return `<div class="primary-documents">${cards.join("")}</div>`;
}

function renderDocumentsRows(driver) {
  driver.documents = Array.isArray(driver.documents) ? driver.documents : [];
  return DOCUMENT_DEFINITIONS.map((definition, orderIndex) => {
    const doc = ensureDocumentRecord(driver, definition.type);
    const docIndex = driver.documents.indexOf(doc);
    const docId = getDocumentIdentifier(driver, doc, docIndex >= 0 ? docIndex : orderIndex);
    const hasData = !isDocumentEmpty(doc);
    const issue = doc?.issueDate ? formatDate(doc.issueDate) : "—";
    const expiryRaw = getDocumentEffectiveExpiry(doc, driver);
    const expiry = expiryRaw ? formatDate(expiryRaw) : "—";
    const statusCode = hasData ? getDocumentStatus(doc, driver) : "unknown";
    const statusLabel = hasData ? DOCUMENT_STATUS_LABELS[statusCode] : "Нет данных";
    const numberValue = definition.showNumber === false ? "—" : doc?.number || "—";
    const countryValue = definition.showCountry === false ? doc?.issuer || "—" : formatDocumentCountryOrIssuer(doc);
    const extras = renderDocumentExtras(doc, driver);

    return `
      <tr>
        <td>${definition.label}</td>
        <td>${numberValue}</td>
        <td>${issue}</td>
        <td>${expiry}</td>
        <td>${countryValue}</td>
        <td><span class="badge ${statusCode}">${statusLabel}</span></td>
        <td class="doc-file-cell">${renderDocumentFileCell(driver, doc, docId)}</td>
        <td>${extras}</td>
      </tr>
    `;
  }).join("");
}

function renderDocumentExtras(doc, driver) {
  const extras = [];
  if (doc.categories?.length) {
    extras.push(`Категории: ${doc.categories.join(", ")}`);
  }
  if (doc.extra?.a1_sw) {
    extras.push("A1 SW");
  }
  if (doc.extra?.handed_over) {
    extras.push("Передано водителю");
  }
  if (doc.type === "psihotest") {
    const nextDue = getDocumentEffectiveExpiry(doc, driver);
    if (nextDue) {
      extras.push(`Следующее прохождение до ${formatDate(nextDue)}`);
    }
  }
  if (doc.extra?.note) {
    extras.push(doc.extra.note);
  }
  return extras.length ? extras.join(" · ") : "—";
}

function getDocumentIdentifier(driver, doc, index) {
  if (doc.id) {
    return doc.id;
  }
  const fallback = `${driver?.id || "driver"}-${doc?.type || "doc"}-${index}`;
  doc.id = fallback;
  return fallback;
}

function renderDocumentFileCell(driver, doc, docId) {
  const files = Array.isArray(doc.files) ? doc.files : [];
  const latestFile = files[0] || null;
  const hasFile = Boolean(latestFile);
  const lastUploadLabel = hasFile
    ? `последнее обновление: ${formatDate(latestFile.uploadedAt)}`
    : "Файл не загружен";

  const driverId = driver?.id || "";
  const historyDisabled = files.length ? "" : " disabled";
  const viewDisabled = hasFile ? "" : " disabled";

  const viewTitle = hasFile
    ? `Открыть файл ${latestFile.name}`
    : "Файл не загружен";

  return `
    <div class="doc-file-actions">
      <button type="button" class="icon-button file-indicator ${hasFile ? "has-file" : "no-file"}" data-action="doc-view" data-doc-id="${docId}" data-driver-id="${driverId}" title="${viewTitle}" aria-label="${viewTitle}"${viewDisabled}>
        <span aria-hidden="true">📎</span>
      </button>
      <button type="button" class="text-link" data-action="doc-upload" data-doc-id="${docId}" data-driver-id="${driverId}" title="Загрузить файл (PDF, PNG, JPEG; до 20 МБ)">Загрузить</button>
      <button type="button" class="text-link" data-action="doc-history" data-doc-id="${docId}" data-driver-id="${driverId}"${historyDisabled} title="История загруженных версий">История</button>
    </div>
    <div class="doc-file-meta">${lastUploadLabel}</div>
  `;
}

function getDocumentById(driver, docId) {
  if (!driver || !driver.documents || !docId) {
    return null;
  }

  return (
    driver.documents.find((doc, index) => {
      if (doc.id === docId) {
        return true;
      }
      const fallback = `${driver.id || "driver"}-${doc.type || "doc"}-${index}`;
      if (!doc.id) {
        doc.id = fallback;
      }
      return doc.id === docId;
    }) || null
  );
}

function openFileInNewTab(file) {
  if (!file) {
    setAppMessage("Файл недоступен.", "error");
    return;
  }

  if (!file.url || file.url === "#") {
    setAppMessage("Файл недоступен для просмотра.", "error");
    return;
  }

  const newWindow = window.open(file.url, "_blank", "noopener");
  if (!newWindow) {
    setAppMessage("Не удалось открыть файл. Разрешите всплывающие окна.", "error");
  }
}

function showDocumentHistoryModal(driver, doc) {
  if (!doc || !doc.files || !doc.files.length) {
    return;
  }

  document.querySelectorAll(".file-history-overlay").forEach((node) => node.remove());

  const overlay = document.createElement("div");
  overlay.className = "file-history-overlay";

  const docId = doc.id || `${driver?.id || "driver"}-${doc.type || "doc"}`;
  const titleId = `history-${docId}`;
  const docLabel = DOCUMENT_LABELS[doc.type] || doc.type;

  const listItems = doc.files
    .map((file, index) => {
      const badge = index === 0 ? '<span class="file-history-chip">Текущая версия</span>' : "";
      return `
        <li>
          <div class="file-history-item">
            <div class="file-history-info">
              <div class="file-history-name">
                <strong>${file.name}</strong>
                ${badge}
              </div>
              <span class="text-muted">${formatFileSize(file.size)}</span>
              <div class="text-muted">${formatDateTime(file.uploadedAt)}</div>
            </div>
            <button type="button" class="text-link" data-history-open="${file.id}">Открыть</button>
          </div>
        </li>
      `;
    })
    .join("");

  overlay.innerHTML = `
    <div class="file-history-dialog" role="dialog" aria-modal="true" aria-labelledby="${titleId}" tabindex="-1">
      <div class="file-history-header">
        <h4 id="${titleId}">История загрузок — ${docLabel}</h4>
        <button type="button" class="icon-button close" data-history-close aria-label="Закрыть историю">&times;</button>
      </div>
      <ul class="file-history-list">${listItems}</ul>
    </div>
  `;

  document.body.appendChild(overlay);
  const dialog = overlay.querySelector(".file-history-dialog");
  if (dialog) {
    dialog.focus();
    dialog.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        overlay.remove();
      }
    });
  }

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay || event.target.hasAttribute("data-history-close")) {
      overlay.remove();
      return;
    }
    const historyButton = event.target.closest("[data-history-open]");
    if (historyButton) {
      const fileId = historyButton.getAttribute("data-history-open");
      const fileRecord = doc.files.find((item) => item.id === fileId);
      if (fileRecord) {
        openFileInNewTab(fileRecord);
      } else {
        setAppMessage("Файл не найден.", "error");
      }
    }
  });
}

function formatContract(contract) {
  if (!contract) return "—";
  const typeLabel = contract.type === "permanent" ? "Бессрочный" : "Срочный";
  const period = contract.indefinite
    ? `С ${formatDate(contract.startDate)}`
    : `${formatDate(contract.startDate)} — ${formatDate(contract.endDate)}`;
  const signed = contract.signed ? `Подписан (${DIRECTORS[contract.signedBy] || "директор"})` : "Не подписан";
  return `${typeLabel}, ${period}, ${signed}`;
}

function formatSalaryType(type) {
  switch (type) {
    case "monthly":
      return "Месячная ставка";
    case "hourly":
      return "Почасовая";
    case "per_trip":
      return "За рейс";
    default:
      return "—";
  }
}

function formatAdjustmentsList(items = []) {
  if (!items.length) return "—";
  return items
    .map((item) => `${item.label}: ${formatCurrency(item.amount, item.currency)}`)
    .join("<br>");
}

function formatTrips(trips = []) {
  if (!trips.length) return "—";
  return trips
    .map((trip) => `${trip.country}: ${formatDate(trip.from)} → ${formatDate(trip.to)} (${trip.days} дн.)`)
    .join("<br>");
}

function renderFiles(files = []) {
  if (!files.length) {
    return '<div class="empty-state">Файлы не прикреплены.</div>';
  }
  return `<ul class="files-list">${files
    .map(
      (file) => `
        <li>
          <strong>${file.description || "Файл"}</strong><br>
          ${file.name} · ${formatFileSize(file.size)} · загружен ${formatDate(file.uploadedAt)}
        </li>
      `
    )
    .join("")}</ul>`;
}

function renderHistory(history = []) {
  if (!history.length) {
    return '<div class="empty-state">История пока пуста.</div>';
  }
  return `<ul class="history-list">${history
    .map((item) => `
      <li>
        <strong>${formatDate(item.date)}</strong> · ${item.action}<br>
        ${item.details}<br>
        <span class="text-muted">${item.author || "—"}</span>
      </li>
    `)
    .join("")}</ul>`;
}

function renderComments(comments = []) {
  if (!comments.length) {
    return '<div class="empty-state">Комментариев пока нет.</div>';
  }
  return `<ul class="comments-list">${comments
    .map((comment, index) => {
      const textBlock = comment.text ? `<p>${comment.text}</p>` : "";
      const attachment = comment.file
        ? `
          <div class="comment-attachment">
            <button type="button" class="attachment-link" data-action="comment-open-file" data-comment-index="${index}">
              <span aria-hidden="true">📎</span>
              ${comment.file.name}
            </button>
            <span class="text-muted">(${formatFileSize(comment.file.size)})</span>
          </div>
        `
        : "";

      return `
        <li>
          <strong>${comment.author || "—"}</strong> · ${formatDateTime(comment.date)}
          ${textBlock}
          ${attachment}
        </li>
      `;
    })
    .join("")}</ul>`;
}

function formatDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("ru", { year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
}

function formatDateTime(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("ru", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

function formatCurrency(value, currency = "EUR") {
  if (value === undefined || value === null || Number.isNaN(Number(value))) {
    return "—";
  }
  return new Intl.NumberFormat("ru", { style: "currency", currency }).format(Number(value));
}

function formatGender(value) {
  if (!value) {
    return "—";
  }
  return GENDER_LABELS[value] || value;
}

function getDriverFullName(driver) {
  return [driver.personal.lastName, driver.personal.firstName, driver.personal.middleName]
    .filter(Boolean)
    .join(" ");
}

function formatDriverContacts(driver) {
  if (!driver || !driver.personal) {
    return "";
  }
  const contacts = [];
  const email = (driver.personal.email || "").trim();
  const phone = (driver.personal.phone || "").trim();
  if (email) {
    contacts.push(email);
  }
  if (phone) {
    contacts.push(phone);
  }
  return contacts.join(" · ");
}

function setAppMessage(text, type = "info") {
  if (!elements.message) return;
  elements.message.textContent = text;
  elements.message.className = type ? type : "";
  if (text) {
    setTimeout(() => {
      elements.message.textContent = "";
      elements.message.className = "";
    }, 4000);
  }
}

function updateMassActionsState() {
  const count = state.selectedDriverIds.size;
  elements.reminderButton.disabled = count === 0;
  elements.reminderButton.textContent = count ? `Отправить напоминания (${count})` : "Отправить напоминания";
}

function updateSelectAllCheckbox() {
  const filtered = state.filteredDrivers;
  if (!filtered.length) {
    elements.selectAll.checked = false;
    elements.selectAll.indeterminate = false;
    elements.selectAll.disabled = true;
    return;
  }

  elements.selectAll.disabled = false;
  const selectedCount = filtered.filter((driver) => state.selectedDriverIds.has(driver.id)).length;
  elements.selectAll.checked = selectedCount === filtered.length;
  elements.selectAll.indeterminate = selectedCount > 0 && selectedCount < filtered.length;
}

function handleSelectAll(checked) {
  state.filteredDrivers.forEach((driver) => {
    if (checked) {
      state.selectedDriverIds.add(driver.id);
    } else {
      state.selectedDriverIds.delete(driver.id);
    }
  });
  updateMassActionsState();
  renderDriverList();
  updateSelectAllCheckbox();
}

function sendDocumentReminders() {
  const selectedDrivers = state.filteredDrivers.filter((driver) => state.selectedDriverIds.has(driver.id));
  if (!selectedDrivers.length) {
    setAppMessage("Выберите водителей для отправки уведомлений.", "error");
    return;
  }

  const payload = selectedDrivers.map((driver) => ({
    id: driver.id,
    fullName: getDriverFullName(driver),
    documents: (Array.isArray(driver.documents) ? driver.documents : [])
      .filter(
        (doc) =>
          !isDocumentEmpty(doc) && ["expired", "soon", "warning"].includes(getDocumentStatus(doc, driver))
      )
      .map((doc) => ({
        type: doc.type,
        label: DOCUMENT_LABELS[doc.type] || doc.type,
        status: getDocumentStatus(doc, driver),
        expiryDate: getDocumentEffectiveExpiry(doc, driver) || null
      }))
  }));

  if (payload.every((item) => item.documents.length === 0)) {
    setAppMessage("У выбранных водителей нет документов, требующих внимания.", "info");
  }

  sendToTelegram({ action: "send_document_reminders", drivers: payload });
  setAppMessage(`Подготовлено уведомлений: ${payload.length}.`, "success");
}

function handleDriverCardClick(event) {
  const actionElement = event.target.closest("[data-action]");
  if (!actionElement) {
    return;
  }

  const action = actionElement.dataset.action;
  const driverId = actionElement.dataset.driverId || state.selectedDriverId;
  const driver = getDriverById(driverId);

  if (!driver) {
    return;
  }

  if (action === "doc-upload") {
    event.preventDefault();
    state.pendingDocumentUpload = { driverId, docId: actionElement.dataset.docId };
    documentUploadInput.value = "";
    documentUploadInput.click();
    return;
  }

  if (action === "doc-view") {
    event.preventDefault();
    const doc = getDocumentById(driver, actionElement.dataset.docId);
    if (!doc) {
      setAppMessage("Документ не найден.", "error");
      return;
    }
    const latestFile = getLatestDocumentFile(doc);
    if (!latestFile) {
      setAppMessage("Файл не прикреплён.", "error");
      return;
    }
    openFileInNewTab(latestFile);
    return;
  }

  if (action === "doc-history") {
    event.preventDefault();
    const doc = getDocumentById(driver, actionElement.dataset.docId);
    if (!doc || !doc.files || !doc.files.length) {
      setAppMessage("История файлов пуста.", "info");
      return;
    }
    showDocumentHistoryModal(driver, doc);
    return;
  }

  if (action === "comment-open-file") {
    event.preventDefault();
    const commentIndex = Number.parseInt(actionElement.dataset.commentIndex, 10);
    if (Number.isNaN(commentIndex)) {
      return;
    }
    const comment = driver.comments?.[commentIndex];
    if (!comment || !comment.file) {
      setAppMessage("Файл не найден.", "error");
      return;
    }
    openFileInNewTab(comment.file);
  }
}

function handleDocumentFileSelected(event) {
  const file = event.target.files?.[0] || null;
  documentUploadInput.value = "";

  const context = state.pendingDocumentUpload;
  state.pendingDocumentUpload = null;

  if (!context) {
    return;
  }

  const driver = getDriverById(context.driverId);
  if (!driver) {
    setAppMessage("Водитель не найден.", "error");
    return;
  }

  const doc = getDocumentById(driver, context.docId);
  if (!doc) {
    setAppMessage("Документ не найден.", "error");
    return;
  }

  if (!file) {
    setAppMessage("Файл не выбран.", "info");
    return;
  }

  const validation = validateFileInput(file);
  if (!validation.valid) {
    setAppMessage(validation.error, "error");
    return;
  }

  doc.files = Array.isArray(doc.files) ? doc.files : [];
  doc.files.unshift(buildFileRecordFromInput(file));
  setAppMessage("Файл загружен и добавлен в историю.", "success");
  renderDriverCard(driver, { preserveScroll: true });
}

function sendToTelegram(data) {
  if (tg && typeof tg.sendData === "function") {
    tg.sendData(JSON.stringify(data));
  } else {
    console.log("Telegram payload", data);
  }
}

function generateInternalNumber() {
  const numbers = driversData
    .map((driver) => driver.internalNumber)
    .filter(Boolean)
    .map((value) => Number.parseInt(String(value).replace(/[^0-9]/g, ""), 10))
    .filter((num) => !Number.isNaN(num));
  const next = numbers.length ? Math.max(...numbers) + 1 : driversData.length + 1;
  return `DRV-${String(next).padStart(4, "0")}`;
}

function renderCreateDriverForm() {
  elements.driverCard.classList.remove("placeholder");
  elements.driverCard.innerHTML = `
    <div class="card-header">
      <div>
        <h2 id="driverModalTitle">Новый водитель</h2>
        <div class="card-meta">Заполните обязательные поля для создания карточки.</div>
      </div>
    </div>
    <form class="create-form" id="createDriverForm">
      <label>Фамилия<input id="createLastName" required placeholder="Фамилия"></label>
      <label>Имя<input id="createFirstName" required placeholder="Имя"></label>
      <label>Отчество<input id="createMiddleName" placeholder="Отчество"></label>
      <label>E-mail<input id="createEmail" type="email" placeholder="email@example.com"></label>
      <label>Телефон<input id="createPhone" placeholder="+420 ..."></label>
      <label>Статус
        <select id="createStatus">
          <option value="active">Активен</option>
          <option value="on_leave">В отпуске</option>
          <option value="inactive">Неактивен</option>
          <option value="terminated">Уволен</option>
        </select>
      </label>
      <label>Рабочая локация
        <select id="createLocation">
          <option value="praha">Praha</option>
          <option value="kladno">Kladno</option>
        </select>
      </label>
      <label>Рабочий адрес<input id="createWorkAddress" readonly value="${WORK_LOCATION_ADDRESSES.praha}"></label>
      <label class="filter-checkbox"><input type="checkbox" id="createPassportArchive"> Паспорт в архиве (Pas souhlas)</label>
      <label class="filter-checkbox"><input type="checkbox" id="createCzResidence"> Прописка CZ</label>
      <div class="actions">
        <button type="button" class="secondary" id="cancelCreate">Отмена</button>
        <button type="submit" class="primary">Создать</button>
      </div>
    </form>
  `;

  const form = document.getElementById("createDriverForm");
  const locationSelect = document.getElementById("createLocation");
  const addressInput = document.getElementById("createWorkAddress");
  const cancelButton = document.getElementById("cancelCreate");

  locationSelect.addEventListener("change", () => {
    addressInput.value = WORK_LOCATION_ADDRESSES[locationSelect.value] || "";
  });

  cancelButton.addEventListener("click", () => {
    state.cardMode = "view";
    closeDriverModal();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const lastName = document.getElementById("createLastName").value.trim();
    const firstName = document.getElementById("createFirstName").value.trim();
    if (!lastName || !firstName) {
      setAppMessage("Введите фамилию и имя.", "error");
      return;
    }
    const newDriver = {
      id: `drv-${Date.now()}`,
      internalNumber: generateInternalNumber(),
      status: document.getElementById("createStatus").value,
      personal: {
        firstName,
        lastName,
        middleName: document.getElementById("createMiddleName").value.trim(),
        birthDate: null,
        rodneCislo: null,
        citizenship: "",
        gender: "",
        registrationAddress: "",
        residenceAddress: "",
        phone: document.getElementById("createPhone").value.trim(),
        email: document.getElementById("createEmail").value.trim()
      },
      work: {
        hireDate: new Date().toISOString().split("T")[0],
        fireDate: null,
        contract: {
          startDate: new Date().toISOString().split("T")[0],
          endDate: null,
          type: "permanent",
          indefinite: true,
          signed: false,
          signedBy: null
        },
        workLocation: locationSelect.value,
        workAddress: addressInput.value
      },
      bank: {
        countryCode: "CZ",
        bankAccount: "",
        iban: null,
        swift: null
      },
      flags: {
        passportInArchive: document.getElementById("createPassportArchive").checked,
        czResidence: document.getElementById("createCzResidence").checked,
        a1Sw: false
      },
      documents: [],
      salary: {
        type: "monthly",
        baseAmount: 0,
        currency: "EUR",
        bonuses: [],
        deductions: [],
        notes: ""
      },
      perDiem: {
        currentPeriod: "",
        trips: [],
        deductions: []
      },
      history: [
        { date: new Date().toISOString(), action: "Создание", details: "Карточка создана вручную", author: "Вы" }
      ],
      comments: [],
      files: []
    };

    driversData.unshift(newDriver);
    state.selectedDriverIds.clear();
    state.selectedDriverId = newDriver.id;
    state.cardMode = "view";
    setAppMessage("Водитель создан.", "success");
    refresh();
  });

  if (state.modalOpen) {
    updateModalFocusables();
    setTimeout(() => {
      const lastNameInput = document.getElementById("createLastName");
      if (lastNameInput) {
        lastNameInput.focus();
      }
    }, 0);
  }
}

const testingApi = {
  tg,
  state,
  driversData,
  DOCUMENT_LABELS,
  DOCUMENT_DEFINITIONS,
  getFilteredDrivers,
  getDriverCitizenshipInfo,
  getDriverById,
  calculatePsihotestExpiry,
  getDocumentEffectiveExpiry,
  getDocumentStatus,
  isDocumentEmpty,
  openDriverModal,
  renderDriverCard,
  refresh,
  sendDocumentReminders,
  formatDate,
  formatDateTime,
  formatDriverContacts,
  formatGender
};

if (typeof window !== "undefined") {
  window.__GTRACK__ = testingApi;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = testingApi;
}

init();
