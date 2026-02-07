import styles from "./body.module.css";
import { Container } from "@mui/material";
const Body = ({ children }) => {
    return (
        <div className={styles.main}>
            <Container maxWidth="xl">{children}</Container>
        </div>
    );
};

export default Body;
