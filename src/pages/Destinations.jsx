
  import React from "react";
  import Card from "../components/ui/Card";
  import ImageBali from "../assets/images/Bali.png";
  import ImageTokyo from "../assets/images/tokyo.png";
  import ImageZermatt from "../assets/images/zermatt.png";
  import ImageKyoto from "../assets/images/kyoto.png";
  import ImageLauterbrunnen from "../assets/images/Lauterbrunnen.png";
  import ImageCappadocia from "../assets/images/Cappadocia.png";


  function Destinations() {
    return (
      <>
        <section className="bg-backgroundIvory px-20 py-44">
          <div className="pb-10">
            <h1 className="font-switzer font-bold text-4xl text-blackdark">
              Find Your Next Somewhere
            </h1>
            <p className="font-satoshi font-medium text-blackdark text-xl w-2xl">
              Discover destinations tailored to your travel style, with trip types
              and duration estimates.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-6">
            <Card className="col-span-1 row-span-2 min-h-[680px] bg-linear-to-b from-[#000000] to-[#666666]">
              <img
                src={ImageBali}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/50 to-transparent" />

              <div className="absolute bottom-0 p-5">
                <p className="font-satoshi font-normal text-lg text-whitebright tracking-wider">
                  Indonesia
                </p>
                <h2 className="font-satoshi font-bold text-5xl text-whitebright">
                  Bali
                </h2>
                <p className="font-satoshi font-normal text-accentSend text-lg pb-4">
                  Relaxation, Culture
                </p>
                <p className="font-satoshi font-normal text-whitebright text-lg">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam,
                </p>
              </div>
            </Card>

            <div className="col-span-3 grid grid-cols-3 items-start gap-x-6 gap-y-6">
              <Card className="h-[280px] w-full">
                <img
                  src={ImageBali}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/50 to-transparent" />

                <div className="absolute bottom-0 px-5 py-3">
                  <p className="font-satoshi text-base text-whitebright tracking-wider">
                    Indonesia
                  </p>

                  <h2 className="font-satoshi text-3xl font-bold text-whitebright">
                    Bali
                  </h2>

                  <div className="flex items-center gap-20">
                    <p className="text-sm font-light text-accentSend">
                      Relaxation, Culture
                    </p>

                    <i className="fi fi-rr-angle-small-right inline-flex items-center pt-1 text-3xl text-accentSend" />
                  </div>
                </div>
              </Card>

              <Card className="h-[280px] w-full">
                <img
                  src={ImageTokyo}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/50 to-transparent" />

                <div className="absolute bottom-0 px-5 py-3">
                  <p className="font-satoshi text-base text-whitebright tracking-wider">Japan</p>

                  <h2 className="font-satoshi text-3xl font-bold text-whitebright">
                    Tokyo
                  </h2>

                  <div className="flex items-center gap-20">
                    <p className="text-sm font-light text-accentSend">
                      Culture, Food & Dining
                    </p>

                    <i className="fi fi-rr-angle-small-right inline-flex items-center pt-1 text-3xl text-accentSend" />
                  </div>
                </div>
              </Card>

              <Card className="h-[280px] w-full">
                <img
                  src={ImageZermatt}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/50 to-transparent" />

                <div className="absolute bottom-0 px-5 py-3">
                  <p className="font-satoshi text-base text-whitebright tracking-wider">
                    Switzerland
                  </p>

                  <h2 className="font-satoshi text-3xl font-bold text-whitebright">
                    Zermatt
                  </h2>

                  <div className="flex items-center gap-20">
                    <p className="text-sm font-light text-accentSend">
                      Relaxation, Culture
                    </p>

                    <i className="fi fi-rr-angle-small-right inline-flex items-center pt-1 text-3xl text-accentSend" />
                  </div>
                </div>
              </Card>

              <Card className="h-[280px] w-full">
                <img
                  src={ImageKyoto}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/50 to-transparent" />

                <div className="absolute bottom-0 px-5 py-3">
                  <p className="font-satoshi text-base text-whitebright tracking-wider">Japan</p>

                  <h2 className="font-satoshi text-3xl font-bold text-whitebright">
                    Kyoto
                  </h2>

                  <div className="flex items-center gap-20">
                    <p className="text-sm font-light text-accentSend">Culture</p>

                    <i className="fi fi-rr-angle-small-right inline-flex items-center pt-1 text-3xl text-accentSend" />
                  </div>
                </div>
              </Card>

              <Card className="h-[280px] w-full">
                <img
                  src={ImageLauterbrunnen}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/50 to-transparent" />

                <div className="absolute bottom-0 px-5 py-3">
                  <p className="font-satoshi text-base text-whitebright tracking-wider">
                    Switzerland
                  </p>

                  <h2 className="font-satoshi text-3xl font-bold text-whitebright">
                    Lauterbrunnen
                  </h2>

                  <div className="flex items-center gap-20">
                    <p className="text-lg font-light text-accentSend">Nature</p>

                    <i className="fi fi-rr-angle-small-right inline-flex items-center pt-1 text-3xl text-accentSend" />
                  </div>
                </div>
              </Card>

              <Card className="h-[280px] w-full">
                <img
                  src={ImageCappadocia}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/50 to-transparent" />

                <div className="absolute bottom-0 px-5 py-3">
                  <p className="font-satoshi text-base text-whitebright tracking-wider">Greece</p>

                  <h2 className="font-satoshi text-3xl font-bold text-whitebright">
                    Cappadocia
                  </h2>

                  <div className="flex items-center gap-20">
                    <p className="text-sm font-light text-accentSend">Coastal</p>

                    <i className="fi fi-rr-angle-small-right inline-flex items-center pt-1 text-3xl text-accentSend" />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </>
    );
  }

  export default Destinations;
