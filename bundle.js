// ── js/config.js ────────────────────────────────────────────────
/* SecretNote — Config & Theme Tokens */

const S = {
  /* Pure black & white palette */
  bg:        "#0A0A0A",
  surface:   "#111111",
  surface2:  "#1A1A1A",
  surface3:  "#222222",
  line:      "#2A2A2A",
  line2:     "#333333",
  lineLight: "#444444",
  muted:     "#666666",
  sub:       "#999999",
  body:      "#E0E0E0",
  title:     "#F5F5F5",
  white:     "#FFFFFF",
  page:      "#F8F7F2",      /* Notebook page — warm off-white */
  pageLines: "#D4D0C8",      /* Notebook ruled lines */
  pageLine2: "#E8E5DD",      /* Lighter lines */
  ink:       "#1A1A1A",      /* Ink on page */
  inkMuted:  "#555555",      /* Lighter ink */
  accent:    "#FFFFFF",
  accentSoft:"rgba(255,255,255,0.08)",
  accentMid: "rgba(255,255,255,0.15)",
  danger:    "#FF4444",
  dangerSoft:"rgba(255,68,68,0.1)",
  gold:      "#C9A84C",
  goldSoft:  "rgba(201,168,76,0.1)",
  shadow:    "rgba(0,0,0,0.4)",
  shadowMd:  "rgba(0,0,0,0.6)",
};

const APP_NAME = "SecretNote";
const CHARS_PER_PAGE = 3000;
const PIN_LENGTH = 5;
const PLANS = {
  basic:       { price: 1.99,  maxNotebooks: 1,  maxPages: 50  },
  monthly:     { price: 4.99,  maxNotebooks: 3,  maxPages: 100 },
  monthlyPlus: { price: 7.99,  maxNotebooks: 5,  maxPages: 150 },
  yearly:      { price: 99.99, maxNotebooks: 10, maxPages: 300 },
};

/* Lang-to-locale map */
const LANG_LOCALES_SN = {fr:"fr-FR",en:"en-US",es:"es-ES",pt:"pt-BR",de:"de-DE",it:"it-IT",nl:"nl-NL",tr:"tr-TR",ru:"ru-RU",ar:"ar-SA",zh:"zh-CN",ja:"ja-JP",ko:"ko-KR",hi:"hi-IN",sw:"sw-KE",pl:"pl-PL"};
const snLocale = () => LANG_LOCALES_SN[_snLang] || "fr-FR";

/* Utils */
const snTodayStr = () => new Date().toISOString().split("T")[0];
const snFmtLong = (d) => new Date(d+"T12:00:00").toLocaleDateString(snLocale(),{weekday:"long",day:"numeric",month:"long",year:"numeric"});
const snFmtShort = (d) => new Date(d+"T12:00:00").toLocaleDateString(snLocale(),{day:"numeric",month:"short",year:"numeric"});
const snFmtDay = (d) => {
  const dt = new Date(d+"T12:00:00"), today = new Date(snTodayStr()+"T12:00:00");
  const diff = (today - dt) / 86400000;
  if (diff === 0) return sn("today");
  if (diff === 1) return sn("yesterday");
  return dt.toLocaleDateString(snLocale(),{weekday:"long",day:"numeric",month:"long"});
};
const charCount = (text) => text.length;

const STICKERS = [
  "🔒","❤️","💔","🔥","💀","👁️","🤫","💭","⚡","🌙",
  "⭐","💎","🖤","🤍","😈","👻","🎭","✨","💫","🕳️",
  "🗝️","⛓️","🥀","🦋","💌","📎","🏷️","🔖","⚠️","♾️",
];


// ── js/i18n.js ──────────────────────────────────────────────────
/* SecretNote — Internationalization */

var SN_LANGS = [
  { code:"fr", label:"Français",   flag:"🇫🇷" },
  { code:"en", label:"English",    flag:"🇬🇧" },
  { code:"es", label:"Español",    flag:"🇪🇸" },
  { code:"pt", label:"Português",  flag:"🇧🇷" },
  { code:"de", label:"Deutsch",    flag:"🇩🇪" },
  { code:"it", label:"Italiano",   flag:"🇮🇹" },
  { code:"nl", label:"Nederlands", flag:"🇳🇱" },
  { code:"tr", label:"Türkçe",     flag:"🇹🇷" },
  { code:"ru", label:"Русский",    flag:"🇷🇺" },
  { code:"ar", label:"العربية",    flag:"🇸🇦" },
  { code:"zh", label:"中文",       flag:"🇨🇳" },
  { code:"ja", label:"日本語",     flag:"🇯🇵" },
  { code:"ko", label:"한국어",     flag:"🇰🇷" },
  { code:"hi", label:"हिन्दी",     flag:"🇮🇳" },
  { code:"sw", label:"Kiswahili",  flag:"🇰🇪" },
  { code:"pl", label:"Polski",     flag:"🇵🇱" },
];

var SN_TRANSLATIONS = {
  fr: {
    appName: "SecretNote",
    slogan: "Ton cahier. Tes secrets. À jamais.",
    slogan2: "Ce qui est écrit ici ne sortira jamais.",
    enterPin: "Entre ton code secret",
    createPin: "Crée ton code secret",
    confirmPin: "Confirme ton code",
    wrongPin: "Code incorrect",
    pinMismatch: "Les codes ne correspondent pas",
    pinSet: "Code activé",
    /* Notebook */
    mySecrets: "Mes Secrets",
    page: "Page",
    pages: "Pages",
    of: "sur",
    charsLeft: "caractères restants",
    chars: "caractères",
    newPage: "Nouvelle page",
    emptyNotebook: "Ton cahier est vide",
    startWriting: "Ouvre une page et commence à écrire tes secrets…",
    writeHere: "Écris ton secret ici…",
    continueWriting: "Continue d'écrire…",
    pageFull: "Page pleine",
    pageFullDesc: "Cette page a atteint 3 000 caractères. Passe à la page suivante.",
    nextPage: "Page suivante",
    prevPage: "Page précédente",
    /* Timeline */
    timeline: "Chronologie",
    allSecrets: "Tous les secrets",
    recentFirst: "Plus récents d'abord",
    /* Search */
    search: "Rechercher",
    searchPlaceholder: "N° de page, cahier ou mot-clé…",
    noResults: "Aucun résultat",
    results: "résultats",
    /* Categories */
    category: "Catégorie",
    allCategories: "Toutes",
    uncategorized: "Sans catégorie",
    addCategory: "Ajouter une catégorie",
    /* Tear / Trash */
    tearPage: "Déchirer la page",
    tearConfirm: "Déchirer cette page ? Elle ira dans la corbeille.",
    trash: "Corbeille",
    trashEmpty: "La corbeille est vide",
    restore: "Restaurer",
    destroyAll: "Détruire définitivement",
    destroyConfirm: "Détruire tout le contenu de la corbeille ? Cette action est irréversible.",
    destroyed: "Corbeille vidée",
    restored: "Page restaurée",
    tornPages: "pages déchirées",
    /* Bookmarks & Stickers */
    bookmark: "Marquer",
    bookmarked: "Marquée",
    unbookmark: "Retirer le marque-page",
    stickers: "Autocollants",
    addSticker: "Ajouter un autocollant",
    /* Notebooks */
    notebooks: "Mes Cahiers",
    notebook: "Cahier",
    newNotebook: "Nouveau cahier",
    notebookName: "Nom du cahier",
    defaultNotebook: "Cahier principal",
    switchNotebook: "Changer de cahier",
    notebookCount: "cahiers",
    /* Actions */
    save: "Enregistrer",
    saved: "Enregistré",
    delete: "Supprimer",
    cancel: "Annuler",
    confirm: "Confirmer",
    close: "Fermer",
    back: "Retour",
    settings: "Réglages",
    language: "Langue",
    changePin: "Changer le code",
    /* Time */
    today: "Aujourd'hui",
    yesterday: "Hier",
    daysAgo: "il y a {n} jours",
    /* Subscription */
    unlock: "Débloquer SecretNote",
    unlockDesc: "Un espace privé pour tes pensées les plus secrètes.",
    oneTime: "Achat unique",
    subscribe: "S'abonner",
    monthly: "Mensuel",
    yearly: "Annuel",
    perMonth: "/mois",
    perYear: "/an",
    /* Misc */
    encrypted: "Chiffré & privé",
    noOneCanSee: "Personne d'autre ne verra jamais ce cahier.",
    secretCount: "secrets écrits",
    totalWords: "mots au total",
    totalChars: "caractères au total",
    firstEntry: "Premier secret",
    lastEntry: "Dernier secret",
    /* Plans & limits */
    planBasic: "Basique",
    planMonthly: "Mensuel",
    planMonthlyPlus: "Mensuel+",
    planYearly: "Annuel",
    pageLimitTitle: "Limite atteinte",
    pageLimitDesc: "Ton cahier a atteint la limite de {n} pages. Passe au forfait supérieur pour plus de pages !",
    notebookLimitTitle: "Limite de cahiers",
    notebookLimitDesc: "Ton forfait permet {n} cahiers maximum. Passe au forfait supérieur pour en créer plus !",
    pagesUsed: "pages utilisées",
    pagesPerNotebook: "pages/cahier",
    notebooksMax: "cahiers max/mois",
    currentPlan: "Plan actuel",
    activePlan: "✓ Ton forfait actuel",
    popular: "Populaire",
    unlimitedNotebooks: "Cahiers illimités",
    prioritySupport: "Support prioritaire",
    bestValue: "Meilleur rapport qualité-prix",
    planUpdated: "Forfait mis à jour",
    searchNotebooks: "Rechercher un cahier…",
    current: "Actuel",
    months: ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"],
  },

  en: {
    appName: "SecretNote",
    slogan: "Your notebook. Your secrets. Forever.",
    slogan2: "What is written here will never leave.",
    enterPin: "Enter your secret code",
    createPin: "Create your secret code",
    confirmPin: "Confirm your code",
    wrongPin: "Incorrect code",
    pinMismatch: "Codes don't match",
    pinSet: "Code activated",
    mySecrets: "My Secrets",
    page: "Page",
    pages: "Pages",
    of: "of",
    charsLeft: "characters left",
    chars: "characters",
    newPage: "New page",
    emptyNotebook: "Your notebook is empty",
    startWriting: "Open a page and start writing your secrets…",
    writeHere: "Write your secret here…",
    continueWriting: "Keep writing…",
    pageFull: "Page full",
    pageFullDesc: "This page has reached 3,000 characters. Move to the next page.",
    nextPage: "Next page",
    prevPage: "Previous page",
    timeline: "Timeline",
    allSecrets: "All secrets",
    recentFirst: "Most recent first",
    search: "Search",
    searchPlaceholder: "Page #, notebook or keyword…",
    noResults: "No results",
    results: "results",
    category: "Category",
    allCategories: "All",
    uncategorized: "Uncategorized",
    addCategory: "Add category",
    tearPage: "Tear page",
    tearConfirm: "Tear this page? It will go to the trash.",
    trash: "Trash",
    trashEmpty: "Trash is empty",
    restore: "Restore",
    destroyAll: "Destroy permanently",
    destroyConfirm: "Destroy all trash contents? This cannot be undone.",
    destroyed: "Trash emptied",
    restored: "Page restored",
    tornPages: "torn pages",
    bookmark: "Bookmark",
    bookmarked: "Bookmarked",
    unbookmark: "Remove bookmark",
    stickers: "Stickers",
    addSticker: "Add sticker",
    notebooks: "My Notebooks",
    notebook: "Notebook",
    newNotebook: "New notebook",
    notebookName: "Notebook name",
    defaultNotebook: "Main notebook",
    switchNotebook: "Switch notebook",
    notebookCount: "notebooks",
    save: "Save",
    saved: "Saved",
    delete: "Delete",
    cancel: "Cancel",
    confirm: "Confirm",
    close: "Close",
    back: "Back",
    settings: "Settings",
    language: "Language",
    changePin: "Change code",
    today: "Today",
    yesterday: "Yesterday",
    daysAgo: "{n} days ago",
    unlock: "Unlock SecretNote",
    unlockDesc: "A private space for your most secret thoughts.",
    oneTime: "One-time purchase",
    subscribe: "Subscribe",
    monthly: "Monthly",
    yearly: "Yearly",
    perMonth: "/month",
    perYear: "/year",
    encrypted: "Encrypted & private",
    noOneCanSee: "No one else will ever see this notebook.",
    secretCount: "secrets written",
    totalWords: "total words",
    totalChars: "total characters",
    firstEntry: "First secret",
    lastEntry: "Last secret",
    planBasic: "Basic",
    planMonthly: "Monthly",
    planMonthlyPlus: "Monthly+",
    planYearly: "Yearly",
    pageLimitTitle: "Limit reached",
    pageLimitDesc: "Your notebook has reached the {n} page limit. Upgrade for more pages!",
    notebookLimitTitle: "Notebook limit",
    notebookLimitDesc: "Your plan allows {n} notebooks max. Upgrade to create more!",
    pagesUsed: "pages used",
    pagesPerNotebook: "pages/notebook",
    notebooksMax: "notebooks max/month",
    currentPlan: "Current plan",
    activePlan: "✓ Your current plan",
    popular: "Popular",
    unlimitedNotebooks: "Unlimited notebooks",
    prioritySupport: "Priority support",
    bestValue: "Best value",
    planUpdated: "Plan updated",
    searchNotebooks: "Search notebooks…",
    current: "Current",
    months: ["January","February","March","April","May","June","July","August","September","October","November","December"],
  },

  es: {
    appName: "SecretNote",
    slogan: "Tu cuaderno. Tus secretos. Para siempre.",
    slogan2: "Lo que se escribe aquí nunca saldrá.",
    enterPin: "Ingresa tu código secreto",
    createPin: "Crea tu código secreto",
    confirmPin: "Confirma tu código",
    wrongPin: "Código incorrecto",
    mySecrets: "Mis Secretos",
    page: "Página", pages: "Páginas", of: "de",
    wordsLeft: "palabras restantes", words: "palabras",
    newPage: "Nueva página",
    emptyNotebook: "Tu cuaderno está vacío",
    startWriting: "Abre una página y comienza a escribir…",
    writeHere: "Escribe tu secreto aquí…",
    save: "Guardar", saved: "Guardado", delete: "Eliminar", cancel: "Cancelar",
    close: "Cerrar", back: "Volver", settings: "Ajustes", language: "Idioma",
    search: "Buscar", searchPlaceholder: "Buscar en tus secretos…",
    today: "Hoy", yesterday: "Ayer",
    timeline: "Cronología", allSecrets: "Todos los secretos",
    category: "Categoría", allCategories: "Todas",
    encrypted: "Cifrado y privado",
    months: ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],
  },

  pt: {
    slogan: "Seus segredos. Seu caderno. Para sempre.",
    enterPin: "Digite seu código secreto", createPin: "Crie seu código secreto",
    mySecrets: "Meus Segredos", page: "Página", pages: "Páginas",
    newPage: "Nova página", save: "Salvar", search: "Pesquisar",
    today: "Hoje", yesterday: "Ontem", settings: "Configurações",
    months: ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],
  },

  de: {
    slogan: "Deine Geheimnisse. Dein Notizbuch. Für immer.",
    enterPin: "Gib deinen Geheimcode ein", createPin: "Erstelle deinen Geheimcode",
    mySecrets: "Meine Geheimnisse", page: "Seite", pages: "Seiten",
    newPage: "Neue Seite", save: "Speichern", search: "Suchen",
    today: "Heute", yesterday: "Gestern", settings: "Einstellungen",
    months: ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],
  },

  it: {
    slogan: "I tuoi segreti. Il tuo quaderno. Per sempre.",
    enterPin: "Inserisci il tuo codice segreto",
    mySecrets: "I Miei Segreti", page: "Pagina", pages: "Pagine",
    newPage: "Nuova pagina", save: "Salva", search: "Cerca",
    today: "Oggi", yesterday: "Ieri", settings: "Impostazioni",
    months: ["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"],
  },

  tr: {
    slogan: "Sırların. Defterin. Sonsuza dek.",
    mySecrets: "Sırlarım", page: "Sayfa", newPage: "Yeni sayfa",
    save: "Kaydet", search: "Ara", today: "Bugün", yesterday: "Dün",
    months: ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"],
  },

  ru: {
    slogan: "Твои секреты. Твоя тетрадь. Навсегда.",
    mySecrets: "Мои Секреты", page: "Страница", newPage: "Новая страница",
    save: "Сохранить", search: "Поиск", today: "Сегодня", yesterday: "Вчера",
    months: ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],
  },

  zh: {
    slogan: "你的秘密。你的笔记本。永远。",
    mySecrets: "我的秘密", page: "页", newPage: "新页",
    save: "保存", search: "搜索", today: "今天", yesterday: "昨天",
    months: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
  },

  ja: {
    slogan: "あなたの秘密。あなたのノート。永遠に。",
    mySecrets: "私の秘密", page: "ページ", newPage: "新しいページ",
    save: "保存", search: "検索", today: "今日", yesterday: "昨日",
    months: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
  },

  ko: {
    slogan: "당신의 비밀. 당신의 노트. 영원히.",
    mySecrets: "나의 비밀", page: "페이지", newPage: "새 페이지",
    save: "저장", search: "검색", today: "오늘", yesterday: "어제",
    months: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
  },

  ar: { slogan: "أسرارك. دفترك. للأبد.", mySecrets: "أسراري", save: "حفظ", search: "بحث", today: "اليوم" },
  hi: { slogan: "तुम्हारे राज़। तुम्हारी डायरी। हमेशा के लिए।", mySecrets: "मेरे राज़", save: "सहेजें", search: "खोजें", today: "आज" },
  sw: { slogan: "Siri zako. Daftari yako. Milele.", mySecrets: "Siri Zangu", save: "Hifadhi", search: "Tafuta", today: "Leo" },
  nl: { slogan: "Jouw geheimen. Jouw notitieboek. Voor altijd.", mySecrets: "Mijn Geheimen", save: "Opslaan", search: "Zoeken", today: "Vandaag" },
  pl: { slogan: "Twoje sekrety. Twój notes. Na zawsze.", mySecrets: "Moje Sekrety", save: "Zapisz", search: "Szukaj", today: "Dzisiaj" },
};

