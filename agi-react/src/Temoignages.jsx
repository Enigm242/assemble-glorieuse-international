import { useEffect, useState } from "react";
import "./Temoignages.css";

function Temoignages() {
  const [phase, setPhase] = useState(0);

  useEffect(function () {
    const timers = [
      setTimeout(function () {
        setPhase(1);
      }, 700),

      setTimeout(function () {
        setPhase(2);
      }, 3000),

      setTimeout(function () {
        setPhase(3);
      }, 5300),

      setTimeout(function () {
        setPhase(4);
      }, 8000),

      setTimeout(function () {
        setPhase(5);
      }, 11500),
    ];

    return function () {
      timers.forEach(function (timer) {
        clearTimeout(timer);
      });
    };
  }, []);

  const phrases = [
    "Ils avaient prié.",
    "Ils avaient attendu.",
    "Certains avaient même perdu espoir.",
    "Puis Dieu a écrit la suite.",
  ];

  return (
    <main className="testimonials-page">

      <section className="testimonials-opening">

        <div className="opening-stage">

          <div
            className={
              phase === 1
                ? "opening-phrase is-visible"
                : phase > 1
                  ? "opening-phrase is-hidden"
                  : "opening-phrase"
            }
          >
            {phrases[0]}
          </div>

          <div
            className={
              phase === 2
                ? "opening-phrase is-visible"
                : phase > 2
                  ? "opening-phrase is-hidden"
                  : "opening-phrase"
            }
          >
            {phrases[1]}
          </div>

          <div
            className={
              phase === 3
                ? "opening-phrase is-visible"
                : phase > 3
                  ? "opening-phrase is-hidden"
                  : "opening-phrase"
            }
          >
            {phrases[2]}
          </div>

          <div
            className={
              phase === 4
                ? "opening-phrase handwriting"
                : phase > 4
                  ? "opening-phrase is-hidden"
                  : "opening-phrase"
            }
          >
            {phrases[3]}
          </div>

        </div>

        <a
          href="/temoignages/histoires"
          className={
            phase >= 5
              ? "opening-link is-visible"
              : "opening-link"
          }
        >
          Découvrez leurs histoires
          <span aria-hidden="true">→</span>
        </a>

      </section>

    </main>
  );
}

export default Temoignages;