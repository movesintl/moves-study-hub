
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
  const { connectors: { connect, drag }, selected } = useNode((state) => ({
    selected: state.events.selected
  }));

  return (
    <div
      ref={(ref: HTMLDivElement) => connect(drag(ref))}
      className={`cursor-pointer p-2 ${selected ? 'ring-2 ring-blue-500' : ''}`}
      style={{
        fontSize: `${fontSize}px`,
        color: color
      }}
    >
      {text}
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
