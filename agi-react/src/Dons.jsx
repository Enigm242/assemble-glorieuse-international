import { useState } from "react";
import "./Dons.css";

function Dons() {
  const [donType, setDonType] = useState("");
  const [amount, setAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [step, setStep] = useState("donation");

  const presetAmounts = [5000, 10000, 25000, 50000];

  function formatAmount(value) {
    return new Intl.NumberFormat("fr-FR").format(value);
  }

  function getSelectedAmount() {
    if (amount === "custom") {
      return Number(customAmount);
    }

    return Number(amount);
  }

  function canContinueToPayment() {
    const selectedAmount = getSelectedAmount();

    return (
      donType !== "" &&
      Number.isFinite(selectedAmount) &&
      selectedAmount > 0
    );
  }

  function continueToPayment() {
    if (!canContinueToPayment()) {
      return;
    }

    setStep("payment");
  }

  function selectPresetAmount(value) {
    setAmount(String(value));
    setCustomAmount("");
  }

  function selectCustomAmount() {
    setAmount("custom");
  }

  function selectPaymentMethod(method) {
    setPaymentMethod(method);
  }

  function simulatePayment() {
    if (!paymentMethod) {
      return;
    }

    setStep("success");
  }

  function restartDonation() {
    setDonType("");
    setAmount("");
    setCustomAmount("");
    setPaymentMethod("");
    setStep("donation");
  }

  const selectedAmount = getSelectedAmount();

  return (
    <main className="donations-page">

      {/* =====================================================
          HERO
          ===================================================== */}

      <section className="donations-hero">

        <div className="container donations-hero-content">

          <p className="eyebrow">
            Donner
          </p>

          <h1>
            Un geste de foi.
          </h1>

          <p className="donations-hero-text">
            Votre générosité contribue à la vie de l'église,
            à sa mission et à ce qui est construit ensemble.
          </p>

        </div>

      </section>


      {/* =====================================================
          POURQUOI DONNER
          ===================================================== */}

      <section className="section donations-intro">

        <div className="container donations-intro-grid">

          <div>

            <p className="eyebrow">
              Pourquoi donner ?
            </p>

            <h2>
              Donner, c'est aussi participer.
            </h2>

          </div>

          <div>

            <p className="section-text">
              Chaque contribution participe à la vie de l'église,
              à l'accueil, aux activités et à la mission portée
              par l'Assemblée Glorieuse Internationale.
            </p>

            <p className="donations-note">
              Donnez librement, selon votre foi et selon vos possibilités.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          UNE PAROLE
          ===================================================== */}

      <section className="donations-word">

        <div className="container">

          <p className="eyebrow">
            Une parole
          </p>

          <blockquote>
            « Que chacun donne comme il l'a résolu en son cœur,
            sans tristesse ni contrainte. »
          </blockquote>

          <p className="donations-reference">
            2 Corinthiens 9:7
          </p>

        </div>

      </section>


      {/* =====================================================
          ÉTAPE 1 — CHOIX DU DON
          ===================================================== */}

      {step === "donation" && (

        <section className="section donation-form-section">

          <div className="container donation-form-container">

            <div className="donation-heading">

              <p className="eyebrow">
                Votre contribution
              </p>

              <h2>
                Comment souhaitez-vous donner ?
              </h2>

            </div>


            {/* TYPE DE CONTRIBUTION */}

            <div className="donation-field">

              <p className="donation-label">
                Type de contribution
              </p>

              <div className="donation-type-grid">

                <button
                  type="button"
                  className={
                    donType === "Dîme"
                      ? "donation-option is-selected"
                      : "donation-option"
                  }
                  onClick={() => setDonType("Dîme")}
                >
                  <span>
                    Dîme
                  </span>

                  <small>
                    Ma dîme
                  </small>
                </button>


                <button
                  type="button"
                  className={
                    donType === "Offrande"
                      ? "donation-option is-selected"
                      : "donation-option"
                  }
                  onClick={() => setDonType("Offrande")}
                >
                  <span>
                    Offrande
                  </span>

                  <small>
                    Une offrande
                  </small>
                </button>


                <button
                  type="button"
                  className={
                    donType === "Don libre"
                      ? "donation-option is-selected"
                      : "donation-option"
                  }
                  onClick={() => setDonType("Don libre")}
                >
                  <span>
                    Don libre
                  </span>

                  <small>
                    Un don de votre choix
                  </small>
                </button>

              </div>

            </div>


            {/* MONTANT */}

            <div className="donation-field">

              <p className="donation-label">
                Montant
              </p>

              <div className="amount-grid">

                {presetAmounts.map(function (value) {
                  return (
                    <button
                      key={value}
                      type="button"
                      className={
                        amount === String(value)
                          ? "amount-option is-selected"
                          : "amount-option"
                      }
                      onClick={() => selectPresetAmount(value)}
                    >
                      {formatAmount(value)} FCFA
                    </button>
                  );
                })}


                <button
                  type="button"
                  className={
                    amount === "custom"
                      ? "amount-option is-selected"
                      : "amount-option"
                  }
                  onClick={selectCustomAmount}
                >
                  Autre montant
                </button>

              </div>


              {/* MONTANT PERSONNALISÉ */}

              {amount === "custom" && (

                <div className="custom-amount">

                  <label htmlFor="customAmount">
                    Votre montant
                  </label>

                  <div className="amount-input">

                    <input
                      id="customAmount"
                      type="number"
                      min="1"
                      inputMode="numeric"
                      placeholder="Ex. 75 000"
                      value={customAmount}
                      onChange={function (event) {
                        setCustomAmount(event.target.value);
                      }}
                    />

                    <span>
                      FCFA
                    </span>

                  </div>

                </div>

              )}

            </div>


            {/* RÉSUMÉ */}

            <div className="donation-summary">

              <div>

                <span>
                  Contribution
                </span>

                <strong>
                  {donType || "—"}
                </strong>

              </div>


              <div>

                <span>
                  Montant
                </span>

                <strong>
                  {selectedAmount > 0
                    ? `${formatAmount(selectedAmount)} FCFA`
                    : "—"}
                </strong>

              </div>

            </div>


            {/* CONTINUER */}

            <button
              type="button"
              className={
                canContinueToPayment()
                  ? "button donation-continue"
                  : "button donation-continue is-disabled"
              }
              onClick={continueToPayment}
              disabled={!canContinueToPayment()}
            >
              Continuer vers le paiement

              <span aria-hidden="true">
                →
              </span>

            </button>

          </div>

        </section>

      )}


      {/* =====================================================
          ÉTAPE 2 — PAIEMENT
          ===================================================== */}

      {step === "payment" && (

        <section className="section payment-section">

          <div className="container payment-container">

            <div className="payment-heading">

              <p className="eyebrow">
                Paiement sécurisé
              </p>

              <h2>
                Choisissez votre moyen de paiement.
              </h2>

              <p className="section-text">
                Le paiement sera effectué via le service
                correspondant lorsque l'intégration officielle
                de l'église sera activée.
              </p>

            </div>


            {/* RÉSUMÉ DU DON */}

            <div className="payment-summary">

              <span>
                {donType}
              </span>

              <strong>
                {formatAmount(selectedAmount)} FCFA
              </strong>

            </div>


            {/* MOYENS DE PAIEMENT */}

            <div className="payment-methods">

              <button
                type="button"
                className={
                  paymentMethod === "Wave"
                    ? "payment-option is-selected"
                    : "payment-option"
                }
                onClick={() => selectPaymentMethod("Wave")}
              >

                <span className="payment-name">
                  Wave
                </span>

                <span className="payment-description">
                  Payer avec Wave
                </span>

              </button>


              <button
                type="button"
                className={
                  paymentMethod === "Orange Money"
                    ? "payment-option is-selected"
                    : "payment-option"
                }
                onClick={() => selectPaymentMethod("Orange Money")}
              >

                <span className="payment-name">
                  Orange Money
                </span>

                <span className="payment-description">
                  Payer avec Orange Money
                </span>

              </button>

            </div>


            {/* PAIEMENT — PROTOTYPE */}

            <button
              type="button"
              className={
                paymentMethod
                  ? "button donation-continue"
                  : "button donation-continue is-disabled"
              }
              onClick={simulatePayment}
              disabled={!paymentMethod}
            >
              Continuer avec {paymentMethod || "le moyen choisi"}

              <span aria-hidden="true">
                →
              </span>

            </button>


            <button
              type="button"
              className="back-button"
              onClick={() => setStep("donation")}
            >
              ← Modifier ma contribution
            </button>


            <p className="payment-development-note">
              Prototype d'interface : Wave et Orange Money seront
              connectés via leurs services officiels lorsque les
              accès de paiement de l'église seront disponibles.
            </p>

          </div>

        </section>

      )}


      {/* =====================================================
          ÉTAPE 3 — CONFIRMATION
          ===================================================== */}

      {step === "success" && (

        <section className="section payment-success-section">

          <div className="container">

            <div className="payment-success">

              <div className="success-icon">
                ✓
              </div>

              <p className="eyebrow">
                Démonstration
              </p>

              <h2>
                Confirmation du don.
              </h2>

              <p className="section-text">
                Cette confirmation représente l'écran qui sera
                affiché après validation réelle du paiement.
              </p>


              <div className="success-details">

                <div>

                  <span>
                    Contribution
                  </span>

                  <strong>
                    {donType}
                  </strong>

                </div>


                <div>

                  <span>
                    Montant
                  </span>

                  <strong>
                    {formatAmount(selectedAmount)} FCFA
                  </strong>

                </div>


                <div>

                  <span>
                    Moyen de paiement
                  </span>

                  <strong>
                    {paymentMethod}
                  </strong>

                </div>


                <div>

                  <span>
                    Date
                  </span>

                  <strong>
                    {new Intl.DateTimeFormat("fr-FR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    }).format(new Date())}
                  </strong>

                </div>


                <div className="success-reference">

                  <span>
                    Référence
                  </span>

                  <strong>
                    AGI-XXXXXXXX
                  </strong>

                </div>

              </div>


              <div className="success-actions">

                <button
                  type="button"
                  className="button donation-continue"
                  onClick={restartDonation}
                >
                  Faire un autre don
                </button>


                <a
                  href="/"
                  className="back-button"
                >
                  Retour à l'accueil
                </a>

              </div>

            </div>

          </div>

        </section>

      )}


      {/* =====================================================
          HISTORIQUE PERSONNEL
          ===================================================== */}

      <section className="section donation-history-section">

        <div className="container">

          <div className="private-history">

            <div className="private-history-intro">

              <p className="eyebrow">
                Votre historique
              </p>

              <h2>
                Vos contributions, au même endroit.
              </h2>

              <p className="section-text">
                Connectez-vous à votre espace personnel pour
                consulter uniquement vos propres contributions.
              </p>

            </div>


            <div className="history-login">

              <span
                className="history-lock"
                aria-hidden="true"
              >
                🔒
              </span>


              <div>

                <strong>
                  Espace personnel
                </strong>

                <p>
                  Votre historique est privé et accessible
                  uniquement après connexion.
                </p>

              </div>


              <button
                type="button"
                className="history-button"
              >
                Se connecter

                <span aria-hidden="true">
                  →
                </span>

              </button>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          GESTION DES DONS
          ===================================================== */}

      <section className="section finance-section">

        <div className="container finance-grid">

          <div className="finance-photo">

            <span>
              Photo du responsable des finances
            </span>

          </div>


          <div className="finance-content">

            <p className="eyebrow">
              Gestion des dons
            </p>

            <h2>
              Une gestion responsable et transparente.
            </h2>

            <p className="section-text">
              Les contributions sont enregistrées et suivies
              dans un espace sécurisé réservé aux personnes
              autorisées de l'église.
            </p>

            <p className="finance-note">
              L'identité et la photo du responsable des finances
              seront ajoutées dès que les informations officielles
              auront été transmises par l'église.
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Dons;