import { useEffect } from "react";

// グローバル scrollController を定義
export const scrollController = {
  currentIndex: 0,
  // eslint-disable-next-line no-unused-vars
  scrollTo: (delta) => {},
  // eslint-disable-next-line no-unused-vars
  scrollToIndex: (index) => {},
};

export default function useSectionSnapScroll() {
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    let isScrolling = false;

    const scrollToSection = (index) => {
      if (index >= 0 && index < sections.length) {
        isScrolling = true;
        scrollController.currentIndex = index;
        sections[index].scrollIntoView({ behavior: "smooth" });

        setTimeout(() => {
          isScrolling = false;
        }, 220);
      }
    };

    // 相対移動
    scrollController.scrollTo = (delta) => {
      const newIndex = Math.max(
        0,
        Math.min(sections.length - 1, scrollController.currentIndex + delta)
      );
      scrollToSection(newIndex);
    };

    // 明示的 index 移動
    scrollController.scrollToIndex = (index) => {
      const clamped = Math.max(0, Math.min(sections.length - 1, index));
      scrollToSection(clamped);
    };

    // ホイール対応
    const onWheel = (e) => {
      if (isScrolling) return;
      e.preventDefault();

      if (e.deltaY > 30) scrollController.scrollTo(1);
      else if (e.deltaY < -30) scrollController.scrollTo(-1);
    };

    // タッチ対応
    let touchStartY = 0;

    const onTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const onTouchEnd = (e) => {
      if (isScrolling) return;

      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;

      if (deltaY > 30) scrollController.scrollTo(1);
      else if (deltaY < -30) scrollController.scrollTo(-1);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);
}
