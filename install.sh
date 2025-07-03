#!/bin/bash

# Karabiner Vim Mode Plus Installation Script
# This script installs the local vim_mode_plus.json to Karabiner Elements

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [[ ! -f "vim_mode_plus.json" ]]; then
    print_error "vim_mode_plus.json not found in current directory"
    print_error "Please run this script from the karabiner-vim-mode-plus project root"
    exit 1
fi

# Check if Karabiner Elements is installed
KARABINER_DIR="$HOME/.config/karabiner"
ASSETS_DIR="$KARABINER_DIR/assets/complex_modifications"

if [[ ! -d "$KARABINER_DIR" ]]; then
    print_error "Karabiner Elements configuration directory not found"
    print_error "Please install Karabiner Elements first: https://karabiner-elements.pqrs.org/"
    exit 1
fi

# Create assets directory if it doesn't exist
if [[ ! -d "$ASSETS_DIR" ]]; then
    print_status "Creating Karabiner assets directory..."
    mkdir -p "$ASSETS_DIR"
fi

# Build the latest JSON if needed
if [[ -f "build.ts" && -f "package.json" ]]; then
    print_status "Building latest configuration..."
    if command -v pnpm &> /dev/null; then
        pnpm run build
    elif command -v npm &> /dev/null; then
        npm run build
    else
        print_warning "Neither pnpm nor npm found. Using existing JSON file."
    fi
fi

# Remove old Vim Mode Plus rules from Karabiner
print_status "Checking for existing Vim Mode Plus rules..."
KARABINER_CONFIG="$KARABINER_DIR/karabiner.json"

if [[ -f "$KARABINER_CONFIG" ]]; then
    # Create backup of karabiner.json
    KARABINER_BACKUP="$KARABINER_DIR/karabiner_backup_$(date +%Y%m%d_%H%M%S).json"
    print_status "Backing up Karabiner configuration..."
    cp "$KARABINER_CONFIG" "$KARABINER_BACKUP"
    
    # Remove Vim Mode Plus rules using jq
    if command -v jq &> /dev/null; then
        print_status "Removing old Vim Mode Plus rules..."
        temp_file=$(mktemp)
        jq '
            .profiles[].complex_modifications.rules = [
                .profiles[].complex_modifications.rules[]? | 
                select(.description | test("^\\(Vim [0-9]+/[0-9]+\\)"; "i") | not)
            ]
        ' "$KARABINER_CONFIG" > "$temp_file" && mv "$temp_file" "$KARABINER_CONFIG"
        print_success "Removed old Vim Mode Plus rules"
    else
        print_warning "jq not found - you'll need to manually remove old Vim Mode Plus rules"
    fi
fi

# Backup existing installation if it exists
BACKUP_FILE="$ASSETS_DIR/vim_mode_plus_backup_$(date +%Y%m%d_%H%M%S).json"
if [[ -f "$ASSETS_DIR/vim_mode_plus.json" ]]; then
    print_status "Backing up existing configuration file to: $(basename "$BACKUP_FILE")"
    cp "$ASSETS_DIR/vim_mode_plus.json" "$BACKUP_FILE"
fi

# Copy the new configuration
print_status "Installing Vim Mode Plus configuration..."
cp "vim_mode_plus.json" "$ASSETS_DIR/vim_mode_plus.json"

# Verify installation
if [[ -f "$ASSETS_DIR/vim_mode_plus.json" ]]; then
    print_success "Installation completed successfully!"
    echo
    print_status "Next steps:"
    echo "1. Open Karabiner Elements Settings"
    echo "2. Go to 'Complex modifications' tab"
    echo "3. Click 'Add rule'"
    echo "4. Find 'Vim Mode Plus' in the list"
    echo "5. Add all rules IN ORDER (this is important!)"
    echo
    print_warning "Remember to remove any old Vim Mode Plus rules first"
    print_warning "The order of rules matters - add them in sequence"
else
    print_error "Installation failed - file not copied correctly"
    exit 1
fi