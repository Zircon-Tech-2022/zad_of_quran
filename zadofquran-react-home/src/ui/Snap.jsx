import { FaSnapchat } from "react-icons/fa";

const Snap = ({ className = "mainSnap" }) => {
    return (
        <a
            href="https://www.snapchat.com/add/zadofquran"
            className={`${className} socialIcon`}
            name="snap"
            title="snap"
        >
            <FaSnapchat />
        </a>
    );
};

export default Snap;
