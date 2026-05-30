'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const panels = [
  {
    num: '01',
    title: 'Le Mont Bamboutos',
    description:
      'Second plus haut sommet du Cameroun, culminant à 2 740 mètres d\'altitude. Cette montagne mythique domine le royaume et abrite une biodiversité exceptionnelle.',
    image: '/montbamboutous.jpeg',
  },
  {
    num: '02',
    title: 'La Chute de Mekoup',
    description:
      'Joyau naturel du royaume, cette cascade majestueuse se niche au cœur d\'un paysage de végétation luxuriante. Site sacré et destination de prédilection.',
    image: '/mekoup2.jpg',
  },
  {
    num: '03',
    title: 'Les Lacs Sacrés',
    description:
      'Au cœur du massif volcanique, des lacs de cratère aux eaux mystérieuses alimentent les rivières et constituent des lieux de culte ancestraux.',
    image: '/lacsacre.jpg',
  },
  {
    num: '04',
    title: 'Les Grassfields',
    description:
      'Les collines ondoyantes et verdoyantes des hauts plateaux offrent des panoramas à couper le souffle, témoins d\'une agriculture ancestrale en terrasses.',
    image: '/grassfields.jpg',
  },
];

export default function HeritageSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [activePanel, setActivePanel] = useState(0);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const sticky = stickyRef.current;
    if (!container || !sticky) return;

    const ctx = gsap.context(() => {
      // Pin the sticky container
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        pin: sticky,
        pinSpacing: false,
      });

      // Create progress-based triggers for each panel
      panels.forEach((_, i) => {
        const startPct = i / panels.length;
        const endPct = (i + 1) / panels.length;

        ScrollTrigger.create({
          trigger: container,
          start: `${startPct * 100}% top`,
          end: `${endPct * 100}% top`,
          onEnter: () => setActivePanel(i),
          onEnterBack: () => setActivePanel(i),
        });
      });
    }, container);

    return () => ctx.revert();
  }, []);

  // Animate image crossfade and text slide when panel changes
  useEffect(() => {
    imagesRef.current.forEach((img, i) => {
      if (!img) return;
      gsap.to(img, {
        opacity: i === activePanel ? 1 : 0,
        x: i === activePanel ? 0 : i < activePanel ? -20 : 20,
        duration: 0.6,
        ease: 'power2.inOut',
      });
    });

    textRefs.current.forEach((txt, i) => {
      if (!txt) return;
      gsap.to(txt, {
        opacity: i === activePanel ? 1 : 0,
        x: i === activePanel ? 0 : 30,
        duration: 0.5,
        ease: 'power2.inOut',
      });
    });
  }, [activePanel]);

  return (
    <div
      ref={containerRef}
      className="relative bg-[#0a0a0a]"
      style={{ height: `${panels.length * 100}vh` }}
    >
      <div
        ref={stickyRef}
        className="w-full overflow-hidden"
        style={{ height: '100vh' }}
      >
        <div className="flex flex-col lg:flex-row h-full p-8 lg:p-16">
          {/* Left - Images */}
          <div className="relative w-full lg:w-[55%] h-[40vh] lg:h-full rounded-2xl overflow-hidden">
            {panels.map((panel, i) => (
              <div
                key={i}
                ref={(el) => { imagesRef.current[i] = el; }}
                className="absolute inset-0 transition-opacity duration-300"
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                <img
                  src={panel.image}
                  alt={panel.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Right - Text */}
          <div className="relative w-full lg:w-[45%] flex items-center lg:pl-16 mt-6 lg:mt-0">
            <div className="relative w-full">
              {panels.map((panel, i) => (
                <div
                  key={i}
                  ref={(el) => { textRefs.current[i] = el; }}
                  className="absolute top-0 left-0 w-full"
                  style={{ opacity: i === 0 ? 1 : 0 }}
                >
                  <span className="text-sm text-[#C9A96E]/50 font-light">
                    {panel.num} / 04
                  </span>

                  <h3 className="font-bold mt-4 text-[clamp(32px,4vw,56px)] text-[#C9A96E] leading-[1.1]">
                    {panel.title}
                  </h3>

                  <div className="mt-5 w-10 h-px bg-[#C9A96E]/40" />

                  <p className="mt-5 text-[clamp(15px,1.2vw,18px)] text-white/70 leading-relaxed max-w-md">
                    {panel.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {panels.map((_, i) => (
            <div
              key={i}
              className="transition-all duration-300"
              style={{
                width: i === activePanel ? '24px' : '8px',
                height: '4px',
                borderRadius: '2px',
                backgroundColor: i === activePanel ? '#C9A96E' : 'rgba(201, 169, 110, 0.3)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}