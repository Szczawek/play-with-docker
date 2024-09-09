import cors from "cors";
import helmet from "helmet"

const corsConfig = cors({
  origin: ["https://127.0.0.1:5173", "https://localhost:3001/"],
  credentials: true,
});

const helmetConfig = helmet({
  crossOriginResourcePolicy: "cross-origin",
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'none'"],
      scriptSrc: ["'none'"],
      styleSrc: ["'none'"],
      imgSrc: ["'none'"],
      connectSrc: ["'none'"],
      fontSrc: ["'none'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'none'"],
      frameSrc: ["'none'"],
      baseUri: ["'none'"],
      formAction: ["'none'"],
    },
  }, // Disables CSP, you can customize or remove it if needed
  crossOriginEmbedderPolicy: false, // For compatibility with certain environments (like WebAssembly)
  frameguard: {
    action: "deny", // Prevents clickjacking by setting X-Frame-Options to 'deny'
  },
  hidePoweredBy: true, // Removes X-Powered-By header
  hsts: {
    maxAge: 31536000, // Enforces HTTPS for one year (recommended)
    includeSubDomains: true, // Applies HSTS to all subdomains
    preload: true,
  },
  referrerPolicy: { policy: "no-referrer" }, // Sets Referrer-Policy header
  xssFilter: true, // Adds X-XSS-Protection header for older browsers
});

export { corsConfig, helmetConfig };
