import React from "react";
import Table from "../../ui/table/Table";
import styled from "styled-components";
import { Cell } from "../../ui/table/Cell";
import { TableImg } from "../../ui/table/TableImg";
import { BlueCell } from "../../ui/table/BlueCell";
import { Button, Menu, MenuItem, Modal } from "@mui/material";
import { BsThreeDots, BsTrash3Fill } from "react-icons/bs";
import { BiPencil } from "react-icons/bi";
import MyModal from "../../ui/MyModal";
import TeacherForm from "./TeacherForm";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteTeacher } from "./useDeleteTeacher";
import Actions from "../../ui/table/Actions";
import { useSearchParams } from "react-router-dom";
import { LIMIT } from "../../../Constants";
import { PinkCell } from "../../ui/table/PinkCell";
import { OrangeCell } from "../../ui/table/OrangeCell";

const Describtion = styled.div`
    /* width: 100%; */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;
const TeacherRow = ({ teacher, num }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = +searchParams.get("page") || 1;
    const tableNum = (page - 1) * LIMIT + num;
    const { id, name, image, locale } = teacher;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const { isDeleting, deleteTeacher } = useDeleteTeacher();

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
            <TableImg src={image} />
            {/* <Cell title={phone}>
                <BlueCell>{phone}</BlueCell>
            </Cell>
            <Cell title={email}>{email}</Cell> */}
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
                <MyModal.Window name="edit" title="تعديل المدرس">
                    <TeacherForm teacherToEdit={teacher} />
                </MyModal.Window>
                <MyModal.Window name="delete" title="مسح مدرس">
                    <ConfirmDelete
                        resourceName={name}
                        disabled={isDeleting}
                        onConfirm={() => deleteTeacher(id)}
                    />
                </MyModal.Window>
            </MyModal>
        </Table.Row>
    );
};

export default TeacherRow;
