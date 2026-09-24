export type Quest = { id: number; icon: string; title: string; detail: string; reward: number; color: string; complete: boolean };
export type Progress = { quests: Quest[]; coins: number; xp: number };
export const STORAGE_KEY: string;
export const initialProgress: Progress;
export function normalizeProgress(value: unknown): Progress;
export function loadProgress(storage?: Pick<Storage, "getItem">): Progress;
export function saveProgress(storage: Pick<Storage, "setItem"> | undefined, progress: Progress): boolean;
export function addQuest(progress: Progress, title: string, id?: number): Progress;
export function completeQuest(progress: Progress, id: number): Progress;
