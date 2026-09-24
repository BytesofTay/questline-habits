export const STORAGE_KEY = "questline.progress.v1";

export const initialProgress = {
  quests: [
    { id: 1, icon: "🏃", title: "Move for 30 minutes", detail: "Fitness · Epic", reward: 90, color: "#33d6ff", complete: false },
    { id: 2, icon: "📚", title: "Read 20 pages", detail: "Learning · Rare", reward: 60, color: "#a783ff", complete: false },
    { id: 3, icon: "💧", title: "Drink 8 glasses", detail: "Wellness · Common", reward: 35, color: "#b9ff46", complete: true },
  ],
  coins: 1280,
  xp: 68,
};

export function normalizeProgress(value) {
  if (!value || typeof value !== "object" || !Array.isArray(value.quests)) return structuredClone(initialProgress);
  const validQuests = value.quests.every((quest) => quest && Number.isSafeInteger(quest.id) && typeof quest.icon === "string" && typeof quest.title === "string" && typeof quest.detail === "string" && typeof quest.color === "string" && typeof quest.complete === "boolean" && Number.isFinite(quest.reward) && quest.reward >= 0);
  const uniqueIds = new Set(value.quests.map((quest) => quest?.id)).size === value.quests.length;
  if (!validQuests || !uniqueIds || !Number.isFinite(value.coins) || value.coins < 0 || !Number.isFinite(value.xp)) return structuredClone(initialProgress);
  return { quests: value.quests, coins: Math.floor(value.coins), xp: Math.max(0, Math.min(100, Math.floor(value.xp))) };
}

export function loadProgress(storage) {
  try {
    const raw = storage?.getItem(STORAGE_KEY);
    return raw ? normalizeProgress(JSON.parse(raw)) : structuredClone(initialProgress);
  } catch {
    return structuredClone(initialProgress);
  }
}

export function saveProgress(storage, progress) {
  try {
    if (!storage) return false;
    storage.setItem(STORAGE_KEY, JSON.stringify(normalizeProgress(progress)));
    return true;
  } catch {
    return false;
  }
}

export function addQuest(progress, title, id = Date.now()) {
  const cleanTitle = title.trim();
  if (cleanTitle.length < 2 || cleanTitle.length > 80) return progress;
  while (progress.quests.some((quest) => quest.id === id)) id += 1;
  return { ...progress, quests: [...progress.quests, { id, icon: "⚡", title: cleanTitle, detail: "Custom · Common", reward: 40, color: "#ffca3a", complete: false }] };
}

export function completeQuest(progress, id) {
  const quest = progress.quests.find((item) => item.id === id);
  if (!quest || quest.complete) return progress;
  return {
    quests: progress.quests.map((item) => item.id === id ? { ...item, complete: true } : item),
    coins: progress.coins + quest.reward,
    xp: Math.min(100, progress.xp + Math.round(quest.reward / 6)),
  };
}
