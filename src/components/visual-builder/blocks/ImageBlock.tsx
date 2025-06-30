
import React from 'react';
import { useNode } from '@craftjs/core';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ImageBlockProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
}

export const ImageBlock: React.FC<ImageBlockProps> = ({
  src = "https://via.placeholder.com/300x200",
  alt = "Image",
  width = 300,
  height = 200
}) => {
  const { connectors: { connect, drag }, selected } = useNode((state) => ({
    selected: state.events.selected
  }));

  return (
    <div
      ref={(ref: HTMLDivElement) => connect(drag(ref))}
      className={`cursor-pointer ${selected ? 'ring-2 ring-blue-500' : ''}`}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="max-w-full h-auto"
      />
    </div>
  );
};

export const ImageBlockSettings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({
    props: node.data.props
  }));

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="src">Image URL</Label>
        <Input
          id="src"
          value={props.src}
          onChange={(e) => setProp((props: ImageBlockProps) => props.src = e.target.value)}
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="alt">Alt Text</Label>
        <Input
          id="alt"
          value={props.alt}
          onChange={(e) => setProp((props: ImageBlockProps) => props.alt = e.target.value)}
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="width">Width</Label>
        <Input
          id="width"
          type="number"
          value={props.width}
          onChange={(e) => setProp((props: ImageBlockProps) => props.width = parseInt(e.target.value))}
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="height">Height</Label>
        <Input
          id="height"
          type="number"
          value={props.height}
          onChange={(e) => setProp((props: ImageBlockProps) => props.height = parseInt(e.target.value))}
          className="mt-1"
        />
      </div>
    </div>
  );
};

(ImageBlock as any).craft = {
  props: {
    src: "https://via.placeholder.com/300x200",
    alt: "Image",
    width: 300,
    height: 200
  },
  related: {
    settings: ImageBlockSettings
  }
};
