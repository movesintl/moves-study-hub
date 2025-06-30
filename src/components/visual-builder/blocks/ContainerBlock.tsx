
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
  const { connectors: { connect, drag }, selected } = useNode((state) => ({
    selected: state.events.selected
  }));

  return (
    <div
      ref={(ref: HTMLDivElement) => connect(drag(ref))}
      className={`min-h-[50px] ${selected ? 'ring-2 ring-blue-500' : 'border border-dashed border-gray-300'}`}
      style={{
        padding: `${padding}px`,
        margin: `${margin}px`,
        backgroundColor: background
      }}
    >
      {children}
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
