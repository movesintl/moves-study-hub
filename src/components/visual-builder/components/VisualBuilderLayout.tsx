import React from 'react';

interface VisualBuilderLayoutProps {
  editorRef: React.RefObject<HTMLDivElement>;
}

export const VisualBuilderLayout: React.FC<VisualBuilderLayoutProps> = ({ editorRef }) => {
  return (
    <div className="flex-1 flex">
      {/* Left Panel - Components */}
      <div className="w-72 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">Components</h3>
          <p className="text-xs text-gray-600 mt-1">Drag components to the canvas</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div id="blocks-container" className="p-4"></div>
        </div>
      </div>

      {/* Main Editor */}
      <div className="flex-1 relative">
        <div ref={editorRef} className="h-full" />
      </div>

      {/* Right Panel - Properties & Settings */}
      <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
        <div className="border-b border-gray-200">
          <div className="panel__switcher bg-gray-50"></div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3 text-sm uppercase tracking-wide">Layers</h4>
                <div id="layers-container" className="border border-gray-200 rounded-lg min-h-[200px] max-h-[300px] bg-gray-50 overflow-y-auto overflow-x-hidden"></div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3 text-sm uppercase tracking-wide">Styles</h4>
                <div id="styles-container" className="border border-gray-200 rounded-lg min-h-[200px] bg-gray-50"></div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3 text-sm uppercase tracking-wide">Settings</h4>
                <div id="traits-container" className="border border-gray-200 rounded-lg min-h-[150px] bg-gray-50"></div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3 text-sm uppercase tracking-wide">Selectors</h4>
                <div id="selectors-container" className="border border-gray-200 rounded-lg min-h-[100px] bg-gray-50"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};