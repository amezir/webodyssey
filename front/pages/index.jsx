import { useEffect, useState, useRef } from "react";
import styles from "../styles/index.module.scss";
import { Odyssey } from "../components/Odyssey3D/odyssey.jsx";
import Loader from "../components/Loader/Loader.jsx";
import gsap from "gsap";
import { Analytics } from "@vercel/analytics/react";
import Instagram from "../components/Instagram/Instagram";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import Popup from "../components/Popup/Popup.jsx";
import Footer from "../components/Footer/Footer.jsx";
import Navbar from "../components/Navbar/Navbar";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [loading, setLoading] = useState(true);
  const [popup, setPopup] = useState(false);

  const tvRef = useRef(null);

  const [questions, setQuestions] = useState([
    {
      id: 1,
      question:
        "Puis-je prendre des photos ou enregistrer des vidéos pendant l'événement ?",
      answer:
        "Pour un souvenir ou parler de nous sur les réseaux sociaux (ça serait super cool), la captation de photos et vidéos sera autorisée durant l'évènement. Veuillez néanmoins respecter le refus de captation potentiel de la part de certains visiteurs ou membres du staff. Dans le cas où une zone est restreinte aux captations, des indications vous seront données.",
    },
    {
      id: 2,
      question:
        "Comment rester informé des mises à jour et des annonces concernant l'événement ?",
      answer:
        "L'équipe Web Odyssey vous invite à nous suivre sur les réseaux sociaux pour rester informé des dernières nouvelles, mises à jour et annonces liées à l'événement.",
    },
    {
      id: 3,
      question: "Que dois-je faire si j'ai perdu mon billet ?",
      answer:
        "Si vous perdez votre billet, pas de panique ! Vous pouvez nous envoyer un message à l'adresse contact@webodyssey-mmi.fr. Nous vous le renverrons dans les plus brefs délais.",
    },
    {
      id: 4,
      question:
        "Puis-je venir à l'événement avec un invité +1, comme ma compagne ou un ami ?",
      answer:
        "Cet événement étant exclusivement réservé aux personnes ayant suivi le parcours SRC/MMI, nous sommes dans le regret de devoir refuser l'accès à un éventuel +1.",
    },
    {
      id: 5,
      question: "Quels sont les papiers nécessaires pour venir à l'événement ?",
      answer:
        "Lors de votre venue, veuillez vous assurer d'avoir en votre possession une pièce d'identité ainsi que votre ticket. Sans ces documents, l'accès à l'événement vous sera refusé.",
    },
  ]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      document.body.style.overflow = "auto";
      setLoading(false);
    }, 7000);
  }, []);

  useEffect(() => {
    if (!loading) {
      gsap.to("#headertop h1", {
        opacity: 1,
        marginTop: "0px",
        duration: 1,
        ease: "power2.inOut",
      });

      gsap.to("#headertop canvas", {
        opacity: 1,
        marginTop: "0px",
        duration: 1,
        delay: 0.5,
        ease: "power2.inOut",
      });
      gsap.to("#timer", {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 1,
        ease: "power2.inOut",
      });
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  }, [loading]);

  useEffect(() => {
    const loaderPlayed = sessionStorage.getItem("loaderPlayed");
    if (loaderPlayed) {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const future = Date.parse("June 13, 2024 00:00:00");
      const now = new Date();
      const diff = future - now;

      if (diff <= 0) {
        setLoading(false);
        clearInterval(intervalId);
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      setTimeLeft({ days, hours, minutes });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: "#wrapper",
      start: "top top",
      end: "+=110%",
      pin: true,
      onEnter: () => {
        console.log("enter");
      },
      onLeave: () => {
        console.log("leave");
      },
    });

    gsap.fromTo(
      tvRef.current,
      {
        scale: 0.5,
      },
      {
        scale: 1,
        scrollTrigger: {
          trigger: document.querySelector("#wrapper"),
          start: "top top",
          end: "+=50%",
          scrub: true,
          // markers: true,
        },
      }
    );

    gsap.to("#accroche2 h2", {
      paddingTop: "0",
      stagger: 0.1,
      scrollTrigger: {
        trigger: "#accroche2",
        start: "top 80%",
        end: "+=70%",
        scrub: 2,
        once: true,
      },
    });

    if (window.innerWidth >= 768) {
      gsap.to("#programTitle1", {
        x: 100,
        scrollTrigger: {
          trigger: "#programTitle",
          start: "top 80%",
          end: "+=100%",
          scrub: 2,
        },
      });
      gsap.to("#programTitle2", {
        x: -100,
        scrollTrigger: {
          trigger: "#programTitle",
          start: "top 75%",
          end: "+=100%",
          scrub: 2,
        },
      });
      gsap.to("#programTitle3", {
        x: 100,
        scrollTrigger: {
          trigger: "#programTitle",
          start: "top 70%",
          end: "+=100%",
          scrub: 2,
        },
      });
      gsap.to("#programTitle4", {
        x: -100,
        scrollTrigger: {
          trigger: "#programTitle",
          start: "top 65%",
          end: "+=200%",
          scrub: 2,
        },
      });
    }

    gsap.to("#faq_transition", {
      rotate: 0,
      scrollTrigger: {
        trigger: "#faq",
        start: "top 80%",
        end: "+=100%",
        scrub: 2,
      },
    });

    gsap.to("#instagram_transition", {
      rotate: 0,
      scrollTrigger: {
        trigger: "#instagram",
        start: "top 80%",
        end: "+=100%",
        scrub: 2,
      },
    });

    gsap.to("#reservation_transition", {
      rotate: 0,
      scrollTrigger: {
        trigger: "#reservation",
        start: "top 80%",
        end: "+=100%",
        scrub: 2,
      },
    });
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(useGSAP);
  }, [loading]);

  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (id) => {
    if (activeAccordion === id) {
      setActiveAccordion(null);
    } else {
      setActiveAccordion(id);
    }
  };

  useEffect(() => {
    const inputs = document.querySelectorAll("input[required]");
    inputs.forEach((input) => {
      input.addEventListener("blur", function () {
        const errorMessageId = `${this.id}-error`;
        const errorMessage = document.getElementById(errorMessageId);
        if (errorMessage) {
          if (this.value.trim() === "") {
            errorMessage.textContent = "Ce champ est obligatoire";
          } else {
            errorMessage.textContent = "";
          }
        }
      });
    });

    const select = document.querySelector("select[required]");
    select.addEventListener("blur", function () {
      const errorMessageId = `${this.id}-error`;
      const errorMessage = document.getElementById(errorMessageId);
      if (errorMessage) {
        if (this.value === "") {
          errorMessage.textContent = "Ce champ est obligatoire";
        } else {
          errorMessage.textContent = "";
        }
      }
    });
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    firstName: "",
    promo: "",
    mail: "",
    accept: false,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    e.preventDefault();
    localStorage.setItem("formData", JSON.stringify(formData));
  };
  // useEffect(() => {
  //   const savedFormData = localStorage.getItem("formData");
  //   if (savedFormData) {
  //     setFormData(JSON.parse(savedFormData));
  //   }
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    document.querySelectorAll(".error-message").forEach((el) => el.remove());
    document
      .querySelectorAll('input[aria-invalid="true"]')
      .forEach((el) => el.removeAttribute("aria-invalid"));
    if (
      !formData.name ||
      !formData.firstName ||
      !formData.mail ||
      !formData.promo
    ) {
      console.error("Veuillez remplir tous les champs du formulaire.");
      if (!formData.name) {
        document.getElementById("name").classList.add("error");
        addErrorMessage("name", "Veuillez remplir ce champ.");
        document.getElementById("name").setAttribute("aria-invalid", "true");
      }
      if (!formData.firstName) {
        document.getElementById("firstName").classList.add("error");
        addErrorMessage("firstName", "Veuillez remplir ce champ.");
        document
          .getElementById("firstName")
          .setAttribute("aria-invalid", "true");
      }
      if (!formData.mail) {
        document.getElementById("mail").classList.add("error");
        addErrorMessage("mail", "Veuillez remplir ce champ.");
        document.getElementById("mail").setAttribute("aria-invalid", "true");
      }
      if (!formData.promo) {
        document.getElementById("promo").classList.add("error");
        addErrorMessage("promo", "Veuillez remplir ce champ.");
        document.getElementById("promo").setAttribute("aria-invalid", "true");
      }
      return;
    }

    try {
      document.getElementById("name").classList.remove("error");
      document.getElementById("firstName").classList.remove("error");
      document.getElementById("mail").classList.remove("error");
      document.getElementById("promo").classList.remove("error");

      const response = await fetch(
        "https://nsebahoun.projetsmmichamps.fr/postReservations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        console.log("Réservation ajoutée avec succès !");
        setFormData({
          name: "",
          firstName: "",
          promo: "",
          mail: "",
        });
        setPopup(true);
      } else {
        console.error(
          "Erreur lors de l'ajout de la réservation :",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire :", error);
    }
  };

  function addErrorMessage(fieldId, message) {
    const errorMessage = document.createElement("span");
    errorMessage.className = "error-message";
    errorMessage.innerHTML = message;
    document
      .getElementById(fieldId)
      .insertAdjacentElement("afterend", errorMessage);
  }

  return (
    <>
      <Head>
        <title>WebOdyssey</title>
        <meta name="description" content="WebOdyssey" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=5, user-scalable=no"
        />
        <link rel="icon" href="/logo.svg" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@300,301,400,401,500,501,700,701,900,901,1,2&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className={styles.indexbody}>
        <Navbar />

        {loading && <Loader />}
        {popup && <Popup closePopup={() => setPopup(false)} />}

        <header className={styles.header} id="header">
          <Navbar />
          <div className={styles.headertop} id="headertop">
            <h1 aria-label="Web Odyssey">
              Web <span className={styles.hiddenText}>Odyssey</span>{" "}
            </h1>
            <Odyssey />
          </div>

          <div className={styles.headerbottom}>
            <div id="timer" className={styles.timer}>
              <p className={styles.time}>Merci à tous</p>
            </div>
          </div>
          <Image
            src="/terre.png"
            alt="terre"
            width={250}
            height={250}
            className={styles.terre}
          />
          <Image
            src="/Passport.png"
            alt="passport"
            width={100}
            height={100}
            className={styles.passport}
          />
          <Image
            src="/fuzer.png"
            alt="fusee"
            width={250}
            height={250}
            className={styles.fusee}
          />
          <Image
            src="/trois.png"
            alt="trois"
            width={100}
            height={100}
            className={styles.trois}
          />
        </header>
        <div className={styles.teaser} id="wrapper">
          <iframe
            id="tv"
            ref={tvRef}
            width="560"
            height="315"
            src="https://www.youtube.com/embed/m2wYDQHPnLE?si=aqfkcV9NhBfzPnGD"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>

        <div className={styles.accroche2}>
          <div className={styles.accroche2_title} id="accroche2">
            <div>
              <h2>30 ans de succès,</h2>
            </div>
            <div>
              <h2>
                et<span className={styles.green}> d'innovation</span>
              </h2>
            </div>
            <div>
              <h2>pédagogique !</h2>
            </div>
          </div>

          <div className={styles.accroche2_text}>
            <p>
              Venez célébrer les trois décennies de la formation SRC/MMI de
              Champs-sur-Marne : un rendez-vous exceptionnel où les souvenirs
              mêleront présent et futur, où les retrouvailles seront joie et
              plaisir
              <br />
              <br />
              <br />
              <b className={styles.green}>
                Nos MMI3 ont rivalisé d'ingéniosité et de créativité pour vous
                préparer à un voyage inoubliable à travers l'histoire du web, le
                13 juin prochain. Alors n'attendez plus et réservez votre place
                dès maintenant !
              </b>
              <br />
              <br />
              &#9888; Attention, la réservation et le ticket sont obligatoires
              pour accéder à l'événement.
            </p>

            <Image
              src="/cuteplane.png"
              alt="avion"
              width={400}
              height={400}
              className={styles.cuteplane}
            />
          </div>
        </div>

        <div className={styles.program2}>
          <h2 className={styles.programTitle} id="programTitle">
            Au programme
          </h2>
          <div className={styles.programWrapper} id="programWrapper">
            <h2 id="programTitle1" className={styles.target}>
              <Image src="/target.png" alt="logo" width={110} height={110} />
              Les défis du numérique
            </h2>
            <h2 id="programTitle2" className={styles.trophy}>
              Remise des prix
              <Image
                src="/cup.png"
                alt="logo"
                width={150}
                height={150}
                transform="rotate(10)"
              />
            </h2>
            <h2 id="programTitle3" className={styles.champagne}>
              <Image src="/tchin.png" alt="logo" width={150} height={150} />
              Soirée festive
            </h2>
            <h2 id="programTitle4">Et bien plus...</h2>
          </div>
        </div>

        <div className={styles.instagram} id="instagram">
          <div
            className={styles.instagram_transition}
            id="instagram_transition"
          ></div>
          <h2>Restez connecté</h2>
          <Instagram />
          <Link
            href="https://www.instagram.com/webodyssey.mmi/"
            title="Instagram"
            target="blank"
            className={styles.instagram_link}
          >
            Rejoignez-nous sur Instagram
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g i>
                {" "}
                <path
                  id="Vector"
                  d="M10.0002 5H8.2002C7.08009 5 6.51962 5 6.0918 5.21799C5.71547 5.40973 5.40973 5.71547 5.21799 6.0918C5 6.51962 5 7.08009 5 8.2002V15.8002C5 16.9203 5 17.4801 5.21799 17.9079C5.40973 18.2842 5.71547 18.5905 6.0918 18.7822C6.5192 19 7.07899 19 8.19691 19H15.8031C16.921 19 17.48 19 17.9074 18.7822C18.2837 18.5905 18.5905 18.2839 18.7822 17.9076C19 17.4802 19 16.921 19 15.8031V14M20 9V4M20 4H15M20 4L13 11"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </Link>
        </div>

        <div className={styles.faq} id="faq">
          <div className={styles.faq_transition} id="faq_transition"></div>
          <div className={styles.wrapper}>
            <div className={styles.intro}>
              <h2>Des questions ? Nous avons la réponse</h2>
              <p className={styles.faq_other}>
                Des questions&nbsp;? Contactez-nous à l'adresse{" "}
                <a href="mailto:contact@webodyssey.fr">
                  <b>contact@webodyssey.fr</b>
                </a>
              </p>
            </div>

            <div className={styles.accordion}>
              {questions.map((question) => (
                <div
                  key={question.id}
                  className={
                    styles.accordion_ctn +
                    " " +
                    (activeAccordion === question.id ? styles.active : "")
                  }
                  id={`faq-${question.id}`}
                >
                  <button
                    className={styles.accordionToggle}
                    onClick={() => toggleAccordion(question.id)}
                  >
                    {question.question}
                    <div>
                      <svg
                        width="71"
                        height="70"
                        viewBox="0 0 71 70"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.904 69.984L0.528 64.608L54.8 10.336L7.568 7.13599L14.608 0.095993L67.344 3.03999L70.416 55.776L63.376 62.816L60.176 15.712L5.904 69.984Z"
                          fill="black"
                        ></path>
                      </svg>
                    </div>
                  </button>
                  <div className={styles.accordionContent}>
                    <p>{question.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.reservation} id="reservation">
          <div
            className={styles.reservation_transition}
            id="reservation_transition"
          ></div>
          <div className={styles.wrapper}>
            <div className={styles.intro}>
              <svg
                className={styles.bigtitle}
                width="267"
                height="100"
                viewBox="0 0 267 100"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M34.44 99H23.24L20.86 31.94L20.44 16.4H20.16L19.74 31.94L17.36 99H6.16L0 0.999993H8.82L11.06 62.46L11.62 86.54H11.9L12.6 62.46L14.7 0.999993H25.9L28.14 62.46L28.7 86.54H28.98L29.68 62.32L31.78 0.999993H40.6L34.44 99ZM56.7055 8.83999H51.1055V44.82H56.0055V52.66H51.1055V91.16H57.4055V99H42.7055V0.999993H56.7055V8.83999ZM82.8789 37.82C82.8789 40.34 82.5522 42.2067 81.8989 43.42C81.3389 44.6333 80.1256 45.6133 78.2589 46.36V46.64C80.1256 47.3867 81.3389 48.3667 81.8989 49.58C82.5522 50.7933 82.8789 52.66 82.8789 55.18V87.8C82.8789 95.2667 79.1922 99 71.8189 99H60.4789V0.999993H71.8189C79.1922 0.999993 82.8789 4.73333 82.8789 12.2V37.82ZM74.4789 12.9C74.4789 10.1933 73.5456 8.83999 71.6789 8.83999H68.8789V42.58H71.6789C72.7056 42.58 73.4056 42.3 73.7789 41.74C74.2456 41.18 74.4789 40.1067 74.4789 38.52V12.9ZM74.4789 54.48C74.4789 52.8933 74.2456 51.82 73.7789 51.26C73.4056 50.7 72.7056 50.42 71.6789 50.42H68.8789V91.16H71.6789C73.5456 91.16 74.4789 89.8067 74.4789 87.1V54.48ZM120.203 88.64C120.203 92.0933 119.223 94.8467 117.263 96.9C115.303 98.86 112.596 99.84 109.143 99.84C105.69 99.84 102.936 98.86 100.883 96.9C98.8298 94.8467 97.8031 92.0933 97.8031 88.64V11.36C97.8031 7.90666 98.8298 5.19999 100.883 3.24C102.936 1.18666 105.69 0.159996 109.143 0.159996C112.596 0.159996 115.303 1.18666 117.263 3.24C119.223 5.19999 120.203 7.90666 120.203 11.36V88.64ZM111.803 12.48C111.803 9.49333 110.87 7.99999 109.003 7.99999C107.136 7.99999 106.203 9.49333 106.203 12.48V87.52C106.203 90.5067 107.136 92 109.003 92C110.87 92 111.803 90.5067 111.803 87.52V12.48ZM146.863 87.8C146.863 91.2533 146.07 94.0067 144.483 96.06C142.897 98.02 140.003 99 135.803 99H124.463V0.999993H135.803C140.003 0.999993 142.897 2.02666 144.483 4.08C146.07 6.04 146.863 8.74667 146.863 12.2V87.8ZM138.463 12.9C138.463 11.3133 138.23 10.24 137.763 9.68C137.39 9.11999 136.69 8.83999 135.663 8.83999H132.863V91.16H135.663C136.69 91.16 137.39 90.88 137.763 90.32C138.23 89.76 138.463 88.6867 138.463 87.1V12.9ZM164.993 66.8V99H156.593V66.8L148.613 0.999993H157.293L160.093 34.74L160.653 48.74H160.933L161.493 34.74L164.293 0.999993H172.973L164.993 66.8ZM196.759 88.64C196.759 92.0933 195.732 94.8467 193.679 96.9C191.626 98.86 188.872 99.84 185.419 99.84C181.966 99.84 179.259 98.86 177.299 96.9C175.339 94.8467 174.359 92.0933 174.359 88.64V64.56H182.759V87.52C182.759 90.5067 183.692 92 185.559 92C187.426 92 188.359 90.5067 188.359 87.52V68.9C188.359 64.7933 187.659 61.2933 186.259 58.4C184.952 55.4133 183.459 52.4733 181.779 49.58C179.912 46.5 178.186 43.1867 176.599 39.64C175.106 36.0933 174.359 31.7533 174.359 26.62V11.36C174.359 7.90666 175.386 5.19999 177.439 3.24C179.492 1.18666 182.246 0.159996 185.699 0.159996C189.152 0.159996 191.859 1.18666 193.819 3.24C195.779 5.19999 196.759 7.90666 196.759 11.36V31.1H188.359V12.48C188.359 9.49333 187.426 7.99999 185.559 7.99999C183.692 7.99999 182.759 9.49333 182.759 12.48V26.62C182.759 30.7267 183.412 34.2733 184.719 37.26C186.119 40.2467 187.659 43.1867 189.339 46.08C191.206 49.16 192.886 52.4733 194.379 56.02C195.966 59.5667 196.759 63.86 196.759 68.9V88.64ZM222.599 88.64C222.599 92.0933 221.572 94.8467 219.519 96.9C217.466 98.86 214.712 99.84 211.259 99.84C207.806 99.84 205.099 98.86 203.139 96.9C201.179 94.8467 200.199 92.0933 200.199 88.64V64.56H208.599V87.52C208.599 90.5067 209.532 92 211.399 92C213.266 92 214.199 90.5067 214.199 87.52V68.9C214.199 64.7933 213.499 61.2933 212.099 58.4C210.792 55.4133 209.299 52.4733 207.619 49.58C205.752 46.5 204.026 43.1867 202.439 39.64C200.946 36.0933 200.199 31.7533 200.199 26.62V11.36C200.199 7.90666 201.226 5.19999 203.279 3.24C205.332 1.18666 208.086 0.159996 211.539 0.159996C214.992 0.159996 217.699 1.18666 219.659 3.24C221.619 5.19999 222.599 7.90666 222.599 11.36V31.1H214.199V12.48C214.199 9.49333 213.266 7.99999 211.399 7.99999C209.532 7.99999 208.599 9.49333 208.599 12.48V26.62C208.599 30.7267 209.252 34.2733 210.559 37.26C211.959 40.2467 213.499 43.1867 215.179 46.08C217.046 49.16 218.726 52.4733 220.219 56.02C221.806 59.5667 222.599 63.86 222.599 68.9V88.64ZM240.319 8.83999H234.719V44.82H239.619V52.66H234.719V91.16H241.019V99H226.319V0.999993H240.319V8.83999ZM258.372 66.8V99H249.972V66.8L241.992 0.999993H250.672L253.472 34.74L254.032 48.74H254.312L254.872 34.74L257.672 0.999993H266.352L258.372 66.8Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className={styles.form}>
              <svg
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.circle}
              >
                <circle cx="50" cy="50" r="50" />
              </svg>
              <svg
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.circle2}
              >
                <circle cx="50" cy="50" r="50" />
              </svg>
              <h2>
                Rendez-vous le <span>13 juin 2024</span> dès 18h
              </h2>
              <p>
                <b>
                  Célébrez les 30 ans de la formation SRC/MMI et inscrivez vous
                  dès maintenant pour vivre une expérience inoubliable.
                </b>
              </p>
              <br />

              <form onSubmit={handleSubmit} id="form">
                <div className={styles.field}>
                  <p>Tous les champs sont obligatoires.</p>
                  <label htmlFor="name">Nom</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Nom"
                    value={formData.name}
                    onChange={handleChange}
                    aria-errormessage="name-error"
                    autoComplete="family-name"
                    required
                    regex="^[a-zA-Z]+$"
                  />
                  <span
                    className="error-message"
                    id="name-error"
                    aria-atomic="true"
                    aria-live="polite"
                  ></span>
                </div>

                <div className={styles.field}>
                  <label htmlFor="firstName">Prénom</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Prénom"
                    value={formData.firstName}
                    onChange={handleChange}
                    aria-errormessage="firstName-error"
                    autoComplete="given-name"
                    required
                    regex="^[a-zA-Z]+$"
                  />
                  <span
                    className="error-message"
                    id="firstName-error"
                    aria-atomic="true"
                    aria-live="polite"
                  ></span>
                </div>

                <div className={styles.field}>
                  <label htmlFor="promo">Promotion/Enseignant·e</label>
                  <div className={styles.customselect}>
                    <select
                      name="promo"
                      id="promo"
                      value={formData.promo}
                      aria-errormessage="promo-error"
                      onChange={(e) => {
                        setFormData((prevData) => ({
                          ...prevData,
                          promo: e.target.value,
                        }));
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          setFormData((prevData) => ({
                            ...prevData,
                            promo: e.target.value,
                          }));
                          e.target.blur();
                        }
                      }}
                      onBlur={(e) => {
                        e.target.size = 0;
                        e.target.style.padding = "10px";
                      }}
                      onFocus={(e) => {
                        e.target.size = 1;
                        e.target.style.padding = "10px";
                      }}
                      required
                    >
                      <option value="" disabled hidden>
                        Année de formation
                      </option>
                      <option value="0000">Enseignant·e</option>
                      <option value="1995">SRC 1993/1995</option>
                      <option value="1996">SRC 1994/1996</option>
                      <option value="1997">SRC 1995/1997</option>
                      <option value="1998">SRC 1996/1998</option>
                      <option value="1999">SRC 1997/1999</option>
                      <option value="2000">SRC 1998/2000</option>
                      <option value="2001">SRC 1999/2001</option>
                      <option value="2002">SRC 2000/2002</option>
                      <option value="2003">SRC 2001/2003</option>
                      <option value="2004">SRC 2002/2004</option>
                      <option value="2005">SRC 2003/2005</option>
                      <option value="2006">SRC 2004/2006</option>
                      <option value="2007">SRC 2005/2007</option>
                      <option value="2008">SRC 2006/2008</option>
                      <option value="2009">SRC 2007/2009</option>
                      <option value="2010">SRC 2008/2010</option>
                      <option value="2011">SRC 2009/2011</option>
                      <option value="2012">SRC 2010/2012</option>
                      <option value="2013">MMI 2011/2013</option>
                      <option value="2014">MMI 2012/2014</option>
                      <option value="2015">MMI 2013/2015</option>
                      <option value="2016">MMI 2014/2016</option>
                      <option value="2017">MMI 2015/2017</option>
                      <option value="2018">MMI 2016/2018</option>
                      <option value="2019">MMI 2017/2019</option>
                      <option value="2020">MMI 2018/2020</option>
                      <option value="2021">MMI 2019/2021</option>
                      <option value="2022">MMI 2020/2022</option>
                      <option value="2024">MMI 2021/2024</option>
                      <option value="2025">MMI 2022/2025</option>
                      <option value="2026">MMI 2023/2026</option>
                    </select>
                    <span
                      className="error-message"
                      id="promo-error"
                      aria-atomic="true"
                      aria-live="polite"
                    ></span>
                  </div>
                </div>
                <div className={styles.field}>
                  <label htmlFor="mail">Email</label>
                  <input
                    type="email"
                    id="mail"
                    name="mail"
                    placeholder="exemple@mail.fr"
                    value={formData.mail}
                    onChange={handleChange}
                    aria-errormessage="mail-error"
                    autoComplete="email"
                    required
                    regex="^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$"
                  />
                  <span className="error-message" id="mail-error"></span>
                </div>

                <div className={styles.field + " " + styles.checkbox}>
                  <div className={styles.flex}>
                    <label htmlFor="accept">
                      J&apos;ai lu et accepte la{" "}
                      <Link
                        href="/politique"
                        title="Politique de confidentialité"
                      >
                        politique de confidentialité
                      </Link>
                    </label>
                    <input
                      type="checkbox"
                      id="accept"
                      name="accept"
                      aria-errormessage="accept-error"
                      required
                    />
                  </div>

                  <span
                    className="error-message"
                    id="accept-error"
                    aria-atomic="true"
                    aria-live="polite"
                  ></span>
                </div>

                <button type="submit" className={styles.button}>
                  <span>Réserver</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM281 385c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l71-71L136 280c-13.3 0-24-10.7-24-24s10.7-24 24-24l182.1 0-71-71c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L393 239c9.4 9.4 9.4 24.6 0 33.9L281 385z" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      <Analytics />
    </>
  );
}
