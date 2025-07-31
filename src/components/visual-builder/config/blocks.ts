export const visualBuilderBlocks = [
  // ====== BASIC ELEMENTS ======
  {
    id: 'basic-text',
    label: '📝 Text',
    category: 'Basic',
    content: `
      <p class="text-gray-700 leading-relaxed mb-4">
        This is a basic text block. Double click to edit the content. 
        You can change font size, color, alignment and more using the style options.
      </p>
    `,
  },
  {
    id: 'heading-h1',
    label: '📰 Heading 1',
    category: 'Basic',
    content: `
      <h1 class="text-4xl font-bold text-gray-900 mb-6">
        Main Page Heading
      </h1>
    `,
  },
  {
    id: 'heading-h2',
    label: '📰 Heading 2', 
    category: 'Basic',
    content: `
      <h2 class="text-3xl font-semibold text-gray-800 mb-4">
        Section Heading
      </h2>
    `,
  },
  {
    id: 'heading-h3',
    label: '📰 Heading 3',
    category: 'Basic',
    content: `
      <h3 class="text-2xl font-medium text-gray-700 mb-3">
        Subsection Heading
      </h3>
    `,
  },
  {
    id: 'divider',
    label: '➖ Divider',
    category: 'Basic',
    content: `
      <hr class="border-t border-gray-200 my-8 w-full max-w-3xl mx-auto" />
    `,
  },
  {
    id: 'spacer',
    label: '⬜ Spacer',
    category: 'Basic',
    content: `
      <div class="h-12"></div>
    `,
  },

  // ====== MEDIA ======
  {
    id: 'image',
    label: '🖼️ Image',
    category: 'Media',
    content: `
      <div class="group relative">
        <img 
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
          alt="Sample image" 
          class="w-full h-auto rounded-lg shadow-md transition-all duration-300 group-hover:shadow-lg"
        />
        <div class="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"></div>
      </div>
    `,
  },
  {
    id: 'video',
    label: '🎥 Video',
    category: 'Media',
    content: `
      <div class="relative aspect-w-16 aspect-h-9 bg-gray-200 rounded-xl overflow-hidden shadow-lg">
        <iframe 
          src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
          class="absolute top-0 left-0 w-full h-full"
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen
        ></iframe>
      </div>
    `,
  },
  {
    id: 'gallery',
    label: '🖼️ Gallery',
    category: 'Media',
    content: `
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
          alt="Gallery 1" 
          class="w-full h-48 object-cover rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
        />
        <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
          alt="Gallery 2" 
          class="w-full h-48 object-cover rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
        />
        <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
          alt="Gallery 3" 
          class="w-full h-48 object-cover rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
        />
      </div>
    `,
  },

  // ====== COMPONENTS ======
  {
    id: 'button',
    label: '🔘 Button',
    category: 'Components',
    content: `
      <div class="flex flex-wrap gap-4">
        <button class="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg">
          Primary Button
        </button>
        <button class="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm hover:shadow-md">
          Secondary Button
        </button>
      </div>
    `,
  },
  {
    id: 'card',
    label: '🎴 Card',
    category: 'Components',
    content: `
      <div class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow max-w-sm">
        <img 
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
          alt="Card image" 
          class="w-full h-48 object-cover"
        />
        <div class="p-6">
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Card Title</h3>
          <p class="text-gray-600 mb-4">This is a sample card component with image, title, description and action button.</p>
          <button class="text-blue-600 font-medium hover:text-blue-800 transition-colors">
            Learn More →
          </button>
        </div>
      </div>
    `,
  },
  {
    id: 'testimonial',
    label: '💬 Testimonial',
    category: 'Components',
    content: `
      <div class="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-2xl">
        <div class="mb-6 text-blue-500">
          <svg class="w-8 h-8 mx-auto" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
          </svg>
        </div>
        <p class="text-lg text-gray-700 mb-6 text-center italic">
          "This product has completely transformed my workflow. The quality and attention to detail is outstanding."
        </p>
        <div class="flex items-center justify-center">
          <img 
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80" 
            alt="Customer" 
            class="w-12 h-12 rounded-full object-cover mr-4"
          />
          <div>
            <p class="font-medium text-gray-900">Sarah Johnson</p>
            <p class="text-sm text-gray-500">Marketing Director, Acme Inc</p>
          </div>
        </div>
      </div>
    `,
  },
  {
    id: 'feature-card',
    label: '✨ Feature Card',
    category: 'Components',
    content: `
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow h-full">
        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
          <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Feature Title</h3>
        <p class="text-gray-600">This is a feature description that explains what this feature does and its benefits.</p>
      </div>
    `,
  },

  // ====== LAYOUT ======
  {
    id: 'container',
    label: '📦 Container',
    category: 'Layout',
    content: `
      <div class="container mx-auto px-4 py-8">
        <p class="text-center text-gray-500">Your content goes here inside this centered container</p>
      </div>
    `,
  },
  {
    id: 'section',
    label: '📦 Section',
    category: 'Layout',
    content: `
      <section class="py-16">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold text-center mb-8">Section Title</h2>
          <p class="text-gray-600 max-w-2xl mx-auto text-center">
            This is a section container that you can use to organize your content. 
            Add any components inside this section.
          </p>
        </div>
      </section>
    `,
  },
  {
    id: 'two-columns',
    label: '📊 2 Columns',
    category: 'Layout',
    content: `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
        <div class="bg-gray-50 p-6 rounded-lg">
          <h3 class="text-xl font-semibold mb-3">Left Column</h3>
          <p class="text-gray-600">Content for the left column goes here</p>
        </div>
        <div class="bg-gray-50 p-6 rounded-lg">
          <h3 class="text-xl font-semibold mb-3">Right Column</h3>
          <p class="text-gray-600">Content for the right column goes here</p>
        </div>
      </div>
    `,
  },
  {
    id: 'three-columns',
    label: '📊 3 Columns',
    category: 'Layout',
    content: `
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
        <div class="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100">
          <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold mb-2">Feature 1</h3>
          <p class="text-gray-600 text-sm">Description of first feature</p>
        </div>
        <div class="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold mb-2">Feature 2</h3>
          <p class="text-gray-600 text-sm">Description of second feature</p>
        </div>
        <div class="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100">
          <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
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

  // ====== SECTIONS ======
  {
    id: 'hero',
    label: '🦸 Hero',
    category: 'Sections',
    content: `
      <section class="relative py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white overflow-hidden">
        <div class="absolute inset-0 opacity-10">
          <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579547945413-497e1b99dac0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center"></div>
        </div>
        <div class="container mx-auto px-4 relative z-10">
          <div class="max-w-3xl mx-auto text-center">
            <h1 class="text-5xl font-bold mb-6">Your Awesome Headline Here</h1>
            <p class="text-xl mb-8 opacity-90">
              A compelling subheading that explains your value proposition and encourages visitors to take action.
            </p>
            <div class="flex flex-wrap justify-center gap-4">
              <button class="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl">
                Primary Action
              </button>
              <button class="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
                Secondary Action
              </button>
            </div>
          </div>
        </div>
      </section>
    `,
  },
  {
    id: 'cta',
    label: '📢 CTA',
    category: 'Sections',
    content: `
      <section class="py-16 bg-gray-900 text-white">
        <div class="container mx-auto px-4">
          <div class="max-w-4xl mx-auto text-center">
            <h2 class="text-3xl font-bold mb-4">Ready to get started?</h2>
            <p class="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of satisfied customers who are already using our product.
            </p>
            <button class="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl">
              Get Started Now
            </button>
          </div>
        </div>
      </section>
    `,
  },
  {
    id: 'stats',
    label: '📊 Stats',
    category: 'Sections',
    content: `
      <section class="py-16 bg-white">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div class="p-6">
              <div class="text-5xl font-bold text-blue-600 mb-2">10K+</div>
              <div class="text-gray-600">Happy Customers</div>
            </div>
            <div class="p-6">
              <div class="text-5xl font-bold text-green-600 mb-2">99%</div>
              <div class="text-gray-600">Satisfaction Rate</div>
            </div>
            <div class="p-6">
              <div class="text-5xl font-bold text-purple-600 mb-2">24/7</div>
              <div class="text-gray-600">Support Available</div>
            </div>
            <div class="p-6">
              <div class="text-5xl font-bold text-orange-600 mb-2">5+</div>
              <div class="text-gray-600">Years Experience</div>
            </div>
          </div>
        </div>
      </section>
    `,
  },

  // ====== FORMS ======
  {
    id: 'contact-form',
    label: '📝 Contact Form',
    category: 'Forms',
    content: `
      <div class="bg-white p-8 rounded-xl shadow-md border border-gray-200 max-w-2xl mx-auto">
        <h2 class="text-2xl font-bold text-center mb-6">Contact Us</h2>
        <form class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="first-name" class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input 
                type="text" 
                id="first-name" 
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="John"
              />
            </div>
            <div>
              <label for="last-name" class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input 
                type="text" 
                id="last-name" 
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Doe"
              />
            </div>
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              id="email" 
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea 
              id="message" 
              rows="4" 
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your message here..."
            ></textarea>
          </div>
          <button 
            type="submit" 
            class="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
          >
            Send Message
          </button>
        </form>
      </div>
    `,
  },
  {
    id: 'newsletter',
    label: '✉️ Newsletter',
    category: 'Forms',
    content: `
      <div class="bg-white p-8 rounded-xl shadow-sm border border-gray-200 max-w-2xl mx-auto">
        <h2 class="text-2xl font-bold text-center mb-2">Subscribe to our newsletter</h2>
        <p class="text-gray-600 text-center mb-6">Get the latest updates and news delivered to your inbox</p>
        <form class="flex flex-col sm:flex-row gap-2">
          <input 
            type="email" 
            placeholder="Your email address" 
            class="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <button 
            type="submit" 
            class="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>
        <p class="text-xs text-gray-500 mt-3 text-center">We respect your privacy. Unsubscribe at any time.</p>
      </div>
    `,
  }
];