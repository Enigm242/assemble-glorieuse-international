import "./TemoignagesHistoires.css";

function TemoignagesHistoires() {
  return (
    <main className="stories-page">

      {/* INTRODUCTION */}
      <section className="stories-intro">
        <div className="stories-intro-inner">
          <p className="eyebrow">Histoires</p>

          <h1>Des histoires vécues.</h1>

          <p className="stories-intro-text">
            Des témoignages de foi, de prière et de transformation.
          </p>
        </div>
      </section>


      {/* ESPACE PRINCIPAL */}
      <section className="stories-section">
        <div className="stories-layout">

          {/* RESPONSABLE */}
          <aside className="stories-responsible">

            <div className="responsible-photo">
              <span>PHOTO</span>
            </div>

            <div className="responsible-info">
              <p className="responsible-label">
                Cet espace est porté par
              </p>

              <h2>Prénom Nom</h2>

              <p className="responsible-role">
                Responsable multimédia
              </p>

              <p className="responsible-note">
                Petit mot facultatif
              </p>
            </div>

          </aside>


          {/* TÉMOIGNAGES */}
          <div className="stories-content">

            <div className="stories-content-header">
              <p>Témoignages</p>

              <span>Histoires de l’église</span>
            </div>

            <div className="stories-empty">

              <p className="stories-empty-label">
                Témoignages
              </p>

              <h2>
                Les histoires seront racontées ici.
              </h2>

              <p>
                Cet espace accueillera les témoignages partagés
                par les membres de l’église.
              </p>

            </div>

          </div>


          {/* À VOTRE TOUR */}
          <aside className="stories-your-turn">

            <p className="your-turn-label">
              À votre tour
            </p>

            <h2>
              Une histoire vécue peut devenir une source
              d'espérance pour quelqu'un d'autre.
            </h2>

            <a
              href="/contact.html"
              className="your-turn-link"
            >
              Partager votre témoignage
              <span aria-hidden="true">→</span>
            </a>

          </aside>

        </div>
      </section>


      {/* CONCLUSION */}
      <section className="stories-encouragement">

        <div className="stories-encouragement-inner">

          <p className="stories-encouragement-label">
            Une pensée
          </p>

          <h2>
            Et si Dieu n’avait pas fini avec votre histoire ?
          </h2>

          <div className="stories-actions">

            <a
              href="/contact.html"
              className="stories-action stories-action-primary"
            >
              Demander une prière
            </a>

            <a
              href="/#cultes"
              className="stories-action stories-action-secondary"
            >
              Nous rejoindre
            </a>

          </div>

        </div>

      </section>

    </main>
  );
}

export default TemoignagesHistoires;