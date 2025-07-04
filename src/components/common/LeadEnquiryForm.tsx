import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Users, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { useCounsellingBookingForm } from "@/hooks/useCounsellingBookingForm";
import { PersonalInfoSection } from "@/components/forms/counselling/PersonalInfoSection";
import { StudyPreferencesSection } from "@/components/forms/counselling/StudyPreferencesSection";
import { SchedulingSection } from "@/components/forms/counselling/SchedulingSection";

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
    <section className="bg-gradient-to-br from-gray-50 to-white py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 grid lg:grid-cols-5 gap-6 relative">
        {/* Left Column: Sticky Content */}
        <div
          className="lg:col-span-3 space-y-6 hidden lg:block"
          style={{
            position: "sticky",
            top: "100px",
            alignSelf: "start",
          }}
        >
          {/* Header Text */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Moves International can help you
            </h2>
            <p className="text-gray-600 mt-2">
              Enter your details and one of our expert counsellors will reach
              out to you so we can connect you to the right course, country,
              university — and even scholarships!
            </p>
          </div>

          {/* Your actual form */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <form onSubmit={handleSubmit} className="space-y-3">
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

              {/* Checkboxes */}
              <div className="space-y-3 pt-4 border-t border-gray-100">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="agrees_to_terms"
                    checked={formData.agrees_to_terms}
                    onCheckedChange={(checked) =>
                      handleInputChange("agrees_to_terms", checked as boolean)
                    }
                    className="mt-1"
                  />
                  <label
                    htmlFor="agrees_to_terms"
                    className="text-sm text-gray-600 cursor-pointer"
                  >
                    I agree to Moves International Terms and{" "}
                    <Link
                      to="/privacy-policy"
                      className="text-primary hover:underline"
                    >
                      privacy policy
                    </Link>
                  </label>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="agrees_to_contact"
                    checked={formData.agrees_to_contact}
                    onCheckedChange={(checked) =>
                      handleInputChange("agrees_to_contact", checked as boolean)
                    }
                    className="mt-1"
                  />
                  <label
                    htmlFor="agrees_to_contact"
                    className="text-sm text-gray-600 cursor-pointer"
                  >
                    Please contact me by phone, email or SMS to assist with my
                    enquiry
                  </label>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="agrees_to_marketing"
                    checked={formData.agrees_to_marketing}
                    onCheckedChange={(checked) =>
                      handleInputChange(
                        "agrees_to_marketing",
                        checked as boolean
                      )
                    }
                    className="mt-1"
                  />
                  <label
                    htmlFor="agrees_to_marketing"
                    className="text-sm text-gray-600 cursor-pointer"
                  >
                    Please accept to receive updates and offers from Moves
                    International
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-10 text-base bg-primary hover:bg-primary/90 text-white rounded-full font-semibold"
              >
                {loading ? "Submitting..." : "Get Free Counselling"}
              </Button>
            </form>
          </div>

          {/* Trust Elements */}
          <div className="flex flex-wrap gap-6 justify-center pt-4 text-gray-600 text-sm">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span>10,000+ Students Placed</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-accent" />
              <span>99% Success Rate</span>
            </div>
          </div>
        </div>

        {/* Right Column: Scrollable */}
        <div className="lg:col-span-2 flex flex-col space-y-6">
          <img
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&h=600"
            alt="Student consulting"
            className="rounded-xl shadow-xl w-full object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&h=600"
            alt="Student consulting"
            className="rounded-xl shadow-xl w-full object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&h=600"
            alt="Student consulting"
            className="rounded-xl shadow-xl w-full object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&h=600"
            alt="Student consulting"
            className="rounded-xl shadow-xl w-full object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&h=600"
            alt="Student consulting"
            className="rounded-xl shadow-xl w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default LeadEnquiryForm;
