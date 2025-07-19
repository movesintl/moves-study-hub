
import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import CounsellingBookingForm from '@/components/forms/CounsellingBookingForm';
import counsellingImage from '@/assets/counselling-support.jpg';

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
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-white p-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
          {/* Left Column - Hero Content */}
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-8 lg:p-12 flex flex-col justify-center">
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-primary leading-tight">
                Don't Miss Out!
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Get expert guidance for your international education journey – completely free!
              </p>
              <div className="relative rounded-lg overflow-hidden shadow-xl">
                <img 
                  src={counsellingImage} 
                  alt="Students receiving counselling support for international education"
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>
          
          {/* Right Column - Form */}
          <div className="p-6 lg:p-8 overflow-y-auto">
            <CounsellingBookingForm onSuccess={handleSuccess} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CounsellingPopup;
