import React from 'react';

const MarketingConsentsLoading = () => {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="mt-2 text-muted-foreground">Loading marketing consents...</p>
      </div>
    </div>
  );
};

export default MarketingConsentsLoading;