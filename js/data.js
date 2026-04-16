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
