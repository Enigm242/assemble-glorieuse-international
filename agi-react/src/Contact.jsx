import { useState } from "react";
import "./Contact.css";

function Contact() {
  const [reception, setReception] = useState(null);

  return (
    <main className="contact-page">
      <section className="contact-hero">
        <div className="contact-hero-inner">
          <span className="contact-eyebrow">CONTACT</span>

          <h1>
            Vous pouvez
            <br />
            nous écrire.
          </h1>

          <p>
            Une question, une démarche ou simplement besoin
            d'échanger avec l'Église ? Nous restons disponibles.
          </p>
        </div>
      </section>

      <section className="contact-section contact-secretariat">
        <div className="contact-section-heading">
          <span>01</span>

          <div>
            <p className="contact-kicker">SECRÉTARIAT</p>
            <h2>Parler avec le secrétariat.</h2>
          </div>
        </div>

        <div className="secretariat-content">
          <div className="secretariat-text">
            <p>
              Pour une information, une question concernant l'Église
              ou pour être orienté, vous pouvez contacter directement
              le secrétariat.
            </p>
          </div>
        </div>
      </section>

      <section className="contact-section reception-section">
        <div className="contact-section-heading">
          <span>02</span>

          <div>
            <p className="contact-kicker">RÉCEPTIONS</p>
            <h2>Rencontrer l'homme de Dieu.</h2>
          </div>
        </div>

        <div className="reception-grid">
          <article className="reception-card">
            <span>MARDI</span>

            <h3>Réception avec le Prophète</h3>

            <p className="reception-time">
              09h00 → jusqu'au soir
            </p>

            <button
              type="button"
              className="reception-button"
              onClick={() =>
                setReception("Mardi — Réception avec le Prophète")
              }
            >
              S'inscrire à la réception
              <span>→</span>
            </button>
          </article>

          <article className="reception-card">
            <span>SAMEDI</span>

            <h3>Réception avec le Pasteur adjoint</h3>

            <p className="reception-time">
              09h00 → 18h00
            </p>

            <button
              type="button"
              className="reception-button"
              onClick={() =>
                setReception("Samedi — Réception avec le Pasteur adjoint")
              }
            >
              S'inscrire à la réception
              <span>→</span>
            </button>
          </article>
        </div>
      </section>

      {reception && (
        <div className="reception-modal">
          <div
            className="reception-modal-backdrop"
            onClick={() => setReception(null)}
          />

          <div className="reception-modal-content">
            <button
              type="button"
              className="reception-modal-close"
              onClick={() => setReception(null)}
              aria-label="Fermer"
            >
              ×
            </button>

            <p className="contact-kicker">INSCRIPTION</p>

            <h2>{reception}</h2>

            <p>
              Remplissez vos informations. Votre demande sera
              transmise au secrétariat pour confirmation.
            </p>

            <form
              className="reception-form"
              onSubmit={(event) => {
                event.preventDefault();
                setReception(null);
              }}
            >
              <label>
                Nom et prénom
                <input
                  type="text"
                  placeholder="Votre nom et prénom"
                  required
                />
              </label>

              <label>
                Téléphone / WhatsApp
                <input
                  type="tel"
                  placeholder="+221 ..."
                  required
                />
              </label>

              <label>
                Motif de la réception
                <textarea
                  rows="4"
                  placeholder="En quelques mots..."
                  required
                />
              </label>

              <button type="submit" className="reception-submit">
                Valider ma demande
                <span>→</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default Contact;