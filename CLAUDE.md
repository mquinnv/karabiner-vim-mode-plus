# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Karabiner Elements complex modification that implements Vim-style navigation and editing across macOS. The project creates a system-wide Vim mode that can be activated with caps lock, providing familiar hjkl navigation and other Vim commands in any application.

## Key Architecture

- **Source Configuration**: `vim_mode_plus.yml` - The main configuration file written in YAML for readability and maintainability
- **Generated Configuration**: `vim_mode_plus.json` - The actual Karabiner Elements configuration file generated from the YAML
- **Build Tool**: `yml-to-json.py` - Python script that converts YAML to JSON format required by Karabiner

## Development Workflow

### Building the Configuration
```bash
# Convert YAML to JSON (required after making changes)
python3 yml-to-json.py
```

### Testing Changes
After rebuilding:
1. Remove all parts of this mod in Karabiner's "Complex modifications" tab
2. Re-add all parts in the correct order (the order is important)
3. Test the vim mode functionality

## Configuration Structure

The YAML file contains 11 main rule groups that handle:
1. Mode activation/deactivation (caps lock, escape, etc.)
2. Basic navigation (hjkl, word movement, line movement)
3. Delete operations (d + navigation keys)
4. Yank operations (y + navigation keys)  
5. Change operations (c + navigation keys)
6. Insert mode transitions (i, a, o, etc.)
7. Visual mode functionality
8. Undo/redo operations
9. Paste operations
10. Special key mappings (F18, F19, F20 for Hammerspoon integration)
11. Application-specific exceptions

## Key Implementation Details

- Uses Karabiner's variable system to track vim_mode state
- Excludes certain applications (iTerm2, Atom, PyCharm, VSCode) that have their own Vim modes
- Provides visual feedback through macOS notifications
- Supports both tap and hold behaviors for caps lock
- Integrates with Hammerspoon for additional modal functionality

## Development Notes

- Always edit the YAML file, never the JSON directly
- The 2485-line YAML file generates the complete Karabiner configuration
- Order of rules in Karabiner matters - they must be added in sequence
- Complex modifications use Karabiner's `manipulators` with conditions and variables