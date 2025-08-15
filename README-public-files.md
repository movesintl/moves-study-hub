# Public Files Integration

This project includes a public files browser that shows real files from your public directory.

## How it works

1. The `scripts/generate-public-manifest.js` script scans your public directory
2. It generates a `public/public-files-manifest.json` file with all file metadata
3. The React app fetches this manifest to display real files in the Media Library

## Manual Usage

Since package.json scripts cannot be modified in this environment, you can manually generate the manifest:

```bash
node scripts/generate-public-manifest.js
```

## Adding to your build process

To integrate this into your build process, add these scripts to your package.json:

```json
{
  "scripts": {
    "dev": "node scripts/generate-public-manifest.js && vite",
    "build": "node scripts/generate-public-manifest.js && vite build",
    "generate-manifest": "node scripts/generate-public-manifest.js"
  }
}
```

## File Structure

- `scripts/generate-public-manifest.js` - Scans public directory and generates manifest
- `public/public-files-manifest.json` - Generated manifest file (auto-created)
- `src/services/publicFiles.ts` - Service that fetches and uses the manifest

The manifest will automatically include all files in your public directory, organized by folder structure, with proper file type detection and metadata.