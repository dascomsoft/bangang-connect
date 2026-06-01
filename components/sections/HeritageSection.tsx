'use client';

const panels = [
  {
    num: '01',
    title: 'Le Mont Bamboutos',
    subtitle: 'Altitude 2 740 m',
    description:
      "Second plus haut sommet du Cameroun, culminant à 2 740 mètres d'altitude. Cette montagne mythique domine le royaume Bamiléké et abrite une biodiversité exceptionnelle — forêts d'altitude, prairies et espèces endémiques uniques au monde.",
    image: '/montbamboutous.jpeg',
    tag: 'Géographie',
  },
  {
    num: '02',
    title: 'La Chute de Mekoup',
    subtitle: 'Site sacré & naturel',
    description:
      "Joyau naturel du royaume, cette cascade majestueuse se niche au cœur d'un paysage de végétation luxuriante. Lieu de recueillement ancestral, elle attire autant les pèlerins que les amateurs de nature sauvage préservée.",
    image: '/mekoup2.jpg',
    tag: 'Patrimoine',
  },
  {
    num: '03',
    title: 'Les Lacs Sacrés',
    subtitle: 'Cratères volcaniques',
    description:
      "Au cœur du massif volcanique, des lacs de cratère aux eaux mystérieuses alimentent les rivières et constituent des lieux de culte ancestraux. Leur profondeur insondable nourrit légendes et rituels transmis de génération en génération.",
    image: '/lacsacre.jpg',
    tag: 'Spiritualité',
  },
  {
    num: '04',
    title: 'Les Grassfields',
    subtitle: 'Hauts plateaux verdoyants',
    description:
      "Les collines ondoyantes et verdoyantes des hauts plateaux offrent des panoramas à couper le souffle, témoins d'une agriculture ancestrale en terrasses. Un paysage façonné par des siècles de savoir-faire et d'harmonie avec la nature.",
    image: '/grassfields.jpg',
    tag: 'Paysage',
  },
];

