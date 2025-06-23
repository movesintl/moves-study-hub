
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Settings2, Save } from 'lucide-react';

const AdvancedSettings = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [settings, setSettings] = useState<Record<string, any>>({});

  // Fetch site settings
  const { data: siteSettings, isLoading } = useQuery({
    queryKey: ['site-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .order('key');
      
      if (error) throw error;
      
      // Convert to key-value pairs for easier handling
      const settingsMap: Record<string, any> = {};
      data.forEach(setting => {
        settingsMap[setting.key] = typeof setting.value === 'string' 
          ? JSON.parse(setting.value) 
          : setting.value;
      });
      
      setSettings(settingsMap);
      return data;
    }
  });

  // Update settings mutation
  const updateSettingsMutation = useMutation({
    mutationFn: async (updatedSettings: Record<string, any>) => {
      const updates = Object.entries(updatedSettings).map(([key, value]) => ({
        key,
        value: JSON.stringify(value)
      }));

      for (const update of updates) {
        const { error } = await supabase
          .from('site_settings')
          .upsert(update, { onConflict: 'key' });
        
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-settings'] });
      toast({
        title: "Success",
        description: "Settings updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update settings",
        variant: "destructive",
      });
    }
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    updateSettingsMutation.mutate(settings);
  };

  if (isLoading) {
    return <div>Loading settings...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Settings2 className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Advanced Settings</h1>
        </div>
        <Button onClick={handleSave} disabled={updateSettingsMutation.isPending}>
          <Save className="h-4 w-4 mr-2" />
          {updateSettingsMutation.isPending ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Site Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>Site Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="site_title">Site Title</Label>
              <Input
                id="site_title"
                value={settings.site_title || ''}
                onChange={(e) => handleSettingChange('site_title', e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="site_logo">Site Logo URL</Label>
              <Input
                id="site_logo"
                value={settings.site_logo || ''}
                onChange={(e) => handleSettingChange('site_logo', e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="site_favicon">Favicon URL</Label>
              <Input
                id="site_favicon"
                value={settings.site_favicon || ''}
                onChange={(e) => handleSettingChange('site_favicon', e.target.value)}
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>

        {/* Localization */}
        <Card>
          <CardHeader>
            <CardTitle>Localization</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="site_language">Default Language</Label>
              <Input
                id="site_language"
                value={settings.site_language || ''}
                onChange={(e) => handleSettingChange('site_language', e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="site_timezone">Timezone</Label>
              <Input
                id="site_timezone"
                value={settings.site_timezone || ''}
                onChange={(e) => handleSettingChange('site_timezone', e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="site_font">Default Font</Label>
              <Input
                id="site_font"
                value={settings.site_font || ''}
                onChange={(e) => handleSettingChange('site_font', e.target.value)}
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Custom Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Custom Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Add custom configuration values for your application. These will be stored as JSON.
            </p>
            <Textarea
              placeholder="Enter custom JSON configuration..."
              rows={8}
              className="font-mono text-sm"
              value={JSON.stringify(settings, null, 2)}
              onChange={(e) => {
                try {
                  const parsed = JSON.parse(e.target.value);
                  setSettings(parsed);
                } catch (error) {
                  // Invalid JSON, don't update
                }
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedSettings;
