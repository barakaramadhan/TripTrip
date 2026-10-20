import React from "react";
import Button from "../components/ui/Button";
import ImageMaps from "../assets/images/Maps.png";

function AiPlanned() {
  return (
    <>
      <section className="bg-secondarySage flex items-center gap-20">
        <div className="px-20 py-20">
          <h1 className="font-switzer font-bold text-5xl text-whitebright">
            Your Trip, AI Planned
          </h1>
          <p className="font-satoshi text-xl font-medium text-whitebright w-[500px]">
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

        <div className="relative bg-whitebright w-full max-w-2xl h-full px-6 py-6 rounded-xl mt-20 mb-20 shadow-xl">
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

          <div className="flex justify-between items-center">
            <h2 className="text-blackdark font-satoshi font-bold text-2xl">
              Previev itinerary
            </h2>
            <div className="flex gap-3">
              <Button className="bg-textMoss text-whitebright font-medium py-3 px-6">
                Day 1
              </Button>
              <Button
                className="border-2 border-textMoss  font-medium py-3 px-6"
                variant="accent"
              >
                Day 2
              </Button>
              <Button
                variant="accent"
                className="border-2 border-textMoss  font-medium py-3 px-6"
              >
                Day 3
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-8 pt-6">
            <p className="font-satoshi font-medium text-lg text-textLabel">
              08:00
            </p>
            <div className="bg-backgroundIvory p-3 rounded-xl w-full ">
              <h2 className="font-satoshi font-normal text-blackdark text-lg">
                Morning activity
              </h2>
              <p className="font-satoshi font-normal text-textLabel text-base">
                10-min walk
              </p>
            </div>
          </div>
          <div className="flex items-center gap-8 pt-6">
            <p className="font-satoshi font-medium text-lg text-textLabel">
              08:00
            </p>
            <div className="bg-backgroundIvory p-3 rounded-xl w-full ">
              <h2 className="font-satoshi font-normal text-blackdark text-lg">
                Local lunch
              </h2>
              <p className="font-satoshi font-normal text-textLabel text-base">
                20-min drive
              </p>
            </div>
          </div>
          <div className="flex items-center gap-8 pt-6">
            <p className="font-satoshi font-medium text-lg text-textLabel">
              08:00
            </p>
            <div className="bg-backgroundIvory p-3 rounded-xl w-full ">
              <h2 className="font-satoshi font-normal text-blackdark text-lg">
                Sunset spot
              </h2>
              <p className="font-satoshi font-normal text-textLabel text-base">
                30-min bus ride
              </p>
            </div>
          </div>

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
