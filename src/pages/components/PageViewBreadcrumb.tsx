
import React from 'react';

interface PageViewBreadcrumbProps {
  pageTitle: string;
}

const PageViewBreadcrumb = ({ pageTitle }: PageViewBreadcrumbProps) => {
  return (
    <section className="bg-slate-800 py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-2 text-white">
          <a href="/" className="hover:text-orange-400 transition-colors">
            Home
          </a>
          <span className="text-orange-400">•</span>
          <span className="text-orange-400">{pageTitle}</span>
        </div>
      </div>
    </section>
  );
};

export default PageViewBreadcrumb;
