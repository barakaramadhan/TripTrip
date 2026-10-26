
import { Link, NavLink } from "react-router";
import { initials } from "../../utils/format";

const NAV = [
  { to: "/dashboard", label: "Home", icon: "fi fi-rr-house-blank", end: true },
  {
    to: "/dashboard/destinations",
    label: "Destination",
    icon: "fi fi-rr-marker",
  },
  { to: "/dashboard/plan", label: "Plan a Trip", icon: "fi fi-rr-route" },
  { to: "/dashboard/map", label: "Map", icon: "fi fi-rr-map-marker" },
];

const ANIM = "transition-all duration-300 ease-in-out";

export default function Sidebar({ collapsed, onToggle, name }) {
  const open = !collapsed;
  const labelFade = `${ANIM} ${open ? "opacity-100" : "opacity-0"}`;

  function handleClickCapture(e) {
    if (!open) e.preventDefault();
  }

  return (
    <>
      <div className="w-[84px] shrink-0" aria-hidden="true" />

      <div
        onClick={() => onToggle()}
        aria-hidden="true"
        className={`fixed inset-0 z-30 bg-blackdark/50 backdrop-blur-xs transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      <aside
        onClickCapture={handleClickCapture}
        onClick={() => onToggle()}
        className={`top-0 left-0 z-40 fixed flex flex-col gap-4 py-3 h-dvh transition-[width] duration-300 ease-in-out ${
          open ? "w-80" : "w-[84px] cursor-pointer"
        }`}
      >
        <Link
          to="/"
          title={open ? "Kembali ke website" : "Buka sidebar"}
          className={`flex items-center bg-whitebright/70 border border-l-0 border-secondarySage/60 rounded-3xl rounded-l-none h-[4.5rem] overflow-hidden ${ANIM} ${
            open ? "px-4 gap-4" : "px-6 gap-0"
          }`}
        >
          <div
            className={`flex items-center ${ANIM} ${
              open ? "gap-3 pl-0" : "gap-0 pl-1.5"
            }`}
          >
            <div className="flex justify-center items-center bg-accentSend rounded-full size-9 font-switzer font-bold text-white text-lg shrink-0">
              {initials(name)}
            </div>
            <div
              aria-hidden={!open}
              className={`min-w-0 overflow-hidden whitespace-nowrap font-satoshi ${labelFade}`}
            >
              <span className="block font-bold text-textMoss">{name}</span>
              <span className="block text-textLabel text-xs">
                Hello {name.split(/\s|_/)[0]}, Let&apos;s TripTriiiip!!
              </span>
            </div>
          </div>
        </Link>

        <nav
          className={`relative flex flex-col flex-1 gap-2 bg-whitebright/70 border border-l-0 border-secondarySage/60 rounded-3xl rounded-l-none ${ANIM} ${
            open ? "p-6" : "p-3"
          }`}
        >
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              title={item.label}
            >
              {({ isActive }) => (
                <div
                  className={`relative flex items-center h-14 rounded-2xl cursor-pointer ${ANIM} ${
                    open ? "pl-4 pr-10" : "px-5"
                  } ${
                    isActive
                      ? "bg-secondarySage/40 text-primaryForest font-semibold border-none"
                      : "text-textMoss hover:bg-gray-50 font-normal"
                  }`}
                >
                  <span
                    aria-hidden={!open}
                    className={`min-w-0 overflow-hidden whitespace-nowrap font-satoshi text-base ${labelFade}`}
                  >
                    {item.label}
                  </span>
                  <i
                    className={`${item.icon} ml-auto shrink-0 text-xl leading-none flex items-center`}
                  />

                  {isActive && (
                    <svg
                      width="6"
                      height="22"
                      viewBox="0 0 3 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="top-1/2 left-0 absolute -translate-y-1/2"
                    >
                      <path
                        d="M0 0V0C1.65685 0 3 1.34315 3 3V19C3 20.6569 1.65685 22 0 22V22V0Z"
                        fill="#244B3A"
                      />
                    </svg>
                  )}
                </div>
              )}
            </NavLink>
          ))}

          <NavLink
            to="/dashboard/settings"
            title="Settings"
            className="mt-auto border-t border-secondarySage/20 pt-6"
          >
            {({ isActive }) => (
              <div
                className={`relative flex items-center h-14 rounded-2xl cursor-pointer ${ANIM} ${
                  open ? "pl-4 pr-10" : "px-5"
                } ${
                  isActive
                    ? "bg-secondarySage/40 text-primaryForest font-semibold border-none"
                    : "text-textMoss hover:bg-gray-50 font-normal"
                }`}
              >
                <span
                  aria-hidden={!open}
                  className={`min-w-0 overflow-hidden whitespace-nowrap font-satoshi text-base ${labelFade}`}
                >
                  Settings
                </span>

                <i className="fi fi-rr-settings ml-auto shrink-0 text-xl leading-none flex items-center" />

                {isActive && (
                  <svg
                    width="6"
                    height="22"
                    viewBox="0 0 3 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="top-1/2 left-0 absolute -translate-y-1/2"
                  >
                    <path
                      d="M0 0V0C1.65685 0 3 1.34315 3 3V19C3 20.6569 1.65685 22 0 22V22V0Z"
                      fill="#244B3A"
                    />
                  </svg>
                )}
              </div>
            )}
          </NavLink>
        </nav>
      </aside>
    </>
  );
}
