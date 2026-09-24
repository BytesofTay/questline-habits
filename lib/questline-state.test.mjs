import test from "node:test";
import assert from "node:assert/strict";
import { addQuest, completeQuest, initialProgress, loadProgress, saveProgress, STORAGE_KEY } from "./questline-state.mjs";

function memoryStorage() {
  const values = new Map();
  return { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
}

test("creating a quest persists and reloads it after refresh", () => {
  const storage = memoryStorage();
  const created = addQuest(initialProgress, "Practice piano", 42);
  assert.equal(created.quests.at(-1).title, "Practice piano");
  assert.equal(saveProgress(storage, created), true);
  assert.deepEqual(loadProgress(storage), created);
});

test("completion awards coins and XP once and survives reload", () => {
  const storage = memoryStorage();
  const completed = completeQuest(initialProgress, 1);
  assert.equal(completed.coins, 1370);
  assert.equal(completed.xp, 83);
  assert.equal(completeQuest(completed, 1), completed);
  saveProgress(storage, completed);
  assert.deepEqual(loadProgress(storage), completed);
});

test("missing or malformed saved data falls back safely", () => {
  const storage = memoryStorage();
  assert.deepEqual(loadProgress(storage), initialProgress);
  storage.setItem(STORAGE_KEY, "not json");
  assert.deepEqual(loadProgress(storage), initialProgress);
});

test("storage failures do not crash progress recovery", () => {
  const brokenStorage = {
    getItem() { throw new Error("Storage unavailable"); },
    setItem() { throw new Error("Storage unavailable"); },
  };
  assert.deepEqual(loadProgress(brokenStorage), initialProgress);
  assert.deepEqual(loadProgress(undefined), initialProgress);
  assert.equal(saveProgress(brokenStorage, initialProgress), false);
  assert.equal(saveProgress(undefined, initialProgress), false);
});
