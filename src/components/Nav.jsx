  // src/components/Nav.jsx
  import { useState } from "react";
  import { HiMenu, HiX } from "react-icons/hi";

  export default function Nav() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
      { href: "#hero", label: "Home" },
      { href: "#about", label: "About" },
      { href: "#skills", label: "Skills" },
      { href: "#projects", label: "Projects" },
      { href: "#awards", label: "Awards" },
    ];

    return (
      <>
        {/* Hamburger Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-[1rem] left-[1rem] z-50 w-[3rem] h-[2rem] flex items-center justify-center bg-gradient-to-br from-purple-600 to-cyan-400 rounded-full shadow-2xl transition hover:scale-105 hover:shadow-cyan-400/40 group"
        >
          <div className="space-y-2">
            <span className="block w-8 h-[3px] bg-white rounded-full group-hover:bg-cyan-200 transition-all duration-200"></span>
            <span className="block w-8 h-[3px] bg-white rounded-full group-hover:bg-cyan-200 transition-all duration-200"></span>
            <span className="block w-8 h-[3px] bg-white rounded-full group-hover:bg-cyan-200 transition-all duration-200"></span>
          </div>
        </button>

        {/* Overlay */}
        <div
          className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${
            isOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Drawer */}
        <aside
          className={`fixed top-0 left-0 h-full w-[60vw] max-w-sm z-50 transition-transform duration-300
          transform shadow-2xl backdrop-blur-lg border-r border-white/10
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
          style={{ backgroundColor: "rgba(20, 20, 20, 0.7)" }} // 半透明背景色
        >
          {/* Close Button */}
          <div className="flex justify-end p-4">
            <button onClick={() => setIsOpen(false)} className="text-white">
              <HiX size={24} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-6 px-8 py-4 text-lg">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className="hover:text-cyan-300 transition"
              >
                {label}
              </a>
            ))}
          </nav>
        </aside>
      </>
    );
  }
