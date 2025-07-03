import React, { useRef, useEffect } from 'react';

interface PageRendererProps {
  data: string;
}

export const PageRenderer: React.FC<PageRendererProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !data) return;

    try {
      // Parse visual builder data
      const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
      
      // Check if it's GrapesJS format (has html/css properties)
      if (parsedData.html !== undefined) {
        const html = parsedData.html || '';
        const css = parsedData.css || '';
        
        // Clear container first
        containerRef.current.innerHTML = '';
        
        // Add CSS if present
        if (css) {
          const styleEl = document.createElement('style');
          styleEl.textContent = css;
          containerRef.current.appendChild(styleEl);
        }
        
        // Add HTML content
        if (html) {
          const contentDiv = document.createElement('div');
          contentDiv.innerHTML = html;
          containerRef.current.appendChild(contentDiv);
        }
      } 
      // Check if it's Craft.js format (has ROOT property with nodes)
      else if (parsedData.ROOT) {
        // For now, render a simple representation
        // This would need a proper Craft.js renderer in a real implementation
        const renderCraftNodes = (nodeId: string, nodes: any): string => {
          const node = nodes[nodeId];
          if (!node) return '';
          
          let content = '';
          
          if (node.type?.resolvedName === 'TextBlock') {
            const text = node.props?.text || '';
            const fontSize = node.props?.fontSize || 16;
            const color = node.props?.color || '#000000';
            content = `<div style="font-size: ${fontSize}px; color: ${color}; margin-bottom: 1rem;">${text}</div>`;
          } else if (node.type?.resolvedName === 'ContainerBlock') {
            const padding = node.props?.padding || 0;
            const background = node.props?.background || 'transparent';
            const childContent = (node.nodes || []).map((childId: string) => 
              renderCraftNodes(childId, nodes)
            ).join('');
            content = `<div style="padding: ${padding}px; background: ${background}; margin-bottom: 1rem;">${childContent}</div>`;
          } else if (node.type?.resolvedName === 'SpacerBlock') {
            const height = node.props?.height || 20;
            content = `<div style="height: ${height}px;"></div>`;
          }
          
          return content;
        };
        
        const html = renderCraftNodes('ROOT', parsedData);
        containerRef.current.innerHTML = html;
      }
      // Fallback for other formats
      else {
        containerRef.current.innerHTML = `
          <div class="p-8 text-center">
            <h2 class="text-xl font-semibold mb-4">Visual Builder Content</h2>
            <p class="text-gray-600">This page was created using the visual builder.</p>
          </div>
        `;
      }
    } catch (error) {
      console.error('Failed to render page data:', error);
      // Final fallback: try to render as plain HTML or show error message
      if (containerRef.current) {
        try {
          containerRef.current.innerHTML = data;
        } catch {
          containerRef.current.innerHTML = `
            <div class="p-8 text-center">
              <h2 class="text-xl font-semibold mb-4">Content Unavailable</h2>
              <p class="text-gray-600">Unable to render visual builder content.</p>
            </div>
          `;
        }
      }
    }
  }, [data]);

  return (
    <div 
      ref={containerRef} 
      className="w-full min-h-screen"
      style={{ 
        fontFamily: 'inherit',
        lineHeight: 'inherit',
        color: 'inherit' 
      }}
    />
  );
};