import React from "react";
import Table from "../../ui/table/Table";
import styled from "styled-components";
import { Cell } from "../../ui/table/Cell";
import { TableImg } from "../../ui/table/TableImg";
import { BlueCell } from "../../ui/table/BlueCell";
import { Button, Menu, MenuItem } from "@mui/material";
import { BsThreeDots, BsTrash3Fill } from "react-icons/bs";
import { BiPencil } from "react-icons/bi";
import MyModal from "../../ui/MyModal";
import TeacherForm from "./TeacherForm";
import ConfirmDelete from "../../ui/ConfirmDelete";

const Describtion = styled.div`
    /* width: 100%; */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;
const TeacherRow = ({ teacher }) => {
    const { id, name, image, phone, email } = teacher;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Table.Row>
            <div>{id}</div>
            <Cell>{name}</Cell>
            <TableImg src={image} />
            <Cell>
                <BlueCell><p style={{ direction: 'ltr', display: 'inline' }}>{phone}</p></BlueCell>
            </Cell>
            <Cell>{email}</Cell>
            <Button
                sx={{ fontSize: "2.2rem" }}
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            >
                <BsThreeDots />
            </Button>
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
                    <TeacherForm />
                </MyModal.Window>
                <MyModal.Window name="delete">
                    <ConfirmDelete
                        resourceName={name}
                        // disabled={isDeleting}
                        // onConfirm={() => deleteCabin(cabinId)}
                    />
                </MyModal.Window>
            </MyModal>
        </Table.Row>
    );
};

export default TeacherRow;
