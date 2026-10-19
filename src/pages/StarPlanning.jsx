import React from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

function StarPlanning() {
  return (
    <section className="relative z-40 flex justify-center px-20 max-sm:px-4 bg-backgroundIvory">
      <div className="relative -mt-30 w-full  bg-whitebright rounded-2xl px-6 py-7 shadow-xl">
        <svg
          className="absolute pointer-events-none top-0 left-0"
          width="194"
          height="268"
          viewBox="0 0 194 268"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.2">
            <path
              d="M3.885 -9.36728C21.0389 49.3443 -4.51597 127.994 -61.4218 191.626C-70.0574 106.698 -44.5025 28.0486 3.885 -9.36728Z"
              fill="#5C8A64"
            />
            <path
              d="M2.46601 -4.99773L-55.7422 174.149"
              stroke-width="2.29714"
              stroke="#F4EFE0"
              stroke-opacity="0.45"
            />
            <path
              d="M3.88569 -9.36726C57.3875 49.4575 72.3494 155.918 42.1219 262.697C-16.3672 168.386 -31.3292 61.9258 3.88569 -9.36726Z"
              fill="#6F9A72"
            />
            <path
              d="M4.7168 -3.45294L38.7969 239.039"
              stroke-width="2.98629"
              stroke="#F4EFE0"
              stroke-opacity="0.45"
            />
            <path
              d="M3.88515 -9.3675C68.2874 18.9207 118.684 99.5715 132.676 196.74C51.4746 141.568 1.07834 60.9175 3.88515 -9.3675Z"
              fill="#86AB7F"
            />
            <path
              d="M6.68514 -4.88687L121.477 178.818"
              stroke-width="2.64171"
              stroke="#F4EFE0"
              stroke-opacity="0.45"
            />
            <path
              d="M3.88539 -9.36737C65.0508 -9.67362 133.61 36.57 179.092 108.811C95.0734 93.7026 26.5144 47.4589 3.88539 -9.36737Z"
              fill="#4F7A5B"
            />
            <path
              d="M7.69324 -6.79824L163.855 98.5345"
              stroke-width="2.29714"
              stroke="#F4EFE0"
              stroke-opacity="0.45"
            />
            <path
              d="M3.8855 -9.36717C51.2754 -30.7515 120.5 -18.5453 180.793 21.8264C110.328 39.1419 41.1036 26.9358 3.8855 -9.36717Z"
              fill="#9BBD94"
            />
            <path
              d="M7.73077 -8.68885L165.409 19.1141"
              stroke-width="1.95257"
              stroke="#F4EFE0"
              stroke-opacity="0.45"
            />
          </g>
        </svg>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blackdark">Start Planning</h1>
          <p className="text-black text-lg font-satoshi">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        <div>
          <div className="mb-4 flex gap-4 max-sm:flex-col">
            <Input
              id="destination"
              label="Destination"
              type="text"
              placeholder="Where to?"
              containerClassName="flex-1"
            />
            <Input
              id="budget"
              label="Budget"
              type="text"
              placeholder="IDR XXXXX"
              containerClassName="flex-1"
            />
          </div>

          <div className="mb-6 flex gap-4 max-sm:flex-col">
            <Input
              id="travelers"
              label="Travellers"
              type="text"
              placeholder="2 people"
              containerClassName="flex-1"
            />
            <Input
              id="departure"
              label="Departure"
              type="text"
              placeholder="DD / MM / YYYY"
              containerClassName="flex-1"
            />
            <Input
              id="return"
              label="Return"
              type="text"
              placeholder="DD / MM / YYYY"
              containerClassName="flex-1"
            />
          </div>

          <div className="flex items-end justify-between gap-6 max-sm:flex-col max-sm:items-start">
            <div>
              <h2 className="mb-3 text-lg font-bold text-blackdark font-satoshi">
                Travel Style
              </h2>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="primary"
                  className="bg-textMoss text-whitebright font-medium text-lg"
                >
                  Relaxation
                </Button>
                <Button variant="accent" className="font-medium text-lg">
                  Adventure
                </Button>
                <Button
                  variant="accent"
                  className="font-medium text-lg text-accentSend"
                >
                  Culture, Food & Dining
                </Button>
                <Button variant="accent" className="font-medium text-lg">
                  Culture
                </Button>
              </div>
            </div>

            <Button variant="primary" className="font-bold text-lg z-10">
              Generate My Trip
            </Button>
          </div>
        </div>

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
      </div>
    </section>
  );
}

export default StarPlanning;
