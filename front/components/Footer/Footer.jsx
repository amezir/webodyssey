import React from "react";
import Link from "next/link";
import styles from "./Footer.module.scss";

export const Footer = () => {

    return (
        <>
            <footer className={styles.footer}>
                <h2 className={styles.contacttitle}>Contactez-nous</h2>
                <div className={styles.footerbottom}>
                    <div className={styles.socials}>
                        <Link
                            href="https://www.instagram.com/webodyssey.mmi/"
                            title="Instagram"
                            target="_blank"
                        >
                            Instagram
                        </Link>

                        <Link
                            href="https://www.linkedin.com/groups/4339156/"
                            title="Linkedin"
                            target="_blank"
                        >
                            Linkedin
                        </Link>
                        <Link href="mailto:contact@webodyssey-mmi.fr" title="Contactez-nous">
                            contact@webodyssey-mmi.fr
                        </Link>
                    </div>

                    <div className={styles.footerbtmheader}>
                        <Link href="/politique" title="Politique de confidentialité">
                            <p>Politique de confidentialité
                            </p>
                        </Link>
                        <p>Conçu avec ❤️ par l'équipe comm'</p>
                        <p>
                            © 2024 Web Odyssey MMI. Tous droits réservés.
                        </p>
                    </div>
                </div>

            </footer>
        </>
    );
};

export default Footer;
