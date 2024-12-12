import { Box, Modal } from "@mui/material";
import React, {
    cloneElement,
    createContext,
    useContext,
    useState,
} from "react";
import { FaXmark } from "react-icons/fa6";
import styled from "styled-components";
import Button from "./Button";
//// modal style
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: "600px",
    bgcolor: "background.paper",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    maxHeight: "90vh",
    overflow: "auto",
};
const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    margin-bottom: 3rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid var(--color-grey-300);
`;
const CloseModal = styled.button`
    font-size: 2.2rem;
    color: var(--color-sec-600);
`;
const StyledFooter = styled.div`
    display: flex;
    align-items: center;
    gap: 2rem;
    padding-top: 2rem;
    margin-top: 3rem;
    border-top: 1px solid var(--color-grey-200);
`;
/// create modal context

export const ModalContext = createContext();

/// modal wrapper component
const MyModal = ({ children }) => {
    const [openName, setOpenName] = useState("");

    const close = () => setOpenName("");
    const open = setOpenName;

    return (
        <ModalContext.Provider value={{ open, openName, close }}>
            {children}
        </ModalContext.Provider>
    );
};

///// modal window component

const Window = ({
    children,
    name,
    title = "اضافة",
    type = "add",
    hasNext = false,
}) => {
    const { openName, close } = useContext(ModalContext);
    if (name !== openName) return null;

    return (
        <Modal
            open={true}
            onClose={close}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
            dir="rtl"
        >
            <div>
                <Box sx={{ ...style }}>
                    <Header>
                        <h2>{title}</h2>
                        <CloseModal onClick={close}>
                            <FaXmark />
                        </CloseModal>
                    </Header>
                    {children}
                </Box>
            </div>
        </Modal>
    );
};

const Footer = ({ children }) => {
    return <StyledFooter>{children}</StyledFooter>;
};
///// open Modal button
function Open({ children, opens: opensWindowName, onClick }) {
    const { open } = useContext(ModalContext);
    return cloneElement(children, {
        onClick: () => {
            onClick && onClick();
            open(opensWindowName);
        },
    });
}

MyModal.Open = Open;
MyModal.Window = Window;
MyModal.Footer = Footer;

export default MyModal;
