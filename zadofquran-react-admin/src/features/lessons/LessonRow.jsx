import React from "react";
import Table from "../../ui/table/Table";
import { Cell } from "../../ui/table/Cell";
import { BlueCell } from "../../ui/table/BlueCell";
import { Menu, MenuItem } from "@mui/material";
import { BsTrash3Fill } from "react-icons/bs";
import MyModal from "../../ui/MyModal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteLesson } from "./useDeleteLesson";
import Actions from "../../ui/table/Actions";
import { Link, useSearchParams } from "react-router-dom";
import { LIMIT } from "../../Constants";
import { FaEye, FaToggleOn } from "react-icons/fa6";
import LessonView from "./LessonView";
import { PinkCell } from "../../ui/table/PinkCell";
import { OrangeCell } from "../../ui/table/OrangeCell";
import styles from './lesson.module.css'
import { useToggleLessonActivation } from "./useToggleLessonActivation";
import { BiPencil } from "react-icons/bi";
import LessonForm from "./LessonForm";

const LessonRow = ({ lesson, num }) => {
    const [searchParams] = useSearchParams();
    const page = +searchParams.get("page") || 1;
    const tableNum = (page - 1) * LIMIT + num;
    const { id, subscriber, staff, course } = lesson;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const isActive = lesson.staff?.id ? true : false;

    const { isDeleting, deleteLesson } = useDeleteLesson();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Table.Row>
            <div>{tableNum}</div>
            <Cell title={id}>{id}</Cell>
            <Cell title={subscriber.name}>
                <Link
                    to={`/subscribers?q=${subscriber.email}`}
                    className={styles.link}
                >
                    {subscriber.name} <br /> {subscriber.email} <br /> {subscriber.phone}
                </Link>
            </Cell>
            <Cell title={staff?.name || "لا يوجد معلم"}>
                {staff ? (
                    <Link
                        to={`/teachers?q=${staff.email}`}
                        className={styles.link}
                    >
                        {staff.name} <br /> {staff.email} <br /> {staff.phone}
                    </Link>
                ) : (
                    "لا يوجد معلم"
                )}
            </Cell>
            <Cell title={course.name}>
                <BlueCell>
                    <Link
                        to={`/courses?q=${course.name}`}
                        className={styles.link}
                    >
                        {course.name}
                    </Link>
                </BlueCell>
            </Cell>
            <Cell title={isActive ? "تمت الإضافة" : "غير نشطة"}>{isActive ? <OrangeCell>تمت الإضافة</OrangeCell> : <PinkCell>غير نشطة</PinkCell>}</Cell>
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

                <MyModal.Window name="view" title="بيانات الحلقة">
                    <LessonView lessonToView={lesson} />
                </MyModal.Window>
                <MyModal.Window name="edit" title="تعديل الحلقة">
                    <LessonForm lessonToEdit={lesson} />
                </MyModal.Window>
                <MyModal.Window name="delete" title="مسح الطالب">
                    <ConfirmDelete
                        resourceName={`#${id}`}
                        disabled={isDeleting}
                        onConfirm={() => deleteLesson(id)}
                    />
                </MyModal.Window>
            </MyModal>
        </Table.Row>
    );
};

export default LessonRow;
