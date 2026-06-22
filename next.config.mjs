/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // We serve a few of our OWN trusted SVG illustrations (e.g. the CAD
    // placeholder). Safe here because no user-uploaded SVGs exist; the CSP +
    // sandbox below neutralize any scripting.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
