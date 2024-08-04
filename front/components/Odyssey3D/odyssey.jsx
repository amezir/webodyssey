import Spline from '@splinetool/react-spline';
import React, { useEffect } from 'react';
import { useRef } from 'react';

import styles from './odyssey.module.scss';

export const Odyssey = () => {

    const splineRef = useRef(null);

    const onLoad = (spline) => {
        const obj = spline.findObjectByName('Camera');
        splineRef.current = obj;
    };

    useEffect(() => {

        if (window.innerWidth < 768) {
            if (splineRef.current) {
                splineRef.current.scale.set(1.7, 1.7, 1.7);
            }
        } else {
            if (splineRef.current) {
                splineRef.current.scale.set(1, 1, 1);
            }
        }

        window.addEventListener('resize', () => {
            if (window.innerWidth < 768) {
                if (splineRef.current) {
                    splineRef.current.scale.set(1.7, 1.7, 1.7);
                }
            } else {
                if (splineRef.current) {
                    splineRef.current.scale.set(1, 1, 1);
                }
            }
        });
    }, [splineRef.current]);

    return (
        <>
            <Spline
                className={styles.spline}
                scene="https://prod.spline.design/MuptXbYq8eR9rHuq/scene.splinecode"
                onLoad={onLoad}
            />
        </>
    );
}

