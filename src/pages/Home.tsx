import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import ExpertiseSection from '@/components/home/ExpertiseSection';
import ProductsSection from '@/components/home/ProductsSection';
import SectorsSection from '@/components/home/SectorsSection';
import WhyUsSection from '@/components/home/WhyUsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import ClientsLogosSection from '@/components/home/ClientsLogosSection';
import RealisationsSection from '@/components/home/RealisationsSection';
import CTASection from '@/components/home/CTASection';
import { useSettingsStore } from '@/store/useSettingsStore';

export default function Home() {
  const { settings } = useSettingsStore();

  return (
    <div>
      <HeroSection />
      {settings?.showStats !== false && <StatsSection />}
      <ExpertiseSection />
      <ProductsSection />
      <SectorsSection />
      <WhyUsSection />
      {settings?.showTestimonials !== false && <TestimonialsSection />}
      {settings?.showClients !== false && <ClientsLogosSection />}
      <RealisationsSection />
      <CTASection />
    </div>
  );
}
