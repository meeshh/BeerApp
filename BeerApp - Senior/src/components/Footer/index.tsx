import { grey } from "@mui/material/colors";
import styles from "./Footer.module.css";
import React from "react";

const Footer = () => {
  return (
    <footer
      className={styles.container}
      style={{
        backgroundColor: grey[300],
      }}
    >
      <div className={styles.inner}>&#169; {new Date().getFullYear()} </div>
    </footer>
  );
};

export default Footer;
