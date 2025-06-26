
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap, Users, Award } from 'lucide-react';
import { useCounsellingBookingForm } from '@/hooks/useCounsellingBookingForm';
import { PersonalInfoSection } from '@/components/forms/counselling/PersonalInfoSection';
import { StudyPreferencesSection } from '@/components/forms/counselling/StudyPreferencesSection';
import { SchedulingSection } from '@/components/forms/counselling/SchedulingSection';

const LeadEnquiryForm = () => {
  const {
    formData,
    loading,
    destinations,
    studyLevels,
    handleInputChange,
    handleSubmit,
  } = useCounsellingBookingForm();

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Start Your Journey Today
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Fill out the form below and get personalized guidance from our expert counsellors. 
            Take the first step towards your international education dreams.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Form and Text */}
          <div className="space-y-8">
            {/* Header Text */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Moves International can help you
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Enter your details and one of our expert counsellors will reach out to you so we can 
                connect you to the right course, country, university - and even scholarships!
              </p>
            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <PersonalInfoSection 
                  formData={formData}
                  onInputChange={handleInputChange}
                />
                
                <StudyPreferencesSection 
                  formData={formData}
                  destinations={destinations}
                  studyLevels={studyLevels}
                  onInputChange={handleInputChange}
                />
                
                <SchedulingSection 
                  formData={formData}
                  onInputChange={handleInputChange}
                />

                {/* Trust indicators with checkboxes */}
                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <label className="flex items-start gap-3 text-sm text-gray-600 cursor-pointer">
                    <input type="checkbox" className="mt-1 rounded border-gray-300" />
                    <span>I agree to Moves International Terms and privacy policy</span>
                  </label>
                  <label className="flex items-start gap-3 text-sm text-gray-600 cursor-pointer">
                    <input type="checkbox" className="mt-1 rounded border-gray-300" />
                    <span>Please contact me by phone, email or SMS to assist with my enquiry</span>
                  </label>
                  <label className="flex items-start gap-3 text-sm text-gray-600 cursor-pointer">
                    <input type="checkbox" className="mt-1 rounded border-gray-300" />
                    <span>Please accept to receive updates and offers from Moves International</span>
                  </label>
                </div>

                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full h-12 text-lg bg-primary hover:bg-primary/90 text-white rounded-full font-semibold shadow-lg"
                >
                  {loading ? 'Submitting...' : 'Get Free Counselling'}
                </Button>
              </form>
            </div>

            {/* Trust elements */}
            <div className="flex items-center justify-center gap-8 pt-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="h-4 w-4 text-primary" />
                <span>10,000+ Students Placed</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Award className="h-4 w-4 text-accent" />
                <span>99% Success Rate</span>
              </div>
            </div>
          </div>

          {/* Right Column - Image with Abstract Shapes */}
          <div className="relative flex items-center justify-center lg:justify-end">
            {/* Abstract Background Shapes */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Green Circle */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-green-400 rounded-full opacity-20 transform translate-x-20 -translate-y-20"></div>
              {/* Orange Rectangle */}
              <div className="absolute bottom-20 right-20 w-32 h-32 bg-accent rounded-2xl opacity-30 transform rotate-12"></div>
              {/* Blue Circle */}
              <div className="absolute bottom-0 left-0 w-60 h-60 bg-primary rounded-full opacity-15 transform -translate-x-10 translate-y-10"></div>
            </div>

            {/* Main Image */}
            <div className="relative z-10 max-w-md">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&h=600"
                alt="Student with mobile device - international education consultation"
                className="w-full h-auto rounded-3xl shadow-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadEnquiryForm;
