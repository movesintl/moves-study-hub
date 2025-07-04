import { Lightbulb } from "lucide-react";

export default function Services() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-white py-12 px-4 md:px-6 lg:px-8 md:pt-20">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-4 items-stretch">
          {/* Left Container */}
          <div className="relative w-full h-full">
            <img
              src="https://coadhiipbnnqlmslpzeu.supabase.co/storage/v1/object/public/media/general/1751512836043.png"
              alt="Professional consultant with glasses and blue shirt"
              className="w-full h-full object-cover rounded-lg "
            />
          </div>

          {/* Right Container - Content */}
          <div className="flex flex-col justify-between h-full py-4">
            {/* Top Content */}
            <div className="space-y-6">
              <p className="flex items-center gap-2 text-[#FA8500] bg-[#FA8500]/20 w-fit px-6 py-3 font-bold rounded-3xl text-sm uppercase tracking-wide">
                <Lightbulb className="w-4 h-4" />
                Get Better About Us
              </p>

              <h1 className="text-4xl lg:text-5xl font-bold text-[#023047] leading-tight">
                Best <span className="text-[#FA8500]">guidance</span> given by
                our highly specialized consultants.
              </h1>

              <p className="text-gray-600 text-lg leading-relaxed">
                Whether you're seeking guidance about an English proficiency
                test application procedure for your upcoming future studies or
                research, you need advice for your first student research, our
                specialized consultants are here to help you with the best
                guidance.
              </p>
            </div>

            {/* Bottom Services Grid */}
            <div className="pt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <ServiceContainer
                  title="Free Consultation"
                  primary="blue"
                  secondary="blue"
                />
                <ServiceContainer
                  title="Application Assistance"
                  primary="green"
                  secondary="green"
                />
                <ServiceContainer
                  title="Visa & Migration"
                  primary="purple"
                  secondary="purple"
                />
                <ServiceContainer
                  title="English Test Prep"
                  primary="orange"
                  secondary="orange"
                />
                <ServiceContainer
                  title="Scholarship Guidance"
                  primary="red"
                  secondary="red"
                />
                <ServiceContainer
                  title="Pre Departure Support"
                  primary="cyan"
                  secondary="cyan"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const bgColors: Record<string, string> = {
  blue: "bg-blue-300/10",
  red: "bg-red-300/10",
  green: "bg-green-500/10",
  yellow: "bg-yellow-300/10",
  gray: "bg-gray-300/10",
  orange: "bg-[#FA8500]/10",
  purple: "bg-purple-300/10",
  cyan: "bg-cyan-300/10",
};

const borderColors: Record<string, string> = {
  blue: "border-blue-700",
  red: "border-red-700",
  green: "border-green-700",
  yellow: "border-yellow-700",
  gray: "border-gray-700",
  orange: "border-[#FA8500]",
  purple: "border-purple-700",
  cyan: "border-cyan-700",
};

const textColors: Record<string, string> = {
  blue: "text-blue-700",
  red: "text-red-700",
  orange: "text-[#FA8500]",
  purple: "text-purple-700",
  green: "text-green-700",
  yellow: "text-yellow-700",
  gray: "text-gray-700",
  cyan: "text-cyan-700",
};

// ✅ Component
type ServiceContainerProps = {
  title: string;
  primary: keyof typeof borderColors;
  secondary: keyof typeof bgColors;
};

export function ServiceContainer({
  title,
  primary,
  secondary,
}: ServiceContainerProps) {
  const bg = bgColors[secondary] || "bg-gray-500";
  const border = borderColors[primary] || "border-gray-700";
  const text = textColors[primary] || "text-gray-100";

  return (
    <div
      className={`text-white px-4 py-2 rounded-lg  min-w-[140px] text-center border-l-4 ${bg} ${border} textblue flex items-center justify-center `}
    >
      <div className={`font-[400] text-lg ${text}`}>{title}</div>
    </div>
  );
}
