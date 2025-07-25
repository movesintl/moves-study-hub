import { Users, GraduationCap, Trophy, Globe } from "lucide-react";
import { useCountingAnimation } from "@/hooks/useCountingAnimation";

const FloatingStats = () => {
  const studentStats = useCountingAnimation({ end: 2500, duration: 3000 });
  const successStats = useCountingAnimation({ end: 98, duration: 2000 });
  const universitiesStats = useCountingAnimation({ end: 150, duration: 2500 });
  const countriesStats = useCountingAnimation({ end: 15, duration: 1500 });

  const stats = [
    {
      icon: Users,
      count: studentStats.count,
      label: "Students Placed",
      suffix: "+",
      color: "text-blue-500",
      ref: studentStats.ref
    },
    {
      icon: Trophy,
      count: successStats.count,
      label: "Success Rate",
      suffix: "%",
      color: "text-green-500",
      ref: successStats.ref
    },
    {
      icon: GraduationCap,
      count: universitiesStats.count,
      label: "Universities",
      suffix: "+",
      color: "text-purple-500",
      ref: universitiesStats.ref
    },
    {
      icon: Globe,
      count: countriesStats.count,
      label: "Countries",
      suffix: "+",
      color: "text-orange-500",
      ref: countriesStats.ref
    }
  ];

  return (
    <div className="relative z-10 -mt-16 mb-0">
      {/* Background section that goes behind the floating card */}
      <div className="bg-[#fcfcfc] absolute inset-0 top-16 bottom-0"></div>
      <div className="relative max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="bg-secondary rounded-2xl shadow-xl p-6 md:p-8 border border-secondary">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center" ref={stat.ref}>
                <div className="flex justify-center mb-3">
                  <div className={`p-3 rounded-full bg-white/20 ${stat.color}`}>
                    <stat.icon className="h-6 w-6 md:h-8 md:w-8" />
                  </div>
                </div>
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
                  {stat.count}{stat.suffix}
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