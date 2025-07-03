
import React from 'react';
import { Element, useEditor } from '@craftjs/core';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TextBlock } from './blocks/TextBlock';
import { ImageBlock } from './blocks/ImageBlock';
import { ContainerBlock } from './blocks/ContainerBlock';
import { ButtonBlock } from './blocks/ButtonBlock';
import { HeadingBlock } from './blocks/HeadingBlock';
import { DividerBlock } from './blocks/DividerBlock';
import { SpacerBlock } from './blocks/SpacerBlock';
import { Type, Image, Square, MousePointer, Heading, Minus, Move } from 'lucide-react';

export const Toolbox = () => {
  const { connectors } = useEditor();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-sm">Components</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button
          ref={(ref) => {
            if (ref) {
              connectors.create(ref, <HeadingBlock text="New Heading" level="h2" />);
            }
          }}
          variant="outline"
          className="w-full justify-start cursor-grab active:cursor-grabbing"
          size="sm"
        >
          <Heading className="w-4 h-4 mr-2" />
          Heading
        </Button>

        <Button
          ref={(ref) => {
            if (ref) {
              connectors.create(ref, <TextBlock text="Click to edit this text" />);
            }
          }}
          variant="outline"
          className="w-full justify-start cursor-grab active:cursor-grabbing"
          size="sm"
        >
          <Type className="w-4 h-4 mr-2" />
          Text
        </Button>
        
        <Button
          ref={(ref) => {
            if (ref) {
              connectors.create(ref, <ImageBlock />);
            }
          }}
          variant="outline"
          className="w-full justify-start cursor-grab active:cursor-grabbing"
          size="sm"
        >
          <Image className="w-4 h-4 mr-2" />
          Image
        </Button>

        <Button
          ref={(ref) => {
            if (ref) {
              connectors.create(ref, <ButtonBlock text="Click me" />);
            }
          }}
          variant="outline"
          className="w-full justify-start cursor-grab active:cursor-grabbing"
          size="sm"
        >
          <MousePointer className="w-4 h-4 mr-2" />
          Button
        </Button>

        <Button
          ref={(ref) => {
            if (ref) {
              connectors.create(ref, <DividerBlock />);
            }
          }}
          variant="outline"
          className="w-full justify-start cursor-grab active:cursor-grabbing"
          size="sm"
        >
          <Minus className="w-4 h-4 mr-2" />
          Divider
        </Button>

        <Button
          ref={(ref) => {
            if (ref) {
              connectors.create(ref, <SpacerBlock height={40} />);
            }
          }}
          variant="outline"
          className="w-full justify-start cursor-grab active:cursor-grabbing"
          size="sm"
        >
          <Move className="w-4 h-4 mr-2" />
          Spacer
        </Button>
        
        <Button
          ref={(ref) => {
            if (ref) {
              connectors.create(ref, 
                <Element is={ContainerBlock} canvas paddingTop={16} paddingBottom={16} paddingLeft={16} paddingRight={16} background="#f8f9fa">
                  <TextBlock text="Drop components here" />
                </Element>
              );
            }
          }}
          variant="outline"
          className="w-full justify-start cursor-grab active:cursor-grabbing"
          size="sm"
        >
          <Square className="w-4 h-4 mr-2" />
          Container
        </Button>
      </CardContent>
    </Card>
  );
};
