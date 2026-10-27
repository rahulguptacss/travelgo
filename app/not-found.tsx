import type { Metadata } from 'next';
import Header from '../components/sections/Header/page';
import NotFound from '../components/sections/NotFound/page';
import Footer from '../components/sections/Footer/page';
import { common, pages } from '../components/types';

const notFoundData = pages.not_found;

export const metadata: Metadata = {
  title: `${notFoundData.code} - ${notFoundData.title}`,
  description: notFoundData.description,
};

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <Header data={common.Header} />
      <main className="w-full flex-1">
        <NotFound data={notFoundData} />
      </main>
      <Footer data={common.Footer} />
    </div>
  );
}
