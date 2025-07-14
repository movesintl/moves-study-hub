import Hero from "@/components/common/Hero";
import CountryCards from "@/components/common/CountryCards";
import LeadEnquiryForm from "@/components/common/LeadEnquiryForm";
import ServicesOverview from "@/components/common/ServicesOverview";
import PopularCourses from "@/components/common/PopularCourses";
import FeaturedUniversities from "@/components/common/FeaturedUniversities";
import Testimonials from "@/components/common/Testimonials";
import CounsellingPopup from "@/components/common/CounsellingPopup";
import Services from "@/components/common/Services";
import Process from "@/components/common/Process";
import Webstories from "@/components/common/Webstories";
import BlogsHomePage from "@/components/common/BlogsHomePage";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero section remains unchanged */}
      <Hero />

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

      {/* Process */}
      <Process />

      <div className="bg-white">
        <CountryCards />
      </div>

      {/* Web stories */}
      <div className="bg-white">
        <Webstories />
      </div>

     {/* Removed Services Overview */}
      {/* Removed CHoose us */}

      {/* Featured Universities Section */}
      <FeaturedUniversities />

      <div className="bg-gradient-to-b from-gray-50 to-primary/5">
        <Testimonials />
      </div>

      {/* Blogs */}
      <BlogsHomePage/>

      {/* Counselling Popup */}
      <CounsellingPopup />
    </div>
  );
};

export default Home;
