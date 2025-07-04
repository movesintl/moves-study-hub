import bg from "@/../public/bg.svg";
export default function Process() {
  return (
    <section
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      className=" py-16 px-4 md:px-6 lg:px-8 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8 pt-0 lg:pt-24">
          <p className="text-gray-500 text-sm font-medium uppercase tracking-wide mb-2">
            OUR PROCESS
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            How It Works
          </h2>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 -mt-8">
          {/* Step 1 */}
          <div className="text-center relative h-[300px] flex justify-center items-center">
            <div className="border-r-[1px] border-gray-300 h-fit pr-12">
              <div className="relative mb-6">
                <div className="w-32 h-32 mx-auto bg-blue-100 rounded-full flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full"></div>
                  <div className="relative z-10">
                    {/* Laptop illustration */}
                    <div className="w-16 h-12 bg-white rounded-sm relative">
                      <div className="w-full h-8 bg-gray-200 rounded-t-sm"></div>
                      <div className="w-full h-4 bg-gray-100 rounded-b-sm"></div>
                    </div>
                    {/* Person illustration */}
                    <div className="absolute -right-2 -top-2 w-8 h-8 bg-orange-400 rounded-full"></div>
                    <div className="absolute -right-1 top-6 w-6 h-8 bg-orange-300 rounded-sm"></div>
                  </div>
                </div>
              </div>
              <h3 className=" text-gray-900 mb-2">Browse From More Than</h3>
              <p className="font-semibold text-gray-900">
                1000 Courses & Colleges
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="text-center relative h-[400px] flex justify-center items-center">
            <div className="border-r-[1px] border-gray-300 h-fit pr-12">
              <div className="relative mb-6">
                <div className="w-32 h-32 mx-auto bg-red-100 rounded-full flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-pink-400 rounded-full"></div>
                  <div className="relative z-10">
                    {/* Filter/list illustration */}
                    <div className="space-y-1">
                      <div className="w-12 h-2 bg-white rounded"></div>
                      <div className="w-10 h-2 bg-white rounded"></div>
                      <div className="w-8 h-2 bg-white rounded"></div>
                    </div>
                    {/* Person illustration */}
                    <div className="absolute -left-3 -top-1 w-6 h-6 bg-yellow-400 rounded-full"></div>
                    <div className="absolute -left-2 top-5 w-4 h-6 bg-yellow-300 rounded-sm"></div>
                  </div>
                </div>
                {/* Decorative dots */}
                <div className="absolute top-4 right-4 w-3 h-3 bg-red-300 rounded-full"></div>
                <div className="absolute bottom-8 left-2 w-2 h-2 bg-pink-300 rounded-full"></div>
              </div>
              <h3 className=" text-gray-900 mb-2">Set Your Desired</h3>
              <p className="font-semibold text-gray-900">
                Filters & Shortlist Courses
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="text-center relative h-[500px] flex justify-center items-center">
            <div className="border-r-[1px] border-gray-300 h-fit pr-12">
              <div className="relative mb-6">
                <div className="w-32 h-32 mx-auto bg-cyan-100 rounded-full flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full"></div>
                  <div className="relative z-10">
                    {/* Comparison interface */}
                    <div className="w-12 h-12 bg-white rounded flex items-center justify-center">
                      <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
                        <div className="w-3 h-2 border-l-2 border-b-2 border-white transform rotate-45"></div>
                      </div>
                    </div>
                    <div className="absolute -right-2 -top-2 w-4 h-4 bg-red-500 rounded flex items-center justify-center">
                      <div className="w-2 h-2 bg-white"></div>
                    </div>
                    {/* Person illustration */}
                    <div className="absolute -left-4 top-2 w-6 h-6 bg-green-400 rounded-full"></div>
                    <div className="absolute -left-3 top-8 w-4 h-6 bg-green-300 rounded-sm"></div>
                  </div>
                </div>
              </div>
              <h3 className=" text-gray-900 mb-2">Compare Courses</h3>
              <p className="font-semibold text-gray-900">
                On The Go Before You Apply
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="text-center relative h-[600px]  flex justify-center items-center">
            <div>
              <div className="relative mb-6">
                <div className="w-32 h-32 mx-auto bg-yellow-100 rounded-full flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full"></div>
                  <div className="relative z-10">
                    {/* Folder/envelope illustration */}
                    <div className="w-14 h-10 bg-yellow-300 relative">
                      <div className="absolute top-0 left-0 w-6 h-4 bg-yellow-400 transform -skew-x-12"></div>
                      <div className="w-full h-full bg-yellow-200 flex items-center justify-center">
                        <div className="space-y-1">
                          <div className="w-8 h-1 bg-yellow-600"></div>
                          <div className="w-6 h-1 bg-yellow-600"></div>
                          <div className="w-4 h-1 bg-yellow-600"></div>
                        </div>
                      </div>
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-pink-400 rounded-full"></div>
                    <div className="absolute -bottom-1 -left-2 w-3 h-3 bg-purple-400 rounded-full"></div>
                  </div>
                </div>
                {/* Decorative dots */}
                <div className="absolute top-2 right-8 w-2 h-2 bg-pink-300 rounded-full"></div>
                <div className="absolute bottom-4 left-4 w-3 h-3 bg-purple-300 rounded-full"></div>
              </div>
              <h3 className=" text-gray-900 mb-2">Hassle Free Application</h3>
              <p className="font-semibold text-gray-900">
                Tracking and Counselling
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
