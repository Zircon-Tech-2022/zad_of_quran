import React from "react";
import styles from "./header.module.css";
import { Container } from "@mui/material";
const Header = ({ title }) => {
    return (
        <header className={styles.header}>
            <Container maxWidth="xl">
                {title && (
                    <h2
                        className="mainHeading"
                        data-aos="fade-left"
                        data-aos-duration="1000"
                        data-aos-delay="0"
                    >
                        {title}
                    </h2>
                )}
            </Container>
        </header>
    );
};

export default Header;
