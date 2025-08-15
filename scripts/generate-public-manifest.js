#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// File type detection
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.bmp', '.ico'];
const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.ogg', '.avi', '.mov'];
const DOCUMENT_EXTENSIONS = ['.pdf', '.doc', '.docx', '.txt', '.md'];

const getFileType = (filename) => {
  const ext = path.extname(filename).toLowerCase();
  
  if (IMAGE_EXTENSIONS.includes(ext)) return 'image';
  if (VIDEO_EXTENSIONS.includes(ext)) return 'video';
  if (DOCUMENT_EXTENSIONS.includes(ext)) return 'document';
  return 'other';
};

const scanDirectory = (dirPath, relativePath = '') => {
  const files = [];
  
  try {
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const itemRelativePath = relativePath ? `${relativePath}/${item}` : item;
      const stats = fs.statSync(fullPath);
      
      if (stats.isDirectory()) {
        // Skip hidden directories and common build directories
        if (!item.startsWith('.') && !['node_modules', 'dist', 'build'].includes(item)) {
          // Recursively scan subdirectories
          files.push(...scanDirectory(fullPath, itemRelativePath));
        }
      } else {
        // Skip hidden files and the manifest file itself
        if (!item.startsWith('.') && item !== 'public-files-manifest.json') {
          const folder = relativePath || 'root';
          
          files.push({
            name: item,
            path: `/${itemRelativePath}`,
            relativePath: itemRelativePath,
            type: getFileType(item),
            size: stats.size,
            folder: folder,
            isDirectory: false,
            lastModified: stats.mtime.toISOString()
          });
        }
      }
    }
  } catch (error) {
    console.warn(`Warning: Could not scan directory ${dirPath}:`, error.message);
  }
  
  return files;
};

const generateManifest = () => {
  const publicDir = path.join(process.cwd(), 'public');
  
  if (!fs.existsSync(publicDir)) {
    console.warn('Public directory not found, creating empty manifest');
    return [];
  }
  
  console.log('Scanning public directory...');
  const files = scanDirectory(publicDir);
  
  console.log(`Found ${files.length} files in public directory`);
  
  // Write manifest to public directory
  const manifestPath = path.join(publicDir, 'public-files-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(files, null, 2));
  
  console.log(`Manifest written to ${manifestPath}`);
  
  return files;
};

// Run if called directly
if (require.main === module) {
  generateManifest();
}

module.exports = { generateManifest };