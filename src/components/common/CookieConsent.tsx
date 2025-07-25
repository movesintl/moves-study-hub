import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Cookie, 
  Settings, 
  Shield, 
  BarChart3, 
  Target, 
  Wrench,
  X,
  ExternalLink,
  Info
} from 'lucide-react';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const CookieConsent = () => {
  const {
    showBanner,
    preferences,
    acceptAll,
    acceptNecessary,
    updatePreferences,
    setShowBanner,
  } = useCookieConsent();

  const [showSettings, setShowSettings] = useState(false);
  const [tempPreferences, setTempPreferences] = useState(preferences);

  if (!showBanner) return null;

  const handleSaveSettings = () => {
    updatePreferences(tempPreferences);
    setShowBanner(false);
    setShowSettings(false);
  };

  const CookieBanner = () => (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur-sm border-t shadow-lg">
      <div className="container mx-auto max-w-6xl">
        <Card className="border-2 border-primary/20">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Cookie className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">We use cookies</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    We use cookies and similar technologies to enhance your browsing experience, 
                    analyze site traffic, and personalize content. By clicking "Accept all", 
                    you consent to our use of cookies.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 lg:min-w-fit">
                <Dialog open={showSettings} onOpenChange={setShowSettings}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Settings className="h-4 w-4" />
                      Cookie Settings
                    </Button>
                  </DialogTrigger>
                  <CookieSettingsDialog />
                </Dialog>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={acceptNecessary}
                  className="gap-2"
                >
                  <Shield className="h-4 w-4" />
                  Necessary Only
                </Button>
                
                <Button 
                  size="sm"
                  onClick={acceptAll}
                  className="gap-2 bg-primary hover:bg-primary/90"
                >
                  Accept All
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const CookieSettingsDialog = () => (
    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-xl">
          <Cookie className="h-5 w-5 text-primary" />
          Cookie Preferences
        </DialogTitle>
        <DialogDescription>
          Choose which cookies you want to accept. You can change these settings at any time.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        {/* Necessary Cookies */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-green-600" />
              <div>
                <h4 className="font-semibold">Necessary Cookies</h4>
                <p className="text-sm text-muted-foreground">
                  Essential for the website to function properly
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">Always Active</Badge>
              <Switch checked={true} disabled />
            </div>
          </div>
          <Card className="bg-muted/30">
            <CardContent className="p-4 text-sm text-muted-foreground">
              These cookies are necessary for the website to function and cannot be disabled. 
              They are usually set in response to actions you take such as setting privacy 
              preferences, logging in, or filling in forms.
            </CardContent>
          </Card>
        </div>

        <Separator />

        {/* Analytics Cookies */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              <div>
                <h4 className="font-semibold">Analytics Cookies</h4>
                <p className="text-sm text-muted-foreground">
                  Help us understand how visitors interact with our website
                </p>
              </div>
            </div>
            <Switch 
              checked={tempPreferences.analytics}
              onCheckedChange={(checked) => 
                setTempPreferences(prev => ({ ...prev, analytics: checked }))
              }
            />
          </div>
          <Card className="bg-muted/30">
            <CardContent className="p-4 text-sm text-muted-foreground">
              These cookies help us understand how visitors interact with our website by 
              collecting and reporting information anonymously. This helps us improve our 
              website performance and user experience.
            </CardContent>
          </Card>
        </div>

        <Separator />

        {/* Marketing Cookies */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Target className="h-5 w-5 text-purple-600" />
              <div>
                <h4 className="font-semibold">Marketing Cookies</h4>
                <p className="text-sm text-muted-foreground">
                  Used to deliver personalized advertisements
                </p>
              </div>
            </div>
            <Switch 
              checked={tempPreferences.marketing}
              onCheckedChange={(checked) => 
                setTempPreferences(prev => ({ ...prev, marketing: checked }))
              }
            />
          </div>
          <Card className="bg-muted/30">
            <CardContent className="p-4 text-sm text-muted-foreground">
              These cookies are used to make advertising messages more relevant to you and 
              your interests. They may be set by us or by third-party providers whose 
              services we use on our pages.
            </CardContent>
          </Card>
        </div>

        <Separator />

        {/* Functional Cookies */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Wrench className="h-5 w-5 text-orange-600" />
              <div>
                <h4 className="font-semibold">Functional Cookies</h4>
                <p className="text-sm text-muted-foreground">
                  Enable enhanced functionality and personalization
                </p>
              </div>
            </div>
            <Switch 
              checked={tempPreferences.functional}
              onCheckedChange={(checked) => 
                setTempPreferences(prev => ({ ...prev, functional: checked }))
              }
            />
          </div>
          <Card className="bg-muted/30">
            <CardContent className="p-4 text-sm text-muted-foreground">
              These cookies enable enhanced functionality like live chat, social media 
              features, and personalized content. They may be set by us or by third-party 
              providers whose services we use.
            </CardContent>
          </Card>
        </div>

        {/* Privacy Policy Link */}
        <div className="flex items-center gap-2 p-4 bg-muted/30 rounded-lg">
          <Info className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            For more information, read our{' '}
            <a 
              href="/privacy-policy" 
              className="text-primary hover:underline inline-flex items-center gap-1"
              target="_blank"
            >
              Privacy Policy
              <ExternalLink className="h-3 w-3" />
            </a>
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button variant="outline" onClick={() => setShowSettings(false)} className="flex-1">
            Cancel
          </Button>
          <Button 
            variant="outline" 
            onClick={() => {
              setTempPreferences({
                necessary: true,
                analytics: false,
                marketing: false,
                functional: false,
              });
            }}
            className="flex-1"
          >
            Reject All
          </Button>
          <Button onClick={handleSaveSettings} className="flex-1">
            Save Preferences
          </Button>
        </div>
      </div>
    </DialogContent>
  );

  return <CookieBanner />;
};

export default CookieConsent;