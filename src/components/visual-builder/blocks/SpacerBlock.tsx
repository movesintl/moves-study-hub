
import React from 'react';
import { useNode } from '@craftjs/core';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SpacerBlockProps {
  height?: number;
}

export const SpacerBlock: React.FC<SpacerBlockProps> = ({
  height = 40
}) => {
  const { connectors: { connect, drag } } = useNode();

  return (
    <div
      ref={(ref: HTMLDivElement) => connect(drag(ref))}
      className="cursor-move border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-500 text-sm"
      style={{
        height: `${height}px`,
        minWidth: '100%'
      }}
    >
      Spacer ({height}px)
    </div>
  );
};

export const SpacerBlockSettings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({
    props: node.data.props
  }));

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="height">Height (px)</Label>
        <Input
          id="height"
          type="number"
          min="10"
          max="500"
          value={props.height}
          onChange={(e) => setProp((props: SpacerBlockProps) => props.height = parseInt(e.target.value))}
          className="mt-1"
        />
      </div>
    </div>
  );
};

(SpacerBlock as any).craft = {
  props: {
    height: 40
  },
  related: {
    settings: SpacerBlockSettings
  }
};
