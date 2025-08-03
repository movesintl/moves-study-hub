export const visualBuilderBlocks = [
  // ====== BASIC ELEMENTS ======
  {
    id: 'basic-text',
    label: '📝 Text',
    category: 'Basic',
    content: `
      <p class="text-muted-foreground leading-relaxed mb-4">
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
      <h1 class="text-4xl font-bold text-foreground mb-6">
        Main Page Heading
      </h1>
    `,
  },
  {
    id: 'heading-h2',
    label: '📰 Heading 2', 
    category: 'Basic',
    content: `
      <h2 class="text-3xl font-semibold text-foreground mb-4">
        Section Heading
      </h2>
    `,
  },
  {
    id: 'heading-h3',
    label: '📰 Heading 3',
    category: 'Basic',
    content: `
      <h3 class="text-2xl font-medium text-muted-foreground mb-3">
        Subsection Heading
      </h3>
    `,
  },
  {
    id: 'divider',
    label: '➖ Divider',
    category: 'Basic',
    content: `
      <hr class="border-t border-border my-8 w-full max-w-3xl mx-auto" />
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
          class="w-full h-auto rounded-lg shadow-elegant transition-all duration-300 group-hover:shadow-brand"
        />
        <div class="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"></div>
      </div>
    `,
  },
  {
    id: 'video',
    label: '🎥 Video',
    category: 'Media',
    content: `
      <div class="relative aspect-w-16 aspect-h-9 bg-muted rounded-xl overflow-hidden shadow-elegant">
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
        <button class="px-6 py-3 bg-orange-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg">
          Primary Button
        </button>
        <button class="px-6 py-3 bg-background border border-border text-foreground font-medium rounded-lg hover:bg-muted transition-colors shadow-soft hover:shadow-elegant">
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
      <div class="bg-card rounded-xl shadow-elegant overflow-hidden border border-border hover:shadow-brand transition-shadow max-w-sm">
        <img 
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
          alt="Card image" 
          class="w-full h-48 object-cover"
        />
        <div class="p-6">
          <h3 class="text-xl font-semibold text-card-foreground mb-2">Card Title</h3>
          <p class="text-muted-foreground mb-4">This is a sample card component with image, title, description and action button.</p>
          <button class="text-primary font-medium hover:text-primary/80 transition-colors">
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
      <div class="bg-card p-8 rounded-xl shadow-elegant border border-border max-w-2xl">
        <div class="mb-6 text-primary">
          <svg class="w-8 h-8 mx-auto" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
          </svg>
        </div>
        <p class="text-lg text-card-foreground mb-6 text-center italic">
          "This product has completely transformed my workflow. The quality and attention to detail is outstanding."
        </p>
        <div class="flex items-center justify-center">
          <img 
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80" 
            alt="Customer" 
            class="w-12 h-12 rounded-full object-cover mr-4"
          />
          <div>
            <p class="font-medium text-card-foreground">Sarah Johnson</p>
            <p class="text-sm text-muted-foreground">Marketing Director, Acme Inc</p>
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
      <div class="bg-card p-6 rounded-xl shadow-elegant border border-border hover:shadow-brand transition-shadow h-full">
        <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
          <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-card-foreground mb-2">Feature Title</h3>
        <p class="text-muted-foreground">This is a feature description that explains what this feature does and its benefits.</p>
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
        <p class="text-center text-muted-foreground">Your content goes here inside this centered container</p>
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
          <h2 class="text-3xl font-bold text-center mb-8 text-foreground">Section Title</h2>
          <p class="text-muted-foreground max-w-2xl mx-auto text-center">
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
        <div class="bg-muted p-6 rounded-lg">
          <h3 class="text-xl font-semibold mb-3 text-foreground">Left Column</h3>
          <p class="text-muted-foreground">Content for the left column goes here</p>
        </div>
        <div class="bg-muted p-6 rounded-lg">
          <h3 class="text-xl font-semibold mb-3 text-foreground">Right Column</h3>
          <p class="text-muted-foreground">Content for the right column goes here</p>
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
        <div class="text-center p-6 bg-card rounded-lg shadow-elegant border border-border">
          <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold mb-2 text-card-foreground">Feature 1</h3>
          <p class="text-muted-foreground text-sm">Description of first feature</p>
        </div>
        <div class="text-center p-6 bg-card rounded-lg shadow-elegant border border-border">
          <div class="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold mb-2 text-card-foreground">Feature 2</h3>
          <p class="text-muted-foreground text-sm">Description of second feature</p>
        </div>
        <div class="text-center p-6 bg-card rounded-lg shadow-elegant border border-border">
          <div class="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold mb-2 text-card-foreground">Feature 3</h3>
          <p class="text-muted-foreground text-sm">Description of third feature</p>
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
      <section class="relative py-24 bg-gradient-brand text-primary-foreground overflow-hidden">
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
              <button class="px-8 py-4 bg-primary-foreground text-primary font-semibold rounded-lg hover:bg-primary-foreground/90 transition-colors shadow-elegant hover:shadow-brand">
                Primary Action
              </button>
              <button class="px-8 py-4 bg-transparent border-2 border-primary-foreground text-primary-foreground font-semibold rounded-lg hover:bg-primary-foreground/10 transition-colors">
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
      <section class="py-16 bg-primary text-primary-foreground">
        <div class="container mx-auto px-4">
          <div class="max-w-4xl mx-auto text-center">
            <h2 class="text-3xl font-bold mb-4">Ready to get started?</h2>
            <p class="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of satisfied customers who are already using our product.
            </p>
            <button class="px-8 py-4 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition-colors shadow-elegant hover:shadow-brand">
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
      <section class="py-16 bg-background">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div class="p-6">
              <div class="text-5xl font-bold text-primary mb-2">10K+</div>
              <div class="text-muted-foreground">Happy Customers</div>
            </div>
            <div class="p-6">
              <div class="text-5xl font-bold text-accent mb-2">99%</div>
              <div class="text-muted-foreground">Satisfaction Rate</div>
            </div>
            <div class="p-6">
              <div class="text-5xl font-bold text-primary mb-2">24/7</div>
              <div class="text-muted-foreground">Support Available</div>
            </div>
            <div class="p-6">
              <div class="text-5xl font-bold text-accent mb-2">5+</div>
              <div class="text-muted-foreground">Years Experience</div>
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
      <div class="bg-card p-8 rounded-xl shadow-elegant border border-border max-w-2xl mx-auto">
        <h2 class="text-2xl font-bold text-center mb-6 text-card-foreground">Contact Us</h2>
        <form class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="first-name" class="block text-sm font-medium text-card-foreground mb-1">First Name</label>
              <input 
                type="text" 
                id="first-name" 
                class="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
                placeholder="John"
              />
            </div>
            <div>
              <label for="last-name" class="block text-sm font-medium text-card-foreground mb-1">Last Name</label>
              <input 
                type="text" 
                id="last-name" 
                class="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
                placeholder="Doe"
              />
            </div>
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-card-foreground mb-1">Email</label>
            <input 
              type="email" 
              id="email" 
              class="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label for="message" class="block text-sm font-medium text-card-foreground mb-1">Message</label>
            <textarea 
              id="message" 
              rows="4" 
              class="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
              placeholder="Your message here..."
            ></textarea>
          </div>
          <button 
            type="submit" 
            class="w-full bg-primary text-primary-foreground py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-elegant hover:shadow-brand"
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
      <div class="bg-card p-8 rounded-xl shadow-elegant border border-border max-w-2xl mx-auto">
        <h2 class="text-2xl font-bold text-center mb-2 text-card-foreground">Subscribe to our newsletter</h2>
        <p class="text-muted-foreground text-center mb-6">Get the latest updates and news delivered to your inbox</p>
        <form class="flex flex-col sm:flex-row gap-2">
          <input 
            type="email" 
            placeholder="Your email address" 
            class="flex-grow px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
            required
          />
          <button 
            type="submit" 
            class="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>
        <p class="text-xs text-muted-foreground mt-3 text-center">We respect your privacy. Unsubscribe at any time.</p>
      </div>
    `,
  }
];