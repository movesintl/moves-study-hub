
import React from 'react';
import { Phone, CheckCircle } from 'lucide-react';
import CounsellingBookingForm from '@/components/forms/CounsellingBookingForm';

interface CounsellingSectionProps {
  destinationName: string;
}

const CounsellingSection = ({ destinationName }: CounsellingSectionProps) => {
  return (
    <section className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-0">
        {/* Left side - Form */}
        <div className="p-8 lg:p-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Start Your Journey?</h2>
            <p className="text-gray-600 text-lg">
              Get personalized guidance from our expert counsellors and take the first step towards your international education in {destinationName}.
            </p>
          </div>
          <CounsellingBookingForm defaultDestination={destinationName} />
        </div>

        {/* Right side - Image */}
        <div className="relative bg-gradient-to-br from-primary to-primary/80 p-8 lg:p-12 flex items-center justify-center">
          <div className="text-center text-white">
            <Phone className="h-24 w-24 mx-auto mb-6 text-white/90" />
            <h3 className="text-2xl font-bold mb-4">Expert Guidance</h3>
            <p className="text-lg text-white/90 mb-6">
              Our experienced counsellors have helped thousands of students achieve their study abroad dreams.
            </p>
            <div className="space-y-3 text-left">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-300" />
                <span>Free consultation session</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-300" />
                <span>Personalized study plan</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-300" />
                <span>Application assistance</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-300" />
                <span>Visa guidance & support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CounsellingSection;
