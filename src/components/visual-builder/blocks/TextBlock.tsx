
import React from 'react';
import { useNode } from '@craftjs/core';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface TextBlockProps {
  text?: string;
  fontSize?: number;
  textAlign?: 'left' | 'center' | 'right';
  color?: string;
  tagName?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const TextBlock: React.FC<TextBlockProps> = ({
  text = 'Edit this text',
  fontSize = 16,
  textAlign = 'left',
  color = '#000000',
  tagName = 'p'
}) => {
  const { connectors: { connect, drag } } = useNode();

  const Component = tagName;

  return (
    <Component
      ref={(ref: HTMLElement) => connect(drag(ref))}
      style={{
        fontSize: `${fontSize}px`,
        textAlign,
        color,
        margin: '10px 0',
        minHeight: '20px',
        cursor: 'move'
      }}
    >
      {text}
    </Component>
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
        <Label htmlFor="textAlign">Text Alignment</Label>
        <select
          id="textAlign"
          value={props.textAlign}
          onChange={(e) => setProp((props: TextBlockProps) => props.textAlign = e.target.value as any)}
          className="mt-1 w-full p-2 border rounded"
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
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

      <div>
        <Label htmlFor="tagName">HTML Tag</Label>
        <select
          id="tagName"
          value={props.tagName}
          onChange={(e) => setProp((props: TextBlockProps) => props.tagName = e.target.value as any)}
          className="mt-1 w-full p-2 border rounded"
        >
          <option value="p">Paragraph</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="h4">Heading 4</option>
          <option value="h5">Heading 5</option>
          <option value="h6">Heading 6</option>
        </select>
      </div>
    </div>
  );
};

TextBlock.craft = {
  props: {
    text: 'Edit this text',
    fontSize: 16,
    textAlign: 'left',
    color: '#000000',
    tagName: 'p'
  },
  related: {
    settings: TextBlockSettings
  }
};
