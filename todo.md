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


eature/v1.0.19-license-client

1. Device ID generation
2. License request flow

   - Contact Me
   - Buy English
   - Buy French
   - Buy Bundle
   - POST /license/request
   - WhatsApp with request_id
3. License activation

   - POST /license/sync
4. Download manifest

   - GET /license/download
5. Download licensed question bank

   - GET /license/download/{filename}
6. Offline cache

   - Store downloaded question banks
7. License persistence

   - Store license metadata locally
8. Premium status synchronization
9. Demo → Licensed transition
10. Load local question bank instead of assets
