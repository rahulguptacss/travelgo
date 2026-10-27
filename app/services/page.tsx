import React from 'react';
import type { Metadata } from 'next';
import Header from '../../components/sections/Header/page';
import Breadcrumb from '../../components/sections/Breadcrumb/page';
import Services from '../../components/sections/Services/page';
import Footer from '../../components/sections/Footer/page';
import BackToTop from '../../components/ui/BackToTop';
import { common, pages, sections, type PageComponent } from '../../components/types';

const pageData = pages.services || {
  title: 'Our Services | TravelGo Dubai',
  pageName: 'Our Services',
  metadata: {
    title: 'Our Services | TravelGo Dubai Desert Safari & Tours',
    description: 'Explore our comprehensive travel services across Dubai and UAE.',
  },
  watermark: 'Services',
  components: [
    { key: 'BreadcrumbSection', component: 'Breadcrumb' },
    { key: 'ServicesSection', component: 'Services' },
  ],
};

export const metadata: Metadata = {
  title: pageData.metadata.title,
  description: pageData.metadata.description,
};

export default function ServicesPage() {
  const servicesData = sections.services!;
  const sectionMap: Record<string, React.ReactNode> = {
    Breadcrumb: (
      <Breadcrumb
        data={sections.breadcrumb}
        currentPage={pageData.pageName}
        watermark={pageData.watermark}
      />
    ),
    Services: <Services data={servicesData} />,
  };

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <Header data={common.Header} />
      <main className="w-full flex-1">
        {pageData.components.map((block: PageComponent) => (
          <React.Fragment key={block.key}>
            {sectionMap[block.component] ?? null}
          </React.Fragment>
        ))}
      </main>
      <Footer data={common.Footer} />
      <BackToTop data={common.BackToTop} />
    </div>
  );
}
