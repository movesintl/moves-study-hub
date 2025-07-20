export default function ReadyToBeginSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Image Section */}
        <div className="order-2 lg:order-1">
          <div className="relative rounded-lg overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1494790108755-2616c27c8a8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Smiling student with phone and notebook" 
              className="w-full h-96 object-cover"
            />
          </div>
        </div>
        
        {/* Content Section */}
        <div className="order-1 lg:order-2">
          <h2 className="text-4xl font-bold text-slate-800 mb-6">
            Ready to Begin?
          </h2>
          
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Visit your nearest Moves International office or schedule an appointment through the enquiry form. Your educational adventure awaits!
          </p>
          
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2 shadow-md">
            Contact Us
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}