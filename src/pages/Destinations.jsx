import React from "react";
import Card from "../components/ui/Card";
import { destinations } from "../data/destinations";

// Card besar memakai data pertama
const featured = destinations[0];

function Destinations() {
  return (
    <section className="bg-backgroundIvory px-20 pt-44 pb-44 max-md:px-10 max-sm:px-5">
      <div className="pb-10">
        <h1 className="font-switzer font-bold text-5xl text-blackdark max-sm:text-3xl">
          Find Your Next Somewhere
        </h1>
        <p className="font-satoshi font-medium text-blackdark text-xl w-2xl max-md:w-full">
          Discover destinations tailored to your travel style, with trip types
          and duration estimates.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-6 max-md:grid-cols-1">
        {/* Card besar: menempel saat scroll */}
        <Card className="sticky top-24 self-start col-span-1 row-span-2 min-h-[680px] max-md:static max-md:min-h-[450px] bg-linear-to-b from-[#000000] to-[#666666]">
          <img
            src={featured.image}
            alt={featured.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/50 to-transparent" />

          <div className="absolute bottom-0 p-5">
            <p className="font-satoshi font-normal text-lg text-whitebright tracking-wider">
              {featured.country}
            </p>
            <h2 className="font-satoshi font-bold text-5xl text-whitebright">
              {featured.name}
            </h2>
            <p className="font-satoshi font-normal text-accentSend text-lg pb-4">
              {featured.tags}
            </p>
            <p className="font-satoshi font-normal text-whitebright text-lg">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam,
            </p>
          </div>
        </Card>

        {/* Card kecil: dirender dari data */}
        <div className="col-span-3 grid grid-cols-3 items-start gap-x-6 gap-y-6 max-md:col-span-1 max-md:grid-cols-2 max-sm:grid-cols-1">
          {destinations.map((item) => (
            <Card key={item.id} className="h-[280px] w-full">
              <img
                src={item.image}
                alt={item.name}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/70 to-transparent" />

              <div className="absolute bottom-0 px-5 py-3">
                <p className="font-satoshi text-base text-whitebright tracking-wider">
                  {item.country}
                </p>
                <h2 className="font-satoshi text-3xl font-bold text-whitebright">
                  {item.name}
                </h2>
                <div className="flex items-center gap-20">
                  <p className="text-sm font-light text-accentSend">{item.tags}</p>
                  <i className="fi fi-rr-angle-small-right inline-flex items-center pt-1 text-3xl text-accentSend" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Destinations;