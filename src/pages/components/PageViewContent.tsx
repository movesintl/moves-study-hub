
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface PageViewContentProps {
  pageDescription?: string;
  contentImageUrl?: string;
  contentVideoUrl?: string;
  ctaText?: string;
  ctaButtonText?: string;
  ctaButtonLink?: string;
  bodyContent?: string;
  content?: string;
}

const PageViewContent = ({
  pageDescription,
  contentImageUrl,
  contentVideoUrl,
  ctaText,
  ctaButtonText,
  ctaButtonLink,
  bodyContent,
  content
}: PageViewContentProps) => {
  const getVideoEmbedUrl = (url: string) => {
    if (!url) return null;
    
    // YouTube
    const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    if (youtubeMatch) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
    }
    
    // Vimeo
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    }
    
    return url;
  };

  return (
    <>
      {/* Main Content Area - Modern Floating Cards Design */}
      {(pageDescription || contentImageUrl || contentVideoUrl || ctaText) && (
        <section className="relative py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
          {/* Background Decorations */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-emerald-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content Side */}
              <div className="space-y-8">
                {pageDescription && (
                  <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500">
                    <div className="prose prose-lg prose-slate max-w-none">
                      <div 
                        dangerouslySetInnerHTML={{ __html: pageDescription }}
                        className="text-slate-700 leading-relaxed"
                      />
                    </div>
                  </div>
                )}
                
                {ctaText && (
                  <div className="bg-gradient-to-br from-white/80 to-slate-50/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 hover:shadow-2xl hover:scale-[1.02] transition-all duration-500">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-slate-700 mb-6 text-lg leading-relaxed font-medium">{ctaText}</p>
                        {ctaButtonText && ctaButtonLink && (
                          <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300">
                            <a href={ctaButtonLink} className="inline-flex items-center">
                              {ctaButtonText}
                              <ArrowRight className="ml-2 h-5 w-5" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Media Side */}
              <div className="relative">
                <div className="relative group">
                  {contentVideoUrl ? (
                    <div className="aspect-video relative bg-white/70 backdrop-blur-sm rounded-3xl p-4 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500">
                      <iframe 
                        src={getVideoEmbedUrl(contentVideoUrl) || ''}
                        className="w-full h-full rounded-2xl"
                        frameBorder="0"
                        allowFullScreen
                      />
                    </div>
                  ) : contentImageUrl ? (
                    <div className="relative bg-white/70 backdrop-blur-sm rounded-3xl p-4 shadow-xl border border-white/50 hover:shadow-2xl hover:scale-[1.02] transition-all duration-500">
                      <img 
                        src={contentImageUrl} 
                        alt="Content illustration"
                        className="w-full rounded-2xl object-cover"
                      />
                      <div className="absolute inset-4 rounded-2xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Body Content - Elegant Typography */}
      {bodyContent && (
        <section className="py-24 bg-white relative">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-white"></div>
          <div className="relative max-w-5xl mx-auto px-4">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-12 hover:shadow-2xl transition-shadow duration-500">
              <div className="prose prose-xl prose-slate max-w-none">
                <div 
                  dangerouslySetInnerHTML={{ __html: bodyContent }}
                  className="text-slate-700 leading-relaxed [&>h1]:text-4xl [&>h1]:font-bold [&>h1]:text-slate-900 [&>h1]:mb-8 [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:text-slate-900 [&>h2]:mt-12 [&>h2]:mb-6 [&>h3]:text-xl [&>h3]:font-medium [&>h3]:text-slate-800 [&>h3]:mt-8 [&>h3]:mb-4 [&>p]:mb-6 [&>ul]:mb-6 [&>ol]:mb-6 [&>li]:mb-2"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Legacy Content - Modern Card Style */}
      {content && (
        <section className="py-24 bg-gradient-to-br from-gray-50 to-slate-50">
          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-12 hover:shadow-2xl transition-shadow duration-500">
              <div className="prose prose-xl prose-slate max-w-none">
                <div 
                  dangerouslySetInnerHTML={{ __html: content }}
                  className="whitespace-pre-wrap text-slate-700 leading-relaxed [&>h1]:text-4xl [&>h1]:font-bold [&>h1]:text-slate-900 [&>h1]:mb-8 [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:text-slate-900 [&>h2]:mt-12 [&>h2]:mb-6 [&>p]:mb-6"
                />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default PageViewContent;
