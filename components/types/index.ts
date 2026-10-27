import data from '../data/data.json';

export interface NavItem {
  name: string;
  href: string;
  children?: NavItem[];
}

export type LinkType = NavItem;

export interface HeaderData {
  logo: string;
  logo_text: string;
  logo_subtext?: string;
  links: LinkType[];
  button_text: string;
  button_link: string;
  menu_aria_label: string;
  close_aria_label: string;
}

export interface FooterSocialItem {
  name: string;
  href: string;
  icon: string;
  aria_label: string;
}

export interface FooterContactItem {
  icon: string;
  label?: string;
  text: string;
  href?: string;
}

export interface FooterData {
  background_image?: string;
  logo: string;
  logo_text: string;
  description: string;
  socials: FooterSocialItem[];
  pages_title: string;
  pages_links: LinkType[];
  services_title: string;
  services_links: LinkType[];
  contact_title: string;
  contact_items: FooterContactItem[];
  copyright: string;
  bottom_links?: LinkType[];
}

export interface BackToTopData {
  aria_label: string;
}

export interface HeroSectionData {
  eyebrow?: string;
  title_line1: string;
  title_line2: string;
  description?: string;
  cta_text?: string;
  cta_link?: string;
  image: string;
  image_alt: string;
}

export interface BreadcrumbItem {
  name: string;
  href: string;
}

export interface BreadcrumbSectionData {
  background_image: string;
  background_alt: string;
  split_image?: string;
  items: BreadcrumbItem[];
}
export type BreadcrumbData = BreadcrumbSectionData;

export interface StatItem {
  value: string;
  label: string;
}

export interface AboutSectionData {
  script_eyebrow: string;
  title_regular: string;
  title_highlight: string;
  description_paragraphs: string[];
  button_text?: string;
  button_link?: string;
  image_main: string;
  image_main_alt: string;
  image_secondary: string;
  image_secondary_alt: string;
  stats?: StatItem[];
}

export interface BannerSectionData {
  image: string;
  image_alt: string;
}

export interface WhyChooseUsItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface WhyChooseUsSectionData {
  script_eyebrow: string;
  title_line1: string;
  title_line2_prefix: string;
  title_line2_highlight: string;
  description: string;
  image_top: string;
  image_top_alt: string;
  image_bottom_left: string;
  image_bottom_left_alt: string;
  image_bottom_right: string;
  image_bottom_right_alt: string;
  items: WhyChooseUsItem[];
}

export interface PackageItem {
  id: string;
  title: string;
  image: string;
  image_alt?: string;
  price: string;
  price_unit?: string;
  badge?: string;
  button_text: string;
  button_link: string;
  category?: string;
  duration?: string;
  rating?: number;
}

