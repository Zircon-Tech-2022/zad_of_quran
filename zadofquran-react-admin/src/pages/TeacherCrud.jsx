import React from "react";
import AddEditTeacherModal from "../features/teachers/AddTeacherModal";
import TeacherTable from "../features/teachers/TeacherTable";
import TeacherForm from "../features/teachers/TeacherForm";
import PageLayout from "../ui/PageLayout";
import TeachersFilter from "../features/teachers/TeachersFilter";

const TeacherCrud = () => {
    return (
        <PageLayout>
            <TeachersFilter />
            <TeacherTable />
        </PageLayout>
    );
};

export default TeacherCrud;
