import { useState, useEffect, useRef } from "react";
import styles from "../styles/admin.module.scss";
import Head from "next/head";

export default function Admin() {
  const [acceptedReservations, setAcceptedReservations] = useState([]);
  const [waitingReservations, setWaitingReservations] = useState([]);
  const [countReservations, setCountReservations] = useState(0);
  const [countAcceptedReservations, setCountAcceptedReservations] = useState(0);
  const [countWaitingReservations, setCountWaitingReservations] = useState(0);
  const [activeFilter, setActiveFilter] = useState("accepted");

  useEffect(() => {

    const checkToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        window.location.replace("/");
        return false;
      }

      try {
        const response = await fetch("https://nsebahoun.projetsmmichamps.fr/verifyToken", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });
        const data = await response.json();
        console.log("Token verified:", data);
        return true;
      } catch (error) {
        console.error("Token verification failed:", error);
        window.location.replace("/");
        return false;
      }
    };

    const fetchData = async () => {
      const isTokenValid = await checkToken();
      if (!isTokenValid) return;

      try {
        const [
          acceptedResponse,
          waitingResponse,
          countResponse,
          acceptedCountResponse,
          waitingCountResponse,
        ] = await Promise.all([
          fetch("https://nsebahoun.projetsmmichamps.fr/getValidateReservations").then(
            (response) => response.json()
          ),
          fetch("https://nsebahoun.projetsmmichamps.fr/getWaitingReservations").then(
            (response) => response.json()
          ),
          fetch("https://nsebahoun.projetsmmichamps.fr/countReservations").then((response) =>
            response.json()
          ),
          fetch("https://nsebahoun.projetsmmichamps.fr/countAcceptedReservations").then(
            (response) => response.json()
          ),
          fetch("https://nsebahoun.projetsmmichamps.fr/countWaitingReservations").then(
            (response) => response.json()
          ),
        ]);

        setAcceptedReservations(acceptedResponse);
        setWaitingReservations(waitingResponse);
        setCountReservations(countResponse.count || 0);
        setCountAcceptedReservations(acceptedCountResponse.count || 0);
        setCountWaitingReservations(waitingCountResponse.count || 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleReservationAction = (e, id, adminResponse) => {
    e.preventDefault();
    const url = adminResponse
      ? "https://nsebahoun.projetsmmichamps.fr/acceptReservation"
      : "https://nsebahoun.projetsmmichamps.fr/cancelReservation";
    const body = adminResponse ? { id, adminResponse } : { id };

    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        if (adminResponse) {
          setAcceptedReservations((prevReservations) =>
            prevReservations.map((reservation) =>
              reservation.id_reservation === id
                ? { ...reservation, valide: true }
                : reservation
            )
          );
        } else {
          setWaitingReservations((prevReservations) =>
            prevReservations.filter(
              (reservation) => reservation.id_reservation !== id
            )
          );
        }
      })
      .catch((error) => {
        console.error("Error handling reservation:", error);
      });
  };

  const handleClickLogOut = () => {
    localStorage.removeItem("token");
    window.location.replace("/");
  };

  const deleteConfirmAlert = (e, id_reservation) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette réservation ?")) {
      handleReservationAction(e, id_reservation, false);
    }
  };
  const acceptConfirmAlert = (e, id_reservation) => {
    if (window.confirm("Voulez-vous vraiment accepter cette réservation ?")) {
      handleReservationAction(e, id_reservation, true);
    }
  };

  const acceptedReservationsTable = useRef(null);
  const waitingReservationsTable = useRef(null);

  const showWaitingReservations = () => {
    acceptedReservationsTable.current.style.display = "none";
    waitingReservationsTable.current.style.display = "inline-table";
    setActiveFilter("waiting");
  };

  const showAcceptedReservations = () => {
    acceptedReservationsTable.current.style.display = "inline-table";
    waitingReservationsTable.current.style.display = "none";
    setActiveFilter("accepted");
  };

  return (
    <>
      <Head>
        <title>Panel administrateur</title>
        <meta name="description" content="Admin page" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="icon" href="/logo.svg" />
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@300,301,400,401,500,501,700,701,900,901,1,2&display=swap" rel="stylesheet" />
      </Head>

      <div className={styles.container}>
        <main className={styles.content}>
          <div className={styles.topBar}>
            <h1>Bonjour admin!</h1>
            <a className={styles.backHome} href="/">Retour au site principal</a>
            <button className={styles.topBarLogout} onClick={handleClickLogOut}>Déconnexion</button>
          </div>

          <div className={styles.bookingData}>
            <p>
              {countReservations} <span>réservations</span>
            </p>
            <p>
              {countAcceptedReservations} <span>Réservations validées</span>
            </p>
            <p>
              {countWaitingReservations} <span>Réservations en attente</span>
            </p>
          </div>
          <div className={styles.reservationsContainer}>
            <div className={styles.filters}>
              <div className={`${styles.tab} ${activeFilter === "accepted" ? styles.active : ""}`} onClick={showAcceptedReservations}>
                <p>

                  Réservations acceptées
                </p>
              </div>
              <div className={`${styles.tab} ${activeFilter === "waiting" ? styles.active : ""}`} onClick={showWaitingReservations}>
                <p>
                  Réservations en attente
                </p>
              </div>
            </div>
            <div className={styles.tableContainer}>
              <table
                ref={acceptedReservationsTable}
                className={`${styles.acceptedReservationTable} ${activeFilter === "accepted" ? styles.active : ""}`}
              >
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Email</th>
                    <th>Promo</th>
                  </tr>
                </thead>
                <tbody>
                  {acceptedReservations.map((reservation) => (
                    <tr key={reservation.ext_id_reservation}>
                      <td>{reservation.name}</td>
                      <td>{reservation.firstName}</td>
                      <td>{reservation.mail}</td>
                      <td>{reservation.promo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <table
                ref={waitingReservationsTable}
                className={`${styles.waitingReservationTable} ${activeFilter === "waiting" ? styles.active : ""}`}
              >
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Email</th>
                    <th>Promo</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {waitingReservations.map((reservation) => (
                    <tr key={reservation.ext_id_reservation}>
                      <td>{reservation.name}</td>
                      <td>{reservation.firstName}</td>
                      <td>{reservation.mail}</td>
                      <td>{reservation.promo}</td>
                      <td>
                        <div className={styles.validateButton}>
                          <button
                            className={styles.acceptedButton}
                            onClick={(e) =>
                              acceptConfirmAlert(e, reservation.id_reservation)
                            }
                          >
                            Confirmer
                          </button>
                          <button
                            className={styles.deniedButton}
                            onClick={(e) =>
                              deleteConfirmAlert(e, reservation.id_reservation)
                            }
                          >
                            Annuler
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
