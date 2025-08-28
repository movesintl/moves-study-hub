import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface EmailTemplate {
  id: string;
  name: string;
  description: string;
  category: 'newsletter' | 'promotional' | 'announcement' | 'welcome' | 'transactional';
  thumbnail: string;
  content: string;
  isCustom?: boolean;
}

interface EmailTemplateSelectorProps {
  onSelectTemplate: (template: EmailTemplate) => void;
  onStartBlank: () => void;
}

const EmailTemplateSelector: React.FC<EmailTemplateSelectorProps> = ({
  onSelectTemplate,
  onStartBlank
}) => {
  const templates: EmailTemplate[] = [
    {
      id: 'newsletter-modern',
      name: 'Professional Newsletter',
      description: 'Clean and professional newsletter template with elegant gradient header',
      category: 'newsletter',
      thumbnail: '/api/placeholder/300/200',
      content: `
        <div style="max-width: 600px; margin: 0 auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #ffffff;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px; font-weight: 300;">Moves International</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Your trusted partner in international education</p>
          </div>
          <div style="padding: 40px 30px;">
            <h2 style="color: #333; margin-top: 0; font-size: 24px;">Hello {{recipientName}}!</h2>
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px; font-size: 16px;">
              Welcome to our latest newsletter. Here are the most important updates from our team at Moves International.
            </p>
            <div style="margin: 30px 0; padding: 20px; background-color: #f8f9fa; border-left: 4px solid #667eea; border-radius: 0 5px 5px 0;">
              <p style="margin: 0; font-style: italic; color: #555;">
                "Education is the most powerful weapon which you can use to change the world." - Nelson Mandela
              </p>
            </div>
            <div style="text-align: center; margin: 30px 0;">
              <a href="#" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                Read More
              </a>
            </div>
          </div>
          <div style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #eee;">
            <p style="color: #999; font-size: 14px; margin: 5px 0;"><strong>Moves International</strong></p>
            <p style="color: #999; font-size: 14px; margin: 5px 0;">Helping students achieve their international education dreams</p>
            <p style="color: #999; font-size: 12px; margin: 15px 0;">
              This email was sent because you opted in to receive updates from Moves International.<br>
              <a href="#" style="color: #667eea;">Unsubscribe</a> | <a href="#" style="color: #667eea;">Update preferences</a>
            </p>
          </div>
        </div>
      `
    },
    {
      id: 'promotional-sale',
      name: 'Promotional Campaign',
      description: 'Eye-catching promotional template with vibrant gradients and special offers',
      category: 'promotional',
      thumbnail: '/api/placeholder/300/200',
      content: `
        <div style="max-width: 600px; margin: 0 auto; font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
          <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 40px 30px; text-align: center; position: relative;">
            <h1 style="margin: 0; font-size: 32px; font-weight: 700; position: relative; z-index: 1;">🎓 Special Opportunity</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px; position: relative; z-index: 1;">Unlock your international education dreams</p>
          </div>
          <div style="padding: 40px 30px;">
            <h2 style="color: #2d3748; margin-top: 0; font-size: 24px; font-weight: 600;">Hello {{recipientName}}! 👋</h2>
            <p style="color: #4a5568; line-height: 1.7; margin-bottom: 20px; font-size: 16px;">
              Don't miss out on this exclusive opportunity to get free consultation plus expert scholarship guidance for your international education journey.
            </p>
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px; text-align: center; margin: 30px 0;">
              <h3 style="margin: 0 0 15px 0; font-size: 28px; font-weight: 700;">Limited Time Offer</h3>
              <p style="margin: 0; font-size: 18px; opacity: 0.9;">Free consultation + scholarship guidance</p>
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 20px; margin: 30px 0;">
              <div style="flex: 1; min-width: 150px; text-align: center; padding: 20px; background-color: #f7fafc; border-radius: 8px;">
                <h4 style="margin: 0 0 10px 0; color: #2d3748; font-size: 16px;">🌍 Global Universities</h4>
                <p style="margin: 0; color: #718096; font-size: 14px;">Access to top institutions worldwide</p>
              </div>
              <div style="flex: 1; min-width: 150px; text-align: center; padding: 20px; background-color: #f7fafc; border-radius: 8px;">
                <h4 style="margin: 0 0 10px 0; color: #2d3748; font-size: 16px;">💰 Scholarship Support</h4>
                <p style="margin: 0; color: #718096; font-size: 14px;">Expert guidance on funding options</p>
              </div>
              <div style="flex: 1; min-width: 150px; text-align: center; padding: 20px; background-color: #f7fafc; border-radius: 8px;">
                <h4 style="margin: 0 0 10px 0; color: #2d3748; font-size: 16px;">📋 Application Help</h4>
                <p style="margin: 0; color: #718096; font-size: 14px;">End-to-end application assistance</p>
              </div>
            </div>
            <div style="text-align: center;">
              <a href="#" style="display: inline-block; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 18px 36px; text-decoration: none; border-radius: 50px; font-weight: 700; font-size: 16px; box-shadow: 0 5px 15px rgba(240, 147, 251, 0.4);">
                Book Your Free Consultation
              </a>
            </div>
          </div>
          <div style="background-color: #2d3748; color: white; padding: 30px; text-align: center;">
            <p style="margin: 8px 0; color: white;"><strong>Moves International</strong></p>
            <p style="margin: 8px 0; color: #cbd5e0;">🌟 Your gateway to global education opportunities</p>
            <p style="color: #cbd5e0; font-size: 12px; margin: 15px 0;">
              You're receiving this because you're part of our Moves International community.<br>
              <a href="#" style="color: #a0aec0;">Unsubscribe</a> | <a href="#" style="color: #a0aec0;">Update preferences</a>
            </p>
          </div>
        </div>
      `
    },
    {
      id: 'welcome-series',
      name: 'Welcome Email',
      description: 'Warm welcome template for new subscribers and customers',
      category: 'welcome',
      thumbnail: '/api/placeholder/300/200',
      content: `
        <div style="margin: 0 auto; max-width: 600px; font-family: Arial, sans-serif; background-color: #ffffff;">
          <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); padding: 40px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">Welcome!</h1>
            <p style="color: #e0f4ff; margin: 10px 0 0 0; font-size: 16px;">We're excited to have you on board</p>
          </div>
          
          <div style="padding: 40px 20px;">
            <h2 style="color: #2c3e50; font-size: 24px; margin: 0 0 20px 0;">Hello {{FirstName}}!</h2>
            
            <p style="color: #34495e; line-height: 1.6; font-size: 16px; margin: 0 0 20px 0;">
              Thank you for joining our community! We're thrilled to have you as part of our family.
            </p>
            
            <div style="background-color: #f8f9fa; padding: 25px; border-radius: 8px; margin: 25px 0;">
              <h3 style="color: #2c3e50; font-size: 20px; margin: 0 0 15px 0;">What's Next?</h3>
              <ul style="color: #34495e; line-height: 1.8; padding-left: 20px; margin: 0;">
                <li>Complete your profile</li>
                <li>Explore our features</li>
                <li>Join our community</li>
                <li>Get personalized recommendations</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="#" style="background-color: #4facfe; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 600; font-size: 16px;">
                Get Started
              </a>
            </div>
            
            <p style="color: #7f8c8d; font-size: 14px; line-height: 1.6; margin: 20px 0 0 0;">
              If you have any questions, don't hesitate to reach out. We're here to help!
            </p>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px; text-align: center;">
            <p style="color: #7f8c8d; font-size: 12px; margin: 0 0 10px 0;">
              © 2024 Your Company. All rights reserved.<br/>
              <a href="{{UnsubscribeURL}}" style="color: #95a5a6;">Unsubscribe</a>
            </p>
          </div>
        </div>
      `
    },
    {
      id: 'announcement-update',
      name: 'Important Announcement',
      description: 'Professional announcement template with clear information hierarchy',
      category: 'announcement',
      thumbnail: '/api/placeholder/300/200',
      content: `
        <div style="max-width: 600px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; border: 1px solid #e1e5e9; border-radius: 8px; overflow: hidden; background-color: #ffffff;">
          <div style="background-color: #2563eb; color: white; padding: 30px; text-align: center;">
            <div style="background-color: #fbbf24; color: #92400e; padding: 8px 16px; border-radius: 20px; font-size: 12px; font-weight: 600; text-transform: uppercase; margin-bottom: 20px; display: inline-block;">Important Update</div>
            <h1 style="margin: 0; font-size: 24px; font-weight: 600;">New Opportunities Available</h1>
          </div>
          <div style="padding: 40px 30px;">
            <h2 style="color: #1f2937; margin-top: 0; font-size: 20px; font-weight: 600;">Dear {{recipientName}},</h2>
            <p style="color: #4b5563; line-height: 1.6; margin-bottom: 16px;">
              We're excited to share some important updates that will impact your international education journey. This announcement contains vital information about new programs and opportunities.
            </p>
            <div style="background-color: #eff6ff; border: 1px solid #dbeafe; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h3 style="margin: 0 0 10px 0; color: #1e40af; font-size: 18px;">What this means for you:</h3>
              <p style="margin: 0; color: #4b5563;">
                Stay tuned for more updates and opportunities coming your way. We're here to support your educational journey every step of the way.
              </p>
            </div>
            <div style="text-align: center; margin: 25px 0;">
              <a href="#" style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600;">
                Learn More
              </a>
            </div>
          </div>
          <div style="background-color: #f9fafb; padding: 30px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px; margin: 8px 0; text-align: center;"><strong>Moves International</strong></p>
            <p style="color: #6b7280; font-size: 14px; margin: 8px 0; text-align: center;">📧 info@movesinternational.com | 📞 +1 (555) 123-4567</p>
            <p style="color: #9ca3af; font-size: 12px; margin: 15px 0; text-align: center;">
              You received this email because you subscribed to updates from Moves International.<br>
              <a href="#" style="color: #6b7280;">Unsubscribe</a> | <a href="#" style="color: #6b7280;">Update preferences</a>
            </p>
          </div>
        </div>
      `
    }
  ];

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'newsletter': return 'bg-blue-100 text-blue-800';
      case 'promotional': return 'bg-red-100 text-red-800';
      case 'welcome': return 'bg-green-100 text-green-800';
      case 'announcement': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Choose a Template</h2>
        <p className="text-muted-foreground">
          Start with a professionally designed template or create from scratch
        </p>
      </div>

      <div className="flex justify-center">
        <Button 
          onClick={onStartBlank}
          variant="outline" 
          size="lg"
          className="mb-6"
        >
          Start with Blank Canvas
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((template) => (
          <Card key={template.id} className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <CardTitle className="text-lg">{template.name}</CardTitle>
                <Badge className={getCategoryBadgeColor(template.category)}>
                  {template.category}
                </Badge>
              </div>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <span className="text-muted-foreground">Template Preview</span>
                </div>
                <Button 
                  onClick={() => onSelectTemplate(template)}
                  className="w-full"
                >
                  Use This Template
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EmailTemplateSelector;