/* ===== i18n ENGINE ===== */
var _snLang = "fr";

function snDetectLang() {
  var stored = localStorage.getItem("sn_lang");
  if (stored && SN_TRANSLATIONS[stored]) return stored;
  var nav = (navigator.language || navigator.userLanguage || "fr").split("-")[0].toLowerCase();
  return SN_TRANSLATIONS[nav] ? nav : "fr";
}

function snSetLang(code) {
  _snLang = code;
  localStorage.setItem("sn_lang", code);
}

function sn(key) {
  var val = SN_TRANSLATIONS[_snLang] && SN_TRANSLATIONS[_snLang][key];
  if (val !== undefined) return val;
  return SN_TRANSLATIONS.fr[key] || key;
}

/* Initialize */
_snLang = snDetectLang();


// ── js/data.js ──────────────────────────────────────────────────
/* SecretNote — Sample Data */

const DEFAULT_NOTEBOOKS = [
  { id: 1, name: "Cahier principal", emoji: "🔒", createdAt: "2026-04-10", color: "#333" },
];

const SAMPLE_SECRETS = [
  {
    id: 1, notebookId: 1,
    page: 1, date: "2026-04-15", time: "23:47",
    category: "Personnel",
    content: "Je n'ai jamais dit à personne que ce jour-là, j'ai pleuré en silence dans ma voiture pendant vingt minutes avant de rentrer chez moi. Tout le monde pense que je suis fort, que rien ne m'atteint. Mais la vérité, c'est que je porte un masque chaque jour. Et parfois, le masque est si lourd que je ne sais plus qui je suis vraiment en dessous.\n\nCe soir, j'écris ici parce que c'est le seul endroit où je peux être honnête. Personne ne lira jamais ces lignes. Et c'est exactement ce dont j'ai besoin.",
    sealed: true, bookmarked: false, stickers: [], torn: false,
  },
  {
    id: 2, notebookId: 1,
    page: 2, date: "2026-04-13", time: "02:14",
    category: "Inavoué",
    content: "Il y a des choses qu'on ne peut dire à voix haute. Des vérités qui brûlent la gorge quand on essaie de les prononcer. Alors on les écrit. Dans le noir. Sur du papier que personne ne verra.\n\nAujourd'hui j'ai compris que certains secrets ne sont pas des fardeaux — ce sont des trésors. Ils nous appartiennent. Ils nous définissent dans l'ombre, là où le monde ne regarde pas.",
    sealed: true, bookmarked: true, stickers: ["🤫"], torn: false,
  },
  {
    id: 3, notebookId: 1,
    page: 3, date: "2026-04-10", time: "21:30",
    category: null,
    content: "Si je pouvais revenir en arrière, je changerais exactement une chose. Une seule. Et cette chose, je ne la dirai jamais à personne d'autre qu'à ce cahier.",
    sealed: true, bookmarked: false, stickers: [], torn: false,
  },
];

const DEFAULT_CATEGORIES = [
  { id: 1, name: "Personnel", color: "#888888" },
  { id: 2, name: "Inavoué",  color: "#666666" },
  { id: 3, name: "Rêves",    color: "#999999" },
  { id: 4, name: "Peurs",    color: "#555555" },
];

/* Notebook rules written on the first page */
const NOTEBOOK_RULES = {
  fr: [
    "Ce cahier t'appartient. À toi seul.",
    "Ce qui est écrit ici ne sortira jamais.",
    "Chaque page peut contenir 3 000 caractères.",
    "Quand une page est pleine, tourne la page.",
    "Tes secrets sont chiffrés. Personne ne peut les lire.",
    "Si tu oublies ton code, tes secrets disparaîtront avec lui.",
    "Écris sans filtre. Écris sans peur. Écris la vérité.",
  ],
  en: [
    "This notebook belongs to you. Only you.",
    "What is written here will never leave.",
    "Each page can hold 3,000 characters.",
    "When a page is full, turn the page.",
    "Your secrets are encrypted. No one can read them.",
    "If you forget your code, your secrets will vanish with it.",
    "Write without filter. Write without fear. Write the truth.",
  ],
};


// ── js/crypto.js ────────────────────────────────────────────────
/* SecretNote — Crypto helpers (WebCrypto: PBKDF2 + AES-GCM)
 *
 * - PBKDF2 (SHA-256, 100k iterations) pour hasher le PIN avec un sel.
 * - AES-GCM 256 (clé dérivée du PIN) prêt à l'emploi pour chiffrement E2E.
 * - Le PIN en clair n'est jamais persisté.
 */

var SN_PBKDF2_ITERATIONS = 100000;
var SN_SALT_BYTES = 16;
var SN_AES_IV_BYTES = 12;

function snBytesToBase64(bytes) {
  var s = "";
  for (var i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
  return btoa(s);
}

function snBase64ToBytes(b64) {
  var raw = atob(b64);
  var out = new Uint8Array(raw.length);
  for (var i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
  return out;
}

function snRandomBytes(n) {
  var arr = new Uint8Array(n);
  crypto.getRandomValues(arr);
  return arr;
}

/* Hash PBKDF2 du PIN. Si saltB64 omis, génère un sel frais (16 bytes).
 * Renvoie { hashB64, saltB64 }. */
async function snHashPin(pin, saltB64) {
  var enc = new TextEncoder();
  var salt = saltB64 ? snBase64ToBytes(saltB64) : snRandomBytes(SN_SALT_BYTES);
  var keyMaterial = await crypto.subtle.importKey(
    "raw", enc.encode(pin), { name: "PBKDF2" }, false, ["deriveBits"]
  );
  var bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: salt, iterations: SN_PBKDF2_ITERATIONS, hash: "SHA-256" },
    keyMaterial, 256
  );
  return {
    hashB64: snBytesToBase64(new Uint8Array(bits)),
    saltB64: snBytesToBase64(salt),
  };
}

/* Comparaison constant-time pour éviter les timing attacks. */
function snConstantTimeEqual(a, b) {
  if (a.length !== b.length) return false;
  var diff = 0;
  for (var i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/* Dérive une clé AES-GCM 256 bits depuis PIN + sel — pour chiffrement E2E. */
async function snDeriveAesKey(pin, saltB64) {
  var enc = new TextEncoder();
  var salt = snBase64ToBytes(saltB64);
  var km = await crypto.subtle.importKey(
    "raw", enc.encode(pin), { name: "PBKDF2" }, false, ["deriveKey"]
  );
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt: salt, iterations: SN_PBKDF2_ITERATIONS, hash: "SHA-256" },
    km,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

async function snAesEncrypt(plain, pin, saltB64) {
  var enc = new TextEncoder();
  var key = await snDeriveAesKey(pin, saltB64);
  var iv = snRandomBytes(SN_AES_IV_BYTES);
  var ct = new Uint8Array(
    await crypto.subtle.encrypt({ name: "AES-GCM", iv: iv }, key, enc.encode(plain))
  );
  var packet = new Uint8Array(iv.length + ct.length);
  packet.set(iv, 0);
  packet.set(ct, iv.length);
  return snBytesToBase64(packet);
}

async function snAesDecrypt(packetB64, pin, saltB64) {
  var dec = new TextDecoder();
  var packet = snBase64ToBytes(packetB64);
  var iv = packet.slice(0, SN_AES_IV_BYTES);
  var ct = packet.slice(SN_AES_IV_BYTES);
  var key = await snDeriveAesKey(pin, saltB64);
  var pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv: iv }, key, ct);
  return dec.decode(pt);
}


// ── js/components.js ────────────────────────────────────────────
/* SecretNote — Shared Components & Icons */

