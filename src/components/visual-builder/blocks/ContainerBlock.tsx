
import React from 'react';
import { useNode } from '@craftjs/core';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ContainerBlockProps {
  background?: string;
  padding?: number;
  margin?: number;
  flexDirection?: 'row' | 'column';
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  children?: React.ReactNode;
}

export const ContainerBlock: React.FC<ContainerBlockProps> = ({
  background = '#ffffff',
  padding = 20,
  margin = 0,
  flexDirection = 'column',
  justifyContent = 'flex-start',
  alignItems = 'stretch',
  children
}) => {
  const { connectors: { connect, drag } } = useNode();

  return (
    <div
      ref={(ref: HTMLDivElement) => connect(drag(ref))}
      style={{
        background,
        padding: `${padding}px`,
        margin: `${margin}px 0`,
        display: 'flex',
        flexDirection,
        justifyContent,
        alignItems,
        minHeight: '100px',
        border: '2px dashed #e2e8f0',
        borderRadius: '4px',
        cursor: 'move'
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
        <Label htmlFor="background">Background Color</Label>
        <Input
          id="background"
          type="color"
          value={props.background}
          onChange={(e) => setProp((props: ContainerBlockProps) => props.background = e.target.value)}
          className="mt-1"
        />
      </div>
      
      <div>
        <Label htmlFor="padding">Padding (px)</Label>
        <Input
          id="padding"
          type="number"
          value={props.padding}
          onChange={(e) => setProp((props: ContainerBlockProps) => props.padding = parseInt(e.target.value))}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="margin">Margin (px)</Label>
        <Input
          id="margin"
          type="number"
          value={props.margin}
          onChange={(e) => setProp((props: ContainerBlockProps) => props.margin = parseInt(e.target.value))}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="flexDirection">Direction</Label>
        <select
          id="flexDirection"
          value={props.flexDirection}
          onChange={(e) => setProp((props: ContainerBlockProps) => props.flexDirection = e.target.value as any)}
          className="mt-1 w-full p-2 border rounded"
        >
          <option value="row">Row</option>
          <option value="column">Column</option>
        </select>
      </div>

      <div>
        <Label htmlFor="justifyContent">Justify Content</Label>
        <select
          id="justifyContent"
          value={props.justifyContent}
          onChange={(e) => setProp((props: ContainerBlockProps) => props.justifyContent = e.target.value as any)}
          className="mt-1 w-full p-2 border rounded"
        >
          <option value="flex-start">Start</option>
          <option value="center">Center</option>
          <option value="flex-end">End</option>
          <option value="space-between">Space Between</option>
          <option value="space-around">Space Around</option>
        </select>
      </div>

      <div>
        <Label htmlFor="alignItems">Align Items</Label>
        <select
          id="alignItems"
          value={props.alignItems}
          onChange={(e) => setProp((props: ContainerBlockProps) => props.alignItems = e.target.value as any)}
          className="mt-1 w-full p-2 border rounded"
        >
          <option value="flex-start">Start</option>
          <option value="center">Center</option>
          <option value="flex-end">End</option>
          <option value="stretch">Stretch</option>
        </select>
      </div>
    </div>
  );
};

(ContainerBlock as any).craft = {
  props: {
    background: '#ffffff',
    padding: 20,
    margin: 0,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  related: {
    settings: ContainerBlockSettings
  },
  rules: {
    canDrag: () => true,
    canDrop: () => true,
    canMoveIn: () => true,
    canMoveOut: () => true
  }
};
