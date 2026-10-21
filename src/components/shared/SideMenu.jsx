import { useState } from "react";
import Button from "../ui/Button";

const menuItems = [
  { name: "Home", iconClass: "fi fi-rr-house-blank" },
  { name: "Destination", iconClass: "fi fi-rr-marker" },
  { name: "Plan a Trip", iconClass: "fi fi-rr-route" },
];

function SideMenu({ open, onClose }) {
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <>
      {/* 1. Backdrop Overlay: Menutup sidebar jika diklik di mana saja di luar sidebar */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/20 backdrop-blur-xs z-40 transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* 2. Sidebar Container: Animasi Translate dari Kanan ke Kiri */}
      <aside
        className={`fixed right-0 top-0 w-80 h-screen bg-whitebright rounded-l-3xl flex flex-col p-6 shadow-xl z-50 transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}>
        {/* Tombol Close Sederhana di Atas Navigasi */}
        <div className="flex justify-end mb-2">
          <button
            onClick={onClose}
            className="p-2 text-textMoss hover:text-primaryForest cursor-pointer"
            aria-label="Tutup menu">
            <i className="flex items-center text-lg fi fi-br-cross"></i>
          </button>
        </div>

        <nav className="flex flex-col flex-1 gap-2">
          {menuItems.map((item) => {
            const isActive = activeTab === item.name;

            return (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`relative flex items-center justify-between p-4 pr-10 rounded-2xl transition-colors cursor-pointer ${
                  isActive
                    ? "bg-secondarySage/40 text-primaryForest font-semibold border-none"
                    : "text-textMoss hover:bg-gray-50 font-normal"
                }`}>
                <span className="font-satoshi text-base">{item.name}</span>
                <i
                  className={`${item.iconClass} text-xl leading-none flex items-center`}></i>

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
              </button>
            );
          })}
        </nav>

        <div className="pt-6 border-secondarySage/20 border-t">
          <Button variant="primary" className="w-full">
            Sign Up
          </Button>
        </div>
      </aside>
    </>
  );
}

export default SideMenu;
