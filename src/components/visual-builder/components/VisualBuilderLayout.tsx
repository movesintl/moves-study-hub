import React from 'react';

interface VisualBuilderLayoutProps {
  editorRef: React.RefObject<HTMLDivElement>;
}

export const VisualBuilderLayout: React.FC<VisualBuilderLayoutProps> = ({ editorRef }) => {
  return (
    <div className="flex-1 flex">
      {/* Left Panel - Components */}
      <div className="w-72 bg-card border-r border-border flex flex-col">
        <div className="p-4 border-b border-border bg-muted">
          <h3 className="font-semibold text-card-foreground text-sm uppercase tracking-wide">Components</h3>
          <p className="text-xs text-muted-foreground mt-1">Drag components to the canvas</p>
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
      <div className="w-80 bg-card border-l border-border flex flex-col">
        <div className="border-b border-border">
          <div className="panel__switcher bg-muted"></div>
        </div>
        <div className="flex-1 overflow-y-auto overflow-x-hidden max-h-screen">
          <div className="p-4">
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-card-foreground mb-3 text-sm uppercase tracking-wide">Layers</h4>
                <div id="layers-container" className="border border-border rounded-lg min-h-[200px] max-h-[300px] bg-muted overflow-y-auto overflow-x-hidden"></div>
              </div>
              <div>
                <h4 className="font-medium text-card-foreground mb-3 text-sm uppercase tracking-wide">Styles</h4>
                <div id="styles-container" className="border border-border rounded-lg min-h-[200px] bg-muted"></div>
              </div>
              <div>
                <h4 className="font-medium text-card-foreground mb-3 text-sm uppercase tracking-wide">Settings</h4>
                <div id="traits-container" className="border border-border rounded-lg min-h-[150px] bg-muted"></div>
              </div>
              <div>
                <h4 className="font-medium text-card-foreground mb-3 text-sm uppercase tracking-wide">Selectors</h4>
                <div id="selectors-container" className="border border-border rounded-lg min-h-[100px] bg-muted"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};