export default function HeritageSection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,700;1,400;1,700&family=DM+Sans:wght@300;400;500&display=swap');

        .hs-section {
          font-family: 'DM Sans', sans-serif;
        }

        /* Fade-up on scroll via CSS animation-timeline (progressive enhancement) */
        @supports (animation-timeline: view()) {
          .hs-reveal {
            animation: hsReveal linear both;
            animation-timeline: view();
            animation-range: entry 0% entry 35%;
          }
          @keyframes hsReveal {
            from { opacity: 0; transform: translateY(32px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        }

        .hs-card-img {
          transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hs-card:hover .hs-card-img {
          transform: scale(1.04);
        }

        /* Alternate layout: even panels flip image/text */
        .hs-row-even {
          flex-direction: row-reverse;
        }

        @media (max-width: 767px) {
          .hs-row, .hs-row-even {
            flex-direction: column !important;
          }
          .hs-img-col {
            height: 56vw !important;
            min-height: 240px !important;
          }
        }
      `}</style>

      <section className="hs-section" style={{ background: '#0D0B07' }}>

        {/* ── Section header ── */}
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: 'clamp(64px,9vh,112px) clamp(24px,5vw,72px) clamp(40px,5vh,64px)',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 32,
          flexWrap: 'wrap',
          borderBottom: '1px solid rgba(201,169,110,0.1)',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
              <div style={{ width: 28, height: 1, background: '#C9A96E' }} />
              <span style={{
                fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase',
                color: '#C9A96E', fontWeight: 500,
              }}>
                Patrimoine Naturel
              </span>
            </div>
            <h2 style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 'clamp(36px, 5.5vw, 68px)',
              fontWeight: 700,
              color: '#F5EDD8',
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
              margin: 0,
            }}>
              Sites &{' '}
              <em style={{ fontStyle: 'italic', color: '#C9A96E' }}>Paysages Sacrés</em>
            </h2>
          </div>

          {/* Panel count */}
          <span style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 'clamp(48px, 7vw, 80px)',
            fontWeight: 300,
            color: 'rgba(201,169,110,0.1)',
            lineHeight: 1,
            letterSpacing: '-0.03em',
            flexShrink: 0,
          }}>
            0{panels.length}
          </span>
        </div>

        {/* ── Panels ── */}
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {panels.map((p, i) => {
            const isEven = i % 2 === 1;
            return (
              <article
                key={i}
                className={`hs-card hs-reveal hs-row${isEven ? ' hs-row-even' : ''}`}
                style={{
                  display: 'flex',
                  minHeight: 'clamp(320px, 48vh, 560px)',
                  borderBottom: i < panels.length - 1
                    ? '1px solid rgba(201,169,110,0.07)'
                    : 'none',
                }}
              >
                {/* ── Image column ── */}
                <div
                  className="hs-img-col"
                  style={{
                    flex: '0 0 clamp(280px, 45%, 560px)',
                    position: 'relative',
                    overflow: 'hidden',
                    minHeight: 320,
                  }}
                >
                  <div
                    className="hs-card-img"
                    style={{ position: 'absolute', inset: 0 }}
                  >
                    <img
                      src={p.image}
                      alt={p.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        filter: 'brightness(0.72) saturate(0.85)',
                      }}
                      loading={i === 0 ? 'eager' : 'lazy'}
                    />
                  </div>

                  {/* Number watermark over image */}
                  <div style={{
                    position: 'absolute',
                    bottom: 16,
                    right: isEven ? 'auto' : 20,
                    left: isEven ? 20 : 'auto',
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: 'clamp(56px, 9vw, 108px)',
                    fontWeight: 700,
                    lineHeight: 1,
                    color: 'rgba(201,169,110,0.18)',
                    letterSpacing: '-0.04em',
                    userSelect: 'none',
                    pointerEvents: 'none',
                  }}>
                    {p.num}
                  </div>

                  {/* Tag badge */}
                  <div style={{
                    position: 'absolute',
                    top: 20,
                    left: 20,
                    padding: '5px 14px',
                    background: 'rgba(13,11,7,0.7)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(201,169,110,0.2)',
                    fontSize: 9,
                    letterSpacing: '0.26em',
                    textTransform: 'uppercase',
                    color: '#C9A96E',
                  }}>
                    {p.tag}
                  </div>

                  {/* Side gradient bleed into text column */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    [isEven ? 'left' : 'right']: 0,
                    width: 80,
                    background: isEven
                      ? 'linear-gradient(to right, #0D0B07, transparent)'
                      : 'linear-gradient(to left, #0D0B07, transparent)',
                  }} />
                </div>

                {/* ── Text column ── */}
                <div style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  padding: 'clamp(36px, 5vw, 72px) clamp(28px, 4vw, 64px)',
                  position: 'relative',
                }}>

                  {/* Vertical rule accent */}
                  <div style={{
                    position: 'absolute',
                    top: '20%',
                    bottom: '20%',
                    [isEven ? 'right' : 'left']: 0,
                    width: 1,
                    background: 'linear-gradient(to bottom, transparent, rgba(201,169,110,0.2) 40%, rgba(201,169,110,0.2) 60%, transparent)',
                  }} />

                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                    <div style={{ width: 20, height: 1, background: 'rgba(201,169,110,0.5)', flexShrink: 0 }} />
                    <span style={{
                      fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase',
                      color: 'rgba(201,169,110,0.65)', fontWeight: 500,
                    }}>
                      {p.subtitle}
                    </span>
                  </div>

                  <h3 style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: 'clamp(28px, 4vw, 52px)',
                    fontWeight: 700,
                    color: '#F5EDD8',
                    lineHeight: 1.05,
                    letterSpacing: '-0.02em',
                    marginBottom: 24,
                  }}>
                    {p.title}
                  </h3>

                  <div style={{
                    width: 40, height: 1, marginBottom: 24,
                    background: 'linear-gradient(to right, rgba(201,169,110,0.55), transparent)',
                  }} />

                  <p style={{
                    fontSize: 'clamp(13px, 1.1vw, 16px)',
                    color: 'rgba(245,237,216,0.48)',
                    lineHeight: 1.9,
                    maxWidth: 400,
                    fontWeight: 300,
                  }}>
                    {p.description}
                  </p>

                  {/* Step counter bottom */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    marginTop: 40,
                  }}>
                    {panels.map((_, j) => (
                      <div key={j} style={{
                        width: j === i ? 24 : 4,
                        height: 1,
                        background: j === i ? '#C9A96E' : 'rgba(201,169,110,0.2)',
                        borderRadius: 1,
                        transition: 'width 0.3s ease',
                      }} />
                    ))}
                    <span style={{
                      fontFamily: '"Cormorant Garamond", serif',
                      fontSize: 12,
                      color: 'rgba(201,169,110,0.35)',
                      marginLeft: 4,
                      letterSpacing: '0.08em',
                    }}>
                      {p.num}/{String(panels.length).padStart(2,'0')}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* ── Section footer line ── */}
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: 'clamp(40px,5vh,64px) clamp(24px,5vw,72px)',
          borderTop: '1px solid rgba(201,169,110,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
          flexWrap: 'wrap',
        }}>
          <span style={{
            fontSize: 10, letterSpacing: '0.26em', textTransform: 'uppercase',
            color: 'rgba(201,169,110,0.3)', fontWeight: 400,
          }}>
            Royaume Bamiléké · Bangang
          </span>
          <div style={{ display: 'flex', gap: 6 }}>
            {panels.map((_, i) => (
              <div key={i} style={{
                width: 4, height: 4, borderRadius: '50%',
                background: 'rgba(201,169,110,0.25)',
              }} />
            ))}
          </div>
        </div>

      </section>
    </>
  );
}