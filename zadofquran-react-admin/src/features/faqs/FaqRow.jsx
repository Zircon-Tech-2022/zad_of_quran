import React from "react";
import Table from "../../ui/table/Table";
import { Cell } from "../../ui/table/Cell";

import { Button, Menu, MenuItem, Modal } from "@mui/material";
import { BsThreeDots, BsTrash3Fill } from "react-icons/bs";
import { BiPencil } from "react-icons/bi";
import MyModal from "../../ui/MyModal";
import FaqForm from "./FaqForm";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteFaq } from "./useDeleteFaq";
import { deleteFaq } from "../../services/apiFaq";
import Actions from "../../ui/table/Actions";
import { useSearchParams } from "react-router-dom";
import { LIMIT } from "../../../Constants";
import { PinkCell } from "../../ui/table/PinkCell";
import { OrangeCell } from "../../ui/table/OrangeCell";

const FaqRow = ({ faq, num }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = +searchParams.get("page") || 1;
    const tableNum = (page - 1) * LIMIT + num;
    const { id, answer, question, locale } = faq;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const { isDeleting, deleteFaq } = useDeleteFaq();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Table.Row>
            <div>{tableNum}</div>
            <Cell title={question}>{question}</Cell>
            <Cell title={locale}>
                {locale === "ar" && <PinkCell>عرب</PinkCell>}
                {locale === "en" && <OrangeCell>اعاجم</OrangeCell>}
            </Cell>
            <Cell title={answer}>{answer}</Cell>
            {/* <Button
                sx={{ fontSize: "2.2rem" }}
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            >
                <BsThreeDots />
            </Button> */}
            <Actions open={open} onClick={handleClick} />
            <MyModal>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        "aria-labelledby": "basic-button",
                    }}
                >
                    <MyModal.Open opens="edit" onClick={handleClose}>
                        <MenuItem sx={{ gap: "1.5rem", fontSize: "1.6rem" }}>
                            تعديل
                            <BiPencil />
                        </MenuItem>
                    </MyModal.Open>
                    <MyModal.Open opens="delete" onClick={handleClose}>
                        <MenuItem
                            sx={{ gap: "1.5rem", fontSize: "1.6rem" }}
                            onClick={handleClose}
                        >
                            مسح
                            <BsTrash3Fill />
                        </MenuItem>
                    </MyModal.Open>
                </Menu>
                <MyModal.Window name="edit" title="تعديل السؤال">
                    <FaqForm faqToEdit={faq} />
                </MyModal.Window>
                <MyModal.Window name="delete" title="مسح سؤال">
                    <ConfirmDelete
                        resourceName={question}
                        disabled={isDeleting}
                        onConfirm={() => deleteFaq(id)}
                    />
                </MyModal.Window>
            </MyModal>
        </Table.Row>
    );
};

export default FaqRow;
