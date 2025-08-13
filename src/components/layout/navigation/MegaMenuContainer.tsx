import React, { ReactNode } from 'react';

interface MegaMenuContainerProps {
  isOpen: boolean;
  children: ReactNode;
  className?: string;
}

const MegaMenuContainer: React.FC<MegaMenuContainerProps> = ({ 
  isOpen, 
  children, 
  className = "" 
}) => {
  return (
    <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-screen max-w-6xl bg-card rounded-xl shadow-elegant border border-border z-[9999] transition-all duration-300 backdrop-blur-sm ${
      isOpen 
        ? 'opacity-100 translate-y-0 visible' 
        : 'opacity-0 -translate-y-4 invisible'
    } ${className}`}>
      {/* Arrow pointing up */}
      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-card border-l border-t border-border rotate-45"></div>
      
      {/* Content */}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default MegaMenuContainer;