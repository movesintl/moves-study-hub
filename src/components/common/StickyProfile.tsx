
import { Phone } from 'lucide-react';

export default function StickyProfileComponent() {
  return (
    <>
      {/* Sticky Profile Component */}
      <div className="py-10"></div>
      <div className="sticky top-16 z-40 bg-white max-w-7xl  mx-auto border-b-1 rounded-lg shadow-[0_20px_30px_0_rgba(0,0,0,0.04)]  border-gray-200 px-4 py-3  ">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 items-center justify-between mx-12 ">
          {/* Left side - Profile info */}
          <div className="flex items-center space-x-3 lg:px-[60px] lg:py-[16px]">
            {/* Profile Image */}
            <div className="w-[80px] h-[80px] rounded-full overflow-hidden bg-gray-300">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Name and supporting text */}
            <div>
              <h2 className="text-sm mb-0 md:text-base font-medium text-black">Upendra Sir</h2>
              <p className="text-sm mb-0 text-gray-500">Counselor</p>
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