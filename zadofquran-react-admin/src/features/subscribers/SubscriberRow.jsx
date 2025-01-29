import React from "react";
import Table from "../../ui/table/Table";
import { Cell } from "../../ui/table/Cell";
import { BlueCell } from "../../ui/table/BlueCell";
import { Menu, MenuItem } from "@mui/material";
import { BsTrash3Fill } from "react-icons/bs";
import MyModal from "../../ui/MyModal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteSubscriber } from "./useDeleteSubscriber";
import Actions from "../../ui/table/Actions";
import { useSearchParams } from "react-router-dom";
import { LIMIT } from "../../Constants";
import { FaEye } from "react-icons/fa6";
import SubscriberProfile from "./SubscriberProfile";

const SubscriberRow = ({ user, num }) => {
    const [searchParams] = useSearchParams();
    const page = +searchParams.get("page") || 1;
    const tableNum = (page - 1) * LIMIT + num;
    const { id, name, phone, email } = user;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const { isDeleting, deleteSubscriber } = useDeleteSubscriber();

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
            <Cell title={phone}>
                <BlueCell>{phone}</BlueCell>
            </Cell>
            <Cell title={email}>{email}</Cell>
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
                    <MyModal.Open opens="view" onClick={handleClose}>
                        <MenuItem sx={{ gap: "1.5rem", fontSize: "1.6rem" }}>
                            عرض
                            <FaEye />
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

                <MyModal.Window name="view" title="بيانات الطالب">
                    <SubscriberProfile subscriberToView={user} />
                </MyModal.Window>
                <MyModal.Window name="delete" title="مسح الطالب">
                    <ConfirmDelete
                        resourceName={name}
                        disabled={isDeleting}
                        onConfirm={() => deleteSubscriber(id)}
                    />
                </MyModal.Window>
            </MyModal>
        </Table.Row>
    );
};

export default SubscriberRow;
