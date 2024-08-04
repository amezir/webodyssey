import { useEffect } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import React from "react";
import logo from "../../assets/logo.svg";
import styles from "./Loader.module.scss";

export const Loader = () => {
    useEffect(() => {
        const loaderPlayed = sessionStorage.getItem("loaderPlayed");

        if (!loaderPlayed) {
            const tl = gsap.timeline();

            tl.to("#loader__content", {
                opacity: 1,
                duration: 1,
                delay: 0.5,
                ease: "power2.inOut"
            })
            .to("#loader__content", {
                opacity: 1,
                duration: 2,
                ease: "power2.inOut"
            })
            .to("#loader__content", {
                opacity: 0,
                duration: 1,
                ease: "power2.inOut"
            })
            .to("#loader", {
                opacity: 0,
                duration: 1,
                ease: "power2.inOut",
                onComplete: () => {
                    sessionStorage.setItem("loaderPlayed", true);
                }
            });
        }
    }, []);

    return (
        <div className={styles.loader} id="loader">
            <div className={styles.loader__content} id="loader__content">
                <p className={styles.loader__title} id="loader__title">MMI Champs présente</p>
                <div className={styles.separator}></div>
                <Image src={logo} alt="logo" width={100} height={100} />
            </div>
        </div>
    );
};

export default Loader;
