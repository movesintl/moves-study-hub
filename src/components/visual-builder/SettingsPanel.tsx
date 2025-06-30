
import React from 'react';
import { useEditor } from '@craftjs/core';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
