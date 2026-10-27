import React from 'react';
import type { Metadata } from 'next';
import Header from '../../components/sections/Header/page';
import Breadcrumb from '../../components/sections/Breadcrumb/page';
import EnquirySection from '../../components/sections/Enquiry/page';
import Footer from '../../components/sections/Footer/page';
import BackToTop from '../../components/ui/BackToTop';
import { common, pages, sections, type PageComponent } from '../../components/types';

const pageData = pages.enquiry_now || {
  title: 'Enquiry Now | Dubai Desert Safari Tours',
  pageName: 'Enquiry Now',
  metadata: {
    title: 'Enquiry Now | Dubai Desert Safari & Tours',
    description:
      'Fill out the form below and our team will get back to you with the best Dubai Desert Safari package details.',
  },
  watermark: 'Enquiry',
  components: [
    { key: 'BreadcrumbSection', component: 'Breadcrumb' },
    { key: 'EnquirySection', component: 'Enquiry' },
  ],
};

export const metadata: Metadata = {
  title: pageData.metadata.title,
  description: pageData.metadata.description,
};

export default function EnquiryNowPage() {
  const enquiryData = sections.enquiry!;
  const sectionMap: Record<string, React.ReactNode> = {
    Breadcrumb: (
      <Breadcrumb
        data={sections.breadcrumb}
        currentPage={pageData.pageName}
        watermark={pageData.watermark}
      />
    ),
    Enquiry: <EnquirySection data={enquiryData} />,
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
