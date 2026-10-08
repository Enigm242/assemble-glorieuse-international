import { useEffect, useState } from "react";
import "./Parole.css";

const predications = [
  {
    id: 1,
    title: "Titre de la prédication",
    preacher: "Nom du prédicateur",
    date: "Date",
    summary:
      "Résumé court de la prédication sur deux ou trois lignes.",
  },
  {
    id: 2,
    title: "Titre de la prédication",
    preacher: "Nom du prédicateur",
    date: "Date",
    summary:
      "Résumé court de la prédication sur deux ou trois lignes.",
  },
  {
    id: 3,
    title: "Titre de la prédication",
    preacher: "Nom du prédicateur",
    date: "Date",
    summary:
      "Résumé court de la prédication sur deux ou trois lignes.",
  },
  {
    id: 4,
    title: "Titre de la prédication",
    preacher: "Nom du prédicateur",
    date: "Date",
    summary:
      "Résumé court de la prédication sur deux ou trois lignes.",
  },
];


/* =========================
   PLAN BIBLIQUE AUTOMATIQUE
========================= */

const bibleBooks = [
  ["Genèse", 50],
  ["Exode", 40],
  ["Lévitique", 27],
  ["Nombres", 36],
  ["Deutéronome", 34],
  ["Josué", 24],
  ["Juges", 21],
  ["Ruth", 4],
  ["1 Samuel", 31],
  ["2 Samuel", 24],
  ["1 Rois", 22],
  ["2 Rois", 25],
  ["1 Chroniques", 29],
  ["2 Chroniques", 36],
  ["Esdras", 10],
  ["Néhémie", 13],
  ["Esther", 10],
  ["Job", 42],
  ["Psaumes", 150],
  ["Proverbes", 31],
  ["Ecclésiaste", 12],
  ["Cantique des cantiques", 8],
  ["Ésaïe", 66],
  ["Jérémie", 52],
  ["Lamentations", 5],
  ["Ézéchiel", 48],
  ["Daniel", 12],
  ["Osée", 14],
  ["Joël", 3],
  ["Amos", 9],
  ["Abdias", 1],
  ["Jonas", 4],
  ["Michée", 7],
  ["Nahum", 3],
  ["Habacuc", 3],
  ["Sophonie", 3],
  ["Aggée", 2],
  ["Zacharie", 14],
  ["Malachie", 4],
  ["Matthieu", 28],
  ["Marc", 16],
  ["Luc", 24],
  ["Jean", 21],
  ["Actes", 28],
  ["Romains", 16],
  ["1 Corinthiens", 16],
  ["2 Corinthiens", 13],
  ["Galates", 6],
  ["Éphésiens", 6],
  ["Philippiens", 4],
  ["Colossiens", 4],
  ["1 Thessaloniciens", 5],
  ["2 Thessaloniciens", 3],
  ["1 Timothée", 6],
  ["2 Timothée", 4],
  ["Tite", 3],
  ["Philémon", 1],
  ["Hébreux", 13],
  ["Jacques", 5],
  ["1 Pierre", 5],
  ["2 Pierre", 3],
  ["1 Jean", 5],
  ["2 Jean", 1],
  ["3 Jean", 1],
  ["Jude", 1],
  ["Apocalypse", 22],
];

const TOTAL_BIBLE_CHAPTERS = bibleBooks.reduce(
  function (total, book) {
    return total + book[1];
  },
  0
);

function getDayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);

  const difference =
    date.getTime() - start.getTime();

  return Math.floor(
    difference / (1000 * 60 * 60 * 24)
  );
}

function getChapterFromGlobalIndex(index) {
  let remaining = index;

  for (let i = 0; i < bibleBooks.length; i += 1) {
    const book = bibleBooks[i];

    if (remaining < book[1]) {
      return {
        book: book[0],
        chapter: remaining + 1,
      };
    }

    remaining -= book[1];
  }

  const lastBook = bibleBooks[bibleBooks.length - 1];

  return {
    book: lastBook[0],
    chapter: lastBook[1],
  };
}

function getDailyReading(dayOfYear) {
  const day = Math.min(
    Math.max(dayOfYear, 1),
    366
  );

  const startIndex = Math.floor(
    ((day - 1) * TOTAL_BIBLE_CHAPTERS) / 365
  );

  const endIndex = Math.floor(
    (day * TOTAL_BIBLE_CHAPTERS) / 365
  );

  const start = getChapterFromGlobalIndex(
    startIndex
  );

  const end = getChapterFromGlobalIndex(
    Math.max(startIndex, endIndex - 1)
  );

  if (
    start.book === end.book &&
    start.chapter === end.chapter
  ) {
    return `${start.book} ${start.chapter}`;
  }

  if (start.book === end.book) {
    return `${start.book} ${start.chapter}–${end.chapter}`;
  }

  return `${start.book} ${start.chapter} → ${end.book} ${end.chapter}`;
}

