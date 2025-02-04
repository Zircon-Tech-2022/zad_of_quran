import React from "react";
import Table from "../../ui/table/Table";
import { Cell } from "../../ui/table/Cell";
import { TableImg } from "../../ui/table/TableImg";
import { Menu, MenuItem, Rating } from "@mui/material";
import { BsTrash3Fill } from "react-icons/bs";
import { BiPencil } from "react-icons/bi";
import { FaEye, FaToggleOff, FaToggleOn } from "react-icons/fa";
import MyModal from "../../ui/MyModal";
import TeacherForm from "./TeacherForm";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteTeacher } from "./useDeleteTeacher";
import Actions from "../../ui/table/Actions";
import { useSearchParams } from "react-router-dom";
import { LIMIT } from "../../Constants";
import { PinkCell } from "../../ui/table/PinkCell";
import { OrangeCell } from "../../ui/table/OrangeCell";
import TeacherProfile from "./TeacherProfile";
import { useEditTeacher } from "./useEditTeacher";
import Spinner from "../../ui/Spinner";
import { useToggleTeacherDisplay } from "./useToggleTeacherDisplay";

const TeacherRow = ({ teacher, num }) => {
    const [searchParams] = useSearchParams();
    const page = +searchParams.get("page") || 1;
    const tableNum = (page - 1) * LIMIT + num;
    const { id, name, image, locale, rate, display_at_home: isActive } = teacher;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const { isEditing, editTeacher } = useEditTeacher();
    const { isDeleting, deleteTeacher } = useDeleteTeacher();

    const { isToggling, toggleTeacher } = useToggleTeacherDisplay();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChangeRate = (newValue) => {
        editTeacher(
            {
                newTeacherData: { rate: newValue },
                id,
            })
    };

    const toggleActive = (id, isActive) => {
        toggleTeacher({ id, isActive })
    }

    return (
        <Table.Row>
            {isToggling && <Spinner style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                zIndex: "100",
            }} />}

            <div>{tableNum}</div>
            <Cell title={name}>{name ?? "- لم يسجل بعد -"}</Cell>
            <Cell title={locale}>
                {locale === "ar" && <PinkCell>عرب</PinkCell>}
                {locale === "en" && <OrangeCell>اعاجم</OrangeCell>}
            </Cell>
            <TableImg src={image} />
            <Rating
                style={{ direction: "ltr" }}
                precision={0.5}
                name="simple-rating"
                onChange={(_, newValue) => handleChangeRate(newValue)}
                defaultValue={rate}
            />
            <Cell onClick={() => toggleActive(id, isActive)}
                disabled={isToggling}>{isActive ?
                    <FaToggleOn style={{ fontSize: '40px', textAlign: 'center', color: 'var(--color-brand-600)' }} /> :
                    <FaToggleOff style={{ fontSize: '40px', textAlign: 'center', color: 'var(--color-red-800)' }} />}
            </Cell>
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
                <MyModal.Window name="view" title="بيانات المدرس">
                    <TeacherProfile teacherToView={teacher} />
                </MyModal.Window>
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
