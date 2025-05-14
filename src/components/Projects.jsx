/* eslint-disable no-irregular-whitespace */
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useAnimation } from "framer-motion";

const projects = [
  {
    title: "Healpass",
    url: "https://protopedia.net/prototype/6090",
    image: "/Portfolio/projects/project1.png",
  },
  {
    title: "Passit",
    url: "https://protopedia.net/prototype/6737",
    image: "/Portfolio/projects/project5.jpg",
  },
  {
    title: "ところてん",
    url: "https://protopedia.net/prototype/",
    image: "/Portfolio/projects/project3.jpg",
  },
  {
    title: "おにぎり",
    url: "https://protopedia.net/prototype/",
    image: "/Portfolio/projects/project3.jpg",
  },
  {
    title: "やきにくうどん",
    url: "https://protopedia.net/prototype/",
    image: "/Portfolio/projects/project3.jpg",
  },
  {
    title: "Mon Dev Co",
    url: "https://protopedia.net/prototype/6731",
    image: "/Portfolio/projects/project2.jpg",
  },
];

export default function Projects() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // 背景フェードイン・アウト制御用
  const controls = useAnimation();
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
        } else {
          controls.start("hidden");
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [controls]);

  const settings = {
    centerMode: true,
    centerPadding: "0px",
    slidesToShow: 3,
    infinite: true,
    focusOnSelect: true,
    speed: 500,
    beforeChange: (_, next) => setCurrentSlide(next),
    arrows: false,
    dots: true,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: false,
        },
      },
    ],
    appendDots: (dots) => (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <ul style={{ display: "flex", padding: 0 }}>{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={{
          width: "12px",
          height: "12px",
          borderRadius: "6px",
          background: i === currentSlide ? "#66ccff" : "#444",
          marginTop: "40px",
          transition: "background 0.3s",
        }}
      />
    ),
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }}
      transition={{ duration: 1.5 }}
      viewport={{ once: false, amount: 0.3 }}
      className="min-h-screen text-white bg-[blue]/5 py-20 px-4"
    >
      <br />
      <br />
      <h2 className="relative z-10 text-[3.5rem] md:text-[8rem] font-extrabold mb-24 text-center tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[lightblue] via-[lightblue] to-[lightblue]">
        Projects
      </h2>

      <Slider {...settings}>
        {projects.map((project, index) => {
          const isActive = index === currentSlide % projects.length;

          return (
            <div key={index} className="px-4">
              <div
                className={`block rounded-2xl overflow-hidden shadow-xl transition-all duration-500 transform ${
                  isActive
                    ? "scale-105 opacity-100 z-10"
                    : "scale-90 opacity-100"
                }`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="text-[rem] font-semibold text-white mb-1">
                    {project.title}
                  </h3>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#64ffda" }}
                    className="text-[1.2rem] hover:underline"
                  >
                    View Project →
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </motion.section>
  );
}
