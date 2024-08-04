import styles from "../styles/politique.module.scss";
import Link from "next/link";
import Head from "next/head";
import Footer from "../components/Footer/Footer";

export default function Politique() {

    return (
        <>
            <Head>
                <title>Politique de confidentialité, WebOdyssey</title>
                <meta name="description" content="WebOdyssey, politique de confidentialité" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5, user-scalable=no" />
                <link rel="icon" href="/logo.svg" />
                <link href="https://api.fontshare.com/v2/css?f[]=satoshi@300,301,400,401,500,501,700,701,900,901,1,2&display=swap" rel="stylesheet" />

            </Head>

            <main className={styles.main}>
                <Link href="/#reservation" title="Retour à l'accueil" className={styles.button}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM231 127c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-71 71L376 232c13.3 0 24 10.7 24 24s-10.7 24-24 24l-182.1 0 71 71c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L119 273c-9.4-9.4-9.4-24.6 0-33.9L231 127z" /></svg>
                    <span>Retour à l&apos;accueil</span>

                </Link>

                <article>
                    <h1>Politique de Confidentialité</h1>
                    <p><b>Nous accordons une grande importance à la confidentialité de vos informations personnelles. Cette politique de confidentialité explique quelles informations nous collectons lorsque vous utilisez notre site web de réservation d&apos;entrées pour la célébration des 30 ans de la formation SRC/MMI de l&apos;université Gustave Eiffel à l&apos;IUT de Champs-sur-Marne, comment nous les utilisons et les partageons, et comment nous protégeons votre vie privée.</b></p>
                    <br />
                    <br />

                    <h4>Éditeur</h4>
                    <ul>
                        <li><b>Responsable de la publication :</b> Anne TASSO, responsable du BUT MMI Champs-sur-Marne</li>
                        <li><b>Tél. :</b> +33 1 60 95 85 90</li>
                    </ul>
                    <br />

                    <h4>Collecte d&apos;Informations</h4>
                    <ul>
                        <li>Nous collectons les informations nécessaires pour effectuer votre réservation, telles que votre nom, prénom, adresse e-mail, et promotion SRC/MMI.</li>
                        <li>Vos informations ne seront utilisées que dans le cadre de la gestion de la pré-réservation pour l&apos;événement en question.</li>
                    </ul>
                    <br />

                    <h4>Utilisation des Informations</h4>
                    <p>Vos informations seront utilisées uniquement pour vous contacter concernant votre réservation et pour vous fournir des mises à jour pertinentes concernant l&apos;événement des 30 ans de la formation SRC/MMI.</p>
                    <br />

                    <h4>Protection des Informations</h4>
                    <p>Nous mettons en place des mesures de sécurité appropriées pour protéger vos informations personnelles contre tout accès non autorisé, utilisation abusive ou divulgation.</p>
                    <br />

                    <h4>Partage d&apos;Informations</h4>
                    <p>Vos informations personnelles ne seront pas vendues, échangées, transférées ou fournies à des tiers sans votre consentement explicite, sauf si cela est nécessaire pour répondre à votre demande de réservation ou si cela est requis par la loi.</p>
                    <br />

                    <h4>Modification et Suppression</h4>
                    <p>Vous avez le droit de demander l&apos;accès, la rectification ou la suppression de vos informations personnelles à tout moment. Pour exercer ce droit, veuillez nous contacter via les coordonnées fournies sur notre site Web. Autrement, ces données seront automatiquement supprimées 3 ans après leur enregistrement.</p>
                    <br />

                    <h4>Consentement</h4>
                    <p>En utilisant notre site Web pour effectuer une réservation, vous consentez à notre politique de confidentialité et à l&apos;utilisation de vos informations personnelles conformément à cette politique.</p>
                    <br />
                    <br />
                    <p><b>Nous nous engageons à protéger la confidentialité de vos informations personnelles et à les utiliser uniquement dans le cadre de votre réservation pour l&apos;événement des 30 ans de la formation SRC/MMI. Si vous avez des questions ou des préoccupations concernant notre politique de confidentialité, n&apos;hésitez pas à nous contacter à l&apos;adresse e-mail suivante : </b>
                        <Link href="mailto:contact@webodyssey-mmi.fr" title="Adresse mail">
                            contact@webodyssey-mmi.fr
                        </Link>
                        .

                    </p>

                </article>
            </main>
            <Footer />

        </>
    );
}
