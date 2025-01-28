import React from "react";
import Table from "../../ui/table/Table";
import { Cell } from "../../ui/table/Cell";

import { Menu, MenuItem } from "@mui/material";
import { BsTrash3Fill } from "react-icons/bs";
import { BiPencil } from "react-icons/bi";
import MyModal from "../../ui/MyModal";
import TestimoinalForm from "./TestimoinalForm";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteTestimoinal } from "./useDeleteTestimoinal";
import Actions from "../../ui/table/Actions";
import { useSearchParams } from "react-router-dom";
import { LIMIT } from "../../Constants";
import { PinkCell } from "../../ui/table/PinkCell";
import { OrangeCell } from "../../ui/table/OrangeCell";

const TestimoinalRow = ({ testimoinal, num }) => {
    const [searchParams] = useSearchParams();
    const page = +searchParams.get("page") || 1;
    const tableNum = (page - 1) * LIMIT + num;
    const { id, name, content, locale } = testimoinal;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const { isDeleting, deleteTestimoinal } = useDeleteTestimoinal();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Table.Row>
            <div>{tableNum}</div>
            <Cell title={name}>{name}</Cell>
            <Cell title={locale}>
                {locale === "ar" && <PinkCell>عرب</PinkCell>}
                {locale === "en" && <OrangeCell>اعاجم</OrangeCell>}
            </Cell>

            <Cell title={content}>{content}</Cell>
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
                <MyModal.Window name="edit" title="تعديل الرأي">
                    <TestimoinalForm testimoinalToEdit={testimoinal} />
                </MyModal.Window>
                <MyModal.Window name="delete" title="مسح رأي">
                    <ConfirmDelete
                        resourceName={name}
                        disabled={isDeleting}
                        onConfirm={() => deleteTestimoinal(id)}
                    />
                </MyModal.Window>
            </MyModal>
        </Table.Row>
    );
};

export default TestimoinalRow;
