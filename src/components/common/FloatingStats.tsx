import { useCountingAnimation } from "@/hooks/useCountingAnimation";
import { Users, GraduationCap, Globe, Calendar } from "lucide-react";

const FloatingStats = () => {
  const { count: studentsCount } = useCountingAnimation({ end: 10000, duration: 2000 });
  const { count: universitiesCount } = useCountingAnimation({ end: 500, duration: 2000 });
  const { count: countriesCount } = useCountingAnimation({ end: 15, duration: 2000 });
  const { count: experienceCount } = useCountingAnimation({ end: 10, duration: 2000 });

  const stats = [
    {
      number: `${studentsCount.toLocaleString()}+`,
      label: "Students Placed",
      icon: Users,
    },
    {
      number: `${universitiesCount}+`,
      label: "Partner Universities",
      icon: GraduationCap,
    },
    {
      number: `${countriesCount}+`,
      label: "Countries",
      icon: Globe,
    },
    {
      number: `${experienceCount}+`,
      label: "Years Consulting Experience",
      icon: Calendar,
    },
  ];

  return (
    <div className="relative z-10 -mt-16 mb-16">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="bg-[#FA8500] rounded-2xl shadow-xl p-6 md:p-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-3">
                  <stat.icon className="h-8 w-8 md:h-10 md:w-10 text-white" />
                </div>
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-white/90 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingStats;