import { createPortal } from "react-dom";
import { FaXmark } from "react-icons/fa6";
import styled from "styled-components";

const PortalContainer = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 9999999999;
    background: rgba(0, 0, 0, 0.5);
`;
const Iframe = styled.iframe``;
const Portal = ({ children, show, setShow }) => {
    if (show) {
        return createPortal(
            <PortalContainer
                className="portal-container"
                onClick={() => setShow(false)}
            >
                <div className="portal-content">
                    <button
                        className="close-button"
                        onClick={() => setShow(false)}
                    >
                        <FaXmark />
                    </button>
                    <iframe
                        className="videoFrame"
                        src="https://www.youtube.com/embed/5QsjG5P62EA"
                    ></iframe>
                </div>
            </PortalContainer>,
            document.body
        );
    } else {
        return null;
    }
};

export default Portal;
