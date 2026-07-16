const APP_VERSION = "1.0.4";

if (typeof window !== "undefined") {
    window.APP_VERSION = APP_VERSION;
}

if (typeof self !== "undefined") {
    self.APP_VERSION = APP_VERSION;
}