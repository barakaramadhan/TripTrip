import React from "react";

function Footer() {
  return (
    <footer className="relative z-30 bg-primaryForest px-20 py-10 max-md:px-10 max-sm:px-5">
      <div className="flex items-center justify-between gap-6 max-md:flex-col max-md:items-start">
        <div>
          <h2 className="font-switzer font-bold text-2xl text-whitebright">
            TripTrip.com
          </h2>
          <p className="font-satoshi text-base text-textDesc">
            AI-powered travel planning made effortless.
          </p>
        </div>

        <div className="flex gap-6 font-satoshi font-medium text-whitebright max-sm:flex-wrap max-sm:gap-x-5 max-sm:gap-y-2">
          <a href="#start-planning" className="hover:text-accentSend">Start Planning</a>
          <a href="#destinations" className="hover:text-accentSend">Destinations</a>
          <a href="#travel-smart" className="hover:text-accentSend">Travel Smarter</a>
        </div>
      </div>

      <div className="mt-8 border-t border-whitebright/20 pt-5 font-satoshi text-sm text-textDesc">
        © 2026 TripTrip. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
