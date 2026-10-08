import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Eglise from "./Eglise.jsx";
import Temoignages from "./Temoignages.jsx";
import TemoignagesHistoires from "./TemoignagesHistoires.jsx";
import Parole from "./Parole.jsx";
import VieDeLEglise from "./VieDeLEglise.jsx";
import Dons from "./Dons.jsx";
import Contact from "./Contact.jsx";
import Galerie from "./Galerie.jsx";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(function () {
    const savedTheme = localStorage.getItem("agi-theme");

    if (savedTheme) {
      return savedTheme === "dark";
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(
    function () {
      document.documentElement.setAttribute(
        "data-theme",
        darkMode ? "dark" : "light"
      );

      localStorage.setItem(
        "agi-theme",
        darkMode ? "dark" : "light"
      );
    },
    [darkMode]
  );

  function closeMenu() {
    setMenuOpen(false);
  }

  function toggleMenu() {
    setMenuOpen(function (current) {
      return !current;
    });
  }

  function toggleTheme() {
    setDarkMode(function (current) {
      return !current;
    });
  }

  return (
    <div className="site">

      <header className="header">

        <div className="container header-inner">

          <a
            href="/"
            className="logo"
            onClick={closeMenu}
            aria-label="Assemblée Glorieuse Internationale"
          >
            <img
              src="/images/logo.png"
              alt="Assemblée Glorieuse Internationale"
            />
          </a>

          <button
            type="button"
            className={
              darkMode
                ? "theme-toggle is-dark"
                : "theme-toggle"
            }
            onClick={toggleTheme}
            aria-label={
              darkMode
                ? "Activer le mode clair"
                : "Activer le mode sombre"
            }
            aria-pressed={darkMode}
          >
            <span className="theme-toggle-track">
              <span className="theme-toggle-thumb"></span>
            </span>
          </button>

          <button
            type="button"
            className={
              menuOpen
                ? "menu-button is-open"
                : "menu-button"
            }
            onClick={toggleMenu}
            aria-label={
              menuOpen
                ? "Fermer le menu"
                : "Ouvrir le menu"
            }
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <span className="close-icon">×</span>
            ) : (
              <span className="hamburger-icon">
                <span></span>
                <span></span>
              </span>
            )}
          </button>

        </div>

      </header>

      <div
        className={
          menuOpen
            ? "menu-overlay is-visible"
            : "menu-overlay"
        }
        onClick={closeMenu}
      ></div>

      <aside
        className={
          menuOpen
            ? "mobile-menu is-open"
            : "mobile-menu"
        }
      >

        <div className="mobile-menu-content">

          <p className="menu-label">
            Assemblée Glorieuse Internationale
          </p>

          <nav className="menu-nav">

            <a href="/" onClick={closeMenu}>
              Accueil
            </a>

            <a href="/eglise" onClick={closeMenu}>
              L'Église
            </a>

            <a href="/parole" onClick={closeMenu}>
              La Parole
            </a>

            <a href="/temoignages" onClick={closeMenu}>
              Témoignages
            </a>

            <a href="/vie-de-leglise" onClick={closeMenu}>
              Vie de l'Église
            </a>

            <a href="/dons" onClick={closeMenu}>
              Dons
            </a>

            <a href="/contact" onClick={closeMenu}>
              Contact
            </a>

          </nav>

          <div className="menu-bottom">

            <p>
              Rejoignez-nous
            </p>

            <span>
              Dimanche · 09:00 — 12:00
            </span>

            <span>
              Vendredi · 19:00 — 21:00
            </span>

          </div>

        </div>

      </aside>

      <Routes>

        {/* ACCUEIL */}

        <Route
          path="/"
          element={
            <main>

              <section className="hero">

                <div className="container hero-content">

                  <p className="eyebrow">
                    Assemblée Glorieuse Internationale
                  </p>

                  <h1>
                    Un lieu d'amour, de transformation, de délivrance et de
                    puissance divine.
                  </h1>

                  <p className="hero-text">
                    Tu cherches la paix, la guérison ou une solution à tes problèmes ?
                    Dieu a une réponse pour toi.
                  </p>

                  <div className="hero-actions">

                    <a
                      href="/contact"
                      className="button button-primary"
                    >
                      Nous rejoindre
                    </a>

                  </div>

                </div>

              </section>

              {/* CULTES */}

              <section
                id="cultes"
                className="section"
              >

                <div className="container">

                  <p className="eyebrow">
                    Nous rejoindre
                  </p>

                  <h2>
                    Nos cultes
                  </h2>

                  <div className="service-grid">

                    <article className="service-card">

                      <span>
                        Dimanche
                      </span>

                      <h3>
                        Service d'action de grâce et de gloire
                      </h3>

                      <p>
                        09:00 — 12:00
                      </p>

                    </article>

                    <article className="service-card">

                      <span>
                        Vendredi
                      </span>

                      <h3>
                        Culte prophétique
                      </h3>

                      <p>
                        19:00 — 21:00
                      </p>

                    </article>

                  </div>

                </div>

              </section>

              {/* PRIÈRE */}

              <section
                id="priere"
                className="section section-dark prayer-section"
              >

                <div className="container">

                  <p className="eyebrow">
                    La prière
                  </p>

                  <h2>
                    Quelque chose te préoccupe ?
                  </h2>

                  <p className="section-text">
                    Tu n’as pas à tout porter seul.
                    Même si tu ne sais pas comment l’expliquer,
                    tu peux simplement nous le confier.
                  </p>

                  <p className="prayer-reassurance">
                    Nous prierons avec toi.
                  </p>

                  <p className="prayer-note">
                    Avec foi. Avec bienveillance. En toute discrétion.
                  </p>

                  <a
                    href="/demander-une-priere"
                    className="button button-light"
                  >
                    Demander une prière
                    <span aria-hidden="true">→</span>
                  </a>

                </div>

              </section>

              {/* TÉMOIGNAGES */}

              <section
                id="temoignages"
                className="section testimonials-section"
              >

                <div className="container">

                  <p className="eyebrow">
                    Témoignages
                  </p>

                  <h2>
                    Des vies transformées par la grâce de Dieu.
                  </h2>

                  <p className="section-text">
                    Découvrez les témoignages de ceux qui ont vécu des moments
                    de foi, de prière et de transformation au sein de l'église.
                  </p>

                  <div className="testimonial-placeholder">

                    <p>
                      Les témoignages de l'église seront bientôt disponibles.
                    </p>

                  </div>

                  <a
                    href="/temoignages"
                    className="button button-secondary"
                  >
                    + Voir plus de témoignages
                  </a>

                </div>

              </section>

            </main>
          }
        />

        {/* PAGE L'ÉGLISE */}

        <Route
          path="/eglise"
          element={<Eglise />}
        />

        {/* PAGE INTRODUCTION TÉMOIGNAGES */}

        <Route
          path="/temoignages"
          element={<Temoignages />}
        />

        {/* PAGE HISTOIRES */}

        <Route
          path="/temoignages/histoires"
          element={<TemoignagesHistoires />}
        />

        {/* PAGE LA PAROLE */}

        <Route
          path="/parole"
          element={<Parole />}
        />

        {/* PAGE VIE DE L'ÉGLISE */}

        <Route
          path="/vie-de-leglise"
          element={<VieDeLEglise />}
        />

        {/* PAGE GALERIE */}

        <Route
          path="/galerie"
          element={<Galerie />}
        />

        {/* PAGE DONS */}

        <Route
          path="/dons"
          element={<Dons />}
        />

        {/* PAGE CONTACT */}

        <Route
          path="/contact"
          element={<Contact />}
        />

      </Routes>

      <footer
        className="footer"
        id="contact"
      >

        <div className="container">

          <p>
            Assemblée Glorieuse Internationale
          </p>

          <small>
            Designed &amp; built by afri.Flow
          </small>

        </div>

      </footer>

    </div>
  );
}

export default App;