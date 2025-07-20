export default function KeepReading() {
  return (
    <div className="bg-accent rounded-lg p-12 flex items-center justify-between max-w-5xl mx-auto">
      <div className="flex-1">
        <h2 className="text-white text-4xl font-bold mb-4">
          Contact us now to kickstart your journey!
        </h2>
        <p className="text-white text-lg opacity-90">
          Still seeking more information on course selection for international students in Australia?
        </p>
      </div>
      
      <div className="ml-8 flex-shrink-0">
        <a href="/services" className="bg-white text-accent px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 shadow-md">
          Keep Reading
        </a>
      </div>
    </div>
  );
}