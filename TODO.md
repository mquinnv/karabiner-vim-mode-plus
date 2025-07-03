# Project TODOs

## 🔥 Critical (High Priority)
- [ ] Follow TESTING.md checklist to validate all new commands work in Karabiner Elements

## 📋 Current Sprint/Phase
- [ ] Consider adding more Vim motions (f, t, F, T for find/till)
- [ ] Document build system migration in README

## 🚀 Future Enhancements
- [ ] Add support for numeric prefixes (e.g., 3w, 5j)
- [ ] Implement more Vim operators (r for replace, s for substitute)
- [ ] Add support for text objects (iw, aw, i", a", etc.)
- [ ] Consider implementing registers for more advanced yank/paste

## ✅ Recently Completed
- [x] Add 'w' motion command (move to start of next word) alongside existing 'e' command
- [x] Add 'dw' delete operation (delete to start of next word)
- [x] Add 'cw' change operation (change to start of next word)
- [x] Add 'yw' yank operation (yank to start of next word)
- [x] Add 'w' motion in visual mode for selection
- [x] Add 'C' command as shortcut for 'c$' (change to end of line)
- [x] Add 'D' command as shortcut for 'd$' (delete to end of line)
- [x] Replace Python yml-to-json.py with TypeScript build system
- [x] Create package.json with pnpm, TypeScript, and tsx dependencies
- [x] Add .gitignore for proper file management
- [x] Regenerate JSON configuration with all new features
- [x] Update README.md to document new commands and build system
- [x] Create comprehensive TESTING.md checklist
- [x] Add JSON validation scripts to package.json

## 📊 Project Status
**Current Focus**: All requested Vim enhancements implemented and documented  
**Build System**: Migrated from Python to TypeScript with pnpm and validation scripts  
**Testing Status**: TESTING.md checklist created, awaiting real-world validation  
**Documentation**: Updated with all new commands and build instructions  

---
*Last updated: 2025-01-03*