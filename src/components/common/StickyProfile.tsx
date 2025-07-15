
import { Phone } from 'lucide-react';

export default function StickyProfileComponent() {
  return (
    <>
      {/* Sticky Profile Component */}
      <div className="sticky top-16 z-40 bg-white max-w-7xl  mx-auto border-b-1 h-20 rounded-lg shadow-md  border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between mx-12 ">
          {/* Left side - Profile info */}
          <div className="flex items-center space-x-3 ">
            {/* Profile Image */}
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Name and supporting text */}
            <div>
              <h2 className="text-sm md:text-lg font-semibold text-gray-900">Upendra Sir</h2>
              <p className="text-sm text-gray-500">Counselor</p>
            </div>
          </div>

          {/* Right side - Phone button */}
          <button className="flex items-center space-x-1 md:space-x-2 bg-orange-100 hover:bg-orange-200 text-orange-600 px-4 py-2 rounded-lg transition-colors">
            <Phone size={18} />
            <span className="font-medium">+61 402 830 739</span>
          </button>
        </div>
      </div>
</>
  );
}