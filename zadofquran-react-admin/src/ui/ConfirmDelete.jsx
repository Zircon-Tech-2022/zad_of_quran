import styled from "styled-components";
import Button from "./Button";
import MyModal, { ModalContext } from "./MyModal";
import { useContext } from "react";

const StyledConfirmDelete = styled.div`
    /* width: 40rem; */
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    padding: 0 2rem;

    & p {
        color: var(--color-red-700);
        margin-bottom: 1.2rem;
        font-size: 1.8rem;
    }
    & p span {
        font-weight: 700;
    }
    & div {
        display: flex;
        /* justify-content: flex-end; */
        gap: 1.2rem;
    }
`;

function ConfirmDelete({ resourceName, onConfirm, disabled }) {
    const { close } = useContext(ModalContext);
    return (
        <StyledConfirmDelete>
            <p>
                هل انت متاكد من انك تريد مسح <span>"{resourceName}"</span> ؟
            </p>

            <MyModal.Footer>
                <Button
                    variation="danger"
                    disabled={disabled}
                    onClick={onConfirm}
                >
                    مسح
                </Button>
                <Button variation="third" disabled={disabled} onClick={close}>
                    الغاء
                </Button>
            </MyModal.Footer>
        </StyledConfirmDelete>
    );
}

export default ConfirmDelete;
