
import React from 'react';
import { Editor, Frame } from '@craftjs/core';
import { TextBlock } from './blocks/TextBlock';
import { ImageBlock } from './blocks/ImageBlock';
import { ContainerBlock } from './blocks/ContainerBlock';
import { ButtonBlock } from './blocks/ButtonBlock';
import { HeadingBlock } from './blocks/HeadingBlock';
import { DividerBlock } from './blocks/DividerBlock';
import { SpacerBlock } from './blocks/SpacerBlock';

interface PageRendererProps {
  data: string;
}

export const PageRenderer: React.FC<PageRendererProps> = ({ data }) => {
  return (
    <Editor
      resolver={{
        TextBlock,
        ImageBlock,
        ContainerBlock,
        ButtonBlock,
        HeadingBlock,
        DividerBlock,
        SpacerBlock
      }}
      enabled={false}
    >
      <Frame data={data} />
    </Editor>
  );
};
