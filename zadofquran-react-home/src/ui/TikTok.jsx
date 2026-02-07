import { FaTiktok } from "react-icons/fa6";

const TikTok = ({ className = "mainTikTok" }) => {
    return (
        <a
            href="https://www.tiktok.com/@zadofquran?_t=8jy2qgAEoQ2&_r=1"
            className={`${className} socialIcon`}
            name="tiktok"
            title="tiktok"
        >
            <FaTiktok />
        </a>
    );
};

export default TikTok;
