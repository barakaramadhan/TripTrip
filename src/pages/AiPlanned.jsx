import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../components/ui/Button";
import ImageMaps from "../assets/images/Maps.png";

// Data itinerary per hari. Mau tambah hari? Cukup tambah satu blok { label, items } di sini.
const itineraries = [
  {
    label: "Day 1",
    items: [
      { time: "08:00", title: "Morning activity", note: "10-min walk" },
      { time: "12:00", title: "Local lunch", note: "20-min drive" },
      { time: "17:30", title: "Sunset spot", note: "30-min bus ride" },
    ],
  },
  {
    label: "Day 2",
    items: [
      { time: "09:00", title: "Tegallalang rice terrace", note: "40-min drive" },
      { time: "12:30", title: "Warung lunch in Ubud", note: "5-min walk" },
      { time: "16:00", title: "Sacred Monkey Forest", note: "10-min walk" },
    ],
  },
  {
    label: "Day 3",
    items: [
      { time: "07:30", title: "Fast boat to Nusa Penida", note: "45-min boat ride" },
      { time: "11:00", title: "Kelingking Beach", note: "25-min drive" },
      { time: "15:30", title: "Snorkeling adventure", note: "15-min drive" },
    ],
  },
];

function AiPlanned() {
  // activeDay: 0 = Day 1, 1 = Day 2, 2 = Day 3
  const [activeDay, setActiveDay] = useState(0);
  return (
    <>
      <section id="ai-planned" className="bg-secondarySage flex items-center gap-20 max-md:flex-col max-md:gap-0">
        <div className="px-20 py-20 max-md:w-full max-md:px-10 max-md:py-12 max-sm:px-5">
          <h1 className="font-switzer font-bold text-5xl text-whitebright max-sm:text-3xl">
            Your Trip, AI Planned
          </h1>
          <p className="font-satoshi text-xl font-medium text-whitebright w-[500px] max-md:w-full max-sm:text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor
          </p>
          <div className="pt-10 flex flex-col gap-7">
            <div className="flex items-center gap-4">
              <h2 className="font-satoshi font-medium text-lg px-5 py-3 bg-whitebright rounded-2xl">
                1
              </h2>
              <div>
                <h2 className="font-medium font-satoshi text-lg text-whitebright">
                  Set your preferences
                </h2>
                <p className="font-normal font-satoshi text-base text-textDesc">
                  Destination, dates, budget, and travel style
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <h2 className="font-satoshi font-medium text-lg px-5 py-3 bg-whitebright rounded-2xl">
                2
              </h2>
              <div>
                <h2 className="font-medium font-satoshi text-lg text-whitebright">
                  AI builds your itinerary
                </h2>
                <p className="font-normal font-satoshi text-base text-textDesc">
                  Destinations, timing, and transportation
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <h2 className="font-satoshi font-medium text-lg px-5 py-3 bg-whitebright rounded-2xl">
                3
              </h2>
              <div>
                <h2 className="font-medium font-satoshi text-lg text-whitebright">
                  Edit and save
                </h2>
                <p className="font-normal font-satoshi text-base text-textDesc">
                  Review activities, rearrange, and share
                </p>
              </div>
            </div>
            <Button className="w-32 py-3">Try It Now!</Button>
          </div>
        </div>

        <div className="relative bg-whitebright w-full max-w-2xl h-full px-6 py-6 rounded-xl mt-20 mb-20 shadow-xl max-md:w-auto max-md:self-stretch max-md:max-w-none max-md:mx-10 max-md:mt-0 max-md:mb-12 max-sm:mx-5 max-sm:px-4">
          <svg
            className="absolute bottom-0 right-0 pointer-events-none"
            width="221"
            height="250"
            viewBox="0 0 221 250"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.2">
              <path
                d="M189.658 276.74C172.504 218.029 198.059 139.379 254.965 75.7465C263.6 160.675 238.045 239.324 189.658 276.74Z"
                fill="#5C8A64"
              />
              <path
                d="M191.077 272.371L249.285 93.2241"
                stroke-width="2.29714"
                stroke="#F4EFE0"
                stroke-opacity="0.45"
              />
              <path
                d="M189.657 276.74C136.156 217.915 121.194 111.455 151.421 4.67555C209.91 98.987 224.872 205.447 189.657 276.74Z"
                fill="#6F9A72"
              />
              <path
                d="M188.826 270.826L154.746 28.3335"
                stroke-width="2.98629"
                stroke="#F4EFE0"
                stroke-opacity="0.45"
              />
              <path
                d="M189.658 276.74C125.256 248.452 74.8594 167.801 60.8674 70.6327C142.068 125.804 192.465 206.455 189.658 276.74Z"
                fill="#86AB7F"
              />
              <path
                d="M186.858 272.26L72.0664 88.555"
                stroke-width="2.64171"
                stroke="#F4EFE0"
                stroke-opacity="0.45"
              />
              <path
                d="M189.658 276.74C128.492 277.046 59.9332 230.803 14.4511 158.562C98.4695 173.67 167.029 219.914 189.658 276.74Z"
                fill="#4F7A5B"
              />
              <path
                d="M185.85 274.171L29.6875 168.838"
                stroke-width="2.29714"
                stroke="#F4EFE0"
                stroke-opacity="0.45"
              />
              <path
                d="M189.657 276.74C142.268 298.124 73.0429 285.918 12.75 245.546C83.2147 228.231 152.439 240.437 189.657 276.74Z"
                fill="#9BBD94"
              />
              <path
                d="M185.812 276.062L28.1338 248.259"
                stroke-width="1.95257"
                stroke="#F4EFE0"
                stroke-opacity="0.45"
              />
            </g>
          </svg>

          <div className="flex justify-between items-center max-sm:flex-col max-sm:items-start max-sm:gap-4">
            <h2 className="text-blackdark font-satoshi font-bold text-2xl">
              Previev itinerary
            </h2>

            {/* Tombol hari: klik untuk mengganti itinerary */}
            <div role="tablist" className="flex gap-3 max-sm:gap-2">
              {itineraries.map((day, index) => {
                const isActive = index === activeDay;
                return (
                  <Button
                    key={day.label}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    variant={isActive ? "primary" : "accent"}
                    onClick={() => setActiveDay(index)}
                    className={
                      isActive
                        ? "bg-textMoss text-whitebright font-medium py-3 px-6 cursor-pointer max-sm:px-4 max-sm:py-2"
                        : "border-2 border-textMoss font-medium py-3 px-6 cursor-pointer hover:bg-textMoss/10 max-sm:px-4 max-sm:py-2"
                    }
                  >
                    {day.label}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* key={activeDay}: setiap hari berganti, daftar aktivitas muncul dengan animasi */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              {itineraries[activeDay].items.map((item) => (
                <div
                  key={item.title}
                  className="flex items-center gap-8 pt-6 max-sm:gap-4"
                >
                  <p className="font-satoshi font-medium text-lg text-textLabel max-sm:text-base">
                    {item.time}
                  </p>
                  <div className="bg-backgroundIvory p-3 rounded-xl w-full ">
                    <h2 className="font-satoshi font-normal text-blackdark text-lg">
                      {item.title}
                    </h2>
                    <p className="font-satoshi font-normal text-textLabel text-base">
                      {item.note}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="pt-8">
            <img src={ImageMaps} alt="" />
          </div>
          <svg
            className="absolute bottom-0 left-0"
            width="270"
            height="210"
            viewBox="0 0 268 202"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.2">
              <path
                d="M-9.40037 189.658C49.3112 172.504 127.961 198.059 191.593 254.965C106.665 263.6 28.0155 238.045 -9.40037 189.658Z"
                fill="#5C8A64"
              />
              <path
                d="M-5.03119 191.077L174.115 249.285"
                stroke-width="2.29714"
                stroke="#F4EFE0"
                stroke-opacity="0.45"
              />
              <path
                d="M-9.40064 189.657C49.4241 136.155 155.884 121.193 262.664 151.421C168.352 209.91 61.8924 224.872 -9.40064 189.657Z"
                fill="#6F9A72"
              />
              <path
                d="M-3.48741 188.826L239.005 154.746"
                stroke-width="2.98629"
                stroke="#F4EFE0"
                stroke-opacity="0.45"
              />
              <path
                d="M-9.39987 189.658C18.8883 125.255 99.5391 74.8593 196.708 60.8673C141.536 142.068 60.8852 192.465 -9.39987 189.658Z"
                fill="#86AB7F"
              />
              <path
                d="M-4.91855 186.858L178.786 72.0663"
                stroke-width="2.64171"
                stroke="#F4EFE0"
                stroke-opacity="0.45"
              />
              <path
                d="M-9.38293 189.658C-9.68918 128.492 36.5545 59.9332 108.795 14.4511C93.687 98.4695 47.4434 167.029 -9.38293 189.658Z"
                fill="#4F7A5B"
              />
              <path
                d="M-6.81371 185.85L98.519 29.6875"
                stroke-width="2.29714"
                stroke="#F4EFE0"
                stroke-opacity="0.45"
              />
              <path
                d="M-9.36652 189.657C-30.7508 142.267 -18.5446 73.0427 21.827 12.7497C39.1426 83.2145 26.9364 152.439 -9.36652 189.657Z"
                fill="#9BBD94"
              />
              <path
                d="M-8.68821 185.812L19.1147 28.1335"
                stroke-width="1.95257"
                stroke="#F4EFE0"
                stroke-opacity="0.45"
              />
            </g>
          </svg>
        </div>
      </section>
    </>
  );
}

export default AiPlanned;
