import "./Eglise.css";

const departments = [
  {
    name: "Intercession",
    responsible: {
      name: "Responsable à renseigner",
      photo: "",
    },
    assistant: {
      name: "Adjoint à renseigner",
      photo: "",
    },
  },
  {
    name: "Évangélisation",
    responsible: {
      name: "Responsable à renseigner",
      photo: "",
    },
    assistant: {
      name: "Adjoint à renseigner",
      photo: "",
    },
  },
  {
    name: "Chorale",
    responsible: {
      name: "Responsable à renseigner",
      photo: "",
    },
    assistant: {
      name: "Adjoint à renseigner",
      photo: "",
    },
  },
];

function PersonPhoto({ person }) {
  if (person.photo) {
    return (
      <img
        src={person.photo}
        alt={person.name}
        className="leader-photo"
      />
    );
  }

  return (
    <div className="leader-photo-placeholder" aria-hidden="true">
      <span>Photo</span>
    </div>
  );
}

function Eglise() {
  return (
    <main className="church-page">

      {/* HERO */}
      <section className="church-hero">
        <div className="container church-hero-content">
          <p className="eyebrow">L'Église</p>

          <h1>
            Une communauté.
            <br />
            Une foi.
            <br />
            Une vie ensemble.
          </h1>

          <p className="church-hero-text">
            L'Assemblée Glorieuse Internationale est un lieu
            d'amour, de transformation, de délivrance et de
            puissance divine.
          </p>

          <a href="/vie-de-leglise" className="button">
            Découvrir la vie de l'Église
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      {/* QUI SOMMES-NOUS ? */}
      <section className="section church-introduction">
        <div className="container church-introduction-grid">
          <div>
            <p className="eyebrow">Qui sommes-nous ?</p>

            <h2>
              Une Église qui accueille,
              accompagne et avance ensemble.
            </h2>
          </div>

          <div className="church-introduction-content">
            <p className="section-text">
              L'Assemblée Glorieuse Internationale est une
              communauté où la foi, la prière et la vie
              d'Église se vivent ensemble.
            </p>

            <p className="section-text">
              Chacun peut y trouver un espace pour découvrir,
              approfondir et vivre sa foi.
            </p>
          </div>
        </div>
      </section>

      {/* CE QUE NOUS CROYONS */}
      <section className="church-beliefs">
        <div className="container church-beliefs-grid">
          <div className="church-beliefs-label">
            <p className="eyebrow">Ce que nous croyons</p>
          </div>

          <div className="church-beliefs-content">
            <h2>
              Jésus-Christ au centre.
            </h2>

            <p>
              La foi chrétienne, la prière et la Parole
              occupent une place centrale dans la vie de
              l'Assemblée Glorieuse Internationale.
            </p>

            <p>
              Cette section présentera progressivement les
              convictions et l'enseignement officiels de
              l'Église.
            </p>
          </div>
        </div>
      </section>

      {/* NOTRE VISION */}
      <section className="section church-vision">
        <div className="container church-vision-grid">
          <div className="church-vision-number">
            <span>01</span>
          </div>

          <div>
            <p className="eyebrow">Notre vision</p>

            <h2>
              Une Église qui se vit au-delà du culte.
            </h2>

            <p className="section-text">
              La vie de l'Église ne se limite pas à un
              rendez-vous. Elle se construit dans la prière,
              la communion, le service et ce que chacun apporte
              à la communauté.
            </p>
          </div>
        </div>
      </section>

      {/* UNE ÉGLISE QUI SE VIT */}
      <section className="church-life-preview">
        <div className="container church-life-preview-grid">
          <div>
            <p className="eyebrow">Une Église qui se vit</p>

            <h2>
              Ce qui se passe lorsque nous nous retrouvons.
            </h2>
          </div>

          <div className="church-schedule-preview">
            <article className="schedule-item">
              <span className="schedule-day">Dimanche</span>

              <strong>09:00 — 12:00</strong>

              <p>
                Service d'action de grâce et de gloire
              </p>
            </article>

            <article className="schedule-item">
              <span className="schedule-day">Vendredi</span>

              <strong>19:00 — 21:00</strong>

              <p>
                Culte prophétique
              </p>
            </article>

            <a
              href="/vie-de-leglise"
              className="text-link"
            >
              Voir la vie de l'Église
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* LES RESPONSABLES */}
      <section className="section church-leaders">
        <div className="container">

          <div className="church-leaders-heading">
            <div>
              <p className="eyebrow">Les responsables</p>

              <h2>
                Ceux qui servent
                et font vivre la communauté.
              </h2>
            </div>

            <p className="section-text">
              Découvrez progressivement les responsables
              des différents départements de l'Église.
            </p>
          </div>

          <div
            className="departments-scroll"
            aria-label="Départements de l'Église"
          >
            {departments.map(function (department) {
              return (
                <article
                  className="department-card"
                  key={department.name}
                >
                  <div className="department-card-header">
                    <span>Département</span>

                    <h3>{department.name}</h3>
                  </div>

                  <div className="department-members">

                    <div className="department-person">
                      <PersonPhoto
                        person={department.responsible}
                      />

                      <div>
                        <span className="person-role">
                          Responsable
                        </span>

                        <strong>
                          {department.responsible.name}
                        </strong>
                      </div>
                    </div>

                    <div className="department-person">
                      <PersonPhoto
                        person={department.assistant}
                      />

                      <div>
                        <span className="person-role">
                          Adjoint
                        </span>

                        <strong>
                          {department.assistant.name}
                        </strong>
                      </div>
                    </div>

                  </div>
                </article>
              );
            })}
          </div>

          <p className="scroll-hint">
            Faites défiler pour découvrir les départements
            <span aria-hidden="true">→</span>
          </p>

        </div>
      </section>

      {/* NOUS TROUVER */}
      <section className="section church-location">
        <div className="container">

          <div className="church-location-header">
            <p className="eyebrow">Nous trouver</p>

            <h2>
              Vous pouvez simplement venir.
            </h2>
          </div>

          <div className="church-location-grid">

            {/* ADRESSE */}
            <div className="location-column">
              <span className="location-label">
                ADRESSE
              </span>

              <strong className="location-address">
                Imprimerie Monteiro,
                <br />
                salle climatisée du palais,
                <br />
                Canal IV, Fass Delorme
              </strong>

              <div className="location-floor-note">
                <span>PREMIER ÉTAGE</span>

                <p>
                  L'Assemblée Glorieuse Internationale
                  se trouve au premier étage du bâtiment.
                </p>
              </div>
            </div>

            {/* RENDEZ-VOUS */}
            <div className="location-column">
              <span className="location-label">
                RENDEZ-VOUS
              </span>

              <div className="location-service">
                <strong>Dimanche</strong>

                <span>09:00 — 12:00</span>

                <p>
                  Service d'action de grâce et de gloire
                </p>
              </div>

              <div className="location-service">
                <strong>Vendredi</strong>

                <span>19:00 — 21:00</span>

                <p>
                  Culte prophétique
                </p>
              </div>
            </div>

          </div>

          {/* ACTIONS */}
          <div className="church-location-actions">

            <a
              href="/contact"
              className="button button-primary"
            >
              Nous contacter
              <span aria-hidden="true">→</span>
            </a>

            <a
              href="https://maps.app.goo.gl/GML8n63JSyuGeVjM8"
              className="location-map-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ouvrir dans Google Maps
              <span aria-hidden="true">↗</span>
            </a>

          </div>

        </div>
      </section>

      {/* INVITATION */}
      <section className="church-invitation">
        <div className="container church-invitation-content">
          <p className="eyebrow">Pour vous</p>

          <h2>
            Vous pouvez simplement venir.
          </h2>

          <p>
            Pas besoin de savoir exactement quoi dire,
            quoi faire ou à quoi s'attendre.
            Venez découvrir la communauté.
          </p>

          <a
            href="/vie-de-leglise"
            className="button button-light"
          >
            Nous rejoindre
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

    </main>
  );
}

export default Eglise;