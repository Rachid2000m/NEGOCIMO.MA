import { motion } from 'motion/react';

// Using placeholders for logos since we don't have real assets
// These are tech company logos often used as placeholders
const logos = [
  "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png",
  "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
];

export default function ClientsLogosSection() {
  return (
    <section className="py-12 bg-white border-y border-border overflow-hidden">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto mb-6 text-center">
        <p className="text-sm font-bold text-text-secondary uppercase tracking-[2px]">Ils ont aménagé leurs espaces avec nous</p>
      </div>
      <div className="relative flex overflow-x-hidden">
        <div className="animate-marquee flex whitespace-nowrap items-center">
          {/* Double map to ensure seamless loop */}
          {[...logos, ...logos, ...logos].map((logo, i) => (
            <img 
              key={i} 
              src={logo} 
              alt="Client logo" 
              className="w-32 h-auto mx-12 object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            />
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />
    </section>
  );
}