function getMonthReading(date) {
  const year = date.getFullYear();
  const month = date.getMonth();

  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  const firstDay = getDayOfYear(
    new Date(year, month, 1)
  );

  const lastDay = getDayOfYear(
    new Date(year, month, daysInMonth)
  );

  const firstReading = getDailyReading(firstDay);

  const lastReading = getDailyReading(lastDay);

  return {
    firstReading,
    lastReading,
    days: daysInMonth,
  };
}


/* =========================
   COMPOSANT
========================= */

function Parole() {
  const [dailyVerse, setDailyVerse] = useState(null);
  const [verseLoading, setVerseLoading] = useState(true);
  const [verseError, setVerseError] = useState(false);

  const today = new Date();

  const dayOfYear = getDayOfYear(today);

  const dailyReading =
    getDailyReading(dayOfYear);

  const monthlyReading =
    getMonthReading(today);


  /* =========================
     VERSET DU JOUR
  ========================= */

  useEffect(function () {
    let cancelled = false;

    async function loadDailyVerse() {
      try {
        setVerseLoading(true);
        setVerseError(false);

        const response = await fetch(
          "https://api.midvash.com/v1/votd?language=fr&version=lsg"
        );

        if (!response.ok) {
          throw new Error(
            "Impossible de récupérer le verset."
          );
        }

        const data = await response.json();

        if (!cancelled) {
          setDailyVerse(data);
        }
      } catch (error) {
        if (!cancelled) {
          console.error(
            "Erreur verset du jour :",
            error
          );

          setVerseError(true);
        }
      } finally {
        if (!cancelled) {
          setVerseLoading(false);
        }
      }
    }

    loadDailyVerse();

    return function () {
      cancelled = true;
    };
  }, []);


  const formattedDate =
    today.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).toUpperCase();


  const monthLabel =
    today.toLocaleDateString("fr-FR", {
      month: "long",
      year: "numeric",
    });


  return (
    <main className="parole-page">

      {/* INTRODUCTION */}

      <section className="parole-intro">
        <div className="parole-container">

          <p className="parole-eyebrow">
            LA PAROLE
          </p>

          <h1>
            Ce que Dieu dit.
            <br />
            Ce que nous apprenons.
            <br />
            Ce que nous vivons.
          </h1>

        </div>
      </section>


      {/* THÈME DE L'ANNÉE */}

      <section className="parole-section theme-section">
        <div className="parole-container">

          <div className="section-heading centered">

            <p className="parole-eyebrow">
              THÈME DE L'ANNÉE
            </p>

            <span className="theme-year">
              2026
            </span>

          </div>

          <div className="annual-theme">
            <span>
              Thème de l'année à renseigner
            </span>
          </div>

        </div>
      </section>


      {/* THÈME DU MOIS */}

      <section className="parole-section theme-section">
        <div className="parole-container">

          <div className="section-heading centered">

            <p className="parole-eyebrow">
              THÈME DU MOIS
            </p>

            <span className="theme-year">
              OCTOBRE 2026
            </span>

          </div>

          <div className="annual-theme">
            <span>
              Thème du mois à renseigner
            </span>
          </div>

        </div>
      </section>


      {/* PAROLE DU JOUR */}

      <section className="parole-section daily-verse-section">
        <div className="parole-container narrow">

          <div className="section-heading centered">

            <p className="parole-eyebrow">
              PAROLE DU JOUR
            </p>

            <span className="verse-date">
              {formattedDate}
            </span>

          </div>


          <div className="daily-verse">

            {verseLoading && (
              <p className="verse-text">
                Chargement de la Parole…
              </p>
            )}

            {!verseLoading &&
              !verseError &&
              dailyVerse && (
                <>
                  <p className="verse-text">
                    « {dailyVerse.text} »
                  </p>

                  <p className="verse-reference">
                    {dailyVerse.reference}
                  </p>

                  {dailyVerse.copyright && (
                    <p className="verse-copyright">
                      {dailyVerse.copyright}
                    </p>
                  )}
                </>
              )}

            {!verseLoading && verseError && (
              <p className="verse-text">
                La Parole du jour est momentanément
                indisponible.
              </p>
            )}

          </div>

          <a
            href="/parole"
            className="text-link"
          >
            Lire
            <span aria-hidden="true">
              →
            </span>
          </a>

        </div>
      </section>


      {/* PRÉDICATIONS */}

      <section className="parole-section sermons-section">
        <div className="parole-container">

          <div className="section-heading">

            <p className="parole-eyebrow">
              PRÉDICATIONS
            </p>

            <h2>
              Octobre 2026
            </h2>

          </div>


          <div className="sermons-layout">

            {/* RESPONSABLES */}

            <aside className="pastors-column">

              <div className="pastor">

                <div className="pastor-photo">
                  Photo
                </div>

                <div className="pastor-info">

                  <strong>
                    Pasteur principal
                  </strong>

                  <span>
                    Nom à renseigner
                  </span>

                </div>

              </div>


              <div className="pastor">

                <div className="pastor-photo">
                  Photo
                </div>

                <div className="pastor-info">

                  <strong>
                    Pasteur adjoint
                  </strong>

                  <span>
                    Nom à renseigner
                  </span>

                </div>

              </div>

            </aside>


            {/* PRÉDICATIONS HORIZONTALES */}

            <div className="sermons-area">

              <div className="sermons-scroller">

                {predications.map(
                  function (predication) {
                    return (
                      <article
                        className="sermon-card"
                        key={predication.id}
                      >

                        <div className="sermon-thumbnail">
                          <span>
                            YOUTUBE
                          </span>
                        </div>

                        <div className="sermon-content">

                          <h3>
                            {predication.title}
                          </h3>

                          <p className="sermon-meta">
                            {predication.preacher}
                            {" · "}
                            {predication.date}
                          </p>

                          <p className="sermon-summary">
                            {predication.summary}
                          </p>

                          <span className="sermon-link">
                            Voir la prédication
                            <span aria-hidden="true">
                              →
                            </span>
                          </span>

                        </div>

                      </article>
                    );
                  }
                )}

              </div>


              <div className="scroll-indicator">

                <span>←</span>
                <span>glisser</span>
                <span>→</span>

              </div>

            </div>

          </div>


          <div className="youtube-link-wrapper">

            <a
              href="https://www.youtube.com/@prophetemichaelkablan"
              className="text-link"
              target="_blank"
              rel="noreferrer"
            >
              Toutes les prédications sur YouTube
              <span aria-hidden="true">
                →
              </span>
            </a>

          </div>

        </div>
      </section>


      {/* LECTURE BIBLIQUE */}

      <section className="parole-section reading-section">
        <div className="parole-container">

          <div className="section-heading centered">

            <p className="parole-eyebrow">
              LECTURE BIBLIQUE
            </p>

            <h2>
              Lire. Méditer.
              <br />
              Comprendre.
            </h2>

          </div>


          <div className="reading-grid">

            <article className="reading-card">

              <span className="reading-label">
                AUJOURD'HUI
              </span>

              <h3>
                Lecture du jour
              </h3>

              <p>
                {dailyReading}
              </p>

              <a
                href="/parole"
                className="text-link"
              >
                Lire
                <span aria-hidden="true">
                  →
                </span>
              </a>

            </article>


            <article className="reading-card">

              <span className="reading-label">
                CE MOIS
              </span>

              <h3>
                Parcours mensuel
              </h3>

              <p>
                {monthLabel}
                <br />
                {monthlyReading.firstReading}
                {" → "}
                {monthlyReading.lastReading}
              </p>

              <a
                href="/parole"
                className="text-link"
              >
                Voir
                <span aria-hidden="true">
                  →
                </span>
              </a>

            </article>


            <article className="reading-card">

              <span className="reading-label">
                CETTE ANNÉE
              </span>

              <h3>
                Plan de lecture
              </h3>

              <p>
                Parcours automatique de la Bible
                en 365 jours.
                <br />
                {TOTAL_BIBLE_CHAPTERS} chapitres.
              </p>

              <a
                href="/parole"
                className="text-link"
              >
                Commencer
                <span aria-hidden="true">
                  →
                </span>
              </a>

            </article>

          </div>

        </div>
      </section>


      {/* CONCLUSION */}

      <section className="parole-closing">

        <div className="parole-container centered">

          <p className="parole-eyebrow">
            LA PAROLE SE VIT.
          </p>

          <p className="closing-text">
            Lire · Écouter · Méditer
            <br />
            Mettre en pratique.
          </p>

        </div>

      </section>

    </main>
  );
}

export default Parole;