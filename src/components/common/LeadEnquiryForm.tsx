
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
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
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

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Form Section - Left Side */}
          <div className="order-2 lg:order-1">
            <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-primary to-accent text-white rounded-t-lg">
                <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
                  <GraduationCap className="h-6 w-6" />
                  Get Free Counselling
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
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

                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="w-full h-12 text-lg bg-gradient-to-r from-accent to-orange-500 hover:from-accent/90 hover:to-orange-500/90 shadow-lg"
                  >
                    {loading ? 'Submitting...' : 'Get Free Counselling'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Image Section - Right Side */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl transform rotate-3"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&h=600"
                  alt="Student studying abroad"
                  className="w-full h-80 object-cover rounded-2xl mb-6"
                />
                
                {/* Statistics Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-r from-primary to-primary/80 rounded-xl p-4 text-white text-center">
                    <Users className="h-6 w-6 mx-auto mb-2" />
                    <div className="text-2xl font-bold">10,000+</div>
                    <div className="text-sm opacity-90">Students Placed</div>
                  </div>
                  <div className="bg-gradient-to-r from-accent to-orange-500 rounded-xl p-4 text-white text-center">
                    <Award className="h-6 w-6 mx-auto mb-2" />
                    <div className="text-2xl font-bold">99%</div>
                    <div className="text-sm opacity-90">Success Rate</div>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="mt-6 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent border-2 border-white shadow-sm flex items-center justify-center text-white text-xs font-bold">
                          {String.fromCharCode(65 + i)}
                        </div>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">Trusted by thousands</span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Join successful students who achieved their dreams with our expert guidance
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadEnquiryForm;
