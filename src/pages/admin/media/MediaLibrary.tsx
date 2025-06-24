import React, { useState } from 'react';
import { Upload, Search, Folder, Image, FileText, Video, Trash2, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const MediaLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('all');
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const { data: mediaFiles = [], isLoading, refetch } = useQuery({
    queryKey: ['media-files'],
    queryFn: async () => {
      console.log('Fetching media files...');
      const { data, error } = await supabase
        .from('media_files')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching media files:', error);
        throw error;
      }
      console.log('Media files fetched:', data);
      return data;
    }
  });

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      console.log('Starting file upload...');
      
      // Check authentication
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        throw new Error('User not authenticated');
      }
      console.log('User authenticated:', user.id);

      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const folder = selectedFolder === 'all' ? 'general' : selectedFolder;
      const filePath = `${folder}/${fileName}`;

      console.log('Uploading to path:', filePath);
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      console.log('Upload successful:', uploadData);

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      console.log('Public URL:', publicUrl);

      // Save file info to database
      const { error: dbError } = await supabase
        .from('media_files')
        .insert({
          filename: file.name,
          file_url: publicUrl,
          file_type: file.type.startsWith('image/') ? 'image' : 
                    file.type.startsWith('video/') ? 'video' : 'document',
          file_size: file.size,
          folder: folder,
          uploaded_by: user.email || 'unknown'
        });

      if (dbError) {
        console.error('Database error:', dbError);
        throw dbError;
      }

      toast({
        title: "Success",
        description: "File uploaded successfully"
      });

      refetch();
      event.target.value = '';
    } catch (error: any) {
      console.error('Upload failed:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to upload file",
        variant: "destructive"
      });
    }
  };

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(url);
      toast({
        title: "Success",
        description: "Media URL copied to clipboard"
      });
      
      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setCopiedUrl(null);
      }, 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy URL to clipboard",
        variant: "destructive"
      });
    }
  };

  const deleteFile = async (file: any) => {
    if (!confirm('Are you sure you want to delete this file?')) return;

    try {
      // Extract the file path from the URL
      const urlParts = file.file_url.split('/');
      const bucketIndex = urlParts.findIndex(part => part === 'media');
      const filePath = urlParts.slice(bucketIndex + 1).join('/');
      
      console.log('Deleting file at path:', filePath);

      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('media')
        .remove([filePath]);

      if (storageError) {
        console.error('Storage deletion error:', storageError);
        // Continue with database deletion even if storage deletion fails
      }

      // Delete from database
      const { error } = await supabase
        .from('media_files')
        .delete()
        .eq('id', file.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "File deleted successfully"
      });

      refetch();
    } catch (error: any) {
      console.error('Delete failed:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete file",
        variant: "destructive"
      });
    }
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'image':
        return <Image className="h-8 w-8 text-blue-500" />;
      case 'video':
        return <Video className="h-8 w-8 text-purple-500" />;
      default:
        return <FileText className="h-8 w-8 text-gray-500" />;
    }
  };

  const filteredFiles = mediaFiles.filter(file => {
    const matchesSearch = file.filename.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFolder = selectedFolder === 'all' || file.folder === selectedFolder;
    return matchesSearch && matchesFolder;
  });

  const folders = ['general', 'courses', 'blogs', 'services', 'destinations'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Media Library</h1>
          <p className="text-gray-600">Manage your images, documents, and videos</p>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={handleFileUpload}
            accept="image/*,video/*,.pdf,.doc,.docx"
          />
          <label htmlFor="file-upload">
            <Button asChild>
              <span className="cursor-pointer">
                <Upload className="mr-2 h-4 w-4" />
                Upload File
              </span>
            </Button>
          </label>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search files..."
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
              <SelectItem key={folder} value={folder}>{folder}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="aspect-square bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredFiles.map((file) => (
            <Card key={file.id} className="relative group">
              <CardContent className="p-4">
                <div className="aspect-square flex items-center justify-center bg-gray-50 rounded mb-3">
                  {file.file_type === 'image' ? (
                    <img
                      src={file.file_url}
                      alt={file.filename}
                      className="w-full h-full object-cover rounded"
                    />
                  ) : (
                    getFileIcon(file.file_type)
                  )}
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium truncate">{file.filename}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{file.folder}</span>
                    <span>{(file.file_size / 1024).toFixed(0)}KB</span>
                  </div>
                </div>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="bg-blue-500 text-white hover:bg-blue-600 h-8 w-8 p-0"
                    onClick={() => copyToClipboard(file.file_url)}
                  >
                    {copiedUrl === file.file_url ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="bg-red-500 text-white hover:bg-red-600 h-8 w-8 p-0"
                    onClick={() => deleteFile(file)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredFiles.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <Folder className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No files found.</p>
          <label htmlFor="file-upload">
            <Button className="mt-4" asChild>
              <span className="cursor-pointer">
                <Upload className="mr-2 h-4 w-4" />
                Upload First File
              </span>
            </Button>
          </label>
        </div>
      )}
    </div>
  );
};

export default MediaLibrary;
