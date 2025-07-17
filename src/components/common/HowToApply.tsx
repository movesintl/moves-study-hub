import { Search, Filter, Heart, MessageCircle } from "lucide-react";

export default function HowToApply() {
  const steps = [
    {
      id: 1,
      title: "Browse Courses",
      description: "Explore hundreds of courses and top universities across Australia.",
      icon: Search,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      button: {
        label: "Browse Courses",
        href: "/courses",
      },
      illustration: (
        <div className="relative">
          <img
            src="https://coadhiipbnnqlmslpzeu.supabase.co/storage/v1/object/public/media/steps/search-illustration.svg"
             className="w-40 h-40 rounded-sm"
          />
        </div>
      )
    },
    {
      id: 2,
      title: "Use Smart Filters",
      description: "Apply filters to narrow down the perfect course that fits your goals.",
      icon: Filter,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      button: {
        label: "Browse Courses",
        href: "/courses",
      },
      illustration: (
        <div className="relative">

          <img
            src="https://coadhiipbnnqlmslpzeu.supabase.co/storage/v1/object/public/media/steps/filter_save.svg"
            className="w-40 h-40 rounded-sm"
          />
        </div>
      )
    },
    {
      id: 3,
      title: "Save & Compare",
      description: "Shortlist your favorite courses and compare them side by side.",
      icon: Heart,
      bgColor: "bg-pink-100",
      iconColor: "text-pink-600",
      button: {
        label: "Browse Courses",
        href: "/courses",
      },
      illustration: (
        <div className="relative">
          <img
            src="https://coadhiipbnnqlmslpzeu.supabase.co/storage/v1/object/public/media/steps/saves.svg"
            className="w-40 h-40 rounded-sm"
          />
        </div>
      )
    },
    {
      id: 4,
      title: "Apply or Get Counselling",
      description: "Apply directly or book a free session with our expert education counsellors.",
      icon: MessageCircle,
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
      button: {
        label: "Book Consultation",
        href: "/services/consultation",
      },
      illustration: (
        <div className="relative">
          <img
            src="https://coadhiipbnnqlmslpzeu.supabase.co/storage/v1/object/public/media/steps/counsels.svg"
            className="w-40 h-40 rounded-sm"
          />
        </div>
      )
    }
  ];

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8" style={{ backgroundColor: '#f5f5f5' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-gray-500 text-sm font-medium uppercase tracking-wide mb-2">
            GET STARTED
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find your perfect course in just 4 simple steps
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="relative group"
            >
              {/* Connection Line - Hidden on mobile */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-20 left-full w-6 h-px bg-gray-200 z-0"></div>
              )}

              {/* Card */}
              <div className={`${step.bgColor} h-full rounded-2xl p-6 text-center relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 z-10`}>
                {/* Step Number */}
                <div className="absolute top-4 right-4 w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs font-bold text-gray-600 shadow-sm">
                  {step.id}
                </div>

                {/* Illustration */}
                <div className="mb-6 flex justify-center">
                  <div className="rounded-3xl bg-white/50 flex items-center justify-center relative">
                    {step.illustration}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {step.description}
                </p>

                {step.button && (
                  <a
                    href={step.button.href}
                    className={`inline-block border ${step.iconColor} ${step.iconColor} text-sm px-4 py-2 rounded-md hover:bg-opacity-10 transition-colors`}
                  >
                    {step.button.label}
                  </a>
                )}

                {/* Decorative Elements */}
                <div className="absolute top-2 left-2 w-1 h-1 bg-white/30 rounded-full"></div>
                <div className="absolute bottom-3 left-3 w-2 h-2 bg-white/20 rounded-full"></div>
                <div className="absolute top-8 right-8 w-1.5 h-1.5 bg-white/25 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}