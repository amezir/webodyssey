// popup component for thank you for your order

import React from "react";
import Image from "next/image";
import styles from "./Popup.module.scss";
import { useEffect } from "react";
import gsap from "gsap";
import logo from "../../assets/logo.svg";

export const Popup = ({ closePopup }) => {
  useEffect(() => {
    // Animation de fondu (fadein) sur l'élément #popup
    gsap.fromTo(
      "#popup",
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "power2.inOut" }
    );

    // Animation de déplacement vers le haut de l'élément #popup__content
    gsap.fromTo(
      "#popup__content",
      { y: 50 },
      { y: 0, duration: 0.5, ease: "power2.inOut" }
    );
  }, []);

  const handleClosePopup = () => {
    // Animation de sortie de la popup
    gsap.to("#popup", { autoAlpha: 0, duration: 0.5, ease: "power2.inOut" });
    gsap.to("#popup__content", {
      y: 50,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: closePopup,
    });
  };
  return (
    <>
      <div className={styles.popup} id="popup">
        <div className={styles.popup__content} id="popup__content">
          <h2>Merci !</h2>
          <p>
            Votre réservation a bien été enregistrée et une confirmation vous a
            été envoyée par mail (pensez à regarder dans vos spams). Vous
            recevrez votre billet d'entrée par mail une fois votre inscription
            confirmée par l'équipe.
            <br />
            <br />
            <b>
              Pour toute question, n&apos;hésitez pas à nous contacter à
              l'adresse{" "}
              <a href="mailto:contact@webodyssey-mmi.fr">
                contact@webodyssey-mmi.fr
              </a>
              .
            </b>
            <br />
            <br />
          </p>

          <button onClick={handleClosePopup} className={styles.close}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
            </svg>
          </button>

          <h5>À bientôt,</h5>
          <Image src={logo} alt="logo" width={100} height={50} />
        </div>
      </div>
    </>
  );
};

export default Popup;