/* SecretNote Logo — Black notebook with white chains and padlock */
var SnLogo = function(props) {
  var size = props.size || 72;
  return React.createElement("svg",{width:size,height:size,viewBox:"0 0 100 100",fill:"none",xmlns:"http://www.w3.org/2000/svg"},
    /* Notebook body — dark */
    React.createElement("rect",{x:22,y:10,width:56,height:80,rx:4,fill:"#111111",stroke:"#333",strokeWidth:1.5}),
    /* Notebook spine */
    React.createElement("rect",{x:22,y:10,width:8,height:80,rx:2,fill:"#1A1A1A",stroke:"#333",strokeWidth:1}),
    /* Page lines */
    React.createElement("line",{x1:36,y1:30,x2:70,y2:30,stroke:"#333",strokeWidth:0.7}),
    React.createElement("line",{x1:36,y1:38,x2:70,y2:38,stroke:"#333",strokeWidth:0.7}),
    React.createElement("line",{x1:36,y1:46,x2:70,y2:46,stroke:"#333",strokeWidth:0.7}),
    React.createElement("line",{x1:36,y1:54,x2:70,y2:54,stroke:"#333",strokeWidth:0.7}),
    React.createElement("line",{x1:36,y1:62,x2:70,y2:62,stroke:"#333",strokeWidth:0.7}),
    /* Chain horizontal */
    React.createElement("path",{d:"M10 50 Q15 47 20 50 Q25 53 30 50 Q35 47 40 50 Q45 53 50 50 Q55 47 60 50 Q65 53 70 50 Q75 47 80 50 Q85 53 90 50",stroke:"#FFFFFF",strokeWidth:2.2,fill:"none",strokeLinecap:"round",opacity:0.9}),
    /* Chain vertical */
    React.createElement("path",{d:"M50 5 Q47 10 50 15 Q53 20 50 25 Q47 30 50 35 Q53 40 50 45 Q47 50 50 55 Q53 60 50 65 Q47 70 50 75 Q53 80 50 85 Q47 90 50 95",stroke:"#FFFFFF",strokeWidth:2.2,fill:"none",strokeLinecap:"round",opacity:0.9}),
    /* Chain links (small circles at intersections) */
    React.createElement("circle",{cx:50,cy:50,r:3,fill:"none",stroke:"#FFFFFF",strokeWidth:1.8}),
    React.createElement("circle",{cx:30,cy:50,r:2.5,fill:"none",stroke:"#FFFFFF",strokeWidth:1.5,opacity:0.7}),
    React.createElement("circle",{cx:70,cy:50,r:2.5,fill:"none",stroke:"#FFFFFF",strokeWidth:1.5,opacity:0.7}),
    React.createElement("circle",{cx:50,cy:30,r:2.5,fill:"none",stroke:"#FFFFFF",strokeWidth:1.5,opacity:0.7}),
    React.createElement("circle",{cx:50,cy:70,r:2.5,fill:"none",stroke:"#FFFFFF",strokeWidth:1.5,opacity:0.7}),
    /* Padlock body */
    React.createElement("rect",{x:42,y:44,width:16,height:13,rx:2,fill:"#FFFFFF"}),
    /* Padlock shackle */
    React.createElement("path",{d:"M45 44 V39 A5 5 0 0 1 55 39 V44",stroke:"#FFFFFF",strokeWidth:2.5,fill:"none",strokeLinecap:"round"}),
    /* Keyhole */
    React.createElement("circle",{cx:50,cy:50,r:2,fill:"#111111"}),
    React.createElement("rect",{x:49.2,y:50,width:1.6,height:4,rx:0.5,fill:"#111111"})
  );
};

