import "./VieDeLEglise.css";

function VieDeLEglise() {
  return (
    <main className="vie-eglise-page">

      {/* =========================
          INTRO
      ========================= */}

      <section className="vie-intro">
        <div className="vie-container">
          <p className="vie-eyebrow">VIE DE L'ÉGLISE</p>

          <h1>
            Ce qui se vit
            <br />
            ensemble.
          </h1>

          <p className="vie-intro-text">
            Une Église se découvre aussi dans ce qu’elle vit,
            partage et construit ensemble, au-delà du culte.
          </p>
        </div>
      </section>


      {/* =========================
          RENDEZ-VOUS
      ========================= */}

      <section className="vie-section rendez-vous-section">
        <div className="vie-container">

          <div className="vie-section-heading">
            <p className="vie-eyebrow">NOS RENDEZ-VOUS</p>

            <h2>
              Des temps pour
              <br />
              nous retrouver.
            </h2>
          </div>

          <div className="rendez-vous-grid">

            <article className="rendez-vous-card">
              <div className="rendez-vous-top">
                <span className="rendez-vous-day">
                  DIMANCHE
                </span>

                <span className="rendez-vous-time">
                  09:00 — 12:00
                </span>
              </div>

              <div className="rendez-vous-content">
                <h3>
                  Service d'action de grâce
                  et de gloire
                </h3>

                <p>
                  Un temps de célébration, de louange,
                  de communion et de reconnaissance envers Dieu.
                </p>
              </div>

              <a
                href="/contact"
                className="vie-text-link"
              >
                Nous rejoindre
                <span aria-hidden="true">→</span>
              </a>
            </article>


            <article className="rendez-vous-card">
              <div className="rendez-vous-top">
                <span className="rendez-vous-day">
                  VENDREDI
                </span>

                <span className="rendez-vous-time">
                  19:00 — 21:00
                </span>
              </div>

              <div className="rendez-vous-content">
                <h3>
                  Culte prophétique
                </h3>

                <p>
                  Un temps consacré à la prière,
                  à l'écoute de Dieu et à la vie spirituelle.
                </p>
              </div>

              <a
                href="/contact"
                className="vie-text-link"
              >
                Nous rejoindre
                <span aria-hidden="true">→</span>
              </a>
            </article>

          </div>
        </div>
      </section>


      {/* =========================
          À VENIR
      ========================= */}

      <section className="vie-section actualites-section">
        <div className="vie-container">

          <div className="vie-section-heading">
            <p className="vie-eyebrow">À VENIR</p>

            <h2>
              Ce qui se prépare.
            </h2>
          </div>

          <div className="actualite-placeholder">

            <div className="actualite-label">
              PROCHAINEMENT
            </div>

            <h3>
              Les événements et annonces
              de l'Église seront bientôt publiés ici.
            </h3>

            <p>
              Cette section sera mise à jour régulièrement
              par l'équipe de l'Église.
            </p>

          </div>

        </div>
      </section>


      {/* =========================
          EN IMAGES
      ========================= */}

      <section className="vie-section images-section">
        <div className="vie-container">

          <div className="vie-section-heading">
            <p className="vie-eyebrow">EN IMAGES</p>

            <h2>
              Une Église qui se vit.
            </h2>
          </div>

          <div className="images-placeholder">

            <div className="image-placeholder-main">
              <span>
                PHOTO DE L'ÉGLISE
              </span>
            </div>

            <div className="image-placeholder-small">
              <span>
                PHOTO
              </span>
            </div>

            <div className="image-placeholder-small">
              <span>
                PHOTO
              </span>
            </div>

          </div>

          <div className="gallery-link-wrapper">
            <a
              href="/galerie"
              className="vie-text-link"
            >
              Voir la galerie
              <span aria-hidden="true">→</span>
            </a>
          </div>

        </div>
      </section>


      {/* =========================
          INVITATION
      ========================= */}

      <section className="vie-invitation">
        <div className="vie-container vie-container-narrow">

          <p className="vie-eyebrow">
            VOUS ÊTES LES BIENVENUS
          </p>

          <h2>
            Vous pouvez
            <br />
            simplement venir.
          </h2>

          <p>
            Découvrir l'Église, rencontrer la communauté
            et écouter la Parole.
          </p>

          <a
            href="/contact"
            className="vie-primary-link"
          >
            Nous rejoindre
            <span aria-hidden="true">→</span>
          </a>

        </div>
      </section>

    </main>
  );
}

export default VieDeLEglise;