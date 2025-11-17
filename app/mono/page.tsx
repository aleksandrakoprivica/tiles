import Image from "next/image";

export default function MonoPage() {
  return (
    <div className="min-h-screen bg-background pt-16 text-foreground">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-20">
        <div className="flex flex-col md:flex-row items-stretch gap-10 md:gap-14">
          <div className="md:w-5/12 flex flex-col justify-between h-full">
            <div className="space-y-8 md:space-y-12">

              <h1
                className="text-5xl md:text-7xl leading-tight"
                style={{ fontFamily: "var(--font-bebas-neue)" }}
              >
                Mono Collection
              </h1>
              <p
                className="text-base md:text-lg text-foreground/70"
                style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
              >
                Minimal silhouettes, generous proportions, and terrazzo-inspired
                surfaces built for everyday rituals. Each piece is poured, polished,
                and sealed by hand for a refined finish that still feels grounded.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center text-xs uppercase tracking-wide mt-auto pt-8 md:pt-12">
              {[
                { label: "Finish", value: "Matte + High Gloss" },
                { label: "Lead time", value: "4-6 weeks" },
                { label: "Sizes", value: "24\" - 54\"" },
                { label: "Use", value: "Indoor / Covered outdoor" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="border border-foreground/10 py-4"
                  style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
                >
                  <p className="text-foreground/50 mb-1">{item.label}</p>
                  <p className="text-sm text-foreground/90 normal-case">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="md:flex-1 relative w-full aspect-[3/4] rounded-sm overflow-hidden">
            <Image
              src="/mono-2.png"
              alt="Mono hero table"
              fill
              className="object-contain"
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
            />
          </div>
        </div>
      </section>

      {/* Material Story */}
      <section className="bg-[var(--color-grey)]/6 border-t border-b border-foreground/10">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-14 grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Material",
              copy:
                "Hand-poured composite with marble fragments for a mineral feel that stays cool to the touch.",
            },
            {
              title: "Finish",
              copy:
                "Soft radius edges with a low-sheen sealant that resists stains without muting the speckled detail.",
            },
            {
              title: "Care",
              copy:
                "Wipe with a damp cloth, spot clean with neutral soap. No special kits, no fussy upkeep.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="bg-background/70 border border-foreground/10 rounded-sm p-6 flex flex-col gap-3"
            >
              <p
                className="text-xs uppercase tracking-[0.2em] text-foreground/50"
                style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
              >
                {card.title}
              </p>
              <p
                className="text-base text-foreground/80 leading-relaxed"
                style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
              >
                {card.copy}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery + Details */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-20 space-y-10 md:space-y-14">
        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-5">
            <p
              className="text-sm uppercase tracking-[0.2em] text-foreground/50"
              style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
            >
              Why Mono
            </p>
            <p
              className="text-lg md:text-xl text-foreground/80 leading-relaxed"
              style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
            >
              Designed for modular living—pair two together for a layered coffee
              table moment or let a single piece anchor an entryway. Neutral
              palettes keep the focus on texture and proportion.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="border-t border-foreground/20 pt-4">
                <p className="text-foreground/60 mb-1">Palette</p>
                <p style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>
                  Clay, Salt, Char
                </p>
              </div>
              <div className="border-t border-foreground/20 pt-4">
                <p className="text-foreground/60 mb-1">Height Options</p>
                <p style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>
                  14&quot; / 18&quot;
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-3 grid grid-cols-1 gap-6">
            <div className="relative w-full aspect-[6/3] rounded-sm overflow-hidden border border-foreground/10">
              <Image
                src="/mono-1.png"
                alt="Mono styling 1"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 60vw, 100vw"
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="relative aspect-[3/4] rounded-sm overflow-hidden border border-foreground/10">
                <Image
                  src="/mono-4.png"
                  alt="Mono styling detail"
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 30vw, 100vw"
                />
              </div>
              <div className="relative aspect-[3/4] rounded-sm overflow-hidden border border-foreground/10">
                <Image
                  src="/mono-5.png"
                  alt="Mono tabletop closeup"
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 30vw, 100vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

