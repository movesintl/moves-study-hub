import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Image, 
  FileText, 
  Video, 
  File, 
  Copy, 
  Check, 
  Search, 
  Folder,
  ExternalLink,
  Code
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  scanPublicDirectory, 
  getFilesByFolder, 
  getFolders, 
  searchFiles, 
  getPathFormats,
  isPreviewable,
  PublicFile 
} from '@/services/publicFiles';

interface PublicFileBrowserProps {
  onFileSelect?: (filePath: string) => void;
  showSelection?: boolean;
}

const PublicFileBrowser = ({ onFileSelect, showSelection = false }: PublicFileBrowserProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('all');
  const [copiedPath, setCopiedPath] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<string>('');
  const { toast } = useToast();

  const { data: publicFiles = [], isLoading } = useQuery({
    queryKey: ['public-files'],
    queryFn: scanPublicDirectory,
  });

  const getFileIcon = (file: PublicFile) => {
    const iconClass = "h-8 w-8";
    switch (file.type) {
      case 'image':
        return <Image className={`${iconClass} text-blue-500`} />;
      case 'video':
        return <Video className={`${iconClass} text-purple-500`} />;
      case 'document':
        return <FileText className={`${iconClass} text-green-500`} />;
      default:
        return <File className={`${iconClass} text-gray-500`} />;
    }
  };

  const copyPath = async (path: string, format: 'web' | 'absolute' | 'code' | 'import') => {
    try {
      const formats = getPathFormats(path);
      const pathToCopy = formats[format];
      
      await navigator.clipboard.writeText(pathToCopy);
      setCopiedPath(`${path}-${format}`);
      
      toast({
        title: "Success",
        description: `${format.charAt(0).toUpperCase() + format.slice(1)} path copied to clipboard`
      });
      
      setTimeout(() => setCopiedPath(null), 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy path to clipboard",
        variant: "destructive"
      });
    }
  };

  const handleFileSelect = (filePath: string) => {
    if (showSelection) {
      setSelectedFile(filePath);
      onFileSelect?.(filePath);
    }
  };

  const folders = getFolders(publicFiles);
  const folderFilteredFiles = getFilesByFolder(publicFiles, selectedFolder);
  const filteredFiles = searchFiles(folderFilteredFiles, searchTerm);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="aspect-square bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search and Filter */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search public files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedFolder} onValueChange={setSelectedFolder}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Folders</SelectItem>
            {folders.map((folder) => (
              <SelectItem key={folder} value={folder}>
                {folder === 'root' ? 'Root Directory' : folder}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Files Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredFiles.map((file) => (
          <Card 
            key={file.path} 
            className={`relative group cursor-pointer transition-all hover:shadow-md ${
              showSelection && selectedFile === file.path ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => handleFileSelect(file.path)}
          >
            <CardContent className="p-4">
              <div className="aspect-square flex items-center justify-center bg-gray-50 rounded mb-3">
                {isPreviewable(file.name) ? (
                  <img
                    src={file.path}
                    alt={file.name}
                    className="w-full h-full object-cover rounded"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                ) : null}
                <div className={isPreviewable(file.name) ? 'hidden' : ''}>
                  {getFileIcon(file)}
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium truncate" title={file.name}>
                  {file.name}
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {file.folder === 'root' ? 'Root' : file.folder}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {file.type}
                  </Badge>
                </div>
              </div>

              {/* Copy Actions */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Tabs defaultValue="web" className="w-48">
                  <TabsList className="grid w-full grid-cols-4 h-6">
                    <TabsTrigger value="web" className="text-xs p-1">Web</TabsTrigger>
                    <TabsTrigger value="absolute" className="text-xs p-1">URL</TabsTrigger>
                    <TabsTrigger value="code" className="text-xs p-1">Code</TabsTrigger>
                    <TabsTrigger value="import" className="text-xs p-1">Import</TabsTrigger>
                  </TabsList>
                  
                  {['web', 'absolute', 'code', 'import'].map((format) => (
                    <TabsContent key={format} value={format} className="mt-1">
                      <div className="bg-white border rounded p-2 shadow-lg">
                        <div className="flex items-center justify-between gap-2">
                          <code className="text-xs flex-1 truncate">
                            {getPathFormats(file.relativePath)[format as keyof ReturnType<typeof getPathFormats>]}
                          </code>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              copyPath(file.relativePath, format as any);
                            }}
                          >
                            {copiedPath === `${file.relativePath}-${format}` ? (
                              <Check className="h-3 w-3 text-green-600" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredFiles.length === 0 && (
        <div className="text-center py-12">
          <Folder className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No public files found.</p>
          <p className="text-sm text-gray-400 mt-2">
            Files in your public directory will appear here.
          </p>
        </div>
      )}
    </div>
  );
};

export default PublicFileBrowser;