import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.bytesoftay.questline",
  appName: "Questline",
  webDir: "out",
  backgroundColor: "#071b36",
  ios: {
    backgroundColor: "#071b36",
    contentInset: "always",
    preferredContentMode: "mobile",
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: true,
      launchShowDuration: 1200,
      backgroundColor: "#071b36",
      showSpinner: false,
    },
    StatusBar: {
      overlaysWebView: true,
      style: "LIGHT",
    },
  },
};

export default config;
