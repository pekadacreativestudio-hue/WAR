import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { MapPin, CalendarPlus, Check } from 'lucide-react';

const ParticleBackground = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number; delay: number; tx: number; ty: number }>>([]);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const isSmallScreen = window.matchMedia('(max-width: 768px)').matches;
    const particleCount = isSmallScreen ? 18 : 40;

    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100 + 10,
          size: Math.random() * 3 + 1,
          duration: Math.random() * 5 + 4,
          delay: Math.random() * 3,
          tx: (Math.random() - 0.5) * 100,
          ty: -Math.random() * 200 - 50,
        });
      }
      setParticles(newParticles);
    };
    generateParticles();
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none bg-[#0a0a0a] z-[-1]">
      {/* Smoky radial gradients & textures */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1a1410] via-[#0a0a0a] to-black opacity-90" />
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1542401886-65d6c61de115?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10" />

      {/* Glowing accents */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#3a1800] rounded-full filter blur-[80px] opacity-40 motion-safe:animate-[pulse_6s_ease-in-out_infinite]" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#d4af37] rounded-full filter blur-[90px] opacity-10 motion-safe:animate-[pulse_8s_ease-in-out_infinite]" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-t from-black via-transparent to-black opacity-90" />

      {/* Crosshairs in corners (Military touch) */}
      <div className="absolute top-8 left-8 w-4 h-4 border-t border-l border-[#c29c6d]/40" />
      <div className="absolute top-8 right-8 w-4 h-4 border-t border-r border-[#c29c6d]/40" />
      <div className="absolute bottom-8 left-8 w-4 h-4 border-b border-l border-[#c29c6d]/40" />
      <div className="absolute bottom-8 right-8 w-4 h-4 border-b border-r border-[#c29c6d]/40" />

      {/* Fire flakes */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#d4af37]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            boxShadow: '0 0 8px #d4af37',
          }}
          animate={{
            x: p.tx,
            y: p.ty,
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: [0.16, 1, 0.3, 1]
          }}
        />
      ))}
    </div>
  );
};

const TextReveal = ({ children, delay = 0, className = "", float = false }: { children: React.ReactNode, delay?: number, className?: string, float?: boolean }) => (
  <motion.div
    initial={{ y: 30, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    whileHover={{ scale: 1.02, filter: "brightness(1.2)" }}
    viewport={{ once: true, margin: "0px" }}
    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay }}
    className={className}
  >
    <motion.div
      animate={float ? { y: [0, -6, 0] } : {}}
      transition={float ? { duration: 5, repeat: Infinity, ease: "easeInOut" } : {}}
    >
      {children}
    </motion.div>
  </motion.div>
);

