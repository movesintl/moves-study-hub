
import React from 'react';
import { useEditor } from '@craftjs/core';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export const SettingsPanel = () => {
  const { actions, selected, isEnabled } = useEditor((state, query) => {
    const currentNodeId = query.getEvent('selected').last();
    let selected;

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        settings: state.nodes[currentNodeId].related && state.nodes[currentNodeId].related.settings,
        isDeletable: query.node(currentNodeId).isDeletable()
      };
    }

    return {
      selected,
      isEnabled: state.options.enabled
    };
  });

  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle className="text-sm">
          {selected ? `${selected.name} Settings` : 'Select a component'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {selected && selected.isDeletable && selected.name !== 'ContainerBlock' && (
          <>
            <Button 
              onClick={() => actions.delete(selected.id)} 
              variant="destructive" 
              size="sm" 
              className="w-full mb-4"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete {selected.name}
            </Button>
            <Separator className="mb-4" />
          </>
        )}
        {selected && selected.settings && React.createElement(selected.settings)}
        {!selected && (
          <p className="text-sm text-gray-500">
            Click on a component to edit its properties
          </p>
        )}
      </CardContent>
    </Card>
  );
};
