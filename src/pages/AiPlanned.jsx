import React from "react";
import Button from "../components/ui/Button";
import ImageMaps from "../assets/images/Maps.png"

function AiPlanned() {
  return (
    <>
      <section className="bg-secondarySage flex items-center gap-20">
        <div className="px-20 py-20">
          <h1 className="font-switzer font-bold text-4xl text-whitebright">
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

        <div className="bg-whitebright w-full max-w-2xl h-full px-6 py-6 rounded-xl mt-20 mb-20 shadow-xl">
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
        </div>
      </section>
    </>
  );
}

export default AiPlanned;