const Si = {
  lock:     React.createElement("svg",{width:22,height:22,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:1.8,strokeLinecap:"round",strokeLinejoin:"round"},React.createElement("rect",{x:3,y:11,width:18,height:11,rx:2}),React.createElement("path",{d:"M7 11V7a5 5 0 0110 0v4"})),
  unlock:   React.createElement("svg",{width:22,height:22,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:1.8,strokeLinecap:"round",strokeLinejoin:"round"},React.createElement("rect",{x:3,y:11,width:18,height:11,rx:2}),React.createElement("path",{d:"M7 11V7a5 5 0 019.9-1"})),
  book:     React.createElement("svg",{width:22,height:22,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:1.8,strokeLinecap:"round",strokeLinejoin:"round"},React.createElement("path",{d:"M4 19.5A2.5 2.5 0 016.5 17H20"}),React.createElement("path",{d:"M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"})),
  pen:      React.createElement("svg",{width:22,height:22,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:1.8,strokeLinecap:"round",strokeLinejoin:"round"},React.createElement("path",{d:"M17 3a2.85 2.83 0 114 4L7.5 20.5 2 22l1.5-5.5Z"})),
  search:   React.createElement("svg",{width:20,height:20,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"},React.createElement("circle",{cx:11,cy:11,r:8}),React.createElement("line",{x1:21,y1:21,x2:16.65,y2:16.65})),
  x:        React.createElement("svg",{width:18,height:18,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"},React.createElement("line",{x1:18,y1:6,x2:6,y2:18}),React.createElement("line",{x1:6,y1:6,x2:18,y2:18})),
  back:     React.createElement("svg",{width:20,height:20,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"},React.createElement("polyline",{points:"15,18 9,12 15,6"})),
  chevR:    React.createElement("svg",{width:18,height:18,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"},React.createElement("polyline",{points:"9,18 15,12 9,6"})),
  chevL:    React.createElement("svg",{width:18,height:18,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"},React.createElement("polyline",{points:"15,18 9,12 15,6"})),
  plus:     React.createElement("svg",{width:22,height:22,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"},React.createElement("line",{x1:12,y1:5,x2:12,y2:19}),React.createElement("line",{x1:5,y1:12,x2:19,y2:12})),
  clock:    React.createElement("svg",{width:18,height:18,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:1.8,strokeLinecap:"round",strokeLinejoin:"round"},React.createElement("circle",{cx:12,cy:12,r:10}),React.createElement("polyline",{points:"12 6 12 12 16 14"})),
  shield:   React.createElement("svg",{width:16,height:16,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"},React.createElement("path",{d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"})),
  settings: React.createElement("svg",{width:20,height:20,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:1.8,strokeLinecap:"round",strokeLinejoin:"round"},React.createElement("circle",{cx:12,cy:12,r:3}),React.createElement("path",{d:"M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"})),
  check:    React.createElement("svg",{width:18,height:18,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2.5,strokeLinecap:"round",strokeLinejoin:"round"},React.createElement("polyline",{points:"20 6 9 17 4 12"})),
  bookmark: React.createElement("svg",{width:18,height:18,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:1.8,strokeLinecap:"round",strokeLinejoin:"round"},React.createElement("path",{d:"M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"})),
  globe:    React.createElement("svg",{width:18,height:18,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:1.8,strokeLinecap:"round",strokeLinejoin:"round"},React.createElement("circle",{cx:12,cy:12,r:10}),React.createElement("line",{x1:2,y1:12,x2:22,y2:12}),React.createElement("path",{d:"M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"})),
  trash:    React.createElement("svg",{width:18,height:18,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:1.8,strokeLinecap:"round",strokeLinejoin:"round"},React.createElement("polyline",{points:"3 6 5 6 21 6"}),React.createElement("path",{d:"M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"})),
};

/* Reusable button */
function SBtn({ children, onClick, disabled, variant, full, small, style:extra }) {
  var v = variant || "primary";
  var styles = {
    primary: { bg:S.white, fg:S.bg, bd:"none" },
    outline: { bg:"transparent", fg:S.white, bd:"1.5px solid "+S.line2 },
    ghost:   { bg:S.surface2, fg:S.sub, bd:"none" },
    danger:  { bg:S.danger, fg:"#fff", bd:"none" },
  };
  var st = styles[v] || styles.primary;
  return React.createElement("button",{onClick:onClick,disabled:disabled,style:{
    display:"flex",alignItems:"center",justifyContent:"center",gap:7,
    width:full?"100%":"auto",
    padding:small?"9px 16px":"13px 22px",borderRadius:10,
    background:disabled?S.line:st.bg,color:disabled?S.muted:st.fg,border:st.bd||"none",
    fontFamily:"'Inter',sans-serif",fontSize:small?13:14,fontWeight:600,
    cursor:disabled?"default":"pointer",transition:"all 0.15s",letterSpacing:"0.01em",
    ...(extra||{})
  }},children);
}

/* Notebook-style page wrapper */
function NotebookPage({ children, pageNum, totalPages, style:extra }) {
  /* Generate ruled lines */
  var lines = [];
  for (var i = 0; i < 30; i++) {
    lines.push(React.createElement("div",{key:i,style:{
      position:"absolute", left:60, right:20,
      top: 80 + i * 28,
      height:1, background:S.pageLine2, opacity:0.6,
    }}));
  }

  return React.createElement("div",{style:{
    background:S.page,
    borderRadius:4,
    minHeight:500,
    position:"relative",
    overflow:"hidden",
    boxShadow:"4px 4px 20px rgba(0,0,0,0.5), inset 0 0 60px rgba(0,0,0,0.03)",
    border:"1px solid rgba(255,255,255,0.05)",
    ...(extra||{})
  }},
    /* Left margin line */
    React.createElement("div",{style:{position:"absolute",left:52,top:0,bottom:0,width:1.5,background:"#C4A882",opacity:0.35}}),
    React.createElement("div",{style:{position:"absolute",left:55,top:0,bottom:0,width:0.5,background:"#C4A882",opacity:0.2}}),
    /* Top margin line */
    React.createElement("div",{style:{position:"absolute",left:0,right:0,top:72,height:1,background:S.pageLines,opacity:0.4}}),
    /* Ruled lines */
    lines,
    /* Spiral holes (left side) */
    Array.from({length:8}).map(function(_,i){
      return React.createElement("div",{key:"hole"+i,style:{
        position:"absolute",left:8,top:60+i*60,
        width:16,height:16,borderRadius:"50%",
        background:S.bg,border:"1px solid "+S.lineLight,
        boxShadow:"inset 0 1px 3px rgba(0,0,0,0.3)",
      }});
    }),
    /* Page content */
    React.createElement("div",{style:{position:"relative",zIndex:1,padding:"24px 24px 24px 68px",minHeight:500}},
      children
    ),
    /* Page number */
    pageNum && React.createElement("div",{style:{
      position:"absolute",bottom:14,right:20,
      fontFamily:"'Lora',serif",fontSize:12,fontStyle:"italic",color:S.inkMuted,
    }},sn("page")+" "+pageNum+(totalPages?" / "+totalPages:""))
  );
}


// ── js/pin.js ───────────────────────────────────────────────────
/* SecretNote — PIN Lock Screen */

function PinScreen({ onUnlock }) {
  var useState = React.useState;
  var hasPin = !!(localStorage.getItem("sn_pin_hash") || localStorage.getItem("sn_pin"));
  var [mode, setMode] = useState(hasPin ? "enter" : "create");
  var [pin, setPin] = useState("");
  var [createdPin, setCreatedPin] = useState("");
  var [error, setError] = useState("");
  var [shake, setShake] = useState(false);
  var [transitioning, setTransitioning] = useState(false);

  var doShake = function(){ setShake(true); setTimeout(function(){setShake(false)},500); };

  /* Hash + persiste un nouveau PIN. Nettoie la clé legacy en clair. */
  var savePinHash = function(plainPin) {
    return snHashPin(plainPin).then(function(result){
      try {
        localStorage.setItem("sn_pin_hash", result.hashB64);
        localStorage.setItem("sn_pin_salt", result.saltB64);
        localStorage.removeItem("sn_pin");
      } catch (e) {
        console.error("[SecretNote] Failed to persist PIN hash", e);
      }
    });
  };

  /* Vérifie le PIN entré. Migre l'ancien format en clair à la première réussite. */
  var verifyPin = function(enteredPin) {
    var storedHash = localStorage.getItem("sn_pin_hash");
    var storedSalt = localStorage.getItem("sn_pin_salt");
    if (storedHash && storedSalt) {
      return snHashPin(enteredPin, storedSalt).then(function(result){
        return snConstantTimeEqual(result.hashB64, storedHash);
      });
    }
    /* Legacy fallback : sn_pin en clair (avant migration crypto). */
    var legacy = localStorage.getItem("sn_pin");
    if (legacy && enteredPin === legacy) {
      return savePinHash(enteredPin).then(function(){ return true; });
    }
    return Promise.resolve(false);
  };

  var handleDigit = function(d) {
    if (transitioning) return;
    setError("");

    if (mode === "create") {
      if (pin.length < PIN_LENGTH) {
        var np = pin + d;
        setPin(np);
        if (np.length === PIN_LENGTH) {
          setTransitioning(true);
          setTimeout(function(){
            setCreatedPin(np);
            setPin("");
            setMode("confirm");
            setTransitioning(false);
          }, 400);
        }
      }
    } else if (mode === "confirm") {
      if (pin.length < PIN_LENGTH) {
        var nc = pin + d;
        setPin(nc);
        if (nc.length === PIN_LENGTH) {
          setTransitioning(true);
          if (nc === createdPin) {
            savePinHash(createdPin).then(function(){
              setTimeout(onUnlock, 300);
            });
          } else {
            setError(sn("pinMismatch"));
            doShake();
            setTimeout(function(){
              setPin("");
              setCreatedPin("");
              setMode("create");
              setTransitioning(false);
            }, 800);
          }
        }
      }
    } else {
      /* enter mode */
      if (pin.length < PIN_LENGTH) {
        var ne = pin + d;
        setPin(ne);
        if (ne.length === PIN_LENGTH) {
          setTransitioning(true);
          verifyPin(ne).then(function(ok){
            if (ok) {
              setTimeout(onUnlock, 300);
            } else {
              setError(sn("wrongPin"));
              doShake();
              setTimeout(function(){
                setPin("");
                setTransitioning(false);
              }, 500);
            }
          });
        }
      }
    }
  };

  var handleDelete = function() {
    if (transitioning) return;
    setPin(pin.slice(0,-1));
    setError("");
  };

  var title = mode === "create" ? sn("createPin") : mode === "confirm" ? sn("confirmPin") : sn("enterPin");

  return React.createElement("div",{style:{
    position:"fixed",inset:0,zIndex:1000,
    background:S.bg,
    display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
    padding:24,
  }},
    /* Logo */
    React.createElement("div",{style:{marginBottom:28}},
      React.createElement(SnLogo,{size:80})
    ),
    React.createElement("h1",{style:{fontFamily:"'Lora',serif",fontSize:24,fontWeight:700,color:S.title,margin:"0 0 8px",textAlign:"center"}},"SecretNote"),
    React.createElement("p",{style:{fontFamily:"'Inter',sans-serif",fontSize:13,fontWeight:500,color:S.muted,margin:"0 0 36px",textAlign:"center"}},title),

    /* PIN dots */
    React.createElement("div",{style:{display:"flex",gap:16,marginBottom:16,animation:shake?"shakeX .4s ease":"none"}},
      Array.from({length:PIN_LENGTH}).map(function(_,i){
        var filled = i < pin.length;
        return React.createElement("div",{key:i,style:{
          width:18,height:18,borderRadius:"50%",
          background:filled?S.white:"transparent",
          border:"2px solid "+(filled?S.white:S.line2),
          transition:"all 0.15s",
          transform:filled?"scale(1.1)":"scale(1)",
        }});
      })
    ),

    /* Error */
    error && React.createElement("p",{style:{fontFamily:"'Inter',sans-serif",fontSize:13,fontWeight:600,color:S.danger,margin:"0 0 16px",height:20}},error),
    !error && React.createElement("div",{style:{height:36}}),

    /* Numpad */
    React.createElement("div",{style:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,maxWidth:280,width:"100%"}},
      [1,2,3,4,5,6,7,8,9,null,0,"del"].map(function(d,i){
        if (d === null) return React.createElement("div",{key:i});
        var isDel = d === "del";
        return React.createElement("button",{key:i,onClick:function(){ isDel ? handleDelete() : handleDigit(String(d)); },style:{
          width:"100%",aspectRatio:"1",borderRadius:16,
          background:isDel?"transparent":S.surface2,
          border:isDel?"none":"1px solid "+S.line,
          color:isDel?S.muted:S.title,
          fontFamily:isDel?"'Inter',sans-serif":"'Lora',serif",
          fontSize:isDel?14:26,fontWeight:isDel?600:700,
          cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",
          transition:"all 0.1s",
          opacity:transitioning?0.5:1,
        }},isDel?"⌫":d);
      })
    ),

    /* Slogan */
    React.createElement("p",{style:{fontFamily:"'Lora',serif",fontSize:12,fontWeight:500,color:S.muted,fontStyle:"italic",marginTop:32,textAlign:"center",maxWidth:260}},sn("slogan2"))
  );
}


// ── js/notebook.js ──────────────────────────────────────────────
/* SecretNote — Notebook (Main Screen) */

function NotebookScreen({ secrets, notebooks, activeNotebook, trash, onAdd, onOpenPage, onSearch, onSettings, onSwitchNotebook, onNewNotebook, onOpenTrash, onOpenNotebooks }) {
  var currentSecrets = secrets.filter(function(s){ return s.notebookId === activeNotebook.id && !s.torn; });
  /* Newest first */
  var sorted = currentSecrets.slice().sort(function(a,b){ return b.id - a.id; });
  /* Only show pages with content */
  var withContent = sorted.filter(function(s){ return s.content && s.content.trim().length > 0; });
  var totalChars = withContent.reduce(function(a,s){ return a + charCount(s.content); },0);
  var trashCount = trash.length;

  return React.createElement("div",null,
    /* Header */
    React.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}},
      React.createElement("div",null,
        React.createElement("h1",{style:{fontFamily:"'Lora',serif",fontWeight:700,fontSize:26,color:S.title,margin:"0 0 4px"}},sn("mySecrets")),
        React.createElement("p",{style:{fontFamily:"'Lora',serif",fontSize:13,fontWeight:500,color:S.muted,fontStyle:"italic",margin:0}},sn("slogan"))
      ),
      React.createElement("div",{style:{display:"flex",gap:8}},
        React.createElement("button",{onClick:onSearch,style:{width:40,height:40,borderRadius:12,background:S.surface2,border:"1px solid "+S.line,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:S.sub}},Si.search),
        React.createElement("button",{onClick:onSettings,style:{width:40,height:40,borderRadius:12,background:S.surface2,border:"1px solid "+S.line,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:S.sub}},Si.settings)
      )
    ),

    /* Notebook button — opens full notebooks screen */
    React.createElement("button",{onClick:onOpenNotebooks,style:{
      display:"flex",alignItems:"center",gap:10,width:"100%",
      padding:"12px 16px",borderRadius:12,marginBottom:20,
      background:S.surface,border:"1px solid "+S.line,cursor:"pointer",
    }},
      React.createElement("span",{style:{fontSize:18}},activeNotebook.emoji||"📓"),

      React.createElement("div",{style:{flex:1,textAlign:"left"}},
        React.createElement("p",{style:{fontFamily:"'Lora',serif",fontSize:14,fontWeight:700,color:S.title,margin:0}},activeNotebook.name),
        React.createElement("p",{style:{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:500,color:S.muted,margin:"2px 0 0"}},notebooks.length+" "+sn("notebookCount"))
      ),
      React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:600,color:S.sub}},sn("notebooks")),
      React.createElement("span",{style:{color:S.muted}},Si.chevR)
    ),

    /* Stats bar */
    React.createElement("div",{style:{display:"flex",gap:10,marginBottom:20}},
      [{v:withContent.length,l:sn("pages"),icon:"📄"},{v:totalChars,l:sn("chars"),icon:"✍️"}].map(function(st){
        return React.createElement("div",{key:st.l,style:{flex:1,background:S.surface2,borderRadius:12,padding:"14px 12px",textAlign:"center",border:"1px solid "+S.line}},
          React.createElement("p",{style:{fontFamily:"'Lora',serif",fontSize:22,fontWeight:700,color:S.title,margin:"0 0 2px"}},st.v),
          React.createElement("p",{style:{fontFamily:"'Inter',sans-serif",fontSize:10,fontWeight:600,color:S.muted,margin:0}},st.l)
        );
      })
    ),

    /* Encrypted badge */
    React.createElement("div",{style:{display:"flex",alignItems:"center",gap:8,padding:"10px 14px",background:S.accentSoft,borderRadius:10,marginBottom:22,border:"1px solid "+S.line}},
      React.createElement("span",{style:{color:S.sub}},Si.shield),
      React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:600,color:S.sub}},sn("encrypted")),
      React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:500,color:S.muted,marginLeft:4}},"— "+sn("noOneCanSee"))
    ),

    /* Empty state — show rules page */
    withContent.length === 0 && React.createElement(NotebookPage,{pageNum:0},
      React.createElement("div",{style:{paddingTop:20}},
        React.createElement("h2",{style:{fontFamily:"'Lora',serif",fontSize:20,fontWeight:700,color:S.ink,margin:"0 0 24px",fontStyle:"italic",textAlign:"center"}},"— "+sn("appName")+" —"),
        (NOTEBOOK_RULES[_snLang] || NOTEBOOK_RULES.fr || NOTEBOOK_RULES.en).map(function(rule,i){
          return React.createElement("p",{key:i,style:{fontFamily:"'Lora',serif",fontSize:14,fontWeight:500,color:S.ink,lineHeight:2,margin:"0 0 4px",fontStyle:"italic"}},
            (i+1)+". "+rule
          );
        }),
        React.createElement("div",{style:{textAlign:"center",marginTop:30}},
          React.createElement("p",{style:{fontFamily:"'Lora',serif",fontSize:36,color:S.inkMuted,margin:0}},"🔒"),
          React.createElement("p",{style:{fontFamily:"'Lora',serif",fontSize:13,fontWeight:500,color:S.inkMuted,fontStyle:"italic",marginTop:10}},sn("startWriting"))
        )
      )
    ),

    /* Secret pages list — newest first, only with content */
    withContent.length > 0 && React.createElement("div",null,
      React.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}},
        React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:700,color:S.muted,letterSpacing:"0.08em",textTransform:"uppercase"}},sn("timeline")),
        React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:500,color:S.muted}},sn("recentFirst"))
      ),
      withContent.map(function(secret){
        var cc = charCount(secret.content);
        var pct = Math.min(100, Math.round(cc / CHARS_PER_PAGE * 100));
        var isFull = cc >= CHARS_PER_PAGE;
        return React.createElement("div",{key:secret.id,onClick:function(){onOpenPage(secret.id)},style:{
          background:S.surface,borderRadius:14,border:"1px solid "+S.line,
          padding:"0",marginBottom:10,cursor:"pointer",overflow:"hidden",
        }},
          React.createElement("div",{style:{display:"flex"}},
            React.createElement("div",{style:{width:5,background:S.page,flexShrink:0,borderRadius:"14px 0 0 14px",opacity:0.5}}),
            React.createElement("div",{style:{flex:1,padding:"16px 16px"}},
              React.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}},
                React.createElement("div",{style:{display:"flex",alignItems:"center",gap:6}},
                  secret.bookmarked && React.createElement("span",{style:{fontSize:12}},"🔖"),
                  React.createElement("span",{style:{fontFamily:"'Lora',serif",fontSize:13,fontWeight:700,color:S.title}},sn("page")+" "+secret.page),
                  secret.category && React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:10,fontWeight:600,color:S.muted,background:S.surface2,padding:"2px 8px",borderRadius:100,border:"1px solid "+S.line}},secret.category),
                  isFull && React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:10,fontWeight:700,color:S.gold,background:S.goldSoft,padding:"2px 8px",borderRadius:100}},sn("pageFull")),
                  secret.stickers && secret.stickers.length > 0 && React.createElement("span",{style:{fontSize:12}},secret.stickers.join(""))
                ),
                React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:500,color:S.muted}},snFmtDay(secret.date))
              ),
              React.createElement("p",{style:{fontFamily:"'Lora',serif",fontSize:14,fontWeight:500,color:S.sub,lineHeight:1.7,margin:"0 0 10px",fontStyle:"italic",
                overflow:"hidden",textOverflow:"ellipsis",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"
              }},secret.content),
              React.createElement("div",{style:{display:"flex",alignItems:"center",gap:10}},
                React.createElement("div",{style:{flex:1,height:3,background:S.line,borderRadius:2,overflow:"hidden"}},
                  React.createElement("div",{style:{width:pct+"%",height:"100%",background:isFull?S.gold:S.sub,borderRadius:2}})
                ),
                React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:10,fontWeight:600,color:S.muted,flexShrink:0}},cc+" / "+CHARS_PER_PAGE)
              )
            )
          )
        );
      })
    ),

    /* Trash mini FAB */
    trashCount > 0 && React.createElement("button",{onClick:onOpenTrash,style:{
      position:"fixed",bottom:100,right:"calc(50% - 215px + 20px)",
      width:40,height:40,borderRadius:12,
      background:S.surface2,border:"1px solid "+S.line,cursor:"pointer",
      display:"flex",alignItems:"center",justifyContent:"center",
      boxShadow:"0 2px 10px rgba(0,0,0,0.3)",zIndex:640,color:S.muted,
      fontSize:16,position:"fixed",
    }},
      "🗑️",
      React.createElement("span",{style:{position:"absolute",top:-4,right:-4,width:18,height:18,borderRadius:"50%",background:S.danger,color:"white",fontFamily:"'Inter',sans-serif",fontSize:9,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center"}},trashCount)
    ),

    /* FAB — new page */
    React.createElement("button",{onClick:onAdd,style:{
      position:"fixed",bottom:32,right:"calc(50% - 215px + 18px)",
      width:56,height:56,borderRadius:"50%",
      background:S.white,border:"none",cursor:"pointer",
      display:"flex",alignItems:"center",justifyContent:"center",
      boxShadow:"0 4px 20px rgba(255,255,255,0.15)",zIndex:650,color:S.bg,
    }},Si.plus)
  );
}


// ── js/notebooks.js ─────────────────────────────────────────────
/* SecretNote — Notebooks List Screen (scalable for 1000+ notebooks) */

function NotebooksScreen({ notebooks, secrets, activeNotebookId, onBack, onSelect, onNewNotebook }) {
  var useState = React.useState;
  var [query, setQuery] = useState("");

  var q = query.trim().toLowerCase();

  /* Sort: most recent first (last created = highest id) */
  var sorted = notebooks.slice().sort(function(a,b){ return b.id - a.id; });

  /* Filter by search */
  var filtered = q.length > 0
    ? sorted.filter(function(nb){
        /* Match by name, emoji, or id number */
        var numMatch = q.match(/^#?(\d+)$/);
        if (numMatch && nb.id === parseInt(numMatch[1])) return true;
        return nb.name.toLowerCase().indexOf(q) !== -1 ||
               (nb.emoji && nb.emoji.indexOf(q) !== -1);
      })
    : sorted;

  return React.createElement("div",null,
    /* Header */
    React.createElement("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:20}},
      React.createElement("button",{onClick:onBack,style:{width:36,height:36,borderRadius:10,background:S.surface2,border:"1px solid "+S.line,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:S.sub}},Si.back),
      React.createElement("h2",{style:{fontFamily:"'Lora',serif",fontSize:22,fontWeight:700,color:S.title,margin:0,flex:1}},sn("notebooks")),
      React.createElement("button",{onClick:onNewNotebook,style:{
        padding:"8px 14px",borderRadius:10,background:S.white,color:S.bg,border:"none",
        fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:700,cursor:"pointer",
        display:"flex",alignItems:"center",gap:4,
      }},Si.plus," "+sn("newNotebook"))
    ),

    /* Search bar */
    React.createElement("div",{style:{position:"relative",marginBottom:18}},
      React.createElement("div",{style:{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",color:S.muted}},Si.search),
      React.createElement("input",{
        type:"text",value:query,
        onChange:function(e){setQuery(e.target.value)},
        placeholder:sn("searchNotebooks"),
        style:{
          width:"100%",padding:"12px 14px 12px 44px",borderRadius:12,
          background:S.surface2,border:"1px solid "+S.line,color:S.title,
          fontFamily:"'Inter',sans-serif",fontSize:13,fontWeight:500,
          outline:"none",boxSizing:"border-box",
        }
      })
    ),

    /* Count */
    React.createElement("p",{style:{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:700,color:S.muted,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:12}},
      filtered.length+" "+sn("notebookCount")
    ),

    /* Notebooks list */
    filtered.length === 0 && React.createElement("div",{style:{textAlign:"center",padding:"40px 20px"}},
      React.createElement("p",{style:{fontSize:36,marginBottom:12}},"📓"),
      React.createElement("p",{style:{fontFamily:"'Lora',serif",fontSize:16,fontWeight:600,color:S.sub,fontStyle:"italic"}},sn("noResults"))
    ),

    filtered.map(function(nb){
      var isActive = nb.id === activeNotebookId;
      var count = secrets.filter(function(s){return s.notebookId===nb.id && !s.torn && s.content && s.content.trim()}).length;
      var totalChars = secrets.filter(function(s){return s.notebookId===nb.id && !s.torn}).reduce(function(a,s){return a+charCount(s.content)},0);

      return React.createElement("div",{key:nb.id,onClick:function(){onSelect(nb.id)},style:{
        background:isActive?S.surface3:S.surface,
        borderRadius:14,
        border:isActive?"1.5px solid "+S.white+"30":"1px solid "+S.line,
        padding:"16px",marginBottom:10,cursor:"pointer",
        transition:"all 0.15s",
      }},
        React.createElement("div",{style:{display:"flex",alignItems:"center",gap:12}},
          /* Emoji */
          React.createElement("div",{style:{width:44,height:44,borderRadius:12,background:S.surface2,border:"1px solid "+S.line,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}},nb.emoji||"📓"),

          /* Info */
          React.createElement("div",{style:{flex:1,minWidth:0}},
            React.createElement("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:4}},
              React.createElement("span",{style:{fontFamily:"'Lora',serif",fontSize:15,fontWeight:700,color:S.title,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}},nb.name),
              isActive && React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:9,fontWeight:700,color:S.bg,background:S.white,padding:"2px 7px",borderRadius:100}},sn("current"))
            ),
            React.createElement("div",{style:{display:"flex",alignItems:"center",gap:10}},
              React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:500,color:S.muted}},count+" "+sn("pages")),
              React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:11,color:S.line}},"·"),
              React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:500,color:S.muted}},totalChars+" "+sn("chars")),
              nb.createdAt && React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:11,color:S.line}},"·"),
              nb.createdAt && React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:500,color:S.muted}},snFmtDay(nb.createdAt))
            )
          ),

          /* Arrow */
          React.createElement("span",{style:{color:S.muted,flexShrink:0}},Si.chevR)
        )
      );
    })
  );
}


