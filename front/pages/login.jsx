import { useState } from "react";
import styles from "../styles/Login.module.scss";
import Head from "next/head";

export default function Login() {
  const [loginData, setLoginData] = useState({
    login: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://nsebahoun.projetsmmichamps.fr/login", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        if (data.token) {
          console.log("Authentication successful");
          localStorage.setItem("token", data.token);
          window.location.replace("/admin");
        } else {
          console.log("Authentication failed");
        }
      })
      .catch((error) => {
        console.debug("Error during authentication:", error);
      });
  };

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Head>
        <title>Connexion au panel administrateur</title>
        <meta name="description" content="Admin page" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/logo.svg" />
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@300,301,400,401,500,501,700,701,900,901,1,2&display=swap" rel="stylesheet" />
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.loginForm}>
            <form onSubmit={handleSubmit}>
              <div>
                <h1>l'envers du décor</h1>
                <p className={styles.connectText}>
                  Connectez vous pour accéder au panel administrateur
                </p>
              </div>
              <label htmlFor="login">Login :</label>
              <input
                type="text"
                id="login"
                name="login"
                placeholder="Nom d'utilisateur"
                onChange={handleChange}
              />
              <label htmlFor="password">Password :</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Mot de passe"
                onChange={handleChange}
              />
              <button type="submit" className={styles.submit}>
                Se connecter
              </button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}
