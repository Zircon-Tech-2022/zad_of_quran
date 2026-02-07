import styles from "./brand.module.css";

import { Link } from "react-router-dom";
import { useLangContext } from "../../context/LangContext";

const Brand = ({ activeScroll }) => {
    const { language } = useLangContext();
    return (
        <Link to={`/${language}`} className={styles.brand}>
            <div className={styles.BrandImg}>
                {!activeScroll && (
                    <img
                        src="/imgs/zad-logo-h.svg"
                        alt="brand"
                        width={300}
                        height={300}
                    />
                )}
                {activeScroll && (
                    <img
                        src="/imgs/zad-logo-active.svg"
                        alt="brand"
                        width={300}
                        height={300}
                    />
                )}
            </div>
        </Link>
    );
};

export default Brand;
