import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-foreground/10 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand */}
          <div>
            <h3 
              className="text-2xl font-bold text-foreground mb-4"
              style={{ fontFamily: 'var(--font-bebas-neue)' }}
            >
              TILES
            </h3>
            <p 
              className="text-foreground/60 text-sm leading-relaxed"
              style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
              Tile it your way. Custom designs for every space.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 
              className="text-sm font-semibold uppercase tracking-wider text-foreground/70 mb-4"
              style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/" 
                  className="text-foreground/60 hover:text-foreground transition-colors text-sm"
                  style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="text-foreground/60 hover:text-foreground transition-colors text-sm"
                  style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-foreground/60 hover:text-foreground transition-colors text-sm"
                  style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Collections */}
          <div>
            <h4 
              className="text-sm font-semibold uppercase tracking-wider text-foreground/70 mb-4"
              style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
              Collections
            </h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/mono" 
                  className="text-foreground/60 hover:text-foreground transition-colors text-sm"
                  style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                >
                  Mono
                </Link>
              </li>
              <li>
                <Link 
                  href="/mosaic" 
                  className="text-foreground/60 hover:text-foreground transition-colors text-sm"
                  style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                >
                  Mosaic
                </Link>
              </li>
              <li>
                <Link 
                  href="/mirror" 
                  className="text-foreground/60 hover:text-foreground transition-colors text-sm"
                  style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                >
                  Mirror
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 md:mt-12 pt-8 border-t border-foreground/10">
          <p 
            className="text-center text-foreground/40 text-xs"
            style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
          >
            © {new Date().getFullYear()} Tiles. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

