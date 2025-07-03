import React from 'react';
import { Mail } from 'lucide-react';

const MarketingConsentsEmpty = () => {
  return (
    <div className="text-center py-8">
      <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
      <h3 className="text-lg font-semibold mb-2">No marketing consents yet</h3>
      <p className="text-muted-foreground">
        Marketing consents will appear here when users opt-in to receive updates.
      </p>
    </div>
  );
};

export default MarketingConsentsEmpty;