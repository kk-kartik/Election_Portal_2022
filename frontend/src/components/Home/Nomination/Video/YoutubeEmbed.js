import React from "react";
import PropTypes from "prop-types";
import styles from "./YoutubeEmbed.module.css"
const YoutubeEmbed = ({ embedId }) => (
  <div className={`video-responsive ${styles.frame}`}>
     
    {/* <iframe
    className={styles.frame}
      width="853"
      height="480"
      src={`https://www.youtube.com/embed/${embedId}?&rel=0&enablejsapi=1`}
      frameBorder="0"
      allow="clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />  */}
    <iframe width="853" height="480" className={styles.frame} src={`https://www.youtube.com/embed/${embedId}?&rel=0&enablejsapi=1`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen title="Embedded youtube"></iframe>
  </div>
);

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired
};

export default YoutubeEmbed;
