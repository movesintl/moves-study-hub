
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
          ref={(ref) => ref && connectors.create(ref, <HeadingBlock />)}
          variant="outline"
          className="w-full justify-start"
          size="sm"
        >
          <Heading className="w-4 h-4 mr-2" />
          Heading
        </Button>

        <Button
          ref={(ref) => ref && connectors.create(ref, <TextBlock />)}
          variant="outline"
          className="w-full justify-start"
          size="sm"
        >
          <Type className="w-4 h-4 mr-2" />
          Text
        </Button>
        
        <Button
          ref={(ref) => ref && connectors.create(ref, <ImageBlock />)}
          variant="outline"
          className="w-full justify-start"
          size="sm"
        >
          <Image className="w-4 h-4 mr-2" />
          Image
        </Button>

        <Button
          ref={(ref) => ref && connectors.create(ref, <ButtonBlock />)}
          variant="outline"
          className="w-full justify-start"
          size="sm"
        >
          <MousePointer className="w-4 h-4 mr-2" />
          Button
        </Button>

        <Button
          ref={(ref) => ref && connectors.create(ref, <DividerBlock />)}
          variant="outline"
          className="w-full justify-start"
          size="sm"
        >
          <Minus className="w-4 h-4 mr-2" />
          Divider
        </Button>

        <Button
          ref={(ref) => ref && connectors.create(ref, <SpacerBlock />)}
          variant="outline"
          className="w-full justify-start"
          size="sm"
        >
          <Move className="w-4 h-4 mr-2" />
          Spacer
        </Button>
        
        <Button
          ref={(ref) => ref && connectors.create(ref, 
            <Element is={ContainerBlock} canvas>
              <TextBlock text="Drag components here" />
            </Element>
          )}
          variant="outline"
          className="w-full justify-start"
          size="sm"
        >
          <Square className="w-4 h-4 mr-2" />
          Container
        </Button>
      </CardContent>
    </Card>
  );
};
