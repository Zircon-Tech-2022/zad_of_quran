import React from "react";
import Table from "../../ui/table/Table";
import { Cell } from "../../ui/table/Cell";

import { Menu, MenuItem } from "@mui/material";
import { BsTrash3Fill } from "react-icons/bs";
import { BiPencil } from "react-icons/bi";
import MyModal from "../../ui/MyModal";
import PlansForm from "./PlansForm";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeletePlans } from "./useDeletePlans";
import Actions from "../../ui/table/Actions";
import { BlueCell } from "../../ui/table/BlueCell";
import { PinkCell } from "../../ui/table/PinkCell";
import { useSearchParams } from "react-router-dom";
import { OrangeCell } from "../../ui/table/OrangeCell";
import { GreenCell } from "../../ui/table/GreenCell";
import { LIMIT } from "../../../Constants";

const PlansRow = ({ plan, num }) => {
    const [searchParams] = useSearchParams();
    const page = +searchParams.get("page") || 1;
    const tableNum = (page - 1) * LIMIT + num;
    const {
        id,
        name,
        price,
        monthly_sessions,
        weekly_sessions,
        session_duration,
        currency,
        discount,
        locale,
        type,
    } = plan;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const { isDeleting, deletePlans } = useDeletePlans();

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
            <Cell title={price}>
                <BlueCell>
                    {price} {currency}
                </BlueCell>
            </Cell>
            <Cell title={discount}>{discount} %</Cell>
            <Cell title={monthly_sessions}>{monthly_sessions}</Cell>
            <Cell title={type}>
                {type === "نصف سنوي" && <PinkCell>{type}</PinkCell>}
                {type === "شهري" && <OrangeCell>{type}</OrangeCell>}
                {type === "سنوي" && <GreenCell>{type}</GreenCell>}
            </Cell>
            <Cell title={weekly_sessions}>{weekly_sessions}</Cell>
            <Cell title={session_duration}>{session_duration} ساعة</Cell>

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
                <MyModal.Window name="edit" title="تعديل الخطة">
                    <PlansForm plansToEdit={plan} />
                </MyModal.Window>
                <MyModal.Window name="delete" title="مسح الخطة">
                    <ConfirmDelete
                        resourceName={name}
                        disabled={isDeleting}
                        onConfirm={() => deletePlans(id)}
                    />
                </MyModal.Window>
            </MyModal>
        </Table.Row>
    );
};

export default PlansRow;
