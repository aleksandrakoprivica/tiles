import Image from "next/image";

export default function MosaicPage() {
  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <h1 
          className="text-5xl md:text-6xl font-bold text-foreground mb-8"
          style={{ fontFamily: 'var(--font-bebas-neue)' }}
        >
          Mosaic Collection
        </h1>
        <p 
          className="text-foreground/70 text-lg mb-12 max-w-2xl"
          style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
        >
          Explore our mosaic tile collection - intricate patterns and vibrant designs that create stunning visual impact.
        </p>
        <div className="relative w-full aspect-[16/9] bg-foreground/5 rounded-lg overflow-hidden">
          <Image
            src="/mosaicc-group.png"
            alt="Mosaic tile collection"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}

