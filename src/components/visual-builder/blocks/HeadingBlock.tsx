
import React from 'react';
import { useNode } from '@craftjs/core';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface HeadingBlockProps {
  text?: string;
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  color?: string;
  textAlign?: 'left' | 'center' | 'right';
  marginTop?: number;
  marginBottom?: number;
}

export const HeadingBlock: React.FC<HeadingBlockProps> = ({
  text = 'Heading Text',
  level = 'h2',
  color = '#000000',
  textAlign = 'left',
  marginTop = 10,
  marginBottom = 10
}) => {
  const { connectors: { connect, drag } } = useNode();

  const Component = level;

  const getHeadingStyles = () => {
    const baseStyles = {
      color,
      textAlign,
      marginTop: `${marginTop}px`,
      marginBottom: `${marginBottom}px`,
      cursor: 'move'
    };

    switch (level) {
      case 'h1':
        return { ...baseStyles, fontSize: '36px', fontWeight: 'bold' };
      case 'h2':
        return { ...baseStyles, fontSize: '30px', fontWeight: 'bold' };
      case 'h3':
        return { ...baseStyles, fontSize: '24px', fontWeight: 'bold' };
      case 'h4':
        return { ...baseStyles, fontSize: '20px', fontWeight: 'bold' };
      case 'h5':
        return { ...baseStyles, fontSize: '18px', fontWeight: 'bold' };
      case 'h6':
        return { ...baseStyles, fontSize: '16px', fontWeight: 'bold' };
      default:
        return baseStyles;
    }
  };

  return (
    <Component
      ref={(ref: HTMLElement) => connect(drag(ref))}
      style={getHeadingStyles()}
    >
      {text}
    </Component>
  );
};

export const HeadingBlockSettings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({
    props: node.data.props
  }));

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="text">Heading Text</Label>
        <Input
          id="text"
          value={props.text}
          onChange={(e) => setProp((props: HeadingBlockProps) => props.text = e.target.value)}
          className="mt-1"
        />
      </div>
      
      <div>
        <Label htmlFor="level">Heading Level</Label>
        <select
          id="level"
          value={props.level}
          onChange={(e) => setProp((props: HeadingBlockProps) => props.level = e.target.value as any)}
          className="mt-1 w-full p-2 border rounded"
        >
          <option value="h1">H1 - Main Title</option>
          <option value="h2">H2 - Section Title</option>
          <option value="h3">H3 - Subsection</option>
          <option value="h4">H4 - Minor Heading</option>
          <option value="h5">H5 - Small Heading</option>
          <option value="h6">H6 - Tiny Heading</option>
        </select>
      </div>

      <div>
        <Label htmlFor="textAlign">Text Alignment</Label>
        <select
          id="textAlign"
          value={props.textAlign}
          onChange={(e) => setProp((props: HeadingBlockProps) => props.textAlign = e.target.value as any)}
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
          onChange={(e) => setProp((props: HeadingBlockProps) => props.color = e.target.value)}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="marginTop">Top Margin (px)</Label>
        <Input
          id="marginTop"
          type="number"
          value={props.marginTop}
          onChange={(e) => setProp((props: HeadingBlockProps) => props.marginTop = parseInt(e.target.value))}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="marginBottom">Bottom Margin (px)</Label>
        <Input
          id="marginBottom"
          type="number"
          value={props.marginBottom}
          onChange={(e) => setProp((props: HeadingBlockProps) => props.marginBottom = parseInt(e.target.value))}
          className="mt-1"
        />
      </div>
    </div>
  );
};

(HeadingBlock as any).craft = {
  props: {
    text: 'Heading Text',
    level: 'h2',
    color: '#000000',
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 10
  },
  related: {
    settings: HeadingBlockSettings
  }
};
