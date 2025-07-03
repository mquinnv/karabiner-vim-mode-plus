#!/usr/bin/env tsx

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

interface BuildOptions {
  watch?: boolean;
}

function convertYmlToJson(ymlPath: string): void {
  try {
    // Read the YAML file
    const ymlContent = fs.readFileSync(ymlPath, 'utf8');
    
    // Parse YAML to JavaScript object
    const yamlData = yaml.load(ymlContent);
    
    // Generate JSON file path
    const jsonPath = path.join(
      path.dirname(ymlPath), 
      path.basename(ymlPath, '.yml') + '.json'
    );
    
    // Write JSON file with proper formatting
    fs.writeFileSync(jsonPath, JSON.stringify(yamlData, null, 2), 'utf8');
    
    const timestamp = new Date().toLocaleTimeString();
    console.log(`[${timestamp}] ✓ Converted ${path.basename(ymlPath)} → ${path.basename(jsonPath)}`);
  } catch (error) {
    console.error(`✗ Error converting ${ymlPath}:`, error);
    process.exit(1);
  }
}

function findYamlFiles(directory: string): string[] {
  const files = fs.readdirSync(directory);
  return files
    .filter(file => file.endsWith('.yml') || file.endsWith('.yaml'))
    .map(file => path.join(directory, file));
}

function buildAll(directory: string = process.cwd()): void {
  const yamlFiles = findYamlFiles(directory);
  
  if (yamlFiles.length === 0) {
    console.log('No YAML files found to convert.');
    return;
  }
  
  console.log(`Found ${yamlFiles.length} YAML file(s) to convert:`);
  yamlFiles.forEach(file => {
    console.log(`  - ${path.basename(file)}`);
  });
  console.log('');
  
  yamlFiles.forEach(convertYmlToJson);
  
  console.log('\\n🎉 Build complete!');
}

function watchFiles(directory: string = process.cwd()): void {
  console.log('👀 Watching for changes...');
  
  // Initial build
  buildAll(directory);
  
  // Watch for changes
  fs.watch(directory, { recursive: false }, (eventType, filename) => {
    if (filename && (filename.endsWith('.yml') || filename.endsWith('.yaml'))) {
      if (eventType === 'change') {
        console.log(`\\n📝 File changed: ${filename}`);
        const filePath = path.join(directory, filename);
        if (fs.existsSync(filePath)) {
          convertYmlToJson(filePath);
        }
      }
    }
  });
  
  console.log('\\nPress Ctrl+C to stop watching...\\n');
}

function main(): void {
  const args = process.argv.slice(2);
  const options: BuildOptions = {
    watch: args.includes('--watch') || args.includes('-w')
  };
  
  const directory = process.cwd();
  
  if (options.watch) {
    watchFiles(directory);
  } else {
    buildAll(directory);
  }
}

if (require.main === module) {
  main();
}