import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '../../../components/sections/Header/page';
import Breadcrumb from '../../../components/sections/Breadcrumb/page';
import PackageDetails from '../../../components/sections/PackageDetails/page';
import Footer from '../../../components/sections/Footer/page';
import BackToTop from '../../../components/ui/BackToTop';
import { common, pages, sections, packageDetails, type PageComponent } from '../../../components/types';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  if (!packageDetails) return [];
  return Object.keys(packageDetails).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const packageItem = packageDetails?.[slug];

  if (!packageItem) {
    return {
      title: 'Package Details | TravelGo Dubai',
      description: 'Explore our premium Dubai desert safari tours and travel experiences.',
    };
  }

  const title = `${packageItem.title_prefix} ${packageItem.title_highlight} | TravelGo Dubai`;
  const description = packageItem.about_description.slice(0, 160);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [packageItem.main_image],
    },
  };
}

export default async function DynamicPackageDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const packageItem = packageDetails?.[slug];

  // If not found in dictionary, fallback to morning-desert-safari or 404
  const activePackage = packageItem || packageDetails?.['morning-desert-safari'];

  if (!activePackage) {
    notFound();
  }

  const pageData = pages.package_details || {
    title: `${activePackage.title_prefix} ${activePackage.title_highlight} | TravelGo Dubai`,
    pageName: 'Package Details',
    metadata: {
      title: `${activePackage.title_prefix} ${activePackage.title_highlight}`,
      description: activePackage.about_description,
    },
    watermark: 'Package',
    components: [
      { key: 'BreadcrumbSection', component: 'Breadcrumb' },
      { key: 'PackageDetailsSection', component: 'PackageDetails' },
    ],
  };

  const sectionMap: Record<string, React.ReactNode> = {
    Breadcrumb: (
      <Breadcrumb
        data={sections.breadcrumb}
        currentPage={pageData.pageName || 'Package Details'}
        watermark={pageData.watermark || 'Package'}
      />
    ),
    PackageDetails: (
      <PackageDetails
        packageData={activePackage}
        enquiryForm={pageData.enquiry_form}
      />
    ),
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
