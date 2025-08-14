// Service for scanning and managing public directory files

export interface PublicFile {
  name: string;
  path: string;
  relativePath: string;
  type: 'image' | 'document' | 'video' | 'other';
  size?: number;
  folder: string;
  isDirectory: boolean;
}

export interface PublicDirectory {
  name: string;
  path: string;
  files: PublicFile[];
  subdirectories: PublicDirectory[];
}

// Common image extensions
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.bmp', '.ico'];
const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.ogg', '.avi', '.mov'];
const DOCUMENT_EXTENSIONS = ['.pdf', '.doc', '.docx', '.txt', '.md'];

// Get file type based on extension
export const getFileType = (filename: string): PublicFile['type'] => {
  const ext = filename.toLowerCase().substring(filename.lastIndexOf('.'));
  
  if (IMAGE_EXTENSIONS.includes(ext)) return 'image';
  if (VIDEO_EXTENSIONS.includes(ext)) return 'video';
  if (DOCUMENT_EXTENSIONS.includes(ext)) return 'document';
  return 'other';
};

// Check if file is previewable (image or SVG)
export const isPreviewable = (filename: string): boolean => {
  const ext = filename.toLowerCase().substring(filename.lastIndexOf('.'));
  return IMAGE_EXTENSIONS.includes(ext);
};

// Get file URL for public files
export const getPublicFileUrl = (relativePath: string): string => {
  // Remove leading slash if present
  const cleanPath = relativePath.startsWith('/') ? relativePath.substring(1) : relativePath;
  return `/${cleanPath}`;
};

// Get different path formats for copying
export const getPathFormats = (relativePath: string) => {
  const webPath = getPublicFileUrl(relativePath);
  const absolutePath = `${window.location.origin}${webPath}`;
  const codePath = `./public/${relativePath}`;
  
  return {
    web: webPath,
    absolute: absolutePath,
    code: codePath,
    import: relativePath.startsWith('assets/') ? `@/${relativePath}` : webPath
  };
};

// Mock implementation for scanning public directory
// In a real scenario, this would be handled by the build system or server
export const scanPublicDirectory = async (): Promise<PublicFile[]> => {
  // This is a mock implementation since we can't actually scan the file system
  // In practice, you would generate this list during build time or have a server endpoint
  
  // Common public files that might exist in a typical project
  const mockFiles: PublicFile[] = [
    {
      name: 'favicon.ico',
      path: '/favicon.ico',
      relativePath: 'favicon.ico',
      type: 'image',
      folder: 'root',
      isDirectory: false
    },
    {
      name: 'placeholder.svg',
      path: '/placeholder.svg',
      relativePath: 'placeholder.svg',
      type: 'image',
      folder: 'root',
      isDirectory: false
    }
  ];

  // Add common asset folders that might exist
  const assetFolders = ['images', 'icons', 'documents', 'videos'];
  
  assetFolders.forEach(folder => {
    // Add some mock files for each folder
    const folderFiles = [
      `${folder}/sample1.jpg`,
      `${folder}/sample2.png`,
      `${folder}/sample3.svg`
    ].map(filePath => ({
      name: filePath.split('/').pop() || '',
      path: `/${filePath}`,
      relativePath: filePath,
      type: getFileType(filePath),
      folder,
      isDirectory: false
    }));
    
    mockFiles.push(...folderFiles);
  });

  return mockFiles;
};

// Get files by folder
export const getFilesByFolder = (files: PublicFile[], folder: string): PublicFile[] => {
  if (folder === 'all') return files;
  return files.filter(file => file.folder === folder);
};

// Get unique folders from files
export const getFolders = (files: PublicFile[]): string[] => {
  const folders = new Set(files.map(file => file.folder));
  return Array.from(folders).sort();
};

// Search files by name
export const searchFiles = (files: PublicFile[], searchTerm: string): PublicFile[] => {
  if (!searchTerm) return files;
  return files.filter(file => 
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};