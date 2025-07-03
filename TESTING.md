# Testing Checklist for Karabiner Vim Mode Plus

## Pre-Testing Setup

1. **Remove existing configuration** (if any):
   - Open Karabiner Elements
   - Go to "Complex modifications" tab
   - Remove all existing "Vim Mode Plus" rules in order

2. **Import new configuration**:
   - Use the import URL: `karabiner://karabiner/assets/complex_modifications/import?url=https://git.sr.ht/~harmtemolder/karabiner-vim-mode-plus/blob/master/vim_mode_plus.json`
   - Or manually import the `vim_mode_plus.json` file
   - Add all rules **in order** (this is critical!)

## New Features to Test

### ✅ 'w' Motion Command
- [ ] Press `caps lock` to enter vim mode
- [ ] Press `w` - cursor should move to start of next word
- [ ] Test with multiple words on a line
- [ ] Compare with `e` - `w` goes to word start, `e` goes to word end

### ✅ 'dw' Delete Operation  
- [ ] Press `caps lock` to enter vim mode
- [ ] Position cursor at start of a word
- [ ] Press `d`, then `w` - should delete from cursor to start of next word
- [ ] Verify deleted text is in clipboard (test with paste)

### ✅ 'cw' Change Operation
- [ ] Press `caps lock` to enter vim mode  
- [ ] Position cursor at start of a word
- [ ] Press `c`, then `w` - should delete text and exit to INSERT mode
- [ ] Should show "-- INSERT --" notification
- [ ] Type replacement text to verify INSERT mode

### ✅ 'yw' Yank Operation
- [ ] Press `caps lock` to enter vim mode
- [ ] Position cursor at start of a word  
- [ ] Press `y`, then `w` - should copy from cursor to start of next word
- [ ] Move cursor elsewhere and press `p` to paste
- [ ] Verify correct text was copied

### ✅ 'w' in Visual Mode
- [ ] Press `caps lock` to enter vim mode
- [ ] Press `v` to enter visual mode (should show "-- VISUAL --" notification)
- [ ] Press `w` - should extend selection to start of next word
- [ ] Compare with `e` selection behavior

### ✅ 'C' Shortcut (Change to End of Line)
- [ ] Press `caps lock` to enter vim mode
- [ ] Position cursor in middle of a line with text after it
- [ ] Press `C` (shift+c) - should delete from cursor to end of line and enter INSERT mode
- [ ] Should show "-- INSERT --" notification
- [ ] Compare behavior with `c$` (should be identical)

### ✅ 'D' Shortcut (Delete to End of Line)  
- [ ] Press `caps lock` to enter vim mode
- [ ] Position cursor in middle of a line with text after it
- [ ] Press `D` (shift+d) - should delete from cursor to end of line
- [ ] Should remain in NORMAL mode (not INSERT)
- [ ] Compare behavior with `d$` (should be identical)

## Regression Testing

Test existing functionality still works:

### Basic Navigation
- [ ] `h`, `j`, `k`, `l` movement
- [ ] `e` (end of word), `b` (beginning of word)  
- [ ] `0` (start of line), `^` (first non-whitespace), `$` (end of line)
- [ ] `gg` (start of document), `G` (end of document)

### Mode Switching
- [ ] `caps lock` enters/exits vim mode
- [ ] `escape` exits vim mode
- [ ] `ctrl+[` exits vim mode
- [ ] `i`, `a`, `o`, `A`, `I`, `O` exit to INSERT mode correctly

### Existing Operations
- [ ] `dd`, `de`, `db` delete operations
- [ ] `yy`, `ye`, `yb` yank operations  
- [ ] `cc`, `ce`, `cb` change operations
- [ ] `x`, `X` delete forward/backward
- [ ] `p`, `P` paste operations
- [ ] `u` undo, `ctrl+r` redo

### Visual Mode
- [ ] `v` enters/exits visual mode
- [ ] All navigation keys work in visual mode
- [ ] `d`, `y`, `c`, `x` operations work on selections

## Application Exclusions

Verify vim mode is disabled in these apps (should pass through normally):
- [ ] iTerm2 (`com.googlecode.iterm2`)
- [ ] Atom (`com.github.atom`) 
- [ ] PyCharm (`com.jetbrains.pycharm`)
- [ ] VSCodium (`com.visualstudio.code.oss`)

## Edge Cases

- [ ] Vim mode with trackpad touches (should disable)
- [ ] Mouse clicks while in vim mode (should exit)
- [ ] Rapid key combinations
- [ ] Multi-line text operations
- [ ] Empty lines and end-of-document behavior

## Performance

- [ ] No noticeable delay in vim mode activation
- [ ] Smooth operation with long documents
- [ ] No conflicts with other Karabiner modifications

---

## Validation Commands

```bash
# Validate JSON structure
pnpm run test

# Rebuild if needed  
pnpm run build
```

## Troubleshooting

If any tests fail:
1. Check Karabiner Elements logs in Console.app
2. Verify rule order is correct (remove and re-add in sequence)
3. Restart Karabiner Elements if needed
4. Test in simple text editor first (TextEdit, Notes)