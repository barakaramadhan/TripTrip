import ImageBali from "../assets/images/Bali.webp";
import ImageTokyo from "../assets/images/tokyo.webp";
import ImageZermatt from "../assets/images/zermatt.webp";
import ImageKyoto from "../assets/images/kyoto.webp";
import ImageLauterbrunnen from "../assets/images/lauterbrunnen.webp";
import ImageSantorini from "../assets/images/santorini.webp";
import ImageUbud from "../assets/images/ubud.webp";
import ImageMarrakech from "../assets/images/marrakech.webp";

export const destinations = [
  {
    id: 1,
    country: "Indonesia",
    name: "Bali",
    tags: ["Relaxation", "Culture"],
    image: ImageBali,
    description:
      "Sea temples, quiet beaches and artist villages. A slow, easygoing escape that is still rich in culture.",
    duration: "5–7 days",
    bestTime: "Apr – Oct",
    budget: "Rp 6–10 jt",
    highlights: ["Tanah Lot at sunset", "Uluwatu cliff temple", "Nusa Penida day trip"],
  },
  {
    id: 2,
    country: "Japan",
    name: "Tokyo",
    tags: ["Culture", "Food & Dining"],
    image: ImageTokyo,
    description:
      "Neon alleys, tiny izakayas and quiet shrines. Eat your way through every neighbourhood.",
    duration: "5–7 days",
    bestTime: "Mar – May",
    budget: "Rp 15–22 jt",
    highlights: ["Omoide Yokocho alley dining", "Senso-ji temple in Asakusa", "Tsukiji outer market breakfast"],
  },
  {
    id: 3,
    country: "Switzerland",
    name: "Zermatt",
    tags: ["Relaxation", "Culture"],
    image: ImageZermatt,
    description:
      "A car-free alpine village below the Matterhorn, with flower-filled trails and wooden chalets.",
    duration: "4–6 days",
    bestTime: "Jun – Sep",
    budget: "Rp 25–35 jt",
    highlights: ["Gornergrat railway views", "Five Lakes hiking trail", "Hinterdorf old village walk"],
  },
  {
    id: 4,
    country: "Japan",
    name: "Kyoto",
    tags: ["Culture"],
    image: ImageKyoto,
    description:
      "Temples, tea houses and stone lanes that keep old Japan alive.",
    duration: "3–5 days",
    bestTime: "Mar – Apr, Nov",
    budget: "Rp 12–18 jt",
    highlights: ["Kiyomizu-dera temple", "Fushimi Inari gates", "Evening stroll in Gion"],
  },
  {
    id: 5,
    country: "Switzerland",
    name: "Lauterbrunnen",
    tags: ["Nature"],
    image: ImageLauterbrunnen,
    description:
      "A deep green valley with more than 70 waterfalls and cliffs rising on both sides.",
    duration: "2–4 days",
    bestTime: "May – Sep",
    budget: "Rp 20–30 jt",
    highlights: ["Staubbach Falls", "Trümmelbach Falls", "Mürren cable car"],
  },
  {
    id: 6,
    country: "Greece",
    name: "Santorini",
    tags: ["Coastal"],
    image: ImageSantorini,
    description:
      "Whitewashed villages and blue domes perched above a volcanic caldera.",
    duration: "4–6 days",
    bestTime: "May – Oct",
    budget: "Rp 18–28 jt",
    highlights: ["Oia sunset", "Caldera boat tour", "Fira to Oia hike"],
  },
  {
    id: 7,
    country: "Indonesia",
    name: "Ubud",
    tags: ["Nature", "Wellness"],
    image: ImageUbud,
    description:
      "Rice terraces, jungle cafes and yoga studios in the cultural heart of Bali.",
    duration: "4–6 days",
    bestTime: "Apr – Oct",
    budget: "Rp 5–9 jt",
    highlights: ["Tegallalang rice terraces", "Sacred Monkey Forest", "Morning yoga class"],
  },
  {
    id: 8,
    country: "Morocco",
    name: "Marrakech",
    tags: ["Culture", "Markets"],
    image: ImageMarrakech,
    description:
      "A pink-walled medina, lively souks and rooftop dinners beneath the Atlas mountains.",
    duration: "3–5 days",
    bestTime: "Mar – May, Oct – Nov",
    budget: "Rp 12–18 jt",
    highlights: ["Jemaa el-Fnaa at dusk", "Bahia Palace", "Souk shopping and mint tea"],
  },
];
