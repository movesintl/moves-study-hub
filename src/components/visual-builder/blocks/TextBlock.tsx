
import React from 'react';
import { useNode } from '@craftjs/core';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface TextBlockProps {
  text?: string;
  fontSize?: number;
  color?: string;
}

export const TextBlock: React.FC<TextBlockProps> = ({
  text = "Click to edit text",
  fontSize = 16,
  color = "#000000"
}) => {
  const { 
    connectors: { connect, drag }, 
    selected,
    hovered 
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
      className={`cursor-pointer p-2 transition-all duration-200 relative ${
        selected 
          ? 'ring-2 ring-blue-500 ring-offset-2' 
          : hovered 
          ? 'ring-1 ring-blue-300' 
          : 'hover:ring-1 hover:ring-gray-300'
      }`}
      style={{
        fontSize: `${fontSize}px`,
        color: color
      }}
      onClick={(e) => {
        e.stopPropagation();
        // Don't trigger any auto-save, just selection
      }}
    >
      {text}
      {selected && (
        <div className="absolute top-0 left-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-br">
          Text
        </div>
      )}
    </div>
  );
};

export const TextBlockSettings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({
    props: node.data.props
  }));

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="text">Text Content</Label>
        <Textarea
          id="text"
          value={props.text}
          onChange={(e) => setProp((props: TextBlockProps) => props.text = e.target.value)}
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="fontSize">Font Size</Label>
        <Input
          id="fontSize"
          type="number"
          value={props.fontSize}
          onChange={(e) => setProp((props: TextBlockProps) => props.fontSize = parseInt(e.target.value))}
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="color">Text Color</Label>
        <Input
          id="color"
          type="color"
          value={props.color}
          onChange={(e) => setProp((props: TextBlockProps) => props.color = e.target.value)}
          className="mt-1"
        />
      </div>
    </div>
  );
};

(TextBlock as any).craft = {
  props: {
    text: "Click to edit text",
    fontSize: 16,
    color: "#000000"
  },
  related: {
    settings: TextBlockSettings
  }
};
