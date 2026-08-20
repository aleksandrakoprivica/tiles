import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    '/': ['./content/blog/**/*'],
    '/*': ['./content/blog/**/*'],
  },
};

export default withNextIntl(nextConfig);
