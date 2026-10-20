import React from "react";
import Card from "../components/ui/Card";
import ImageTravel1 from "../assets/images/SmartRoute.png";
import ImageTravel2 from "../assets/images/BudgetEstimation.png";
import ImageTravel3 from "../assets/images/Daily.png";

function TravelSmart() {
  return (
    <>
      <section id="travel-smart" className="bg-backgroundIvory px-20 pt-44 pb-96 max-md:px-10 max-md:pt-28 max-md:pb-48 max-sm:px-5">
        <div>
          <h1 className="font-switzer font-bold text-5xl text-black max-sm:text-3xl">
            Travel Smarter
          </h1>
          <p className="font-satoshi font-normal text-xl text-blackdark w-[500px] max-md:w-full">
            Three features for a more time- and cost-efficient journey.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-8 max-md:grid-cols-1">
          <Card className="col-span-1 row-span-2 min-h-96 w-full bg-whitebright px-4 py-5">
            <img src={ImageTravel1} alt="" />
            <div className="relative z-10 p-5">
              <p className="font-satoshi font-bold text-lg text-textLabel">
                01
              </p>
              <h2 className="font-satoshi font-bold text-3xl text-blackdark">
                Smart Route
              </h2>
              <p className="font-satoshi font-medium text-base text-textLabel">
                Optimized routes between stops.
              </p>
              <div className="pt-6 pb-5">
                <p className="flex items-center gap-3 font-satoshi font-medium text-lg text-textMoss">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="14" cy="14" r="14" fill="#252B27" />
                  </svg>
                  Optimized visit order
                </p>
                <p className="flex items-center gap-3 font-satoshi font-medium text-lg text-textMoss">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="14" cy="14" r="14" fill="#252B27" />
                  </svg>
                  Estimated travel time
                </p>
                <p className="flex items-center gap-3 font-satoshi font-medium text-lg text-textMoss">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="14" cy="14" r="14" fill="#252B27" />
                  </svg>
                  Transportation options
                </p>
              </div>
              <div className="w-full border-t-2 border-dashed border-black"></div>
              <p className="font-satoshi font-medium text-lg text-textMoss pt-5">
                Save up to XX% on travel time
              </p>
            </div>
          </Card>
          <Card className="col-span-1 row-span-2 min-h-96 w-full bg-whitebright px-4 py-5">
            <img src={ImageTravel2} alt="" />
            <div className="relative z-10 p-5">
              <p className="font-satoshi font-bold text-lg text-textLabel">
                02
              </p>
              <h2 className="font-satoshi font-bold text-3xl text-blackdark">
                Budget Estimation
              </h2>
              <p className="font-satoshi font-medium text-base text-textLabel">
                Know what your trip might cost.
              </p>
              <div className="pt-6 pb-5">
                <p className="flex items-center gap-3 font-satoshi font-medium text-lg text-textMoss">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="14" cy="14" r="14" fill="#252B27" />
                  </svg>
                  Estimate your travel expenses
                </p>
                <p className="flex items-center gap-3 font-satoshi font-medium text-lg text-textMoss">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="14" cy="14" r="14" fill="#252B27" />
                  </svg>
                  Include stays and activities
                </p>
                <p className="flex items-center gap-3 font-satoshi font-medium text-lg text-textMoss">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="14" cy="14" r="14" fill="#252B27" />
                  </svg>
                  Adjust plans to your budget
                </p>
              </div>
              <div className="w-full border-t-2 border-dashed border-black"></div>
              <p className="font-satoshi font-medium text-lg text-textMoss pt-5">
                A clearer picture of your travel costs.
              </p>
            </div>
          </Card>
          <Card className="col-span-1 row-span-2 min-h-96 w-full bg-whitebright px-4 py-5">
            <img src={ImageTravel3} alt="" />
            <div className="relative z-10 p-5">
              <p className="font-satoshi font-bold text-lg text-textLabel">
                03
              </p>
              <h2 className="font-satoshi font-bold text-3xl text-blackdark">
                Daily Itinerary
              </h2>
              <p className="font-satoshi font-medium text-base text-textLabel">
                Turn your ideas into a daily plan.
              </p>
              <div className="pt-6 pb-5">
                <p className="flex items-center gap-3 font-satoshi font-medium text-lg text-textMoss">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="14" cy="14" r="14" fill="#252B27" />
                  </svg>
                  Arrange activities by day
                </p>
                <p className="flex items-center gap-3 font-satoshi font-medium text-lg text-textMoss">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="14" cy="14" r="14" fill="#252B27" />
                  </svg>
                  Set times for each activity
                </p>
                <p className="flex items-center gap-3 font-satoshi font-medium text-lg text-textMoss">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="14" cy="14" r="14" fill="#252B27" />
                  </svg>
                  Edit and save your itinerary
                </p>
              </div>
              <div className="w-full border-t-2 border-dashed border-blackdark"></div>
              <p className="font-satoshi font-medium text-lg text-textMoss pt-5">
                Your whole adventure, in one plan.
              </p>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}

export default TravelSmart;
