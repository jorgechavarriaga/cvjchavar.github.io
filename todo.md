# TODO

feature/v1.0.13-keyboard-shortcuts ✅

- Keyboard shortcuts
- Enter = Next / Finish
- 1-4 = Select answer
- Esc = Close dialogs
- Left / Right = Back / Next

feature/v1.0.14-ui-polish ✅

- Replace remaining emojis with Font Awesome icons
- UI spacing and alignment review
- Responsive polish
- CSS / JS cleanup

feature/v1.0.15-ui-text-settings ✅

- Move remaining Settings hardcoded texts to ui-text.js
- Complete EN / FR translations
- Remove remaining hardcoded UI strings

feature/v1.0.16-misc-iImprovements ✅

• GitHub Profile link
• Exit Quiz
• Confirm Exit Quiz
• Confirm browser refresh/close during active quiz
• Weak Areas Practice Mode improvements
• Official Discover Canada link
• Replace browser confirm/alert dialogs with app modals

feature/v1.0.17-premium ✅

- Demo question bank (20 EN / 20 FR)
- Premium screen
- Get Premium
- WhatsApp contact
- Premium status (Demo / EN / FR / Bundle)
- Home question bank status
- Premium UI

feature/v1.0.18-license-api ✅ (canadian-citizenship-license-api)

- FastAPI project
- SQLite database
- License data model
- Device registration
- License activation endpoint
- License validation endpoint
- Question bank download endpoint
- Admin panel
- API authentication


feature/v1.0.19-license-client

- Device ID generation
- License request flow
   - Contact Me
   - Buy English
   - Buy French
   - Buy Bundle
   - POST /license/request
   - WhatsApp with request_id
- License activation
   - POST /license/sync
- Download manifest
   - GET /license/download
- Download licensed question bank
   - GET /license/download/{filename}
- Offline cache
   - Store downloaded question banks
- License persistence
   - Store license metadata locally
- Premium status synchronization
- Demo → Licensed transition
- Load local question bank instead of assets

feature/v1.0.20-secure-question-bank

1. Encrypt licensed question banks (AES-GCM)
2. Replace .json downloads with .dat files
3. Decrypt question bank in memory only
4. Store encrypted question banks locally
5. Device-based encryption key
6. Preserve current licensing flow
7. Preserve current Demo mode
8. Graceful decryption error handling
9. Protect against casual inspection and copy
10. Backward compatibility for existing licensed users