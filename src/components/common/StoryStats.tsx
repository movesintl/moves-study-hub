import React from 'react';
import { useCountingAnimation } from "@/hooks/useCountingAnimation";
import {
  Users,
  GraduationCap,
  Globe,
  Calendar,
  Flag,
} from "lucide-react";

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
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[60%_40%] gap-12 items-start">
          {/* Left Column - Our Story */}
          <div className="sticky top-24 self-start flex flex-col gap-6 border border-dashed px-8 py-10 rounded-lg bg-gray-50">
            <div className="flex items-center gap-3">
              <Flag className="w-6 h-6 text-green-500" />
              <span className="text-xl font-semibold text-primary">Our Story</span>
            </div>
            <h2 className="text-2xl lg:text-4xl font-bold text-primary leading-tight">
              Founded in 2008,<br />
              <span className="text-orange-500">Moves International</span> began with a simple mission
            </h2>
            <div className="space-y-4 text-gray-600 text-base leading-relaxed">
              <p>
                To make quality international education accessible to students from Nepal, Bangladesh, and across South Asia.
                What started as a small counseling service has grown into a comprehensive educational consultancy.
              </p>
              <p>
                We've helped more than 10,000 students realize their dreams of studying abroad, built on trust, transparency,
                and an unwavering commitment to student success.
              </p>
              <p>
                Today, we continue to expand our services and partnerships to deliver expert guidance to every student.
              </p>
            </div>
          </div>

          {/* Right Column - Stats Cards */}
          <div className="grid grid-cols-1 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-all text-center flex flex-col items-center"
              >
                <stat.icon className="h-8 w-8 text-orange-500 mb-3" />
                <div className="text-3xl font-bold text-orange-500 mb-1" ref={stat.ref}>
                  {stat.number}
                </div>
                <p className="text-sm text-primary font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoryWithStatsSection;
