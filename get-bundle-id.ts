#!/usr/bin/env tsx

import * as fs from 'fs';
import * as path from 'path';
import * as plist from 'plist';

/**
 * Extract bundle identifier from a macOS .app bundle
 * Usage: tsx get-bundle-id.ts /Applications/SomeApp.app
 */

function getBundleIdentifier(appPath: string): string | null {
  try {
    // Normalize the path and ensure it ends with .app
    const normalizedPath = path.resolve(appPath);
    
    if (!normalizedPath.endsWith('.app')) {
      throw new Error('Path must point to a .app bundle');
    }
    
    if (!fs.existsSync(normalizedPath)) {
      throw new Error(`App bundle not found: ${normalizedPath}`);
    }
    
    const infoPlistPath = path.join(normalizedPath, 'Contents', 'Info.plist');
    
    if (!fs.existsSync(infoPlistPath)) {
      throw new Error(`Info.plist not found in: ${infoPlistPath}`);
    }
    
    // Read and parse the plist file
    const plistContent = fs.readFileSync(infoPlistPath, 'utf8');
    const parsed = plist.parse(plistContent) as Record<string, any>;
    
    const bundleId = parsed.CFBundleIdentifier;
    
    if (!bundleId || typeof bundleId !== 'string') {
      throw new Error('CFBundleIdentifier not found or invalid in Info.plist');
    }
    
    return bundleId;
    
  } catch (error) {
    console.error(`Error: ${error instanceof Error ? error.message : error}`);
    return null;
  }
}

function printUsage() {
  console.log('Usage:');
  console.log('  tsx get-bundle-id.ts /Applications/SomeApp.app');
  console.log('  tsx get-bundle-id.ts "/Applications/Visual Studio Code.app"');
  console.log('');
  console.log('Examples:');
  console.log('  tsx get-bundle-id.ts /Applications/Safari.app');
  console.log('  tsx get-bundle-id.ts /System/Applications/TextEdit.app');
}

function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.error('Error: No app path provided\n');
    printUsage();
    process.exit(1);
  }
  
  if (args[0] === '--help' || args[0] === '-h') {
    printUsage();
    process.exit(0);
  }
  
  const appPath = args[0];
  const bundleId = getBundleIdentifier(appPath);
  
  if (bundleId) {
    console.log(bundleId);
  } else {
    process.exit(1);
  }
}

// If this script is run directly (not imported)
if (require.main === module) {
  main();
}

export { getBundleIdentifier };