// ── js/editor.js ────────────────────────────────────────────────
/* SecretNote — Page Editor (3000 chars, bookmarks, stickers, tear, auto-advance) */

function PageEditor({ secret, onSave, onBack, onTear, onToggleBookmark, onAddSticker, onRemoveSticker, pageNum, totalPages, notebookId, autoAdvance }) {
  var useState = React.useState, useEffect = React.useEffect, useRef = React.useRef;
  var [text, setText] = useState(secret ? secret.content : "");
  var [cat, setCat]   = useState(secret ? secret.category || "" : "");
  var [saved, setSaved] = useState(false);
  var [showCats, setShowCats] = useState(false);
  var [showStickers, setShowStickers] = useState(false);
  var [showTearConfirm, setShowTearConfirm] = useState(false);
  var textRef = useRef(null);
  var cc = charCount(text);
  var remaining = Math.max(0, CHARS_PER_PAGE - cc);
  var isFull = cc >= CHARS_PER_PAGE;
  var pct = Math.min(100, Math.round(cc / CHARS_PER_PAGE * 100));
  var isBookmarked = secret ? secret.bookmarked : false;
  var currentStickers = secret ? (secret.stickers || []) : [];

  /* Auto-save every 3 seconds */
  useEffect(function(){
    var timer = setTimeout(function(){
      if (text !== (secret ? secret.content : "")) {
        doSave(true);
      }
    }, 3000);
    return function(){ clearTimeout(timer); };
  },[text]);

  var doSave = function(silent){
    var data = {
      id: secret ? secret.id : Date.now(),
      notebookId: notebookId,
      page: pageNum,
      date: secret ? secret.date : snTodayStr(),
      time: new Date().toLocaleTimeString(snLocale(),{hour:"2-digit",minute:"2-digit"}),
      category: cat || null,
      content: text,
      sealed: true,
      bookmarked: isBookmarked,
      stickers: currentStickers,
      torn: false,
    };
    onSave(data);
    if (!silent) {
      setSaved(true);
      setTimeout(function(){setSaved(false)},1200);
    }
  };

  var handleManualSave = function(){
    doSave(false);
    /* Auto-advance: after explicit save, go to next page */
    if (autoAdvance && text.trim()) {
      setTimeout(function(){ autoAdvance(); }, 600);
    }
  };

  var handleTextChange = function(e){
    var newText = e.target.value;
    if (charCount(newText) <= CHARS_PER_PAGE + 20) {
      setText(newText);
    }
  };

  var handleTear = function(){
    setShowTearConfirm(false);
    if (secret && onTear) {
      onTear(secret.id);
    }
  };

  return React.createElement("div",{style:{minHeight:"100vh",background:S.bg,padding:"0 0 40px"}},
    /* Top bar */
    React.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 20px 12px",position:"sticky",top:0,zIndex:50,background:S.bg}},
      React.createElement("button",{onClick:function(){ if(text.trim()) doSave(true); onBack(); },style:{width:36,height:36,borderRadius:10,background:S.surface2,border:"1px solid "+S.line,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:S.sub}},Si.back),
      React.createElement("div",{style:{display:"flex",alignItems:"center",gap:6}},
        React.createElement("span",{style:{fontFamily:"'Lora',serif",fontSize:14,fontWeight:700,color:S.title}},sn("page")+" "+pageNum),
        React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:11,color:S.muted}},"·"),
        React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:500,color:isFull?S.gold:S.muted}},cc+" / "+CHARS_PER_PAGE)
      ),
      React.createElement("div",{style:{display:"flex",gap:6}},
        saved && React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:600,color:S.sub,display:"flex",alignItems:"center",gap:4}},React.createElement("span",{style:{color:S.sub}},Si.check)," ",sn("saved")),
        !saved && React.createElement("button",{onClick:handleManualSave,disabled:!text.trim(),style:{padding:"7px 14px",borderRadius:8,background:S.white,color:S.bg,border:"none",fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:700,cursor:text.trim()?"pointer":"default",opacity:text.trim()?1:0.3}},sn("save"))
      )
    ),

    /* Action bar: category, bookmark, stickers, tear */
    React.createElement("div",{style:{padding:"0 20px",marginBottom:12}},
      React.createElement("div",{style:{display:"flex",gap:6,overflowX:"auto",paddingBottom:4,alignItems:"center"}},
        /* Category */
        React.createElement("button",{onClick:function(){setShowCats(!showCats);setShowStickers(false)},style:{
          padding:"5px 12px",borderRadius:100,
          border:"1px dashed "+S.line2,background:"transparent",
          color:S.muted,fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:600,
          cursor:"pointer",whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:4,
        }},cat ? "📁 "+cat : "📁 "+sn("category")),

        /* Bookmark toggle */
        secret && React.createElement("button",{onClick:function(){ if(onToggleBookmark) onToggleBookmark(secret.id); },style:{
          padding:"5px 12px",borderRadius:100,
          border:"1px solid "+(isBookmarked?S.gold:S.line),
          background:isBookmarked?S.goldSoft:"transparent",
          color:isBookmarked?S.gold:S.muted,fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:600,
          cursor:"pointer",whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:4,
        }},"🔖 "+(isBookmarked?sn("bookmarked"):sn("bookmark"))),

        /* Stickers button */
        React.createElement("button",{onClick:function(){setShowStickers(!showStickers);setShowCats(false)},style:{
          padding:"5px 12px",borderRadius:100,
          border:"1px solid "+S.line,background:"transparent",
          color:S.muted,fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:600,
          cursor:"pointer",whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:4,
        }},currentStickers.length > 0 ? currentStickers.join("") : "✨ "+sn("stickers")),

        /* Tear page */
        secret && React.createElement("button",{onClick:function(){setShowTearConfirm(true)},style:{
          padding:"5px 12px",borderRadius:100,
          border:"1px solid "+S.dangerSoft,background:"transparent",
          color:S.danger,fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:600,
          cursor:"pointer",whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:4,marginLeft:"auto",
        }},"🗑️ "+sn("tearPage"))
      ),

      /* Category options */
      showCats && React.createElement("div",{style:{display:"flex",gap:6,flexWrap:"wrap",marginTop:8}},
        DEFAULT_CATEGORIES.map(function(c){
          var active = cat === c.name;
          return React.createElement("button",{key:c.id,onClick:function(){setCat(active?"":c.name);setShowCats(false)},style:{
            padding:"5px 12px",borderRadius:100,
            border:"1px solid "+(active?S.sub:S.line),
            background:active?S.surface3:"transparent",
            color:active?S.title:S.muted,
            fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:active?700:500,
            cursor:"pointer",whiteSpace:"nowrap",
          }},c.name);
        })
      ),

      /* Sticker picker */
      showStickers && React.createElement("div",{style:{display:"flex",gap:6,flexWrap:"wrap",marginTop:8,padding:"8px 0"}},
        STICKERS.map(function(st){
          var has = currentStickers.indexOf(st) !== -1;
          return React.createElement("button",{key:st,onClick:function(){
            if(has && onRemoveSticker && secret) { onRemoveSticker(secret.id,st); }
            else if(!has && onAddSticker && secret) { onAddSticker(secret.id,st); }
          },style:{
            width:36,height:36,borderRadius:8,
            background:has?S.accentMid:S.surface2,
            border:"1px solid "+(has?S.sub:S.line),
            cursor:"pointer",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center",
          }},st);
        })
      )
    ),

    /* Tear confirm modal */
    showTearConfirm && React.createElement("div",{style:{position:"fixed",inset:0,zIndex:900,background:"rgba(0,0,0,0.7)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}},
      React.createElement("div",{style:{background:S.surface,borderRadius:16,border:"1px solid "+S.line,padding:24,maxWidth:320,width:"100%",textAlign:"center"}},
        React.createElement("p",{style:{fontSize:36,marginBottom:12}},"🗑️"),
        React.createElement("p",{style:{fontFamily:"'Lora',serif",fontSize:16,fontWeight:600,color:S.title,marginBottom:8}},sn("tearPage")),
        React.createElement("p",{style:{fontFamily:"'Inter',sans-serif",fontSize:13,fontWeight:500,color:S.muted,marginBottom:24,lineHeight:1.6}},sn("tearConfirm")),
        React.createElement("div",{style:{display:"flex",gap:10}},
          React.createElement(SBtn,{variant:"ghost",full:true,onClick:function(){setShowTearConfirm(false)}},sn("cancel")),
          React.createElement(SBtn,{variant:"danger",full:true,onClick:handleTear},sn("tearPage"))
        )
      )
    ),

    /* The notebook page */
    React.createElement("div",{style:{padding:"0 12px"}},
      React.createElement(NotebookPage,{pageNum:pageNum,totalPages:totalPages},
        /* Date header on page */
        React.createElement("div",{style:{textAlign:"center",marginBottom:20,paddingTop:8}},
          React.createElement("p",{style:{fontFamily:"'Lora',serif",fontSize:13,fontWeight:600,color:S.inkMuted,fontStyle:"italic",margin:0}},
            secret ? snFmtLong(secret.date) : snFmtLong(snTodayStr())
          ),
          React.createElement("p",{style:{fontFamily:"'Inter',sans-serif",fontSize:10,fontWeight:500,color:S.inkMuted,margin:"4px 0 0",letterSpacing:"0.06em"}},
            secret ? secret.time : new Date().toLocaleTimeString(snLocale(),{hour:"2-digit",minute:"2-digit"})
          )
        ),

        /* Text area */
        React.createElement("textarea",{
          ref:textRef,
          value:text,
          onChange:handleTextChange,
          placeholder:text ? sn("continueWriting") : sn("writeHere"),
          autoFocus:true,
          style:{
            width:"100%",minHeight:400,
            background:"transparent",border:"none",outline:"none",resize:"none",
            fontFamily:"'Lora',serif",fontSize:16,fontWeight:500,fontStyle:"italic",
            color:S.ink,lineHeight:"28px",
            padding:0,boxSizing:"border-box",
          }
        }),

        /* Char counter at bottom of page */
        React.createElement("div",{style:{marginTop:20,paddingTop:12,borderTop:"1px solid "+S.pageLine2}},
          React.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"}},
            React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:500,color:S.inkMuted}},
              remaining+" "+sn("charsLeft")
            ),
            React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:700,color:isFull?"#8B6914":S.inkMuted}},
              pct+"%"
            )
          ),
          React.createElement("div",{style:{height:4,background:S.pageLines,borderRadius:2,marginTop:6,overflow:"hidden"}},
            React.createElement("div",{style:{width:pct+"%",height:"100%",background:isFull?"#C9A84C":"#888888",borderRadius:2,transition:"width 0.3s"}})
          ),
          isFull && React.createElement("p",{style:{fontFamily:"'Lora',serif",fontSize:12,fontWeight:500,color:"#8B6914",fontStyle:"italic",textAlign:"center",marginTop:10}},
            sn("pageFullDesc")
          )
        )
      )
    )
  );
}


