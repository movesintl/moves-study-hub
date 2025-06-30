
import React from 'react';
import { Editor, Frame } from '@craftjs/core';
import { TextBlock } from './blocks/TextBlock';
import { ImageBlock } from './blocks/ImageBlock';
import { ContainerBlock } from './blocks/ContainerBlock';

interface PageRendererProps {
  data: string;
}

export const PageRenderer: React.FC<PageRendererProps> = ({ data }) => {
  return (
    <Editor
      resolver={{
        TextBlock,
        ImageBlock,
        ContainerBlock
      }}
      enabled={false}
    >
      <Frame data={data} />
    </Editor>
  );
};
