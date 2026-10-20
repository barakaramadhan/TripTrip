import React from "react";
import ImageHero from "../assets/images/MainPeak.png";

function Home() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-backgroundIvory">
      <img
        src={ImageHero}
        alt=""
        className="absolute inset-0 h-full  w-full object-contain z-20 rounded-b-2xl"
      />

      <div className="relative flex flex-[0.5] flex-col justify-center px-20 pt-5 pb-40">
        <h1 className="font-switzer font-semibold text-textMoss text-4xl">
          TripTrip!!, Let's
        </h1>

        <div className="relative -mt-14 z-10">
          <h2 className="absolute -top-5 left-2.5 text-[208px] whitespace-nowrap text-secondarySage/40 font-bold [-webkit-text-stroke:1.5px_var(--color-textMoss)]">
            ADVENTURE <span className="font-switzer">.</span>
          </h2>
          <h2 className="relative text-[208px] text-textMoss font-bold font-switzer tracking-wide">
            ADVENTURE.
          </h2>
        </div>
      </div>
    </section>
  );
}

export default Home;
