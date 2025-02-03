import React from "react";
import SupervisorTable from "../features/supervisors/SupervisorTable";
import PageLayout from "../ui/PageLayout";
import SupervisorsFilter from "../features/supervisors/SupervisorsFilter";

const SupervisorCrud = () => {
    return (
        <PageLayout>
            <SupervisorsFilter />
            <SupervisorTable />
        </PageLayout>
    );
};

export default SupervisorCrud;
