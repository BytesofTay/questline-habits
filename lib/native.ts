import { Capacitor } from "@capacitor/core";
import { Haptics, ImpactStyle, NotificationType } from "@capacitor/haptics";
import { LocalNotifications } from "@capacitor/local-notifications";

export function isNativeApp() {
  return Capacitor.isNativePlatform();
}

export async function questCompleteFeedback() {
  if (!isNativeApp()) return;
  await Haptics.notification({ type: NotificationType.Success });
}

export async function battleStrikeFeedback() {
  if (!isNativeApp()) return;
  await Haptics.impact({ style: ImpactStyle.Heavy });
}

export async function scheduleDailyQuestReminder(hour = 20, minute = 0) {
  if (!isNativeApp()) return { status: "unavailable" as const };

  let permission = await LocalNotifications.checkPermissions();
  if (permission.display !== "granted") permission = await LocalNotifications.requestPermissions();
  if (permission.display !== "granted") return { status: "denied" as const };

  await LocalNotifications.cancel({ notifications: [{ id: 4101 }] });
  await LocalNotifications.schedule({
    notifications: [{
      id: 4101,
      title: "Your Questline run is ready",
      body: "Complete today’s quests to charge your champion and protect your streak.",
      schedule: { on: { hour, minute }, repeats: true },
      sound: "default.wav",
      extra: { destination: "quests" },
    }],
  });
  return { status: "scheduled" as const };
}
