import React, { useEffect, useRef, useState } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import 'grapesjs-preset-newsletter';
import 'grapesjs-blocks-basic';

interface EmailCanvasProps {
  initialContent?: string;
  onSave?: (data: { html: string; css: string; components: any }) => void;
  onContentChange?: (content: string) => void;
}

const EmailCanvas: React.FC<EmailCanvasProps> = ({
  initialContent = '',
  onSave,
  onContentChange
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [editor, setEditor] = useState<any>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!editorRef.current || isInitialized) return;

    const grapesEditor = grapesjs.init({
      container: editorRef.current,
      height: '100%',
      width: 'auto',
      storageManager: false,
      plugins: ['grapesjs-preset-newsletter'],
      pluginsOpts: {
        'grapesjs-preset-newsletter': {
          modalTitleImport: 'Import template',
          modalTitleExport: 'Export template',
          codeViewerTheme: 'hopscotch',
          defaultTemplate: initialContent || `
            <div style="margin: 0 auto; max-width: 600px; font-family: Arial, sans-serif;">
              <div style="background-color: #f8f9fa; padding: 20px; text-align: center;">
                <h1 style="color: #333; margin: 0;">Your Email Title</h1>
              </div>
              <div style="padding: 30px 20px;">
                <p style="color: #666; line-height: 1.6; margin: 0 0 20px 0;">
                  Start building your email campaign here. Drag and drop elements from the sidebar to create your perfect email.
                </p>
                <div style="text-align: center; margin: 30px 0;">
                  <a href="#" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
                    Call to Action
                  </a>
                </div>
              </div>
              <div style="background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666;">
                <p style="margin: 0;">© 2024 Your Company. All rights reserved.</p>
                <p style="margin: 5px 0 0 0;">
                  <a href="#" style="color: #007bff;">Unsubscribe</a> | 
                  <a href="#" style="color: #007bff;">Update Preferences</a>
                </p>
              </div>
            </div>
          `
        }
      },
      canvas: {
        styles: [
          'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
        ]
      },
      deviceManager: {
        devices: [
          {
            name: 'Desktop',
            width: '600px',
            widthMedia: '1200px'
          },
          {
            name: 'Tablet',
            width: '768px',
            widthMedia: '768px'
          },
          {
            name: 'Mobile',
            width: '320px',
            widthMedia: '480px'
          }
        ]
      },
      panels: {
        defaults: [
          {
            id: 'layers',
            el: '.layers-container',
            resizable: {
              maxDim: 350,
              minDim: 200,
              tc: false,
              cl: false,
              cr: true,
              bc: false,
              keyWidth: 'flex-basis',
            },
          },
          {
            id: 'styles',
            el: '.styles-container',
            resizable: {
              maxDim: 350,
              minDim: 200,
              tc: false,
              cl: false,
              cr: true,
              bc: false,
              keyWidth: 'flex-basis',
            },
          },
          {
            id: 'traits',
            el: '.traits-container',
            resizable: {
              maxDim: 350,
              minDim: 200,
              tc: false,
              cl: false,
              cr: true,
              bc: false,
              keyWidth: 'flex-basis',
            },
          },
          {
            id: 'blocks',
            el: '.blocks-container',
            resizable: {
              maxDim: 350,
              minDim: 200,
              tc: false,
              cl: true,
              cr: false,
              bc: false,
              keyWidth: 'flex-basis',
            },
          }
        ]
      }
    });

    // Add custom email blocks
    grapesEditor.BlockManager.add('personalization-token', {
      label: 'Name Token',
      category: 'Personalization',
      content: '<span style="background-color: #e3f2fd; padding: 2px 6px; border-radius: 3px; font-size: 14px;">{{FirstName}}</span>',
      attributes: { class: 'fa fa-user' }
    });

    grapesEditor.BlockManager.add('email-token', {
      label: 'Email Token',
      category: 'Personalization',
      content: '<span style="background-color: #e8f5e8; padding: 2px 6px; border-radius: 3px; font-size: 14px;">{{Email}}</span>',
      attributes: { class: 'fa fa-envelope' }
    });

    grapesEditor.BlockManager.add('unsubscribe-link', {
      label: 'Unsubscribe Link',
      category: 'Compliance',
      content: '<a href="{{UnsubscribeURL}}" style="color: #666; text-decoration: underline; font-size: 12px;">Unsubscribe</a>',
      attributes: { class: 'fa fa-unlink' }
    });

    grapesEditor.BlockManager.add('social-links', {
      label: 'Social Links',
      category: 'Social',
      content: `
        <div style="text-align: center; margin: 20px 0;">
          <a href="#" style="display: inline-block; margin: 0 10px;">
            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTI0IDEyLjA3M0MyNCA1LjQwNSAxOC42MjcgMCAxMi4wNzMgMEM1LjQwNSAwIDAgNS40MDUgMCAxMi4wNzNDMCAyMS4yIDIuNzkgMjIuNSA2IDIyLjVWMTQuNzVIMi4zVjEyLjA3M0g2VjkuNDA1QzYgNi4xNCA3LjcgNSAxMC43IDVIMTMuNVY3LjY0SDE1VjEwLjI3SDE2LjMwN1YxMi4wNzNIMTYuNTU1VjE0Ljc1SDE4VjIyLjVDMjEuMTkgMjIuNSAyNCAyMS4xOTUgMjQgMTIuMDczWiIgZmlsbD0iIzE4NzdGMiIvPgo8L3N2Zz4K" alt="Facebook" style="width: 24px; height: 24px;" />
          </a>
          <a href="#" style="display: inline-block; margin: 0 10px;">
            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIzLjk1MyA0LjU3QTEwIDEwIDAgMDEyMS40NDQgNC44ODNBNy44NzQgNy44NzQgMCAwMDIzLjMzNyAzLjYwOEExNS43MTggMTUuNzE4IDAgMDEyMS43NDcgNi4zNzNBNy44NzUgNy44NzUgMCAwMTEzLjgyMyA4LjQ4NEE3Ljg3NSA3Ljg3NSAwIDEgMSAxMy44MjMgOC40ODRDNi41ODIgMTEuMSAzLjkgMTYuNiAwIDI0QzEuNSAyMS4zIDQuNSAxOS44IDguNCAxOC42QzEzLjIgMTYuOSAxNi45IDE0LjEgMTguNyA5LjMiIGZpbGw9IiMxREE1RjIiLz4KPC9zdmc+" alt="Twitter" style="width: 24px; height: 24px;" />
          </a>
          <a href="#" style="display: inline-block; margin: 0 10px;">
            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiByeD0iNSIgZmlsbD0idXJsKCNwYWludDBfbGluZWFyKSIvPgo8cGF0aCBkPSJNMTUgMTJBNCA0IDAgMSAxIDcgMTJBNCA0IDAgMCAxIDE1IDEyWiIgZmlsbD0id2hpdGUiLz4KPGNpcmNsZSBjeD0iMTYiIGN5PSI2IiByPSIyIiBmaWxsPSJ3aGl0ZSIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDBfbGluZWFyIiB4MT0iMjEiIHkxPSIyMSIgeDI9IjIiIHkyPSIyIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiNGRkRCMDAiLz4KPHN0b3Agb2Zmc2V0PSIwLjUiIHN0b3AtY29sb3I9IiNGRjAwMDAiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRkY0MDgwIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+" alt="Instagram" style="width: 24px; height: 24px;" />
          </a>
        </div>
      `,
      attributes: { class: 'fa fa-share-alt' }
    });

    // Listen for content changes
    grapesEditor.on('component:update', () => {
      const html = grapesEditor.getHtml();
      onContentChange?.(html);
    });

    setEditor(grapesEditor);
    setIsInitialized(true);

    return () => {
      if (grapesEditor) {
        grapesEditor.destroy();
      }
    };
  }, [isInitialized, initialContent, onContentChange]);

  const handleSave = () => {
    if (!editor) return;

    const html = editor.getHtml();
    const css = editor.getCss();
    const components = editor.getComponents();

    onSave?.({
      html,
      css,
      components: components.toJSON()
    });
  };

  const handlePreview = () => {
    if (!editor) return;
    
    const html = editor.getHtml();
    const css = editor.getCss();
    const previewContent = `
      <html>
        <head>
          <style>${css}</style>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 20px; background-color: #f5f5f5;">
          ${html}
        </body>
      </html>
    `;
    
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(previewContent);
      newWindow.document.close();
    }
  };

  return (
    <div className="h-full w-full flex flex-col">
      {/* Toolbar */}
      <div className="bg-card border-b border-border p-4 flex justify-between items-center">
        <div className="flex gap-2">
          <button 
            onClick={handlePreview}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors"
          >
            Preview
          </button>
          <button 
            onClick={handleSave}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/80 transition-colors"
          >
            Save Campaign
          </button>
        </div>
      </div>

      {/* Editor Layout */}
      <div className="flex-1 flex">
        {/* Sidebar - Blocks */}
        <div className="w-64 bg-card border-r border-border">
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold text-sm">Email Elements</h3>
          </div>
          <div className="blocks-container h-full"></div>
        </div>

        {/* Main Canvas */}
        <div className="flex-1 relative">
          <div ref={editorRef} className="h-full w-full"></div>
        </div>

        {/* Right Sidebar - Properties */}
        <div className="w-64 bg-card border-l border-border flex flex-col">
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold text-sm">Layers</h3>
          </div>
          <div className="layers-container flex-1 min-h-0"></div>
          
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold text-sm">Styles</h3>
          </div>
          <div className="styles-container flex-1 min-h-0"></div>
          
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold text-sm">Settings</h3>
          </div>
          <div className="traits-container flex-1 min-h-0"></div>
        </div>
      </div>
    </div>
  );
};

export default EmailCanvas;