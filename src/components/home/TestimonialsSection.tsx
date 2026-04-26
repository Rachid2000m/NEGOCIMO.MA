import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Star, Quote } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  {
    id: 1,
    name: "Karim Alaoui",
    role: "Directeur Général",
    company: "TechHub Maroc",
    sector: "Bureaux",
    text: "L'aménagement de nos nouveaux bureaux par NEGOCIMO a été un succès total. Qualité des revêtements impeccable et délais respectés au jour près.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 2,
    name: "Sofia Benjelloun",
    role: "Architecte d'intérieur",
    company: "Studio 14",
    sector: "Hôtellerie",
    text: "Je travaille exclusivement avec NEGOCIMO pour mes projets hôteliers. Leur catalogue de moquettes premium est le meilleur du marché.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 3,
    name: "Youssef Tazi",
    role: "Responsable Achats",
    company: "Clinique Santé Plus",
    sector: "Santé",
    text: "Les revêtements PVC hospitaliers fournis répondent à toutes les normes sanitaires strictes que nous exigeons. Un service après-vente très réactif.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/68.jpg"
  },
  {
    id: 4,
    name: "Amal Idrissi",
    role: "Gérante",
    company: "Espace Retail 5",
    sector: "Commerce",
    text: "Le sol de notre boutique encaisse un trafic énorme chaque jour et n'a pas bougé depuis 2 ans. Merci pour les bons conseils !",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/65.jpg"
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-background overflow-hidden relative">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4 text-navy">Ils nous font confiance</h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg">
            La satisfaction de nos clients professionnels est notre meilleure référence.
          </p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          pagination={{ clickable: true, dynamicBullets: true }}
          className="pb-16"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id} className="h-auto">
              <div className="bg-white p-8 rounded-2xl border border-border shadow-sm h-full flex flex-col relative mt-8">
                {/* Avatar overlapping top */}
                <div className="absolute -top-8 left-8">
                  <img src={t.avatar} alt={t.name} className="w-16 h-16 rounded-full border-4 border-white shadow-md object-cover" />
                </div>
                
                <Quote className="absolute top-6 right-8 w-10 h-10 text-gold/20" />
                
                <div className="flex gap-1 mb-4 mt-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-text-secondary italic mb-6 flex-1 leading-relaxed">"{t.text}"</p>
                <div className="pt-4 border-t border-border mt-auto">
                  <h4 className="font-bold text-navy font-heading">{t.name}</h4>
                  <p className="text-sm text-text-secondary">{t.role}, <span className="font-semibold">{t.company}</span></p>
                  <span className="inline-block mt-2 text-xs font-bold text-gold uppercase tracking-wider">{t.sector}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
