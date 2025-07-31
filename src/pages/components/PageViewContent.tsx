import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface PageViewContentProps {
  pageDescription?: string
  contentImageUrl?: string
  contentVideoUrl?: string
  ctaText?: string
  ctaButtonText?: string
  ctaButtonLink?: string
  bodyContent?: string
  content?: string
}

const PageViewContent = ({
  pageDescription,
  contentImageUrl,
  contentVideoUrl,
  ctaText,
  ctaButtonText,
  ctaButtonLink,
  bodyContent,
  content,
}: PageViewContentProps) => {
  const getVideoEmbedUrl = (url: string) => {
    if (!url) return null

    // YouTube
    const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
    if (youtubeMatch) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}`
    }

    // Vimeo
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
    if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}`
    }

    return url
  }

  // Mock related pages data - in a real app, you'd fetch this from your API
  const relatedPages = [
    {
      id: '1',
      title: 'How to Improve Your Study Habits',
      slug: 'improve-study-habits',
      excerpt: 'Learn proven techniques to enhance your learning efficiency.'
    },
    {
      id: '2',
      title: 'Time Management for Students',
      slug: 'time-management',
      excerpt: 'Master your schedule and get more done in less time.'
    },
    {
      id: '3',
      title: 'Exam Preparation Strategies',
      slug: 'exam-preparation',
      excerpt: 'Prepare effectively for your upcoming exams.'
    }
  ]

  return (
    <div className="w-full">
      {/* Hero Section with Content */}
      {(pageDescription || contentImageUrl || contentVideoUrl || ctaText) && (
        <section className="relative py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-400/10 to-blue-400/10 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Content Column */}
              <div className="space-y-8">
                {pageDescription && (
                  <div className="group">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/60 hover:shadow-xl hover:bg-white/90 transition-all duration-300 list-none">
                      <div
                        dangerouslySetInnerHTML={{ __html: pageDescription }}
                        className="prose prose-lg prose-slate max-w-none [&>h1]:text-3xl [&>h1]
                        prose:list-none :font-bold [&>h1]:text-slate-900 [&>h1]:mb-6 [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:text-primary [&>h2]:mb-4 [&>p]:text-primary [&>p]:leading-relaxed"
                      />
                    </div>
                  </div>
                )}

                {ctaText && (
                  <div className="group">
                    <div className="bg-gradient-to-br from-white/90 to-slate-50/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/60 hover:shadow-xl transition-all duration-300">
                      <div className="flex items-start gap-4">
                      
                        <div className="flex-1 space-y-6">
                          <p className="text-slate-700 text-lg leading-relaxed font-medium">{ctaText}</p>
                          {ctaButtonText && ctaButtonLink && (
                            <Button
                              asChild
                              size="lg"
                              className="bg-accent hover:bg-accent/90 shadow-xl hover:shadow-2xl hover:shadow-accent/25 
                transition-all duration-300 text-lg px-8 py-6 text-white transform hover:scale-105"

                            >
                              <a href={ctaButtonLink} className="inline-flex items-center">
                                {ctaButtonText}
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Media Column */}
              <div className="relative">
                {contentVideoUrl ? (
                  <div className="group relative">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/60 hover:shadow-xl transition-all duration-300">
                      <div className="aspect-video relative rounded-xl overflow-hidden bg-slate-100">
                        <iframe
                          src={getVideoEmbedUrl(contentVideoUrl) || ""}
                          className="w-full h-full"
                          frameBorder="0"
                          allowFullScreen
                          title="Content Video"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                ) : contentImageUrl ? (
                  <div className="group relative">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/60 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                      <div className="relative rounded-xl overflow-hidden">
                        <img
                          src={contentImageUrl || "/placeholder.svg"}
                          alt="Content illustration"
                          className="w-full h-auto object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Content with Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content Column (Left) */}
          <div className="lg:w-2/3">
            {/* Body Content Section */}
            {bodyContent && (
              <section className="mb-16">
                <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 lg:p-12 hover:shadow-2xl transition-shadow duration-500">
                  <div
                    dangerouslySetInnerHTML={{ __html: bodyContent }}
                    className="prose prose-xl prose-slate max-w-none [&>h1]:text-4xl [&>h1]:font-bold [&>h1]:text-slate-900 [&>h1]:mb-8 [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:text-slate-900 [&>h2]:mt-12 [&>h2]:mb-6 [&>h3]:text-xl [&>h3]:font-medium [&>h3]:text-slate-800 [&>h3]:mt-8 [&>h3]:mb-4 [&>p]:mb-6 [&>p]:text-slate-600 [&>p]:leading-relaxed [&>ul]:mb-6 [&>ol]:mb-6 [&>li]:mb-2 [&>blockquote]:border-l-4 [&>blockquote]:border-blue-500 [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:text-slate-600"
                  />
                </div>
              </section>
            )}

            {/* Legacy Content Section */}
            {content && (
              <section className="mb-16">
                <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 lg:p-12 hover:shadow-2xl transition-shadow duration-500">
                  <div
                    dangerouslySetInnerHTML={{ __html: content }}
                    className="prose prose-xl prose-slate max-w-none whitespace-pre-wrap [&>h1]:text-4xl [&>h1]:font-bold [&>h1]:text-primary [&>h1]:mb-8 [&>h2]:text-2xl 
                    [&>h2]:font-semibold [&>h2]:text-slate-900 [&>h2]:mt-12 [&>h2]:mb-6 
                    [&>p]:mb-6 [&>p]:text-slate-600 
                    [&>p]:leading-relaxed"
                  />
                </div>
              </section>
            )}
          </div>

          {/* Sidebar Column (Right) - Sticky */}
          <div className="lg:w-1/3">
            <div className="sticky top-24 space-y-8">
              {/* Related Pages Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="bg-primary/10 p-3 rounded-lg mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">Related Pages</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {relatedPages.map((page) => (
                      <a 
                        key={page.id} 
                        href={`/${page.slug}`}
                        className="block group"
                      >
                        <div className="p-4 rounded-lg border border-slate-100 hover:border-primary/30 hover:bg-primary/5 transition-colors duration-300">
                          <h4 className="font-semibold text-slate-800 group-hover:text-primary transition-colors duration-300">
                            {page.title}
                          </h4>
                          <p className="text-sm text-slate-500 mt-1 line-clamp-2">
                            {page.excerpt}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA Card */}
              {ctaButtonText && ctaButtonLink && (
                <div className="bg-gradient-to-br from-primary to-blue-600 rounded-2xl shadow-lg overflow-hidden">
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-white mb-3">Need more information?</h3>
                    <p className="text-white/90 mb-6">Get in touch with our team for personalized assistance.</p>
                    <Button
                      asChild
                      size="lg"
                      className="bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300 w-full"
                    >
                      <a href={ctaButtonLink} className="inline-flex items-center">
                        {ctaButtonText}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageViewContent