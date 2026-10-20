import React from "react";
import Button from "../components/ui/Button";
import ImageReady from "../assets/images/ReadyForAn.png";

export default function ReadyForAdventure() {
  return (
    <>
      <section className="relative bg-backgroundIvory min-h-screen flex flex-col overflow-hidden">
        <img src={ImageReady} alt="" className='absolute inset-0 w-full object-contain z-20 -mt-28'/>
        <div className="flex flex-col px-14 items-center z-10">
          <h1 className="font-switzer font-semibold text-5xl text-textMoss">
            Ready for an
          </h1>

          <div className="relative -mt-10">
            <h2 className="absolute -top-4 left-2 text-[200px] whitespace-nowrap text-secondarySage/40 font-bold [-webkit-text-stroke:1.5px_var(--color-textMoss)]">
              ADVENTURE <span className="font-switzer">?</span>
            </h2>

            <h2 className="relative text-[200px] text-textMoss font-bold font-switzer">
              ADVENTURE ?
            </h2>
          </div>
        </div>
        <Button className="z-30 w-40 self-center p-3">Start Planning</Button>
      </section>
    </>
  );
}
