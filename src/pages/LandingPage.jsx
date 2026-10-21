import Navbar from "../components/shared/Navbar";
import SmoothScroll from "../components/shared/SmoothScroll";
import Home from "./Home";
import StarPlanning from "./StarPlanning";
import Destinations from "./Destinations";
import AiPlanned from "./AiPlanned";
import TravelSmart from "./TravelSmart";
import ReadyForAdventure from "./ReadyForAdventure";

// Semua section landing page digabung di sini, urut dari atas ke bawah.
export default function LandingPage() {
  return (
    <>
      <SmoothScroll />
      <Navbar />
      <main>
        <Home />
        <StarPlanning />
        <Destinations />
        <AiPlanned />
        <TravelSmart />
        <ReadyForAdventure />
      </main>
      <footer className="bg-backgroundIvory px-5 py-8 text-center font-satoshi text-sm text-textMoss/70 sm:px-10">
        © {new Date().getFullYear()} TripTrip.com — plan smarter, travel lighter.
      </footer>
    </>
  );
}
