"use client";

import { useEffect } from "react";
import { Capacitor } from "@capacitor/core";
import { SplashScreen } from "@capacitor/splash-screen";
import { StatusBar, Style } from "@capacitor/status-bar";

export function NativeRuntime() {
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;
    void StatusBar.setStyle({ style: Style.Light });
    void SplashScreen.hide();
    document.documentElement.dataset.native = "ios";
  }, []);

  return null;
}
