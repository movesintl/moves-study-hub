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
      name: 'Modern Newsletter',
      description: 'Clean and professional newsletter template with header, content sections, and footer',
      category: 'newsletter',
      thumbnail: '/api/placeholder/300/200',
      content: `
        <div style="margin: 0 auto; max-width: 600px; font-family: Arial, sans-serif; background-color: #ffffff;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">Weekly Newsletter</h1>
            <p style="color: #e0e7ff; margin: 10px 0 0 0; font-size: 16px;">Stay updated with our latest news</p>
          </div>
          
          <div style="padding: 40px 20px;">
            <h2 style="color: #1f2937; font-size: 24px; margin: 0 0 20px 0;">Hello {{FirstName}},</h2>
            
            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1f2937; font-size: 20px; margin: 0 0 15px 0;">Featured Article</h3>
              <p style="color: #6b7280; line-height: 1.6; margin: 0 0 15px 0;">
                Discover the latest trends and insights in our industry. This week we're diving deep into...
              </p>
              <a href="#" style="background-color: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 600;">
                Read More
              </a>
            </div>
            
            <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px;">
              <h3 style="color: #1f2937; font-size: 18px; margin: 0 0 15px 0;">Quick Updates</h3>
              <ul style="color: #6b7280; line-height: 1.8; padding-left: 20px;">
                <li>Product update: New features released</li>
                <li>Event: Join us for our upcoming webinar</li>
                <li>Community: Member spotlight</li>
              </ul>
            </div>
          </div>
          
          <div style="background-color: #f3f4f6; padding: 20px; text-align: center;">
            <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px 0;">
              Follow us on social media
            </p>
            <div style="margin: 20px 0;">
              <a href="#" style="display: inline-block; margin: 0 10px;">
                <img src="data:image/svg+xml;base64,..." alt="Facebook" style="width: 24px; height: 24px;" />
              </a>
              <a href="#" style="display: inline-block; margin: 0 10px;">
                <img src="data:image/svg+xml;base64,..." alt="Twitter" style="width: 24px; height: 24px;" />
              </a>
              <a href="#" style="display: inline-block; margin: 0 10px;">
                <img src="data:image/svg+xml;base64,..." alt="Instagram" style="width: 24px; height: 24px;" />
              </a>
            </div>
            <p style="color: #9ca3af; font-size: 12px; margin: 20px 0 0 0;">
              © 2024 Your Company. All rights reserved.<br/>
              <a href="{{UnsubscribeURL}}" style="color: #6b7280;">Unsubscribe</a> | 
              <a href="#" style="color: #6b7280;">Update Preferences</a>
            </p>
          </div>
        </div>
      `
    },
    {
      id: 'promotional-sale',
      name: 'Promotional Sale',
      description: 'Eye-catching promotional template perfect for sales and special offers',
      category: 'promotional',
      thumbnail: '/api/placeholder/300/200',
      content: `
        <div style="margin: 0 auto; max-width: 600px; font-family: Arial, sans-serif; background-color: #ffffff;">
          <div style="background: linear-gradient(45deg, #ff6b6b, #ee5a24); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 32px; font-weight: bold;">FLASH SALE</h1>
            <p style="color: #ffe8e8; margin: 10px 0 0 0; font-size: 18px;">Up to 50% OFF - Limited Time!</p>
          </div>
          
          <div style="padding: 40px 20px; text-align: center;">
            <h2 style="color: #2c3e50; font-size: 24px; margin: 0 0 20px 0;">Hi {{FirstName}}!</h2>
            
            <div style="background-color: #fff5f5; border: 2px dashed #ff6b6b; padding: 30px; border-radius: 12px; margin: 20px 0;">
              <h3 style="color: #ff6b6b; font-size: 28px; margin: 0; font-weight: bold;">50% OFF</h3>
              <p style="color: #2c3e50; font-size: 16px; margin: 10px 0;">Everything Must Go!</p>
              <p style="color: #7f8c8d; font-size: 14px; margin: 5px 0 20px 0;">Use code: FLASH50</p>
              <a href="#" style="background-color: #ff6b6b; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold; font-size: 16px;">
                SHOP NOW
              </a>
            </div>
            
            <div style="margin: 30px 0;">
              <p style="color: #7f8c8d; font-size: 14px; margin: 0;">
                ⏰ Hurry! Sale ends in 24 hours
              </p>
            </div>
          </div>
          
          <div style="background-color: #2c3e50; padding: 20px; text-align: center;">
            <p style="color: #bdc3c7; font-size: 12px; margin: 0 0 10px 0;">
              © 2024 Your Store. All rights reserved.<br/>
              <a href="{{UnsubscribeURL}}" style="color: #95a5a6;">Unsubscribe</a>
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
      name: 'Product Announcement',
      description: 'Professional template for product updates and company announcements',
      category: 'announcement',
      thumbnail: '/api/placeholder/300/200',
      content: `
        <div style="margin: 0 auto; max-width: 600px; font-family: Arial, sans-serif; background-color: #ffffff;">
          <div style="background-color: #1a1a2e; padding: 30px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 26px; font-weight: bold;">Important Update</h1>
            <p style="color: #a8a8b3; margin: 10px 0 0 0; font-size: 14px;">New features and improvements</p>
          </div>
          
          <div style="padding: 40px 20px;">
            <h2 style="color: #2c3e50; font-size: 22px; margin: 0 0 20px 0;">Hi {{FirstName}},</h2>
            
            <p style="color: #34495e; line-height: 1.6; font-size: 16px; margin: 0 0 25px 0;">
              We're excited to announce some major updates to our platform that will enhance your experience.
            </p>
            
            <div style="border-left: 4px solid #3498db; padding-left: 20px; margin: 25px 0;">
              <h3 style="color: #2c3e50; font-size: 18px; margin: 0 0 10px 0;">🚀 What's New</h3>
              <ul style="color: #34495e; line-height: 1.8; margin: 0; padding-left: 20px;">
                <li>Enhanced user interface</li>
                <li>Improved performance</li>
                <li>New collaboration features</li>
                <li>Better mobile experience</li>
              </ul>
            </div>
            
            <div style="background-color: #ecf0f1; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <p style="color: #2c3e50; font-size: 14px; margin: 0; font-weight: 600;">
                💡 These updates are available now - no action required on your part!
              </p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="#" style="background-color: #3498db; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 600;">
                Explore New Features
              </a>
            </div>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px; text-align: center;">
            <p style="color: #7f8c8d; font-size: 12px; margin: 0 0 10px 0;">
              © 2024 Your Company. All rights reserved.<br/>
              <a href="{{UnsubscribeURL}}" style="color: #95a5a6;">Unsubscribe</a>
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