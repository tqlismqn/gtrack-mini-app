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
  passport: "Паспорт",
  visa: "Виза",
  licence: "Водительское удостоверение",
  medical: "Медосмотр",
  psihotest: "Психотест",
  insurance: "Страховка",
  travel_insurance: "Путешествия",
  adr: "ADR",
  code95: "Код 95",
  tacho_card: "Тахокарта",
  declaration: "Declaration",
  a1: "A1"
};

const DOCUMENT_STATUS_LABELS = {
  expired: "Просрочен",
  soon: "Истекает ≤ 30",
  warning: "Истекает 31-60",
  valid: "Актуален",
  unknown: "Без срока"
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

const driversData = [
  {
    id: "drv-001",
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
        type: "passport",
        number: "CZ1234567",
        issueDate: "2021-01-15",
        expiryDate: "2031-01-14",
        country: "CZ"
      },
      {
        type: "licence",
        number: "CZ998877",
        issueDate: "2020-05-10",
        expiryDate: "2030-05-09",
        categories: ["C", "E"],
        country: "CZ"
      },
      {
        type: "medical",
        issueDate: "2024-02-01",
        expiryDate: "2026-02-01"
      },
      {
        type: "psihotest",
        issueDate: "2023-11-12",
        expiryDate: "2025-11-11"
      },
      {
        type: "a1",
        issueDate: "2025-01-01",
        expiryDate: "2025-12-31",
        extra: { a1_sw: false }
      },
      {
        type: "tacho_card",
        number: "1234567890",
        issueDate: "2021-08-01",
        expiryDate: "2025-08-01"
      },
      {
        type: "declaration",
        issueDate: "2024-03-01",
        expiryDate: "2025-03-01",
        extra: { handed_over: true }
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
      { date: "2025-08-18T08:30:00Z", author: "HR Анна", text: "Запросить продление A1 за 60 дней до срока." }
    ],
    files: [
      { name: "passport_jan.pdf", uploadedAt: "2024-01-20", size: "1.2 MB", description: "Паспорт" },
      { name: "a1_2025.pdf", uploadedAt: "2025-01-03", size: "0.4 MB", description: "A1 сертификат" }
    ]
  },
  {
    id: "drv-002",
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
        type: "passport",
        number: "EP123456",
        issueDate: "2020-09-01",
        expiryDate: "2030-08-31",
        country: "UA"
      },
      {
        type: "visa",
        number: "CZV-556677",
        issueDate: "2024-05-15",
        expiryDate: "2025-05-14",
        country: "CZ"
      },
      {
        type: "insurance",
        issueDate: "2024-04-01",
        expiryDate: "2025-04-01"
      },
      {
        type: "travel_insurance",
        issueDate: "2024-04-01",
        expiryDate: "2025-04-01"
      },
      {
        type: "a1",
        issueDate: "2024-02-01",
        expiryDate: "2024-12-31",
        extra: { a1_sw: true }
      },
      {
        type: "tacho_card",
        number: "9080706050",
        issueDate: "2021-12-10",
        expiryDate: "2024-12-09"
      },
      {
        type: "code95",
        issueDate: "2020-10-01",
        expiryDate: "2025-10-01"
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
      { name: "visa_2024.pdf", uploadedAt: "2024-05-16", size: "0.8 MB", description: "Виза" }
    ]
  },
  {
    id: "drv-003",
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
        type: "passport",
        number: "CZ7654321",
        issueDate: "2016-04-04",
        expiryDate: "2026-04-03",
        country: "CZ"
      },
      {
        type: "licence",
        number: "CZ445566",
        issueDate: "2015-06-01",
        expiryDate: "2025-06-01",
        categories: ["C", "E"],
        country: "CZ"
      },
      {
        type: "medical",
        issueDate: "2022-01-10",
        expiryDate: "2024-01-09"
      },
      {
        type: "adr",
        issueDate: "2021-02-01",
        expiryDate: "2024-02-01"
      },
      {
        type: "tacho_card",
        number: "4455667788",
        issueDate: "2019-09-01",
        expiryDate: "2024-09-01"
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
      { name: "termination_protocol.pdf", uploadedAt: "2024-06-16", size: "0.6 MB", description: "Протокол увольнения" }
    ]
  }
];

