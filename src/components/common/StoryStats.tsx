import React from 'react';
import { useCountingAnimation } from "@/hooks/useCountingAnimation";
import { Users, GraduationCap, Globe, Calendar, BookOpen, Flag } from "lucide-react";

const StoryWithStatsSection = () => {
  const { count: studentsCount, ref: studentsRef } = useCountingAnimation({ end: 10000, duration: 2000 });
  const { count: universitiesCount, ref: universitiesRef } = useCountingAnimation({ end: 500, duration: 2000 });
  const { count: countriesCount, ref: countriesRef } = useCountingAnimation({ end: 15, duration: 2000 });
  const { count: experienceCount, ref: experienceRef } = useCountingAnimation({ end: 15, duration: 2000 });

  const stats = [
    {
      number: `${studentsCount.toLocaleString()}+`,
      label: "Students Placed",
      icon: Users,
      ref: studentsRef,
    },
    {
      number: `${universitiesCount}+`,
      label: "Partner Universities",
      icon: GraduationCap,
      ref: universitiesRef,
    },
    {
      number: `${countriesCount}+`,
      label: "Countries",
      icon: Globe,
      ref: countriesRef,
    },
    {
      number: `${experienceCount}+`,
      label: "Years of Excellence",
      icon: Calendar,
      ref: experienceRef,
    },
  ];

  return (
    <section className="py-20 min-h-screen bg-white">
      <div className="mx-auto  md:px-48">
        <div className="grid lg:grid-cols-12 gap-16 relative items-end">
          {/* Left Column - Our Story (Sticky) */}
          <div className="flex col-span-8 flex-col gap-[22px] self-start lg:sticky top-[100px]">
            <div className="px-[20px] py-[32px] bg-gray-100 rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <Flag className="h-6 w-6 text-green-400 " />
                <h2 className="text-2xl leading-tight tracking-tight font-medium text-primary">Our Story</h2>
              </div>
              <div className="space-y-4 text-gray-600 text-left">
                <p className="text-4xl font-bold text-primary">
                  Founded in 2008,<br></br>
                    <span className="text-orange-500 mr-1 ">
                      Moves International   
                      </span> 
                      began with a simple mission
                </p>
                <p>
                 To make quality international 
                education accessible to students from Nepal, Bangladesh, and across South Asia. What started as 
                a small counseling service has grown into a comprehensive educational consultancy with offices 
                across multiple countries.
              </p>
              <p>
                Over the years, we've helped more than 10,000 students realize their dreams of studying abroad. 
                Our success is built on trust, transparency, and an unwavering commitment to student success. 
                We understand that studying abroad is not just about education—it's about transformation, 
                growth, and building a brighter future.
              </p>
              <p>
                Today, we continue to expand our services and partnerships, ensuring that every student who 
                walks through our doors receives the personalized attention and expert guidance they deserve.
              </p>
              </div>
            </div>
          </div>

          {/* Right Column - Animated Stats (Scrollable) */}
          <div className="flex col-span-4 flex-col space-y-5">
            {/* Individual Stat Cards - One per row */}
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="bg-[#FA8500] rounded-2xl shadow-xl py-[44px] px-[27px]transform transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="flex justify-center mb-3">
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <div
                    className="text-2xl font-bold text-white mb-2"
                    ref={stat.ref}
                  >
                    {stat.number}
                  </div>
                  <div className="text-sm text-white/90 font-medium leading-tight">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoryWithStatsSection;

