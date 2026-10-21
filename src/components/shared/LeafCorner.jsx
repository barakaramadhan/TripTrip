import { motion } from "framer-motion";

// Dekorasi daun di pojok kartu. Satu SVG dipakai untuk semua pojok (diputar / dicerminkan),
// jadi tidak ada lagi 5 salinan SVG panjang di tiap halaman.
const CORNERS = {
  br: { position: "bottom-0 right-0", flip: "", origin: "100% 100%" },
  bl: { position: "bottom-0 left-0", flip: "-scale-x-100", origin: "0% 100%" },
  tl: { position: "top-0 left-0", flip: "rotate-180", origin: "0% 0%" },
};

export default function LeafCorner({ corner = "br", className = "" }) {
  const { position, flip, origin } = CORNERS[corner];

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute ${position} w-28 sm:w-40 lg:w-[13.8rem] ${className}`}
      style={{ transformOrigin: origin }}
      animate={{ rotate: [0, corner === "bl" ? -2 : 2, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg
        viewBox="0 0 221 250"
        fill="none"
        className={`block h-auto w-full overflow-hidden ${flip}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.2">
          <path d="M189.658 276.74C172.504 218.029 198.059 139.379 254.965 75.7465C263.6 160.675 238.045 239.324 189.658 276.74Z" fill="#5C8A64" />
          <path d="M191.077 272.371L249.285 93.2241" strokeWidth="2.29714" stroke="#F4EFE0" strokeOpacity="0.45" />
          <path d="M189.657 276.74C136.156 217.915 121.194 111.455 151.421 4.67555C209.91 98.987 224.872 205.447 189.657 276.74Z" fill="#6F9A72" />
          <path d="M188.826 270.826L154.746 28.3335" strokeWidth="2.98629" stroke="#F4EFE0" strokeOpacity="0.45" />
          <path d="M189.658 276.74C125.256 248.452 74.8594 167.801 60.8674 70.6327C142.068 125.804 192.465 206.455 189.658 276.74Z" fill="#86AB7F" />
          <path d="M186.858 272.26L72.0664 88.555" strokeWidth="2.64171" stroke="#F4EFE0" strokeOpacity="0.45" />
          <path d="M189.658 276.74C128.492 277.046 59.9332 230.803 14.4511 158.562C98.4695 173.67 167.029 219.914 189.658 276.74Z" fill="#4F7A5B" />
          <path d="M185.85 274.171L29.6875 168.838" strokeWidth="2.29714" stroke="#F4EFE0" strokeOpacity="0.45" />
          <path d="M189.657 276.74C142.268 298.124 73.0429 285.918 12.75 245.546C83.2147 228.231 152.439 240.437 189.657 276.74Z" fill="#9BBD94" />
          <path d="M185.812 276.062L28.1338 248.259" strokeWidth="1.95257" stroke="#F4EFE0" strokeOpacity="0.45" />
        </g>
      </svg>
    </motion.div>
  );
}
