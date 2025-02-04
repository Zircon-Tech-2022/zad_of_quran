import React from "react";
import Table from "../../ui/table/Table";
import { Cell } from "../../ui/table/Cell";
import { TableImg } from "../../ui/table/TableImg";
import { Menu, MenuItem } from "@mui/material";
import { BsTrash3Fill } from "react-icons/bs";
import { BiPencil } from "react-icons/bi";
import MyModal from "../../ui/MyModal";
import CourseForm from "./CourseForm";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteCourse } from "./useDeleteCourse";
import Actions from "../../ui/table/Actions";
import { useSearchParams } from "react-router-dom";
import { LIMIT } from "../../Constants";
import { PinkCell } from "../../ui/table/PinkCell";
import { OrangeCell } from "../../ui/table/OrangeCell";
import { FaToggleOff, FaToggleOn } from "react-icons/fa";
import { useToggleCourseDisplay } from "./useToggleCourseDisplay";
import Spinner from "../../ui/Spinner";

const CourseRow = ({ course, num }) => {
    const [searchParams] = useSearchParams();
    const page = +searchParams.get("page") || 1;
    const tableNum = (page - 1) * LIMIT + num;
    const { id, name, image, description, locale, display_at_home: isActive } = course;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const { isDeleting, deleteCourse } = useDeleteCourse();

    const { isToggling, toggleCourse } = useToggleCourseDisplay();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const toggleActive = (id, isActive) => {
        toggleCourse({ id, isActive })
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
            <Cell title={name}>{name}</Cell>
            <Cell title={locale}>
                {locale === "ar" && <PinkCell>عرب</PinkCell>}
                {locale === "en" && <OrangeCell>اعاجم</OrangeCell>}
            </Cell>
            <TableImg src={image} />
            <Cell title={description}>{description}</Cell>
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
                <MyModal.Window name="edit" title="تعديل الدورة">
                    <CourseForm courseToEdit={course} />
                </MyModal.Window>
                <MyModal.Window name="delete" title="مسح دورة">
                    <ConfirmDelete
                        resourceName={name}
                        disabled={isDeleting}
                        onConfirm={() => deleteCourse(id)}
                    />
                </MyModal.Window>
            </MyModal>
        </Table.Row>
    );
};

export default CourseRow;
