
import React from 'react';
import { useNode } from '@craftjs/core';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ImageBlockProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

export const ImageBlock: React.FC<ImageBlockProps> = ({
  src = 'https://via.placeholder.com/400x200',
  alt = 'Image',
  width = 400,
  height = 200,
  objectFit = 'cover'
}) => {
  const { connectors: { connect, drag } } = useNode();

  return (
    <div
      ref={(ref: HTMLDivElement) => connect(drag(ref))}
      className="cursor-move"
      style={{ margin: '10px 0' }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          objectFit,
          borderRadius: '4px'
        }}
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
          placeholder="https://example.com/image.jpg"
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
        <Label htmlFor="width">Width (px)</Label>
        <Input
          id="width"
          type="number"
          value={props.width}
          onChange={(e) => setProp((props: ImageBlockProps) => props.width = parseInt(e.target.value))}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="height">Height (px)</Label>
        <Input
          id="height"
          type="number"
          value={props.height}
          onChange={(e) => setProp((props: ImageBlockProps) => props.height = parseInt(e.target.value))}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="objectFit">Object Fit</Label>
        <select
          id="objectFit"
          value={props.objectFit}
          onChange={(e) => setProp((props: ImageBlockProps) => props.objectFit = e.target.value as any)}
          className="mt-1 w-full p-2 border rounded"
        >
          <option value="cover">Cover</option>
          <option value="contain">Contain</option>
          <option value="fill">Fill</option>
          <option value="none">None</option>
          <option value="scale-down">Scale Down</option>
        </select>
      </div>
    </div>
  );
};

ImageBlock.craft = {
  props: {
    src: 'https://via.placeholder.com/400x200',
    alt: 'Image',
    width: 400,
    height: 200,
    objectFit: 'cover'
  },
  related: {
    settings: ImageBlockSettings
  }
};
