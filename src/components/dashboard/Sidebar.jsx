import { Link, NavLink } from "react-router";
import { initials } from "../../utils/format";

const NAV = [
  { to: "/dashboard", label: "Home", icon: "fi fi-rr-house-blank", end: true },
  { to: "/dashboard/destinations", label: "Destination", icon: "fi fi-rr-marker" },
  { to: "/dashboard/plan", label: "Plan a Trip", icon: "fi fi-rr-route" },
  { to: "/dashboard/map", label: "Map", icon: "fi fi-rr-map-marker" },
  { to: "/dashboard/settings", label: "Settings", icon: "fi fi-rr-settings" },
];

// Semua transisi pakai durasi & easing yang sama supaya bergerak serempak
const ANIM = "transition-all duration-300 ease-in-out";

export default function Sidebar({ collapsed, onToggle, name }) {
  const open = !collapsed;
  const labelFade = `${ANIM} ${open ? "opacity-100" : "opacity-0"}`;

  // Fase capture: saat tertutup, klik ikon/logo tidak boleh pindah halaman.
  // Di sini TIDAK mengubah state, hanya membatalkan aksi link.
  function handleClickCapture(e) {
    if (!open) e.preventDefault();
  }

  return (
    <>
      {/* Penjaga ruang: lebar sidebar tertutup, supaya konten tidak bergeser */}
      <div className="w-[84px] shrink-0" aria-hidden="true" />

      {/* Latar gelap: klik di luar sidebar -> tutup */}
      <div
        onClick={() => onToggle()}
        aria-hidden="true"
        className={`fixed inset-0 z-30 bg-black/20 backdrop-blur-xs transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Satu handler untuk buka & tutup: tertutup -> buka, terbuka -> tutup */}
      <aside
        onClickCapture={handleClickCapture}
        onClick={() => onToggle()}
        className={`top-0 left-0 z-40 fixed flex flex-col gap-4 py-3 h-dvh transition-[width] duration-300 ease-in-out ${
          open ? "w-80" : "w-[84px] cursor-pointer"
        }`}>
        {/* Brand */}
        <Link
          to="/"
          title={open ? "Kembali ke website" : "Buka sidebar"}
          className={`flex items-center bg-whitebright/70 border border-l-0 border-secondarySage/60 rounded-3xl rounded-l-none h-[4.5rem] overflow-hidden ${ANIM} ${
            open ? "px-4 gap-4" : "px-6 gap-0"
          }`}>
          <div className="flex justify-center items-center bg-textMoss rounded-full size-9 font-switzer font-bold text-white text-2xl shrink-0">L</div>
          <span
            aria-hidden={!open}
            className={`min-w-0 overflow-hidden whitespace-nowrap font-switzer font-semibold text-textMoss text-lg ${labelFade}`}>
            <span className="block pb-1 border-secondarySage border-b border-dashed">TripTrip.com</span>
          </span>
        </Link>

        {/* Navigasi + profil (profil ada di dalam kartu, paling bawah) */}
        <nav
          className={`relative flex flex-col flex-1 gap-2 bg-whitebright/70 border border-l-0 border-secondarySage/60 rounded-3xl rounded-l-none ${ANIM} ${
            open ? "p-6" : "p-3"
          }`}>
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} title={item.label}>
              {({ isActive }) => (
                <div
                  className={`relative flex items-center h-14 rounded-2xl cursor-pointer ${ANIM} ${
                    open ? "pl-4 pr-10" : "px-5"
                  } ${
                    isActive
                      ? "bg-secondarySage/40 text-primaryForest font-semibold border-none"
                      : "text-textMoss hover:bg-gray-50 font-normal"
                  }`}>
                  <span
                    aria-hidden={!open}
                    className={`min-w-0 overflow-hidden whitespace-nowrap font-satoshi text-base ${labelFade}`}>
                    {item.label}
                  </span>
                  <i className={`${item.icon} ml-auto shrink-0 text-xl leading-none flex items-center`} />

                  {/* Penanda aktif: sama persis dengan SideMenu (guest) */}
                  {isActive && (
                    <svg
                      width="6"
                      height="22"
                      viewBox="0 0 3 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="top-1/2 right-0 absolute -translate-y-1/2">
                      <path
                        d="M0 3C0 1.34315 1.34315 0 3 0V0V22V22C1.34315 22 0 20.6569 0 19V3Z"
                        fill="#244B3A"
                      />
                    </svg>
                  )}
                </div>
              )}
            </NavLink>
          ))}

          {/* Profil */}
          <div
            className={`flex items-center mt-auto pt-6 border-t ${ANIM} ${
              open ? "gap-3 pl-0 border-secondarySage/20" : "gap-0 pl-1.5 border-transparent"
            }`}>
            <div className="flex justify-center items-center bg-accentSend rounded-full size-9 font-switzer font-bold text-white text-lg shrink-0">
              {initials(name)}
            </div>
            <div
              aria-hidden={!open}
              className={`min-w-0 overflow-hidden whitespace-nowrap font-satoshi ${labelFade}`}>
              <span className="block font-bold text-textMoss">{name}</span>
              <span className="block text-textLabel text-xs">Hello {name.split(/\s|_/)[0]}, Let&apos;s TripTriiiip!!</span>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}