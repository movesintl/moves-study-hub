
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import CounsellingBookingForm from '@/components/forms/CounsellingBookingForm';

const CounsellingPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (hasShown) return;
      
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      if (scrollPercentage >= 20) {
        setIsOpen(true);
        setHasShown(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasShown]);

  const handleSuccess = () => {
    setIsOpen(false);
  };



  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader className="relative">
  
          <DialogTitle className="text-center text-2xl font-bold text-primary pr-8">
            Don't Miss Out!
          </DialogTitle>
          <p className="text-center text-gray-600 mt-2">
            Get expert guidance for your international education journey - completely free!
          </p>
        </DialogHeader>
        
        <div className="mt-4">
          <CounsellingBookingForm onSuccess={handleSuccess} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CounsellingPopup;
