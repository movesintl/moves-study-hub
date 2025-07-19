import Hero from "@/components/common/Hero";
import CountryCards from "@/components/common/CountryCards";
import LeadEnquiryForm from "@/components/common/LeadEnquiryForm";
import PopularCourses from "@/components/common/PopularCourses";
import FeaturedUniversities from "@/components/common/FeaturedUniversities";
import CounsellingPopup from "@/components/common/CounsellingPopup";
import Services from "@/components/common/Services";
import HowToApply from "@/components/common/HowToApply";
import Webstories from "@/components/common/Webstories";
import LatestUpdates from "@/components/common/LatestUpdates";
import HighQuality from "@/components/common/HighQuality";
import StickyProfileComponent from "@/components/common/StickyProfile";
import FloatingStats from "@/components/common/FloatingStats";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero section remains unchanged */}
      <Hero />

      {/* Floating Stats Card */}
      <FloatingStats />

      {/* Services */}
      <Services />

      {/* Updated layout with better spacing and visual hierarchy */}
      <div className="bg-gradient-to-b from-gray-50 to-white">
        <LeadEnquiryForm />
      </div>

      {/* Popular Courses Section */}
      <div className="bg-gradient-to-b from-white to-gray-50">
        <PopularCourses />
      </div>

      {/* How to Apply - New 4-step section */}
      <HowToApply />

      <div className="bg-white">
        <CountryCards />
      </div>

      {/* Featured Universities Section */}
      <FeaturedUniversities />



     {/* Removed Services Overview */}
      {/* Removed CHoose us */}



      {/* Services Overview Section */}
      
      <StickyProfileComponent />
      <HighQuality />

      {/* Web stories */}
      <div className="bg-white">
        <Webstories />
      </div>

      {/* Latest Updates */}
      <LatestUpdates />

      <CounsellingPopup />
    </div>
  );
};

export default Home;