const state = {
  filters: {
    search: "",
    status: "all",
    document: "all",
    czResidence: false,
    a1Sw: false
  },
  selectedDriverId: null,
  selectedDriverIds: new Set(),
  cardMode: "view",
  filteredDrivers: [],
  modalOpen: false
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
  czResidenceFilter: document.getElementById("czResidenceFilter"),
  a1SwFilter: document.getElementById("a1SwFilter"),
  modal: document.getElementById("driverModal"),
  modalContainer: document.querySelector("#driverModal .modal-container"),
  modalBackdrop: document.querySelector("#driverModal [data-modal-dismiss]"),
  modalClose: document.querySelector("#driverModal .modal-close")
};

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

  elements.czResidenceFilter.addEventListener("change", () => {
    state.filters.czResidence = elements.czResidenceFilter.checked;
    refresh();
  });

  elements.a1SwFilter.addEventListener("change", () => {
    state.filters.a1Sw = elements.a1SwFilter.checked;
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

    if (state.filters.czResidence && !driver.flags?.czResidence) {
      return false;
    }

    if (state.filters.a1Sw) {
      const hasA1Sw = driver.documents.some((doc) => doc.type === "a1" && doc.extra?.a1_sw);
      if (!hasA1Sw) {
        return false;
      }
    }

    if (state.filters.document !== "all") {
      const matchesDocument = driver.documents.some((doc) => getDocumentStatus(doc) === state.filters.document);
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
    td.colSpan = 5;
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

    const countryCell = document.createElement("td");
    const citizenshipInfo = getDriverCitizenshipInfo(driver);
    if (citizenshipInfo) {
      const badge = document.createElement("span");
      badge.className = `country-chip ${citizenshipInfo.isEu ? "eu" : "non-eu"}`;
      badge.textContent = `${citizenshipInfo.isEu ? "EU" : "Non-EU"} — ${citizenshipInfo.name}`;
      badge.title = citizenshipInfo.name;
      countryCell.appendChild(badge);
    } else {
      countryCell.textContent = "—";
      countryCell.classList.add("text-muted");
    }
    tr.appendChild(countryCell);

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
  driver.documents.forEach((doc) => {
    const status = getDocumentStatus(doc);
    summary[status] = (summary[status] || 0) + 1;
  });
  return summary;
}

function getDocumentStatus(doc) {
  if (!doc.expiryDate) {
    return "unknown";
  }
  const expiry = new Date(doc.expiryDate);
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

  elements.driverCard.innerHTML = `
    <div class="card-header">
      <div>
        <h2 id="driverModalTitle">${getDriverFullName(driver)}</h2>
        <div class="card-meta">
          <span>Дата рождения: ${formatDate(driver.personal.birthDate)}</span>
          <span>Гражданство: ${driver.personal.citizenship || "—"}</span>
          ${driver.personal.rodneCislo ? `<span>RČ: ${driver.personal.rodneCislo}</span>` : ""}
          ${tags.join(" ")}
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
    commentForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const textarea = commentForm.querySelector("#commentInput");
      const text = textarea.value.trim();
      if (!text) {
        setAppMessage("Введите текст комментария.", "error");
        return;
      }
      driver.comments = driver.comments || [];
      driver.comments.unshift({
        date: new Date().toISOString(),
        author: "Вы",
        text
      });
      textarea.value = "";
      setAppMessage("Комментарий добавлен.", "success");
      renderDriverCard(driver, { preserveScroll: true });
    });
  }
}

function renderDocumentsRows(driver) {
  if (!driver.documents.length) {
    return '<tr><td colspan="7">Документы не загружены.</td></tr>';
  }
  return driver.documents
    .map((doc) => {
      const status = getDocumentStatus(doc);
      const extras = renderDocumentExtras(doc);
      return `
        <tr>
          <td>${DOCUMENT_LABELS[doc.type] || doc.type}</td>
          <td>${doc.number || "—"}</td>
          <td>${formatDate(doc.issueDate)}</td>
          <td>${formatDate(doc.expiryDate)}</td>
          <td>${doc.country || doc.issuer || "—"}</td>
          <td><span class="badge ${status}">${DOCUMENT_STATUS_LABELS[status]}</span></td>
          <td>${extras}</td>
        </tr>
      `;
    })
    .join("");
}

function renderDocumentExtras(doc) {
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
  if (doc.extra?.note) {
    extras.push(doc.extra.note);
  }
  return extras.length ? extras.join(" · ") : "—";
}

function formatContract(contract) {
  if (!contract) return "—";
  const typeLabel = contract.type === "permanent" ? "Бессрочный" : "Срочный";
  const dates = `${formatDate(contract.startDate)} — ${formatDate(contract.endDate)}`;
  const signed = contract.signed ? `Подписан (${DIRECTORS[contract.signedBy] || "директор"})` : "Не подписан";
  return `${typeLabel}, ${dates}, ${signed}`;
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
          ${file.name} · ${file.size || "—"} · загружен ${formatDate(file.uploadedAt)}
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
    .map((comment) => `
      <li>
        <strong>${comment.author || "—"}</strong> · ${formatDateTime(comment.date)}<br>
        ${comment.text}
      </li>
    `)
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
    documents: driver.documents
      .filter((doc) => ["expired", "soon", "warning"].includes(getDocumentStatus(doc)))
      .map((doc) => ({
        type: doc.type,
        label: DOCUMENT_LABELS[doc.type] || doc.type,
        status: getDocumentStatus(doc),
        expiryDate: doc.expiryDate || null
      }))
  }));

  if (payload.every((item) => item.documents.length === 0)) {
    setAppMessage("У выбранных водителей нет документов, требующих внимания.", "info");
  }

  sendToTelegram({ action: "send_document_reminders", drivers: payload });
  setAppMessage(`Подготовлено уведомлений: ${payload.length}.`, "success");
}

function sendToTelegram(data) {
  if (tg && typeof tg.sendData === "function") {
    tg.sendData(JSON.stringify(data));
  } else {
    console.log("Telegram payload", data);
  }
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

init();
