
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Settings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [siteSettings, setSiteSettings] = useState({
    siteName: 'Moves International',
    siteDescription: 'Your trusted partner for studying abroad',
    contactEmail: 'info@movesinternational.com',
    contactPhone: '+1 234 567 8900',
    address: '123 Education St, City, Country',
  });

  const [emailSettings, setEmailSettings] = useState({
    smtpHost: '',
    smtpPort: '587',
    smtpUser: '',
    smtpPassword: '',
  });

  const handleSiteSettingsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // In a real application, you would save these settings to a database
    // For now, we'll just show a success message
    setTimeout(() => {
      toast({
        title: "Success",
        description: "Site settings updated successfully",
      });
      setLoading(false);
    }, 1000);
  };

  const handleEmailSettingsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      toast({
        title: "Success",
        description: "Email settings updated successfully",
      });
      setLoading(false);
    }, 1000);
  };

  const handleSiteSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSiteSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleEmailSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmailSettings(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>

      <Tabs defaultValue="site" className="w-full">
        <TabsList>
          <TabsTrigger value="site">Site Settings</TabsTrigger>
          <TabsTrigger value="email">Email Settings</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="site">
          <Card>
            <CardHeader>
              <CardTitle>Site Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSiteSettingsSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    name="siteName"
                    value={siteSettings.siteName}
                    onChange={handleSiteSettingsChange}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <textarea
                    id="siteDescription"
                    name="siteDescription"
                    value={siteSettings.siteDescription}
                    onChange={handleSiteSettingsChange}
                    rows={3}
                    className="mt-1 w-full px-3 py-2 border border-input rounded-md"
                  />
                </div>

                <div>
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    value={siteSettings.contactEmail}
                    onChange={handleSiteSettingsChange}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input
                    id="contactPhone"
                    name="contactPhone"
                    value={siteSettings.contactPhone}
                    onChange={handleSiteSettingsChange}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <textarea
                    id="address"
                    name="address"
                    value={siteSettings.address}
                    onChange={handleSiteSettingsChange}
                    rows={2}
                    className="mt-1 w-full px-3 py-2 border border-input rounded-md"
                  />
                </div>

                <Button type="submit" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Site Settings'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleEmailSettingsSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="smtpHost">SMTP Host</Label>
                  <Input
                    id="smtpHost"
                    name="smtpHost"
                    value={emailSettings.smtpHost}
                    onChange={handleEmailSettingsChange}
                    placeholder="smtp.gmail.com"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="smtpPort">SMTP Port</Label>
                  <Input
                    id="smtpPort"
                    name="smtpPort"
                    value={emailSettings.smtpPort}
                    onChange={handleEmailSettingsChange}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="smtpUser">SMTP Username</Label>
                  <Input
                    id="smtpUser"
                    name="smtpUser"
                    value={emailSettings.smtpUser}
                    onChange={handleEmailSettingsChange}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="smtpPassword">SMTP Password</Label>
                  <Input
                    id="smtpPassword"
                    name="smtpPassword"
                    type="password"
                    value={emailSettings.smtpPassword}
                    onChange={handleEmailSettingsChange}
                    className="mt-1"
                  />
                </div>

                <Button type="submit" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Email Settings'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                <h3 className="font-medium text-yellow-800">Password Policy</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  Minimum 8 characters, including uppercase, lowercase, and numbers.
                </p>
              </div>
              
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                <h3 className="font-medium text-blue-800">Two-Factor Authentication</h3>
                <p className="text-sm text-blue-700 mt-1">
                  Enable 2FA for enhanced security (Coming Soon).
                </p>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                <h3 className="font-medium text-green-800">Session Management</h3>
                <p className="text-sm text-green-700 mt-1">
                  Sessions expire after 24 hours of inactivity.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
