import React from "react";
import PageLayout from "../ui/PageLayout";
import PlansFilter from "../features/plans/PlansFilter";
import PlansTable from "../features/plans/PlansTable";

const TeacherCrud = () => {
    return (
        <PageLayout>
            <PlansFilter />
            <PlansTable />
        </PageLayout>
    );
};

export default TeacherCrud;
