
import React from 'react';
import { Element, useEditor } from '@craftjs/core';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TextBlock } from './blocks/TextBlock';
import { ImageBlock } from './blocks/ImageBlock';
import { ContainerBlock } from './blocks/ContainerBlock';
import { Type, Image, Square } from 'lucide-react';

export const Toolbox = () => {
  const { connectors } = useEditor();

  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle className="text-sm">Components</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button
          ref={(ref: HTMLButtonElement) => connectors.create(ref, <TextBlock />)}
          variant="outline"
          className="w-full justify-start"
        >
          <Type className="w-4 h-4 mr-2" />
          Text
        </Button>
        
        <Button
          ref={(ref: HTMLButtonElement) => connectors.create(ref, <ImageBlock />)}
          variant="outline"
          className="w-full justify-start"
        >
          <Image className="w-4 h-4 mr-2" />
          Image
        </Button>
        
        <Button
          ref={(ref: HTMLButtonElement) => connectors.create(ref, 
            <Element is={ContainerBlock} canvas>
              <TextBlock text="Drag components here" />
            </Element>
          )}
          variant="outline"
          className="w-full justify-start"
        >
          <Square className="w-4 h-4 mr-2" />
          Container
        </Button>
      </CardContent>
    </Card>
  );
};
