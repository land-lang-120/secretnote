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
