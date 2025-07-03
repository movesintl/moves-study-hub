export const visualBuilderBlocks = [
  {
    id: 'basic-text',
    label: '📝 Text',
    category: 'Basic',
    content: '<p class="text-gray-800 leading-relaxed">Click to edit this text. You can change the font, size, color and more.</p>',
  },
  {
    id: 'heading-h1',
    label: '📰 Heading 1',
    category: 'Basic',
    content: '<h1 class="text-4xl font-bold text-gray-900 mb-4">Main Heading</h1>',
  },
  {
    id: 'heading-h2',
    label: '📰 Heading 2', 
    category: 'Basic',
    content: '<h2 class="text-3xl font-bold text-gray-900 mb-3">Section Heading</h2>',
  },
  {
    id: 'heading-h3',
    label: '📰 Heading 3',
    category: 'Basic',
    content: '<h3 class="text-2xl font-semibold text-gray-900 mb-2">Subsection Heading</h3>',
  },
  {
    id: 'image',
    label: '🖼️ Image',
    category: 'Media',
    select: true,
    content: '<img src="https://via.placeholder.com/400x300" alt="Placeholder" class="w-full h-auto rounded-lg shadow-md max-w-md" />',
    activate: true,
  },
  {
    id: 'button',
    label: '🔘 Button',
    category: 'Basic',
    content: '<a href="#" class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">Button Text</a>',
  },
  {
    id: 'hero',
    label: '🦸 Hero Section',
    category: 'Sections',
    content: `
      <section class="hero bg-gradient-to-r from-blue-600 to-purple-600 text-white py-24">
        <div class="container mx-auto px-4 text-center">
          <h1 class="text-5xl font-bold mb-6">Hero Title</h1>
          <p class="text-xl mb-8">Hero subtitle description goes here</p>
          <a href="#" class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">Get Started</a>
        </div>
      </section>
    `,
  },
  {
    id: 'card',
    label: '🎴 Card',
    category: 'Components',
    content: `
      <div class="bg-white rounded-lg shadow-lg p-6 border border-gray-200 max-w-sm">
        <img src="https://via.placeholder.com/300x200" alt="Card image" class="w-full h-48 object-cover rounded-lg mb-4" />
        <h3 class="text-xl font-semibold mb-2">Card Title</h3>
        <p class="text-gray-600 mb-4">Card description goes here. This is a sample card component.</p>
        <a href="#" class="text-blue-600 font-semibold hover:text-blue-800">Read More →</a>
      </div>
    `,
  },
  {
    id: 'section',
    label: '📦 Section',
    category: 'Layout',
    content: '<section class="py-16"><div class="container mx-auto px-4"><h2 class="text-3xl font-bold mb-4">Section Title</h2><p class="text-gray-600">Section content goes here</p></div></section>',
  },
  {
    id: 'container',
    label: '📦 Container',
    category: 'Layout',
    content: '<div class="container mx-auto px-4 py-8"><p class="text-center text-gray-500">Add your content here</p></div>',
  },
  {
    id: 'two-columns',
    label: '📊 2 Columns',
    category: 'Layout',
    content: `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
        <div class="bg-gray-50 p-6 rounded-lg">
          <h3 class="text-xl font-semibold mb-3">Column 1</h3>
          <p class="text-gray-600">Content for first column</p>
        </div>
        <div class="bg-gray-50 p-6 rounded-lg">
          <h3 class="text-xl font-semibold mb-3">Column 2</h3>
          <p class="text-gray-600">Content for second column</p>
        </div>
      </div>
    `,
  },
  {
    id: 'testimonial',
    label: '💬 Testimonial',
    category: 'Components',
    content: `
      <div class="bg-gray-50 rounded-lg p-8 text-center max-w-lg">
        <div class="mb-6">
          <svg class="w-8 h-8 mx-auto text-gray-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
          </svg>
        </div>
        <p class="text-lg italic text-gray-700 mb-6">"This is a great testimonial from a satisfied customer."</p>
        <div class="flex items-center justify-center">
          <img src="https://via.placeholder.com/60x60" alt="Customer" class="w-12 h-12 rounded-full mr-4" />
          <div>
            <p class="font-semibold">Customer Name</p>
            <p class="text-gray-500 text-sm">Customer Title</p>
          </div>
        </div>
      </div>
    `,
  },
  {
    id: 'cta',
    label: '📢 Call to Action',
    category: 'Sections',
    content: `
      <section class="bg-blue-600 text-white py-16">
        <div class="container mx-auto px-4 text-center">
          <h2 class="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p class="text-xl mb-8">Join thousands of satisfied customers today</p>
          <a href="#" class="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">Start Now</a>
        </div>
      </section>
    `,
  },
  {
    id: 'contact-form',
    label: '📝 Contact Form',
    category: 'Forms',
    content: `
      <div class="bg-gray-50 p-8 rounded-lg max-w-lg">
        <h2 class="text-2xl font-bold mb-6 text-center">Contact Us</h2>
        <form class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="First Name" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            <input type="text" placeholder="Last Name" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <input type="email" placeholder="Email Address" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          <textarea placeholder="Your Message" rows="4" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
          <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">Send Message</button>
        </form>
      </div>
    `,
  },
  {
    id: 'three-columns',
    label: '📊 3 Columns',
    category: 'Layout',
    content: `
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
        <div class="text-center">
          <div class="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold mb-2">Feature 1</h3>
          <p class="text-gray-600 text-sm">Description of first feature</p>
        </div>
        <div class="text-center">
          <div class="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold mb-2">Feature 2</h3>
          <p class="text-gray-600 text-sm">Description of second feature</p>
        </div>
        <div class="text-center">
          <div class="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold mb-2">Feature 3</h3>
          <p class="text-gray-600 text-sm">Description of third feature</p>
        </div>
      </div>
    `,
  },
  {
    id: 'stats',
    label: '📊 Stats Section',
    category: 'Sections',
    content: `
      <section class="bg-blue-600 text-white py-16">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div class="text-4xl font-bold mb-2">1000+</div>
              <div class="text-blue-200">Happy Customers</div>
            </div>
            <div>
              <div class="text-4xl font-bold mb-2">50+</div>
              <div class="text-blue-200">Projects Completed</div>
            </div>
            <div>
              <div class="text-4xl font-bold mb-2">24/7</div>
              <div class="text-blue-200">Support Available</div>
            </div>
            <div>
              <div class="text-4xl font-bold mb-2">99%</div>
              <div class="text-blue-200">Success Rate</div>
            </div>
          </div>
        </div>
      </section>
    `,
  },
  {
    id: 'gallery',
    label: '🖼️ Image Gallery',
    category: 'Media',
    content: `
      <div class="py-8">
        <h2 class="text-2xl font-bold text-center mb-8">Gallery</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <img src="https://via.placeholder.com/300x300" alt="Gallery 1" class="w-full h-48 object-cover rounded-lg hover:opacity-80 transition-opacity cursor-pointer" />
          <img src="https://via.placeholder.com/300x300" alt="Gallery 2" class="w-full h-48 object-cover rounded-lg hover:opacity-80 transition-opacity cursor-pointer" />
          <img src="https://via.placeholder.com/300x300" alt="Gallery 3" class="w-full h-48 object-cover rounded-lg hover:opacity-80 transition-opacity cursor-pointer" />
          <img src="https://via.placeholder.com/300x300" alt="Gallery 4" class="w-full h-48 object-cover rounded-lg hover:opacity-80 transition-opacity cursor-pointer" />
        </div>
      </div>
    `,
  },
  {
    id: 'video',
    label: '🎥 Video',
    category: 'Media',
    content: `
      <div class="py-8 max-w-4xl">
        <div class="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
          <iframe 
            src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
            class="w-full h-64 md:h-96" 
            frameborder="0" 
            allowfullscreen>
          </iframe>
        </div>
      </div>
    `,
  },
  {
    id: 'divider',
    label: '➖ Divider',
    category: 'Basic',
    content: '<hr class="border-gray-300 my-8 max-w-4xl" />',
  },
  {
    id: 'spacer',
    label: '⬜ Spacer',
    category: 'Basic',
    content: '<div class="py-8"></div>',
  }
];