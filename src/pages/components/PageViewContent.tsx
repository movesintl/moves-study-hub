
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
      {/* Main Content Area */}
      {(pageDescription || contentImageUrl || contentVideoUrl || ctaText) && (
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                {pageDescription && (
                  <div className="prose prose-lg prose-primary max-w-none">
                    <div 
                      dangerouslySetInnerHTML={{ __html: pageDescription }}
                      className="text-gray-700 leading-relaxed"
                    />
                  </div>
                )}
                
                {ctaText && (
                  <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-8 rounded-2xl border border-primary/10">
                    <p className="text-gray-700 mb-6 text-lg leading-relaxed">{ctaText}</p>
                    {ctaButtonText && ctaButtonLink && (
                      <Button asChild size="lg">
                        <a href={ctaButtonLink} className="inline-flex items-center">
                          {ctaButtonText}
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </a>
                      </Button>
                    )}
                  </div>
                )}
              </div>
              
              <div className="relative">
                {contentVideoUrl ? (
                  <div className="aspect-video relative">
                    <iframe 
                      src={getVideoEmbedUrl(contentVideoUrl) || ''}
                      className="w-full h-full rounded-2xl"
                      frameBorder="0"
                      allowFullScreen
                    />
                  </div>
                ) : contentImageUrl ? (
                  <img 
                    src={contentImageUrl} 
                    alt="Content illustration"
                    className="w-full rounded-2xl"
                  />
                ) : null}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Body Content */}
      {bodyContent && (
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="prose prose-lg prose-primary max-w-none">
              <div 
                dangerouslySetInnerHTML={{ __html: bodyContent }}
                className="text-gray-700 leading-relaxed"
              />
            </div>
          </div>
        </section>
      )}

      {/* Legacy Content (for backward compatibility) */}
      {content && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="prose prose-lg prose-primary max-w-none">
              <div 
                dangerouslySetInnerHTML={{ __html: content }}
                className="whitespace-pre-wrap text-gray-700 leading-relaxed"
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default PageViewContent;