// ── js/search.js ────────────────────────────────────────────────
/* SecretNote — Search Screen (page#, notebook#, keyword) */

function SearchScreen({ secrets, notebooks, onBack, onOpenPage, onSwitchNotebook }) {
  var useState = React.useState;
  var [query, setQuery] = useState("");

  var q = query.trim().toLowerCase();

  var results = [];
  var notebookResults = [];

  if (q.length > 0) {
    /* Check if searching by page number: "p3", "page 3", "3" */
    var pageMatch = q.match(/^(?:p(?:age)?\s*)?(\d+)$/i);
    var pageNum = pageMatch ? parseInt(pageMatch[1]) : null;

    /* Check if searching by notebook: "n1", "notebook 1", "cahier 2" */
    var nbMatch = q.match(/^(?:n(?:otebook|b)?\s*|cahier\s*)(\d+)$/i);
    var nbNum = nbMatch ? parseInt(nbMatch[1]) : null;

    /* Notebook results */
    if (nbNum) {
      notebookResults = notebooks.filter(function(nb){ return nb.id === nbNum; });
    }
    /* Also search notebook names */
    notebookResults = notebookResults.concat(
      notebooks.filter(function(nb){
        if (nbNum && nb.id === nbNum) return false; /* avoid dupe */
        return nb.name.toLowerCase().indexOf(q) !== -1;
      })
    );

    /* Page results */
    var activeSecrets = secrets.filter(function(s){ return !s.torn; });

    if (pageNum) {
      /* Direct page number match first */
      var directMatch = activeSecrets.filter(function(s){ return s.page === pageNum; });
      results = directMatch;
    }

    /* Also text/category search */
    var textResults = activeSecrets.filter(function(s){
      /* Skip if already in results */
      if (pageNum && s.page === pageNum) return false;
      return (s.content && s.content.toLowerCase().indexOf(q) !== -1) ||
             (s.category && s.category.toLowerCase().indexOf(q) !== -1);
    });
    results = results.concat(textResults);
  }

  return React.createElement("div",null,
    /* Header */
    React.createElement("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:20}},
      React.createElement("button",{onClick:onBack,style:{width:36,height:36,borderRadius:10,background:S.surface2,border:"1px solid "+S.line,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:S.sub}},Si.back),
      React.createElement("h2",{style:{fontFamily:"'Lora',serif",fontSize:22,fontWeight:700,color:S.title,margin:0}},sn("search"))
    ),

    /* Search input */
    React.createElement("div",{style:{position:"relative",marginBottom:22}},
      React.createElement("div",{style:{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",color:S.muted}},Si.search),
      React.createElement("input",{
        type:"text",value:query,
        onChange:function(e){setQuery(e.target.value)},
        placeholder:sn("searchPlaceholder"),
        autoFocus:true,
        style:{
          width:"100%",padding:"14px 14px 14px 44px",borderRadius:14,
          background:S.surface2,border:"1px solid "+S.line,color:S.title,
          fontFamily:"'Inter',sans-serif",fontSize:14,fontWeight:500,
          outline:"none",boxSizing:"border-box",
        }
      })
    ),

    /* Results */
    q.length > 0 && React.createElement("div",null,
      /* Notebook results */
      notebookResults.length > 0 && React.createElement("div",{style:{marginBottom:20}},
        React.createElement("p",{style:{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:700,color:S.muted,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:10}},sn("notebooks")),
        notebookResults.map(function(nb){
          var count = secrets.filter(function(s){return s.notebookId===nb.id&&!s.torn&&s.content&&s.content.trim()}).length;
          return React.createElement("div",{key:"nb-"+nb.id,onClick:function(){ onSwitchNotebook(nb.id); onBack(); },style:{
            background:S.surface,borderRadius:14,border:"1px solid "+S.line,
            padding:"14px 16px",marginBottom:8,cursor:"pointer",
            display:"flex",alignItems:"center",gap:12,
          }},
            React.createElement("span",{style:{fontSize:20}},nb.emoji||"📓"),
            React.createElement("div",{style:{flex:1}},
              React.createElement("p",{style:{fontFamily:"'Lora',serif",fontSize:14,fontWeight:700,color:S.title,margin:0}},nb.name),
              React.createElement("p",{style:{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:500,color:S.muted,margin:"2px 0 0"}},count+" "+sn("pages"))
            ),
            React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:600,color:S.muted}},"#"+nb.id)
          );
        })
      ),

      /* Page results */
      React.createElement("p",{style:{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:700,color:S.muted,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:10}},
        results.length+" "+sn("results")
      ),
      results.length === 0 && notebookResults.length === 0 && React.createElement("div",{style:{textAlign:"center",padding:"40px 20px"}},
        React.createElement("p",{style:{fontSize:36,marginBottom:12}},"🔍"),
        React.createElement("p",{style:{fontFamily:"'Lora',serif",fontSize:16,fontWeight:600,color:S.sub,fontStyle:"italic"}},sn("noResults"))
      ),
      results.map(function(secret){
        var idx = secret.content.toLowerCase().indexOf(q);
        var snippet;
        if (idx !== -1) {
          var start = Math.max(0, idx - 40);
          var end = Math.min(secret.content.length, idx + q.length + 60);
          snippet = (start > 0 ? "…" : "") + secret.content.substring(start, end) + (end < secret.content.length ? "…" : "");
        } else {
          snippet = secret.content.substring(0, 100) + (secret.content.length > 100 ? "…" : "");
        }
        var nb = notebooks.find(function(n){return n.id===secret.notebookId});
        return React.createElement("div",{key:secret.id,onClick:function(){onOpenPage(secret.id)},style:{
          background:S.surface,borderRadius:14,border:"1px solid "+S.line,
          padding:"14px 16px",marginBottom:10,cursor:"pointer",
        }},
          React.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:6}},
            React.createElement("div",{style:{display:"flex",alignItems:"center",gap:6}},
              secret.bookmarked && React.createElement("span",{style:{fontSize:12}},"🔖"),
              React.createElement("span",{style:{fontFamily:"'Lora',serif",fontSize:13,fontWeight:700,color:S.title}},sn("page")+" "+secret.page),
              nb && React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:10,fontWeight:600,color:S.muted,background:S.surface2,padding:"2px 8px",borderRadius:100}},(nb.emoji||"📓")+" "+nb.name)
            ),
            React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:500,color:S.muted}},snFmtDay(secret.date))
          ),
          React.createElement("p",{style:{fontFamily:"'Lora',serif",fontSize:14,fontWeight:500,color:S.sub,lineHeight:1.7,margin:0,fontStyle:"italic"}},snippet)
        );
      })
    ),

    /* Hint before search */
    q.length === 0 && React.createElement("div",{style:{textAlign:"center",padding:"60px 20px"}},
      React.createElement("p",{style:{fontSize:40,marginBottom:16}},"🔐"),
      React.createElement("p",{style:{fontFamily:"'Lora',serif",fontSize:15,fontWeight:500,color:S.muted,fontStyle:"italic",lineHeight:1.7}},sn("slogan2"))
    )
  );
}


// ── js/settings.js ──────────────────────────────────────────────
/* SecretNote — Settings Screen */

function SettingsScreen({ secrets, notebooks, plan, maxPages, onBack }) {
  var useState = React.useState;
  var [showLangs, setShowLangs] = useState(false);
  var [changingPin, setChanging] = useState(false);
  var [pinStep, setPinStep] = useState("old"); /* old → new → confirm */
  var [oldPin, setOldPin] = useState("");
  var [newPin, setNewPin] = useState("");
  var [confirmP, setConfirmP] = useState("");
  var [pinMsg, setPinMsg] = useState("");

  var activeSecrets = secrets.filter(function(s){return !s.torn && s.content && s.content.trim()});
  var totalChars = activeSecrets.reduce(function(a,s){ return a + charCount(s.content); },0);
  var currentLangObj = SN_LANGS.find(function(l){return l.code===_snLang}) || SN_LANGS[0];

  var changeLang = function(code){
    snSetLang(code);
    window.location.reload();
  };

  return React.createElement("div",null,
    /* Header */
    React.createElement("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:24}},
      React.createElement("button",{onClick:onBack,style:{width:36,height:36,borderRadius:10,background:S.surface2,border:"1px solid "+S.line,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:S.sub}},Si.back),
      React.createElement("h2",{style:{fontFamily:"'Lora',serif",fontSize:22,fontWeight:700,color:S.title,margin:0}},sn("settings"))
    ),

    /* Stats card */
    React.createElement("div",{style:{background:S.surface,borderRadius:16,border:"1px solid "+S.line,padding:"20px 18px",marginBottom:20}},
      React.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}},
        [{v:activeSecrets.length,l:sn("secretCount"),e:"📝"},{v:totalChars,l:sn("totalChars"),e:"✍️"},
         {v:(notebooks||[]).length,l:sn("notebookCount"),e:"📓"},
         {v:activeSecrets.length+" / "+(maxPages*((notebooks||[]).length||1)),l:sn("pagesUsed"),e:"📖"}
        ].map(function(st){
          return React.createElement("div",{key:st.l,style:{textAlign:"center",padding:"10px 0"}},
            React.createElement("p",{style:{fontSize:18,margin:"0 0 4px"}},st.e),
            React.createElement("p",{style:{fontFamily:"'Lora',serif",fontSize:18,fontWeight:700,color:S.title,margin:"0 0 2px"}},st.v),
            React.createElement("p",{style:{fontFamily:"'Inter',sans-serif",fontSize:10,fontWeight:600,color:S.muted,margin:0}},st.l)
          );
        })
      )
    ),

    /* Plan badge */
    React.createElement("div",{style:{background:S.surface,borderRadius:16,border:"1px solid "+S.line,padding:"16px 18px",marginBottom:12,display:"flex",alignItems:"center",justifyContent:"space-between"}},
      React.createElement("div",{style:{display:"flex",alignItems:"center",gap:10}},
        React.createElement("span",{style:{fontSize:18}},plan==="basic"?"📖":"⭐"),
        React.createElement("div",null,
          React.createElement("p",{style:{fontFamily:"'Inter',sans-serif",fontSize:14,fontWeight:700,color:S.title,margin:0}},plan==="basic"?sn("planBasic"):plan==="monthly"?sn("planMonthly"):sn("planYearly")),
          React.createElement("p",{style:{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:500,color:S.muted,margin:"2px 0 0"}},maxPages+" "+sn("pages")+" max")
        )
      ),
      plan==="basic" && React.createElement("button",{style:{
        padding:"7px 14px",borderRadius:8,background:S.white,color:S.bg,border:"none",
        fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:700,cursor:"pointer",
      }},sn("unlock"))
    ),

    /* Language selector */
    React.createElement("div",{style:{background:S.surface,borderRadius:16,border:"1px solid "+S.line,marginBottom:12,overflow:"hidden"}},
      React.createElement("button",{onClick:function(){setShowLangs(!showLangs)},style:{
        width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",
        padding:"16px 18px",background:"transparent",border:"none",cursor:"pointer",
      }},
        React.createElement("div",{style:{display:"flex",alignItems:"center",gap:10}},
          React.createElement("span",{style:{color:S.sub}},Si.globe),
          React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:14,fontWeight:600,color:S.title}},sn("language"))
        ),
        React.createElement("div",{style:{display:"flex",alignItems:"center",gap:6}},
          React.createElement("span",{style:{fontSize:18}},currentLangObj.flag),
          React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:13,fontWeight:500,color:S.sub}},currentLangObj.label),
          React.createElement("span",{style:{color:S.muted,transform:"rotate("+(showLangs?90:0)+"deg)",transition:"transform 0.2s"}},Si.chevR)
        )
      ),
      showLangs && React.createElement("div",{style:{padding:"0 14px 14px",maxHeight:300,overflowY:"auto"}},
        SN_LANGS.map(function(lang){
          var active = _snLang === lang.code;
          return React.createElement("button",{key:lang.code,onClick:function(){changeLang(lang.code)},style:{
            width:"100%",display:"flex",alignItems:"center",gap:10,padding:"10px 12px",
            background:active?S.accentSoft:"transparent",
            border:"1px solid "+(active?S.line2:"transparent"),
            borderRadius:10,marginBottom:4,cursor:"pointer",
          }},
            React.createElement("span",{style:{fontSize:18}},lang.flag),
            React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:13,fontWeight:active?700:500,color:active?S.title:S.sub,flex:1,textAlign:"left"}},lang.label),
            active && React.createElement("span",{style:{color:S.white}},Si.check)
          );
        })
      )
    ),

    /* Change PIN */
    React.createElement("div",{style:{background:S.surface,borderRadius:16,border:"1px solid "+S.line,marginBottom:12}},
      React.createElement("button",{onClick:function(){setChanging(!changingPin)},style:{
        width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",
        padding:"16px 18px",background:"transparent",border:"none",cursor:"pointer",
      }},
        React.createElement("div",{style:{display:"flex",alignItems:"center",gap:10}},
          React.createElement("span",{style:{color:S.sub}},Si.lock),
          React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:14,fontWeight:600,color:S.title}},sn("changePin"))
        ),
        React.createElement("span",{style:{color:S.muted}},Si.chevR)
      )
    ),

    /* Encrypted notice */
    React.createElement("div",{style:{display:"flex",gap:10,padding:"14px 16px",background:S.surface,borderRadius:14,border:"1px solid "+S.line,marginTop:20}},
      React.createElement("span",{style:{fontSize:18,flexShrink:0}},"🔒"),
      React.createElement("p",{style:{fontFamily:"'Lora',serif",fontSize:12,fontWeight:500,color:S.muted,lineHeight:1.7,margin:0,fontStyle:"italic"}},
        sn("noOneCanSee")
      )
    ),

    /* Version */
    React.createElement("p",{style:{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:500,color:S.muted,textAlign:"center",marginTop:24}},"SecretNote v1.0 · CloneX Studio")
  );
}


