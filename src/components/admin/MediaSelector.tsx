
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Image, Link, Check } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import PublicFileBrowser from '@/components/admin/PublicFileBrowser';

interface MediaSelectorProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder?: string;
  accept?: string;
}

const MediaSelector = ({ value, onChange, label, placeholder, accept = "image/*" }: MediaSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [urlInput, setUrlInput] = useState(value);
  const [selectedMedia, setSelectedMedia] = useState<string>('');

  const { data: mediaFiles = [] } = useQuery({
    queryKey: ['media-files-selector'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('media_files')
        .select('*')
        .eq('file_type', 'image')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const handleMediaSelect = (fileUrl: string) => {
    setSelectedMedia(fileUrl);
  };

  const handleConfirmMediaSelection = () => {
    if (selectedMedia) {
      onChange(selectedMedia);
      setIsOpen(false);
      setSelectedMedia('');
    }
  };

  const handleUrlSave = () => {
    onChange(urlInput);
    setIsOpen(false);
  };

  return (
    <div>
      <Label>{label}</Label>
      <div className="flex gap-2 mt-1">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1"
        />
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button type="button" variant="outline" size="sm">
              <Image className="h-4 w-4 mr-1" />
              Browse
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Select Image</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="media">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="media">Media Library</TabsTrigger>
                <TabsTrigger value="public">Public Files</TabsTrigger>
                <TabsTrigger value="url">URL</TabsTrigger>
              </TabsList>
              
              <TabsContent value="media" className="space-y-4">
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {mediaFiles.map((file) => (
                    <Card 
                      key={file.id} 
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedMedia === file.file_url ? 'ring-2 ring-blue-500' : ''
                      }`}
                      onClick={() => handleMediaSelect(file.file_url)}
                    >
                      <CardContent className="p-2">
                        <div className="aspect-square relative">
                          <img
                            src={file.file_url}
                            alt={file.filename}
                            className="w-full h-full object-cover rounded"
                          />
                          {selectedMedia === file.file_url && (
                            <div className="absolute inset-0 bg-blue-500 bg-opacity-20 flex items-center justify-center rounded">
                              <Check className="h-6 w-6 text-blue-600" />
                            </div>
                          )}
                        </div>
                        <p className="text-xs mt-1 truncate">{file.filename}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                {mediaFiles.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No images found in media library.
                  </div>
                )}
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={handleConfirmMediaSelection}
                    disabled={!selectedMedia}
                  >
                    Select Image
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="public" className="space-y-4">
                <PublicFileBrowser 
                  onFileSelect={(filePath) => {
                    onChange(filePath);
                    setIsOpen(false);
                  }}
                  showSelection={true}
                />
              </TabsContent>
              
              <TabsContent value="url" className="space-y-4">
                <div>
                  <Label htmlFor="url-input">Image URL</Label>
                  <Input
                    id="url-input"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="mt-1"
                  />
                </div>
                {urlInput && (
                  <div className="border rounded p-4">
                    <p className="text-sm text-gray-600 mb-2">Preview:</p>
                    <img
                      src={urlInput}
                      alt="Preview"
                      className="max-w-full h-32 object-contain"
                      onError={(e) => {
                        e.currentTarget.src = '';
                        e.currentTarget.alt = 'Invalid image URL';
                      }}
                    />
                  </div>
                )}
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={handleUrlSave}
                    disabled={!urlInput}
                  >
                    Use URL
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default MediaSelector;
