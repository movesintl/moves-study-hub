import React, { useRef, useEffect } from 'react';

interface PageRendererProps {
  data: string;
}

export const PageRenderer: React.FC<PageRendererProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !data) return;

    try {
      // Parse GrapesJS data
      const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
      
      // Extract HTML and CSS
      const html = parsedData.html || '';
      const css = parsedData.css || '';
      
      // Create a style element for the CSS
      const styleEl = document.createElement('style');
      styleEl.textContent = css;
      
      // Set the HTML content
      containerRef.current.innerHTML = html;
      
      // Append CSS to the container
      if (css && containerRef.current.firstChild) {
        containerRef.current.insertBefore(styleEl, containerRef.current.firstChild);
      }
    } catch (error) {
      console.error('Failed to render page data:', error);
      // Fallback: try to render as plain HTML
      if (containerRef.current) {
        containerRef.current.innerHTML = data;
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