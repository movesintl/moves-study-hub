
import React from 'react';
import { useNode } from '@craftjs/core';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ContainerBlockProps {
  padding?: number;
  margin?: number;
  background?: string;
  children?: React.ReactNode;
}

export const ContainerBlock: React.FC<ContainerBlockProps> = ({
  padding = 16,
  margin = 0,
  background = "#ffffff",
  children
}) => {
  const { 
    connectors: { connect, drag }, 
    selected,
    hovered,
    actions: { setProp }
  } = useNode((state) => ({
    selected: state.events.selected,
    hovered: state.events.hovered
  }));

  return (
    <div
      ref={(ref) => {
        if (ref) {
          connect(drag(ref));
        }
      }}
      className={`min-h-[100px] w-full transition-all duration-200 relative ${
        selected 
          ? 'ring-2 ring-blue-500 ring-offset-2' 
          : hovered 
          ? 'ring-1 ring-blue-300' 
          : 'border-2 border-dashed border-gray-300 hover:border-gray-400'
      }`}
      style={{
        padding: `${padding}px`,
        margin: `${margin}px`,
        backgroundColor: background
      }}
      onClick={(e) => {
        e.stopPropagation();
        // Don't trigger any auto-save, just selection
      }}
    >
      {children && React.Children.count(children) > 0 ? (
        children
      ) : (
        <div className="text-gray-400 text-center py-8 pointer-events-none select-none">
          Drop components here
        </div>
      )}
      
      {selected && (
        <div className="absolute top-0 left-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-br">
          Container
        </div>
      )}
    </div>
  );
};

export const ContainerBlockSettings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({
    props: node.data.props
  }));

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="padding">Padding</Label>
        <Input
          id="padding"
          type="number"
          value={props.padding}
          onChange={(e) => setProp((props: ContainerBlockProps) => props.padding = parseInt(e.target.value))}
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="margin">Margin</Label>
        <Input
          id="margin"
          type="number"
          value={props.margin}
          onChange={(e) => setProp((props: ContainerBlockProps) => props.margin = parseInt(e.target.value))}
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="background">Background Color</Label>
        <Input
          id="background"
          type="color"
          value={props.background}
          onChange={(e) => setProp((props: ContainerBlockProps) => props.background = e.target.value)}
          className="mt-1"
        />
      </div>
    </div>
  );
};

(ContainerBlock as any).craft = {
  props: {
    padding: 16,
    margin: 0,
    background: "#ffffff"
  },
  related: {
    settings: ContainerBlockSettings
  }
};
