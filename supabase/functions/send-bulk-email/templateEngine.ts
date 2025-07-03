export interface EmailTemplateData {
  recipientName: string;
  subject: string;
  content: string;
}

export type TemplateType = 'newsletter' | 'announcement' | 'promotional';

class EmailTemplateEngine {
  private templates: Map<TemplateType, string> = new Map();

  constructor() {
    // Templates will be loaded when needed
  }

  private async loadTemplate(templateType: TemplateType): Promise<string> {
    if (this.templates.has(templateType)) {
      return this.templates.get(templateType)!;
    }

    try {
      // Read the HTML template file
      const templatePath = `./templates/${templateType}.html`;
      const template = await Deno.readTextFile(templatePath);
      this.templates.set(templateType, template);
      return template;
    } catch (error) {
      console.error(`Failed to load template ${templateType}:`, error);
      // Fallback to basic template
      return this.getBasicTemplate();
    }
  }

  private getBasicTemplate(): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>{{subject}}</title>
          <style>
              body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f4; }
              .container { max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
              h1 { color: #333; margin-top: 0; }
              p { color: #666; line-height: 1.6; }
              .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 14px; color: #999; }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>Hello {{recipientName}}!</h1>
              <div>{{content}}</div>
              <div class="footer">
                  <p><strong>Moves International</strong><br>
                  Your trusted partner in international education</p>
                  <p style="font-size: 12px;">
                      This email was sent to you because you opted in to receive updates from Moves International.<br>
                      If you no longer wish to receive these emails, please contact us.
                  </p>
              </div>
          </div>
      </body>
      </html>
    `;
  }

  private replaceTemplateVariables(template: string, data: EmailTemplateData): string {
    let html = template;
    
    // Replace all template variables
    html = html.replace(/\{\{recipientName\}\}/g, data.recipientName);
    html = html.replace(/\{\{subject\}\}/g, data.subject);
    
    // Process content - convert line breaks to paragraphs for better HTML formatting
    const processedContent = this.processContent(data.content);
    html = html.replace(/\{\{content\}\}/g, processedContent);
    
    return html;
  }

  private processContent(content: string): string {
    // Split content into paragraphs and wrap each in <p> tags
    const paragraphs = content.split('\n\n').filter(p => p.trim());
    
    if (paragraphs.length === 0) {
      return `<p>${content.replace(/\n/g, '<br>')}</p>`;
    }
    
    return paragraphs
      .map(paragraph => `<p>${paragraph.replace(/\n/g, '<br>')}</p>`)
      .join('');
  }

  async renderTemplate(
    templateType: TemplateType, 
    data: EmailTemplateData
  ): Promise<string> {
    const template = await this.loadTemplate(templateType);
    return this.replaceTemplateVariables(template, data);
  }

  getAvailableTemplates(): TemplateType[] {
    return ['newsletter', 'announcement', 'promotional'];
  }
}

export const emailTemplateEngine = new EmailTemplateEngine();