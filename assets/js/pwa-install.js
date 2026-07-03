// =====================================================
// PWA Installation Manager
// =====================================================

(() => {
    'use strict';
    let deferredPrompt = null;
    let platform = 'unknown';
    let browser = 'unknown';

    const INSTALL_STORAGE_KEY = 'pwaInstalledAt';
    const INSTALL_EXPIRATION_DAYS = 30;


    function detectPlatform() {
        const ua = navigator.userAgent;
        const isIPadOS =
            navigator.platform === 'MacIntel' &&
            navigator.maxTouchPoints > 1;
        if (/iPhone/i.test(ua)) {
            platform = 'iphone';
        }
        else if (/iPad/i.test(ua) || isIPadOS) {
            platform = 'ipad';
        }
        else if (/Android/i.test(ua)) {
            platform = 'android';
        }
        else if (/Windows/i.test(ua)) {
            platform = 'windows';
        }
        else if (/Mac/i.test(ua)) {
            platform = 'macos';
        }
        if (/Edg/i.test(ua)) {
            browser = 'edge';
        }
        else if (/CriOS/i.test(ua)) {
            browser = 'chrome-ios';
        }
        else if (/Chrome/i.test(ua)) {
            browser = 'chrome';
        }
        else if (/Safari/i.test(ua)) {
            browser = 'safari';
        }
        else if (/Firefox/i.test(ua)) {
            browser = 'firefox';
        }
    }

    function installWithPrompt() {
        if (!deferredPrompt) {
            console.log("Install prompt is not available.");
            return;
        }
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(() => {
            deferredPrompt = null;
            updateButton();
        });
    }

    const installButton = () =>
        document.getElementById('installAppButton');

    function isInstalled() {
        return (
            window.matchMedia('(display-mode: standalone)').matches ||
            window.navigator.standalone === true
        );
    }

    function wasRecentlyInstalled() {
        const value = localStorage.getItem(INSTALL_STORAGE_KEY);
        if (!value) {
            return false;
        }
        const installedAt = new Date(value);
        const now = new Date();
        const days =
            (now.getTime() - installedAt.getTime()) /
            (1000 * 60 * 60 * 24);
        if (days >= INSTALL_EXPIRATION_DAYS) {
            localStorage.removeItem(INSTALL_STORAGE_KEY);
            return false;
        }
        return true;
    }

    function updateButton() {
        const button = installButton();
        if (!button) {
            return;
        }
        const installed =
            isInstalled() ||
            wasRecentlyInstalled();
        console.log({
            installed,
            deferredPrompt,
            platform,
            browser
        });
        if (installed) {
            button.style.display = 'none';
            return;
        }
        if (
            deferredPrompt ||
            platform === 'iphone' ||
            platform === 'ipad' ||
            platform === 'macos'
        ) {
            button.style.display = '';
            return;
        }
        button.style.display = 'none';
    }

    window.addEventListener('beforeinstallprompt', (event) => {
        console.log('[PWA] beforeinstallprompt fired');
        event.preventDefault();
        deferredPrompt = event;
        updateButton();
    });

    window.addEventListener('appinstalled', () => {
        console.log('[PWA] appinstalled');
        deferredPrompt = null;
        localStorage.setItem(
            INSTALL_STORAGE_KEY,
            new Date().toISOString()
        );
        updateButton();
    });

    window.PWAInstall = {
        init() {
            detectPlatform();
            console.log('Platform:', platform);
            console.log('Browser :', browser);
            console.log('Standalone:', window.matchMedia('(display-mode: standalone)').matches);
            updateButton();
        },
        install() {
            switch (platform) {
                case 'android':
                case 'windows':
                    installWithPrompt();
                    break;
                case 'iphone':
                case 'ipad':
                    console.log('TODO: Show iOS installation guide.');
                    break;
                case 'macos':
                    if (browser === 'chrome' || browser === 'edge') {
                        installWithPrompt();
                    }
                    else {
                        console.log('TODO: Show macOS installation guide.');
                    }
                    break;
                default:
                    console.log('Installation is not supported on this platform.');
                    break;
            }
        }
    };

    document.addEventListener('DOMContentLoaded', () => {
        window.PWAInstall.init();
    });

})();