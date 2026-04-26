import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function WhatsAppButton() {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+212600000000';
  const message = 'Bonjour NEGOCIMO, je vous contacte depuis votre site web.';
  
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9+]/g, '')}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:scale-110 hover:shadow-xl transition-all"
      aria-label="Contactez-nous sur WhatsApp"
      animate={{ 
        boxShadow: ['0px 0px 0px 0px rgba(37,211,102,0.7)', '0px 0px 0px 15px rgba(37,211,102,0)', '0px 0px 0px 0px rgba(37,211,102,0)'] 
      }}
      transition={{ 
        duration: 2, 
        repeat: Infinity,
        repeatType: "loop"
      }}
    >
      <MessageCircle className="w-8 h-8" />
    </motion.a>
  );
}