export default function App() {
  const [accepted, setAccepted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleAccept = () => {
    setAccepted(true);
    setTimeout(() => {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }, 100);
  };

  const createGoogleCalendarLink = () => {
    const title = encodeURIComponent("A Special Sathdamma Deshana by Vimuththa Therani");
    const dates = "20260830T080000Z/20260830T103000Z";
    const details = encodeURIComponent("A Special Sathdamma Deshana");
    const location = encodeURIComponent("MoonStone Amethist Hall, Hilton Colombo");
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  };

  return (
    <div className="min-h-screen text-[#e6d5c3] font-cinzel overflow-x-hidden selection:bg-[#c29c6d] selection:text-black" ref={containerRef}>
      <ParticleBackground />

      <main className="relative z-10 flex flex-col items-center">
        {/* Frame 1: You Are Invited */}
        <section className="min-h-screen w-full flex flex-col items-center justify-center p-6 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center space-y-16"
          >
            <TextReveal delay={0.2} float={true} className="text-4xl md:text-6xl tracking-[0.4em] text-[#e2cfae] drop-shadow-[0_0_30px_rgba(194,156,109,0.3)] font-light">
              YOU ARE INVITED
            </TextReveal>
            
            <motion.button
              onClick={handleAccept}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`group relative px-16 py-6 bg-transparent backdrop-blur-md transition-all duration-1000 ${accepted ? 'opacity-0 pointer-events-none' : 'opacity-100'} overflow-hidden cursor-pointer`}
            >
              <div className="absolute inset-0 border border-[#c29c6d]/40 group-hover:border-[#d4af37] transition-colors duration-700" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <span className="relative z-10 block text-xs tracking-[0.8em] font-montserrat font-medium text-[#c29c6d] group-hover:text-[#d4af37] transition-colors duration-700 uppercase drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">
                Accept
              </span>
            </motion.button>
          </motion.div>
          
          {accepted && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="absolute bottom-12 flex flex-col items-center gap-4 text-[#c29c6d]/75 text-xs tracking-[0.5em] font-montserrat"
            >
              <span className="animate-pulse">SCROLL TO REVEAL</span>
              <div className="relative w-px h-16 overflow-hidden">
                <motion.div 
                  animate={{ y: ['-100%', '100%'] }} 
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent via-[#c29c6d] to-transparent"
                />
              </div>
            </motion.div>
          )}
        </section>

        {/* Following Frames */}
        <div className={`w-full transition-opacity duration-1000 ${accepted ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          
          {/* Frame 2 & 3: Logo & Title */}
          <section className="min-h-screen w-full flex flex-col items-center justify-center p-6 text-center space-y-12">
             <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center relative w-full"
            >
              <div className="w-80 md:w-96 mb-20 flex items-center justify-center relative">
                <img src="https://i.ibb.co/jNwj4mW/Logo.png" alt="Event Logo" className="w-full h-auto object-contain drop-shadow-[0_0_40px_rgba(194,156,109,0.2)] hover:drop-shadow-[0_0_60px_rgba(212,175,55,0.6)] transition-all duration-700 hover:scale-105" />
              </div>

              <div className="space-y-6 max-w-5xl px-4 relative py-8">
                {/* Horizontal tactical accent lines */}
                <motion.div 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-[#c29c6d]/60 to-transparent origin-center" 
                />
                <motion.div 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-[#c29c6d]/60 to-transparent origin-center" 
                />
                
                <TextReveal delay={0.2} className="text-xs md:text-sm font-montserrat tracking-[0.6em] text-[#e6d5c3]/95 uppercase pt-6">
                  A Special
                </TextReveal>
                <TextReveal delay={0.4} float={true} className="text-5xl md:text-8xl font-playfair text-[#e2cfae] leading-tight pb-6 drop-shadow-lg">
                  SATHDAMMA DESHANA
                </TextReveal>
              </div>
            </motion.div>
          </section>

          {/* Frame 4: By */}
          <section className="min-h-[50vh] md:min-h-screen w-full flex flex-col items-center justify-center p-6 text-center relative">
            <div className="flex flex-col items-center space-y-6">
              <TextReveal delay={0.1} className="text-xs md:text-sm font-montserrat tracking-[0.6em] text-[#e6d5c3]/95 uppercase">
                By
              </TextReveal>
              <TextReveal delay={0.3} float={true} className="text-5xl md:text-8xl font-playfair text-[#e2cfae] drop-shadow-lg">
                Vimuththa Therani
              </TextReveal>
            </div>
          </section>

          {/* Frame 5 & 6: Date & Time */}
          <section className="min-h-[60vh] md:min-h-screen w-full flex flex-col items-center justify-center p-6 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 w-full max-w-4xl">
              <div className="flex flex-col items-center text-center space-y-8 relative p-8 group">
                <span className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#c29c6d]/20 transition-all duration-500" />
                <span className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#c29c6d]/20 transition-all duration-500" />
                
                <TextReveal delay={0.1} className="text-xs md:text-sm font-montserrat tracking-[0.5em] text-[#e6d5c3]/95 uppercase">
                  Date
                </TextReveal>
                <TextReveal delay={0.3} className="text-3xl md:text-5xl font-playfair text-white">
                  Sunday,<br />
                  <span className="text-[#d4af37]">30th August 2026</span>
                </TextReveal>
              </div>

              <div className="flex flex-col items-center text-center space-y-8 relative p-8 group">
                <span className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#c29c6d]/20 transition-all duration-500" />
                <span className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#c29c6d]/20 transition-all duration-500" />

                 <TextReveal delay={0.2} className="text-xs md:text-sm font-montserrat tracking-[0.5em] text-[#e6d5c3]/95 uppercase">
                  Time
                </TextReveal>
                <TextReveal delay={0.4} className="text-3xl md:text-5xl font-playfair text-white leading-tight">
                  8:00 AM<br />
                  <span className="text-sm font-montserrat tracking-[0.2em] text-[#e6d5c3]/85 uppercase my-4 block">To</span>
                  10:30 AM
                </TextReveal>
              </div>
            </div>
          </section>

          {/* Frame 7: Location & Actions */}
          <section className="min-h-screen w-full flex flex-col items-center justify-center p-6 text-center relative bg-gradient-to-t from-[#050505] to-transparent">
            <div className="flex flex-col items-center space-y-16 max-w-4xl w-full">
              <div className="space-y-8 relative p-12 group w-full flex flex-col items-center">
                <motion.span 
                  initial={{ height: 0 }}
                  whileInView={{ height: "32px" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent to-[#c29c6d]/60" 
                />
                
                <TextReveal delay={0.1} className="flex flex-col items-center gap-3 text-xs md:text-sm font-montserrat tracking-[0.5em] text-[#e6d5c3]/95 uppercase">
                  <MapPin className="w-6 h-6 text-[#d4af37]" />
                  Location
                </TextReveal>
                <div className="flex flex-col items-center">
                  <TextReveal delay={0.3} float={true} className="text-4xl md:text-6xl font-playfair text-white leading-tight text-center">
                    MoonStone Amethyst Hall.
                  </TextReveal>
                  <TextReveal delay={0.4} float={true} className="text-[#d4af37] italic font-light block mt-4 text-3xl md:text-5xl font-playfair">
                    Hilton Colombo.
                  </TextReveal>
                </div>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-6 w-full max-w-lg z-20 relative"
              >
                <motion.a
                  href="https://maps.app.goo.gl/XTutPyL3Dxm6sk2x7"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 flex items-center justify-center gap-3 px-6 py-5 border border-[#c29c6d]/50 bg-black/40 backdrop-blur-sm text-[#c29c6d] text-xs font-montserrat font-medium tracking-[0.2em] transition-all hover:border-[#c29c6d] hover:bg-[#c29c6d]/10 relative group"
                >
                  <MapPin className="w-4 h-4" />
                  <span>VIEW ON MAP</span>
                </motion.a>

                <motion.a
                  href={createGoogleCalendarLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 flex items-center justify-center gap-3 px-6 py-5 border border-[#c29c6d]/50 bg-black/40 backdrop-blur-sm text-[#c29c6d] text-xs font-montserrat font-medium tracking-[0.2em] transition-all hover:border-[#c29c6d] hover:bg-[#c29c6d]/10 relative group"
                >
                  <CalendarPlus className="w-4 h-4" />
                  <span>BOOK YOUR CALENDAR</span>
                </motion.a>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.5, duration: 1.5 }}
              className="absolute bottom-12 text-[10px] font-montserrat text-[#c29c6d]/55 tracking-[0.5em] uppercase"
            >
              We look forward to your presence
            </motion.div>
          </section>
        </div>
      </main>
    </div>
  );
}


