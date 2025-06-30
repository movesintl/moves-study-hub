
import React from 'react';
import { useNode } from '@craftjs/core';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface ButtonBlockProps {
  text?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg';
  link?: string;
  backgroundColor?: string;
  textColor?: string;
}

export const ButtonBlock: React.FC<ButtonBlockProps> = ({
  text = 'Click me',
  variant = 'default',
  size = 'default',
  link = '',
  backgroundColor = '',
  textColor = ''
}) => {
  const { connectors: { connect, drag } } = useNode();

  const handleClick = () => {
    if (link) {
      window.open(link, '_blank');
    }
  };

  return (
    <div
      ref={(ref: HTMLDivElement) => connect(drag(ref))}
      className="cursor-move inline-block"
      style={{ margin: '10px 0' }}
    >
      <Button
        variant={variant}
        size={size}
        onClick={handleClick}
        style={{
          backgroundColor: backgroundColor || undefined,
          color: textColor || undefined
        }}
      >
        {text}
      </Button>
    </div>
  );
};

export const ButtonBlockSettings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({
    props: node.data.props
  }));

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="text">Button Text</Label>
        <Input
          id="text"
          value={props.text}
          onChange={(e) => setProp((props: ButtonBlockProps) => props.text = e.target.value)}
          className="mt-1"
        />
      </div>
      
      <div>
        <Label htmlFor="link">Link (URL)</Label>
        <Input
          id="link"
          value={props.link}
          onChange={(e) => setProp((props: ButtonBlockProps) => props.link = e.target.value)}
          className="mt-1"
          placeholder="https://example.com"
        />
      </div>

      <div>
        <Label htmlFor="variant">Button Style</Label>
        <select
          id="variant"
          value={props.variant}
          onChange={(e) => setProp((props: ButtonBlockProps) => props.variant = e.target.value as any)}
          className="mt-1 w-full p-2 border rounded"
        >
          <option value="default">Default</option>
          <option value="destructive">Destructive</option>
          <option value="outline">Outline</option>
          <option value="secondary">Secondary</option>
          <option value="ghost">Ghost</option>
          <option value="link">Link</option>
        </select>
      </div>

      <div>
        <Label htmlFor="size">Button Size</Label>
        <select
          id="size"
          value={props.size}
          onChange={(e) => setProp((props: ButtonBlockProps) => props.size = e.target.value as any)}
          className="mt-1 w-full p-2 border rounded"
        >
          <option value="sm">Small</option>
          <option value="default">Default</option>
          <option value="lg">Large</option>
        </select>
      </div>

      <div>
        <Label htmlFor="backgroundColor">Background Color</Label>
        <Input
          id="backgroundColor"
          type="color"
          value={props.backgroundColor}
          onChange={(e) => setProp((props: ButtonBlockProps) => props.backgroundColor = e.target.value)}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="textColor">Text Color</Label>
        <Input
          id="textColor"
          type="color"
          value={props.textColor}
          onChange={(e) => setProp((props: ButtonBlockProps) => props.textColor = e.target.value)}
          className="mt-1"
        />
      </div>
    </div>
  );
};

(ButtonBlock as any).craft = {
  props: {
    text: 'Click me',
    variant: 'default',
    size: 'default',
    link: '',
    backgroundColor: '',
    textColor: ''
  },
  related: {
    settings: ButtonBlockSettings
  }
};
