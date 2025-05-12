// src/components/CustomCursor.jsx
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    const addHover = () => setHovered(true);
    const removeHover = () => setHovered(false);

    // マウス移動イベント
    document.addEventListener("mousemove", moveCursor);

    // ホバー対象イベント（a, button など）
    const hoverTargets = document.querySelectorAll("a, button, .cursor-hover");
    hoverTargets.forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      hoverTargets.forEach((el) => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={clsx(
        "pointer-events-none fixed top-0 left-0 z-50 h-6 w-6 rounded-full transition-transform duration-200 transform -translate-x-1/2 -translate-y-1/2",
        hovered
          ? "scale-150 bg-white mix-blend-difference"
          : "bg-indigo-400 opacity-70"
      )}
    ></div>
  );
}
