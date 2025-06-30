
import React from 'react';
import { useNode } from '@craftjs/core';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface DividerBlockProps {
  color?: string;
  thickness?: number;
  style?: 'solid' | 'dashed' | 'dotted';
  marginTop?: number;
  marginBottom?: number;
}

export const DividerBlock: React.FC<DividerBlockProps> = ({
  color = '#e2e8f0',
  thickness = 1,
  style = 'solid',
  marginTop = 20,
  marginBottom = 20
}) => {
  const { connectors: { connect, drag } } = useNode();

  return (
    <div
      ref={(ref: HTMLDivElement) => connect(drag(ref))}
      className="cursor-move"
      style={{
        marginTop: `${marginTop}px`,
        marginBottom: `${marginBottom}px`
      }}
    >
      <hr
        style={{
          border: 'none',
          borderTop: `${thickness}px ${style} ${color}`,
          margin: 0
        }}
      />
    </div>
  );
};

export const DividerBlockSettings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({
    props: node.data.props
  }));

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="color">Divider Color</Label>
        <Input
          id="color"
          type="color"
          value={props.color}
          onChange={(e) => setProp((props: DividerBlockProps) => props.color = e.target.value)}
          className="mt-1"
        />
      </div>
      
      <div>
        <Label htmlFor="thickness">Thickness (px)</Label>
        <Input
          id="thickness"
          type="number"
          min="1"
          max="10"
          value={props.thickness}
          onChange={(e) => setProp((props: DividerBlockProps) => props.thickness = parseInt(e.target.value))}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="style">Line Style</Label>
        <select
          id="style"
          value={props.style}
          onChange={(e) => setProp((props: DividerBlockProps) => props.style = e.target.value as any)}
          className="mt-1 w-full p-2 border rounded"
        >
          <option value="solid">Solid</option>
          <option value="dashed">Dashed</option>
          <option value="dotted">Dotted</option>
        </select>
      </div>

      <div>
        <Label htmlFor="marginTop">Top Margin (px)</Label>
        <Input
          id="marginTop"
          type="number"
          value={props.marginTop}
          onChange={(e) => setProp((props: DividerBlockProps) => props.marginTop = parseInt(e.target.value))}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="marginBottom">Bottom Margin (px)</Label>
        <Input
          id="marginBottom"
          type="number"
          value={props.marginBottom}
          onChange={(e) => setProp((props: DividerBlockProps) => props.marginBottom = parseInt(e.target.value))}
          className="mt-1"
        />
      </div>
    </div>
  );
};

(DividerBlock as any).craft = {
  props: {
    color: '#e2e8f0',
    thickness: 1,
    style: 'solid',
    marginTop: 20,
    marginBottom: 20
  },
  related: {
    settings: DividerBlockSettings
  }
};
