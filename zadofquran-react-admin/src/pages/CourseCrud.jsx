import React from "react";
import CourseTable from "../features/courses/CourseTable";
import PageLayout from "../ui/PageLayout";
import CoursesFilter from "../features/courses/CoursesFilter";

const CourseCrud = () => {
    return (
        <PageLayout>
            <CoursesFilter />
            <CourseTable />
        </PageLayout>
    );
};

export default CourseCrud;