// ── js/subscription.js ──────────────────────────────────────────
/* SecretNote — Subscription / Plans Screen */

function SubscriptionScreen({ plan, onBack, onSelectPlan }) {
  var plans = [
    {
      id: "basic",
      icon: "📖",
      name: sn("planBasic"),
      price: PLANS.basic.price+"$"+sn("perMonth"),
      features: [
        PLANS.basic.maxPages+" "+sn("pagesPerNotebook"),
        PLANS.basic.maxNotebooks+" "+sn("notebook"),
        sn("encrypted"),
      ],
      current: plan === "basic",
    },
    {
      id: "monthly",
      icon: "⭐",
      name: sn("planMonthly"),
      price: PLANS.monthly.price+"$"+sn("perMonth"),
      features: [
        PLANS.monthly.maxPages+" "+sn("pagesPerNotebook"),
        PLANS.monthly.maxNotebooks+" "+sn("notebooksMax"),
        sn("encrypted"),
        sn("prioritySupport"),
      ],
      current: plan === "monthly",
      popular: true,
    },
    {
      id: "monthlyPlus",
      icon: "💫",
      name: sn("planMonthlyPlus"),
      price: PLANS.monthlyPlus.price+"$"+sn("perMonth"),
      features: [
        PLANS.monthlyPlus.maxPages+" "+sn("pagesPerNotebook"),
        PLANS.monthlyPlus.maxNotebooks+" "+sn("notebooksMax"),
        sn("encrypted"),
        sn("prioritySupport"),
      ],
      current: plan === "monthlyPlus",
    },
    {
      id: "yearly",
      icon: "💎",
      name: sn("planYearly"),
      price: PLANS.yearly.price+"$"+sn("perYear"),
      features: [
        PLANS.yearly.maxPages+" "+sn("pagesPerNotebook"),
        PLANS.yearly.maxNotebooks+" "+sn("notebooksMax"),
        sn("encrypted"),
        sn("prioritySupport"),
        sn("bestValue"),
      ],
      current: plan === "yearly",
    },
  ];

  return React.createElement("div",null,
    /* Header */
    React.createElement("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:24}},
      React.createElement("button",{onClick:onBack,style:{width:36,height:36,borderRadius:10,background:S.surface2,border:"1px solid "+S.line,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:S.sub}},Si.back),
      React.createElement("h2",{style:{fontFamily:"'Lora',serif",fontSize:22,fontWeight:700,color:S.title,margin:0}},sn("unlock"))
    ),

    /* Subtitle */
    React.createElement("p",{style:{fontFamily:"'Lora',serif",fontSize:14,fontWeight:500,color:S.muted,fontStyle:"italic",marginBottom:28,lineHeight:1.7}},sn("unlockDesc")),

    /* Plans */
    plans.map(function(p){
      return React.createElement("div",{key:p.id,style:{
        background:p.current?S.surface3:S.surface,
        borderRadius:16,
        border:p.popular?"2px solid "+S.white:"1px solid "+S.line,
        padding:"20px 18px",marginBottom:14,
        position:"relative",overflow:"hidden",
      }},
        /* Popular badge */
        p.popular && React.createElement("div",{style:{
          position:"absolute",top:0,right:0,
          background:S.white,color:S.bg,
          fontFamily:"'Inter',sans-serif",fontSize:10,fontWeight:800,
          padding:"4px 12px",borderRadius:"0 14px 0 10px",
          textTransform:"uppercase",letterSpacing:"0.05em",
        }},sn("popular")),

        /* Plan header */
        React.createElement("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:14}},
          React.createElement("span",{style:{fontSize:28}},p.icon),
          React.createElement("div",{style:{flex:1}},
            React.createElement("p",{style:{fontFamily:"'Lora',serif",fontSize:18,fontWeight:700,color:S.title,margin:0}},p.name),
            React.createElement("p",{style:{fontFamily:"'Inter',sans-serif",fontSize:14,fontWeight:700,color:p.current?S.muted:S.white,margin:"2px 0 0"}},p.price)
          ),
          p.current && React.createElement("span",{style:{
            fontFamily:"'Inter',sans-serif",fontSize:10,fontWeight:700,
            color:S.sub,background:S.surface2,padding:"4px 10px",borderRadius:100,
            border:"1px solid "+S.line,
          }},sn("currentPlan"))
        ),

        /* Features */
        React.createElement("div",{style:{marginBottom:16}},
          p.features.map(function(f,i){
            return React.createElement("div",{key:i,style:{display:"flex",alignItems:"center",gap:8,marginBottom:6}},
              React.createElement("span",{style:{color:S.sub,fontSize:14}},"✓"),
              React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:500,color:S.sub}},f)
            );
          })
        ),

        /* Button */
        !p.current && React.createElement(SBtn,{
          variant:p.popular?"primary":"outline",
          full:true,small:true,
          onClick:function(){ onSelectPlan(p.id); }
        },sn("subscribe")),

        p.current && React.createElement("div",{style:{
          padding:"8px 0",textAlign:"center",
          fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:600,color:S.muted,
        }},sn("activePlan"))
      );
    }),

    /* Encrypted badge */
    React.createElement("div",{style:{display:"flex",alignItems:"center",gap:8,padding:"12px 14px",background:S.accentSoft,borderRadius:10,marginTop:20,border:"1px solid "+S.line}},
      React.createElement("span",{style:{color:S.sub}},Si.shield),
      React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:500,color:S.muted}},sn("noOneCanSee"))
    )
  );
}


// ── js/app.js ───────────────────────────────────────────────────
/* SecretNote — Main App (full state: notebooks, trash, bookmarks, stickers, auto-advance) */

function TrashScreen({ trash, onBack, onRestore, onDestroyAll }) {
  var [showDestroy, setShowDestroy] = React.useState(false);

  return React.createElement("div",null,
    React.createElement("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:20}},
      React.createElement("button",{onClick:onBack,style:{width:36,height:36,borderRadius:10,background:S.surface2,border:"1px solid "+S.line,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:S.sub}},Si.back),
      React.createElement("h2",{style:{fontFamily:"'Lora',serif",fontSize:22,fontWeight:700,color:S.title,margin:0}},sn("trash")),
      React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:600,color:S.muted,background:S.surface2,padding:"2px 10px",borderRadius:100}},trash.length+" "+sn("tornPages"))
    ),

    trash.length === 0 && React.createElement("div",{style:{textAlign:"center",padding:"60px 20px"}},
      React.createElement("p",{style:{fontSize:40,marginBottom:12}},"🗑️"),
      React.createElement("p",{style:{fontFamily:"'Lora',serif",fontSize:16,fontWeight:600,color:S.sub,fontStyle:"italic"}},sn("trashEmpty"))
    ),

    trash.length > 0 && React.createElement("div",null,
      trash.map(function(secret){
        return React.createElement("div",{key:secret.id,style:{
          background:S.surface,borderRadius:14,border:"1px solid "+S.line,
          padding:"14px 16px",marginBottom:10,opacity:0.7,
        }},
          React.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}},
            React.createElement("span",{style:{fontFamily:"'Lora',serif",fontSize:13,fontWeight:700,color:S.title}},sn("page")+" "+secret.page),
            React.createElement("span",{style:{fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:500,color:S.muted}},snFmtDay(secret.date))
          ),
          React.createElement("p",{style:{fontFamily:"'Lora',serif",fontSize:13,fontWeight:500,color:S.sub,lineHeight:1.6,margin:"0 0 10px",fontStyle:"italic",
            overflow:"hidden",textOverflow:"ellipsis",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"
          }},secret.content),
          React.createElement("button",{onClick:function(){onRestore(secret.id)},style:{
            padding:"6px 14px",borderRadius:8,background:S.surface2,border:"1px solid "+S.line,
            color:S.sub,fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:600,cursor:"pointer",
            display:"flex",alignItems:"center",gap:6,
          }},"↩️ "+sn("restore"))
        );
      }),

      React.createElement("div",{style:{marginTop:24}},
        React.createElement(SBtn,{variant:"danger",full:true,onClick:function(){setShowDestroy(true)}},"💀 "+sn("destroyAll"))
      )
    ),

    /* Destroy confirm */
    showDestroy && React.createElement("div",{style:{position:"fixed",inset:0,zIndex:900,background:"rgba(0,0,0,0.7)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}},
      React.createElement("div",{style:{background:S.surface,borderRadius:16,border:"1px solid "+S.line,padding:24,maxWidth:320,width:"100%",textAlign:"center"}},
        React.createElement("p",{style:{fontSize:36,marginBottom:12}},"💀"),
        React.createElement("p",{style:{fontFamily:"'Lora',serif",fontSize:16,fontWeight:600,color:S.danger,marginBottom:8}},sn("destroyAll")),
        React.createElement("p",{style:{fontFamily:"'Inter',sans-serif",fontSize:13,fontWeight:500,color:S.muted,marginBottom:24,lineHeight:1.6}},sn("destroyConfirm")),
        React.createElement("div",{style:{display:"flex",gap:10}},
          React.createElement(SBtn,{variant:"ghost",full:true,onClick:function(){setShowDestroy(false)}},sn("cancel")),
          React.createElement(SBtn,{variant:"danger",full:true,onClick:function(){setShowDestroy(false);onDestroyAll();}},sn("confirm"))
        )
      )
    )
  );
}

