import Image from "next/image";

export default function MonoPage() {
  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Title Section with subtle background */}
      <div className="bg-[var(--color-green)]/3 py-12 md:py-16 mb-12">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="text-center">
            <h1 
              className="text-6xl md:text-8xl font-bold text-foreground mb-4"
              style={{ fontFamily: 'var(--font-bebas-neue)' }}
            >
              Mono Collection
            </h1>
            <p 
              className="text-foreground/70 text-base md:text-lg max-w-2xl mx-auto"
              style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
              Elegant, minimalist designs that bring sophistication to any space.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 pb-12">
        {/* Images Layout - Three column grid with varying sizes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {/* Image 1 - Left */}
          <div className="relative w-full aspect-[3/4] overflow-hidden">
            <Image
              src="/monopic1.png"
              alt="Mono tile design 1"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Image 2 - Center, slightly larger */}
          <div className="relative w-full aspect-[3/4] overflow-hidden md:scale-105">
            <Image
              src="/monopic2.png"
              alt="Mono tile design 2"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Image 3 - Right */}
          <div className="relative w-full aspect-[3/4] overflow-hidden">
            <Image
              src="/monopic3.png"
              alt="Mono tile design 3"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Description Text with subtle background */}
        <div className="max-w-3xl mx-auto bg-[var(--color-grey)]/5 py-8 md:py-12 px-6 md:px-10 rounded-lg">
          <p 
            className="text-foreground/70 text-base md:text-lg leading-relaxed mb-6"
            style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
          >
            Our mono tile tables combine elegant design with practical functionality. Featuring a sleek, minimalist aesthetic that complements any interior, these tables are crafted for both beauty and durability.
          </p>
          <p 
            className="text-foreground/70 text-base md:text-lg leading-relaxed"
            style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
          >
            The smooth, non-porous surface makes cleaning effortless—simply wipe and go. With their timeless look and easy maintenance, mono tile tables are the perfect choice for modern living spaces.
          </p>
        </div>
      </div>
    </div>
  );
}

