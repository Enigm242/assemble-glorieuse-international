import "./Galerie.css";

const galleryItems = [
  {
    id: 1,
    category: "cultes",
    label: "Cultes",
    image: "",
  },
  {
    id: 2,
    category: "cultes",
    label: "Cultes",
    image: "",
  },
  {
    id: 3,
    category: "evenements",
    label: "Événements",
    image: "",
  },
  {
    id: 4,
    category: "vie",
    label: "Vie de l'Église",
    image: "",
  },
  {
    id: 5,
    category: "cultes",
    label: "Cultes",
    image: "",
  },
  {
    id: 6,
    category: "vie",
    label: "Vie de l'Église",
    image: "",
  },
];

function Galerie() {
  return (
    <main className="gallery-page">
      {/* HERO */}
      <section className="gallery-hero">
        <div className="container gallery-hero-content">
          <p className="eyebrow">Galerie</p>

          <h1>
            Des moments vécus
            <br />
            ensemble.
          </h1>

          <p className="gallery-hero-text">
            La vie de l'Église en images.
          </p>
        </div>
      </section>

      {/* GALERIE */}
      <section className="gallery-section">
        <div className="container">
          <div className="gallery-filters">
            <button
              type="button"
              className="gallery-filter active"
            >
              Toutes
            </button>

            <button
              type="button"
              className="gallery-filter"
            >
              Cultes
            </button>

            <button
              type="button"
              className="gallery-filter"
            >
              Événements
            </button>

            <button
              type="button"
              className="gallery-filter"
            >
              Vie de l'Église
            </button>
          </div>

          <div className="gallery-grid">
            {galleryItems.map(function (item) {
              return (
                <article
                  className="gallery-item"
                  key={item.id}
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.label}
                    />
                  ) : (
                    <div
                      className="gallery-placeholder"
                      aria-label="Photo à ajouter"
                    >
                      <span>Photo à venir</span>
                    </div>
                  )}

                  <div className="gallery-item-caption">
                    <span>{item.label}</span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className="gallery-closing">
        <div className="container gallery-closing-content">
          <p className="eyebrow">La vie de l'Église</p>

          <h2>
            Des moments de foi,
            <br />
            de prière et de communion.
          </h2>

          <p>
            Chaque image raconte un moment
            de notre vie ensemble.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Galerie;