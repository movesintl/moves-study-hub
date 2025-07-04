export default function Services() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-white py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Container - Images and Experience Badge */}
          <div className="relative flex justify-center">
            {/* Experience Badge */}
            <div className="absolute -top-4 -left-4 z-10">
              <div className="bg-[#023047] text-white px-4 py-3 rounded-lg shadow-lg">
                <div className="text-2xl font-bold">10+</div>
                <div className="text-sm">Years</div>
                <div className="text-sm">Experience</div>
              </div>
            </div>

            {/* Main consultant photo */}
            <div className="relative w-full h-full rounded-lg overflow-hidden shadow-xl">
              <img
                src="https://coadhiipbnnqlmslpzeu.supabase.co/storage/v1/object/public/media/general/1751512836043.png"
                alt="Professional consultant with glasses and blue shirt"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Small laptop image */}
            <div className="absolute bottom-4 -left-8 w-24 h-20 bg-gray-100 rounded-lg overflow-hidden shadow-lg">
              <img
                src="/placeholder.svg?height=80&width=96"
                alt="Person working on laptop"
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Container - Content */}
          <div className="flex flex-col justify-start space-y-6">
            <div className="space-y-4">
              <p className="text-cyan-500 text-sm font-medium uppercase tracking-wide">
                Get Better About Us
              </p>

              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Best <span className="text-cyan-500">guidance</span> given by
                our highly{" "}
                <span className="text-gray-700">specialized consultants.</span>
              </h1>

              <p className="text-gray-600 text-lg leading-relaxed">
                Whether you're seeking guidance about an English proficiency
                test application procedure for your upcoming future studies or
                research, you need advice for your first student research, our
                specialized consultants are here to help you with the best
                guidance.
              </p>
            </div>

            {/* Service containers - matching the design exactly */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <ServiceContainer
                title="Analytics"
                primary="blue"
                secondary="blue"
              />
              <ServiceContainer title="Billing" primary="red" secondary="red" />
              <ServiceContainer
                title="Support"
                primary="gray"
                secondary="gray"
              />
              <ServiceContainer
                title="Analytics"
                primary="blue"
                secondary="green"
              />
              <ServiceContainer
                title="Analytics"
                primary="blue"
                secondary="blue"
              />
              <ServiceContainer title="Billing" primary="red" secondary="red" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const bgColors: Record<string, string> = {
  blue: "bg-blue-300",
  red: "bg-red-300",
  green: "bg-green-530",
  yellow: "bg-yellow-300",
  gray: "bg-gray-300",
};

const borderColors: Record<string, string> = {
  blue: "border-blue-700",
  red: "border-red-700",
  green: "border-green-700",
  yellow: "border-yellow-700",
  gray: "border-gray-700",
};

const textColors: Record<string, string> = {
  blue: "text-blue-100",
  red: "text-red-100",
  green: "text-green-100",
  yellow: "text-yellow-100",
  gray: "text-gray-100",
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
      className={`text-white px-4 py-2 rounded-lg shadow-md min-w-[140px] text-center border-l-4 ${bg} ${border} textblue`}
    >
      <div className={`font-semibold text-lg ${text}`}>{title}</div>
    </div>
  );
}
