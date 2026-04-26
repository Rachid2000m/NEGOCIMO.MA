import { CountUp } from '@/components/ui/count-up';

export default function StatsSection() {
  const stats = [
    { value: 10, suffix: '+', label: "Années d'expérience" },
    { value: 500, suffix: '+', label: "Projets réalisés" },
    { value: 50, suffix: 'k+', label: "m² aménagés" },
    { value: 100, suffix: '%', label: "Clients satisfaits" },
  ];

  return (
    <section className="bg-navy py-12 border-y border-navy-light relative z-30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="text-4xl md:text-5xl font-black text-gold font-heading mb-2">
                <CountUp to={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm md:text-base text-gray-300 font-medium uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
