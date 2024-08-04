// popup component for thank you for your order

import React from "react";
import Image from "next/image";
import styles from "./Navbar.module.scss";
import logo from "../../assets/logo.svg";

export const Navbar = () => {

  const scrollToAnchor = (anchorId) => {
    const anchorElement = document.getElementById(anchorId);
    if (anchorElement) {
      anchorElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      <nav className={styles.navbar}>
        <button title="Accueil" onClick={() => scrollToAnchor("header")}>
          <Image src={logo} alt="logo" />
        </button>
        {/* <button title="Réserver" className={styles.cta} onClick={() => scrollToAnchor("reservation")}
        >Réserver</button> */}
      </nav>
    </>
  );
};

export default Navbar;