function NewNotebookSheet({ onClose, onCreate }) {
  var [name, setName] = React.useState("");
  var [emoji, setEmoji] = React.useState("📓");
  var emojis = ["📓","📕","📗","📘","📙","📔","🔒","💀","🖤","🤍","❤️","💎","🔥","✨","🌙","⭐","🎭","👁️","🗝️","💌"];

  return React.createElement("div",{style:{position:"fixed",inset:0,zIndex:900,background:"rgba(0,0,0,0.7)",display:"flex",alignItems:"flex-end",justifyContent:"center"}},
    React.createElement("div",{style:{background:S.surface,borderRadius:"20px 20px 0 0",border:"1px solid "+S.line,padding:24,maxWidth:430,width:"100%",animation:"fadeUp .25s ease"}},
      React.createElement("div",{style:{width:40,height:4,borderRadius:2,background:S.line2,margin:"0 auto 20px"}}),
      React.createElement("h3",{style:{fontFamily:"'Lora',serif",fontSize:20,fontWeight:700,color:S.title,margin:"0 0 20px",textAlign:"center"}},sn("newNotebook")),

      /* Emoji picker */
      React.createElement("div",{style:{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center",marginBottom:20}},
        emojis.map(function(e){
          return React.createElement("button",{key:e,onClick:function(){setEmoji(e)},style:{
            width:40,height:40,borderRadius:10,fontSize:20,
            background:emoji===e?S.accentMid:S.surface2,
            border:"1px solid "+(emoji===e?S.sub:S.line),
            cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",
          }},e);
        })
      ),

      /* Name input */
      React.createElement("input",{
        type:"text",value:name,
        onChange:function(e){setName(e.target.value)},
        placeholder:sn("notebookName"),
        autoFocus:true,
        style:{
          width:"100%",padding:"14px 16px",borderRadius:12,
          background:S.surface2,border:"1px solid "+S.line,color:S.title,
          fontFamily:"'Lora',serif",fontSize:16,fontWeight:600,fontStyle:"italic",
          outline:"none",boxSizing:"border-box",marginBottom:20,
        }
      }),

      React.createElement("div",{style:{display:"flex",gap:10}},
        React.createElement(SBtn,{variant:"ghost",full:true,onClick:onClose},sn("cancel")),
        React.createElement(SBtn,{variant:"primary",full:true,onClick:function(){
          if(name.trim()){onCreate({name:name.trim(),emoji:emoji})}
        },disabled:!name.trim()},sn("confirm"))
      )
    )
  );
}

/* Page limit overlay */
function PageLimitOverlay({ maxPages, onClose, onUpgrade }) {
  return React.createElement("div",{style:{position:"fixed",inset:0,zIndex:900,background:"rgba(0,0,0,0.7)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}},
    React.createElement("div",{style:{background:S.surface,borderRadius:16,border:"1px solid "+S.line,padding:24,maxWidth:320,width:"100%",textAlign:"center"}},
      React.createElement("p",{style:{fontSize:36,marginBottom:12}},"📖"),
      React.createElement("p",{style:{fontFamily:"'Lora',serif",fontSize:16,fontWeight:700,color:S.title,marginBottom:8}},sn("pageLimitTitle")),
      React.createElement("p",{style:{fontFamily:"'Inter',sans-serif",fontSize:13,fontWeight:500,color:S.muted,marginBottom:24,lineHeight:1.6}},sn("pageLimitDesc").replace("{n}",maxPages)),
      React.createElement("div",{style:{display:"flex",gap:10}},
        React.createElement(SBtn,{variant:"ghost",full:true,onClick:onClose},sn("close")),
        React.createElement(SBtn,{variant:"primary",full:true,onClick:onUpgrade},sn("unlock"))
      )
    )
  );
}

/* Notebook limit overlay */
function NotebookLimitOverlay({ maxNotebooks, onClose, onUpgrade }) {
  return React.createElement("div",{style:{position:"fixed",inset:0,zIndex:900,background:"rgba(0,0,0,0.7)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}},
    React.createElement("div",{style:{background:S.surface,borderRadius:16,border:"1px solid "+S.line,padding:24,maxWidth:320,width:"100%",textAlign:"center"}},
      React.createElement("p",{style:{fontSize:36,marginBottom:12}},"📓"),
      React.createElement("p",{style:{fontFamily:"'Lora',serif",fontSize:16,fontWeight:700,color:S.title,marginBottom:8}},sn("notebookLimitTitle")),
      React.createElement("p",{style:{fontFamily:"'Inter',sans-serif",fontSize:13,fontWeight:500,color:S.muted,marginBottom:24,lineHeight:1.6}},sn("notebookLimitDesc").replace("{n}",maxNotebooks)),
      React.createElement("div",{style:{display:"flex",gap:10}},
        React.createElement(SBtn,{variant:"ghost",full:true,onClick:onClose},sn("close")),
        React.createElement(SBtn,{variant:"primary",full:true,onClick:onUpgrade},sn("unlock"))
      )
    )
  );
}

function SecretNoteApp() {
  var useState = React.useState, useEffect = React.useEffect;
  var [locked, setLocked]               = useState(true);
  var [view, setView]                   = useState("notebook"); /* notebook | editor | search | settings | trash */
  var [secrets, setSecrets]             = useState(function(){
    try {
      var raw = localStorage.getItem("sn_secrets");
      if (raw) {
        var parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error("[SecretNote] Failed to hydrate secrets, using defaults", e);
    }
    return SAMPLE_SECRETS;
  });
  var [notebooks, setNotebooks]         = useState(function(){
    try {
      var raw = localStorage.getItem("sn_notebooks");
      if (raw) {
        var parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error("[SecretNote] Failed to hydrate notebooks, using defaults", e);
    }
    return DEFAULT_NOTEBOOKS;
  });
  var [activeNotebookId, setActiveNbId] = useState(1);
  var [editId, setEditId]               = useState(null);
  var [toast, setToast]                 = useState("");
  var [showNewNb, setShowNewNb]         = useState(false);
  var [showPageLimit, setShowPageLimit] = useState(false);
  var [showNbLimit, setShowNbLimit]     = useState(false);
  var [plan, setPlan]                   = useState("basic"); /* basic | monthly | monthlyPlus | yearly */

  /* ─── PERSISTANCE ─── */
  /* Sauve secrets/notebooks à chaque changement. Quota dépassé → log + on continue. */
  useEffect(function(){
    try {
      localStorage.setItem("sn_secrets", JSON.stringify(secrets));
    } catch (e) {
      console.error("[SecretNote] Failed to persist secrets (quota?)", e);
    }
  }, [secrets]);
  useEffect(function(){
    try {
      localStorage.setItem("sn_notebooks", JSON.stringify(notebooks));
    } catch (e) {
      console.error("[SecretNote] Failed to persist notebooks (quota?)", e);
    }
  }, [notebooks]);

  var currentPlan = PLANS[plan] || PLANS.basic;
  var maxPages = currentPlan.maxPages;
  var maxNotebooks = currentPlan.maxNotebooks;

  var showToast = function(msg){ setToast(msg); setTimeout(function(){setToast("")},2000); };

  var activeNotebook = notebooks.find(function(nb){return nb.id===activeNotebookId}) || notebooks[0];

  /* Derived: trash = torn secrets */
  var trash = secrets.filter(function(s){ return s.torn; });
  /* Active (non-torn) secrets for current notebook */
  var currentSecrets = secrets.filter(function(s){ return s.notebookId === activeNotebookId && !s.torn; });

  /* ─── SAVE ─── */
  var handleSave = function(secret){
    setSecrets(function(prev){
      var exists = prev.find(function(s){ return s.id === secret.id; });
      if (exists) {
        return prev.map(function(s){ return s.id === secret.id ? Object.assign({},s,secret) : s; });
      }
      return [secret].concat(prev);
    });
    showToast("✓ "+sn("saved"));
  };

  /* ─── OPEN PAGE ─── */
  var openPage = function(id){
    /* Find the secret and switch to its notebook */
    var s = secrets.find(function(x){return x.id===id});
    if (s && s.notebookId !== activeNotebookId) {
      setActiveNbId(s.notebookId);
    }
    setEditId(id);
    setView("editor");
  };

  /* ─── NEW PAGE ─── */
  var newPage = function(){
    /* Check page limit per notebook */
    var nbSecrets = secrets.filter(function(s){return s.notebookId===activeNotebookId && !s.torn && s.content && s.content.trim()});
    if (nbSecrets.length >= maxPages) {
      setShowPageLimit(true);
      return;
    }
    setEditId(null);
    setView("editor");
  };

  /* ─── AUTO-ADVANCE: create next blank page after save ─── */
  var autoAdvanceToNext = function(){
    var nbSecrets = secrets.filter(function(s){return s.notebookId===activeNotebookId && !s.torn && s.content && s.content.trim()});
    if (nbSecrets.length >= maxPages) {
      setShowPageLimit(true);
      return;
    }
    setEditId(null);
  };

  /* ─── TEAR PAGE ─── */
  var tearPage = function(id){
    setSecrets(function(prev){
      return prev.map(function(s){ return s.id === id ? Object.assign({},s,{torn:true}) : s; });
    });
    showToast("🗑️ "+sn("tearPage"));
    setView("notebook");
  };

  /* ─── RESTORE ─── */
  var restorePage = function(id){
    setSecrets(function(prev){
      return prev.map(function(s){ return s.id === id ? Object.assign({},s,{torn:false}) : s; });
    });
    showToast("↩️ "+sn("restored"));
  };

  /* ─── DESTROY ALL TRASH ─── */
  var destroyAllTrash = function(){
    setSecrets(function(prev){
      return prev.filter(function(s){ return !s.torn; });
    });
    showToast("💀 "+sn("destroyed"));
    setView("notebook");
  };

  /* ─── BOOKMARK ─── */
  var toggleBookmark = function(id){
    setSecrets(function(prev){
      return prev.map(function(s){
        if (s.id === id) return Object.assign({},s,{bookmarked:!s.bookmarked});
        return s;
      });
    });
  };

  /* ─── STICKERS ─── */
  var addSticker = function(id, sticker){
    setSecrets(function(prev){
      return prev.map(function(s){
        if (s.id === id) {
          var st = (s.stickers||[]).slice();
          if (st.indexOf(sticker) === -1) st.push(sticker);
          return Object.assign({},s,{stickers:st});
        }
        return s;
      });
    });
  };
  var removeSticker = function(id, sticker){
    setSecrets(function(prev){
      return prev.map(function(s){
        if (s.id === id) {
          var st = (s.stickers||[]).filter(function(x){return x!==sticker});
          return Object.assign({},s,{stickers:st});
        }
        return s;
      });
    });
  };

  /* ─── NOTEBOOKS ─── */
  var switchNotebook = function(id){
    setActiveNbId(id);
  };

  var createNotebook = function(data){
    /* Check notebook limit */
    if (notebooks.length >= maxNotebooks) {
      setShowNewNb(false);
      setShowNbLimit(true);
      return;
    }
    var newId = notebooks.length > 0 ? Math.max.apply(null,notebooks.map(function(n){return n.id})) + 1 : 1;
    setNotebooks(function(prev){
      return prev.concat([{id:newId,name:data.name,emoji:data.emoji,createdAt:snTodayStr(),color:"#333"}]);
    });
    setActiveNbId(newId);
    setShowNewNb(false);
    showToast("📓 "+data.name);
  };

  /* Page numbers */
  var editingSecret = editId ? secrets.find(function(s){ return s.id === editId; }) : null;
  var nextPageNum = currentSecrets.length > 0 ? Math.max.apply(null, currentSecrets.map(function(s){return s.page})) + 1 : 1;
  var currentPageNum = editingSecret ? editingSecret.page : nextPageNum;

  /* ─── PIN LOCK ─── */
  if (locked) {
    return React.createElement(PinScreen,{onUnlock:function(){setLocked(false)}});
  }

  /* ─── EDITOR ─── */
  if (view === "editor") {
    return React.createElement(PageEditor,{
      secret:editingSecret,
      pageNum:currentPageNum,
      totalPages:currentSecrets.filter(function(s){return s.content&&s.content.trim()}).length + (editingSecret ? 0 : 1),
      notebookId:activeNotebookId,
      onSave:handleSave,
      onBack:function(){setView("notebook")},
      onTear:tearPage,
      onToggleBookmark:toggleBookmark,
      onAddSticker:addSticker,
      onRemoveSticker:removeSticker,
      autoAdvance:autoAdvanceToNext,
    });
  }

  /* ─── MAIN SHELL ─── */
  return React.createElement("div",null,
    React.createElement("div",{style:{minHeight:"100vh",background:S.bg,display:"flex",justifyContent:"center"}},
      React.createElement("div",{style:{width:"100%",maxWidth:430,position:"relative",minHeight:"100vh"}},

        /* Top bar */
        React.createElement("div",{style:{height:56,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 20px",background:S.surface,borderBottom:"1px solid "+S.line,position:"sticky",top:0,zIndex:600}},
          React.createElement("div",{style:{display:"flex",alignItems:"center",gap:10}},
            React.createElement("div",{style:{width:34,height:34,display:"flex",alignItems:"center",justifyContent:"center"}},React.createElement(SnLogo,{size:32})),
            React.createElement("span",{style:{fontFamily:"'Lora',serif",fontSize:18,fontWeight:700,color:S.title}},"SecretNote")
          ),
          React.createElement("button",{onClick:function(){setView("plans")},style:{fontFamily:"'Inter',sans-serif",fontSize:10,fontWeight:600,color:S.muted,background:S.surface2,padding:"4px 10px",borderRadius:100,border:"1px solid "+S.line,display:"flex",alignItems:"center",gap:4,cursor:"pointer"}},
            plan==="basic"?"📖":plan==="monthly"?"⭐":plan==="monthlyPlus"?"💫":"💎",
            " ",sn("plan"+plan.charAt(0).toUpperCase()+plan.slice(1))
          )
        ),

        /* Content */
        React.createElement("div",{style:{padding:"22px 20px 40px",animation:"fadeUp .25s ease"}},
          view === "notebook" && React.createElement(NotebookScreen,{
            secrets:secrets,
            notebooks:notebooks,
            activeNotebook:activeNotebook,
            trash:trash,
            onAdd:newPage,
            onOpenPage:openPage,
            onSearch:function(){setView("search")},
            onSettings:function(){setView("settings")},
            onSwitchNotebook:switchNotebook,
            onNewNotebook:function(){setShowNewNb(true)},
            onOpenTrash:function(){setView("trash")},
            onOpenNotebooks:function(){setView("notebooks")},
          }),
          view === "notebooks" && React.createElement(NotebooksScreen,{
            notebooks:notebooks,
            secrets:secrets,
            activeNotebookId:activeNotebookId,
            onBack:function(){setView("notebook")},
            onSelect:function(id){switchNotebook(id);setView("notebook");},
            onNewNotebook:function(){setShowNewNb(true)},
          }),
          view === "search" && React.createElement(SearchScreen,{
            secrets:secrets,
            notebooks:notebooks,
            onBack:function(){setView("notebook")},
            onOpenPage:openPage,
            onSwitchNotebook:switchNotebook,
          }),
          view === "settings" && React.createElement(SettingsScreen,{
            secrets:secrets,
            notebooks:notebooks,
            plan:plan,
            maxPages:maxPages,
            onBack:function(){setView("notebook")},
          }),
          view === "plans" && React.createElement(SubscriptionScreen,{
            plan:plan,
            onBack:function(){setView("notebook")},
            onSelectPlan:function(p){setPlan(p);showToast("⭐ "+sn("planUpdated"));setView("notebook");},
          }),
          view === "trash" && React.createElement(TrashScreen,{
            trash:trash,
            onBack:function(){setView("notebook")},
            onRestore:restorePage,
            onDestroyAll:destroyAllTrash,
          })
        )
      )
    ),

    /* New Notebook Sheet */
    showNewNb && React.createElement(NewNotebookSheet,{onClose:function(){setShowNewNb(false)},onCreate:createNotebook}),

    /* Page Limit Overlay */
    showPageLimit && React.createElement(PageLimitOverlay,{maxPages:maxPages,onClose:function(){setShowPageLimit(false)},onUpgrade:function(){setShowPageLimit(false);setView("plans")}}),

    /* Notebook Limit Overlay */
    showNbLimit && React.createElement(NotebookLimitOverlay,{maxNotebooks:maxNotebooks,onClose:function(){setShowNbLimit(false)},onUpgrade:function(){setShowNbLimit(false);setView("plans")}}),

    /* Toast */
    toast && React.createElement("div",{style:{position:"fixed",top:20,left:"50%",transform:"translateX(-50%)",background:S.white,color:S.bg,padding:"10px 22px",borderRadius:100,fontFamily:"'Inter',sans-serif",fontSize:13,fontWeight:600,zIndex:999,boxShadow:"0 4px 20px rgba(255,255,255,0.15)",animation:"fadeUp .25s ease"}},toast)
  );
}


// ── js/main.js ──────────────────────────────────────────────────
/* SecretNote — Entry Point */
ReactDOM.render(React.createElement(SecretNoteApp), document.getElementById("root"));
