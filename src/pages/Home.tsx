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

export default function Home() {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <ExpertiseSection />
      <ProductsSection />
      <SectorsSection />
      <WhyUsSection />
      <TestimonialsSection />
      <ClientsLogosSection />
      <RealisationsSection />
      <CTASection />
    </div>
  );
}
