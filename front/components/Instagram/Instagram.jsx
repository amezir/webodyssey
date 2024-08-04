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
                accessToken: 'IGQWROM1pTd3hzaXdTbGlaZAzBLVWtwaEpfYlRtZAWl3aUcxRk1sMlNYSVJSbFZAjMWVMby1XdG0zTGVDbHJROVFsTjRUY3FiMng1bGplWS1XekEzbVUySHRvU2lBQWUwM3BXTmJNTUdZAOUJUNzU0ZAUZAUdXRzNHNqa3MZD'
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