export interface PackagesSectionData {
  script_eyebrow: string;
  title_regular_prefix: string;
  title_highlight: string;
  title_regular_suffix: string;
  description: string;
  button_text?: string;
  button_link?: string;
  items: PackageItem[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  quote: string;
}

export interface TestimonialsSectionData {
  script_eyebrow: string;
  title_regular: string;
  title_highlight: string;
  subtitle: string;
  autoplay_interval?: number;
  prev_button_label?: string;
  next_button_label?: string;
  reviews: TestimonialItem[];
}



export interface GalleryItem {
  id: string;
  title: string;
  image: string;
  category?: string;
  alt?: string;
  span?: string;
}

export interface GallerySectionData {
  script_eyebrow?: string;
  title_regular: string;
  title_highlight: string;
  description: string;
  items: GalleryItem[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqSectionData {
  script_eyebrow: string;
  title_regular: string;
  title_highlight: string;
  description: string;
  items: FaqItem[];
}

export interface ContactFeatureItem {
  icon: string;
  title: string;
  description: string;
}

export interface ContactSectionData {
  script_eyebrow: string;
  title_regular: string;
  title_highlight: string;
  description: string;
  address: string;
  address_line1?: string;
  address_line2?: string;
  map_title?: string;
  map_subtitle?: string;
  map_link?: string;
  map_embed_url?: string;
  phone: string;
  email: string;
  email_note?: string;
  timing: string;
  form_title_prefix?: string;
  form_title_highlight?: string;
  form_description?: string;
  bg_suv_image?: string;
  banner_camels_image?: string;
  features?: ContactFeatureItem[];
  people_options?: { value: string; label: string }[];
  package_options?: { value: string; label: string }[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
  image_alt?: string;
  icon: string;
  link?: string;
}

export interface ServicesSectionData {
  script_eyebrow?: string;
  title_regular: string;
  title_highlight: string;
  description: string;
  button_text?: string;
  items: ServiceItem[];
}

export interface ServicesProps {
  data: ServicesSectionData;
}

export interface EnquirySelectOption {
  value: string;
  label: string;
}

export interface EnquirySectionData {
  script_eyebrow?: string;
  title_regular: string;
  title_highlight: string;
  description: string;
  name_label?: string;
  name_placeholder: string;
  email_label?: string;
  email_placeholder: string;
  phone_label?: string;
  phone_placeholder: string;
  date_label?: string;
  date_placeholder: string;
  people_label?: string;
  people_placeholder: string;
  package_label?: string;
  package_placeholder: string;
  time_label?: string;
  time_placeholder: string;
  pickup_label?: string;
  pickup_placeholder: string;
  message_label?: string;
  message_placeholder: string;
  button_text: string;
  success_title: string;
  success_message: string;
  reset_button_text?: string;
  people_options: EnquirySelectOption[];
  time_options: EnquirySelectOption[];
  pickup_options: EnquirySelectOption[];
}

export interface EnquiryProps {
  data: EnquirySectionData;
  packageOptions?: EnquirySelectOption[];
}

export interface PageComponent {
  key: string;
  component: string;
}

export interface PackageEnquiryForm {
  title_prefix: string;
  title_highlight: string;
  subtitle: string;
  name_placeholder: string;
  email_placeholder: string;
  phone_placeholder: string;
  date_placeholder: string;
  people_placeholder: string;
  people_options: { value: string; label: string }[];
  message_placeholder: string;
  button_text: string;
  success_title: string;
  success_message: string;
}

export interface PageMeta {
  title: string;
  pageName: string;
  watermark?: string;
  metadata: {
    title: string;
    description: string;
  };
  components: PageComponent[];
  enquiry_form?: PackageEnquiryForm;
}

export interface NotFoundData {
  code: string;
  badge: string;
  title: string;
  description: string;
  back_home: {
    text: string;
    href: string;
  };
  quick_links?: {
    name: string;
    href: string;
  }[];
}

export interface PackageSpecification {
  icon: string;
  label: string;
  value: string;
}

export interface PackageItineraryItem {
  time: string;
  title: string;
  description?: string;
}

export interface PackageFaqItem {
  question: string;
  answer: string;
}



export interface PackageDetailData {
  id: string;
  slug: string;
  title_prefix: string;
  title_highlight: string;
  location: string;
  duration: string;
  tour_type: string;
  group_type: string;
  price?: string;
  price_unit?: string;
  main_image: string;
  thumbnails: string[];
  about_title: string;
  about_description: string;
  specifications: PackageSpecification[];
  highlights_title: string;
  highlights: string[];
  itinerary_title: string;
  itinerary: PackageItineraryItem[];
  gallery_title: string;
  gallery_images: string[];
  faq_title_regular: string;
  faq_title_highlight: string;
  faqs: PackageFaqItem[];
  sidebar_banner?: string;
  enquiry_form?: PackageEnquiryForm;
}

export interface PackageDetailsProps {
  packageData: PackageDetailData;
  enquiryForm?: PackageEnquiryForm;
}

export interface SiteSections {
  breadcrumb: BreadcrumbSectionData;
  hero: HeroSectionData;
  about: AboutSectionData;
  banner?: BannerSectionData;
  why_choose_us?: WhyChooseUsSectionData;
  packages: PackagesSectionData;
  testimonials: TestimonialsSectionData;
  gallery: GallerySectionData;
  faq: FaqSectionData;
  contact: ContactSectionData;
  services?: ServicesSectionData;
  enquiry?: EnquirySectionData;
  package_details?: Record<string, PackageDetailData>;
}

export interface SitePages {
  home: PageMeta;
  not_found: NotFoundData;
  about: PageMeta;
  packages: PageMeta;
  gallery: PageMeta;
  faq: PageMeta;
  contact: PageMeta;
  services?: PageMeta;
  enquiry_now?: PageMeta;
  package_details?: PageMeta;
}

export interface TemplateComponents {
  pages: SitePages;
  sections: SiteSections;
}

export interface SiteData {
  common: {
    Header: HeaderData;
    Footer: FooterData;
    BackToTop: BackToTopData;
  };
  categories: {
    Travel: {
      templateComponents: {
        'template-1': TemplateComponents;
      };
    };
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Component Props Interfaces (All components import their types from here)
// ─────────────────────────────────────────────────────────────────────────────

export interface HeaderProps {
  data: HeaderData;
}

export interface HeroProps {
  data: HeroSectionData;
}

export interface AboutProps {
  data: AboutSectionData;
  showButton?: boolean;
}

export interface BannerProps {
  data: BannerSectionData;
}

export interface WhyChooseUsProps {
  data: WhyChooseUsSectionData;
}

export interface PackagesProps {
  data: PackagesSectionData;
  showAll?: boolean;
}

export interface TestimonialsProps {
  data: TestimonialsSectionData;
}

export interface FooterProps {
  data: FooterData;
}

export interface BreadcrumbProps {
  data: BreadcrumbSectionData;
  currentPage: string;
  watermark?: string;
  variant?: 'standard' | 'split';
  splitImage?: string;
}



export interface GalleryProps {
  data: GallerySectionData;
}

export interface FaqProps {
  data: FaqSectionData;
}

export interface ContactProps {
  data: ContactSectionData;
}

export interface NotFoundProps {
  data: NotFoundData;
}

export interface BackToTopProps {
  data: BackToTopData;
}

export interface ScriptEyebrowProps {
  text: string;
  variant?: 'flight' | 'lines' | 'simple';
  align?: 'left' | 'center';
  className?: string;
}

export interface RatingStarsProps {
  rating?: number;
  size?: string;
  className?: string;
}

export interface SocialIconProps {
  icon: string;
  className?: string;
}

export const siteJson: SiteData = data as unknown as SiteData;
export const common = siteJson.common;
export const template = siteJson.categories.Travel.templateComponents['template-1'];
export const pages = template.pages;
export const sections = template.sections;
export const packageDetails = sections.package_details;

export function toSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
