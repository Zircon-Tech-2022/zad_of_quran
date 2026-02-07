import { FaYoutube } from "react-icons/fa6";

const Youtube = ({ className = "mainYoutube" }) => {
    return (
        <a
            href="https://youtube.com/@zadofquran?si=egxb9M29SQ8sWD-a"
            className={`${className} socialIcon`}
            name="youtube"
            title="youtube"
        >
            <FaYoutube />
        </a>
    );
};

export default Youtube;
