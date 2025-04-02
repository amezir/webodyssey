import React, { useEffect } from 'react';
import styles from './Instagram.module.scss';

function InstagramPosts() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://cdn.jsdelivr.net/gh/stevenschobert/instafeed.js@2.0.0rc1/src/instafeed.min.js";
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            const userFeed = new Instafeed({
                get: 'user',
                target: "instafeed-container",
                resolution: 'low_resolution',
                limit: 3,
                accessToken: 'EAALfZCHTZCxl4BO12simLEwsFvF6wBsp4OrHz2cvfYWvMRHeQxRYssRofJ8iuIJUacm4QGfAhzzCzQc7EM1PZAj26P5juP08aYtvu8z5swj7VQWwTn8FrmZCDZA9mxvuZBzGj0i4RibojVs7OgJOnm3z7FRb13hZAYfdZCEViNhu8ddZA4H2phMSl3yF5Emi8gZAwu8vIY0hyFO6guPV0CVjLXdZBB4FIpmgNCC01WCd5OWEVCc8Mn6o44CyC6bZCCUgn5igACMktz0ZD'
            });
            userFeed.run();
        };
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div id="instafeed-container" className={styles.instagram_feed} data-aos="fade-in">
        </div>
    );
}

export default InstagramPosts;
