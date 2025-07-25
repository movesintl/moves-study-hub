import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Cookie, 
  Shield, 
  BarChart3, 
  Target, 
  Wrench,
  RefreshCw,
  ExternalLink,
  Info
} from 'lucide-react';
import { useCookieConsent } from '@/hooks/useCookieConsent';

const CookieSettings = () => {
  const { preferences, updatePreferences, resetConsent } = useCookieConsent();
  const [tempPreferences, setTempPreferences] = useState(preferences);

  const handleSave = () => {
    updatePreferences(tempPreferences);
  };

  const handleReset = () => {
    resetConsent();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Cookie className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Cookie Settings</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Manage your cookie preferences and privacy settings
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            Necessary Cookies
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h4 className="font-medium mb-1">Essential Website Functions</h4>
              <p className="text-sm text-muted-foreground">
                These cookies are necessary for the website to function and cannot be disabled.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">Always Active</Badge>
              <Switch checked={true} disabled />
            </div>
          </div>
          <div className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">
            Essential cookies enable core website functionality such as user authentication, 
            security, and accessibility features. The website cannot function properly without these cookies.
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            Analytics Cookies
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h4 className="font-medium mb-1">Website Analytics</h4>
              <p className="text-sm text-muted-foreground">
                Help us understand how visitors interact with our website.
              </p>
            </div>
            <Switch 
              checked={tempPreferences.analytics}
              onCheckedChange={(checked) => 
                setTempPreferences(prev => ({ ...prev, analytics: checked }))
              }
            />
          </div>
          <div className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">
            Analytics cookies collect information about how you use our website, such as which 
            pages you visit most often. This data helps us improve our website performance and user experience.
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-purple-600" />
            Marketing Cookies
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h4 className="font-medium mb-1">Personalized Advertising</h4>
              <p className="text-sm text-muted-foreground">
                Used to deliver relevant advertisements based on your interests.
              </p>
            </div>
            <Switch 
              checked={tempPreferences.marketing}
              onCheckedChange={(checked) => 
                setTempPreferences(prev => ({ ...prev, marketing: checked }))
              }
            />
          </div>
          <div className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">
            Marketing cookies track your online activity to help advertisers deliver more 
            relevant advertising or to limit how many times you see an ad.
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="h-5 w-5 text-orange-600" />
            Functional Cookies
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h4 className="font-medium mb-1">Enhanced Features</h4>
              <p className="text-sm text-muted-foreground">
                Enable enhanced functionality and personalization features.
              </p>
            </div>
            <Switch 
              checked={tempPreferences.functional}
              onCheckedChange={(checked) => 
                setTempPreferences(prev => ({ ...prev, functional: checked }))
              }
            />
          </div>
          <div className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">
            Functional cookies enable enhanced features like live chat, social media integration, 
            and personalized content recommendations.
          </div>
        </CardContent>
      </Card>

      <Card className="bg-muted/30">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Info className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Privacy Information</span>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            We respect your privacy and are committed to protecting your personal data. 
            For detailed information about how we collect, use, and protect your data, 
            please review our privacy policy.
          </p>
          <a 
            href="/privacy-policy" 
            className="text-primary hover:underline inline-flex items-center gap-1 text-sm"
            target="_blank"
          >
            Read our Privacy Policy
            <ExternalLink className="h-3 w-3" />
          </a>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          variant="outline" 
          onClick={handleReset}
          className="flex-1 gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Reset All Preferences
        </Button>
        <Button 
          onClick={handleSave}
          className="flex-1"
        >
          Save Preferences
        </Button>
      </div>
    </div>
  );
};

export default CookieSettings;