import { useEffect } from "react";

// Mengunci scroll halaman selama komponen yang memakainya tampil (mis. modal)
function useLockScroll() {
  useEffect(() => {
    const { body, documentElement } = document;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

    body.style.overflow = "hidden";
    body.style.paddingRight = `${scrollbarWidth}px`; // cegah layout bergeser saat scrollbar hilang

    return () => {
      body.style.overflow = "";
      body.style.paddingRight = "";
    };
  }, []);
}

export default useLockScroll;
