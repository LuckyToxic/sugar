import { useEffect } from "react";

export default function useDynamicVh() {
  
  useEffect(() => {
    function setVh() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }
    setVh();

    window.addEventListener("resize", setVh);
    window.addEventListener("scroll", setVh);
    window.addEventListener("touchmove", setVh);

    return () => {
      window.removeEventListener("resize", setVh);
      window.removeEventListener("scroll", setVh);
      window.removeEventListener("touchmove", setVh);
    };
  }, []);
}
