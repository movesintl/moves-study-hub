import React from 'react';

interface VisualBuilderLayoutProps {
  editorRef: React.RefObject<HTMLDivElement>;
}

export const VisualBuilderLayout: React.FC<VisualBuilderLayoutProps> = ({ editorRef }) => {
  return (
    <div className="flex-1 flex">
      {/* Left Panel - Blocks */}
      <div className="w-64 bg-gray-50 border-r p-4 overflow-y-auto">
        <h3 className="font-semibold mb-4 text-gray-800">Components</h3>
        <div id="blocks-container" className="space-y-2"></div>
      </div>

      {/* Main Editor */}
      <div className="flex-1 relative">
        <div ref={editorRef} className="h-full" />
      </div>

      {/* Right Panel - Properties */}
      <div className="w-80 bg-gray-50 border-l">
        <div className="panel__switcher p-2 border-b"></div>
        <div className="p-4">
          <div id="layers-container" className="layers-container mb-4"></div>
          <div id="styles-container" className="styles-container mb-4"></div>
          <div id="traits-container" className="traits-container mb-4"></div>
          <div id="selectors-container" className="selectors-container mb-4"></div>
        </div>
      </div>
    </div>
  );
};